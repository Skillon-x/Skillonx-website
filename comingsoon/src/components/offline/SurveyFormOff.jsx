import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import logoImage from '../../assets/Logo/primaryLogo.png';
import { FaUser, FaEnvelope, FaBook, FaCalendarAlt, FaHome, FaPhone } from 'react-icons/fa';
import '../../App.css';

export default function SurveyFormOff() {
  const [isHovered, setIsHovered] = useState(false);
  const [isStudent, setIsStudent] = useState(null);
  const [isLocation, setIsLocation] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const navigate = useNavigate();
  const location = useLocation();

  const formFields = [
    { name: 'fullName', label: 'Full Name', icon: FaUser, placeholder: 'John Doe' },
    { name: 'email', label: 'Email', icon: FaEnvelope, placeholder: 'you@example.com', type: 'email' },
    { name: 'phone', label: 'Phone Number', icon: FaPhone, placeholder: '1234567890', type: 'tel' }
  ];

  const validateForm = () => {
    const errors = {};
    
    // Validate required fields
    ['fullName', 'email', 'phone'].forEach(field => {
      if (!formData[field]) {
        errors[field] = `${formFields.find(f => f.name === field).label} is required`;
      }
    });
    
    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    // Validate phone number
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be exactly 10 digits';
    }

    if (isStudent === null) {
      errors.isStudent = 'Please select if you are a student';
    }
    if (isLocation === null) {
      errors.isLocation = 'Please select if you are from Mysore';
    }

    setFormErrors(errors);
    
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userData = { ...formData, isStudent, isLocation };
    if (validateForm()) {
      try {
        const response = await fetch("https://skillonx-website.onrender.com/api/offline", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          navigate('/ResumePage/offline', { state: { email: formData.email } });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('Validation failed');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Only allow digits and limit to 10 characters
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: sanitizedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-100 to-gray-300 animate-gradient-x flex flex-col items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <img 
            src={logoImage} 
            alt="Company Logo" 
            className="h-20 md:h-28 transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <div className="w-full max-w-md rounded-lg shadow-2xl glassmorphism-enhanced p-6 space-y-6 bg-white shadow-gray-500 bg-opacity-20 backdrop-blur-lg">
          <style jsx>{`
            @keyframes loading {
              0% { width: 0%; }
              10% { width: 10%; }
              20% { width: 20%; }
              30% { width: 30%; }
              40% { width: 40%; }
              50% { width: 50%; }
            }
          `}</style>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Your Personal Information
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Step 1/2
            </p>
          </div>
          
          <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-300 to-blue-600 h-full rounded-full"
              style={{
                width: '50%',
                animation: 'loading 4s ease-in-out infinite',
              }}
            />
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {formFields.map((field) => (
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
                    autoComplete='off'
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg border-0 ring-1 ring-inset ${formErrors[field.name] ? 'ring-red-500' : 'ring-gray-300'} bg-white/50 focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200 ease-in-out text-gray-800 placeholder-gray-500`}
                    placeholder={field.placeholder}
                  />
                </div>
                {formErrors[field.name] && <p className="text-red-500 text-sm">{formErrors[field.name]}</p>}
              </div>
            ))}

            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">Are you a student?</p>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsStudent(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${isStudent === true ? 'bg-blue-500 text-white' : 'bg-white  text-gray-700 hover:scale-95'} transition-colors duration-200`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setIsStudent(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${isStudent === false ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:scale-95'} transition-colors duration-200`}
                >
                  No
                </button>
              </div>
              {formErrors.isStudent && <p className="text-red-500 text-sm">{formErrors.isStudent}</p>}
            </div>
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">Are you from Mysore?</p>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsLocation(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${isLocation === true ? 'bg-blue-500 text-white' : 'bg-white  text-gray-700 hover:scale-95'} transition-colors duration-200`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setIsLocation(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${isLocation === false ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:scale-95'} transition-colors duration-200`}
                >
                  No
                </button>
              </div>
              {formErrors.isLocation && <p className="text-red-500 text-sm">{formErrors.isLocation}</p>}
            </div>

            <button 
              type="submit"
              className="w-full text-white py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md flex items-center justify-center relative overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-blue-500 transition-transform duration-300 ease-in-out group-hover:translate-x-[-100%]"></div>
              <div className="absolute inset-0 bg-gray-900 transition-transform duration-300 ease-in-out translate-x-[100%] group-hover:translate-x-0"></div>
              <span className="relative text-white z-10 transition-all duration-300 group-hover:tracking-wider">
                {isHovered ? 'Continue' : 'Next'}
              </span>
              <svg className="w-5 h-5 ml-2 text-white relative z-10 transition-all duration-300 group-hover:translate-x-1"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}