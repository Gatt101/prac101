import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react"

interface ResumeData {
  name: string
  email: string
  phone: string
  location?: string
  linkedin?: string
  website?: string
  summary: string
  experience: Array<{
    title: string
    company: string
    years: string
    description: string
    achievements?: string[]
  }>
  skills: string[]
  education: string
  projects?: Array<{
    name: string
    description: string
    technologies: string[]
    link?: string
  }>
  certifications?: string[]
}

interface ProfessionalTemplateProps {
  data: ResumeData
}

export function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white text-blue-900 font-sans shadow-lg">
      {/* Header with Blue Top Border */}
      <div className="border-t-8 border-blue-600">
        <div className="p-8 pb-6">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">{data.name}</h1>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>{data.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>{data.phone}</span>
              </div>
            </div>
            <div className="space-y-1">
              {data.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{data.location}</span>
                </div>
              )}
              {data.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span>{data.linkedin}</span>
                </div>
              )}
              {data.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>{data.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8 space-y-8">
        {/* Executive Summary */}
        <section>
          <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
            EXECUTIVE SUMMARY
          </h2>
          <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        </section>

        {/* Professional Experience */}
        <section>
          <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-800">{exp.title}</h3>
                    <p className="text-blue-600 font-medium text-lg">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-600 text-white">{exp.years}</Badge>
                  </div>
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>
                {exp.achievements && (
                  <div className="ml-4">
                    <h4 className="font-semibold text-blue-700 mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-600 flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Core Competencies */}
        <section>
          <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
            CORE COMPETENCIES
          </h2>
          <div className="bg-gray-50 p-4 rounded">
            <div className="grid grid-cols-3 gap-4">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
              NOTABLE PROJECTS
            </h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">{project.name}</h3>
                  <p className="text-gray-700 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-blue-300 text-blue-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.link && (
                    <p className="text-blue-600 text-sm font-medium">{project.link}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
              EDUCATION
            </h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-700 font-medium">{data.education}</p>
            </div>
          </section>

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
                CERTIFICATIONS
              </h2>
              <div className="bg-gray-50 p-4 rounded space-y-2">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
