require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────

const profile = {
    name: "Dharani Wasundara",
    title: "Computer Science Undergraduate",
    tagline: "Building software that matters",
    location: "Ragama, Sri Lanka",
    phone: "+94 76 614 1046",
    email: "wasundaradharani@gmail.com",
    github: "https://github.com/Dharani-wasundara",
    linkedin: "https://www.linkedin.com/in/dharani-wasundara/",
    summary: "Motivated and detail-oriented Computer Science undergraduate with strong leadership experience in university organizations. Passionate about software development and problem-solving, with hands-on experience in academic and group projects. Proven ability to lead teams, coordinate large-scale university events, and manage responsibilities under pressure. Seeking opportunities to apply technical knowledge and leadership skills in dynamic professional environments."
};

const experience = [
    {
        id: 1,
        company: "Smart Electronics Mabola",
        role: "Data Entry & Office Assistant",
        period: "June 2025 – August 2025",
        type: "Internship",
        points: [
            "Performed accurate data entry and maintained digital records using spreadsheets and databases.",
            "Improved speed and accuracy through consistent practice while minimizing data errors.",
            "Verified information with strong attention to detail.",
            "Collaborated effectively within a professional office team."
        ]
    }
];

const education = [
    {
        id: 1,
        degree: "BSc (Hons) in Computer Science",
        institution: "University of Westminster (Informatics Institute of Technology, Sri Lanka)",
        period: "Sep 2024 – Present",
        category: "IT",
        gpa: null,
        modules: ["Object-oriented Programming", "Web Design and Development", "Database Systems", "Machine Learning", "Human-Computer Interactions"]
    },
    {
        id: 2,
        degree: "Diploma in Information Technology",
        institution: "IMBS Green University",
        period: "2020 – 2021",
        category: "IT",
        gpa: "3.02",
        modules: ["MS Office", "Computer Hardware", "Networking", "Internet Email and Networking", "Social Media Networking"]
    },
    {
        id: 3,
        degree: "Certificate in Applied Information Technology",
        institution: "SLT-Mobitel NEBULA Institute of Technology",
        period: "Feb 2024 – Apr 2024",
        category: "IT",
        grade: "A",
        modules: ["Basic Python", "MySQL", "Photoshop"]
    },
    {
        id: 4,
        degree: "Diploma in English and English Literature",
        institution: "Aquinas College of Higher Studies, Colombo",
        period: "2020 – 2021",
        category: "Other",
        modules: []
    },
    {
        id: 5,
        degree: "Certificate Course in Leadership and Management",
        institution: "IMBS Green University",
        period: "2020 – 2021",
        category: "Other",
        gpa: "4.00",
        modules: []
    }
];

const skills = {
    technical: [
        { name: "Python", level: 80 },
        { name: "Java", level: 65 },
        { name: "HTML & CSS", level: 85 },
        { name: "JavaScript", level: 70 },
        { name: "SQL / Database Management", level: 72 },
        { name: "Object-Oriented Programming", level: 75 },
        { name: "Figma", level: 60 }
    ],
    soft: [
        "Leadership & Team Management",
        "Event Coordination & Logistics",
        "Problem Solving & Critical Thinking",
        "Teamwork & Communication",
        "Time Management",
        "Documentation & Reporting"
    ]
};

const projects = [
    {
        id: 1,
        title: "Automated Traffic Flow Visualization & Reporting System",
        type: "Academic Project",
        period: "Feb 2024 – Apr 2024",
        description: "Developed a Python program to analyze and visualize traffic flow data. Processed CSV datasets to identify peak congestion times, generated summary reports, and created histograms for trend visualization.",
        technologies: ["Python", "Matplotlib", "CSV"],
        github: "https://github.com/Dharani-wasundara/Automated-Traffic-Visualization-and-Reporting-System-.git",
        featured: true
    },
    {
        id: 2,
        title: "SDG 13 Climate Action Website",
        type: "Group Academic Project",
        period: "March 2024 – Sep 2025",
        description: "Designed and developed a responsive website focused on SDG 13: Climate Action. Collaborated in a group setting to create an engaging front-end experience raising awareness about climate change.",
        technologies: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/Dharani-wasundara/PlanetPulse-Web.git",
        featured: true
    }
];

const leadership = [
    {
        id: 1,
        title: "Student Outreach – Women in Engineering (WIE)",
        organization: "IEEE Student Branch, IIT",
        period: "2026 Term",
        points: [
            "Responsible for member engagement, recruitment strategies, and strengthening participation within WIE.",
            "Coordinate with executive committee members to improve member retention and activity planning."
        ]
    },
    {
        id: 2,
        title: "Committee Member – Student Council, IIT",
        organization: "IIT",
        period: "2026 Term",
        points: [
            "Led the planning and execution of event decoration themes for university programs.",
            "Managed a team of volunteers for creative, timely, and well-coordinated event setup.",
            "Coordinated with organizing committees to align decorations with event concepts."
        ]
    },
    {
        id: 3,
        title: "Delegate Handling Lead – Project Sherlock",
        organization: "WIE IEEE IIT",
        period: "2026 Jan–Feb",
        points: [
            "Managed participant coordination and event logistics for a university-wide interactive event.",
            "Ensured smooth registration, communication, and execution under strict timelines."
        ]
    },
    {
        id: 4,
        title: "Organizing Committee Member (Secretarial Lead) – Codesprint",
        organization: "IEEE Student Branch, IIT",
        period: "2026 Feb – Present",
        points: [
            "Managed documentation, meeting notes, and communication for the Codesprint event.",
            "Coordinated with committee members to ensure smooth planning and execution."
        ]
    },
    {
        id: 5,
        title: "Organizing Committee Member – Fusion",
        organization: "WIE IIT",
        period: "2026 Jan",
        points: [
            "Contributed to planning, coordination, and on-ground event execution.",
            "Collaborated with cross-functional teams for successful event delivery."
        ]
    },
    {
        id: 6,
        title: "Decoration Lead – Heart and Roses",
        organization: "Student Council IIT",
        period: "2025 Nov",
        points: [
            "Led decoration planning and creative execution for university event.",
            "Managed a small team ensuring theme consistency and timely setup."
        ]
    },
    {
        id: 7,
        title: "Volunteer (Secretarial Team) – AdaptIQ",
        organization: "WIE IEEE IIT",
        period: "2025 Oct",
        points: [
            "Assisted in organizing meetings, documenting activities, and managing communication.",
            "Strengthened skills in coordination, time management, and professional communication."
        ]
    }
];

