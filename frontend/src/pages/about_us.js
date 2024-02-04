import React from 'react';
import Header from '../components/Header';
import mlh from '../images/mlh-logo-color.png';
import hacknc from '../images/Hack_NCState_Logo_Red_Background_White.png';
import './about_us.css'


const AboutUs = () => {
    

  return (
    <div>
        <Header />
        <div id="main-feed">
            <h1>About Us</h1>
            <p>Roots & Rings is a family tree and memory sharing app designed to help you connect with your family and share memories with them. We are a team of 4 developers who are passionate about family and technology. We hope you enjoy our app and find it useful for connecting with your family.</p>
            <div class="Contributers">
              <p>Reagan Dunkley: <a href="mailto: reaganldunkley@gmail.com">reaganldunkley@gmail.com</a> <a href="https://github.com/reaganld">Github</a></p>
              <p>Landon Gaddy: <a href="mailto: lgaddy.lrhs@gmail.com">lgaddy.lrhs@gmail.com</a> <a href="https://github.com/lgaddy893">Github</a></p>
              <p>Reagan Dunkley: <a href="mailto: reaganldunkley@gmail.com">reaganldunkley@gmail.com</a> <a href="https://github.com/reaganld">Github</a></p>
              <p>Reagan Dunkley: <a href="mailto: reaganldunkley@gmail.com">reaganldunkley@gmail.com</a> <a href="https://github.com/reaganld">Github</a></p>
            </div>
            
            <div class="logos">
              <img src={mlh} id="mlh" alt="MLH logo"/>
              <img src={hacknc} alt="MLH logo"/>
            </div>
        </div>
    </div>
    
  );
};

export default AboutUs;