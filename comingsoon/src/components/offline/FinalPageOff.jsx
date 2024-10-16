import React, { useState, useEffect } from 'react';
import logoImage from '../../assets/Logo/primaryLogo.png';
import Confetti from 'react-confetti';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { Button } from '../Buttons/Button';
import { Alert, AlertDescription, AlertTitle } from '../Buttons/Alert';
import { useLocation } from 'react-router-dom';

export default function SurveyStartPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [referralLink, setReferralLink] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const location = useLocation();
  const { email } = location.state || {}; // Get the email passed from previous component

  const socialLinks = [
    { Icon: FaGithub, href: 'https://github.com/Skillonx-dev', label: 'GitHub' },
    { Icon: FaLinkedin, href: 'https://www.linkedin.com/company/skillonx/', label: 'LinkedIn' },
    { Icon: FaInstagram, href: 'https://www.instagram.com/skillonx/', label: 'Instagram' },
    { Icon: FaFacebook, href: 'https://www.facebook.com/people/Skillonx-Classes/pfbid02fkYeqaq4GhbRnjhrWxU1vX1g6aZQ7Tuhm1HgQiAuCR7tMsedwKXeM1ucLTX89mHBl/?mibextid=ZbWKwL', label: 'Facebook' },
  ];

  useEffect(() => {
    setMounted(true);
    console.log(email); // Ensure the email is being passed correctly
    setTimeout(() => {
      setIsConfettiVisible(true);
      setTimeout(() => {
        setIsConfettiVisible(false);
      }, 10000);
    }, 300);

    // Generate a unique referral code when the component mounts
    const newReferralCode = generateReferralCode();
    setReferralCode(newReferralCode);
  }, []);

  const generateReferralCode = () => {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const generateReferralLink = () => {
    const baseUrl = 'https://skillonx.com/SurveyStartPage/offline';
    const referralUrl = `${baseUrl}?ref=${referralCode}`;
    setReferralLink(referralUrl);
  };

  const trackReferral = () => {
    console.log(`Referral shared: ${referralCode}`);
    // Here you can make an API call to track the referral if necessary
  };

  // const handleShare = async () => {
  //   generateReferralLink();

  //   try {
  //     const response = await fetch('http://localhost:5000/api/save-referral/offline', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, referralCode }), // Pass email and referral code to the backend
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log('Referral code saved:', data);
  //     } else {
  //       console.error('Error saving referral code:', data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error during referral code save request:', error);
  //   }

  //   trackReferral(); // Optionally track the referral
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-100 to-gray-300 animate-gradient-x flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden ">
      {isConfettiVisible && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={400}
          recycle={false}
          gravity={0.1}
        />
      )}

      <div className="absolute moving-gradient top-0 left-0 w-full h-full overflow-hidden pointer-events-none shadow-xl shadow-gray-500">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-blue-200 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-purple-200 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200 rounded-full filter blur-[120px] opacity-20 animate-blob"></div>
      </div>

      <div className={`w-full max-w-2xl relative transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="mb-4 sm:mb-8 flex justify-center">
          <img 
            src={logoImage}
            alt="Company Logo"
            className="h-14 sm:h-16 md:h-28 transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8">
          <h2 className='text-xl px-3 mx-5 text-gray-800'>Thank you for submitting your application. We will review your application and get back to you.</h2>
          
          <div className="flex justify-center gap-6">
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

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-blue-600">Spread the word and win!</h2>
            <p className="text-center text-gray-700">
              Share SKILLONX with your network and get a chance to win a ₹5,000 reward!
            </p>
            
            <Alert>
              <AlertTitle className="flex items-center ">&#x1F4E2; Here's how:</AlertTitle>
              <AlertDescription>
                <ol className="list-decimal list-inside">
                  <li>Share our application form using your unique referral link</li>
                  <li>Get your friends to apply through your link</li>
                  <li>The person with the most successful referrals wins:
                    <ul className="list-disc list-inside ml-4 mt-2">
                      <li>₹5,000 cash prize</li>
                      <li>Priority consideration for our internship program</li>
                    </ul>
                  </li>
                </ol>
              </AlertDescription>
            </Alert>

            {!referralLink ? (
              <Button  className="w-full">
                Get my referral link
              </Button>
            ) : (
              <div className="space-y-2">
                <input 
                  type="text" 
                  value={referralLink} 
                  readOnly 
                  className="w-full p-2 border rounded bg-white text-gray-800"
                />
                <Button onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                  trackReferral();
                }} className="w-full">
                  Copy link
                </Button>
              </div>
            )}

            <div className="text-center text-sm">
              <a href="/termsandcondition" className="text-primary hover:text-blue-600 transition-colors duration-200 inline-block" target="_blank">
                Terms & condition
              </a>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
