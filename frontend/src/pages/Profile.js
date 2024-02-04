import React, { useState, useEffect } from 'react';

import FeedCard from '../components/FeedCard';
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

    const [memories, setMemories] = useState({
        memArray: []
    });

    useEffect(() => {

        const queryParameters = new URLSearchParams(window.location.search)
        const pid = queryParameters.get("pid")
        const loadData = async (e) => {
            try {
                const apiURL = 'http://localhost/api/profile/' + pid
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
                setProfile(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        const loadMemories = async (e) => {
            try {
                const apiURL = 'http://localhost/api/memory/profile/' + pid
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
                setMemories({memArray: data});
            } catch (error) {
                console.error('Error:', error);
            }
        }
        loadData();
        loadMemories();
    }, []);

  return (
    <div>
        <div id="bio">
            <h1>{profile.name}</h1>
            <p> {profile.gender} born {profile.birthday}</p>
            <img src={profile.profile_picture} alt="profile pic"></img>

            <p>{profile.bio}</p>

        </div>
        <div id="feed">
            <h1>{profile.name}'s Memories</h1>
            {memories.memArray.map(memory => (
                <FeedCard title={memory.title} description={memory.description} people_ids = {memory.people_ids} people = {memory.people}></FeedCard>
            ))}
        </div>
    </div>
    
  );
};

export default Profile;