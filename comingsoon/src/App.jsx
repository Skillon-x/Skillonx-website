import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ComingSoon from './components/comingsoon';
import SurveyStartPage from './components/SurveryStartPage';
import SurveyForm from './components/SurveyForm';
import ResumePage from './components/ResumePage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ComingSoon />}/>
        <Route path='/SurveyStartPage' element={<SurveyStartPage />}/>
        <Route path='/SurveyForm' element={<SurveyForm />}/>
        <Route path='/ResumePage' element={<ResumePage />}/>
      </Routes>
    </Router>
  );
};

export default App;
