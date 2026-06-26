import { useRef, useState } from "react";
// import { toJpeg } from "html-to-image";
// import { jsPDF } from "jspdf";

import initialResumeData from "../data/initialResumeData";

import PersonalInfo from "../components/Form/PersonalInfo";
import Education from "../components/Form/Education";
import Experience from "../components/Form/Experience";
import Skills from "../components/Form/Skills";
import Projects from "../components/Form/Projects";
import Certifications from "../components/Form/Certifications";
import Achievements from "../components/Form/Achievements";

import ResumePreview from "../components/Preview/ResumePreview";

const steps = [
  { id: 0, title: "Personal Info", icon: "👤" },
  { id: 1, title: "Education", icon: "🎓" },
  { id: 2, title: "Experience", icon: "💼" },
  { id: 3, title: "Skills", icon: "💻" },
  { id: 4, title: "Projects", icon: "🚀" },
  { id: 5, title: "Certifications", icon: "📜" },
  { id: 6, title: "Achievements", icon: "🏆" },
];

function Builder() {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [activeStep, setActiveStep] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const pdfRef = useRef(null);

  const progress = Math.round(((activeStep + 1) / steps.length) * 100);

  const handlePersonalChange = (field, value) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedSection = [...resumeData[section]];
    updatedSection[index][field] = value;

    setResumeData({
      ...resumeData,
      [section]: updatedSection,
    });
  };

  const addItem = (section, emptyObject) => {
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], emptyObject],
    });
  };

  const removeItem = (section, index) => {
    const updatedSection = resumeData[section].filter((_, i) => i !== index);

    setResumeData({
      ...resumeData,
      [section]: updatedSection,
    });
  };

const handleSkillGroupChange = (index, field, value) => {
  const updatedSkills = [...resumeData.skills];

  updatedSkills[index] = {
    ...updatedSkills[index],
    [field]: value,
  };

  setResumeData({
    ...resumeData,
    skills: updatedSkills,
  });
};

const addSkillGroup = () => {
  setResumeData({
    ...resumeData,
    skills: [
      ...resumeData.skills,
      {
        groupName: "",
        skills: "",
      },
    ],
  });
};

const removeSkillGroup = (index) => {
  const updatedSkills = resumeData.skills.filter((_, i) => i !== index);

  setResumeData({
    ...resumeData,
    skills:
      updatedSkills.length > 0
        ? updatedSkills
        : [
            {
              groupName: "",
              skills: "",
            },
          ],
  });
};

  const cleanUnsupportedColors = (rootElement) => {
    const elements = [rootElement, ...rootElement.querySelectorAll("*")];

    elements.forEach((el) => {
      const style = window.getComputedStyle(el);

      const color = style.color;
      const backgroundColor = style.backgroundColor;
      const borderColor = style.borderColor;

      if (color.includes("oklch")) {
        el.style.color = "#111111";
      }

      if (backgroundColor.includes("oklch")) {
        el.style.backgroundColor = "#ffffff";
      }

      if (borderColor.includes("oklch")) {
        el.style.borderColor = "#d1d5db";
      }

      el.style.opacity = "1";
      el.style.filter = "none";
      el.style.textShadow = "none";
    });
  };

//   const downloadPDF = async () => {
//   if (isDownloading) return;

//   const element = pdfRef.current;

//   if (!element) {
//     alert("Resume preview not found");
//     return;
//   }

//   try {
//     setIsDownloading(true);

//     const fileName =
//       resumeData.personalInfo.name?.trim().replaceAll(" ", "_") || "resume";

//     const dataUrl = await toJpeg(element, {
//       quality: 1,
//       pixelRatio: 2,
//       backgroundColor: "#ffffff",
//       width: 794,
//       height: 1123,
//       style: {
//         width: "794px",
//         minHeight: "1123px",
//         background: "#ffffff",
//         color: "#111111",
//       },
//       filter: (node) => {
//         if (node.tagName === "SCRIPT") return false;
//         return true;
//       },
//     });

//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "px",
//       format: [794, 1123],
//     });

