import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
const ResultPage = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    // استرجاع نتائج التحليل من OpenAI أو قاعدة البيانات
    // هذا هو المكان المناسب لاستدعاء API
    setResult("نتيجة التحليل: إجابتك جيدة، يمكنك تحسين ...");
  }, []);

  return (
    <MainLayout>
    <div className="container">
      <h2>نتائج إجاباتك</h2>
      <p>{result}</p>
    </div>
    </MainLayout>
  );
};

export default ResultPage;
