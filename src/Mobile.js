// import MenuIcon from '@mui/icons-material/Menu';
import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Switch } from '@material-ui/core';
import { SocketContext } from './Context';
import VideoPlayer from './components/VideoPlayer';
import ChatBox from './components/ChatBox';
import './App.css';
import UserOnlineData from './data/UserOnlineData';

export default function Mobile() {
  const [menubarOpen, setmenubarOpen] = useState(false);
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '10% 80%',
          background: '#3f729b',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <button
          type="submit"
          onClick={() => setmenubarOpen(!menubarOpen)}
          style={{
            fontSize: '2rem',
            border: 'none',
            backgroundColor: '#3f729b',
          }}
        >
          &#9776;
        </button>
        <h1>Sundesh</h1>
      </div>
      <BrowserRouter>
        <table className={menubarOpen ? 'menubar-open' : 'menubar-close'}>
          <tr>
            {' '}
            <NavLink
              to="/onlineuser"
              style={({ isActive }) => ({
                color: isActive ? 'greenyellow' : 'white',
                width: '100%',
              })}
            >
              Online User
            </NavLink>
          </tr>
          <tr>
            <NavLink
              to="/Chat"
              style={({ isActive }) => ({
                color: isActive ? 'greenyellow' : 'white',
                width: '100%',
              })}
            >
              Chat
            </NavLink>
          </tr>
          <tr>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? 'greenyellow' : 'white',
                width: '100%',
              })}
            >
              VideoCall
            </NavLink>
          </tr>
        </table>
        <Routes>
          <Route path="/onlineuser" element={<UserOnlineData />} />
          <Route path="/Chat" element={<ChatBox />} />
          <Route path="/" element={<VideoCall />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function VideoCall() {
  const { setVideoCam, videoCam } = useContext(SocketContext);
  return (
    <div>
      <h1
        style={{
          display: 'grid',
          gridTemplateColumns: '95% 5%',
          placeItems: 'center',
          width: '100%',
          color: 'black',
          backgroundColor: '#03DAC5',
          fontWeight: 'bold',
          padding: '10px',
        }}
      >
        Video Chat
        <Switch
          size="medium"
          color="primary"
          checked={videoCam}
          onChange={() => {
            setVideoCam(!videoCam);
          }}
        />
      </h1>
      <VideoPlayer />
    </div>
  );
}
