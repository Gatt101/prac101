import { Badge } from "@/components/ui/badge"

interface ResumeData {
  name?: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  website?: string
  summary?: string
  experience?: Array<{
    title?: string
    company?: string
    years?: string
    description?: string
    achievements?: string[]
  }>
  skills?: string[]
  education?: string
  projects?: Array<{
    name?: string
    description?: string
    technologies?: string[]
    link?: string
  }>
  certifications?: string[]
}

interface ClassicTemplateProps {
  data: ResumeData
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  // Safe data access with defaults
  const safeData = {
    name: data?.name || "Professional Name",
    email: data?.email || "email@example.com",
    phone: data?.phone || "Phone Number",
    location: data?.location,
    linkedin: data?.linkedin,
    website: data?.website,
    summary: data?.summary || "Professional summary not available",
    experience: Array.isArray(data?.experience) ? data.experience : [],
    skills: Array.isArray(data?.skills) ? data.skills : [],
    education: data?.education || "Education information not available",
    projects: Array.isArray(data?.projects) ? data.projects : [],
    certifications: Array.isArray(data?.certifications) ? data.certifications : []
  }

  return (
    <div className="max-w-4xl mx-auto bg-white text-black font-serif p-8 shadow-lg">
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold mb-2">{safeData.name}</h1>
        <div className="text-sm space-y-1">
          <p>{safeData.email} • {safeData.phone}</p>
          {safeData.location && <p>{safeData.location}</p>}
          {(safeData.linkedin || safeData.website) && (
            <p>
              {safeData.linkedin && safeData.linkedin}
              {safeData.linkedin && safeData.website && " • "}
              {safeData.website && safeData.website}
            </p>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-400">
          Professional Summary
        </h2>
        <p className="text-justify leading-relaxed">{safeData.summary}</p>
      </section>

      {/* Experience */}
      {safeData.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-400">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {safeData.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold">{exp.title || "Job Title"}</h3>
                  <span className="text-sm font-medium">{exp.years || "Years"}</span>
                </div>
                <p className="font-medium mb-2">{exp.company || "Company"}</p>
                <p className="text-sm mb-2">{exp.description || "Job description"}</p>
                {exp.achievements && exp.achievements.length > 0 && (
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
      )}

      {/* Skills */}
      {safeData.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-400">
            Skills & Competencies
          </h2>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {safeData.skills.map((skill, index) => (
              <span key={index}>• {skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {safeData.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-400">
            Notable Projects
          </h2>
          <div className="space-y-3">
            {safeData.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-bold">{project.name || "Project Name"}</h3>
                <p className="text-sm mb-1">{project.description || "Project description"}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-xs text-gray-600">
                    Technologies: {project.technologies.join(", ")}
                  </p>
                )}
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
        <p>{safeData.education}</p>
      </section>

      {/* Certifications */}
      {safeData.certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide border-b border-gray-400">
            Certifications
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            {safeData.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
