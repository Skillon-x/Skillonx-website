import React, { useState, useEffect } from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram,FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
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

    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const socialLinks = [
    { Icon: FaGithub, href: 'https://github.com/Skillonx-dev', label: 'GitHub' },
    { Icon: FaLinkedin, href: 'https://www.linkedin.com/company/skillonx/', label: 'LinkedIn' },
    { Icon: FaInstagram, href: 'https://www.instagram.com/skillonx/', label: 'Instagram' },
    { Icon: FaFacebook, href: 'https://www.facebook.com/people/Skillonx-Classes/pfbid02fkYeqaq4GhbRnjhrWxU1vX1g6aZQ7Tuhm1HgQiAuCR7tMsedwKXeM1ucLTX89mHBl/?mibextid=ZbWKwL', label: 'Facebook' },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-white">
      <div className="flex-grow flex flex-col md:flex-row items-center justify-between p-4 md:p-12 lg:p-20 xl:p-32">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          {/* Centered logo on mobile, left-aligned on larger screens */}
          <div className="flex justify-center md:justify-start mb-4">
            <img src={logoImage} alt="SkillOnX Logo" className="h-20 md:h-24 lg:h-28 w-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center md:text-left">
            We're Building Something
            <span className="text-primary"> Amazing</span>
          </h1>
          <p className="text-md md:text-lg text-gray-600 mb-6 text-center md:text-left">
            Our team of developers is working hard to bring you something extraordinary.
            Subscribe to be the first to know when we launch.
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-around mb-6">
            {Object.entries(countdown).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">{value}</div>
                <div className="text-sm text-gray-600 capitalize">{unit}</div>
              </div>
            ))}
          </div>

          {/* Subscription form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
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
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-black transition-colors duration-300"
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

          {/* Social links */}
          <div className="flex justify-center md:justify-start gap-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                aria-label={label}
              >
                <Icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
              </a>
            ))}
          </div>
        </div>

        {/* Right side illustration */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end items-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={illustrationImage}
              alt="SkillOnX Illustration"
              className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 py-2 text-center text-gray-600 text-sm">
        <p>&copy; 2024 SkillOnX. All rights reserved.</p>
      </div>
    </div>
  );
}
