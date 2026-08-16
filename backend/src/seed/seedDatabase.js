import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "../config/database.js";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Design from "../models/Design.js";
import Experience from "../models/Experience.js";
import Certification from "../models/Certification.js";
import Education from "../models/Education.js";
import Skill from "../models/Skill.js";
import AdminUser from "../models/AdminUser.js";

const profileData = {
  name: "Shreyash Yadav",
  role: "AI Product Builder & Full-Stack Engineer",
  headline: "I BUILD INTELLIGENT DIGITAL PRODUCTS.",
  bio: "I'm a computer science student and builder focused on AI, full-stack engineering and products that solve real problems.",
  location: "India",
  email: "shs140326@gmail.com",
  photoUrl: "/profile/shreyash-photo.png",
  availability: true,
  availabilityText: "Available for select projects",
  githubUrl: "https://github.com/the-shreyash",
  linkedinUrl: "https://www.linkedin.com/in/shreyash-yadav-b15024296/",
  resumeUrl: "",
  domains: ["AI", "Full-Stack", "Product", "Systems"],
};

const projectsData = [
  {
    title: "Dev Handbook",
    slug: "dev-handbook",
    number: "01",
    category: "DEVELOPER EDUCATION / DOCUMENTATION",
    description:
      "A structured developer knowledge platform for learning complex technologies through organized documentation and practical resources.",
    technologies: ["React", "MDX", "Node.js", "Search Indexing"],
    capabilities: [
      "Structured documentation navigation",
      "Code snippets & architecture diagrams",
      "Full-text search",
      "Learning progress tracking",
    ],
    theme: "technical",
    image: "/images/projects/dev-handbook.png",
    demoUrl: "https://www.devhandbook.store/",
    githubUrl: "https://github.com/the-shreyash",
    featured: true,
    published: true,
    order: 1,
    year: "2026",
    caseStudy: {
      problem: "Developer documentation is often fragmented, overly verbose, or hard to navigate quickly.",
      solution: "Created an indexed, modular handbook platform with syntax highlighting, search, and deep bookmarks.",
      architecture: "React + MDX frontend with client-side indexing and optimized asset pipelines.",
      challenges: "Fast full-text search indexing across extensive markdown datasets.",
      outcome: "High usability, instant search response times, and an organized learning repository.",
    },
  },
  {
    title: "Retire Assist",
    slug: "retire-assist",
    number: "02",
    category: "FINTECH / AI / PLANNING",
    description:
      "An intelligent retirement planning platform that helps users map out their financial future with AI-driven projections and personalized insights.",
    technologies: ["React", "Node.js", "AI APIs", "MongoDB"],
    capabilities: [
      "AI-powered retirement projections",
      "Portfolio & savings analysis",
      "Personalized financial insights",
      "Goal tracking & milestones",
    ],
    theme: "finance",
    image: "/images/projects/retire-assist.png",
    demoUrl: "https://retire-assist.onrender.com/",
    githubUrl: "https://github.com/the-shreyash",
    featured: true,
    published: true,
    order: 2,
    year: "2026",
    caseStudy: {
      problem: "Retirement planning calculators are rigid and fail to adapt to unpredictable market inflation and individual goals.",
      solution: "Engineered an AI-backed projection tool that models dynamic financial paths.",
      architecture: "React client with Express API backend and MongoDB persistence for personalized profiles.",
      challenges: "Calculating multi-decade compound growth curves with inflation variance in real time.",
      outcome: "Actionable financial roadmap generation with clear milestone breakdowns.",
    },
  },
  {
    title: "Kisna AI",
    slug: "kisna-ai",
    number: "03",
    category: "AGRI-TECH / AI / INTELLIGENT FARMING",
    description:
      "An AI-powered smart farming platform that provides intelligent crop recommendations, weather analysis, and data-driven insights for modern agriculture.",
    technologies: ["React", "Node.js", "AI APIs", "Python"],
    capabilities: [
      "AI crop & soil recommendations",
      "Weather pattern analysis",
      "Smart irrigation insights",
      "Farm data dashboard",
    ],
    theme: "warm",
    image: "/images/projects/kisna-ai.png",
    demoUrl: "https://agrismart-ai-intelligent-farming.onrender.com/",
    githubUrl: "https://github.com/the-shreyash",
    featured: true,
    published: true,
    order: 3,
    year: "2026",
    caseStudy: {
      problem: "Farmers lack localized, data-driven agricultural guidance accessible in plain terms.",
      solution: "Built an intelligent farming assistant evaluating soil metrics, regional weather, and crop viability.",
      architecture: "Microservices architecture connecting Python ML inference APIs with a React frontend.",
      challenges: "Synthesizing complex weather APIs into simple, actionable agricultural alerts.",
      outcome: "Empowered farmers with instant recommendations on irrigation timing and crop rotation.",
    },
  },
  {
    title: "StockAssist AI",
    slug: "stockassist-ai",
    number: "04",
    category: "AI / FINTECH / REAL-TIME SYSTEM",
    description:
      "An AI-powered trading intelligence platform designed to turn complex market data into actionable insights.",
    technologies: ["React", "Node.js", "Socket.IO", "AI APIs", "MongoDB"],
    capabilities: [
      "Real-time market data streaming",
      "AI-generated market analysis",
      "Portfolio & watchlist tracking",
      "Scanner & trade monitor",
    ],
    theme: "finance",
    image: "/images/projects/stockassist-ai.png",
    demoUrl: "",
    githubUrl: "https://github.com/the-shreyash",
    featured: true,
    published: true,
    order: 4,
    year: "2026",
    caseStudy: {
      problem: "Market traders suffer from information overload and delayed sentiment analysis.",
      solution: "Engineered a live streaming intelligence dashboard featuring automated summary alerts.",
      architecture: "WebSockets + Node.js stream ingestion, LLM insight pipeline, and reactive React UI.",
      challenges: "Low-latency state management during volatile market data surges.",
      outcome: "Instant sentiment scoring and automated watchlist alerts for active traders.",
    },
  },
  {
    title: "NextGenius",
    slug: "nextgenius",
    category: "AI / PRODUCTIVITY",
    description: "An AI copilot for structured decision-making and planning.",
    technologies: ["React", "Node.js", "AI APIs"],
    capabilities: ["Decision matrix generation", "Task breakdown", "Reasoning trees"],
    theme: "technical",
    image: "/images/projects/nextgenius.png",
    demoUrl: "",
    githubUrl: "https://github.com/the-shreyash",
    featured: false,
    published: true,
    order: 5,
    year: "2025",
  },
  {
    title: "Score Stream",
    slug: "score-stream",
    category: "REAL-TIME / SPORTS",
    description: "A live sports score aggregation and notification system.",
    technologies: ["Node.js", "WebSockets", "Redis"],
    capabilities: ["Live score broadcasting", "Match telemetry", "Instant notifications"],
    theme: "technical",
    image: "/images/projects/score-stream.png",
    demoUrl: "",
    githubUrl: "https://github.com/the-shreyash",
    featured: false,
    published: true,
    order: 6,
    year: "2025",
  },
  {
    title: "Wonderlust",
    slug: "wonderlust",
    category: "TRAVEL / MARKETPLACE",
    description: "A full-stack travel listing and booking marketplace.",
    technologies: ["MERN", "REST APIs"],
    capabilities: ["Destination search", "Listing management", "User reviews"],
    theme: "warm",
    image: "/images/projects/wonderlust.png",
    demoUrl: "",
    githubUrl: "https://github.com/the-shreyash",
    featured: false,
    published: true,
    order: 7,
    year: "2025",
  },
];

