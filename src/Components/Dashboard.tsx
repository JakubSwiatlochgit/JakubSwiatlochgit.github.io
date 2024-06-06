import React from 'react'
import Navbar from './Navbar'

const Dashboard = () => {
  const introStyle = {
    backgroundImage: 'url("https://mdbootstrap.com/img/Photos/new-templates/psychologist/img1.jpg")',
    height: '100vh',
  };

  const maskStyle = {
    backgroundColor: 'rgba(250, 182, 162, 0.15)',
  };

  return (
    <div>
      <Navbar />
      <section>
        <div id="intro" className="bg-image" style={introStyle}>
          <div className="mask" style={maskStyle}></div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
