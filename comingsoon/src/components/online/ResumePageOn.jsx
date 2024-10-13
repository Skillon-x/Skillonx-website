import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaUpload } from 'react-icons/fa';
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // To send the data to the backend
import "../../App.css";

export default function ResumePage() {
  const [file, setFile] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setUploadComplete(true);
      }, 2000);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setUploadComplete(false);
  };

  const isFormValid = () => {
    return file || linkedinUrl.trim() !== '' || instagramUrl.trim() !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setErrorMessage('Please upload a resume or provide at least one social media link!');
    } else {
      setErrorMessage('');
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('linkedinUrl', linkedinUrl);
      formData.append('instagramUrl', instagramUrl);

      try {
        // Send the form data to the backend API
        await axios.post('http://localhost:5000/api/upload-resume', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate('/FinalPage/online');

        // alert('Resume submitted successfully');
      } catch (error) {
        console.error('Error submitting the resume:', error);
        setErrorMessage('Failed to submit resume. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-100 to-gray-300 animate-gradient-x flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg shadow-2xl glassmorphism-enhanced p-6 space-y-6 bg-white shadow-gray-500 bg-opacity-20 backdrop-blur-lg">
        <style jsx>{`
          @keyframes loading {
            0% { width: 0%; }
            20% { width: 20%; }
            40% { width: 40%; }
            60% { width: 60%; }
            80% { width: 80%; }
            100% { width: 100%; }
          }
        `}</style>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Your personal information</h1>
          <p className="text-sm text-gray-800 mt-2">Step 2/2</p>
          <div className="w-full bg-blue-100 rounded-full h-2 mt-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-300 to-blue-600 h-full rounded-full"
              style={{
                width: '100%',
                animation: 'loading 3s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        <p className="text-gray-800 text-center">
          To move forward with our admissions process, we ask that you share either your resume or your social media handles.
        </p>

        {errorMessage && (
          <p className="text-red-300 text-center">{errorMessage}</p>
        )}

        <div className="space-y-4">
          {!uploadComplete && !isUploading && (
            <div className="border-2 border-dashed border-blue-500 shadow-xl hover:scale-95 rounded-lg p-4 text-center cursor-pointer hover:bg-white hover:bg-opacity-10 transition duration-300" onClick={() => document.getElementById('resumeUpload').click()}>
              <FaUpload className="mx-auto text-blue-500 text-3xl mb-2" />
              <p className="text-blue-500 font-semibold">Resume Upload</p>
              <input
                type="file"
                id="resumeUpload"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
            </div>
          )}

          {file && !isUploading && !uploadComplete && (
            <div className="text-sm text-blue-500">
              Selected file: {file.name}
              <button onClick={handleUpload} className="ml-2 bg-blue-600 text-white hover:bg-blue-700 transition duration-300 hover:underline">Upload</button>
            </div>
          )}

          {isUploading && (
            <div className="text-center flex flex-col items-center justify-center">
              <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#FFFFFF"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
              <p className="text-white">Uploading...</p>
            </div>
          )}

          {uploadComplete && (
            <div className="text-center text-green-300">
              <p>✓ {file.name}</p>
              <p className="text-sm">100% done</p>
              <button onClick={handleCancel} className="mt-2 bg-blue-600 text-white hover:bg-blue-700 transition duration-300">Cancel</button>
            </div>
          )}

          <p className="text-center text-blue-500 font-semibold">OR</p>

          <div className="space-y-4">
            <div className="flex items-center border border-white shadow-xl rounded-md overflow-hidden bg-white bg-opacity-10">
              <span className="p-2">
                <FaLinkedin className="text-blue-500 w-6 h-6" />
              </span>
              <input
                type="url"
                placeholder="https://linkedin.com/profile"
                className="flex-grow p-2 outline-none bg-transparent text-gray-600 tracking-wide placeholder-gray-500 placeholder-opacity-70"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
            </div>
            <div className="flex items-center border border-white shadow-xl rounded-md overflow-hidden bg-white bg-opacity-10">
              <span className="p-2">
                <FaInstagram className="text-[#E1306C] w-6 h-6" />
              </span>
              <input
                type="url"
                placeholder="https://instagram.com/username"
                className="flex-grow p-2 outline-none bg-transparent text-gray-600 tracking-wide placeholder-gray-500 placeholder-opacity-70"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Link 
            to="/FinalPage/online"
            className="w-full text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl 
                       text-base sm:text-lg font-semibold
                       transition-all duration-300 ease-in-out
                       hover:shadow-lg hover:-translate-y-0.5
                       active:translate-y-0 active:shadow-md
                       flex items-center justify-center
                       relative overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleSubmit}
          >
            <div className="absolute inset-0 bg-sky-500 transition-transform duration-300 ease-in-out group-hover:translate-x-[-100%]"></div>
            <div className="absolute inset-0 bg-gray-900 transition-transform duration-300 ease-in-out translate-x-[100%] group-hover:translate-x-0"></div>
            <span className="relative z-10 transition-all text-white duration-300 group-hover:tracking-wider">
              {isHovered ? 'Continue' : 'Submit'}
            </span>
            <svg className="w-4 h-4 sm:w-5 text-white sm:h-5 ml-2 relative z-10 transition-all duration-300 group-hover:translate-x-1"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                 xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
      </div>
    </div>
  );
}
