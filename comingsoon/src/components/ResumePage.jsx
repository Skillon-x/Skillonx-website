import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaUpload } from 'react-icons/fa';

export default function ResumePage() {
  const [file, setFile] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Your personal information</h1>
          <p className="text-sm text-blue-600 mt-2">Step 1/8</p>
          <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{width: '12.5%'}}></div>
          </div>
        </div>

        <p className="text-gray-600 text-center">
          To move forward with our admissions process, we ask that you share either your resume or your social media handles.
        </p>

        <div className="space-y-4">
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

          {file && !isUploading && !uploadComplete && (
            <div className="text-sm text-gray-600">
              Selected file: {file.name}
              <button onClick={handleUpload} className="ml-2 text-blue-500 hover:underline">Upload</button>
            </div>
          )}

          {isUploading && (
            <div className="text-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 mx-auto"></div>
              <p className="text-gray-600">Uploading...</p>
            </div>
          )}

          {uploadComplete && (
            <div className="text-center text-green-500">
              <p>✓ {file.name}</p>
              <p className="text-sm">100% done</p>
            </div>
          )}

          <p className="text-center font-semibold">OR</p>

          <div className="space-y-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <span className=" p-2">
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
              <span className=" p-2">
                <FaInstagram className="text-pink-600" />
              </span>
              <input
                type="url"
                placeholder="https://instagram.com/username"
                className="flex-grow p-2 outline-none  bg-white text-gray-900"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
}