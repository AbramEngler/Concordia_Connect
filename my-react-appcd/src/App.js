import { Routes, Route } from 'react-router-dom';

import NavBar from './Components/NavBar';
import NoMatch from "./Components/NoMatch";
import Home from './Pages/Home';
import Users from './Pages/Users';
import About from './Pages/About';
import NewUserForm from './Pages/NewUserForm';
import Login from './Pages/Login';
import BuyAndSell from './Pages/BuyAndSell';
import PostDetail from './Pages/PostDetail';
import MessagePage from './Pages/MessagePage'; 
import MessageDetail from './Pages/MessageDetail';

const App = () =>{
  const userId = localStorage.getItem('userId'); // Get userId from localStorage
  return (
    <>
    <NavBar/>
      <Routes> 
        <Route path="/" element={<Home />}/> 
        <Route path="/users" element={<Users />}/>
        <Route path ="/about" element={<About />}/>
        <Route path = "*" element = {<NoMatch />}/>
        <Route path="/newuser" element={<NewUserForm />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/buyandsell" element={<BuyAndSell />}/>
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/messagepage" element={<MessagePage userId={userId} />} />
        <Route path="/message/:messageId" element={<MessageDetail />} />
      </Routes>
    </>
  );
};

export default App;