import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Website content that the AI can reference
const websiteContent = `
OCEAN CHALISE - PORTFOLIO WEBSITE CONTENT:

=== HERO SECTION ===
Ocean Chalise
Full Stack Developer & UI/UX Designer
Welcome to my digital space! I'm passionate about creating beautiful, functional web experiences that make a difference. Let's build something amazing together.

=== ABOUT ME ===
Hello! I'm Ocean Chalise, a passionate tech enthusiast, aspiring full stack developer, and beginner UI/UX designer from Nepal. I enjoy creating complete digital experiences — from designing intuitive user interfaces to building robust back-end systems. My journey in tech began with curiosity and small electronics projects, and it has grown into a deep passion for coding, designing, and solving real-world problems through technology.

Over time, I've built projects like Arduino-based robot cars, wireless control systems, and simple web applications that blend functionality with design. I love working across the stack — whether it's crafting responsive front-ends using HTML, CSS, and JavaScript (or frameworks like React), or managing data with back-end tools like Node.js and databases. I'm also exploring UI/UX design principles to ensure that what I build is not just functional, but also user-friendly and visually appealing. I aim to keep growing, keep building, and contribute meaningfully to Nepal's tech community.

Skills: HTML, CSS, JavaScript, React, Node.js, Arduino, UI/UX Design, MongoDB

=== ACADEMIC QUALIFICATIONS ===
1. Higher Education - Prerana College (2023 - 2025) - Ongoing
   Currently pursuing higher education with focus on technology and development

2. Secondary Level Education - Kalika Model Secondary School (2021 - 2023) - GPA: 3.65/4.0
   Completed secondary education with strong academic performance

3. Basic Level Education - Kalika Model Secondary School (2015 - 2020) - GPA: 4.0/4.0
   Completed basic education with perfect academic record

=== FEATURED PROJECTS ===
1. E-Commerce Platform
   A full-stack e-commerce solution with React, Node.js, and Stripe integration.
   Technologies: React, Node.js, MongoDB, Stripe

2. Task Management App
   A collaborative task management tool with real-time updates and team features.
   Technologies: Next.js, Socket.io, PostgreSQL, Tailwind

3. Weather Dashboard
   A beautiful weather app with location-based forecasts and interactive maps.
   Technologies: React, OpenWeather API, Chart.js, CSS3

4. Social Media Analytics
   Analytics dashboard for social media performance tracking and insights.
   Technologies: Vue.js, Python, FastAPI, D3.js

5. Portfolio Website
   A responsive portfolio website showcasing modern web development practices.
   Technologies: Next.js, Tailwind CSS, Framer Motion, Vercel

6. AI Chat Assistant
   An intelligent chat assistant powered by machine learning and natural language processing.
   Technologies: Python, TensorFlow, Flask, React

=== WORK EXPERIENCE ===
Senior Full Stack Developer at Astranix (2025 - Present)
Location: Chaubiskoti Bharatpur
- Lead development of scalable web applications serving 100K+ users
- Mentor junior developers and architect cloud-native solutions
Key Achievements:
- Reduced application load time by 40%
- Led team of 5 developers
- Implemented CI/CD pipeline

=== CONTACT INFORMATION ===
Email: Chaliseocean756@gmail.com
Phone: +977 9748202958
GitHub: https://github.com/chaliseocean
LinkedIn: https://www.linkedin.com/in/ocean-chalise-045a1a303/
YouTube: https://www.youtube.com/@40A_ocean

=== ADDITIONAL PROJECTS MENTIONED ===
- Arduino-based robot cars
- Wireless control systems
- Web applications that blend functionality with design
- Electronics projects that started his tech journey
`

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai("gpt-4o"),
    system: `You are Ocean Chalise's intelligent AI assistant on his portfolio website. You have complete access to all the information on his website and can answer detailed questions about his background, projects, skills, and experience.

IMPORTANT: You have access to the complete website content below. Use this information to provide accurate, detailed answers about Ocean Chalise.

${websiteContent}

INSTRUCTIONS:
- Answer questions based on the actual website content provided above
- Be conversational, friendly, and professional
- Provide specific details from the website when relevant
- If asked about projects, mention the technologies used and descriptions provided
- If asked about education, provide the specific schools, years, and GPAs mentioned
- If asked about work experience, include the company, role, achievements, and location
- If someone wants to contact Ocean, provide the specific contact information listed
- If asked about skills, mention the exact technologies listed on the website
- You can elaborate on the information provided but stay true to the facts on the website
- If asked about something not covered on the website, politely say you don't have that specific information but offer related information that is available

Keep responses helpful, informative, and engaging. You represent Ocean professionally, so maintain a positive and knowledgeable tone.`,
    messages,
  })

  return result.toDataStreamResponse()
}
