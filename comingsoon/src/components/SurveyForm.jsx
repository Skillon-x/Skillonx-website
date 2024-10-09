import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import logoImage from '../assets/Logo/primaryLogo.png';
import { FaUser, FaEnvelope, FaBook, FaCalendarAlt, FaHome, FaPhone } from 'react-icons/fa';

export default function SurveyForm() {
  const [isHovered, setIsHovered] = useState(false);
  const [dob, setDob] = useState(null);
  const [isStudent, setIsStudent] = useState(null);
  const [isUSCanada, setIsUSCanada] = useState(null);

  const formFields = [
    { name: 'firstName', label: 'First Name', icon: FaUser, placeholder: 'John' },
    { name: 'lastName', label: 'Last Name', icon: FaUser, placeholder: 'Doe' },
    { name: 'email', label: 'Email', icon: FaEnvelope, placeholder: 'you@example.com', type: 'email' },
    { name: 'education', label: 'Current Education', icon: FaBook, placeholder: "e.g., Bachelor's in Computer Science" },
    { name: 'address', label: 'Address', icon: FaHome, placeholder: '123 Main St, City, Country' },
    { name: 'phone', label: 'Phone Number', icon: FaPhone, placeholder: '+1 (555) 123-4567', type: 'tel' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img 
            src={logoImage} 
            alt="Company Logo" 
            className="h-20 md:h-28 transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        {/* Main content container */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-6 border border-white/20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Your Personal Information
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Step 1/8
            </p>
          </div>
          
          <div className="w-full bg-blue-100 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{width: '12.5%'}}></div>
          </div>
          
          <form className="space-y-5">
            {formFields.slice(0, 2).map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <field.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <input
                    type={field.type || 'text'}
                    id={field.name}
                    name={field.name}
                    className="block w-full pl-10 pr-3 py-2 rounded-lg border-0 ring-1 ring-inset ring-gray-300 bg-white/50 focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200 ease-in-out text-gray-800 placeholder-gray-500"
                    placeholder={field.placeholder}
                  />
                </div>
              </div>
            ))}

            {/* Date of Birth field with DatePicker */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="h-5 w-5 text-gray-600" />
                </div>
                <DatePicker
                  id="dob"
                  selected={dob}
                  onChange={(date) => setDob(date)}
                  dateFormat="MMMM d, yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  placeholderText="Select your date of birth"
                  className="block w-full pl-10 pr-3 py-2 rounded-lg border-0 ring-1 ring-inset ring-gray-300 bg-white/50 focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200 ease-in-out text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>

            {formFields.slice(2).map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <field.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <input
                    type={field.type || 'text'}
                    id={field.name}
                    name={field.name}
                    className="block w-full pl-10 pr-3 py-2 rounded-lg border-0 ring-1 ring-inset ring-gray-300 bg-white/50 focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200 ease-in-out text-gray-800 placeholder-gray-500"
                    placeholder={field.placeholder}
                  />
                </div>
              </div>
            ))}

            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">Are you a student?</p>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsStudent(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                    isStudent === true ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-colors duration-200`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setIsStudent(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                    isStudent === false ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-colors duration-200`}
                >
                  No
                </button>
              </div>
            </div>

                        
            <Link 
              to="/ResumePage"
              className="w-full text-white py-3 px-6 rounded-xl 
                         text-lg font-semibold
                         transition-all duration-300 ease-in-out
                         hover:shadow-lg hover:-translate-y-0.5
                         active:translate-y-0 active:shadow-md
                         flex items-center justify-center
                         relative overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-sky-500 transition-transform duration-300 ease-in-out group-hover:translate-x-[-100%]"></div>
              <div className="absolute inset-0 bg-gray-900 transition-transform duration-300 ease-in-out translate-x-[100%] group-hover:translate-x-0"></div>
              <span className="relative z-10 transition-all duration-300 group-hover:tracking-wider">
                {isHovered ? 'Continue' : 'Next'}
              </span>
              <svg className="w-5 h-5 ml-2 relative z-10 transition-all duration-300 group-hover:translate-x-1"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}