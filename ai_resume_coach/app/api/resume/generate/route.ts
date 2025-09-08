import { NextRequest, NextResponse } from 'next/server'
// need to put ai Requests in the edge runtime 
export async function POST(request: NextRequest) {
  try {
    const { description, template } = await request.json()

    if (!description || !template) {
      return NextResponse.json(
        { error: 'Description and template are required' },
        { status: 400 }
      )
    }
    const resumeData = await generateResumeWithAI(description, template)

    return NextResponse.json({ resume: resumeData })
  } catch (error) {
    console.error('Error generating resume:', error)
    return NextResponse.json(
      { error: 'Failed to generate resume' },
      { status: 500 }
    )
  }
}

async function generateResumeWithAI(description: string, template: string) {
  // This is a mock implementation
  // Replace with actual AI service integration (OpenAI, Anthropic, etc.)
  
  const mockResume = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.dev",
    summary: generateSummary(description),
    experience: generateExperience(description),
    skills: generateSkills(description),
    education: generateEducation(description),
    projects: generateProjects(description),
    certifications: generateCertifications(description)
  }

  return mockResume
}

function generateSummary(description: string): string {
  // Mock AI-generated summary based on description
  const keywords = description.toLowerCase()
  
  if (keywords.includes('software') || keywords.includes('developer') || keywords.includes('engineer')) {
    return "Results-driven Software Engineer with proven expertise in full-stack development, specializing in modern web technologies and scalable system design. Passionate about creating innovative solutions that drive business growth and enhance user experiences."
  } else if (keywords.includes('marketing') || keywords.includes('digital')) {
    return "Dynamic Marketing Professional with extensive experience in digital strategy, campaign management, and brand development. Proven track record of driving engagement and conversion through data-driven marketing initiatives."
  } else if (keywords.includes('data') || keywords.includes('analyst')) {
    return "Detail-oriented Data Analyst with expertise in statistical analysis, data visualization, and business intelligence. Skilled at transforming complex datasets into actionable insights that inform strategic decision-making."
  } else {
    return "Dedicated professional with a strong background in driving results and exceeding expectations. Committed to leveraging skills and experience to contribute to organizational success and growth."
  }
}

function generateExperience(description: string): Array<{
  title: string
  company: string
  years: string
  description: string
  achievements: string[]
}> {
  const keywords = description.toLowerCase()
  
  if (keywords.includes('software') || keywords.includes('developer')) {
    return [
      {
        title: "Senior Software Engineer",
        company: "Tech Innovations Inc.",
        years: "2022 - Present",
        description: "Lead development of scalable web applications serving 100K+ users",
        achievements: [
          "Reduced application load time by 40% through optimization",
          "Led team of 5 developers in agile environment",
          "Implemented CI/CD pipeline improving deployment efficiency by 60%"
        ]
      },
      {
        title: "Software Developer",
        company: "Digital Solutions Ltd.",
        years: "2020 - 2022",
        description: "Developed and maintained full-stack applications using modern frameworks",
        achievements: [
          "Built responsive web applications using React and Node.js",
          "Collaborated with cross-functional teams to deliver projects on time",
          "Mentored junior developers and conducted code reviews"
        ]
      }
    ]
  }
  
  return [
    {
      title: "Professional Role",
      company: "Growing Company",
      years: "2022 - Present",
      description: "Contributed to organizational growth and success through dedicated work",
      achievements: [
        "Exceeded performance targets consistently",
        "Collaborated effectively with team members",
        "Implemented process improvements"
      ]
    }
  ]
}

function generateSkills(description: string): string[] {
  const keywords = description.toLowerCase()
  
  if (keywords.includes('software') || keywords.includes('developer') || keywords.includes('react')) {
    return [
      "JavaScript", "TypeScript", "React", "Node.js", "Python", 
      "SQL", "Git", "Docker", "AWS", "MongoDB", "REST APIs", 
      "Agile/Scrum", "Test-Driven Development"
    ]
  } else if (keywords.includes('marketing')) {
    return [
      "Digital Marketing", "SEO/SEM", "Google Analytics", "Social Media Marketing",
      "Content Strategy", "Email Marketing", "PPC Campaigns", "Brand Management",
      "Marketing Automation", "A/B Testing"
    ]
  } else if (keywords.includes('data') || keywords.includes('analyst')) {
    return [
      "Python", "R", "SQL", "Tableau", "Power BI", "Excel", "Statistical Analysis",
      "Data Visualization", "Machine Learning", "Pandas", "NumPy", "ETL Processes"
    ]
  }
  
  return [
    "Communication", "Leadership", "Problem Solving", "Project Management",
    "Team Collaboration", "Strategic Planning", "Process Improvement"
  ]
}

function generateEducation(description: string): string {
  const keywords = description.toLowerCase()
  
  if (keywords.includes('software') || keywords.includes('computer')) {
    return "Bachelor of Science in Computer Science, State University (2020)"
  } else if (keywords.includes('business') || keywords.includes('marketing')) {
    return "Bachelor of Business Administration, Business College (2020)"
  } else if (keywords.includes('data') || keywords.includes('mathematics')) {
    return "Bachelor of Science in Mathematics, Technical University (2020)"
  }
  
  return "Bachelor's Degree, University (2020)"
}

function generateProjects(description: string): Array<{
  name: string
  description: string
  technologies: string[]
  link?: string
}> {
  const keywords = description.toLowerCase()
  
  if (keywords.includes('software') || keywords.includes('developer')) {
    return [
      {
        name: "E-commerce Platform",
        description: "Full-stack e-commerce application with payment integration and inventory management",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
        link: "github.com/johndoe/ecommerce-app"
      },
      {
        name: "Task Management System",
        description: "Collaborative project management tool with real-time updates and team features",
        technologies: ["Next.js", "PostgreSQL", "Socket.io", "Tailwind CSS"]
      }
    ]
  }
  
  return [
    {
      name: "Professional Project",
      description: "Successfully completed project demonstrating key skills and expertise",
      technologies: ["Various Tools", "Industry Standards"]
    }
  ]
}

function generateCertifications(description: string): string[] {
  const keywords = description.toLowerCase()
  
  if (keywords.includes('aws') || keywords.includes('cloud')) {
    return ["AWS Certified Solutions Architect", "AWS Certified Developer"]
  } else if (keywords.includes('google') || keywords.includes('marketing')) {
    return ["Google Analytics Certified", "Google Ads Certification"]
  } else if (keywords.includes('microsoft') || keywords.includes('azure')) {
    return ["Microsoft Azure Fundamentals", "Microsoft Certified: Azure Developer"]
  }
  
  return ["Professional Certification in Relevant Field"]
}
