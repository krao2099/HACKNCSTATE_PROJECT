import React, { useState, useEffect } from 'react';
import FeedCard from '../components/FeedCard';
import './Feed.css'
import Header from '../components/Header';

const Feed = () => {
    const [memories, setMemories] = useState({
        memArray: []
    });

    useEffect(() => {
        const loadMemories = async (e) => {
            try {
                const apiURL = 'http://localhost/api/memory/all'
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
        loadMemories();
    }, []);

  return (
    <div>
        <Header />
        <div id="main-feed">
            <h1>Family Memories</h1>

            <div id = "main-feed-scroller">
                {memories.memArray.map(memory => (
                    <FeedCard title={memory.title} description={memory.description} people = {memory.people} file = {memory.files} type = {memory.mem_type}></FeedCard>
                ))}
            </div>
        </div>
    </div>
    
  );
};

export default Feed;