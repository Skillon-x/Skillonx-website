import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaUpload } from 'react-icons/fa';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function ResumePage() {
  const [file, setFile] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      setIsUploading(true);
      // Simulating upload process
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

  // Validation function to check if a file or at least one social media link is provided
  const isFormValid = () => {
    return file || linkedinUrl.trim() !== '' || instagramUrl.trim() !== '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Your personal information</h1>
          <p className="text-sm text-blue-600 mt-2">Step 2/2</p>
          <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <p className="text-gray-600 text-center">
          To move forward with our admissions process, we ask that you share either your resume or your social media handles.
        </p>

        <div className="space-y-4">
          {!uploadComplete && !isUploading && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition duration-300" onClick={() => document.getElementById('resumeUpload').click()}>
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
            <div className="text-sm text-gray-600">
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
                color="#1D4ED8"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
              <p className="text-gray-600">Uploading...</p>
            </div>
          )}

          {uploadComplete && (
            <div className="text-center text-green-500">
              <p>✓ {file.name}</p>
              <p className="text-sm">100% done</p>
              <button onClick={handleCancel} className="mt-2 bg-blue-600 text-white hover:bg-blue-700 transition duration-300">Cancel</button>
            </div>
          )}

          <p className="text-center text-black font-semibold">OR</p>

          <div className="space-y-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <span className="p-2">
                <FaLinkedin className="text-blue-700" />
              </span>
              <input
                type="url"
                placeholder="https://linkedin.com/profile"
                className="flex-grow p-2 outline-none bg-white text-gray-900"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
            </div>
            <div className="flex items-center border rounded-md overflow-hidden">
              <span className="p-2">
                <FaInstagram className="text-pink-600" />
              </span>
              <input
                type="url"
                placeholder="https://instagram.com/username"
                className="flex-grow p-2 outline-none bg-white text-gray-900"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Link 
            to="/FinalPage"
            className="w-full text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl 
                       text-base sm:text-lg font-semibold
                       transition-all duration-300 ease-in-out
                       hover:shadow-lg hover:-translate-y-0.5
                       active:translate-y-0 active:shadow-md
                       flex items-center justify-center
                       relative overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              if (!isFormValid()) {
                e.preventDefault(); // Prevent navigation
                alert('Please upload a resume or provide at least one social media link!'); // Alert message
              }
            }}
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
