import React, { useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
// import "./HomePage.css";

const HomePage = ({ setResult }) => {
  const [fullName, setFullName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState("");
  const [github, setGithub] = useState("");
  const [gmail, setGmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState([
    { name: "", position: "", startDate: "", endDate: "" },
  ]);
  const [educationInfo, setEducationInfo] = useState([
    { institution: "", degree: "", field: "", year: "" },
  ]);
  const [projectInfo, setProjectInfo] = useState([
    { title: "", techStack: "", description: "" },
  ]);

  const navigate = useNavigate();

  const handleAddCompany = () =>
    setCompanyInfo([
      ...companyInfo,
      { name: "", position: "", startDate: "", endDate: "" },
    ]);

  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };

  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };

  const handleAddEducation = () =>
    setEducationInfo([
      ...educationInfo,
      { institution: "", degree: "", field: "", year: "" },
    ]);

  const handleRemoveEducation = (index) => {
    const list = [...educationInfo];
    list.splice(index, 1);
    setEducationInfo(list);
  };

  const handleUpdateEducation = (e, index) => {
    const { name, value } = e.target;
    const list = [...educationInfo];
    list[index][name] = value;
    setEducationInfo(list);
  };

  const handleAddProject = () =>
    setProjectInfo([
      ...projectInfo,
      { title: "", techStack: "", description: "" },
    ]);

  const handleRemoveProject = (index) => {
    const list = [...projectInfo];
    list.splice(index, 1);
    setProjectInfo(list);
  };

  const handleUpdateProject = (e, index) => {
    const { name, value } = e.target;
    const list = [...projectInfo];
    list[index][name] = value;
    setProjectInfo(list);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      fullName,
      currentPosition,
      currentLength,
      currentTechnologies,
      github,
      gmail,
      portfolio,
      linkedin,
      mobileNumber,
      workHistory: JSON.stringify(companyInfo),
      educationHistory: JSON.stringify(educationInfo),
      projectHistory: JSON.stringify(projectInfo),
    };

    console.log("Form Data: ", formData);

    try {
      const response = await fetch(
        "https://ai-resume-builder-backend.onrender.com/resume/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response as JSON
      console.log("API Response: ", data);
      if (data.message) {
        console.log("Data Received: ", data);
        setResult(data);
        navigate("/resume");
      } else {
        console.error("Invalid data structure received from API");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="homepage-app">
      <h1 className="homepage-heading">Resume Builder</h1>
      <p className="homepage-description">Generate a resume with AI in a few seconds</p>
      <form onSubmit={handleFormSubmit} className="form" method="POST">
        <label htmlFor="fullName" className="homepage-label">Enter your full name</label>
        <input
          type="text"
          required
          name="fullName"
          id="fullName"
          className="homepage-input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <div className="homepage-nestedContainer">
          <div>
            <label htmlFor="currentPosition" className="homepage-label">Current Position</label>
            <input
              type="text"
              name="currentPosition"
              className="homepage-input homepage-currentInput"
              value={currentPosition}
              onChange={(e) => setCurrentPosition(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="currentLength" className="homepage-label">For how long? (year)</label>
            <input
              type="number"
              name="currentLength"
              className="homepage-input homepage-currentInput"
              value={currentLength}
              onChange={(e) => setCurrentLength(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="currentTechnologies" className="homepage-label">Technologies used</label>
            <input
              type="text"
              name="currentTechnologies"
              className="homepage-input homepage-currentInput"
              value={currentTechnologies}
              onChange={(e) => setCurrentTechnologies(e.target.value)}
            />
          </div>
        </div>
        <h3 className="homepage-heading">Social Links</h3>
        <label htmlFor="github" className="homepage-label">GitHub Profile</label>
        <input
          type="text"
          name="github"
          className="homepage-input"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
        <label htmlFor="gmail" className="homepage-label">Gmail</label>
        <input
          type="email"
          name="gmail"
          className="homepage-input"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
        <label htmlFor="portfolio" className="homepage-label">Portfolio</label>
        <input
          type="text"
          name="portfolio"
          className="homepage-input"
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
        />
        <label htmlFor="linkedin" className="homepage-label">LinkedIn Profile</label>
        <input
          type="text"
          name="linkedin"
          className="homepage-input"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <label htmlFor="mobileNumber" className="homepage-label">Mobile Number</label>
        <input
          type="tel"
          name="mobileNumber"
          className="homepage-input"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <h3 className="homepage-heading">Companies you've worked at</h3>
        {companyInfo.map((company, index) => (
          <div className="homepage-nestedContainer" key={index}>
            <div className="homepage-companies">
              <label htmlFor="name" className="homepage-label">Company Name</label>
              <input
                type="text"
                name="name"
                className="homepage-input"
                value={company.name}
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className="homepage-companies">
              <label htmlFor="position" className="homepage-label">Position Held</label>
              <input
                type="text"
                name="position"
                className="homepage-input"
                value={company.position}
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className="homepage-companies">
              <label htmlFor="startDate" className="homepage-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="homepage-input"
                value={company.startDate}
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className="homepage-companies">
              <label htmlFor="endDate" className="homepage-label">End Date</label>
              <input
                type="date"
                name="endDate"
                className="homepage-input"
                value={company.endDate}
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className="homepage-btn__group">
              {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                <button type="button" id="addBtn" className="homepage-btn" onClick={handleAddCompany}>
                  Add
                </button>
              )}
              {companyInfo.length > 1 && (
                <button
                  type="button"
                  id="deleteBtn"
                  className="homepage-btn"
                  onClick={() => handleRemoveCompany(index)}
                >
                  Del
                </button>
              )}
            </div>
          </div>
        ))}

        <h3 className="homepage-heading">Education Details</h3>
        {educationInfo.map((education, index) => (
          <div className="homepage-nestedContainer" key={index}>
            <div className="homepage-education">
              <label htmlFor="institution" className="homepage-label">Institution Name</label>
              <input
                type="text"
                name="institution"
                className="homepage-input"
                value={education.institution}
                onChange={(e) => handleUpdateEducation(e, index)}
              />
            </div>
            <div className="homepage-education">
              <label htmlFor="degree" className="homepage-label">Degree</label>
              <input
                type="text"
                name="degree"
                className="homepage-input"
                value={education.degree}
                onChange={(e) => handleUpdateEducation(e, index)}
              />
            </div>
            <div className="homepage-education">
              <label htmlFor="field" className="homepage-label">Field of Study</label>
              <input
                type="text"
                name="field"
                className="homepage-input"
                value={education.field}
                onChange={(e) => handleUpdateEducation(e, index)}
              />
            </div>
            <div className="homepage-education">
              <label htmlFor="year" className="homepage-label">Year of Graduation</label>
              <input
                id="yearofgraduation"
                type="text"
                name="year"
                className="homepage-input"
                value={education.year}
                onChange={(e) => handleUpdateEducation(e, index)}
              />
            </div>
            <div className="homepage-btn__group">
              {educationInfo.length - 1 === index &&
                educationInfo.length < 4 && (
                  <button
                    type="button"
                    id="addBtn"
                    className="homepage-btn"
                    onClick={handleAddEducation}
                  >
                    Add
                  </button>
                )}
              {educationInfo.length > 1 && (
                <button
                  type="button"
                  id="deleteBtn"
                  className="homepage-btn"
                  onClick={() => handleRemoveEducation(index)}
                >
                  Del
                </button>
              )}
            </div>
          </div>
        ))}

        <h3 className="homepage-heading">Projects</h3>
        {projectInfo.map((project, index) => (
          <div className="homepage-nestedContainer" key={index}>
            <div className="homepage-projects">
              <label htmlFor="title" className="homepage-label">Project Title</label>
              <input
                type="text"
                name="title"
                className="homepage-input"
                value={project.title}
                onChange={(e) => handleUpdateProject(e, index)}
              />
            </div>
            <div className="homepage-projects">
              <label htmlFor="techStack" className="homepage-label">Tech Stack</label>
              <input
                type="text"
                name="techStack"
                className="homepage-input"
                value={project.techStack}
                onChange={(e) => handleUpdateProject(e, index)}
              />
            </div>
            <div className="homepage-projects">
              <label htmlFor="description" className="homepage-label">Description</label>
              <textarea
                name="description"
                className="homepage-input"
                value={project.description}
                onChange={(e) => handleUpdateProject(e, index)}
              />
            </div>
            <div className="homepage-btn__group">
              {projectInfo.length - 1 === index && projectInfo.length < 4 && (
                <button type="button" id="addBtn" className="homepage-btn" onClick={handleAddProject}>
                  Add
                </button>
              )}
              {projectInfo.length > 1 && (
                <button
                  type="button"
                  id="deleteBtn"
                  className="homepage-btn"
                  onClick={() => handleRemoveProject(index)}
                >
                  Del
                </button>
              )}
            </div>
          </div>
        ))}

        <button type="submit" className="homepage-btn homepage-submitBtn">CREATE RESUME</button>
      </form>
    </div>
  );
};

export default HomePage;
