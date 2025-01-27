import React, { useState } from "react";
import { SubmitController } from "../controllers/submitController";
import { useNavigate } from "react-router-dom";
// import { Buffer } from "buffer";
export interface FormData {
  company: string;
  jobTitle: string;
  jobDescription: string;
  resume: Blob | null;
}

interface rcMessages {
  id: string;
  message: String;
}

export default function Landing() {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [formStep, setFormStep] = useState<number>(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    company: "",
    jobTitle: "",
    jobDescription: "",
    resume: null,
  });

  const [rcMsg, setRcMsg] = useState<rcMessages[]>([{ id: "", message: "" }]);

  const handleJobDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setJobDescription(e.target.value);
  };

  // Handle job description form submission
  const handleJobDescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      setFormStep(2); // Transition to the resume upload step
    } else {
      alert("Please enter a job description.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const rcResponse: any | undefined = await SubmitController(formData);

      if (rcResponse) {
        rcResponse.map((msg: string, idx: string) => {
          setRcMsg((prevData) => [...prevData, { id: idx, message: msg }]);
        });
      } else {
        rcResponse.map((msg: string, idx: string) => {
          setRcMsg((prevData) => [...prevData, { id: idx, message: msg }]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const clearState = () => {
    setRcMsg([]);
  };

  const redirect = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="form p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          SMRTApply
        </h1>

        {/* Job description input */}
        <div
          className={`form-section ${formStep === 1 ? "fade-in" : "fade-out"}`}
        >
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="jobDescription"
              className="block text-sm text-gray-600 mb-2"
            >
              Enter the Company's name:
            </label>

            <input
              id="company"
              name="company"
              type="text"
              onChange={handleInputChange}
              placeholder="Company name"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
              required
            />

            <label
              htmlFor="jobDescription"
              className="block text-sm text-gray-600 mb-2"
            >
              Enter the job title:
            </label>

            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              onChange={handleInputChange}
              placeholder="Job title"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
              required
            />

            <label
              htmlFor="jobDescription"
              className="block text-sm text-gray-600 mb-2"
            >
              Enter the job description:
            </label>

            <textarea
              id="jobDescription"
              name="jobDescription"
              onChange={handleJobDescriptionChange}
              rows={10}
              cols={50}
              value={jobDescription}
              placeholder="Job description"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Next
            </button>
          </form>
        </div>

        {/* Resume upload input */}
        <div
          className={`form-section ${formStep === 2 ? "fade-in" : "fade-out"}`}
        >
          <form>
            <label
              htmlFor="resume"
              className="block text-sm text-gray-600 mb-2"
            >
              Upload your resume:
            </label>
            <input
              type="file"
              id="resume"
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
              accept=".pdf,.doc,.docx"
              required
            />
            {resumeFile && (
              <p className="mt-2 text-gray-700">Uploaded: {resumeFile.name}</p>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
        <div
          id="credits"
          className="flex justify-center align-middle mt-2 text-m text-blue-500"
        >
          <p>Credits: {200}</p>
        </div>
      </div>

      <style>{`
        .form {
            width: 30vw;
        }
        .form-section {
          transition: opacity 0.5s ease-in-out;
          opacity: 0;
          pointer-events: none;
        }
        .fade-in {
          opacity: 1;
          pointer-events: auto;
        }
        .fade-out {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
