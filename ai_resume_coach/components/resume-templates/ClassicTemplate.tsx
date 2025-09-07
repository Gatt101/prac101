import { Badge } from "@/components/ui/badge"

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

interface ClassicTemplateProps {
  data: ResumeData
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white text-black font-serif p-8 shadow-lg">
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
        <div className="text-sm space-y-1">
          <p>{data.email} • {data.phone}</p>
          {data.location && <p>{data.location}</p>}
          {(data.linkedin || data.website) && (
            <p>
              {data.linkedin && data.linkedin}
              {data.linkedin && data.website && " • "}
              {data.website && data.website}
            </p>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-400">
          Professional Summary
        </h2>
        <p className="text-justify leading-relaxed">{data.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-400">
          Professional Experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold">{exp.title}</h3>
                <span className="text-sm font-medium">{exp.years}</span>
              </div>
              <p className="font-medium mb-2">{exp.company}</p>
              <p className="text-sm mb-2">{exp.description}</p>
              {exp.achievements && (
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
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
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-400">
          Skills & Competencies
        </h2>
        <div className="grid grid-cols-3 gap-2 text-sm">
          {data.skills.map((skill, index) => (
            <span key={index}>• {skill}</span>
          ))}
        </div>
      </section>

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-400">
            Notable Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-bold">{project.name}</h3>
                <p className="text-sm mb-1">{project.description}</p>
                <p className="text-xs text-gray-600">
                  Technologies: {project.technologies.join(", ")}
                </p>
                {project.link && (
                  <p className="text-xs text-gray-600">{project.link}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-400">
          Education
        </h2>
        <p>{data.education}</p>
      </section>

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-400">
            Certifications
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
