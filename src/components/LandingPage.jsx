import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';

const LandingPage = () => {
  return (<>
    <MainLayout>
    <div className="container text-center">
      <h1>مرحبًا بك في محاكاة مقابلات العمل</h1>
      <p>ابدأ بالتسجيل للإجابة على الأسئلة وتلقي التغذية الراجعة.</p>
      <Link to="/question" className="btn btn-primary">ابدأ</Link>
    </div>
    </MainLayout>
  </>);
};

export default LandingPage;
