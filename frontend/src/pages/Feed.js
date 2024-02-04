import React, { useState, useEffect } from 'react';
import './Feed.css'

const Feed = () => {
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
                return data;
            } catch (error) {
                console.error('Error:', error);
            }
        }
        loadData();
    })

  return (
    <div>
        <p>Stupid ass bitch</p>
    </div>
  );
};

export default Feed;