import React, { useState, useEffect } from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Import images - replace these paths with your actual asset paths
import logoImage from '../assets/Logo/primaryLogo.png';
import illustrationImage from '../assets/Images/ComingSoonPage/underConstruction.svg';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState({ days: 4, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown.seconds > 0) {
          return { ...prevCountdown, seconds: prevCountdown.seconds - 1 };
        } else if (prevCountdown.minutes > 0) {
          return { ...prevCountdown, minutes: prevCountdown.minutes - 1, seconds: 59 };
        } else if (prevCountdown.hours > 0) {
          return { ...prevCountdown, hours: prevCountdown.hours - 1, minutes: 59, seconds: 59 };
        } else if (prevCountdown.days > 0) {
          return { days: prevCountdown.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prevCountdown;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter an email address');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setIsSubmitted(true);
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
        setErrorMessage(errorData.message || 'Failed to submit email');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setErrorMessage('Internal server error');
    }

    // Reset email field after submission
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const socialLinks = [
    { Icon: FaGithub, href: 'https://github.com/Skillonx-dev', label: 'GitHub' },
    { Icon: FaLinkedin, href: 'https://www.linkedin.com/company/skillonx/', label: 'LinkedIn' },
    { Icon: FaInstagram, href: 'https://www.instagram.com/skillonx/', label: 'Instagram' },
  ];

  return (
    <div className="min-h-screen  bg-white flex flex-col">
      <div className="flex-grow flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-24 xl:p-40">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          {/* Centered logo on mobile, left-aligned on larger screens */}
          <div className="flex justify-center md:justify-start mb-8">
            <img src={logoImage} alt="SkillOnX Logo" className="h-24 md:h-28 lg:h-32 xl:h-36 w-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 text-center md:text-left">
            We're Building Something
            <span className="text-primary"> Amazing</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 text-center md:text-left">
            Our team of developers is working hard to bring you something extraordinary.
            Subscribe to be the first to know when we launch.
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-between mb-8">
            {Object.entries(countdown).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">{value}</div>
                <div className="text-sm md:text-base text-gray-600 capitalize">{unit}</div>
              </div>
            ))}
          </div>

          {/* Subscription form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ring-gray-300 bg-white/50 focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200 ease-in-out text-gray-800 placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-lg border border-transparent hover:tracking-wider hover:border-primary hover:bg-black transition-colors duration-600 transform hover:scale-105 whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>

          {/* Success message */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 mb-2"
            >
              Thanks for subscribing! We'll keep you updated.
            </motion.div>
          )}

          {/* Error message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 mb-2"
            >
              {errorMessage}
            </motion.div>
          )}

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

        {/* Right side illustration - hidden on mobile */}
        <div className="w-full md:w-1/2 flex justify-end items-end hidden md:flex">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={illustrationImage}
              alt="SkillOnX Illustration"
              className="w-full md:w-11/12 lg:w-10/12 max-w-xl h-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 py-4 text-center text-gray-600">
        <p>&copy; 2024 SkillOnX. All rights reserved.</p>
      </div>
    </div>
  );
}
