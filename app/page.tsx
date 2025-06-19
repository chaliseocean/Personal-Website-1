"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Moon,
  Sun,
  ChevronUp,
  Download,
  Mail,
  Phone,
  Github,
  Linkedin,
  Youtube,
  ExternalLink,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import ChatFallback from "@/components/chat-fallback"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  // CV Download Function - PDF Style with Photo
  const downloadCV = () => {
    // Create a new window with a professional CV layout
    const cvWindow = window.open("", "_blank", "width=800,height=1000")

    const cvHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Ocean Chalise - CV</title>
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              
              body {
                  font-family: 'Arial', sans-serif;
                  line-height: 1.6;
                  color: #333;
                  background: white;
                  padding: 40px;
                  max-width: 800px;
                  margin: 0 auto;
              }
              
              .cv-header {
                  text-align: center;
                  margin-bottom: 30px;
                  padding-bottom: 20px;
                  border-bottom: 3px solid #2563eb;
              }
              
              .profile-photo {
                  width: 120px;
                  height: 120px;
                  border-radius: 50%;
                  margin: 0 auto 20px;
                  border: 4px solid #2563eb;
                  object-fit: cover;
                  display: block;
              }
              
              .name {
                  font-size: 2.5em;
                  font-weight: bold;
                  color: #2563eb;
                  margin-bottom: 10px;
              }
              
              .title {
                  font-size: 1.3em;
                  color: #6b7280;
                  margin-bottom: 15px;
              }
              
              .contact-info {
                  display: flex;
                  justify-content: center;
                  flex-wrap: wrap;
                  gap: 20px;
                  font-size: 0.9em;
                  color: #4b5563;
              }
              
              .section {
                  margin-bottom: 25px;
              }
              
              .section-title {
                  font-size: 1.4em;
                  font-weight: bold;
                  color: #2563eb;
                  margin-bottom: 15px;
                  padding-bottom: 5px;
                  border-bottom: 2px solid #e5e7eb;
              }
              
              .about-text {
                  text-align: justify;
                  margin-bottom: 15px;
                  color: #4b5563;
              }
              
              .skills-grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 15px;
                  margin-bottom: 15px;
              }
              
              .skill-category {
                  background: #f8fafc;
                  padding: 15px;
                  border-radius: 8px;
                  border-left: 4px solid #2563eb;
              }
              
              .skill-category h4 {
                  color: #2563eb;
                  margin-bottom: 8px;
                  font-weight: bold;
              }
              
              .skill-category ul {
                  list-style: none;
                  padding-left: 0;
              }
              
              .skill-category li {
                  color: #4b5563;
                  margin-bottom: 4px;
                  padding-left: 15px;
                  position: relative;
              }
              
              .skill-category li:before {
                  content: "•";
                  color: #2563eb;
                  position: absolute;
                  left: 0;
              }
              
              .experience-item, .education-item, .project-item {
                  margin-bottom: 20px;
                  padding: 15px;
                  background: #f8fafc;
                  border-radius: 8px;
                  border-left: 4px solid #2563eb;
              }
              
              .item-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
                  margin-bottom: 10px;
              }
              
              .item-title {
                  font-weight: bold;
                  color: #1f2937;
                  font-size: 1.1em;
              }
              
              .item-company {
                  color: #2563eb;
                  font-weight: 600;
              }
              
              .item-date {
                  color: #6b7280;
                  font-size: 0.9em;
              }
              
              .item-location {
                  color: #6b7280;
                  font-size: 0.9em;
                  font-style: italic;
              }
              
              .item-description {
                  color: #4b5563;
                  margin-bottom: 10px;
              }
              
              .achievements {
                  margin-top: 10px;
              }
              
              .achievements h5 {
                  color: #2563eb;
                  margin-bottom: 5px;
              }
              
              .achievements ul {
                  list-style: none;
                  padding-left: 0;
              }
              
              .achievements li {
                  color: #4b5563;
                  margin-bottom: 3px;
                  padding-left: 15px;
                  position: relative;
              }
              
              .achievements li:before {
                  content: "✓";
                  color: #10b981;
                  position: absolute;
                  left: 0;
                  font-weight: bold;
              }
              
              .project-tech {
                  margin-top: 8px;
              }
              
              .tech-tag {
                  display: inline-block;
                  background: #dbeafe;
                  color: #2563eb;
                  padding: 3px 8px;
                  border-radius: 12px;
                  font-size: 0.8em;
                  margin-right: 5px;
                  margin-bottom: 5px;
              }
              
              .print-button {
                  position: fixed;
                  top: 20px;
                  right: 20px;
                  background: #2563eb;
                  color: white;
                  border: none;
                  padding: 10px 20px;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 14px;
                  z-index: 1000;
              }
              
              .print-button:hover {
                  background: #1d4ed8;
              }
              
              @media print {
                  body {
                      padding: 20px;
                  }
                  .print-button {
                      display: none;
                  }
              }
              
              @page {
                  margin: 1in;
              }
          </style>
      </head>
      <body>
          <button class="print-button" onclick="window.print()">📄 Save as PDF</button>
          
          <div class="cv-header">
              <img src="/images/ocean-profile.jpg" alt="Ocean Chalise" class="profile-photo" />
              <h1 class="name">OCEAN CHALISE</h1>
              <p class="title">Full Stack Developer & UI/UX Designer</p>
              <div class="contact-info">
                  <span>📧 Chaliseocean756@gmail.com</span>
                  <span>📱 +977 9748202958</span>
                  <span>💼 linkedin.com/in/ocean-chalise-045a1a303/</span>
                  <span>💻 github.com/chaliseocean</span>
              </div>
          </div>

          <div class="section">
              <h2 class="section-title">ABOUT ME</h2>
              <p class="about-text">
                  Passionate tech enthusiast from Nepal, aspiring full stack developer and beginner UI/UX designer. 
                  I enjoy creating complete digital experiences from designing intuitive user interfaces to building 
                  robust back-end systems. My journey in tech began with curiosity and small electronics projects, 
                  and it has grown into a deep passion for coding, designing, and solving real-world problems through technology.
              </p>
              <p class="about-text">
                  Over time, I've built projects like Arduino-based robot cars, wireless control systems, and web 
                  applications that blend functionality with design. I aim to keep growing, keep building, and 
                  contribute meaningfully to Nepal's tech community.
              </p>
          </div>

          <div class="section">
              <h2 class="section-title">TECHNICAL SKILLS</h2>
              <div class="skills-grid">
                  <div class="skill-category">
                      <h4>Frontend Development</h4>
                      <ul>
                          <li>HTML5, CSS3, JavaScript (ES6+)</li>
                          <li>React.js, Next.js</li>
                          <li>Tailwind CSS</li>
                          <li>Responsive Design</li>
                      </ul>
                  </div>
                  <div class="skill-category">
                      <h4>Backend Development</h4>
                      <ul>
                          <li>Node.js, Express.js</li>
                          <li>MongoDB, PostgreSQL</li>
                          <li>RESTful APIs</li>
                          <li>Database Management</li>
                      </ul>
                  </div>
                  <div class="skill-category">
                      <h4>Design & Hardware</h4>
                      <ul>
                          <li>UI/UX Design Principles</li>
                          <li>Arduino Programming</li>
                          <li>Electronics Projects</li>
                          <li>Prototyping</li>
                      </ul>
                  </div>
                  <div class="skill-category">
                      <h4>Tools & Technologies</h4>
                      <ul>
                          <li>Git, GitHub</li>
                          <li>Full Stack Architecture</li>
                          <li>CI/CD Pipeline</li>
                          <li>Cloud Solutions</li>
                      </ul>
                  </div>
              </div>
          </div>

          <div class="section">
              <h2 class="section-title">WORK EXPERIENCE</h2>
              <div class="experience-item">
                  <div class="item-header">
                      <div>
                          <div class="item-title">Senior Full Stack Developer</div>
                          <div class="item-company">Ghar Ko Coder</div>
                      </div>
                      <div style="text-align: right;">
                          <div class="item-date">2025 - Present</div>
                          <div class="item-location">Chaubiskoti Bharatpur</div>
                      </div>
                  </div>
                  <p class="item-description">
                      Lead development of scalable web applications serving 100K+ users. Mentor junior developers 
                      and architect cloud-native solutions.
                  </p>
                  <div class="achievements">
                      <h5>Key Achievements:</h5>
                      <ul>
                          <li>Reduced application load time by 40%</li>
                          <li>Led team of 5 developers</li>
                          <li>Implemented CI/CD pipeline</li>
                          <li>Architected scalable solutions for 100K+ users</li>
                      </ul>
                  </div>
              </div>
          </div>

          <div class="section">
              <h2 class="section-title">EDUCATION</h2>
              <div class="education-item">
                  <div class="item-header">
                      <div>
                          <div class="item-title">Higher Education</div>
                          <div class="item-company">Prerana College</div>
                      </div>
                      <div style="text-align: right;">
                          <div class="item-date">2023 - 2025</div>
                          <div class="item-location">GPA: Ongoing</div>
                      </div>
                  </div>
                  <p class="item-description">Currently pursuing higher education with focus on technology and development</p>
              </div>
              
              <div class="education-item">
                  <div class="item-header">
                      <div>
                          <div class="item-title">Secondary Level Education</div>
                          <div class="item-company">Kalika Model Secondary School</div>
                      </div>
                      <div style="text-align: right;">
                          <div class="item-date">2021 - 2023</div>
                          <div class="item-location">GPA: 3.65/4.0</div>
                      </div>
                  </div>
                  <p class="item-description">Completed secondary education with strong academic performance</p>
              </div>
              
              <div class="education-item">
                  <div class="item-header">
                      <div>
                          <div class="item-title">Basic Level Education</div>
                          <div class="item-company">Kalika Model Secondary School</div>
                      </div>
                      <div style="text-align: right;">
                          <div class="item-date">2015 - 2020</div>
                          <div class="item-location">GPA: 4.0/4.0</div>
                      </div>
                  </div>
                  <p class="item-description">Completed basic education with perfect academic record</p>
              </div>
          </div>

          <div class="section">
              <h2 class="section-title">FEATURED PROJECTS</h2>
              
              <div class="project-item">
                  <div class="item-title">E-Commerce Platform</div>
                  <p class="item-description">A full-stack e-commerce solution with React, Node.js, and Stripe integration.</p>
                  <div class="project-tech">
                      <span class="tech-tag">React</span>
                      <span class="tech-tag">Node.js</span>
                      <span class="tech-tag">MongoDB</span>
                      <span class="tech-tag">Stripe</span>
                  </div>
              </div>
              
              <div class="project-item">
                  <div class="item-title">Task Management App</div>
                  <p class="item-description">A collaborative task management tool with real-time updates and team features.</p>
                  <div class="project-tech">
                      <span class="tech-tag">Next.js</span>
                      <span class="tech-tag">Socket.io</span>
                      <span class="tech-tag">PostgreSQL</span>
                      <span class="tech-tag">Tailwind</span>
                  </div>
              </div>
              
              <div class="project-item">
                  <div class="item-title">AI Chat Assistant</div>
                  <p class="item-description">Intelligent chat assistant powered by machine learning and natural language processing.</p>
                  <div class="project-tech">
                      <span class="tech-tag">Python</span>
                      <span class="tech-tag">TensorFlow</span>
                      <span class="tech-tag">Flask</span>
                      <span class="tech-tag">React</span>
                  </div>
              </div>
              
              <div class="project-item">
                  <div class="item-title">Arduino Projects</div>
                  <p class="item-description">Various hardware projects including robot cars and wireless control systems.</p>
                  <div class="project-tech">
                      <span class="tech-tag">Arduino</span>
                      <span class="tech-tag">C++</span>
                      <span class="tech-tag">Electronics</span>
                      <span class="tech-tag">IoT</span>
                  </div>
              </div>
          </div>

          <div class="section">
              <h2 class="section-title">GOALS & ASPIRATIONS</h2>
              <p class="about-text">
                  Contributing meaningfully to Nepal's tech community through innovative solutions and continuous 
                  learning in full stack development and UI/UX design. Passionate about creating technology that 
                  makes a positive impact on people's lives.
              </p>
          </div>
      </body>
      </html>
    `

    cvWindow.document.write(cvHTML)
    cvWindow.document.close()
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Use no-cors mode to avoid CORS issues with Google Apps Script
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyPy20595zpA-s2MmJ2dUJJN9ku5vJZFouv9rZiaTRauxpJUyDFenK4i9CfOCeEue205A/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            timestamp: new Date().toISOString(),
          }),
        },
      )

      // Since we're using no-cors mode, we can't read the response
      // but if we reach here, the request was sent successfully
      setSubmitStatus({
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
      })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus({
        success: false,
        message: "Sorry, there was an error sending your message. Please try again or contact me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const quickAnswers = {
    about:
      "Ocean Chalise is a passionate tech enthusiast from Nepal, aspiring full stack developer and beginner UI/UX designer. He enjoys creating complete digital experiences from designing intuitive user interfaces to building robust back-end systems.",
    skills:
      "Ocean's technical skills include: HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, Tailwind CSS, Node.js, Express.js, MongoDB, PostgreSQL, UI/UX Design Principles, Arduino Programming, and more.",
    education:
      "Ocean's education includes:\n\n🎓 **Higher Education** at Prerana College (2023 - 2025)\n🏫 **Secondary Level Education** at Kalika Model Secondary School (2021 - 2023)\n📚 **Basic Level Education** at Kalika Model Secondary School (2015 - 2020)",
    projects:
      "Ocean's featured projects include: E-Commerce Platform, Task Management App, Weather Dashboard, Social Media Analytics, Portfolio Website, and AI Chat Assistant.",
    work: "Ocean's work experience:\n\n💼 **Senior Full Stack Developer** at Ghar Ko Coder\n📅 2025 - Present\n📍 Chaubiskoti Bharatpur\n\n✨ **Key Achievements:**\n• Reduced app load time by 40%\n• Led team of 5 developers\n• Implemented CI/CD pipeline\n• Serves 100K+ users",
    contact: "You can contact Ocean at Chaliseocean756@gmail.com or +977 9748202958.",
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CHALISE
              </h1>
              <div className="hidden md:flex space-x-8">
                {["home", "about", "education", "projects", "work", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize"
                  >
                    {item === "education" ? "Education" : item}
                  </button>
                ))}
              </div>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="ml-4">
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ocean Chalise
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                Full Stack Developer & UI/UX Designer
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Welcome to my digital space! I'm passionate about creating beautiful, functional web experiences that
                make a difference. Let's build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={downloadCV}>
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center p-2">
                    <img
                      src="/images/ocean-profile.jpg"
                      alt="Ocean Chalise - Professional Photo"
                      className="w-72 h-72 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Hello, I'm Ocean Chalise</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Hello! I'm Ocean Chalise, a passionate tech enthusiast, aspiring full stack developer, and beginner
                    UI/UX designer from Nepal. I enjoy creating complete digital experiences — from designing intuitive
                    user interfaces to building robust back-end systems. My journey in tech began with curiosity and
                    small electronics projects, and it has grown into a deep passion for coding, designing, and solving
                    real-world problems through technology.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Over time, I've built projects like Arduino-based robot cars, wireless control systems, and simple
                    web applications that blend functionality with design. I love working across the stack — whether
                    it's crafting responsive front-ends using HTML, CSS, and JavaScript (or frameworks like React), or
                    managing data with back-end tools like Node.js and databases. I'm also exploring UI/UX design
                    principles to ensure that what I build is not just functional, but also user-friendly and visually
                    appealing. I aim to keep growing, keep building, and contribute meaningfully to Nepal's tech
                    community.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["HTML", "CSS", "JavaScript", "React", "Node.js", "Arduino", "UI/UX Design", "MongoDB"].map(
                      (skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16">Academic Qualifications</h2>
              <div className="space-y-8">
                {[
                  {
                    degree: "Higher Education",
                    school: "Prerana College",
                    year: "2023 - 2025",
                    gpa: "Ongoing",
                    description: "Currently pursuing higher education with focus on technology and development",
                  },
                  {
                    degree: "Secondary Level Education",
                    school: "Kalika Model Secondary School",
                    year: "2021 - 2023",
                    gpa: "3.65/4.0",
                    description: "Completed secondary education with strong academic performance",
                  },
                  {
                    degree: "Basic Level Education",
                    school: "Kalika Model Secondary School",
                    year: "2015 - 2020",
                    gpa: "4.0/4.0",
                    description: "Completed basic education with perfect academic record",
                  },
                ].map((edu, index) => (
                  <Card key={index} className="relative">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{edu.degree}</CardTitle>
                            <CardDescription className="text-lg font-medium text-blue-600 dark:text-blue-400">
                              {edu.school}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {edu.year}
                          </div>
                          <div className="font-semibold text-green-600 dark:text-green-400">GPA: {edu.gpa}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">{edu.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16">Featured Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "E-Commerce Platform",
                    image: "/placeholder.svg?height=200&width=300",
                    description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration.",
                    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
                    liveDemo: "#",
                    github: "#",
                  },
                  {
                    title: "Task Management App",
                    image: "/placeholder.svg?height=200&width=300",
                    description: "A collaborative task management tool with real-time updates and team features.",
                    technologies: ["Next.js", "Socket.io", "PostgreSQL", "Tailwind"],
                    liveDemo: "#",
                    github: "#",
                  },
                  {
                    title: "Weather Dashboard",
                    image: "/placeholder.svg?height=200&width=300",
                    description: "A beautiful weather app with location-based forecasts and interactive maps.",
                    technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
                    liveDemo: "#",
                    github: "#",
                  },
                  {
                    title: "Social Media Analytics",
                    image: "/placeholder.svg?height=200&width=300",
                    description: "Analytics dashboard for social media performance tracking and insights.",
                    technologies: ["Vue.js", "Python", "FastAPI", "D3.js"],
                    liveDemo: "#",
                    github: "#",
                  },
                  {
                    title: "Portfolio Website",
                    image: "/placeholder.svg?height=200&width=300",
                    description: "A responsive portfolio website showcasing modern web development practices.",
                    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
                    liveDemo: "#",
                    github: "#",
                  },
                  {
                    title: "AI Chat Assistant",
                    image: "/placeholder.svg?height=200&width=300",
                    description:
                      "An intelligent chat assistant powered by machine learning and natural language processing.",
                    technologies: ["Python", "TensorFlow", "Flask", "React"],
                    liveDemo: "#",
                    github: "#",
                  },
                ].map((project, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        <Button size="sm" asChild>
                          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Code className="h-5 w-5 mr-2 text-blue-600" />
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="work" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16">My Work Experience</h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Senior Full Stack Developer",
                    company: "Ghar Ko Coder",
                    period: "2025 - Present",
                    location: "Chaubiskoti Bharatpur",
                    description:
                      "Lead development of scalable web applications serving 100K+ users. Mentor junior developers and architect cloud-native solutions.",
                    achievements: [
                      "Reduced application load time by 40%",
                      "Led team of 5 developers",
                      "Implemented CI/CD pipeline",
                    ],
                  },
                ].map((work, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                            <Briefcase className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{work.title}</CardTitle>
                            <CardDescription className="text-lg font-medium text-green-600 dark:text-green-400">
                              {work.company}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {work.period}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-1" />
                            {work.location}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{work.description}</p>
                      <div>
                        <h4 className="font-semibold mb-2">Key Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                          {work.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16">Get In Touch</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    I'm always interested in new opportunities and exciting projects. Whether you have a question or
                    just want to say hi, feel free to reach out!
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span>Chaliseocean756@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <span>+977 9748202958</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold mb-4">Follow Me</h4>
                    <div className="flex space-x-4">
                      {[
                        { icon: Github, href: "https://github.com/chaliseocean", label: "GitHub" },
                        {
                          icon: Linkedin,
                          href: "https://www.linkedin.com/in/ocean-chalise-045a1a303/",
                          label: "LinkedIn",
                        },
                        { icon: Youtube, href: "https://www.youtube.com/@40A_ocean", label: "YouTube" },
                      ].map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                        >
                          <social.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full"
                        disabled={isSubmitting}
                      />
                    </div>
                    {submitStatus && (
                      <div
                        className={`p-3 rounded-md ${
                          submitStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {submitStatus.message}
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Ocean Chalise
                  </h3>
                  <p className="text-gray-400">
                    Full Stack Developer passionate about creating amazing digital experiences.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <div className="space-y-2">
                    {["Home", "About", "Education", "Projects", "Work", "Contact"].map((link) => (
                      <button
                        key={link}
                        onClick={() => scrollToSection(link.toLowerCase())}
                        className="block text-gray-400 hover:text-white transition-colors"
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Download</h4>
                  <Button
                    onClick={downloadCV}
                    className="mb-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
                  >
                    <Download className="mr-2 h-4 w-4 animate-bounce" />
                    Download CV
                  </Button>
                  <div className="flex space-x-4">
                    {[
                      { icon: Github, href: "https://github.com/chaliseocean" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/ocean-chalise-045a1a303/" },
                      { icon: Youtube, href: "https://www.youtube.com/@40A_ocean" },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Ocean Chalise. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 rounded-full p-3 bg-blue-600 hover:bg-blue-700 shadow-lg z-40"
            size="icon"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        )}

        {/* Chat Fallback Component */}
        <ChatFallback />
      </div>
    </div>
  )
}
