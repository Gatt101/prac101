import { Card, CardContent } from "@/components/ui/card"
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

interface ModernTemplateProps {
  data: ResumeData
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 shadow-lg">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
        <div className="flex flex-wrap gap-4 text-blue-100">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{data.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{data.phone}</span>
          </div>
          {data.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{data.location}</span>
            </div>
          )}
          {data.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">{data.linkedin}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span className="text-sm">{data.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-8">
        {/* Professional Summary */}
        <section>
          <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <Badge variant="outline" className="text-gray-600">{exp.years}</Badge>
                </div>
                <p className="text-gray-700 mb-2">{exp.description}</p>
                {exp.achievements && (
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
              Key Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.link && (
                    <p className="text-blue-600 text-sm">{project.link}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        <section>
          <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
            Education
          </h2>
          <p className="text-gray-700">{data.education}</p>
        </section>

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {data.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
