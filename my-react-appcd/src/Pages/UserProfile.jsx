import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
    const [profile, setProfile] = useState({});
    const [bio, setBio] = useState('');
    const [schoolYear, setSchoolYear] = useState('');

    useEffect(() => {
        axios.get(`/users/${userId}`)
            .then(response => {
                setProfile(response.data);
                setBio(response.data.bio);
                setSchoolYear(response.data.schoolYear);
            })
            .catch(err => console.error(err));
    }, [userId]);

    const handleUpdate = () => {
        axios.put(`/users/${userId}`, { bio, schoolYear })
            .then(response => setProfile(response.data))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>{profile.name}</h1>
            <p>Email: {profile.email}</p>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            <select value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)}>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
            </select>
            <button onClick={handleUpdate}>Update Profile</button>
        </div>
    );
};

export default UserProfile;