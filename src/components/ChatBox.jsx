/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import { Grid, makeStyles, Button, TextField } from '@material-ui/core';
import { Phone, PhoneDisabled, ChatBubble } from '@material-ui/icons';
import { SocketContext } from '../Context';
import './ChatBox.css';

const useStyles = makeStyles((theme) => ({
  chatBoxDesktop: {
    display: 'grid',
    gridTemplateRows: '8% 92%',
    width: '70vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '70vh',
    backgroundColor: 'white',
  },
  chatBoxMobile: {
    display: 'grid',
    gridTemplateRows: '8% 92%   ',
    width: '100vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '97vh',
    backgroundColor: 'white',
  },
}));

const ChatBox = (props) => {
  const {
    allChat,
    callEnded,
    leaveCall,
    callUser,
    callAccepted,
    chat,
    setChat,
    createRoom,
    idToCall,
    left,
    onlineData,
    displaySize,
  } = useContext(SocketContext);
  useEffect(() => {
    const element = document.getElementById('chat-part')
    if (left && allChat) {
      element.innerHTML += `<pre class='chat-left'>${allChat}</pre>`;
    } else if (allChat) {
      element.innerHTML += `<pre class='chat-right'>${allChat}</pre>`;
    }
  }, [allChat]);

  const classes = useStyles();
  return (
    <Grid container className={classes.gridContainer}>
      <section
        className={displaySize ? classes.chatBoxMobile : classes.chatBoxDesktop}
        style={{ maxHeight: '100%', overflow: 'auto' }}
      >
        <header className='chat-header'>
          Message
          <TextField
            title='You can see selected ID name here'
            value={`${onlineData[idToCall] || ''}`}
            fullWidth
          />
          {callAccepted && !callEnded ? (
            <Button
              size='xlarge'
              variant='contained'
              color='secondary'
              startIcon={<PhoneDisabled fontSize='large' />}
              fullWidth
              onClick={leaveCall}
              className={classes.margin}
            >
              Hang Up
            </Button>
          ) : (
            <Button
              startIcon={<Phone fontSize='large' />}
              fullWidth
              onClick={() => callUser(idToCall)}
              className={classes.margin}
            />
          )}
        </header>
        <div className='chat'>
          <div id='chat-part'></div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              createRoom(idToCall);
            }}
          >
            <section className='typing-send'>
              <TextField
                className='chat-textarea'
                label='message'
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                fullWidth
              />
              <Button
                className='chat-button'
                size='small'
                startIcon={<ChatBubble fontSize='large' />}
                fullWidth
                type='submit'
              />
            </section>
          </form>
        </div>
      </section>
    </Grid>
  );
};

// const List = (props) => {
//   const { item } = props;
//   const { left } = useContext(SocketContext);

export default ChatBox;

// src="https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700076510.jpg" width="192" height="120"
