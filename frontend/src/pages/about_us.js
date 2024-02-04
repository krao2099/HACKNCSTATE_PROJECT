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
            
            <p>Roots & Rings is a family tree and memory sharing app designed to help you connect with your family and share memories with them developed for the Hack_NCState x Code Black 2024 Hackathon. We are a team of 4 developers who are passionate about family and technology. We hope you enjoy our app and find it useful for connecting with your family.</p>
            <div class="sources">
              <div class="Contributers">
                <h2>Contributers</h2>
                <p>Reagan Dunkley: <a href="mailto: reaganldunkley@gmail.com">Email</a> <a href="https://github.com/reaganld">Github</a></p>
                <p>Landon Gaddy: <a href="mailto: lgaddy.lrhs@gmail.com">Email</a> <a href="https://github.com/lgaddy893">Github</a></p>
                <p>Robert Kenney: <a href="mailto: kenneyrobert109@gmail.com">Email </a> <a href="https://github.com/rpkenney">Github</a></p>
                <p>Kiran Rao: <a href="mailto: getkiranrao@gmail.com">Email</a> <a href="https://github.com/krao2099">Github</a></p>
              </div>
              <div >
                <h2>Project Links</h2>
                <a id="devpost" href="https://devpost.com/software/roots-rings"><img src="https://d2dmyh35ffsxbl.cloudfront.net/assets/reimagine2/devpost-logo-25d0005ec83e3b9ef6fce93235bb6d642d7c828f31758ebdb5b7ee87de7d45c3.svg"/></a>
                <a href="https://github.com/krao2099/HACKNCSTATE_PROJECT"><img src="https://static.vecteezy.com/system/resources/previews/016/833/880/non_2x/github-logo-git-hub-icon-with-text-on-white-background-free-vector.jpg"/></a>
              </div>
              
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