const designsData = [
  {
    title: "OLA S1 Pro+",
    slug: "ola-design",
    category: "EV / PRODUCT UI",
    description:
      "A sleek product landing page for the OLA S1 Pro+ 3rd Gen electric scooter featuring bold typography, spec highlights, and a premium EV aesthetic.",
    image: "/images/figma/ola-design.png",
    figmaUrl:
      "https://www.figma.com/design/LKr12xcTERmeQmZpPa4Vsw/Ola?node-id=0-1&t=y1cEOI5K14sMTsgB-1",
    featured: true,
    published: true,
    order: 1,
  },
  {
    title: "Console Gaming Store",
    slug: "console-design",
    category: "E-COMMERCE / GAMING UI",
    description:
      "A dark, immersive gaming e-commerce UI featuring the DualSense wireless controller with bold product presentation and colour variant selection.",
    image: "/images/figma/console-design.png",
    figmaUrl:
      "https://www.figma.com/design/846nPOe89ecB0zXkGIcJ7Q/CONSOLE?node-id=1-2&t=n9l7N4R6xBGvt8pJ-1",
    featured: true,
    published: true,
    order: 2,
  },
  {
    title: "Fitness AI Dashboard",
    slug: "fitness-design",
    category: "HEALTH TECH / DASHBOARD UI",
    description:
      "A minimal fitness tracker dashboard with AI chatbot integration, daily goal progress, calorie tracking, and activity analytics.",
    image: "/images/figma/fitness-design.png",
    figmaUrl:
      "https://www.figma.com/design/TMbLGGYeq7h1aYwzEPrUCZ/Untitled?t=GfEBn6xPxvRIyanB-1",
    featured: true,
    published: true,
    order: 3,
  },
  {
    title: "EV-B Electric Bike",
    slug: "ev-bike-design",
    category: "EV / CONCEPT UI",
    description:
      "A futuristic concept product page for the EV-B electric bike — clean glassmorphism layout with specs and a pre-order CTA.",
    image: "/images/figma/ev-bike-design.png",
    figmaUrl:
      "https://www.figma.com/design/LKr12xcTERmeQmZpPa4Vsw/Ola?node-id=0-1&t=y1cEOI5K14sMTsgB-1",
    featured: true,
    published: true,
    order: 4,
  },
  {
    title: "Nike Prototype",
    slug: "nike-design",
    category: "SPORTSWEAR / BRAND UI",
    description:
      "A Nike brand prototype exploring bold product visuals, modern typography, and interactive UI components for a premium sportswear experience.",
    image: "/images/figma/nike-design.png",
    figmaUrl:
      "https://www.figma.com/design/iTA8Uq7oMP8u4grs7ZVSOz/NIke-prototype?node-id=0-1&t=GfEBn6xPxvRIyanB-1",
    featured: true,
    published: true,
    order: 5,
  },
  {
    title: "Shivangi Dental Clinic",
    slug: "dr-shivangi",
    category: "CLINIC / WEBSITE DESIGN",
    description:
      "A clean and professional website prototype for a dental clinic featuring appointment booking and service pages.",
    image: "/images/figma/dr.shivangi-clinic.png",
    figmaUrl: "",
    featured: false,
    published: true,
    order: 6,
  },
  {
    title: "Payment Gateway Design",
    slug: "thingspay-design",
    category: "FINTECH / UI DESIGN",
    description:
      "A modern payment gateway UI design with invoice management, credit card integration, and clean checkout flows.",
    image: "/images/figma/thingsPay-design.png",
    figmaUrl:
      "https://www.figma.com/design/TMbLGGYeq7h1aYwzEPrUCZ/Untitled?t=GfEBn6xPxvRIyanB-1",
    featured: false,
    published: true,
    order: 7,
  },
  {
    title: "creative Things",
    slug: "creative-things",
    category: "Design",
    description: "A collection of creative designs and prototypes",
    image: "/images/figma/creative-things.png",
    figmaUrl:
      "https://www.figma.com/design/CGII6qk0XW7f0JUZILkiqq/Creative-Things?t=GfEBn6xPxvRIyanB-1",
    featured: false,
    published: true,
    order: 8,
  },
];

