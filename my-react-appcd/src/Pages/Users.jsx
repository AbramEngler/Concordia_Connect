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
      <Link to="/newuser"> <h1>Register a New Account</h1> </Link>
    </div>
    </>
      );
}
export default Users;