import React, { useState, useEffect } from 'react';
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

  const [peopleList, setPeopleList] = useState({
    people: [{ id: '1', name: 'Parent Name 1' }, { id: '2', name: 'Parent Name 2' }]
  });

  useEffect(() => {
    const fetchPeopleList = async () => {
      try {
        const apiURL = 'http://localhost:80/api/profile/all'
        console.log(apiURL);
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setPeopleList({ people: data.profiles });
        console.log("peopleList", peopleList.people)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchPeopleList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    console.log(profile);
  };

  const handleFileChange = (e) => {

    const file = e.target.files[0];
    let document = "";

    if(file) {
        console.log("File true");
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log("File loaded");
            document = reader.result;
            setProfile({ ...profile, pic:document });
        }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiURL = 'http://localhost:80/api/profile'

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
              Gender2 <br />
              <select name="gender" className="selection" value={profile.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Nonbinary/Other</option>
              </select>
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
              <select name="p1_id" className="selection" value={profile.p1_id} onChange={handleChange}>
                <option value="">Select Parent 1</option>
                {peopleList.people.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </label>
            <label className='form-item'>
              Parent 2 <br />
              <select name="p2_id" className="selection" value={profile.p2_id} onChange={handleChange}>
                <option value="">Select Parent 2</option>
                {peopleList.people.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <Button variant="primary" className="green-button" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreationForm;