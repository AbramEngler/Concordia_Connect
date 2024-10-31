// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {  
  const [users, setUsers] = useState([]);  
  useEffect(() => {    
    axios.get('http://localhost:5000/users') //url       
    .then(res => setUsers(res.data))
    .catch(err => console.error(err));
    }, []);  
  return (
    <div>
      {/* Display the fetched users */}
      {users.map(user => <p key={user._id}><span>{user.name}</span>-<span>{user.email}</span></p>)}
      </div>  
      );
}
export default App;