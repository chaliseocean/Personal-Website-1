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

Skills: HTML, CSS, JavaScript, React, Node.js, Arduino, UI/UX Design, MongoDB, Data Management, Excel, Google Sheets

=== ACADEMIC QUALIFICATIONS ===
1. Higher Education - Prerana College (2023 - 2025) - GPA: 3.4/4.0
   Completed higher education with strong academic performance in technology and development

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
Freelancer - Data Specialist at Upwork (2023 - Present)
Location: Chaubiskoti Bharatpur
- Specialized in data entry, data management, and data manipulation projects for various clients
- Delivered accurate and efficient data solutions across multiple industries
Key Achievements:
- Completed 50+ data projects with 100% accuracy
- Maintained 5-star rating on Upwork platform
- Specialized in Excel, Google Sheets, and database management

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
- Data management and manipulation projects on Upwork
`

// Content moderation - inappropriate words and phrases to filter
const inappropriateContent = [
  // Vulgar words
  "fuck",
  "fucking",
  "fucked",
  "fucker",
  "fck",
  "f*ck",
  "shit",
  "shit",
  "bullshit",
  "bs",
  "s**t",
  "damn",
  "damned",
  "dammit",
  "bitch",
  "bitches",
  "b*tch",
  "ass",
  "asshole",
  "a**",
  "arse",
  "hell",
  "wtf",
  "stfu",
  "crap",
  "crappy",
  "piss",
  "pissed",
  "pissing",
  // Inappropriate topics
  "sex",
  "sexual",
  "sexy",
  "porn",
  "pornography",
  "xxx",
  "nude",
  "naked",
  "strip",
  "boobs",
  "penis",
  "vagina",
  "drugs",
  "cocaine",
  "marijuana",
  "weed",
  "cannabis",
  "heroin",
  "kill",
  "murder",
  "suicide",
  "die",
  "death",
  "dead",
  // Offensive terms
  "stupid",
  "idiot",
  "moron",
  "retard",
  "retarded",
  "dumb",
  "dumbass",
  "gay",
  "lesbian",
  "homo",
  "fag",
  "faggot",
  "nigger",
  "nigga",
  "racist",
  "nazi",
  // Spam/irrelevant
  "buy now",
  "click here",
  "free money",
  "get rich",
  "lose weight",
  "viagra",
  "casino",
  "gambling",
  "lottery",
  // Personal attacks
  "ugly",
  "fat",
  "loser",
  "pathetic",
  "worthless",
  "hate you",
]

// Function to check if message contains inappropriate content
function containsInappropriateContent(message: string): boolean {
  const lowerMessage = message.toLowerCase()
  return inappropriateContent.some((word) => lowerMessage.includes(word))
}

// Function to check if message is relevant to Ocean's portfolio
function isRelevantTopic(message: string): boolean {
  const lowerMessage = message.toLowerCase()
  const relevantKeywords = [
    "ocean",
    "chalise",
    "portfolio",
    "developer",
    "programming",
    "coding",
    "web",
    "design",
    "project",
    "skill",
    "education",
    "work",
    "experience",
    "contact",
    "hire",
    "freelance",
    "upwork",
    "data",
    "javascript",
    "react",
    "node",
    "html",
    "css",
    "arduino",
    "nepal",
    "college",
    "school",
    "gpa",
    "github",
    "linkedin",
    "youtube",
    "email",
    "phone",
    "technology",
    "tech",
    "software",
    "application",
    "website",
    "database",
    "excel",
    "google sheets",
    "management",
    "manipulation",
    "entry",
    "hello",
    "hi",
    "help",
    "about",
    "tell me",
    "what",
    "how",
    "when",
    "where",
    "why",
    "can you",
    "do you",
  ]

  // If message is very short (like greetings), consider it relevant
  if (lowerMessage.length < 20) return true

  // Check if message contains any relevant keywords
  return relevantKeywords.some((keyword) => lowerMessage.includes(keyword))
}

// Warning messages for different types of inappropriate content
const getWarningMessage = (message: string): string => {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("sex") || lowerMessage.includes("porn") || lowerMessage.includes("nude")) {
    return "⚠️ **Content Warning**: I cannot discuss adult or sexual content. I'm here to help you learn about Ocean Chalise's professional portfolio, skills, and work experience. Please keep our conversation professional and appropriate."
  }

  if (lowerMessage.includes("fuck") || lowerMessage.includes("shit") || lowerMessage.includes("damn")) {
    return "⚠️ **Language Warning**: Please use respectful language in our conversation. I'm Ocean's professional assistant and I maintain a professional environment. Let's focus on discussing Ocean's skills, projects, or how to contact him for work opportunities."
  }

  if (lowerMessage.includes("stupid") || lowerMessage.includes("idiot") || lowerMessage.includes("moron")) {
    return "⚠️ **Respectful Communication**: I encourage respectful and constructive conversation. I'm here to provide helpful information about Ocean Chalise's professional background. How can I assist you with learning about his work or skills?"
  }

  if (lowerMessage.includes("drugs") || lowerMessage.includes("kill") || lowerMessage.includes("die")) {
    return "⚠️ **Inappropriate Content**: I cannot engage with harmful or illegal content discussions. I'm designed to help visitors learn about Ocean's professional portfolio. Please ask me about his projects, education, or work experience instead."
  }

  // Generic warning for other inappropriate content
  return "⚠️ **Content Moderation**: I'm sorry, but I can't respond to inappropriate content. I'm Ocean's professional portfolio assistant, designed to help visitors learn about his skills, projects, education, and work experience. Please keep our conversation professional and relevant to his portfolio."
}

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Get the latest user message
  const latestMessage = messages[messages.length - 1]

  // Content moderation
  if (latestMessage.role === "user") {
    if (containsInappropriateContent(latestMessage.content)) {
      const warningMessage = getWarningMessage(latestMessage.content)

      return new Response(
        JSON.stringify({
          role: "assistant",
          content: warningMessage,
          warning: true,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    if (!isRelevantTopic(latestMessage.content)) {
      return new Response(
        JSON.stringify({
          role: "assistant",
          content:
            "🤖 **Off-Topic Notice**: I'm Ocean's portfolio assistant, so I focus on topics related to his professional background. Please ask me about Ocean's work experience, education, projects, skills, or how to contact him for professional opportunities!",
          warning: true,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  }

  const result = await streamText({
    model: openai("gpt-4o"),
    system: `You are Ocean Chalise's intelligent AI assistant on his portfolio website. You have complete access to all the information on his website and can answer detailed questions about his background, projects, skills, and experience.

