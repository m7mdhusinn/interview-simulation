import React from 'react';
import { Link } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#000000' }}>
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* إضافة اللوجو مع حواف مستديرة وحجم أكبر */}
            <a className="navbar-brand" href="#">
              <img
                src="/Free.png"  // المسار إلى الصورة داخل مجلد public
                alt="Logo"
                style={{
                  height: '60px',  // زيادة حجم الصورة
                  width: 'auto',   // الحفاظ على نسبة العرض إلى الارتفاع
                  borderRadius: '10px',  // إضافة حواف مستديرة للصورة
                  border: '2px solid #003366', // إضافة حدود باللون الكحلي
                }}
              />
            </a>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link" to="/landing" style={{ color: 'white' }}>Home </Link>
                
                 
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/aboutus" style={{ color: 'white' }}>About us  </Link>
                
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" aria-disabled="true" style={{ color: 'white' }}>
                  Contact us

                  </a>
                </li>
              </ul>
          
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer></footer>
    </>
  );
};

export default MainLayout;
