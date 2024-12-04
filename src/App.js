import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import LandingPage from './components/LandingPage';
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';

function App() {
  return (
    <div className="App">
          <BrowserRouter> 
    <Routes>
      <Route path='/' element={<LandingPage />}/>
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
