import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './ProfileCreationForm.css'

const ProfileCreationForm = () => {
  const [profile, setProfile] = useState({
    name: '',
    dob: '',
    gender: '',
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
    <div className="page-background">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className='form-title'>Add Family Member</div>
          <div className="form-group">
            <label className='form-item'>
              Name <br />
              <input type="text" name="name" value={profile.name} onChange={handleChange} />
            </label>
          </div>
          <div className="form-group">
            <label className='form-item'>
              Gender <br />
              <input type="text" name="gender" value={profile.gender} onChange={handleChange} />
            </label>
            <label className='form-item'>
              Date of Birth <br />
              <input type="date" name="dob" value={profile.dob} onChange={handleChange} />
            </label>
          </div>
          <div className="form-group">
            <label className='form-item'>
              Bio <br />
              <textarea name="bio" className='bio-field' value={profile.bio} onChange={handleChange} />
            </label>
          </div>
          <div className="form-group">
            <label className='form-item'>
              Picture <br />
              <input type="file" name="pic" onChange={handleFileChange} />
            </label>
          </div>
          <div className="form-group">
            <label className='form-item'>
              Parent 1 <br />
              <input type="text" name="p1_id" value={profile.p1_id} onChange={handleChange} />
            </label>
            <label className='form-item'>
              Parent 2 <br />
              <input type="text" name="p2_id" value={profile.p2_id} onChange={handleChange} />
            </label>
          </div>
          <Button variant="primary" className="green-button" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreationForm;