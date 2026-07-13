/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Experience, Certification, Regulation } from './types';

export const PERSONAL_INFO = {
  fullName: "Chellumahanthi Karthik",
  displayName: "Karthik Ch",
  email: "karthikch834@gmail.com",
  phone: "8121407838",
  location: "Andhra Pradesh, India",
  github: "https://github.com/karthik-chellumahanthi",
  linkedin: "https://linkedin.com/in/chellumahanthi-karthik-0a290b292",
  tagline: "Android & Flutter Engineer | AI & Data Science Student",
};

export const METRICS = [
  { label: "Cloudflare R2 Traffic", value: "1.18 GB", description: "Academic books & hand-written notes hosted" },
  { label: "Firestore Cache", value: "162 Object Sheets", description: "Unit-wise notes with meta metadata links" },
  { label: "Average App Scale", value: "35+ Pages", description: "Calculators, downloads, and custom readers" },
  { label: "Certifications", value: "6 Total", description: "Google-Supported, Python Full Stack, Security, etc." }
];

export const PROJECTS: Project[] = [
  {
    id: "student_notes",
    title: "Secure Academic Resource App (Student Notes)",
    subtitle: "Complete Flutter Mobile Ecosystem",
    description: "An advanced academic file-sharing client with AES-256 local encryption, a custom hybrid storage pipeline, and a modular utility calculator suite.",
    longDescription: "Developed for college students to solve the daily hassle of locating academic material, checking notifications, and calculating SGPAs/CGPAs offline. It utilizes Cloudflare R2 buckets for zero-egress PDF hosting and Cloud Firestore for metadata storage, synchronizing with an encrypted local Hive NoSQL database for secure note storage.",
    tags: ["Flutter", "Dart", "Firebase", "Cloudflare R2", "Hive", "AES-256"],
    techStack: ["Flutter", "Dart", "Cloud Firestore", "Cloudflare R2 API", "Hive DB", "AES Cryptography", "ValueNotifier"],
    outcomes: [
      "Built a hybrid storage pipeline serving 1.18 GB of encrypted unit-wise notes.",
      "Secured offline downloads through AES-256 local encryption to prevent unauthorized asset leaking.",
      "Integrated full Academic Utility Suite including SGPA/CGPA, academic standard Percentage converter, and a complete Casio fx-991EX Scientific Calculator simulation.",
      "Engineered an offline state sync mechanism via Hive NoSQL supporting seamless reading, downloading, history monitoring, and size logging."
    ],
    githubUrl: "https://github.com/karthik-chellumahanthi",
  },
  {
    id: "codementor_ai",
    title: "CodeMentor AI",
    subtitle: "100% Offline Local Pipeline (Ollama)",
    description: "A privacy-first, local coding assistant specifically tailored for Python and Java development, mimicking premium AI interfaces using local Llama 3 inference.",
    longDescription: "Built with React and FastAPI, CodeMentor AI leverages local Ollama inference alongside a custom Retrieval-Augmented Generation (RAG) pipeline to provide accurate, context-aware programming mentorship. It features a ChatGPT-like responsive UI, persistent chat memory, interactive practice quizzes, and real-time Server-Sent Events (SSE) streaming—all without ever sending data to the cloud.",
    tags: ["React", "FastAPI", "Ollama", "LangChain", "ChromaDB", "Llama 3"],
    techStack: ["React + Vite", "Tailwind CSS", "FastAPI", "LangChain", "ChromaDB", "Ollama", "SSE Streaming"],
    outcomes: [
      "Engineered a 100% local, privacy-first RAG pipeline using LangChain, ChromaDB, and Ollama without any cloud dependencies.",
      "Designed a commercial-grade, responsive ChatGPT-like UI supporting themes, Markdown rendering, auto-scrolling, and chat history export.",
      "Implemented asynchronous SSE streaming to deliver real-time token generation and prevent HTTP timeout errors.",
      "Developed an interactive Practice Quiz module that dynamically tracks progress and injects system instructions for accurate scoring."
    ],
    githubUrl: "https://github.com/karthik-chellumahanthi",
  },
  {
    id: "price_prediction",
    title: "Used Car Price Prediction Chatbot",
    subtitle: "AI/ML Conversational Interface",
    description: "An interactive ML chatbot built in Python designed to analyze historical vehicle datasets, predict market prices, and deliver interactive recommendations.",
    longDescription: "Leverages AI/ML algorithms to process complex vehicle lists (mileage, manufacturing year, engine volume, model, and fuel type). The application serves predictions through a conversational chatbot interface, bridging numerical data analytics with user-friendly accessibility.",
    tags: ["Python", "AI / ML", "Chatbot", "Firebase Integration", "Data Analysis"],
    techStack: ["Python", "Machine Learning", "Pandas & NumPy", "Firebase Realtime DB", "NLP Interfaces", "JSON APIs"],
    outcomes: [
      "Engineered data pipelines in Python to optimize, clean, and run predictions on vehicle lists.",
      "Created an interactive conversational chatbot interface guiding users step-by-step through parameter entry.",
      "Integrated real-time database endpoints using Firebase to log dynamic user telemetry and queries securely."
    ],
    githubUrl: "https://github.com/karthik-chellumahanthi",
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Android Developer Intern",
    organization: "Google-Supported Virtual Internship (AICTE)",
    location: "Remote",
    duration: "Dec 2024 – Feb 2025",
    bullets: [
      "Designed highly responsive Android app layouts following Google Material Design guidelines to improve overall mobile accessibility and user experience.",
      "Optimized native mobile application performance using Android Studio profiling tools, successfully reducing startup latency.",
      "Implemented advanced asynchronous background execution loops to prevent main-thread UI binding, optimizing CPU battery drain.",
      "Collaborated inside an agile workflow, running test coverage of mobile views across diverse screen ratios and Android SDK variants."
    ],
    isInternship: true
  }
];

