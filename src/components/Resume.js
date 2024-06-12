import { useReactToPrint } from "react-to-print";
import React, { useRef } from "react";
import { FaGithub, FaEnvelope, FaLinkedin, FaMobileAlt, FaGlobe } from "react-icons/fa";

const Resume = ({ result }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${result?.fullName} Resume`,
    onAfterPrint: () => alert("Print Successful!"),
  });

  const replaceWithBr = (string) => {
    return string ? string.replace(/\n/g, "<br />") : "";
  };
  
  // Return an error page if the result object is empty or invalid
  console.log("result data" + result.data);
  console.log("AI data"+result.generatedContent)

  if (!result || !result.generatedContent) {
    return <div>Error: Invalid data received.</div>;
  }

  // Extract data from result object

  console.log(result.data);

  const resumeData = result.data;
  const aiContent = result.generatedContent;

  let workHistory = [];
  let educationHistory = [];
  let projectHistory = [];

  try {
    workHistory =
      typeof resumeData.workHistory === "string"
        ? JSON.parse(resumeData.workHistory)
        : resumeData.workHistory;
    educationHistory =
      typeof resumeData.educationHistory === "string"
        ? JSON.parse(resumeData.educationHistory)
        : resumeData.educationHistory;
    projectHistory =
      typeof resumeData.projectHistory === "string"
        ? JSON.parse(resumeData.projectHistory)
        : resumeData.projectHistory;
  } catch (error) {
    console.error("Failed to parse history:", error);
  }

  // Ensure workHistory, educationHistory, and projectHistory are always arrays
  if (!Array.isArray(workHistory)) {
    workHistory = [];
  }
  if (!Array.isArray(educationHistory)) {
    educationHistory = [];
  }
  if (!Array.isArray(projectHistory)) {
    projectHistory = [];
  }

  return (
    <>
      <button onClick={handlePrint} className="printButton">
        Print Page
      </button>
      <main className="container" ref={componentRef}>
        <header className="header">
          <div className="header-content">
            <h1 className="name">{resumeData.fullName}</h1>
            <p className="resumeTitle headerTitle">
              {resumeData.currentPosition} ({resumeData.currentTechnologies})
            </p>
            <p className="resumeTitle">{resumeData.currentLength} year(s) work experience</p>
            <div className="social-links">
              {resumeData.github && (
                <div>
                  <FaGithub />
                  <span>{resumeData.github}</span>
                </div>
              )}
              {resumeData.gmail && (
                <div>
                  <FaEnvelope />
                  <span>{resumeData.gmail}</span>
                </div>
              )}
              {resumeData.portfolio && (
                <div>
                  <FaGlobe />
                  <span>{resumeData.portfolio}</span>
                </div>
              )}
              {resumeData.linkedin && (
                <div>
                  <FaLinkedin />
                  <span>{resumeData.linkedin}</span>
                </div>
              )}
              {resumeData.mobileNumber && (
                <div>
                  <FaMobileAlt />
                  <span>{resumeData.mobileNumber}</span>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="resumeBody">
          {aiContent.objective && (
            <div className="resume-section">
              <h2 className="resumeBodyTitle">PROFILE SUMMARY</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: replaceWithBr(aiContent.objective),
                }}
                className="resumeBodyContent"
              />
            </div>
          )}
          {workHistory.length > 0 && (
            <div className="resume-section">
              <h2 className="resumeBodyTitle">WORK HISTORY</h2>
              {workHistory.map((work, index) => (
                <div key={index} className="work-entry">
                  <span className="work-title">{work.name}</span> - {work.position}
                  <br />
                  <span className="work-dates">
                    {work.startDate} - {work.endDate}
                  </span>
                  <ul className="work-description">
                    {work.description &&
                      work.description.split("\n").map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {educationHistory.length > 0 && (
            <div className="resume-section">
              <h2 className="resumeBodyTitle">EDUCATION</h2>
              {educationHistory.map((education, index) => (
                <div key={index} className="education-entry">
                  <span className="education-title">{education.institution}</span> - {education.degree} in{" "}
                  {education.field} ({education.year})
                  <br />
                  {education.description && (
                    <ul className="education-description">
                      {education.description.split("\n").map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          {projectHistory.length > 0 && (
            <div className="resume-section">
              <h2 className="resumeBodyTitle">PROJECTS</h2>
              {projectHistory.map((project, index) => (
                <div key={index} className="project-entry">
                  <span className="project-title">{project.title}</span>
                  <br />
                  <span className="project-techStack">Tech Stack: {project.techStack}</span>
                  <br />
                  <span className="project-description">{project.description.replace(/[^\w\s]/gi, "")}</span>
                </div>
              ))}
            </div>
          )}
          {aiContent.jobResponsibilities && (
            <div className="resume-section">
              <h2 className="resumeBodyTitle">JOB RESPONSIBILITIES</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: replaceWithBr(aiContent.jobResponsibilities.replace(/[^\w\s]/gi, "")),
                }}
                className="resumeBodyContent"
              />
            </div>
          )}
          {aiContent.keypoints && (
            <div className="resume-section">
              <h2 className="resumeBodyTitle">KEY SKILLS</h2>
              <ul className="skills-list">
                {aiContent.keypoints.split("\n").map((skill, index) => {
                  if (skill.trim() !== "") {
                    return <li key={index}>{skill.replace(/[^\w\s]/gi, "")}</li>;
                  } else {
                    return null;
                  }
                })}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Resume;
