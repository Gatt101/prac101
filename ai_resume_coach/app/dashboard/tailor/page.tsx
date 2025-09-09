"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, FileText, Wand2, Download, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { ModernTemplate } from "@/components/resume-templates/ModernTemplate";
import { ClassicTemplate } from "@/components/resume-templates/ClassicTemplate";
import { CreativeTemplate } from "@/components/resume-templates/CreativeTemplate";
import { ProfessionalTemplate } from "@/components/resume-templates/ProfessionalTemplate";
import { useRouter } from "next/navigation";

interface Resume {
  _id: string;
  title: string;
  template: string;
  data: any;
  createdAt: string;
  updatedAt: string;
}

export default function TailorPage() {
  const router = useRouter()
  const [jobDescription, setJobDescription] = useState("");
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [tailoredResume, setTailoredResume] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("select");

  // Fetch resumes on mount
  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/resume');
      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }
      const json = await response.json();
      
      if (json.success && json.resumes) {
        setResumes(json.resumes);
      } else {
        setResumes([]);
      }
      
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setError("Failed to load resumes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeSelect = (resume: Resume) => {
    setSelectedResume(resume);
    setTailoredResume(null);
    setActiveTab("tailor");
    setError(null);
    setSuccess(null);
  };

  const handleTailorResume = async () => {
    if (!jobDescription.trim()) {
      setError("Please provide a job description.");
      return;
    }
    if (!selectedResume) {
      setError("Please select a resume to tailor.");
      return;
    }

    setIsTailoring(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/resume/tailor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeId: selectedResume._id,
          jobDescription,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to tailor resume');
      }

      const data = await response.json();
      setTailoredResume(data.resume);
      setActiveTab("result");
      setSuccess("Resume successfully tailored for the job!");
      
    } catch (error) {
      console.error("Error tailoring resume:", error);
      setError(error instanceof Error ? error.message : "Failed to tailor resume. Please try again.");
    } finally {
      setIsTailoring(false);
    }
  };

  const renderResumeTemplate = (resumeData: any, template: string) => {
    if (!resumeData) return null;
    
    switch (template) {
      case "modern":
        return <ModernTemplate data={resumeData} />;
      case "classic":
        return <ClassicTemplate data={resumeData} />;
      case "creative":
        return <CreativeTemplate data={resumeData} />;
      case "professional":
        return <ProfessionalTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark p-6">
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
          <div className="p-2 bg-purple-600 rounded-lg">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Resume Tailor</h1>
            <p className="text-gray-400">Optimize your resume for specific job descriptions</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
            <TabsTrigger value="select" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Select Resume
            </TabsTrigger>
            <TabsTrigger value="tailor" disabled={!selectedResume} className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Tailor
            </TabsTrigger>
            <TabsTrigger value="result" disabled={!tailoredResume} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Result
            </TabsTrigger>
          </TabsList>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-600">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-600">{success}</p>
            </div>
          )}

          <TabsContent value="select" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Choose a Resume to Tailor
                </CardTitle>
                <p className="text-gray-600">
                  Select from your saved resumes to optimize for a specific job
                </p>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                  </div>
                ) : resumes.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No resumes found</p>
                    <Button 
                      onClick={() => router.push('/dashboard/builder')}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Create Your First Resume
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {resumes.map((resume) => (
                      <div
                        key={resume._id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedResume?._id === resume._id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleResumeSelect(resume)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{resume.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Template: {resume.template || 'Modern'}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                          {selectedResume?._id === resume._id && (
                            <CheckCircle className="w-5 h-5 text-purple-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tailor" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="w-5 h-5" />
                    Job Description
                  </CardTitle>
                  <p className="text-gray-600">
                    Paste the job posting to tailor your resume
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste the complete job description here..."
                    className="min-h-[300px] resize-none"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <Button
                    onClick={handleTailorResume}
                    disabled={isTailoring || !jobDescription.trim() || !selectedResume}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12"
                  >
                    {isTailoring ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Tailoring Resume...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 w-5 h-5" />
                        Tailor Resume
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {selectedResume && (
                <Card>
                  <CardHeader>
                    <CardTitle>Current Resume Preview</CardTitle>
                    <p className="text-gray-600">{selectedResume.title}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white rounded-lg shadow-sm border max-h-[400px] overflow-y-auto">
                      <div className="scale-50 transform-gpu origin-top-left w-[200%]">
                        {renderResumeTemplate(selectedResume.data, selectedResume.template)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="result" className="space-y-6">
            {tailoredResume && (
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Original Resume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white rounded-lg shadow-sm border max-h-[500px] overflow-y-auto">
                      <div className="scale-50 transform-gpu origin-top-left w-[200%]">
                        {selectedResume && renderResumeTemplate(selectedResume.data, selectedResume.template)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-600">Tailored Resume</CardTitle>
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => window.print()}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white rounded-lg shadow-sm border max-h-[500px] overflow-y-auto">
                      <div className="scale-50 transform-gpu origin-top-left w-[200%]">
                        {renderResumeTemplate(tailoredResume, selectedResume?.template || 'modern')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}