export const EDUCATION = [
  {
    institution: "Kakinada Institute of Engineering and Technology (KIET)",
    location: "Kakinada, India",
    degree: "Bachelor of Technology in CSE (Artificial Intelligence & Data Science)",
    duration: "Aug 2023 – Sep 2027 (Expected)",
    coursework: ["Database Management Systems (DBMS)", "Data Structures & Algorithms (DSA)", "Software Engineering", "Mobile Architectures"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Google-Supported Android Developer Certification",
    issuer: "Google / AICTE",
    details: "Deep dive focusing on Kotlin, modern SDK architectures, and Material UI paradigms."
  },
  {
    name: "Python Full Stack Development Certificate",
    issuer: "Virtual Internship",
    details: "Backend structure models, relational databases, and server-side socket communication flows."
  },
  {
    name: "Wadhwani Ignite India 5.0 Graduate",
    issuer: "Wadhwani Foundation",
    details: "Practical entrepreneurship curriculum centering on Agile SDLC and MVP product validation."
  },
  {
    name: "Zero Trust Cloud Security Virtual Internship",
    issuer: "AICTE / Google-Supported",
    details: "Designing secure perimeter systems and configuring multi-layered asset authentication rules."
  },
  {
    name: "AI-ML Virtual Internship",
    issuer: "AICTE",
    details: "Statistical model architectures, machine learning model fine-tuning, and interactive dataset chatbot integrations."
  }
];

// JNTUK Notes structured regulation-semester-subject hierarchy based on screenshots
export const JNTUK_DATABASE: Regulation[] = [
  {
    id: "r23",
    name: "Regulation R-23",
    semesters: [
      {
        id: "sem-1-1",
        name: "Semester 1-1",
        subjects: [
          { id: "maths1", name: "Linear Algebra & Calculus", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"] },
          { id: "chem", name: "Engineering Chemistry", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4"] },
          { id: "bse", name: "Basic Civil & Mechanical Engg", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"] }
        ]
      },
      {
        id: "sem-1-2",
        name: "Semester 1-2",
        subjects: [
          { id: "maths2", name: "Differential Equations", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4"] },
          { id: "phy", name: "Engineering Physics", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"] },
          { id: "it", name: "IT Workshop", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4"] }
        ]
      },
      {
        id: "sem-2-1",
        name: "Semester 2-1",
        subjects: [
          { id: "dsa", name: "Data Structures & Algorithms", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"] },
          { id: "dbms", name: "Database Management Systems", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4"] },
          { id: "java", name: "Object Oriented Programming (Java)", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"] }
        ]
      },
      {
        id: "sem-3-2",
        name: "Semester 3-2",
        subjects: [
          { id: "ml", name: "Machine Learning", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"] },
          { id: "bda", name: "Big Data Analytics (BDA)", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4"] },
          { id: "cc", name: "Cloud Computing", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"] },
          { id: "dv", name: "Data Visualization", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4"] },
          { id: "dm", name: "Disaster Management", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"] },
          { id: "nosql", name: "NOSQL Databases", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4"] }
        ]
      }
    ]
  },
  {
    id: "r20",
    name: "Regulation R-20",
    semesters: [
      {
        id: "sem-r20-3-2",
        name: "Semester 3-2",
        subjects: [
          { id: "r20-ml", name: "Machine Learning", units: ["Unit 1", "Unit 2", "Unit 3"] },
          { id: "r20-iot", name: "Internet of Things", units: ["Unit 1", "Unit 2", "Unit 3"] }
        ]
      }
    ]
  }
];
