# 📊 ATS Friendly Resume Builder

A clean, modern, and ATS-friendly resume builder that helps students and job seekers create professional resumes with live preview, grouped skills, clickable links, and PDF download support.

---

## 🚀 Live Demo

🔗 [Add Your Live Project Link Here](https://your-project-link.vercel.app)

---

## 📌 About The Project

**ATS Friendly Resume Builder** is a web-based resume creation tool where users can fill their personal details, education, experience, skills, projects, certifications, and achievements step by step.

The project provides a clean resume preview and allows users to generate a professional resume suitable for job applications and ATS screening.

---

## ✨ Features

- 📝 Step-by-step resume form
- 👁️ Live resume preview
- 📄 ATS-friendly resume layout
- 🔗 Clickable links for LinkedIn, GitHub, Portfolio, and coding profiles
- 💻 Grouped skills section  
  Example:
  - Programming Languages
  - Web Development
  - AI/ML
  - Database
  - Tools
- 📚 Education section
- 💼 Experience section
- 🚀 Projects section
- 🏆 Achievements section
- 📜 Certifications section
- 📥 PDF download support
- 🎨 Modern and responsive UI
- ⚡ Built using React and Vite

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Build Tool:** Vite
- **Styling:** CSS, Tailwind CSS
- **PDF Support:** Browser Print / PDF generation logic
- **Icons & UI:** Emoji-based section icons

---

## 📂 Folder Structure

```txt
resume-maker/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Form/
│   │   │   ├── PersonalInfo.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Certifications.jsx
│   │   │   └── Achievements.jsx
│   │   │
│   │   ├── Preview/
│   │   │   └── ResumePreview.jsx
│   │   │
│   │   └── UI/
│   │
│   ├── data/
│   │   └── initialResumeData.js
│   │
│   ├── pages/
│   │   └── Builder.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── README.md
