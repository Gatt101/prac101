import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { GetUserResumes } from '@/lib/actions/resume.action'

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth()
        
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { resumeId, jobDescription } = await req.json()
        
        if (!resumeId || !jobDescription) {
            return NextResponse.json({ 
                error: 'Resume ID and job description are required' 
            }, { status: 400 })
        }

        // Get user's resumes to find the selected one
        const resumes = await GetUserResumes(userId)
        const selectedResume = resumes.find(r => r._id.toString() === resumeId)
        
        if (!selectedResume) {
            return NextResponse.json({ 
                error: 'Resume not found' 
            }, { status: 404 })
        }

        // Tailor the resume using AI
        const tailoredResume = await tailorResumeWithAI(selectedResume.data, jobDescription)
        
        return NextResponse.json({ 
            success: true,
            resume: tailoredResume,
            message: 'Resume tailored successfully!'
        })
        
    } catch (error) {
        console.error('Error tailoring resume:', error)
        return NextResponse.json({ 
            error: 'Failed to tailor resume' 
        }, { status: 500 })
    }
}

async function tailorResumeWithAI(resumeData: any, jobDescription: string) {
    try {
        // Import the AI agent dynamically
        const { AiResumeBuilderAgent } = await import('@/inngest/function')
        
        const tailoringPrompt = `
            You are an expert resume optimization specialist. Please tailor this resume to match the job description provided.

            EXISTING RESUME DATA:
            ${JSON.stringify(resumeData, null, 2)}

            JOB DESCRIPTION:
            ${jobDescription}

            INSTRUCTIONS:
            1. Analyze the job description to identify key requirements, skills, and keywords
            2. Optimize the resume's professional summary to align with the role
            3. Reorder and enhance experience descriptions to highlight relevant achievements
            4. Adjust skills section to prioritize job-relevant skills
            5. Optimize language to include industry keywords and ATS-friendly terms
            6. Maintain truthfulness - only enhance existing information, don't fabricate
            7. Keep the same overall structure and factual information

            Return the response as a valid JSON object with the exact same structure as the input resume:
            {
              "name": "Full name",
              "email": "email@example.com", 
              "phone": "phone number",
              "location": "location",
              "linkedin": "linkedin url",
              "website": "website url",
              "summary": "optimized professional summary targeting the job",
              "experience": [
                {
                  "title": "job title",
                  "company": "company name", 
                  "years": "employment duration",
                  "description": "enhanced role description with job-relevant keywords",
                  "achievements": ["optimized achievement 1", "optimized achievement 2"]
                }
              ],
              "skills": ["prioritized skill1", "job-relevant skill2"],
              "education": "education info",
              "projects": [
                {
                  "name": "project name",
                  "description": "enhanced project description", 
                  "technologies": ["relevant tech1", "relevant tech2"],
                  "link": "project link"
                }
              ],
              "certifications": ["relevant cert1", "relevant cert2"]
            }
        `

        const response = await AiResumeBuilderAgent.run(tailoringPrompt)
        
        // Extract JSON from AI response
        let tailoredData
        if (response && response.output && response.output[0] && (response.output[0] as any).content) {
            let content = (response.output[0] as any).content
            
            if (content.includes('```json')) {
                content = content.replace(/```json\n?/g, '').replace(/\n?```/g, '')
            } else if (content.includes('```')) {
                content = content.replace(/```\n?/g, '').replace(/\n?```/g, '')
            }
            
            content = content.trim()
            tailoredData = JSON.parse(content)
        } else {
            tailoredData = typeof response === 'string' ? JSON.parse(response) : response
        }

        return {
            ...tailoredData,
            metadata: {
                ...resumeData.metadata,
                tailoredAt: new Date().toISOString(),
                tailoredFor: jobDescription.substring(0, 100) + '...'
            }
        }
        
    } catch (error) {
        console.error('AI tailoring failed, using enhanced fallback:', error)
        
        // Fallback: Basic keyword matching and optimization
        return enhancedFallbackTailoring(resumeData, jobDescription)
    }
}

function enhancedFallbackTailoring(resumeData: any, jobDescription: string) {
    const jobKeywords = extractKeywords(jobDescription)
    
    // Enhance summary with job keywords
    const enhancedSummary = resumeData.summary ? 
        `${resumeData.summary} Experienced in ${jobKeywords.slice(0, 3).join(', ')}.` :
        `Professional with expertise in ${jobKeywords.slice(0, 5).join(', ')}.`
    
    // Prioritize skills based on job description
    const prioritizedSkills = resumeData.skills ? 
        [...resumeData.skills].sort((a, b) => {
            const aMatch = jobKeywords.some(keyword => 
                a.toLowerCase().includes(keyword.toLowerCase()) || 
                keyword.toLowerCase().includes(a.toLowerCase())
            )
            const bMatch = jobKeywords.some(keyword => 
                b.toLowerCase().includes(keyword.toLowerCase()) || 
                keyword.toLowerCase().includes(b.toLowerCase())
            )
            return bMatch ? 1 : aMatch ? -1 : 0
        }) : []

    return {
        ...resumeData,
        summary: enhancedSummary,
        skills: prioritizedSkills,
        metadata: {
            ...resumeData.metadata,
            tailoredAt: new Date().toISOString(),
            tailoredFor: jobDescription.substring(0, 100) + '...',
            method: 'fallback'
        }
    }
}

function extractKeywords(jobDescription: string): string[] {
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'a', 'an', 'this', 'that', 'these', 'those']
    
    return jobDescription
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 2 && !commonWords.includes(word))
        .filter((word, index, arr) => arr.indexOf(word) === index) // Remove duplicates
        .slice(0, 20) // Top 20 keywords
}
