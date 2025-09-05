"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Play,
  Lock,
  Star,
  Target,
  Calendar,
  Award,
  ExternalLink,
  Plus,
  Filter,
  Search,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const learningPath = [
  {
    week: 1,
    title: "React Fundamentals",
    description: "Master the basics of React including components, props, and state management",
    status: "completed",
    progress: 100,
    duration: "8 hours",
    modules: [
      { name: "Introduction to React", completed: true, duration: "1.5h", type: "video" },
      { name: "Components and JSX", completed: true, duration: "2h", type: "interactive" },
      { name: "Props and State", completed: true, duration: "2.5h", type: "video" },
      { name: "Event Handling", completed: true, duration: "1.5h", type: "practice" },
      { name: "Week 1 Project", completed: true, duration: "0.5h", type: "project" },
    ],
    skills: ["React", "JavaScript", "JSX"],
    certificate: true,
  },
  {
    week: 2,
    title: "Advanced React Patterns",
    description: "Learn hooks, context API, and advanced component patterns",
    status: "completed",
    progress: 100,
    duration: "10 hours",
    modules: [
      { name: "React Hooks Deep Dive", completed: true, duration: "3h", type: "video" },
      { name: "Context API & State Management", completed: true, duration: "2.5h", type: "interactive" },
      { name: "Custom Hooks", completed: true, duration: "2h", type: "practice" },
      { name: "Performance Optimization", completed: true, duration: "2h", type: "video" },
      { name: "Advanced Patterns Project", completed: true, duration: "0.5h", type: "project" },
    ],
    skills: ["React Hooks", "Context API", "Performance"],
    certificate: true,
  },
  {
    week: 3,
    title: "AWS Cloud Basics",
    description: "Introduction to AWS services and cloud computing fundamentals",
    status: "current",
    progress: 60,
    duration: "12 hours",
    modules: [
      { name: "AWS Overview & Setup", completed: true, duration: "2h", type: "video" },
      { name: "EC2 & Compute Services", completed: true, duration: "3h", type: "interactive" },
      { name: "S3 & Storage Solutions", completed: true, duration: "2.5h", type: "practice" },
      { name: "Lambda & Serverless", completed: false, duration: "2.5h", type: "video" },
      { name: "AWS Deployment Project", completed: false, duration: "2h", type: "project" },
    ],
    skills: ["AWS", "Cloud Computing", "DevOps"],
    certificate: false,
  },
  {
    week: 4,
    title: "TypeScript Deep Dive",
    description: "Master TypeScript for better code quality and developer experience",
    status: "locked",
    progress: 0,
    duration: "9 hours",
    modules: [
      { name: "TypeScript Fundamentals", completed: false, duration: "2.5h", type: "video" },
      { name: "Advanced Types", completed: false, duration: "2h", type: "interactive" },
      { name: "Generics & Utility Types", completed: false, duration: "2h", type: "practice" },
      { name: "TypeScript with React", completed: false, duration: "2h", type: "video" },
      { name: "TypeScript Project", completed: false, duration: "0.5h", type: "project" },
    ],
    skills: ["TypeScript", "Type Safety", "Developer Tools"],
    certificate: false,
  },
  {
    week: 5,
    title: "Docker & Containerization",
    description: "Learn containerization with Docker and deployment strategies",
    status: "locked",
    progress: 0,
    duration: "8 hours",
    modules: [
      { name: "Docker Fundamentals", completed: false, duration: "2h", type: "video" },
      { name: "Creating Docker Images", completed: false, duration: "2h", type: "interactive" },
      { name: "Docker Compose", completed: false, duration: "1.5h", type: "practice" },
      { name: "Container Orchestration", completed: false, duration: "2h", type: "video" },
      { name: "Deployment Project", completed: false, duration: "0.5h", type: "project" },
    ],
    skills: ["Docker", "Containerization", "DevOps"],
    certificate: false,
  },
  {
    week: 6,
    title: "System Design Principles",
    description: "Understand scalable system architecture and design patterns",
    status: "locked",
    progress: 0,
    duration: "10 hours",
    modules: [
      { name: "System Design Basics", completed: false, duration: "2.5h", type: "video" },
      { name: "Scalability Patterns", completed: false, duration: "2.5h", type: "interactive" },
      { name: "Database Design", completed: false, duration: "2h", type: "practice" },
      { name: "Microservices Architecture", completed: false, duration: "2.5h", type: "video" },
      { name: "System Design Case Study", completed: false, duration: "0.5h", type: "project" },
    ],
    skills: ["System Design", "Architecture", "Scalability"],
    certificate: false,
  },
  {
    week: 7,
    title: "Full-Stack Project",
    description: "Build and deploy a full-stack application using learned technologies",
    status: "locked",
    progress: 0,
    duration: "15 hours",
    modules: [
      { name: "Project Planning", completed: false, duration: "2h", type: "video" },
      { name: "Frontend Development", completed: false, duration: "5h", type: "interactive" },
      { name: "Backend Development", completed: false, duration: "5h", type: "practice" },
      { name: "Deployment & Monitoring", completed: false, duration: "2.5h", type: "video" },
      { name: "Final Project Submission", completed: false, duration: "0.5h", type: "project" },
    ],
    skills: ["Full-Stack Development", "Project Management", "Deployment"],
    certificate: false,
  }
]

