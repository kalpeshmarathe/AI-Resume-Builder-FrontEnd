import React, { useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "", startDate: "", endDate: "" }]);
  const [educationInfo, setEducationInfo] = useState([{ institution: "", degree: "", field: "", year: "" }]);
  const [projectInfo, setProjectInfo] = useState([{ title: "", techStack: "", description: "" }]);

  const navigate = useNavigate();

  const handleAddCompany = () =>
    setCompanyInfo([...companyInfo, { name: "", position: "", startDate: "", endDate: "" }]);

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
    setEducationInfo([...educationInfo, { institution: "", degree: "", field: "", year: "" }]);

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
    setProjectInfo([...projectInfo, { title: "", techStack: "", description: "" }]);

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

    console.log(formData);


    try {
      const response = await fetch("https://ai-resume-builder-backend.onrender.com/resume/create", {
        method: "POST",
        body: formData, // Assuming formData is a FormData object
        mode : "no-cors",   
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json(); // Parse the response as JSON
  
      if (data.message) {
        console.log(response);
        console.log(data);
        setResult(data);
        navigate("/resume");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='app'>
      <h1>Resume Builder</h1>
      <p>Generate a resume with AI in a few seconds</p>
      <form onSubmit={handleFormSubmit} method='POST' encType='multipart/form-data'>
        <label htmlFor='fullName'>Enter your full name</label>
        <input
          type='text'
          required
          name='fullName'
          id='fullName'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <div className='nestedContainer'>
          <div>
            <label htmlFor='currentPosition'>Current Position</label>
            <input
              type='text'
              required
              name='currentPosition'
              className='currentInput'
              value={currentPosition}
              onChange={(e) => setCurrentPosition(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='currentLength'>For how long? (year)</label>
            <input
              type='number'
              required
              name='currentLength'
              className='currentInput'
              value={currentLength}
              onChange={(e) => setCurrentLength(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='currentTechnologies'>Technologies used</label>
            <input
              type='text'
              required
              name='currentTechnologies'
              className='currentInput'
              value={currentTechnologies}
              onChange={(e) => setCurrentTechnologies(e.target.value)}
            />
          </div>
        </div>
        <h3>Social Links</h3>
        <label htmlFor='github'>GitHub Profile</label>
        <input
          type='text'
          name='github'
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
        <label htmlFor='gmail'>Gmail</label>
        <input
          type='email'
          name='gmail'
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
        <label htmlFor='portfolio'>Portfolio</label>
        <input
          type='text'
          name='portfolio'
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
        />
        <label htmlFor='linkedin'>LinkedIn Profile</label>
        <input
          type='text'
          name='linkedin'
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <label htmlFor='mobileNumber'>Mobile Number</label>
        <input
          type='tel'
          name='mobileNumber'
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <h3>Companies you've worked at</h3>
        {companyInfo.map((company, index) => (
          <div className='nestedContainer' key={index}>
            <div className='companies'>
              <label htmlFor='name'>Company Name</label>
              <input
                type='text'
                name='name'
                required
                value={company.name}
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className='companies'>
              <label htmlFor='position'>Position Held</label>
              <input
                type='text'
                name='position'
                required
                value={company.position}
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className='companies'>
              <label htmlFor='startDate'>Start Date</label>
              <input
                type='date'
                name='startDate'
                required
                value={company.startDate}
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className='companies'>
              <label htmlFor='endDate'>End Date</label>
              <input
                type='date'
                name='endDate'
                required
                value={company.endDate}
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className='btn__group'>
              {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                <button type='button' id='addBtn' onClick={handleAddCompany}>
                  Add
                </button>
              )}
              {companyInfo.length > 1 && (
                <button type='button' id='deleteBtn' onClick={() => handleRemoveCompany(index)}>
                  Del
                </button>
              )}
            </div>
          </div>
        ))}

        <h3>Education Details</h3>
        {educationInfo.map((education, index) => (
          <div className='nestedContainer' key={index}>
            <div className='education'>
              <label htmlFor='institution'>Institution Name</label>
              <input
                type='text'
                name='institution'
                required
                value={education.institution}
                onChange={(e) => handleUpdateEducation(e, index)}
              />
            </div>
            <div className='education'>
              <label htmlFor='degree'>Degree</label>
              <input
                type='text'
                name='degree'
                required
                value={education.degree}
                onChange={(e) => handleUpdateEducation(e, index)}
              />
            </div>
            <div className='education'>
              <label htmlFor='field'>Field of Study</label>
              <input
                type='text'
                name='field'
                required
                value={education.field}
                onChange={(e) => handleUpdateEducation(e, index)}
              />
            </div>
            <div className='education'>
              <label htmlFor='year'>Year of Graduation</label>
              <input
                type='text'
                name='year'
                required
                value={education.year}
                onChange={(e) => handleUpdateEducation(e, index)}
              />
            </div>
            <div className='btn__group'>
              {educationInfo.length - 1 === index && educationInfo.length < 4 && (
                <button type='button' id='addBtn' onClick={handleAddEducation}>
                  Add
                </button>
              )}
              {educationInfo.length > 1 && (
                <button type='button' id='deleteBtn' onClick={() => handleRemoveEducation(index)}>
                  Del
                </button>
              )}
            </div>
          </div>
        ))}

        <h3>Projects</h3>
        {projectInfo.map((project, index) => (
          <div className='nestedContainer' key={index}>
            <div className='projects'>
              <label htmlFor='title'>Project Title</label>
              <input
                type='text'
                name='title'
                required
                value={project.title}
                onChange={(e) => handleUpdateProject(e, index)}
              />
            </div>
            <div className='projects'>
              <label htmlFor='techStack'>Tech Stack</label>
              <input
                type='text'
                name='techStack'
                required
                value={project.techStack}
                onChange={(e) => handleUpdateProject(e, index)}
              />
            </div>
            <div className='projects'>
              <label htmlFor='description'>Description</label>
              <textarea
                name='description'
                required
                value={project.description}
                onChange={(e) => handleUpdateProject(e, index)}
              />
            </div>
            <div className='btn__group'>
              {projectInfo.length - 1 === index && projectInfo.length < 4 && (
                <button type='button' id='addBtn' onClick={handleAddProject}>
                  Add
                </button>
              )}
              {projectInfo.length > 1 && (
                <button type='button' id='deleteBtn' onClick={() => handleRemoveProject(index)}>
                  Del
                </button>
              )}
            </div>
          </div>
        ))}

        <button type='submit'>CREATE RESUME</button>
      </form>
    </div>
  );
};

export default HomePage;
