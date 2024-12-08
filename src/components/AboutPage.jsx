import React from "react";
import MainLayout from "../Layouts/MainLayout"; // استيراد الـ MainLayout

const AboutPage = () => {
  // إعدادات الخلفية
  const backgroundStyle = {
    backgroundImage: 'url(/blue.jpg)',  // المسار إلى الصورة داخل مجلد public
    backgroundSize: 'cover',  // تغطي كامل الصفحة
    backgroundPosition: 'center',  // تحديد الصورة في المنتصف
    backgroundAttachment: 'fixed',  // إبقاء الخلفية ثابتة عند التمرير
    minHeight: '100vh',  // تأكيد أن الصورة تغطي كامل الشاشة
    display: 'flex',  // استخدام Flexbox
    justifyContent: 'center',  // تموضع المحتوى في المنتصف أفقيًا
    alignItems: 'center',  // تموضع المحتوى في المنتصف عموديًا
    color: 'white',  // تغيير لون النص ليكون أبيض على الخلفية
    textAlign: 'center',  // محاذاة النص في المنتصف
    position: 'relative',  // لضبط العنصر داخل الصفحة
  };

  // إعدادات الكارد السماوي الشفاف
  const cardStyle = {
    backgroundColor: 'rgba(0, 191, 255, 0.7)',  // اللون السماوي مع الشفافية
    padding: '30px',  // المسافة حول المحتوى داخل الكارد
    borderRadius: '10px',  // الزوايا المدورة للكارد
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // إضافة ظل خفيف حول الكارد
    maxWidth: '500px',  // تحديد أقصى عرض للكارد
    width: '100%',  // جعله يتوسع ليأخذ عرض الحاوية
    color: 'white',  // لون النص داخل الكارد
    textAlign: 'center',  // محاذاة النص داخل الكارد
  };

  return (
    <MainLayout> {/* تضمين MainLayout */}
      <div style={backgroundStyle}> {/* استخدام الخلفية */}
        {/* الكارد السماوي الشفاف في منتصف الصفحة */}
        <div style={cardStyle}>
          <h1>About us</h1>
          <p>نحن موقع محاكاة مقابلات العمل الذكية، نسعى لتوفير تجربة فريدة للباحثين عن عمل من خلال
             أدوات مبتكرة تساعدهم على التحضير لمقابلاتهم بشكل فعال. يقدم موقعنا مجموعة 
             متنوعة من الأسئلة الشائعة في المقابلات، بالإضافة إلى
              محاكاة تفاعلية تتيح للمستخدمين ممارسة مهاراتهم في بيئة واقعية. نهدف إلى تعزيز ثقة
              المستخدمين وتمكينهم من التفوق في مقابلاتهم، مما يسهم في تحقيق
              طموحاتهم المهنية. انضم إلينا اليوم وابدأ رحلتك نحو النجاح!</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
