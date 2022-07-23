import React, { useContext } from 'react'
import { UserContext } from '../App';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useHistory } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "../css/Navbar.css";

const Navbar = () => {

  const { state, dispatch } = useContext(UserContext);
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault()
        localStorage.clear()
        dispatch({ type: "CLEAR" })
        history.push('/userLogin')
    }
 
  return (
    <div >
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="m-2 navbar-brand" href="#">VESIT Feedback Analysis</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active m-3">
          <Link to="/createform"><FeedIcon></FeedIcon>Create Forms</Link>
          </li>
          <li class="nav-item m-3">
          <Link to="/userHome"><HomeIcon></HomeIcon>Home</Link>
          </li>
          <li className="nav-item m-3">
          <Link to="/allform"><ChatBubbleIcon></ChatBubbleIcon>My Forms</Link>
          </li>
          <li  className="nav-item m-3">
            <Link  onClick={logout}><ExitToAppIcon>Logout</ExitToAppIcon></Link>
        </li>
        </ul>
        
      </div>
      
    </nav>
   </div>
  );
}

export default Navbar;
