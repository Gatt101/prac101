"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Upload,
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  Zap,
  Target,
  Star,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type Resume = {
  id: number
  name: string
  fileName: string
  jdMatch: number
  lastUpdated: string
  status: string
  targetRole: string
  company: string
  uploadDate: string
  fileSize: string
  optimizations: number
}

const resumes: Resume[] = [
  {
    id: 1,
    name: "Software Engineer Resume",
    fileName: "software_engineer_resume.pdf",
    jdMatch: 89,
    lastUpdated: "2 hours ago",
    status: "optimized",
    targetRole: "Senior Software Engineer",
    company: "Google",
    uploadDate: "2024-01-15",
    fileSize: "245 KB",
    optimizations: 12,
  },
  {
    id: 2,
    name: "Product Manager Resume",
    fileName: "product_manager_resume.pdf",
    jdMatch: 76,
    lastUpdated: "1 day ago",
    status: "pending",
    targetRole: "Product Manager",
    company: "Meta",
    uploadDate: "2024-01-14",
    fileSize: "198 KB",
    optimizations: 8,
  },
  {
    id: 3,
    name: "Data Scientist Resume",
    fileName: "data_scientist_resume.pdf",
    jdMatch: 92,
    lastUpdated: "3 days ago",
    status: "optimized",
    targetRole: "Senior Data Scientist",
    company: "Netflix",
    uploadDate: "2024-01-12",
    fileSize: "312 KB",
    optimizations: 15,
  },
  {
    id: 4,
    name: "Frontend Developer Resume",
    fileName: "frontend_dev_resume.pdf",
    jdMatch: 67,
    lastUpdated: "1 week ago",
    status: "needs-review",
    targetRole: "Frontend Developer",
    company: "Airbnb",
    uploadDate: "2024-01-08",
    fileSize: "189 KB",
    optimizations: 5,
  },
]

const templates = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Clean, ATS-friendly design perfect for tech roles",
    preview: "/placeholder.svg?height=300&width=200",
    category: "Tech",
  },
  {
    id: 2,
    name: "Executive",
    description: "Sophisticated layout for senior leadership positions",
    preview: "/placeholder.svg?height=300&width=200",
    category: "Leadership",
  },
  {
    id: 3,
    name: "Creative",
    description: "Stylish design for creative and design roles",
    preview: "/placeholder.svg?height=300&width=200",
    category: "Creative",
  },
  {
    id: 4,
    name: "Academic",
    description: "Traditional format for academic and research positions",
    preview: "/placeholder.svg?height=300&width=200",
    category: "Academic",
  },
]

export default function ResumesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [jobDescription, setJobDescription] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimized":
        return <CheckCircle2 className="size-4 text-green-500" />
      case "pending":
        return <Clock className="size-4 text-yellow-500" />
      case "needs-review":
        return <AlertCircle className="size-4 text-red-500" />
      default:
        return <FileText className="size-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimized":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "needs-review":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const filteredResumes = resumes.filter(
    (resume) =>
      resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.targetRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => router.push('/dashboard')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-sans font-bold">My Resumes</h1>
            <p className="text-muted-foreground">Manage and optimize your resumes for different roles</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowUploadModal(true)}>
            <Plus className="size-4 mr-2" />
            New Resume
          </Button>
          <Button>
            <Upload className="size-4 mr-2" />
            Upload Resume
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            placeholder="Search resumes, roles, or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="size-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="resumes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="resumes">My Resumes ({resumes.length})</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="optimize">Optimize</TabsTrigger>
        </TabsList>

        <TabsContent value="resumes" className="space-y-4">
          {/* Resume Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredResumes.map((resume, i) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Card className="cursor-pointer transition-all hover:shadow-md hover:border-secondary/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="size-5 text-secondary" />
                        <div>
                          <CardTitle className="text-base">{resume.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{resume.fileName}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="size-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="size-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="size-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="size-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* JD Match Score */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>JD Match Score</span>
                        <span className="font-medium">{resume.jdMatch}%</span>
                      </div>
                      <Progress value={resume.jdMatch} className="h-2" />
                    </div>

                    {/* Status and Details */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(resume.status)}>
                          {getStatusIcon(resume.status)}
                          <span className="ml-1 capitalize">{resume.status.replace("-", " ")}</span>
                        </Badge>
                        <span className="text-xs text-muted-foreground">{resume.lastUpdated}</span>
                      </div>

                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Target Role:</span>
                          <span className="font-medium">{resume.targetRole}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Company:</span>
                          <span className="font-medium">{resume.company}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Optimizations:</span>
                          <span className="font-medium">{resume.optimizations}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="size-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Zap className="size-3 mr-1" />
                        Optimize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredResumes.length === 0 && (
            <div className="text-center py-12">
              <FileText className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No resumes found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search terms" : "Upload your first resume to get started"}
              </p>
              <Button onClick={() => setShowUploadModal(true)}>
                <Upload className="size-4 mr-2" />
                Upload Resume
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {templates.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Card className="cursor-pointer transition-all hover:shadow-md hover:border-secondary/20">
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <FileText className="size-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                    <Button size="sm" className="w-full mt-3">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="optimize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="size-5" />
                Resume Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Select Resume */}
              <div>
                <Label className="text-base font-medium">Step 1: Select Resume</Label>
                <p className="text-sm text-muted-foreground mb-3">Choose a resume to optimize</p>
                <div className="grid gap-3 md:grid-cols-2">
                  {resumes.slice(0, 2).map((resume) => (
                    <Card
                      key={resume.id}
                      className={`cursor-pointer transition-all ${
                        selectedResume?.id === resume.id
                          ? "border-secondary bg-secondary/5"
                          : "hover:border-secondary/20"
                      }`}
                      onClick={() => setSelectedResume(resume)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="size-8 text-secondary" />
                          <div className="flex-1">
                            <h4 className="font-medium">{resume.name}</h4>
                            <p className="text-sm text-muted-foreground">JD Match: {resume.jdMatch}%</p>
                          </div>
                          {selectedResume?.id === resume.id && <CheckCircle2 className="size-5 text-secondary" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Step 2: Job Description */}
              <div>
                <Label className="text-base font-medium">Step 2: Add Job Description</Label>
                <p className="text-sm text-muted-foreground mb-3">Paste the job description you're targeting</p>
                <Textarea
                  placeholder="Paste the complete job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              {/* Step 3: Optimize */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  disabled={!selectedResume || !jobDescription.trim()}
                  className="flex items-center gap-2"
                >
                  <Zap className="size-4" />
                  Optimize Resume
                </Button>
                <Button size="lg" variant="outline">
                  Preview Changes
                </Button>
              </div>

              {/* Optimization Preview */}
              {selectedResume && jobDescription && (
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Star className="size-4 text-yellow-500" />
                      Optimization Preview
                    </h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h5 className="text-sm font-medium mb-2">Potential Improvements</h5>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Add 8 missing keywords from job description</li>
                          <li>• Strengthen 3 bullet points with metrics</li>
                          <li>• Optimize skills section for ATS</li>
                          <li>• Improve summary alignment with role</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Expected Results</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>JD Match Score:</span>
                            <span className="text-secondary font-medium">{selectedResume.jdMatch}% → 94%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>ATS Compatibility:</span>
                            <span className="text-secondary font-medium">+15%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Keyword Density:</span>
                            <span className="text-secondary font-medium">+22%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
