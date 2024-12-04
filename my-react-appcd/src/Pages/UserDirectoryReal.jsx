import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserDirectoryReal.css'; // Import the CSS file for styling

function Users() {  
    const [users, setUsers] = useState([]);  

    useEffect(() => {    
        axios.get('http://localhost:5000/users') // URL to fetch users
        .then(res => {
            const sortedUsers = res.data.sort((a, b) => a.name.localeCompare(b.name)); // Sort users alphabetically
            setUsers(sortedUsers);
        })
        .catch(err => console.error(err));
    }, []);  

    return (
        <div className="user-directory-container">
            <h3 className="directory-header">Current Users</h3>
            <div className="user-list">
                {/* Display the fetched and sorted users */}
                {users.map(user => (
                    <div key={user._id} className="user-item">
                        <span className="user-name">{user.name}</span>  <span className="user-email">{user.email}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Users;