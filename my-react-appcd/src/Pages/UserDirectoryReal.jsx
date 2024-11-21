import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Users() {  
    const [users, setUsers] = useState([]);  
    useEffect(() => {    
      axios.get('http://localhost:5000/users') //url       
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
      }, []);  
    return (
      <>
      <div><h3>Current Users:</h3></div>
      <div>
        {/* Display the fetched users */}
        {users.map(user => <p key={user._id}><span>{user.name}</span>-<span>{user.email}</span></p>)}
        </div>  
      </>
        );
  }
  export default Users;