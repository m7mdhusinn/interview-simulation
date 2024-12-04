import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../Layouts/MainLayout';

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // لتخزين الإجابات لكل سؤال
  const [evaluationResults, setEvaluationResults] = useState({}); // لحفظ نتائج التقييم لكل سؤال
  const userId = 1; // هنا يمكن استبداله بـ userId حقيقي من نظامك

  // جلب الأسئلة من الـ API عند تحميل الصفحة
  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(response => {
        setQuestions(response.data); // حفظ الأسئلة في الحالة
      })
      .catch(error => {
        console.error("حدث خطأ في جلب الأسئلة:", error);
      });
  }, []);

  // إرسال الإجابة وحفظها في قاعدة البيانات وتقييمها
  const handleSubmit = async (e, questionId) => {
    e.preventDefault();

    const answerText = answers[questionId]; // الحصول على الإجابة الخاصة بالسؤال
    if (!answerText) {
      alert("يرجى إدخال إجابة.");
      return;
    }

    try {
      // إرسال الإجابة إلى الخادم
      const response = await axios.post('http://localhost:5000/api/save-evaluate', { 
        questionId,
        answerText,
        userId 
      });
      if (response.status === 429) {
        alert('تم تجاوز الحصة. يرجى المحاولة لاحقًا.');
      }else{
      // حفظ نتائج التقييم الخاصة بهذا السؤال
      setEvaluationResults({
        ...evaluationResults,
        [questionId]: response.data.results,
      });
    }

  } catch (error) {
    console.error('Error submitting answer:', error);
    if (error.response && error.response.status === 500) {
      alert('حدث خطأ في الخادم، يرجى المحاولة لاحقًا.');
    }
    if (error.response && error.response.status === 400) {
      alert('الإجابة غير صالحة.');
    }
  }
  };

  // تحديث الإجابة في الحالة فقط للسؤال الذي يتم التفاعل معه
  const handleChange = (e, questionId) => {
    const updatedAnswers = { ...answers, [questionId]: e.target.value };
    setAnswers(updatedAnswers);
  };

  return (
    <MainLayout>
      <div className="container">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question.QuestionID}>
              <h2>{question.QuestionID}: {question.QuestionText}</h2>
              <form onSubmit={(e) => handleSubmit(e, question.QuestionID)}>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    value={answers[question.QuestionID] || ''} // ربط الإجابة بالحالة
                    onChange={(e) => handleChange(e, question.QuestionID)} // تحديث الإجابة فقط للسؤال المحدد
                    rows="4"
                    placeholder="أدخل إجابتك هنا"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  إرسال الإجابة
                </button>
              </form>

              {/* عرض نتيجة التقييم إذا كانت موجودة */}
              {evaluationResults[question.QuestionID] && (
                <div className="mt-4">
                  <h4>نتيجة التقييم:</h4>
                  <p>الدرجة: {evaluationResults[question.QuestionID].score}</p>
                  <p>التعليقات: {evaluationResults[question.QuestionID].feedback}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>جاري تحميل الأسئلة...</p>
        )}
      </div>
    </MainLayout>
  );
};

export default QuestionPage;
