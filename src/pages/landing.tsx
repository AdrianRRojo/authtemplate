import React, { useState } from 'react';


export default function Landing() {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [formStep, setFormStep] = useState<number>(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Handle job description input change
  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  // Handle job description form submission
  const handleJobDescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      setFormStep(2); // Transition to the resume upload step
    } else {
      alert('Please enter a job description.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="form p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">SMRT Apply</h1>

        {/* Job description input */}
        <div className={`form-section ${formStep === 1 ? 'fade-in' : 'fade-out'}`}>
          <form onSubmit={handleJobDescriptionSubmit}>
            <label htmlFor="jobDescription" className="block text-sm text-gray-600 mb-2">Enter the job description:</label>

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

            
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300">
              Next
            </button>
          </form>
        </div>

        {/* Resume upload input */}
        <div className={`form-section ${formStep === 2 ? 'fade-in' : 'fade-out'}`}>
          <form>
            <label htmlFor="resume" className="block text-sm text-gray-600 mb-2">Upload your resume:</label>
            <input
              type="file"
              id="resume"
              onChange={handleFileChange}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
              accept=".pdf,.doc,.docx"
              required
            />
            {resumeFile && <p className="mt-2 text-gray-700">Uploaded: {resumeFile.name}</p>}
            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-300">
              Submit
            </button>
          </form>
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
};