const certificationsData = [
  {
    title: "Internship Certificate",
    issuer: "Industry Internship",
    type: "INTERNSHIP",
    url: "https://drive.google.com/file/d/1b7FHfFxR7to1WmVOLDL-mGGyznRIG0Ho/view?usp=drive_link",
    published: true,
    order: 1,
  },
  {
    title: "Web Development",
    issuer: "Apna College",
    type: "COURSE CERTIFICATE",
    url: "https://drive.google.com/file/d/10P-h30MhxC6HBvwfVNfOQoj9ItaUlLNR/view?usp=drive_link",
    published: true,
    order: 2,
  },
  {
    title: "HackWith Hackathon",
    issuer: "HackWith",
    type: "HACKATHON",
    url: "https://drive.google.com/file/d/1wp8igWxFNgs8Gl1vVLIAX-s674u5RDtm/view?usp=drive_link",
    published: true,
    order: 3,
  },
  {
    title: "HackWith India — Top 25",
    issuer: "HackWith India",
    type: "HACKATHON · TOP 25",
    url: "https://drive.google.com/file/d/1UB3tmNZrV3iHR7ooG0lwINfDpqRF9t-0/view?usp=drive_link",
    published: true,
    order: 4,
  },
];

const experienceData = [
  {
    role: "AI Product Builder & Full-Stack Engineer",
    company: "Independent Projects / Products",
    type: "Full-Time / Builder",
    location: "India",
    startDate: "2024",
    endDate: "Present",
    description: "Designing and engineering end-to-end intelligent web platforms, LLM integrations, and high-performance real-time applications.",
    achievements: [
      "Architected StockAssist AI and Retire Assist platforms serving active users",
      "Built resilient streaming architectures with WebSockets and microservices",
      "Engineered clean Figma prototypes and converted them into high-fidelity React interfaces",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Python", "WebSockets", "AI APIs"],
    published: true,
    order: 1,
  },
];

const educationData = [
  {
    institution: "University Institute of Technology",
    degree: "Bachelor of Technology",
    specialization: "Computer Science & Engineering",
    startYear: "2022",
    endYear: "2026",
    location: "India",
    description: "Focusing on Distributed Systems, Algorithms, Artificial Intelligence, and Modern Software Architecture.",
    published: true,
    order: 1,
  },
];

const skillsData = [
  { category: "Frontend", name: "React", level: "Advanced", order: 1 },
  { category: "Frontend", name: "JavaScript / TypeScript", level: "Advanced", order: 2 },
  { category: "Frontend", name: "Tailwind CSS", level: "Advanced", order: 3 },
  { category: "Frontend", name: "GSAP Motion", level: "Intermediate", order: 4 },
  { category: "Backend", name: "Node.js", level: "Advanced", order: 5 },
  { category: "Backend", name: "Express.js", level: "Advanced", order: 6 },
  { category: "Backend", name: "Socket.IO / WebSockets", level: "Intermediate", order: 7 },
  { category: "Database", name: "MongoDB / Mongoose", level: "Advanced", order: 8 },
  { category: "Database", name: "Redis", level: "Intermediate", order: 9 },
  { category: "AI", name: "LLM Orchestration & Prompting", level: "Advanced", order: 10 },
  { category: "AI", name: "Python", level: "Intermediate", order: 11 },
  { category: "Tools", name: "Docker", level: "Intermediate", order: 12 },
  { category: "Tools", name: "GitHub Actions / CI-CD", level: "Intermediate", order: 13 },
  { category: "Design", name: "Figma UI/UX", level: "Advanced", order: 14 },
];

export async function seed() {
  try {
    await connectDatabase();
    console.log("[seed] connected to database");

    // Profile
    await Profile.deleteMany({});
    await Profile.create(profileData);
    console.log("[seed] Profile seeded");

    // Projects
    await Project.deleteMany({});
    await Project.insertMany(projectsData);
    console.log(`[seed] ${projectsData.length} Projects seeded`);

    // Designs
    await Design.deleteMany({});
    await Design.insertMany(designsData);
    console.log(`[seed] ${designsData.length} Figma Designs seeded`);

    // Certifications
    await Certification.deleteMany({});
    await Certification.insertMany(certificationsData);
    console.log(`[seed] ${certificationsData.length} Certifications seeded`);

    // Experience
    await Experience.deleteMany({});
    await Experience.insertMany(experienceData);
    console.log(`[seed] ${experienceData.length} Experience items seeded`);

    // Education
    await Education.deleteMany({});
    await Education.insertMany(educationData);
    console.log(`[seed] ${educationData.length} Education items seeded`);

    // Skills
    await Skill.deleteMany({});
    await Skill.insertMany(skillsData);
    console.log(`[seed] ${skillsData.length} Skills seeded`);

    // Admin user bootstrap
    const adminUsername = process.env.ADMIN_USER || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_TOKEN || "Admin#Secure2026!";
    const adminEmail = process.env.ADMIN_EMAIL || "shs140326@gmail.com";

    const existingAdmin = await AdminUser.findOne({ username: adminUsername });
    if (!existingAdmin) {
      await AdminUser.create({
        username: adminUsername,
        email: adminEmail,
        password: adminPassword,
        role: "superadmin",
      });
      console.log(`[seed] Default admin user created (username: ${adminUsername})`);
    } else {
      console.log("[seed] Admin user already exists");
    }

    console.log("[seed] Database successfully seeded and migrated!");
    process.exit(0);
  } catch (err) {
    console.error("[seed error]", err);
    process.exit(1);
  }
}

seed();
