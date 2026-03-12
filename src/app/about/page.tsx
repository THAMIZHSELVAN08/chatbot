import React from 'react';

export default function AboutPage() {
  return (
    <div className="content-page">
      <div className="card-page prose">
        <h1>About the Project</h1>
        <p>
          <strong>SevaAI</strong> (meaning &quot;Service AI&quot;) is a smart, voice-first digital assistant 
          designed to democratize access to government welfare schemes across India.
        </p>

        <h2>The Vision</h2>
        <p>
          In a country as diverse as India, navigating the thousands of state and central schemes is a daunting task, 
          especially for those in rural areas or those with limited literacy. Language barriers often prevent 
          the most deserving citizens from accessing life-changing benefits.
        </p>
        <p>
          SevaAI solves this by providing a <strong>voice-first, multilingual interface</strong> that understands regional languages 
          and translates complex government eligibility criteria into simple, actionable steps.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li><strong>24/7 AI Assistance:</strong> Accurate answers any time of the day.</li>
          <li><strong>Voice-First Design:</strong> Just click the mic and speak in your mother tongue.</li>
          <li><strong>Personalized Matching:</strong> Find schemes specific to your age, income, and profession.</li>
          <li><strong>South-India Focused:</strong> Deep database for TN, AP, Telangana, Karnataka, and Kerala.</li>
          <li><strong>Accessibility First:</strong> Designed for high contrast, clear fonts, and easy navigation.</li>
        </ul>

        <h2>Project Roadmap</h2>
        <p>
          Currently in beta, we are expanding our database to include all 28 states and 8 union territories, 
          integrating with DigiLocker for document verification, and planning a mobile app for offline access.
        </p>
        
        <div style={{ marginTop: '40px', padding: '24px', background: 'var(--secondary)', color: 'white', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
          <h3 style={{ color: 'white', marginBottom: '8px' }}>Join the Mission</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
            We believe information is the first step to empowerment. 
            Want to contribute data or partner with us?
          </p>
          <a href="mailto:contact@sevaai.org" style={{ display: 'inline-block', marginTop: '16px', padding: '10px 24px', background: 'white', color: 'var(--secondary)', borderRadius: 'var(--radius-full)', fontWeight: '700', textDecoration: 'none' }}>
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
