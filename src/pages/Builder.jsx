import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";

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

  const previewRef = useRef(null);

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

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;

    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, ""],
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = resumeData.skills.filter((_, i) => i !== index);

    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  const downloadPDF = () => {
    const element = previewRef.current;

    const options = {
      margin: 0.3,
      filename: `${resumeData.personalInfo.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(options).from(element).save();
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
        return (
          <Skills
            skills={resumeData.skills}
            handleSkillChange={handleSkillChange}
            addSkill={addSkill}
            removeSkill={removeSkill}
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

          <button onClick={downloadPDF} className="download-small">
            Download PDF
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
                <button onClick={downloadPDF} className="primary-btn">
                  Download Resume PDF
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hidden preview for PDF download */}
        <div className="hidden-preview">
          <ResumePreview resumeData={resumeData} previewRef={previewRef} />
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
                  <button onClick={downloadPDF}>Download PDF</button>
                  <button
                    className="close-preview-btn"
                    onClick={() => setShowPreviewModal(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="preview-modal-body">
                <ResumePreview resumeData={resumeData} previewRef={previewRef} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Builder;