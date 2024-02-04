import React from 'react';
import Header from '../components/Header';
import mlh from '../images/mlh-logo-color.png';
import hacknc from '../images/Hack_NCState_Logo_Red_Background_White.png';


const AboutUs = () => {
    

  return (
    <div>
        <Header />
        <div id="main-feed">
            <h1>About Us</h1>
            <p>Roots & Rings is a family tree and memory sharing app designed to help you connect with your family and share memories with them. We are a team of 4 developers who are passionate about family and technology. We hope you enjoy our app and find it useful for connecting with your family.</p>
            <img src={mlh} alt="MLH logo"/>
            <img src={hacknc} alt="MLH logo"/>
        </div>
    </div>
    
  );
};

export default AboutUs;