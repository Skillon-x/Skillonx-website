import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Added useLocation to capture URL params
import logoImage from '../../assets/Logo/primaryLogo.png';
import illustrationImage from '../../assets/Images/SurveyPage/SurveyStarterIllustrator.svg';
import '../../App.css'; // Import the custom CSS file

export default function SurveyStartPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation(); // Access location object to get URL parameters

  useEffect(() => {
    setMounted(true);

    // Extract the referral code from the URL
    const queryParams = new URLSearchParams(location.search);
    const referralCode = queryParams.get('ref');
    console.log('Current URL:', location.search);
    console.log('Referral code found:', referralCode);

    // Check if referral has already been applied for this referral code
    const storedReferralCode = localStorage.getItem('referralApplied');

    // Only send referral request if referral code exists and hasn't been applied before
    if (referralCode && storedReferralCode !== referralCode) {
      // Send the referral code to the backend to increase the referral count
      fetch('http://localhost:5000/api/increase-referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referralCode }), // Send referral code to backend
      })
        .then(response => response.json())
        .then(data => {
          console.log('Referral increase response:', data); // Log backend response for debugging

          // Store the referral code in localStorage to prevent duplicate increments
          localStorage.setItem('referralApplied', referralCode);
        })
        .catch(error => console.error('Error:', error));
    } else if (!referralCode) {
      console.log('No referral code provided in URL'); // Debugging purpose
    } else {
      console.log('Referral already applied for this code:', storedReferralCode);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-100 to-gray-300 animate-gradient-x flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-blue-200 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-purple-200 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200 rounded-full filter blur-[120px] opacity-20 animate-blob"></div>
      </div>

      <div className={`w-full max-w-2xl relative transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Logo */}
        <div className="mb-4 sm:mb-8 flex justify-center">
          <img 
            src={logoImage} 
            alt="Company Logo" 
            className="h-14 sm:h-16 md:h-28 transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        {/* Main content container with custom glassmorphism */}
        <div className="glassmorphism-container shadow-gray-500 shadow-lg p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8">
          {/* Illustration */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <img 
              src={illustrationImage} 
              alt="Survey illustration" 
              className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-[400px] h-auto object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Text content */}
          <div className="text-center space-y-2 sm:space-y-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              We're excited to learn more about you!
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Please set aside 5-10 minutes to complete this survey.
            </p>
          </div>
          
          {/* Next button */}
          <Link 
            to="/SurveyForm/online"
            className="w-full text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl 
                       text-base sm:text-lg font-semibold
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
            <span className="relative z-10 transition-all text-white duration-300 group-hover:tracking-wider">
              {isHovered ? 'Continue' : 'Next'}
            </span>
            <svg className="w-4 h-4 sm:w-5 text-white sm:h-5 ml-2 relative z-10 transition-all duration-300 group-hover:translate-x-1"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                 xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
          
          {/* Footer links */}
          
        </div>
      </div>
    </div>
  );
}
