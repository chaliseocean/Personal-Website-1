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

  // Tawk.to Live Chat Integration
  useEffect(() => {
    // Add Tawk.to script
    const script = document.createElement("script")
    script.async = true
    script.src = "https://embed.tawk.to/fbdb6165762188444df44ef4ada974df42269edc/default" // Replace with your actual Tawk.to site ID
    script.charset = "UTF-8"
    script.setAttribute("crossorigin", "*")

    // Append the script to the body
    document.body.appendChild(script)

    // Clean up function to remove the script when component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
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
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
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
                    company: "Astranix",
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
                  <Button className="mb-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none">
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
            className="fixed bottom-8 right-8 rounded-full p-3 bg-blue-600 hover:bg-blue-700 shadow-lg z-40"
            size="icon"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  )
}
