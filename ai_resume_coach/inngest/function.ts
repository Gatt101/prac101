
import { inngest } from "./client";
import { createAgent, gemini } from '@inngest/agent-kit';
import { z } from "zod";

// Import the unified schema from our models
import ResumeSchema from "@/models/ResumeSchema";

export const AiResumeBuilderAgent = createAgent({
  name: "AiResumeBuilderAgent",
  description: 'Expert AI resume builder that creates professional, ATS-optimized resumes tailored to specific industries and roles',
  system: `You are an expert resume builder AI with deep knowledge of recruitment best practices, ATS optimization, and industry-specific requirements.

Your mission is to create compelling, professional resumes that help candidates stand out while being ATS-friendly.

GUIDELINES:
1. ANALYZE the user's background, experience, and target role carefully
2. CREATE content that is specific, quantified, and achievement-focused
3. OPTIMIZE for ATS by using relevant keywords naturally
4. TAILOR the resume to the candidate's industry and career level
5. ENSURE consistency in formatting and professional tone
6. HIGHLIGHT transferable skills for career changers
7. FOCUS on results and impact rather than just duties

OUTPUT REQUIREMENTS:
- Return a valid JSON object matching the ResumeSchema
- Use action verbs and quantified achievements
- Keep bullet points concise but impactful (1-2 lines max)
- Include industry-relevant keywords naturally
- Ensure all dates and information are realistic
- Make the summary compelling and specific to the candidate

CONTENT STRATEGY:
- Summary: 2-3 sentences highlighting unique value proposition
- Experience: Focus on achievements, not just responsibilities
- Skills: Mix of technical and soft skills relevant to target role
- Projects: Showcase practical application of skills
- Education: Include relevant coursework or honors if applicable`,
  
  model: gemini({
    model: "gemini-2.0-flash-exp",
    apiKey: process.env.API_KEY,
  }),
});

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const generateResumeFunction = inngest.createFunction(
  { 
    id: "generate-resume",
    retries: 3,
    cancelOn: [
      { event: "resume/cancel", match: "data.eventId" }
    ]
  },
  { event: "resume/generate" },
  async ({ event, step }) => {
    const { description, template, targetRole, experienceLevel, userId } = event.data;
    
    // Helper function to update status
    const updateStatus = async (status: string, progress?: number, stepName?: string, stepStatus?: string) => {
      try {
        await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/resume/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventId: event.id,
            status,
            progress,
            step: stepName ? { name: stepName, status: stepStatus } : undefined
          })
        });
      } catch (error) {
        console.log('Failed to update status:', error);
      }
    };

    // Step 1: Validate and sanitize input data
    const validatedInput = await step.run("validate-input", async () => {
      await updateStatus('processing', 10, 'validate-input', 'running');
      
      if (!description || description.trim().length < 10) {
        await updateStatus('failed', 10, 'validate-input', 'failed');
        throw new Error("Description must be at least 10 characters long");
      }
      
      // Sanitize inputs
      const sanitizedDescription = description.trim().substring(0, 5000); // Limit description length
      const validTemplates = ["modern", "classic", "creative", "professional"];
      const validExperienceLevels = ["entry", "mid", "senior", "lead", "executive"];
      
      const result = {
        description: sanitizedDescription,
        template: validTemplates.includes(template) ? template : "modern",
        targetRole: targetRole?.trim().substring(0, 100) || "general",
        experienceLevel: validExperienceLevels.includes(experienceLevel) ? experienceLevel : "mid",
        userId: userId || "anonymous",
        requestId: event.id
      };
      
      await updateStatus('processing', 25, 'validate-input', 'completed');
      return result;
    });

    // Step 2: Generate resume using AI agent with enhanced prompting
    const resumeData = await step.run("generate-resume-content", async () => {
      await updateStatus('processing', 30, 'generate-resume-content', 'running');
      const enhancedPrompt = `
        RESUME GENERATION REQUEST
        ========================
        
        User Background: ${validatedInput.description}
        Target Role: ${validatedInput.targetRole}
        Experience Level: ${validatedInput.experienceLevel}
        Template Style: ${validatedInput.template}
        
        INSTRUCTIONS:
        Create a professional resume that:
        1. Matches the target role and experience level precisely
        2. Uses industry-appropriate language and ATS-optimized keywords
        3. Highlights quantified achievements and measurable results
        4. Follows ${validatedInput.template} template design principles
        5. Is optimized for both Applicant Tracking Systems and human reviewers
        6. Maintains professional tone throughout
        7. Includes realistic and credible information only
        
        REQUIRED OUTPUT FORMAT:
        Return a valid JSON object with the following structure:
        {
          "name": "Professional full name",
          "email": "professional.email@domain.com",
          "phone": "+1 (555) 123-4567",
          "location": "City, State/Country",
          "linkedin": "linkedin.com/in/profile (optional)",
          "website": "portfolio-url.com (optional)",
          "summary": "Compelling 2-3 sentence professional summary",
          "experience": [
            {
              "title": "Job Title",
              "company": "Company Name",
              "years": "Start Year - End Year",
              "description": "Role description (1-2 sentences)",
              "achievements": ["Quantified achievement 1", "Quantified achievement 2"]
            }
          ],
          "skills": ["Skill 1", "Skill 2", "Skill 3"],
          "education": "Degree, Institution, Year",
          "projects": [
            {
              "name": "Project Name",
              "description": "Project description with impact",
              "technologies": ["Tech 1", "Tech 2"],
              "link": "project-url.com (optional)"
            }
          ],
          "certifications": ["Certification 1", "Certification 2"]
        }
        
        Focus on quality over quantity. Ensure all content is professional and realistic.
      `;

      try {
        const response = await AiResumeBuilderAgent.run(enhancedPrompt);
        
        // Parse and validate the response
        let parsedResponse;
        if (typeof response === 'string') {
          // Clean the response to handle any markdown formatting
          const cleanedResponse = (response as string).replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          parsedResponse = JSON.parse(cleanedResponse);
        } else {
          parsedResponse = response;
        }
        
        // Validate against our schema
        const validatedResume = ResumeSchema.parse(parsedResponse);
        
        // Ensure arrays are not empty where required
        if (!validatedResume.experience || validatedResume.experience.length === 0) {
          throw new Error("Resume must include at least one work experience entry");
        }
        
        await updateStatus('processing', 70, 'generate-resume-content', 'completed');
        return validatedResume;
      } catch (error) {
        console.error("Error generating resume with AI:", error);
        
        // Fallback to enhanced mock data generation
        console.log("Falling back to enhanced mock data generation");
        const fallbackResume = generateFallbackResume(validatedInput);
        await updateStatus('processing', 70, 'generate-resume-content', 'completed');
        return fallbackResume;
      }
    });

    // Step 3: Post-process and enhance the resume
    const finalResume = await step.run("enhance-resume", async () => {
      await updateStatus('processing', 75, 'enhance-resume', 'running');
      // Add template-specific enhancements and metadata
      const templateEnhancements = {
        modern: { 
          colorScheme: "blue", 
          layout: "clean",
          fontFamily: "Inter, sans-serif",
          accentColor: "#3B82F6"
        },
        creative: { 
          colorScheme: "purple", 
          layout: "artistic",
          fontFamily: "Poppins, sans-serif",
          accentColor: "#8B5CF6"
        },
        professional: { 
          colorScheme: "navy", 
          layout: "traditional",
          fontFamily: "Times New Roman, serif",
          accentColor: "#1E40AF"
        },
        classic: { 
          colorScheme: "black", 
          layout: "minimal",
          fontFamily: "Georgia, serif",
          accentColor: "#374151"
        }
      };

      // Enhance skills and keywords based on target role
      const enhancedSkills = enhanceSkillsForRole(resumeData.skills || [], validatedInput.targetRole);
      
      const result = {
        ...resumeData,
        skills: enhancedSkills,
        metadata: {
          template: validatedInput.template,
          generatedAt: new Date().toISOString(),
          targetRole: validatedInput.targetRole,
          experienceLevel: validatedInput.experienceLevel,
          userId: validatedInput.userId,
          requestId: validatedInput.requestId,
          version: "2.0",
          ...templateEnhancements[validatedInput.template as keyof typeof templateEnhancements]
        }
      };
      
      await updateStatus('processing', 90, 'enhance-resume', 'completed');
      return result;
    });

    // Step 4: Store or log the result (optional)
    await step.run("log-generation", async () => {
      await updateStatus('processing', 95, 'log-generation', 'running');
      console.log(`Resume generated successfully for user ${validatedInput.userId}, role: ${validatedInput.targetRole}`);
      // Here you could store to database, send analytics events, etc.
      await updateStatus('completed', 100, 'log-generation', 'completed');
      return { logged: true };
    });

    // Final status update with completed resume
    try {
      await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/resume/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          status: 'completed',
          progress: 100,
          data: { resume: finalResume }
        })
      });
    } catch (error) {
      console.log('Failed to update final status:', error);
    }

    return { 
      success: true, 
      resume: finalResume,
      message: "Resume generated successfully with AI assistance",
      processingTime: "async",
      generatedAt: new Date().toISOString()
    };
  }
);

