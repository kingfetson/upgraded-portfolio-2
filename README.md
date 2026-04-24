# 🚀 Career Portfolio Generator

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-web-orange.svg)
![Mobile Ready](https://img.shields.io/badge/mobile-ready-brightgreen.svg)

**Create a stunning professional portfolio in minutes — no coding required.**

[Features](#-features) · [Quick Start](#-quick-start) · [Customization](#-customization-guide) · [FAQ](#-faq) · [Support](#-support)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Customization Guide](#-customization-guide)
- [File Structure](#-file-structure)
- [Configuration Examples](#-configuration-examples)
- [Mobile Responsiveness](#-mobile-responsiveness)
- [Deployment](#-deployment)
- [FAQ](#-faq)
- [Troubleshooting](#-troubleshooting)
- [Best Practices](#-best-practices)
- [Support](#-support)
- [License](#-license)

---

## 🎯 Overview

The **Career Portfolio Generator** is a modern, config-driven portfolio system designed for job seekers in any industry — whether you're a developer, designer, clinician, student, freelancer, marketer, or teacher.

### Why Use This?

| Benefit | Details |
|---|---|
| ⚡ Zero Coding | Edit one config file and you're done |
| 📱 Fully Responsive | Looks great on mobile, tablet, and desktop |
| 🎨 Multiple Themes | Switch styles instantly |
| 📄 PDF Support | Upload your CV and resume |
| 🔗 Social Integration | LinkedIn, GitHub, Twitter, WhatsApp |
| 💾 Auto Save | Persists via `localStorage` |
| 📊 Analytics | Track views and downloads |
| 🚀 Free Deployment | GitHub Pages, Netlify, or Vercel |

---

## ✨ Features

### Core

| Feature | Description |
|---|---|
| 🎨 Live Preview | Changes update in real time |
| 📝 Config-Driven | All editing done in `config.js` |
| 🖼️ Profile Image | Upload via URL or drag & drop |
| 📄 PDF Manager | Upload, preview, download, and delete |
| 🏷️ Skills Tags | Add or remove skills dynamically |
| 📁 Projects Showcase | Highlight your best work |
| 🔗 Social Links | Connect professional profiles |
| 📜 Certifications | Display qualifications |
| 🎯 Recruiter Summary | Key details surfaced at a glance |

### Advanced

| Feature | Description |
|---|---|
| 🌓 Dark / Light Mode | Toggle appearance anytime |
| 🎨 4 Themes | Default, Modern, Creative, Minimal |
| 📐 3 Layouts | Modern, Minimal, Creative |
| 📱 Mobile Optimized | Smooth touch UI |
| 🔄 Import / Export | Backup and restore your data |
| 📊 Analytics | View counts and download tracking |
| 🔗 Share Modal | QR code and social sharing |
| 💬 WhatsApp Button | One-tap recruiter contact |

---

## 🚀 Quick Start

Get up and running in five minutes:

1. Download the project files
2. Open `config.js` and fill in your details
3. Add your CV and resume to `assets/`
4. Open `index.html` in your browser
5. Share your portfolio link

---

## 📥 Installation

### Option 1 — Clone the Repository

```bash
git clone https://github.com/yourusername/career-portfolio-generator.git
cd career-portfolio-generator
# Then open index.html in your browser
```

### Option 2 — Manual Setup

Create the following folder structure and open `index.html`:

```
my-portfolio/
├── index.html
├── styles.css
├── script.js
├── config.js
└── assets/
```

---

## 🎨 Customization Guide

All customization happens in a single file — `config.js`:

```javascript
window.PORTFOLIO_CONFIG = {
  name: "Your Full Name",
  title: "Your Profession",
  profession: "Industry",
  location: "City, Country",
  email: "your@email.com",
  phone: "+123456789",

  about: "Short professional summary here.",

  profileImage: "https://your-image-url.com/photo.jpg",

  cvFile: "/assets/cv.pdf",
  resumeFile: "/assets/resume.pdf",

  skills: ["React", "Node.js", "UI Design"],

  projects: [
    {
      name: "Project Name",
      description: "Short project description",
      link: "https://project-link.com"
    }
  ],

  certifications: ["Certification 1", "Certification 2"],

  socialLinks: {
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username",
    twitter: "https://twitter.com/username"
  }
};
```

---

## 📁 File Structure

```
career-portfolio-generator/
├── index.html       # App structure
├── styles.css       # Styling
├── script.js        # App logic
├── config.js        # ← Your main editing file
├── README.md        # Documentation
└── assets/
    ├── cv.pdf
    └── resume.pdf
```

---

## ⚙️ Configuration Examples

### Developer

```javascript
window.PORTFOLIO_CONFIG = {
  name: "Alex Chen",
  title: "Senior Full Stack Developer",
  skills: ["React", "Node.js", "MongoDB", "AWS"],
  projects: [
    {
      name: "E-commerce App",
      description: "Serves 10k+ daily users",
      link: "https://github.com/project"
    }
  ]
};
```

### Designer

```javascript
window.PORTFOLIO_CONFIG = {
  name: "Maria Garcia",
  title: "UI/UX Designer",
  skills: ["Figma", "Adobe XD", "User Research"],
  projects: [
    {
      name: "Finance App UI",
      description: "Modern mobile redesign"
    }
  ]
};
```

### Clinician

```javascript
window.PORTFOLIO_CONFIG = {
  name: "Dr. Sarah Johnson",
  title: "Clinical Psychologist",
  skills: ["CBT", "Trauma Therapy"],
  certifications: ["Licensed Psychologist"]
};
```

---

## 📱 Mobile Responsiveness

| Device | Breakpoint | Status |
|---|---|---|
| 📱 Mobile | < 480px | ✅ Optimized |
| 📱 Tablet | 481px – 900px | ✅ Optimized |
| 💻 Desktop | > 901px | ✅ Optimized |
| 🖨️ Print | — | ✅ Supported |

---

## 🚀 Deployment

### GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

Then go to **Settings → Pages**, select the `main` branch, and save. Your portfolio will be live at:

```
https://yourusername.github.io/portfolio/
```

### Netlify

Drag and drop your project folder onto [netlify.com](https://netlify.com) — done.

### Vercel

```bash
npm i -g vercel
vercel
```

---

## ❓ FAQ

**Do I need coding skills?**
No — just edit `config.js`.

**Where is my data stored?**
In your browser using `localStorage`.

**Is it mobile-friendly?**
Yes, fully responsive across all screen sizes.

**Can recruiters download my CV?**
Yes, with a single click.

**Can I add a WhatsApp contact button?**
Yes, it's supported out of the box.

---

## 🔧 Troubleshooting

| Issue | Solution |
|---|---|
| Images not loading | Check the image URL is correct and publicly accessible |
| PDFs not opening | Make sure files are placed in the `assets/` folder |
| Changes not saving | Clear your browser cache and reload |
| Theme not changing | Hard-refresh the page (Ctrl/Cmd + Shift + R) |
| Social links broken | Ensure all URLs start with `https://` |

---

## 💡 Best Practices

**Do:**
- Use a professional, well-lit photo
- Keep your bio concise and focused
- Showcase your best 3–5 projects
- Keep your CV file under 2MB
- Test on mobile before sharing
- Update your portfolio monthly

**Don't:**
- List skills you don't actually have
- Include broken or outdated links
- Upload poor-quality PDF files
- Share sensitive personal data

### Performance Tips

**Images:** Use JPG format, under 500KB, at 400×400px recommended.

**PDFs:** Keep under 2MB, compress where possible, and remove unnecessary pages.

---

## 🛠️ Support

- 📖 [README Documentation](#)
- 🐛 [GitHub Issues](https://github.com/yourusername/career-portfolio-generator/issues)
- 💬 [GitHub Discussions](https://github.com/yourusername/career-portfolio-generator/discussions)
- 📧 support@careerportfolio.com

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

⭐ If this project helped you, give it a star!

Built with ❤️ for job seekers worldwide.

</div>
