import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './ProfileCreationForm.css'

const ProfileCreationForm = () => {
  const [profile, setProfile] = useState({
    name: '',
    dob: '',
    bio: '',
    pic: '',
    p1_id: '',
    p2_id: '',
    relation_type: '0'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, pic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiURL = 'http://localhost/api/profile'

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(profile),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={profile.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Date of Birth:
        <input type="date" name="dob" value={profile.dob} onChange={handleChange} />
      </label>
      <br />
      <label>
        Bio:
        <textarea name="bio" value={profile.bio} onChange={handleChange} />
      </label>
      <br />
      <label>
        Picture:
        <input type="file" name="pic" onChange={handleFileChange} />
      </label>
      <br />
      <label>
        Parent 1:
        <input type="text" name="p1_id" value={profile.p1_id} onChange={handleChange} />
      </label>
      <label>
        Parent 2:
        <input type="text" name="p2_id" value={profile.p2_id} onChange={handleChange} />
      </label>
      <br />
      <Button variant="primary" className="green-button" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ProfileCreationForm;