// for desktop view

import React, { useContext } from 'react';
import { Switch } from '@material-ui/core';
import { SocketContext } from './Context';
import VideoPlayer from './components/VideoPlayer';
import Notifications from './components/Notifications';
import ChatBox from './components/ChatBox';
import './App.css';
import UserOnlineData from './data/UserOnlineData';

const App = () => {
  const { setVideoCam, videoCam } = useContext(SocketContext);
  // const classes = useStyles();

  return (
    <div className="wrapper">
      <div className="chat-section">
        <UserOnlineData />
        <ChatBox className="chatBox" />
        <Notifications />
      </div>
      <div>
        <h1
          style={{
            display: 'grid',
            gridTemplateColumns: '5% 90% 5%',
            placeItems: 'center',
            width: '100%',
            color: 'black',
            backgroundColor: '#03DAC5',
            fontWeight: 'bold',
            padding: '10px',
          }}
        >
          <Switch
            size="medium"
            color="primary"
            checked={videoCam}
            onChange={() => {
              setVideoCam(!videoCam);
            }}
          />
          Video Chat
        </h1>
        <VideoPlayer />
      </div>
    </div>
  );
};

export default App;
