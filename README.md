# 🎓 Seminar Hall Booking System  
**KKR & KSR INSTITUTE OF TECHNOLOGY & SCIENCES**

A smart and efficient system to manage seminar hall bookings within the college, providing real-time availability, authentication-based access, and automated approval workflows — all built with **Firebase Studio** and modern web technologies.

---

## 🚀 Project Overview

The **Seminar Hall Booking System** is designed to streamline the process of booking seminar halls across different departments.  
It allows authenticated users (Admins, Supervisors, HODs, TPO Cell, College Management, and Clubs) to book halls efficiently while avoiding scheduling conflicts using a priority-based system.

---

## 🧩 Features

- **🔐 User Authentication** — Secure login for different roles:
  - Admins, Supervisors, HODs (CSE, CSE-AIML, CSD, IT, ECE, EEE)
  - TPO Cell, College Management
  - Clubs: E-Cell, NSS, NCC

- **🏢 Real-time Hall Availability**
  - Displays real-time status of halls:
    - CV Raman Hall  
    - Newton Hall  
    - Abdul Kalam Hall  
    - Visvesvaraya Hall

- **📝 Booking Request Submission**
  - Authenticated users can request bookings with event details.

- **⚖️ Priority-Based Conflict Resolution**
  - Hierarchy: **TPO > College Management > HODs > Clubs**
  - If a clash occurs, an **AI-assisted suggestion tool** recommends alternate halls or times based on user priority and event details.

- **✅ Approval Workflow**
  - Requests are routed to College Management for final approval.

- **📄 Automated Invoice Generation**
  - Generates a downloadable PDF with hall details, event info, and digital signatures (Principal, Management).

- **🖥️ Admin Dashboard**
  - Manage users, halls, booking requests, and conflict priorities efficiently.

---

## 🎨 Design & UI

- **Framework:** Next.js (TypeScript) + Tailwind CSS  
- **Fonts:** Space Grotesk (headings) & Inter (body text)  
- **Responsive Layout:** Works seamlessly across desktop, tablet, and mobile.  
- **Animations:** Smooth transitions for booking confirmations and dashboard interactions.  

---

## 🧠 AI Integration

Integrated with **Gemini / Genkit AI** tools to analyze booking requests and assist in conflict resolution through intelligent suggestions.

---

## 🛠️ Technologies Used

| Category | Technologies |
|-----------|--------------|
| Frontend | React, Next.js, Tailwind CSS, TypeScript |
| Backend | Firebase Studio |
| Database | Firestore |
| Hosting | Firebase Hosting |
| Authentication | Firebase Auth |
| AI Tools | Gemini / Genkit |
| Version Control | GitHub |

---

## 👨‍💻 Team Members

| Name | Roll No | Department | Role | Email |
|------|----------|-------------|------|--------|
| **CHILAKALA MANIKANTA SAI ANURUDH** | 23JR1A4347 | CAI | Project Lead & Frontend Developer | manikantaanurudh904@gmail.com |
| **EDULAMUDI MANOJ** | 23JR1A4348 | CAI | UI Designer & Firebase Integration | 23jr1a4348@gmail.com |
| **INKOLLU CHANDRASEKHAR** | 23JR1A4357 | CAI | Backend & Firestore Database Developer | 23jr1a4357@gmail.com |
| **KAKUMANU KARTHIKEYA** | 23JR1A4358 | CAI | Authentication & Admin Panel Developer | kakumanukarthikeya2@gmail.com |
| **DASARI CHAITANYA SAI GANESH** | 23JR1A0559 | CSE | Deployment & Testing | 23jr1a0559@gmail.com |
| **CHINTAREDDY AVIGNESH REDDY** | 24JR5A4304 | CAI | Documentation & QA | chinnulast8@gmail.com |

---

## 🌐 Live Demo

🔗 **[View Project Live](https://9000-firebase-studio-1760764589867.cluster-edb2jv34dnhjisxuq5m7l37ccy.cloudworkstations.dev)**  

---

## 🗂️ GitHub Repository

🔗 **[Seminar Hall Booking System – GitHub Repo](https://github.com/Manikanta904/seminar_hallbooking_system)**  

---

## 📘 Documentation

📄 **[View Documentation](https://docs.google.com/document/d/e/2PACX-1vT2QgjFK2FZXbjF8mYFyguckANa52fNOpE-cVMghOAdnzQFDH2WWjQF7x3opJl2zGGe2ylQdtNzT6zR/pub)**  

---

## 🎤 Presentation

🎯 **[Google Slides Presentation](https://docs.google.com/presentation/d/1Ai9BaiUC93W3WkHd6XdueRWsp69y6f0xYWzZq2n4uk0/edit?usp=sharing)**  

---

## ⚙️ How to Run the Project

1. Clone the repository:  
   ```bash
   git clone https://github.com/Manikanta904/seminar_hallbooking_system.git
   cd seminar_hallbooking_system
