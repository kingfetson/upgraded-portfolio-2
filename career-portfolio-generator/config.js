// ============================================
// CAREER PORTFOLIO GENERATOR - CONFIGURATION FILE
// ============================================
// Edit this file to customize your portfolio
// No coding knowledge required!
// Just replace the example data with your own
// ============================================

window.PORTFOLIO_CONFIG = {
  // ==========================================
  // BASIC INFORMATION
  // ==========================================
  
  // Your full name (required)
  name: "Alex Morgan",
  
  // Your professional title (required)
  title: "Senior Full Stack Developer",
  
  // Your industry/profession category
  profession: "Developer",
  
  // Your location (city, country)
  location: "San Francisco, CA",
  
  // Professional email address
  email: "alex.morgan@example.com",
  
  // Phone number with country code (for WhatsApp)
  phone: "+1 (555) 789-1234",
  
  // Professional bio/summary (2-3 sentences recommended)
  about: "Passionate full-stack developer with 7+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud architecture. Proven track record of delivering high-quality software on time and mentoring junior developers.",
  
  // ==========================================
  // PROFILE IMAGE
  // ==========================================
  // Option 1: Use a URL (recommended for deployment)
  profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop",
  
  // Option 2: Leave empty and upload via the form
  // profileImage: "",
  
  // ==========================================
  // DOCUMENTS (CV & RESUME)
  // ==========================================
  // Place your PDF files in the /assets/ folder
  // Then specify the paths below
  
  // CV file path (detailed version)
  cvFile: "/assets/cv.pdf",
  
  // Resume file path (concise version)
  resumeFile: "/assets/resume.pdf",
  
  // ==========================================
  // SKILLS
  // ==========================================
  // List your key skills (10-15 recommended)
  skills: [
    "React.js",
    "Node.js", 
    "TypeScript",
    "Python",
    "GraphQL",
    "Docker",
    "AWS",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Jest",
    "Git"
  ],
  
  // ==========================================
  // PROJECTS
  // ==========================================
  // Showcase your best work (3-5 projects recommended)
  projects: [
    {
      name: "AI Analytics Dashboard",
      description: "Real-time analytics platform with machine learning predictions. Handles 10k+ concurrent users with 99.9% uptime.",
      link: "https://github.com/example/ai-dashboard",
      tech: ["React", "TensorFlow", "FastAPI", "Redis"]
    },
    {
      name: "E-commerce Platform",
      description: "Full-stack solution with payment gateway integration, admin panel, and real-time inventory management.",
      link: "https://github.com/example/ecommerce",
      tech: ["Next.js", "Stripe", "PostgreSQL", "Docker"]
    },
    {
      name: "TaskFlow - Project Management",
      description: "Collaborative project management tool with real-time updates, file sharing, and team analytics.",
      link: "https://github.com/example/taskflow",
      tech: ["Vue.js", "Socket.io", "MongoDB", "Express"]
    },
    {
      name: "Portfolio Generator",
      description: "Open-source portfolio builder used by 500+ developers worldwide.",
      link: "https://github.com/example/portfolio-generator",
      tech: ["JavaScript", "HTML5", "CSS3", "LocalStorage"]
    }
  ],
  
  // ==========================================
  // CERTIFICATIONS
  // ==========================================
  // Add your professional certifications
  certifications: [
    "AWS Certified Solutions Architect",
    "Scrum Master Certified (SMC)",
    "Google Professional Cloud Developer",
    "Meta Backend Developer Certificate"
  ],
  
  // ==========================================
  // SOCIAL LINKS
  // ==========================================
  // Add your professional social profiles
  // Leave empty string if not applicable
  socialLinks: {
    linkedin: "https://linkedin.com/in/alexmorgan",
    github: "https://github.com/alexmorgan",
    twitter: "https://twitter.com/alexmorgan",
    dribbble: ""  // Leave empty if not applicable
  }
};

// ============================================
// ALTERNATIVE CONFIGURATION EXAMPLES
// ============================================
// Uncomment one of these examples to use instead
// ============================================

