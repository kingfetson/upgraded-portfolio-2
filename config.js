// ============================================
// CAREER PORTFOLIO GENERATOR - CONFIGURATION
// ============================================
// Edit this file to customize your portfolio
// No coding knowledge required!
// ============================================

window.PORTFOLIO_CONFIG = {
  // ===== PERSONAL INFORMATION =====
  name: "Alex Morgan",
  title: "Senior Full Stack Developer",
  profession: "Developer",
  location: "San Francisco, CA",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 789-1234",
  
  // Bio / About section
  about: "Passionate full-stack developer with 7+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud architecture. I love solving complex problems and mentoring junior developers. Proven track record of delivering high-quality software on time.",
  
  // Profile image (use URL or leave empty for placeholder)
  profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop",
  
  // ===== DOCUMENTS =====
  // Place your PDF files in /assets/ folder
  cvFile: "/assets/cv.pdf",
  resumeFile: "/assets/resume.pdf",
  
  // ===== SKILLS =====
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
    "Tailwind CSS"
  ],
  
  // ===== PROJECTS =====
  projects: [
    {
      name: "AI Analytics Dashboard",
      description: "Real-time analytics platform with machine learning predictions. Handles 10k+ concurrent users.",
      link: "https://github.com/example/ai-dashboard",
      tech: ["React", "TensorFlow", "FastAPI"]
    },
    {
      name: "E-commerce Platform",
      description: "Full-stack solution with payment gateway integration and admin panel.",
      link: "https://github.com/example/ecommerce",
      tech: ["Next.js", "Stripe", "PostgreSQL"]
    },
    {
      name: "Task Management System",
      description: "Collaborative project management tool with real-time updates.",
      link: "https://github.com/example/taskflow",
      tech: ["Vue.js", "Socket.io", "MongoDB"]
    }
  ],
  
  // ===== CERTIFICATIONS =====
  certifications: [
    "AWS Certified Solutions Architect",
    "Scrum Master Certified",
    "Google Professional Cloud Developer"
  ],
  
  // ===== SOCIAL LINKS =====
  socialLinks: {
    linkedin: "https://linkedin.com/in/alexmorgan",
    github: "https://github.com/alexmorgan",
    twitter: "https://twitter.com/alexmorgan",
    dribbble: ""
  },
  
  // ===== ANALYTICS (optional) =====
  // These will be auto-managed by the system
  analytics: {
    views: 0,
    cvDownloads: 0,
    resumeDownloads: 0
  }
};

// ============================================
// ALTERNATIVE CONFIGURATION EXAMPLES
// ============================================

// ----- CLINICIAN EXAMPLE -----
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
  skills: ["CBT", "Trauma Therapy", "Psychological Assessment", "EMDR", "Group Therapy", "Clinical Supervision"],
  projects: [
    { name: "Anxiety Reduction Program", description: "Developed 8-week program with 85% success rate", link: "#" },
    { name: "Community Mental Health Initiative", description: "Launched free counseling services for underserved communities", link: "#" }
  ],
  certifications: ["Licensed Clinical Psychologist", "CBT Certified", "EMDR Trained"],
  socialLinks: { linkedin: "https://linkedin.com/in/sarahchen", github: "", twitter: "" }
};
*/

// ----- DESIGNER EXAMPLE -----
/*
window.PORTFOLIO_CONFIG = {
  name: "Maria Garcia",
  title: "UI/UX Designer",
  profession: "Designer",
  location: "Austin, TX",
  email: "maria@designstudio.com",
  phone: "+1 (555) 987-6543",
  about: "Creative UI/UX designer with 5+ years of experience crafting beautiful, user-centered digital experiences. Passionate about accessibility and design systems.",
  profileImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop",
  cvFile: "/assets/designer-cv.pdf",
  resumeFile: "/assets/designer-resume.pdf",
  skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems", "Accessibility"],
  projects: [
    { name: "Fintech App Redesign", description: "Increased user engagement by 45% through UX improvements", link: "https://dribbble.com/..." },
    { name: "E-commerce Design System", description: "Scalable design system used by 5+ product teams", link: "https://figma.com/..." }
  ],
  certifications: ["Google UX Design Certified", "Interaction Design Foundation"],
  socialLinks: { linkedin: "https://linkedin.com/in/mariagarcia", dribbble: "https://dribbble.com/maria", github: "" }
};
*/