const certifications = [
    { id: 1, title: "Critical Thinking and Problem-Solving", issuer: "LinkedIn Learning", year: "2025" },
    { id: 2, title: "Learning Python", issuer: "LinkedIn Learning", year: "2025" },
    { id: 3, title: "Programming Foundation – Fundamentals", issuer: "LinkedIn Learning", year: "2025" },
    { id: 4, title: "Python GUI Development with Tkinter", issuer: "LinkedIn Learning", year: "2025" }
];

const references = [
    {
        name: "Torin Wirasingha",
        title: "Lecturer / Level Coordinator, Faculty of Computing",
        organization: "Informatics Institute of Technology, Sri Lanka",
        phone: "+94 112360212 | +94 768209747",
        email: "torin.w@iit.ac.lk"
    },
    {
        name: "Shavin Fernando",
        title: "Software Engineer, IFS R&D International | Visiting Lecturer",
        organization: "Informatics Institute of Technology",
        phone: "+94 773592037",
        email: "shavin.fernando@ifs.com"
    }
];

// ─────────────────────────────────────────
//  API ROUTES
// ─────────────────────────────────────────

app.get('/api/profile', (req, res) => res.json(profile));
app.get('/api/experience', (req, res) => res.json(experience));
app.get('/api/education', (req, res) => res.json(education));
app.get('/api/skills', (req, res) => res.json(skills));
app.get('/api/projects', (req, res) => res.json(projects));
app.get('/api/leadership', (req, res) => res.json(leadership));
app.get('/api/certifications', (req, res) => res.json(certifications));
app.get('/api/references', (req, res) => res.json(references));

// ── Nodemailer transporter (Gmail) ──────────────────────────────────────────
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    // Always log to console as a fallback
    console.log('\n📩 New Contact Form Submission');
    console.log('─────────────────────────────');
    console.log(`From:    ${name} <${email}>`);
    console.log(`Subject: ${subject || '(no subject)'}`);
    console.log(`Message: ${message}`);
    console.log('─────────────────────────────\n');

    // Skip email if credentials not configured yet
    if (!process.env.GMAIL_USER || process.env.GMAIL_APP_PASSWORD === 'your_16_char_app_password_here') {
        console.log('⚠️  Gmail credentials not configured — email skipped. See .env file.');
        return res.json({ success: true, message: 'Thank you for reaching out! I will get back to you soon.' });
    }

    const htmlBody = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0d0d1a;border-radius:12px;overflow:hidden;border:1px solid rgba(138,43,226,0.4)">
      <div style="background:linear-gradient(135deg,#8a2be2,#9d4edd);padding:28px 32px">
        <h2 style="margin:0;color:#fff;font-size:1.4rem;">📩 New Portfolio Message</h2>
      </div>
      <div style="padding:28px 32px;color:#e0e0f0">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#a0a0c0;width:90px">From</td>
              <td style="padding:8px 0"><strong>${name}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#a0a0c0">Email</td>
              <td style="padding:8px 0"><a href="mailto:${email}" style="color:#c084fc">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#a0a0c0">Subject</td>
              <td style="padding:8px 0">${subject || '(no subject)'}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid rgba(138,43,226,0.25);margin:20px 0">
        <p style="color:#a0a0c0;font-size:0.85rem;margin-bottom:8px">Message</p>
        <div style="background:rgba(255,255,255,0.05);border-left:3px solid #8a2be2;padding:16px;border-radius:6px;white-space:pre-line;line-height:1.7">${message}</div>
        <p style="margin-top:24px;font-size:0.8rem;color:#6060a0">Sent from your portfolio contact form at dharani-portfolio.local</p>
      </div>
    </div>`;

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,   // sends to your own Gmail inbox
            replyTo: `"${name}" <${email}>`, // reply goes directly to the sender
            subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
            html: htmlBody
        });
        console.log('✅ Email sent successfully to', process.env.GMAIL_USER);
        res.json({ success: true, message: 'Thank you for reaching out! I will get back to you soon.' });
    } catch (err) {
        console.error('❌ Email error:', err.message);
        // Still return success to user — the message was logged
        res.json({ success: true, message: 'Thank you for reaching out! I will get back to you soon.' });
    }
});

// Fallback: serve index.html for any unknown route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n🚀 Portfolio server running at http://localhost:${PORT}\n`);
});