IMPORTANT: You have access to the complete website content below. Use this information to provide accurate, detailed answers about Ocean Chalise.

${websiteContent}

CONTENT MODERATION RULES:
- NEVER respond to inappropriate, vulgar, or offensive content
- ONLY discuss topics related to Ocean Chalise's professional portfolio
- If someone asks about unrelated topics, politely redirect them to Ocean's professional information
- Maintain a professional, respectful, and helpful tone at all times
- Do not engage with spam, promotional content, or irrelevant queries

INSTRUCTIONS:
- Answer questions based on the actual website content provided above
- Be conversational, friendly, and professional
- Provide specific details from the website when relevant
- If asked about projects, mention the technologies used and descriptions provided
- If asked about education, provide the specific schools, years, and GPAs mentioned (Higher Education: 3.4/4.0, Secondary: 3.65/4.0, Basic: 4.0/4.0)
- If asked about work experience, include his freelance work at Upwork specializing in data entry, data management, and data manipulation
- If someone wants to contact Ocean, provide the specific contact information listed
- If asked about skills, mention his technical skills including data management, Excel, Google Sheets
- You can elaborate on the information provided but stay true to the facts on the website
- If asked about something not covered on the website, politely say you don't have that specific information but offer related information that is available

SPECIAL FOCUS AREAS:
- Ocean's freelance work on Upwork as a Data Specialist
- His academic achievements including his 3.4 GPA in Higher Education
- His technical skills in web development and data management
- His projects ranging from web applications to Arduino-based systems

Keep responses helpful, informative, and engaging. You represent Ocean professionally, so maintain a positive and knowledgeable tone. Always stay on topic about Ocean's professional portfolio.`,
    messages,
  })

  return result.toDataStreamResponse()
}
