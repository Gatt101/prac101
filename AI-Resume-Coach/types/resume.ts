export interface ResumeData {
  name: string
  email: string
  phone: string
  location?: string
  linkedin?: string
  website?: string
  summary: string
  experience: ExperienceItem[]
  skills: string[]
  education: string
  projects?: ProjectItem[]
  certifications?: string[]
}

export interface ExperienceItem {
  title: string
  company: string
  years: string
  description: string
  achievements?: string[]
}

export interface ProjectItem {
  name: string
  description: string
  technologies: string[]
  link?: string
}

export interface TemplateOption {
  value: string
  label: string
  description: string
}

export type TemplateType = 'modern' | 'classic' | 'creative' | 'professional'