// ----- EXAMPLE 1: CLINICIAN / HEALTHCARE -----
/*
window.PORTFOLIO_CONFIG = {
  name: "Dr. Sarah Chen",
  title: "Clinical Psychologist",
  profession: "Clinician",
  location: "Boston, MA",
  email: "sarah.chen@example.com",
  phone: "+1 (555) 123-4567",
  about: "Compassionate clinical psychologist with 8+ years of experience in cognitive behavioral therapy and trauma-informed care. Dedicated to improving mental health outcomes through evidence-based practice and patient-centered approaches.",
  profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
  cvFile: "/assets/clinical-cv.pdf",
  resumeFile: "/assets/clinical-resume.pdf",
  skills: [
    "Cognitive Behavioral Therapy (CBT)",
    "Trauma-Focused Therapy",
    "Psychological Assessment",
    "EMDR",
    "Group Therapy",
    "Clinical Supervision",
    "Crisis Intervention",
    "Research Methodology"
  ],
  projects: [
    {
      name: "Anxiety Reduction Program",
      description: "Developed and implemented 8-week CBT program with 85% success rate in reducing anxiety symptoms",
      link: "#"
    },
    {
      name: "Community Mental Health Initiative",
      description: "Launched free counseling services for underserved communities, serving 500+ patients annually",
      link: "#"
    },
    {
      name: "Telehealth Implementation",
      description: "Pioneered remote therapy protocols during COVID-19, maintaining 95% patient engagement",
      link: "#"
    }
  ],
  certifications: [
    "Licensed Clinical Psychologist (LCP)",
    "CBT Certified Practitioner",
    "EMDR Trained",
    "Trauma-Focused CBT Certified"
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/in/sarahchen",
    github: "",
    twitter: "https://twitter.com/drsarahchen",
    dribbble: ""
  }
};
*/

// ----- EXAMPLE 2: UI/UX DESIGNER -----
/*
window.PORTFOLIO_CONFIG = {
  name: "Maria Garcia",
  title: "Senior UI/UX Designer",
  profession: "Designer",
  location: "Austin, TX",
  email: "maria@designstudio.com",
  phone: "+1 (555) 987-6543",
  about: "Creative UI/UX designer with 5+ years of experience crafting beautiful, user-centered digital experiences. Passionate about accessibility, design systems, and creating intuitive interfaces that users love.",
  profileImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop",
  cvFile: "/assets/designer-cv.pdf",
  resumeFile: "/assets/designer-resume.pdf",
  skills: [
    "Figma",
    "Adobe XD",
    "User Research",
    "Prototyping",
    "Design Systems",
    "Accessibility (WCAG)",
    "User Testing",
    "Sketch",
    "InVision",
    "HTML/CSS"
  ],
  projects: [
    {
      name: "Fintech App Redesign",
      description: "Led complete redesign of mobile banking app, increasing user engagement by 45% and reducing support tickets by 30%",
      link: "https://dribbble.com/username/fintech-redesign"
    },
    {
      name: "E-commerce Design System",
      description: "Created scalable design system used by 5+ product teams, reducing design time by 60%",
      link: "https://figma.com/username/design-system"
    },
    {
      name: "Healthcare Portal",
      description: "Designed patient portal for major hospital, achieving 92% user satisfaction score",
      link: "https://dribbble.com/username/healthcare-portal"
    }
  ],
  certifications: [
    "Google UX Design Certified",
    "Interaction Design Foundation",
    "Adobe Certified Expert (ACE)"
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/in/mariagarcia",
    github: "",
    twitter: "https://twitter.com/mariadesigns",
    dribbble: "https://dribbble.com/mariagarcia"
  }
};
*/

// ----- EXAMPLE 3: DATA SCIENTIST -----
/*
window.PORTFOLIO_CONFIG = {
  name: "David Kim",
  title: "Senior Data Scientist",
  profession: "Data Scientist",
  location: "Seattle, WA",
  email: "david.kim@datascience.com",
  phone: "+1 (555) 456-7890",
  about: "Data scientist with 6+ years of experience turning complex data into actionable insights. Expert in machine learning, statistical modeling, and data visualization. Passionate about solving real-world problems using data-driven approaches.",
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  cvFile: "/assets/datascientist-cv.pdf",
  resumeFile: "/assets/datascientist-resume.pdf",
  skills: [
    "Python",
    "R",
    "SQL",
    "Machine Learning",
    "TensorFlow",
    "PyTorch",
    "Tableau",
    "Power BI",
    "Apache Spark",
    "Statistical Analysis"
  ],
  projects: [
    {
      name: "Customer Churn Prediction",
      description: "Built ML model achieving 89% accuracy in predicting customer churn, saving company $2M annually",
      link: "https://github.com/username/churn-prediction"
    },
    {
      name: "Sales Forecasting Dashboard",
      description: "Created time-series forecasting model with 95% accuracy for inventory optimization",
      link: "https://github.com/username/sales-forecast"
    }
  ],
  certifications: [
    "Google Professional Data Engineer",
    "AWS Certified Machine Learning",
    "TensorFlow Developer Certificate"
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/in/davidkim",
    github: "https://github.com/davidkim",
    twitter: "https://twitter.com/davidkim_ai",
    dribbble: ""
  }
};
*/

