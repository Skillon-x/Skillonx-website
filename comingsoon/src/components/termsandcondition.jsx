import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const termsandcondition = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 px-4 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-white">SKILLONX Referral Program Terms and Conditions</h2>
            <Link to="/survey-start" className="flex items-center text-white hover:text-blue-200 transition-colors">
              <FaArrowLeft className="mr-2" />
              Back
            </Link>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6 space-y-6 text-gray-700">
          <p className="text-sm">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h3 className="text-lg font-semibold text-gray-900">1. Eligibility</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Open to all individuals who have submitted an application to SKILLONX.</li>
              <li>Participants must be at least 18 years old or the age of majority in their jurisdiction.</li>
              <li>Employees of SKILLONX and their immediate family members are not eligible.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900">2. Referral Process</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Participants receive a unique referral link upon application submission.</li>
              <li>Successful referral occurs when someone applies through your unique link.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900">3. Rewards</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Top referrer receives ₹5,000 and priority internship consideration.</li>
              <li>Ties resolved based on who reached the highest referral count first.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900">4. Reward Eligibility and Distribution</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Minimum one successful referral required for eligibility.</li>
              <li>Winners notified via email within 14 days after the referral period.</li>
              <li>SKILLONX reserves the right to deny, withhold, or revoke any reward at its sole discretion.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900">5. Restrictions and Conduct</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>No spam, automated systems, or unfair methods allowed.</li>
              <li>Referral links should not be posted on public forums or coupon sites.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900">6. Privacy and Data Protection</h3>
            <p className="mt-2">Personal data handled in accordance with our Privacy Policy and applicable laws.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900">7. Liability and Disclaimers</h3>
            <p className="mt-2">SKILLONX is not responsible for technical failures or other factors affecting the program.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900">8. Tax Implications</h3>
            <p className="mt-2">Any tax liability from rewards is the sole responsibility of the participant.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900">9. Changes to Terms and Conditions</h3>
            <p className="mt-2">SKILLONX reserves the right to update these terms at any time.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900">10. Program Modification or Termination</h3>
            <p className="mt-2">SKILLONX may modify or terminate the program at any time without prior notice.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            <p className="mt-2">For questions, please contact us at: <a href="mailto:contact@skillonx.com" className="text-blue-600 hover:underline">contact@skillonx.com</a></p>
          </section>

          <p className="mt-8 text-sm text-gray-500">
            By participating in the SKILLONX Referral Program, you acknowledge that you have read, understood, and agree to these terms and conditions, including SKILLONX's right to deny rewards at its discretion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default termsandcondition;