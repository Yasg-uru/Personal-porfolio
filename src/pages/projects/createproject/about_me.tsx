import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Briefcase, Code, Github, Linkedin, Mail, MapPin, Sparkles, Trophy, User } from "lucide-react"
import YashChoudhary from "../../../assets/my_images/yash-choudhary-image .jpg"
export default function AboutMeSection() {
  const [activeTab, setActiveTab] = useState("about")

  return (
    <div className="min-h-screen py-20 bg-black px-4 text-white">
      <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
              <img src= {YashChoudhary} alt="Yash Choudhary" className="object-cover" />
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <Badge className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/70">
                <MapPin className="h-3 w-3 mr-1" />
                Madhya Pradesh, India
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">Yash Choudhary</h1>
            <h2 className="text-xl text-gray-400">Full Stack Developer</h2>

            <div className="flex gap-2">
              <a
                href="https://github.com/Yasg-uru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/yash-choudhary-28766a259/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:yashpawar12122004@gmail.com"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Badge className="bg-green-800"  variant="secondary">Node.js</Badge>
              <Badge  className="bg-green-800" variant="secondary">Express</Badge>
              <Badge className="bg-green-800"  variant="secondary">TypeScript</Badge>
              <Badge className="bg-green-800"  variant="secondary">React</Badge>
              <Badge className="bg-green-800"  variant="secondary">Microservices</Badge>
              <Badge className="bg-green-800"  variant="secondary">MongoDB</Badge>
              <Badge className="bg-green-800"  variant="secondary">REST APIs</Badge>
            </div>
          </div>
        </div>

        <div>
          <Tabs defaultValue="about" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="about" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <User className={`h-4 w-4 ${activeTab === "about" ? "text-primary" : ""}`} />
                <span className="hidden sm:inline">About</span>
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Briefcase className={`h-4 w-4 ${activeTab === "experience" ? "text-primary" : ""}`} />
                <span className="hidden sm:inline">Experience</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <BookOpen className={`h-4 w-4 ${activeTab === "education" ? "text-primary" : ""}`} />
                <span className="hidden sm:inline">Education</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Code className={`h-4 w-4 ${activeTab === "skills" ? "text-primary" : ""}`} />
                <span className="hidden sm:inline">Skills</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-white">About Me</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Hey there! I'm a passionate Full Stack Developer with expertise in Node.js, Express, TypeScript,
                  React, and Microservices Architecture. I thrive on building scalable, high-performance applications
                  and solving complex problems.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Currently, I'm the Founder & Full Stack Developer at CrushSphere, where I'm developing a social
                  platform with real-time messaging, location-based features, and interactive engagement scoring.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Beyond coding, I love contributing to open-source projects, mentoring fellow developers, and
                  participating in coding competitions. Let's connect and build something amazing together! 🚀
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="bg-gray-800">
                  <CardContent className="p-4 flex items-start gap-4">
                    <Trophy className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium text-white">LeetCode Enthusiast</h4>
                      <p className="text-sm text-gray-400">800+ problems solved on LeetCode</p>
                    </div>
                  </CardContent>
                </Card>
                {/* <Card className="bg-gray-800">
                  <CardContent className="p-4 flex items-start gap-4">
                    <Github className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium text-white">Open Source Contributor</h4>
                      <p className="text-sm text-gray-400">Active in the developer community</p>
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="mt-6 space-y-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-white">Work Experience</h3>
                </div>

                <div className="space-y-6">
                  <div className="border-l-2 border-primary/20 pl-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-800">Current</Badge>
                      <h4 className="font-semibold text-white">Founder & Full Stack Developer</h4>
                    </div>
                    <p className="text-gray-400">CrushSphere</p>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                      <li>Developing a social platform with real-time messaging</li>
                      <li>Implementing location-based features and interactive engagement scoring</li>
                      <li>Building scalable architecture using microservices</li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-muted pl-4 space-y-2">
                    <h4 className="font-semibold text-white">Backend Developer Team Lead Intern</h4>
                    <p className="text-gray-400">Rablo.in</p>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                      <li>Led a backend development team</li>
                      <li>Optimized RESTful APIs for improved performance</li>
                      <li>Implemented microservices architecture</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="education" className="mt-6 space-y-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-white">Education</h3>
                </div>

                <div className="space-y-6">
                  <div className="border-l-2 border-primary/20 pl-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-800">Current</Badge>
                      <h4 className="font-semibold text-white">B.Tech in Information Technology</h4>
                    </div>
                    <p className="text-gray-400">Samrat Ashok Technological Institute, Vidisha</p>
                    <p className="text-sm text-gray-400">CGPA: 7.97/10</p>
                  </div>

                  <div className="border-l-2 border-muted pl-4 space-y-2">
                    <h4 className="font-semibold text-white">Higher Secondary Education (12th)</h4>
                    <p className="text-gray-400">Govt. School of Excellence, Chhindwara</p>
                    <p className="text-sm text-gray-400">Percentage: 83%</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-6 space-y-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-white">Technical Skills</h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="bg-gray-800">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2 text-white">Frontend</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-green-800" variant="outline">React</Badge>
                        <Badge className="bg-green-800" variant="outline">TypeScript</Badge>
                        <Badge className="bg-green-800" variant="outline">Next.js</Badge>
                        <Badge className="bg-green-800" variant="outline">Tailwind CSS</Badge>
                        <Badge className="bg-green-800" variant="outline">Redux</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2 text-white">Backend</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-green-800" variant="outline">Node.js</Badge>
                        <Badge className="bg-green-800" variant="outline">Express</Badge>
                        <Badge className="bg-green-800" variant="outline">MongoDB</Badge>
                        <Badge className="bg-green-800" variant="outline">REST APIs</Badge>
                        <Badge className="bg-green-800" variant="outline">Microservices</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2 text-white">Tools & DevOps</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-green-800" variant="outline">Git</Badge>
                        <Badge className="bg-green-800" variant="outline">Docker</Badge>
                        <Badge className="bg-green-800" variant="outline">AWS</Badge>
                        <Badge className="bg-green-800" variant="outline">CI/CD</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2 text-white">Core Competencies</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-green-800" variant="outline">Data Structures</Badge>
                        <Badge className="bg-green-800" variant="outline">Algorithms</Badge>
                        <Badge className="bg-green-800" variant="outline">System Design</Badge>
                        <Badge className="bg-green-800" variant="outline">Problem Solving</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}