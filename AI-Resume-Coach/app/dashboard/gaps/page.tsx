'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Target, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Star,
  ArrowRight,
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const skillGaps = [
  {
    skill: "React",
    currentLevel: 3,
    requiredLevel: 5,
    priority: "critical",
    gap: 40,
    description: "Advanced React patterns and performance optimization needed"
  },
  {
    skill: "AWS",
    currentLevel: 2,
    requiredLevel: 4,
    priority: "high",
    gap: 50,
    description: "Cloud architecture and deployment experience required"
  },
  {
    skill: "TypeScript",
    currentLevel: 4,
    requiredLevel: 5,
    priority: "medium",
    gap: 20,
    description: "Advanced type definitions and generics knowledge needed"
  },
  {
    skill: "Docker",
    currentLevel: 1,
    requiredLevel: 3,
    priority: "low",
    gap: 65,
    description: "Containerization and orchestration fundamentals"
  }
]

const recommendations = [
  {
    title: "React Performance Optimization Course",
    provider: "Frontend Masters",
    duration: "6 hours",
    rating: 4.8,
    skills: ["React", "Performance"],
    type: "course"
  },
  {
    title: "AWS Solutions Architect Certification",
    provider: "AWS",
    duration: "3 months",
    rating: 4.9,
    skills: ["AWS", "Cloud Architecture"],
    type: "certification"
  },
  {
    title: "TypeScript Deep Dive",
    provider: "Udemy",
    duration: "12 hours",
    rating: 4.7,
    skills: ["TypeScript"],
    type: "course"
  }
]

export default function GapsPage() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("analysis")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-red-500"
      case "high": return "text-orange-500"
      case "medium": return "text-yellow-500"
      case "low": return "text-green-500"
      default: return "text-gray-500"
    }
  }

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800"
      case "high": return "bg-orange-100 text-orange-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

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
            <h1 className="text-3xl font-bold">Gap Analysis</h1>
            <p className="text-muted-foreground">Identify and close your skill gaps</p>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <Target className="size-4" />
          Run New Analysis
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-500">4</div>
            <div className="text-sm text-muted-foreground">Skills Gaps</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">2</div>
            <div className="text-sm text-muted-foreground">Critical Gaps</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">6</div>
            <div className="text-sm text-muted-foreground">Recommendations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">12</div>
            <div className="text-sm text-muted-foreground">Weeks to Close</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="analysis">Gap Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-4">
          {skillGaps.map((gap, index) => (
            <motion.div
              key={gap.skill}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{gap.skill}</h3>
                        <Badge className={getPriorityBg(gap.priority)}>
                          {gap.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{gap.description}</p>
                    </div>
                    <AlertTriangle className={`size-5 ${getPriorityColor(gap.priority)}`} />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Current Level</span>
                      <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`size-4 ${i < gap.currentLevel ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Required Level</span>
                      <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`size-4 ${i < gap.requiredLevel ? 'text-green-500 fill-green-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Gap to Close</span>
                        <span className="font-medium">{gap.gap}%</span>
                      </div>
                      <Progress value={100 - gap.gap} className="h-2" />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex items-center gap-2">
                      <BookOpen className="size-4" />
                      Add to Learning Path
                    </Button>
                    <Button size="sm" variant="outline">
                      View Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{rec.title}</h3>
                        <Badge variant="outline">{rec.type}</Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground">
                          Provider: {rec.provider} • Duration: {rec.duration}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`size-4 ${i < Math.floor(rec.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{rec.rating}</span>
                        </div>
                        <div className="flex gap-2">
                          {rec.skills.map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                      <Button size="sm" className="flex items-center gap-2">
                        Start Learning
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="size-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Progress tracking coming soon</h3>
                <p className="text-muted-foreground">
                  Track your learning progress and skill development over time.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
