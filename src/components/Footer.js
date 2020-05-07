import React from 'react';

const Footer = () => {
  return (
    <footer className="footer container-fluid" style={{ paddingBottom: 12 }}>
      <div className="row justify-content-center">
        <div className="col-md-4 text-muted" style={{
          textAlign: 'center',
          fontSize: "14px",
        }}>
          &copy; 2023 by MediTranslate. All information on this site is not a replacement for a proper medical consultation.
          If you have symptoms, please seek medical assistance.
        </div>
      </div>
    </footer>
  )
}

export default Footer