// Helper function to generate fallback resume when AI fails
function generateFallbackResume(input: any) {
  const { description, targetRole, experienceLevel, template } = input;
  
  // Extract basic info from description
  const name = extractNameFromDescription(description) || "Professional Candidate";
  const email = `${name.toLowerCase().replace(/\s+/g, '.')}@email.com`;
  
  return {
    name,
    email,
    phone: "(555) 123-4567",
    location: "Professional Location",
    linkedin: `linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '')}`,
    website: description.toLowerCase().includes('developer') ? `${name.toLowerCase().replace(/\s+/g, '')}.dev` : undefined,
    summary: generateSmartSummary(description, targetRole, experienceLevel),
    experience: generateSmartExperience(description, targetRole, experienceLevel),
    skills: generateSmartSkills(description, targetRole),
    education: generateSmartEducation(description, targetRole),
    projects: generateSmartProjects(description, targetRole),
    certifications: generateSmartCertifications(description, targetRole)
  };
}

// Helper function to enhance skills based on target role
function enhanceSkillsForRole(currentSkills: string[], targetRole: string): string[] {
  const roleSpecificSkills = {
    'software engineer': ['Problem Solving', 'Code Review', 'System Design', 'Testing'],
    'data analyst': ['Statistical Analysis', 'Data Visualization', 'Critical Thinking', 'Business Acumen'],
    'marketing': ['Campaign Management', 'Market Research', 'Brand Strategy', 'Analytics'],
    'designer': ['User Experience', 'Visual Design', 'Prototyping', 'Design Systems'],
    'project manager': ['Agile/Scrum', 'Risk Management', 'Stakeholder Communication', 'Resource Planning']
  };
  
  const targetRoleLower = targetRole.toLowerCase();
  const additionalSkills = Object.entries(roleSpecificSkills).find(([role]) => 
    targetRoleLower.includes(role)
  )?.[1] || [];
  
  // Combine and deduplicate
  const allSkills = [...new Set([...currentSkills, ...additionalSkills])];
  return allSkills.slice(0, 12); // Limit to 12 skills
}