const recommendedCourses = [
  {
    title: "Advanced React Performance",
    provider: "Tech Academy",
    rating: 4.8,
    duration: "6 hours",
    price: "Free",
    level: "Advanced",
    skills: ["React", "Performance", "Optimization"],
  },
  {
    title: "AWS Solutions Architect",
    provider: "Cloud Institute",
    rating: 4.9,
    duration: "20 hours",
    price: "$49",
    level: "Intermediate",
    skills: ["AWS", "Cloud Architecture", "Solutions"],
  },
  {
    title: "TypeScript Masterclass",
    provider: "Code School",
    rating: 4.7,
    duration: "12 hours",
    price: "$29",
    level: "Intermediate",
    skills: ["TypeScript", "JavaScript", "Type Safety"],
  },
]

const skillGaps = [
  { skill: "React", current: 85, target: 95, priority: "high" },
  { skill: "AWS", current: 40, target: 80, priority: "critical" },
  { skill: "TypeScript", current: 60, target: 85, priority: "medium" },
  { skill: "Docker", current: 25, target: 75, priority: "medium" },
]

const getModuleIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Play className="size-4" />
    case "interactive":
      return <Target className="size-4" />
    case "practice":
      return <BookOpen className="size-4" />
    case "project":
      return <Award className="size-4" />
    default:
      return <BookOpen className="size-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "current":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "locked":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export default function LearningPage() {
  const [selectedWeek, setSelectedWeek] = useState(3)
  const [searchTerm, setSearchTerm] = useState("")

  const completedWeeks = learningPath.filter((week) => week.status === "completed").length
  const totalProgress = Math.round(learningPath.reduce((acc, week) => acc + week.progress, 0) / learningPath.length)
  const router = useRouter()
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
          <h1 className="text-3xl font-sans font-bold">Learning Path</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="size-4 mr-2" />
            Add Skill
          </Button>
          <Button>
            <Calendar className="size-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">{totalProgress}%</p>
              </div>
              <div className="size-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <BookOpen className="size-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Weeks Completed</p>
                <p className="text-2xl font-bold">{completedWeeks}/6</p>
              </div>
              <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="size-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Week</p>
                <p className="text-2xl font-bold">Week 3</p>
              </div>
              <div className="size-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Clock className="size-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="size-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Award className="size-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList>
          <TabsTrigger value="timeline">Learning Timeline</TabsTrigger>
          <TabsTrigger value="skills">Skill Gaps</TabsTrigger>
          <TabsTrigger value="courses">Recommended Courses</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          {/* Learning Path Timeline */}
          <div className="space-y-6">
            {learningPath.map((week, i) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Card
                  className={`${week.status === "current" ? "border-secondary shadow-md" : ""} ${week.status === "locked" ? "opacity-60" : ""}`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`size-12 rounded-full flex items-center justify-center font-bold ${
                            week.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : week.status === "current"
                                ? "bg-secondary text-secondary-foreground"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {week.status === "completed" ? <CheckCircle2 className="size-6" /> : week.week}
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {week.title}
                            <Badge className={getStatusColor(week.status)}>
                              {week.status === "current" ? "In Progress" : week.status}
                            </Badge>
                          </CardTitle>
                          <p className="text-muted-foreground">{week.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{week.duration}</div>
                        {week.certificate && week.status === "completed" && (
                          <Badge variant="secondary" className="mt-1">
                            <Award className="size-3 mr-1" />
                            Certified
                          </Badge>
                        )}
                      </div>
                    </div>
                    {week.progress > 0 && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{week.progress}%</span>
                        </div>
                        <Progress value={week.progress} className="h-2" />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {week.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        {week.modules.map((module, j) => (
                          <div key={j} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                            <Checkbox checked={module.completed} disabled={week.status === "locked"} />
                            <div className="flex items-center gap-2 flex-1">
                              {getModuleIcon(module.type)}
                              <span className={`${module.completed ? "line-through text-muted-foreground" : ""}`}>
                                {module.name}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">{module.duration}</div>
                            {week.status !== "locked" && (
                              <Button size="sm" variant="ghost">
                                {module.completed ? "Review" : "Start"}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      {week.status === "current" && (
                        <div className="flex gap-2 pt-2">
                          <Button>Continue Learning</Button>
                          <Button variant="outline">View Resources</Button>
                        </div>
                      )}

                      {week.status === "locked" && (
                        <div className="flex items-center gap-2 text-muted-foreground pt-2">
                          <Lock className="size-4" />
                          <span className="text-sm">Complete previous weeks to unlock</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          {/* Skill Gaps Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="size-5" />
                Skill Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillGaps.map((gap, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{gap.skill}</h4>
                        <Badge
                          variant={
                            gap.priority === "critical"
                              ? "destructive"
                              : gap.priority === "high"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {gap.priority} priority
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {gap.current}% → {gap.target}%
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Level</span>
                        <span>Target Level</span>
                      </div>
                      <div className="relative">
                        <Progress value={gap.target} className="h-3 opacity-30" />
                        <Progress value={gap.current} className="h-3 absolute top-0" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">Add to Learning Path</Button>
                      <Button size="sm" variant="outline">
                        Find Courses
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="size-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Recommended Courses */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedCourses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Card className="h-full cursor-pointer transition-all hover:shadow-md hover:border-secondary/20">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.provider}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="size-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>

                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{course.duration}</span>
                        <span className="font-medium text-foreground">{course.price}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {course.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full">
                        <ExternalLink className="size-4 mr-2" />
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="size-5 text-secondary" />
                      <div>
                        <h4 className="font-medium">React Documentation</h4>
                        <p className="text-sm text-muted-foreground">Official React docs</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="size-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Play className="size-5 text-primary" />
                      <div>
                        <h4 className="font-medium">AWS Training Videos</h4>
                        <p className="text-sm text-muted-foreground">Free AWS tutorials</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="size-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Target className="size-5 text-accent" />
                      <div>
                        <h4 className="font-medium">TypeScript Handbook</h4>
                        <p className="text-sm text-muted-foreground">Complete TS guide</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="size-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Practice Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="size-5 text-yellow-500" />
                      <div>
                        <h4 className="font-medium">Todo App with React</h4>
                        <p className="text-sm text-muted-foreground">Beginner project</p>
                      </div>
                    </div>
                    <Button size="sm">Start</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="size-5 text-yellow-500" />
                      <div>
                        <h4 className="font-medium">AWS Serverless API</h4>
                        <p className="text-sm text-muted-foreground">Intermediate project</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Lock className="size-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="size-5 text-yellow-500" />
                      <div>
                        <h4 className="font-medium">Full-Stack TypeScript App</h4>
                        <p className="text-sm text-muted-foreground">Advanced project</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Lock className="size-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
