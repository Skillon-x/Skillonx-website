import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ComingSoon from './components/comingsoon';
import SurveyStartPageOn from './components/online/SurveryStartPageOn'
import SurveyFormOn from './components/online/SurveyFormOn'
import ResumePageOn from './components/online/ResumePageOn'
import FinalPageOn from './components/online/FinalPageOn'
import SurveyStartPageOff from './components/offline/SurveryStartPageOff'
import SurveyFormOff from './components/offline/SurveyFormOff'
import ResumePageOff from './components/offline/ResumePageOff'
import FinalPageOff from './components/offline/FinalPageOff'
import termsandcondition from './components/termsandcondition';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ComingSoon />} />
        <Route path='/SurveyStartPage/online' element={<SurveyStartPageOn />} />
        <Route path='/SurveyForm/online' element={<SurveyFormOn />} />
        <Route path='/ResumePage/online' element={<ResumePageOn />} />
        <Route path='/FinalPage/online' element={<FinalPageOn />} />
        <Route path='/SurveyStartPage/offline' element={<SurveyStartPageOff />} />
        <Route path='/SurveyForm/offline' element={<SurveyFormOff />} />
        <Route path='/ResumePage/offline' element={<ResumePageOff />} />
        <Route path='/FinalPage/offline' element={<FinalPageOff />} />
        <Route path='/termsandcondition' element={<termsandcondition />} />
      </Routes>
    </Router>
  );
};

export default App;