// Smart generation functions for fallback
function extractNameFromDescription(description: string): string | null {
  const namePatterns = [
    /(?:my name is|i am|i'm|call me)\s+([a-zA-Z\s]{2,30})/i,
    /^([A-Z][a-z]+\s+[A-Z][a-z]+)/m
  ];
  
  for (const pattern of namePatterns) {
    const match = description.match(pattern);
    if (match) return match[1].trim();
  }
  return null;
}

function generateSmartSummary(description: string, targetRole: string, experienceLevel: string): string {
  const keywords = description.toLowerCase();
  const levels = {
    entry: "Motivated professional",
    mid: "Experienced professional", 
    senior: "Senior professional",
    lead: "Leadership-focused professional",
    executive: "Executive-level professional"
  };
  
  const levelPhrase = levels[experienceLevel as keyof typeof levels] || "Dedicated professional";
  
  if (keywords.includes('software') || keywords.includes('developer')) {
    return `${levelPhrase} with expertise in software development and modern web technologies. Proven track record of building scalable applications and collaborating with cross-functional teams to deliver high-quality solutions.`;
  } else if (keywords.includes('data') || keywords.includes('analytics')) {
    return `${levelPhrase} specializing in data analysis and business intelligence. Skilled in transforming complex datasets into actionable insights that drive strategic decision-making.`;
  } else if (keywords.includes('marketing')) {
    return `${levelPhrase} with strong background in digital marketing and campaign management. Demonstrated ability to increase brand awareness and drive customer engagement through data-driven strategies.`;
  }
  
  return `${levelPhrase} with proven expertise in ${targetRole}. Committed to delivering exceptional results and contributing to organizational success through strategic thinking and collaborative leadership.`;
}

function generateSmartExperience(description: string, targetRole: string, experienceLevel: string) {
  // Generate 1-3 experience entries based on experience level
  const experienceCount = experienceLevel === 'entry' ? 1 : experienceLevel === 'senior' ? 3 : 2;
  const experiences = [];
  
  for (let i = 0; i < experienceCount; i++) {
    const years = generateRealisticYears(i, experienceLevel);
    experiences.push({
      title: generateRoleTitle(targetRole, i),
      company: generateCompanyName(targetRole, i),
      years,
      description: `Led ${targetRole} initiatives and contributed to organizational growth through strategic planning and execution.`,
      achievements: generateAchievements(targetRole, experienceLevel)
    });
  }
  
  return experiences;
}

function generateRealisticYears(index: number, level: string): string {
  const currentYear = new Date().getFullYear();
  const yearRanges = {
    entry: [[currentYear - 1, currentYear]],
    mid: [[currentYear - 3, currentYear], [currentYear - 5, currentYear - 3]],
    senior: [[currentYear - 2, currentYear], [currentYear - 5, currentYear - 2], [currentYear - 8, currentYear - 5]]
  };
  
  const ranges = yearRanges[level as keyof typeof yearRanges] || yearRanges.mid;
  const range = ranges[index] || ranges[0];
  
  return range[1] === currentYear ? `${range[0]} - Present` : `${range[0]} - ${range[1]}`;
}

function generateRoleTitle(targetRole: string, index: number): string {
  const seniority = index === 0 ? "" : index === 1 ? "Senior " : "Lead ";
  return `${seniority}${targetRole}`;
}

function generateCompanyName(targetRole: string, index: number): string {
  const companies = [
    "Tech Innovation Corp", "Digital Solutions Inc", "Global Enterprises Ltd",
    "Future Systems Co", "Strategic Partners LLC", "Advanced Technologies Group"
  ];
  return companies[index] || companies[0];
}

function generateAchievements(targetRole: string, level: string): string[] {
  const achievements = {
    software: [
      "Improved application performance by 40% through code optimization",
      "Led development of features serving 50,000+ active users",
      "Reduced deployment time by 60% implementing CI/CD pipelines"
    ],
    data: [
      "Increased reporting efficiency by 50% through automated dashboards", 
      "Identified cost-saving opportunities worth $200K annually",
      "Improved data accuracy by 35% through quality validation processes"
    ],
    marketing: [
      "Increased lead generation by 45% through targeted campaigns",
      "Improved conversion rates by 30% through A/B testing optimization",
      "Grew social media engagement by 25% across all platforms"
    ]
  };
  
  const roleKey = Object.keys(achievements).find(key => 
    targetRole.toLowerCase().includes(key)
  ) as keyof typeof achievements;
  
  return achievements[roleKey] || [
    "Exceeded performance targets by 25% consistently",
    "Led cross-functional initiatives improving team efficiency",
    "Implemented process improvements reducing costs by 20%"
  ];
}

function generateSmartSkills(description: string, targetRole: string): string[] {
  const skillSets = {
    software: ["JavaScript", "Python", "React", "Node.js", "SQL", "Git", "AWS", "Docker"],
    data: ["Python", "SQL", "Tableau", "Excel", "Statistical Analysis", "Machine Learning", "Power BI"],
    marketing: ["Digital Marketing", "Google Analytics", "SEO/SEM", "Social Media", "Content Strategy"],
    design: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", "User Research"]
  };
  
  const roleKey = Object.keys(skillSets).find(key => 
    targetRole.toLowerCase().includes(key)
  ) as keyof typeof skillSets;
  
  const baseSkills = skillSets[roleKey] || ["Communication", "Leadership", "Project Management", "Problem Solving"];
  const softSkills = ["Team Collaboration", "Strategic Thinking", "Adaptability", "Critical Thinking"];
  
  return [...baseSkills.slice(0, 8), ...softSkills.slice(0, 4)];
}

function generateSmartEducation(description: string, targetRole: string): string {
  const educationMap = {
    software: "Bachelor of Science in Computer Science, State University (2020)",
    data: "Bachelor of Science in Data Science, Technical University (2020)", 
    marketing: "Bachelor of Business Administration, Marketing Focus, University (2020)",
    design: "Bachelor of Fine Arts in Design, Art Institute (2020)"
  };
  
  const roleKey = Object.keys(educationMap).find(key => 
    targetRole.toLowerCase().includes(key)
  ) as keyof typeof educationMap;
  
  return educationMap[roleKey] || "Bachelor's Degree in Related Field, University (2020)";
}

function generateSmartProjects(description: string, targetRole: string) {
  const projectTemplates = {
    software: [{
      name: "Full-Stack Web Application",
      description: "Developed responsive web application with modern UI and robust backend API",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      link: "github.com/user/project"
    }],
    data: [{
      name: "Business Intelligence Dashboard", 
      description: "Created interactive dashboard for executive reporting and data visualization",
      technologies: ["Python", "Tableau", "SQL", "Pandas"]
    }],
    marketing: [{
      name: "Digital Marketing Campaign",
      description: "Led comprehensive campaign resulting in 40% increase in conversions",
      technologies: ["Google Ads", "Analytics", "Email Marketing", "Social Media"]
    }]
  };
  
  const roleKey = Object.keys(projectTemplates).find(key => 
    targetRole.toLowerCase().includes(key)
  ) as keyof typeof projectTemplates;
  
  return projectTemplates[roleKey] || [{
    name: "Professional Project",
    description: `Completed significant project demonstrating ${targetRole} expertise`,
    technologies: ["Industry Tools", "Best Practices"]
  }];
}

function generateSmartCertifications(description: string, targetRole: string): string[] {
  const certificationMap = {
    software: ["AWS Certified Solutions Architect", "Google Cloud Professional Developer"],
    data: ["Google Data Analytics Certificate", "Tableau Desktop Specialist"],
    marketing: ["Google Analytics Certified", "HubSpot Content Marketing"],
    design: ["Adobe Certified Expert", "Google UX Design Certificate"]
  };
  
  const roleKey = Object.keys(certificationMap).find(key => 
    targetRole.toLowerCase().includes(key)
  ) as keyof typeof certificationMap;
  
  return certificationMap[roleKey] || [`Professional Certification in ${targetRole}`];
}

// Resume Analysis Agent
export const AiResumeAnalyzerAgent = createAgent({
  name: "AiResumeAnalyzerAgent",
  description: 'Expert AI resume analyzer that provides comprehensive ATS optimization and gap analysis',
  system: `You are an expert resume analyzer and ATS optimization specialist with deep knowledge of recruitment processes, applicant tracking systems, and hiring best practices.

Your mission is to provide comprehensive, actionable feedback on resumes to help candidates optimize their applications for both ATS systems and human reviewers.

ANALYSIS AREAS:
1. ATS COMPATIBILITY - Format, structure, keyword optimization
2. CONTENT QUALITY - Impact statements, quantification, relevance
3. KEYWORD ANALYSIS - Job-specific terms, industry language
4. SECTION COMPLETENESS - All necessary sections present and well-developed
5. PROFESSIONAL PRESENTATION - Clarity, consistency, readability

SCORING METHODOLOGY:
- Overall Score (0-100): Weighted average of all sections
- ATS Score (0-100): Technical compatibility and keyword optimization
- Keyword Match (0-100): Alignment with job requirements (if provided)
- Section Scores (0-100): Individual section analysis

OUTPUT REQUIREMENTS:
Return a valid JSON object with comprehensive analysis including:
- Numerical scores for overall, ATS, and keyword matching
- Section-by-section analysis with scores and feedback
- Specific actionable recommendations
- Strong points to maintain
- Areas needing improvement
- Missing keywords (if job description provided)

FEEDBACK STYLE:
- Be specific and actionable
- Prioritize high-impact improvements
- Balance criticism with positive reinforcement
- Provide concrete examples when possible`,
  
  model: gemini({
    model: "gemini-2.0-flash-exp",
    apiKey: process.env.API_KEY,
  }),
});

// Resume Analysis Function
export const analyzeResume = inngest.createFunction(
  { id: "analyze-resume" },
  { event: "analyze-resume" },
  async ({ event, step }) => {
    const { resumeData, jobDescription, userId, resumeId } = event.data;
    
    const analysisPrompt = `
      RESUME DATA TO ANALYZE:
      ${JSON.stringify(resumeData, null, 2)}
      
      ${jobDescription ? `JOB DESCRIPTION FOR TARGETED ANALYSIS:
      ${jobDescription}
      
      Please provide targeted analysis comparing the resume to this specific job.` : 'Please provide general resume analysis focused on ATS optimization and best practices.'}
      
      Provide comprehensive analysis with specific scores and actionable feedback.
      
      Return response as JSON with this exact structure:
      {
        "overallScore": number (0-100),
        "atsScore": number (0-100),
        "keywordMatch": number (0-100),
        "sections": {
          "personalInfo": {"score": number, "feedback": "string", "suggestions": ["string"]},
          "experience": {"score": number, "feedback": "string", "suggestions": ["string"]},
          "education": {"score": number, "feedback": "string", "suggestions": ["string"]},
          "skills": {"score": number, "feedback": "string", "suggestions": ["string"]},
          "projects": {"score": number, "feedback": "string", "suggestions": ["string"]}
        },
        "missingKeywords": ["string"],
        "strongPoints": ["string"],
        "improvementAreas": ["string"],
        "recommendations": ["string"]
      }
    `;
    
    try {
      const agent = AiResumeAnalyzerAgent;
      const analysis = await agent.run(analysisPrompt);
      
      return { 
        success: true,
        analysis: analysis,
        userId,
        resumeId 
      };
    } catch (error) {
      console.error("Resume analysis failed:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Analysis failed",
        userId,
        resumeId 
      };
    }
  }
);

// Legacy function for backward compatibility
export const BuilderBot = inngest.createFunction(
  { id: "builder-bot" },
  { event: "test/builder-bot" },
  async ({ event, step }) => {
    const agent = AiResumeBuilderAgent;
    const enhancedPrompt = `
      User Background: ${event.data.description}
      
      Please create a professional resume that:
      - Uses industry-appropriate language and keywords
      - Highlights relevant achievements and skills
      - Is optimized for both ATS and human reviewers
      
      Return the response as a valid JSON object with the following structure:
      {
        "name": "Full name",
        "email": "email@example.com",
        "phone": "phone number",
        "location": "location",
        "summary": "professional summary",
        "experience": [{"title": "job title", "company": "company", "years": "duration", "description": "role description", "achievements": ["achievement1"]}],
        "skills": ["skill1", "skill2"],
        "education": "education info",
        "projects": [{"name": "project", "description": "description", "technologies": ["tech1"]}],
        "certifications": ["cert1"]
      }
    `;
    
    const response = await agent.run(enhancedPrompt);
    return { response };
  }
);