//     pdf.addImage(dataUrl, "JPEG", 0, 0, 794, 1123);
//     pdf.save(`${fileName}.pdf`);
//   } catch (error) {
//     console.error("PDF ERROR:", error);
//     alert(error?.message || "PDF download failed. Check console.");
//   } finally {
//     setIsDownloading(false);
//   }
// };
// download pdf ecnding>>>>...
const downloadPDF = () => {
  const element = pdfRef.current;

  if (!element) {
    alert("Resume preview not found");
    return;
  }

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Please allow popups to download the resume.");
    return;
  }

  const resumeHTML = element.innerHTML;

  printWindow.document.open();
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${resumeData.personalInfo.name || "resume"}</title>

        <style>
          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;
            background: #ffffff;
            color: #111111;
            font-family: Arial, Helvetica, sans-serif;
          }

          @page {
            size: A4;
            margin: 0;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .resume-preview {
            width: 210mm;
            min-height: 297mm;
            background: #ffffff;
            color: #111111;
            padding: 12mm 14mm;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.28;
          }

          .resume-preview * {
            color-scheme: light;
            opacity: 1;
            filter: none;
            text-shadow: none;
            box-shadow: none;
          }

          .resume-header {
            text-align: center;
            margin-bottom: 10px;
          }

          .resume-preview h1 {
            color: #111111;
            font-size: 22px;
            font-weight: 800;
            margin: 0 0 5px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }

          .resume-contact {
            color: #111111;
            font-size: 11px;
            margin: 0;
          }

          .resume-preview h2 {
            color: #111111;
            font-size: 13px;
            font-weight: 800;
            margin: 12px 0 5px;
            padding-bottom: 3px;
            border-bottom: 1px solid #111111;
            text-transform: uppercase;
            letter-spacing: 0.4px;
          }

          .resume-preview h3 {
            color: #111111;
            font-size: 12px;
            font-weight: 700;
            margin: 5px 0 2px;
          }

          .resume-preview p,
          .resume-preview li,
          .resume-preview span,
          .resume-preview div {
            color: #111111;
            font-size: 11px;
          }

          .resume-preview p {
            margin: 2px 0;
          }

          .resume-preview ul {
            margin: 3px 0 6px 16px;
            padding: 0;
          }

          .resume-preview li {
            margin-bottom: 2px;
          }

          .resume-preview a {
            color: #1d4ed8;
            text-decoration: none;
            font-size: 11px;
          }

          .resume-preview section {
            margin-bottom: 6px;
          }

          .resume-row {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 5px;
          }

          .resume-right {
            text-align: right;
            min-width: 140px;
          }

          @media print {
            body {
              margin: 0;
            }

            .resume-preview {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>

      <body>
        ${resumeHTML}

        <script>
          window.onload = function () {
            setTimeout(function () {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
};
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInfo
            personalInfo={resumeData.personalInfo}
            handlePersonalChange={handlePersonalChange}
          />
        );

      case 1:
        return (
          <Education
            education={resumeData.education}
            handleArrayChange={handleArrayChange}
            addItem={addItem}
            removeItem={removeItem}
          />
        );

      case 2:
        return (
          <Experience
            experience={resumeData.experience}
            handleArrayChange={handleArrayChange}
            addItem={addItem}
            removeItem={removeItem}
          />
        );

      case 3:
      case 3:
  return (
    <Skills
      skills={resumeData.skills}
      handleSkillGroupChange={handleSkillGroupChange}
      addSkillGroup={addSkillGroup}
      removeSkillGroup={removeSkillGroup}
    />
  );

      case 4:
        return (
          <Projects
            projects={resumeData.projects}
            handleArrayChange={handleArrayChange}
            addItem={addItem}
            removeItem={removeItem}
          />
        );

      case 5:
        return (
          <Certifications
            certifications={resumeData.certifications}
            handleArrayChange={handleArrayChange}
            addItem={addItem}
            removeItem={removeItem}
          />
        );

      case 6:
        return (
          <Achievements
            achievements={resumeData.achievements}
            handleArrayChange={handleArrayChange}
            addItem={addItem}
            removeItem={removeItem}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>
      <div className="orb orb-three"></div>

      <nav className="top-navbar">
        <h1 className="logo-text">ATS Friendly Resume</h1>

        <div className="nav-actions">
          <button onClick={() => setShowPreviewModal(true)}>
            👁 Live Preview
          </button>

          <button
            onClick={downloadPDF}
            className="download-small"
            disabled={isDownloading}
          >
            {isDownloading ? "Downloading..." : "Download PDF"}
          </button>
        </div>
      </nav>

      <main className="builder-container">
        <div className="hero-section">
          <div>
            <h1>
              Build Your <span>Professional Resume</span>
            </h1>
            <p>Create a clean, colorful and ATS-friendly resume step by step.</p>
          </div>

          <div className="progress-box">
            <p>
              Step {activeStep + 1} of {steps.length}
            </p>
            <strong>{progress}% Complete</strong>
          </div>
        </div>

        <div className="progress-bar">
          <div style={{ width: `${progress}%` }}></div>
        </div>

        <div className="tab-card">
          <div className="tabs">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={activeStep === step.id ? "active-tab" : ""}
              >
                <span>{step.icon}</span>
                {step.title}
              </button>
            ))}
          </div>

          <div className="form-panel">
            <div className="section-heading">
              <div className="section-icon">{steps[activeStep].icon}</div>

              <div>
                <h2>{steps[activeStep].title}</h2>
                <p>Fill this section carefully. You can add multiple entries.</p>
              </div>
            </div>

            {renderStep()}

            <div className="step-buttons">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
                className="secondary-btn"
              >
                Previous
              </button>

              <button
                onClick={() => setShowPreviewModal(true)}
                className="preview-btn"
              >
                👁 See Live Resume
              </button>

              {activeStep < steps.length - 1 ? (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="primary-btn"
                >
                  Next Section
                </button>
              ) : (
                <button
                  onClick={downloadPDF}
                  className="primary-btn"
                  disabled={isDownloading}
                >
                  {isDownloading ? "Downloading..." : "Download Resume PDF"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hidden preview for PDF download */}
        <div className="pdf-hidden-preview">
          <div ref={pdfRef} className="pdf-page">
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>

        {/* Live Preview Modal */}
        {showPreviewModal && (
          <div className="preview-modal-overlay">
            <div className="preview-modal">
              <div className="preview-modal-header">
                <div>
                  <h2>Live Resume Preview</h2>
                  <p>This is how your resume will look.</p>
                </div>

                <div className="preview-modal-actions">
                  <button onClick={downloadPDF} disabled={isDownloading}>
                    {isDownloading ? "Downloading..." : "Download PDF"}
                  </button>

                  <button
                    className="close-preview-btn"
                    onClick={() => setShowPreviewModal(false)}
                    disabled={isDownloading}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="preview-modal-body">
                <ResumePreview resumeData={resumeData} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Builder;