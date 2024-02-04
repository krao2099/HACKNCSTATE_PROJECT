import React, { useState, useEffect } from 'react';
import './Profile.css'

const Profile = () => {

    const [profile, setProfile] = useState({
        bio: '',
        birthday: '',
        gender: '',
        id: '',
        name: '',
        profile_picture: ''
      });

    useEffect(() => {
        const loadData = async (e) => {
            try {
                const apiURL = 'http://localhost/api/profile/20'
                const response = await fetch(apiURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
                });
            
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            
                const data = await response.json();
                console.log('Success:', data);
                setProfile(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        loadData();
    }, []);

  return (
    <div>
        <h1>{profile.name}</h1>
        <p>{profile.birthday} | {profile.gender}</p>
        <img src={profile.profile_picture} alt="profile pic"></img>

        <p>{profile.bio}</p>
    </div>
  );
};

export default Profile;