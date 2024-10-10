import React, { useState, useEffect } from 'react';
import logoImage from '../../assets/Logo/primaryLogo.png';
import Confetti from 'react-confetti';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function SurveyStartPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const socialLinks = [
    { Icon: FaGithub, href: 'https://github.com/Skillonx-dev', label: 'GitHub' },
    { Icon: FaLinkedin, href: 'https://www.linkedin.com/company/skillonx/', label: 'LinkedIn' },
    { Icon: FaInstagram, href: 'https://www.instagram.com/skillonx/', label: 'Instagram' },
  ];

  useEffect(() => {
    setMounted(true);
    
    // Show confetti for 3 seconds after the component mounts
    setTimeout(() => {
      setIsConfettiVisible(true);
      setTimeout(() => {
        setIsConfettiVisible(false);
      }, 4000); // Hide confetti after 3 seconds
    }, 500); // Delay confetti by 0.5 seconds for effect
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Confetti effect */}
      {isConfettiVisible && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      {/* Animated background elements */}
      <div className="absolute moving-gradient top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
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
        
        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8">
            <h2 className='text-xl p-3 m-5 font-bold text-gray-800'>Thank you for submitting your application. We will review your application and get back to you. For more information, you can go with these links:</h2>
             {/* Social links - centered on mobile, left-aligned on larger screens */}
          <div className="flex justify-center md:justify-start gap-6">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank" // This opens the link in a new tab
                rel="noopener noreferrer" // This ensures security
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                aria-label={label}
              >
                <Icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