// ----- EXAMPLE 4: STUDENT / FRESH GRADUATE -----
/*
window.PORTFOLIO_CONFIG = {
  name: "Emily Rodriguez",
  title: "Computer Science Graduate",
  profession: "Student",
  location: "Los Angeles, CA",
  email: "emily.rodriguez@edu.com",
  phone: "+1 (555) 222-3333",
  about: "Recent Computer Science graduate with honors, seeking entry-level software engineering positions. Strong foundation in full-stack development and a passion for creating impactful applications. Quick learner with excellent teamwork skills.",
  profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
  cvFile: "/assets/student-cv.pdf",
  resumeFile: "/assets/student-resume.pdf",
  skills: [
    "JavaScript",
    "Python",
    "Java",
    "React",
    "Node.js",
    "HTML/CSS",
    "Git",
    "SQL",
    "Problem Solving",
    "Team Collaboration"
  ],
  projects: [
    {
      name: "Campus Navigation App",
      description: "Mobile app helping students navigate campus, used by 2,000+ students (Capstone Project)",
      link: "https://github.com/username/campus-nav"
    },
    {
      name: "Personal Finance Tracker",
      description: "Web app for budgeting and expense tracking with data visualization",
      link: "https://github.com/username/finance-tracker"
    }
  ],
  certifications: [
    "Google IT Support Professional",
    "freeCodeCamp Responsive Web Design"
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/in/emilyrodriguez",
    github: "https://github.com/emilyrodriguez",
    twitter: "https://twitter.com/emilycodes",
    dribbble: ""
  }
};
*/

// ----- EXAMPLE 5: FREELANCE MARKETER -----
/*
window.PORTFOLIO_CONFIG = {
  name: "James Wilson",
  title: "Digital Marketing Specialist",
  profession: "Marketer",
  location: "Chicago, IL",
  email: "james@wilsonmarketing.com",
  phone: "+1 (555) 777-8888",
  about: "Results-driven digital marketer with 5+ years of experience helping businesses grow through data-driven strategies. Specialized in SEO, content marketing, and social media management. Proven track record of increasing ROI and brand awareness.",
  profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
  cvFile: "/assets/marketer-cv.pdf",
  resumeFile: "/assets/marketer-resume.pdf",
  skills: [
    "SEO/SEM",
    "Google Analytics",
    "Content Strategy",
    "Social Media Management",
    "Email Marketing",
    "PPC Advertising",
    "WordPress",
    "Copywriting",
    "Data Analysis",
    "Project Management"
  ],
  projects: [
    {
      name: "E-commerce SEO Overhaul",
      description: "Increased organic traffic by 150% and sales by 80% in 6 months",
      link: "#"
    },
    {
      name: "Social Media Campaign",
      description: "Viral campaign reaching 2M+ impressions with 10x ROI",
      link: "#"
    }
  ],
  certifications: [
    "Google Analytics Certified",
    "HubSpot Content Marketing",
    "Facebook Blueprint Certified"
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/in/jameswilson",
    github: "",
    twitter: "https://twitter.com/jamesmarketing",
    dribbble: ""
  }
};
*/

// ============================================
// QUICK TIPS FOR EDITING
// ============================================
/*
1. Always use quotes around text values
2. Don't forget commas between items
3. Add new skills in the skills array
4. Add new projects in the projects array
5. Place PDF files in /assets/ folder
6. Test your portfolio after changes
7. Use the Export button to backup your config
8. Clear browser cache if changes don't appear
*/
