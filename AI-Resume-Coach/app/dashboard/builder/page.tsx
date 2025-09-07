"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Download, FileText, Wand2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemplatePreview } from "@/components/resume-templates/TemplatePreview"
import { ModernTemplate } from "@/components/resume-templates/ModernTemplate"
import { ClassicTemplate } from "@/components/resume-templates/ClassicTemplate"
import { CreativeTemplate } from "@/components/resume-templates/CreativeTemplate"
import { ProfessionalTemplate } from "@/components/resume-templates/ProfessionalTemplate"
import { ExamplePrompts } from "@/components/resume-templates/ExamplePrompts"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"


export default function BuilderPage() {
    const router = useRouter()
    const [description, setDescription] = useState("")
    const [selectedTemplate, setSelectedTemplate] = useState("modern")
    const [resume, setResume] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("create")
    const [showExamples, setShowExamples] = useState(false)

    const templates = [
        { value: "modern", label: "Modern", description: "Clean, contemporary design with gradient header" },
        { value: "classic", label: "Classic", description: "Traditional, formal layout with serif typography" },
        { value: "creative", label: "Creative", description: "Colorful, innovative design with sidebar layout" },
        { value: "professional", label: "Professional", description: "Corporate-style layout with blue accents" },
    ]

    const handleGenerateResume = async () => {
        if (!description.trim()) {
            setError('Please provide a description of your background and preferences.')
            return
        }

        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch('/api/resume/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description, template: selectedTemplate }),
            })
            
            if (!response.ok) {
                throw new Error('Failed to generate resume')
            }
            
            const data = await response.json()
            setResume(data.resume)
            setActiveTab("preview")
        } catch (err) {
            setError('An error occurred while generating the resume. Please try again.')
            console.error('Resume generation error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDownloadPDF = () => {
        if (!resume) return
        
        // Create a print-friendly version
        const printWindow = window.open('', '_blank')
        if (!printWindow) return
        const resumeHTML = document.querySelector('[data-resume-preview]')?.innerHTML || ''
        const printHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${resume.name || 'Resume'} - Resume</title>
                <style>
                    body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                    @media print {
                        body { margin: 0; padding: 0; }
                        .no-print { display: none !important; }
                    }
                    /* Include basic styles for templates */
                    .modern-template { background: white; color: #1f2937; }
                    .classic-template { background: #f9fafb; color: black; font-family: serif; }
                    .creative-template { background: linear-gradient(135deg, #f3e8ff 0%, #dbeafe 100%); color: #111827; font-family: monospace; }
                    .professional-template { background: white; color: #1e3a8a; border-top: 8px solid #2563eb; }
                </style>
            </head>
            <body>
                <div class="${selectedTemplate}-template">
                    ${resumeHTML}
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                        window.onafterprint = function() {
                            window.close();
                        }
                    }
                </script>
            </body>
            </html>
        `
        
        printWindow.document.write(printHTML)
        printWindow.document.close()
    }

    const renderResumeTemplate = () => {
        if (!resume) return null
        
        switch (selectedTemplate) {
            case "modern":
                return <ModernTemplate data={resume} />
            case "classic":
                return <ClassicTemplate data={resume} />
            case "creative":
                return <CreativeTemplate data={resume} />
            case "professional":
                return <ProfessionalTemplate data={resume} />
            default:
                return <ModernTemplate data={resume} />
        }
    }

    return (
        <div className="min-h-screen bg-dark p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => router.push('/dashboard')}
                    className="hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Wand2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">AI Resume Builder</h1>
                        <p className="text-gray-400">Create professional resumes with AI assistance</p>
                    </div>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
                    <TabsTrigger value="create" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Create
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="flex items-center gap-2">
                        <Wand2 className="w-4 h-4" />
                        Templates
                    </TabsTrigger>
                    <TabsTrigger value="preview" disabled={!resume} className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Preview
                    </TabsTrigger>
                </TabsList>

                {/* Create Tab */}
                <TabsContent value="create" className="space-y-6">
                    <Card className="max-w-4xl mx-auto">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Tell us about yourself
                            </CardTitle>
                            <p className="text-gray-600">
                                Describe your professional background, skills, and career goals. Our AI will create a tailored resume for you.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Professional Background
                                </label>
                                <Textarea
                                    placeholder="Example: Software engineer with 5 years of experience in React, Node.js, and Python. Passionate about building scalable web applications and leading development teams. Looking for a senior developer role at a tech company focused on innovation..."
                                    className="w-full min-h-[200px] resize-none"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Include your experience, skills, achievements, and career objectives (minimum 50 characters)
                                </p>
                            </div>

                            <Collapsible open={showExamples} onOpenChange={setShowExamples}>
                                <CollapsibleTrigger className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                    {showExamples ? 'Hide' : 'Show'} example prompts →
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-3">
                                    <ExamplePrompts onSelectPrompt={(prompt) => {
                                        setDescription(prompt)
                                        setShowExamples(false)
                                    }} />
                                </CollapsibleContent>
                            </Collapsible>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Quick Template Preview
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {templates.map((template) => (
                                        <div
                                            key={template.value}
                                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                                selectedTemplate === template.value
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            onClick={() => setSelectedTemplate(template.value)}
                                        >
                                            <h4 className="font-medium text-sm">{template.label}</h4>
                                            <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                                            {selectedTemplate === template.value && (
                                                <Badge className="mt-2 text-xs bg-blue-500">Selected</Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                onClick={handleGenerateResume}
                                disabled={isLoading || !description.trim() || description.length < 50}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                                        Generating Your Resume...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="mr-2 w-5 h-5" />
                                        Generate AI Resume
                                    </>
                                )}
                            </Button>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">{error}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Templates Tab */}
                <TabsContent value="templates" className="space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Resume Template</h2>
                        <p className="text-gray-600">Select a design that best represents your professional style</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {templates.map((template) => (
                            <TemplatePreview
                                key={template.value}
                                template={template.value}
                                isSelected={selectedTemplate === template.value}
                                onClick={() => setSelectedTemplate(template.value)}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center mt-8">
                        <Button
                            onClick={() => setActiveTab("create")}
                            variant="outline"
                            className="mr-4"
                        >
                            Back to Create
                        </Button>
                        <Button
                            onClick={() => setActiveTab("preview")}
                            disabled={!resume}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            View Preview
                        </Button>
                    </div>
                </TabsContent>

                {/* Preview Tab */}
                <TabsContent value="preview" className="space-y-6">
                    {resume ? (
                        <>
                            <div className="flex justify-between items-center max-w-4xl mx-auto">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Your Resume Preview</h2>
                                    <p className="text-gray-600">Template: {templates.find(t => t.value === selectedTemplate)?.label}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => setActiveTab("create")}
                                        variant="outline"
                                    >
                                        Edit Content
                                    </Button>
                                    <Button
                                        onClick={() => setActiveTab("templates")}
                                        variant="outline"
                                    >
                                        Change Template
                                    </Button>
                                    <Button
                                        onClick={handleDownloadPDF}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download PDF
                                    </Button>
                                </div>
                            </div>

                            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden" data-resume-preview>
                                {renderResumeTemplate()}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Resume Generated Yet</h3>
                            <p className="text-gray-600 mb-4">Create your resume first to see the preview</p>
                            <Button onClick={() => setActiveTab("create")} className="bg-blue-600 hover:bg-blue-700">
                                Start Creating
                            </Button>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}