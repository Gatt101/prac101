import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Globe, Linkedin, Star } from "lucide-react"

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

interface CreativeTemplateProps {
  data: ResumeData
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 text-gray-900 font-mono shadow-xl">
      <div className="grid grid-cols-3 min-h-screen">
        {/* Left Sidebar */}
        <div className="col-span-1 bg-gradient-to-b from-purple-600 to-blue-600 text-white p-6">
          <div className="sticky top-6">
            {/* Profile Section */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">
                  {data.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h1 className="text-xl font-bold">{data.name}</h1>
            </div>

            {/* Contact */}
            <div className="space-y-3 mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider border-b border-purple-300 pb-1">
                Contact
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  <span className="text-xs">{data.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  <span className="text-xs">{data.phone}</span>
                </div>
                {data.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{data.location}</span>
                  </div>
                )}
                {data.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-3 h-3" />
                    <span className="text-xs">{data.linkedin}</span>
                  </div>
                )}
                {data.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    <span className="text-xs">{data.website}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider border-b border-purple-300 pb-1 mb-3">
                Skills
              </h3>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                    <span className="text-xs">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider border-b border-purple-300 pb-1 mb-3">
                Education
              </h3>
              <p className="text-xs leading-relaxed">{data.education}</p>
            </div>

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider border-b border-purple-300 pb-1 mb-3">
                  Certifications
                </h3>
                <div className="space-y-1">
                  {data.certifications.map((cert, index) => (
                    <p key={index} className="text-xs leading-relaxed">{cert}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-8">
          {/* Summary */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Professional Summary
            </h2>
            <div className="bg-white/70 p-4 rounded-lg border-l-4 border-purple-500">
              <p className="leading-relaxed text-sm">{data.summary}</p>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="bg-white/70 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{exp.title}</h3>
                      <p className="text-purple-600 font-medium">{exp.company}</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      {exp.years}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{exp.description}</p>
                  {exp.achievements && (
                    <ul className="list-none space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                          <span className="text-purple-500 font-bold">▸</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Featured Projects
              </h2>
              <div className="grid gap-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="bg-white/70 p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-purple-300 text-purple-700">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.link && (
                      <p className="text-xs text-blue-600 font-mono">{project.link}</p>
                    )}
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
