import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import useMediaQuery from '@mui/material/useMediaQuery';

import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '360px',
    [theme.breakpoints.down('xs')]: {
      height: '360px',
    },
  },
  gridContainer: {
    fontSize: '2rem',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      height: 'auto',
      width: '100vw',
    },
  },
  paper: {
    padding: '10px',
    border: ' 2px solid black',
    margin: '10px',
  },
  fold: {
    width: '270px',
    [theme.breakpoints.down('xs')]: {
      height: '250px',
    },
  },
}));

const VideoPlayer = () => {
  const matches = useMediaQuery('(max-width:280px)');
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={matches ? classes.fold : classes.paper}>
          <Grid item xs={10} md={6}>
            <Typography variant="h5" gutterBottom>
              Account Name: {name || 'Name'}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={matches ? classes.fold : classes.video}
            />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || 'Name'}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
