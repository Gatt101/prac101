"use client"
import { useRouter } from "next/navigation" 
import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Target, Calendar, Download, RefreshCw, Eye, FileText, Clock, Award, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

// Sample data for charts
const jdMatchData = [
  { month: "Jan", score: 42, applications: 8 },
  { month: "Feb", score: 58, applications: 12 },
  { month: "Mar", score: 67, applications: 15 },
  { month: "Apr", score: 74, applications: 18 },
  { month: "May", score: 82, applications: 22 },
  { month: "Jun", score: 89, applications: 25 },
]

const callbackData = [
  { period: "Before AI", callbacks: 2, applications: 20, rate: 10 },
  { period: "Month 1", callbacks: 4, applications: 18, rate: 22 },
  { period: "Month 2", callbacks: 6, applications: 20, rate: 30 },
  { period: "Month 3", callbacks: 8, applications: 22, rate: 36 },
  { period: "Current", callbacks: 12, applications: 25, rate: 48 },
]

const skillCoverageData = [
  { name: "Technical Skills", before: 65, after: 92, color: "#6366f1" },
  { name: "Soft Skills", before: 78, after: 88, color: "#8b5cf6" },
  { name: "Industry Knowledge", before: 45, after: 82, color: "#06b6d4" },
  { name: "Certifications", before: 30, after: 75, color: "#10b981" },
]

const pieChartData = [
  { name: "Optimized", value: 75, color: "#6366f1" },
  { name: "Needs Work", value: 25, color: "#e5e7eb" },
]

const applicationTrendData = [
  { week: "Week 1", applications: 3, interviews: 0, offers: 0 },
  { week: "Week 2", applications: 5, interviews: 1, offers: 0 },
  { week: "Week 3", applications: 8, interviews: 2, offers: 0 },
  { week: "Week 4", applications: 6, interviews: 3, offers: 1 },
  { week: "Week 5", applications: 7, interviews: 4, offers: 1 },
  { week: "Week 6", applications: 9, interviews: 5, offers: 2 },
]

const topPerformingResumes = [
  { name: "Software Engineer Resume", views: 156, downloads: 23, jdMatch: 89, callbacks: 8 },
  { name: "Data Scientist Resume", views: 134, downloads: 19, jdMatch: 92, callbacks: 6 },
  { name: "Product Manager Resume", views: 98, downloads: 15, jdMatch: 76, callbacks: 4 },
  { name: "Frontend Developer Resume", views: 87, downloads: 12, jdMatch: 67, callbacks: 3 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("all")
  const router = useRouter()
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
        <Button 
            variant="outline" 
            size="icon"
            onClick={() => router.push('/dashboard')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <h1 className="text-3xl font-sans font-bold">Analytics Dashboard</h1>
       </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="size-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg JD Match</p>
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="size-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="size-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Target className="size-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Callback Rate</p>
                  <p className="text-2xl font-bold">48%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="size-3 mr-1" />
                    3.2x improvement
                  </p>
                </div>
                <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="size-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold">127</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Calendar className="size-3 mr-1" />
                    This month: 25
                  </p>
                </div>
                <div className="size-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <FileText className="size-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Time Saved</p>
                  <p className="text-2xl font-bold">24h</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <Clock className="size-3 mr-1" />
                    Per resume: 2.5h
                  </p>
                </div>
                <div className="size-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Clock className="size-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Resume Performance</TabsTrigger>
          <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* JD Match Improvement Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="size-5" />
                JD-Match Score Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={jdMatchData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} name="JD Match Score (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Callback Rate and Skill Coverage */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="size-5" />
                  Callback Rate Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={callbackData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#6366f1" name="Callback Rate (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="size-5" />
                  Skill Coverage Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Top Performing Resumes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="size-5" />
                Top Performing Resumes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingResumes.map((resume, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="size-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <FileText className="size-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{resume.name}</h4>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="size-3" />
                            {resume.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="size-3" />
                            {resume.downloads} downloads
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">JD Match: {resume.jdMatch}%</div>
                        <div className="text-sm text-muted-foreground">{resume.callbacks} callbacks</div>
                      </div>
                      <Progress value={resume.jdMatch} className="w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resume Views Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Resume Views & Downloads Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={jdMatchData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stackId="1"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.6}
                    name="Applications Sent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          {/* Skill Coverage Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="size-5" />
                Skill Coverage: Before vs After
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillCoverageData.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{skill.name}</h4>
                      <div className="flex gap-4 text-sm">
                        <span className="text-muted-foreground">Before: {skill.before}%</span>
                        <span className="font-medium" style={{ color: skill.color }}>
                          After: {skill.after}%
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress value={skill.before} className="h-2 opacity-50" />
                      <Progress value={skill.after} className="h-2" />
                    </div>
                    <div className="text-xs text-muted-foreground">Improvement: +{skill.after - skill.before}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills Gap Closure */}
          <Card>
            <CardHeader>
              <CardTitle>Skills Gap Closure Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillCoverageData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="before" fill="#e5e7eb" name="Before (%)" />
                  <Bar dataKey="after" fill="#6366f1" name="After (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          {/* Application Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="size-5" />
                Application Funnel Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={applicationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#6366f1" name="Applications" />
                  <Bar dataKey="interviews" fill="#8b5cf6" name="Interviews" />
                  <Bar dataKey="offers" fill="#10b981" name="Offers" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Conversion Rates */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-secondary mb-2">18%</div>
                <div className="text-sm text-muted-foreground">Application → Interview</div>
                <div className="text-xs text-green-600 mt-1">+8% vs industry avg</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">67%</div>
                <div className="text-sm text-muted-foreground">Interview → Final Round</div>
                <div className="text-xs text-green-600 mt-1">+15% vs industry avg</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">40%</div>
                <div className="text-sm text-muted-foreground">Final Round → Offer</div>
                <div className="text-xs text-green-600 mt-1">+12% vs industry avg</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
