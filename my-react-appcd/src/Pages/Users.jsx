// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Users() {  
  const [users, setUsers] = useState([]);  
  useEffect(() => {    
    axios.get('http://localhost:5000/users') //url       
    .then(res => setUsers(res.data))
    .catch(err => console.error(err));
    }, []);  
  return (
    <>
    <div>
      <Link to="/newuser"> Create a new user </Link>
    </div>
    <div>
      {/* Display the fetched users */}
      {users.map(user => <p key={user._id}><span>{user.name}</span>-<span>{user.email}</span></p>)}
      </div>  
    </>
      );
}
export default Users;