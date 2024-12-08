import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';

const LandingPage = () => {
  // استخدام الصورة كخلفية كاملة
  const backgroundStyle = {
    backgroundImage: 'url(/girl1.jpg)',  // المسار للصورة في مجلد public
    backgroundSize: 'cover',  // تغطي كامل الصفحة
    backgroundPosition: 'center',  // تحديد الصورة في المنتصف
    backgroundAttachment: 'fixed', // إبقاء الخلفية ثابتة عند التمرير
    minHeight: '100vh',  // تأكيد أن الصورة تغطي كامل الشاشة
    display: 'flex',  // استخدام Flexbox
    justifyContent: 'center',  // تموضع المحتوى في المنتصف أفقيًا
    alignItems: 'center',  // تموضع المحتوى في المنتصف عموديًا
    color: 'white',  // تغيير لون النص ليكون أبيض على الخلفية
    textAlign: 'center',  // محاذاة النص في المنتصف
    flexDirection: 'column',  // ترتيب الكاردين عموديًا
    gap: '20px',  // إضافة مسافة بين الكاردين
  };

  // أسلوب الكارد
  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // لون خلفية الكارد مع الشفافية
    padding: '30px',  // المسافة حول المحتوى داخل الكارد
    borderRadius: '10px',  // الزوايا المدورة للكارد
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // إضافة ظل خفيف حول الكارد
    maxWidth: '500px',  // تحديد أقصى عرض للكارد
    width: '100%',  // جعله يتوسع ليأخذ عرض الحاوية
  };

  return (
    <>
      <MainLayout>
        <div style={backgroundStyle}>
          {/* الكارد الأول */}
          <div style={cardStyle}>
  <h1 style={{ color: '#003366', fontFamily: 'Times New Roman, monospace' }}>Welcome to Smart Interview </h1>  
</div>


          {/* الكارد الثاني */}
          <div style={cardStyle}>
  <h5 style={{ color: 'black' }}> في عالم العمل اليوم، تعتبر المقابلات الشخصية خطوة حاسمة نحو تحقيق أهدافك المهنية. هنا في Smart Interview، نقدم لكم تجربة محاكاة متكاملة تساعدكم على الاستعداد للمقابلات بثقة واحترافية.</h5>
  <p style={{ color: 'black' }}>ابدأ بالتسجيل للإجابة على الأسئلة وتلقي التغذية الراجعة.</p>


            <Link to="/register" className="btn btn-primary">ابدأ</Link>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default LandingPage;
