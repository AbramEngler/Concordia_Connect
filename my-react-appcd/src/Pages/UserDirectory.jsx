import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserDirectory = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get(`/users?search=${search}`)
            .then(response => setUsers(response.data))
            .catch(err => console.error(err));
    }, [search]);

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search users..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
            />
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <Link to={`/users/${user._id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDirectory;