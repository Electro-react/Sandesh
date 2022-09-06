/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment } from '@material-ui/icons';
import { SocketContext } from '../Context';

const useStyles = makeStyles(() => ({
  UserOnlineDesktop: {
    display: 'grid',
    fontSize: '1rem',
    gridTemplateRows: '8% 92%',
    width: '30vw',
    height: '70vh',
  },
  UserOnlineMobile: {
    display: 'grid',
    gridTemplateRows: '8% 92%',
    width: '100vw',
    height: '100vh',
  },
  red: {
    fontSize: '1.5rem',
    width: '100vw',
    color: 'cyan',
  },
  none: {
    fontSize: '1.5rem',
    width: '449px',
    color: 'none',
  },
}));

const UserOnlineData = () => {
  const { onlineData, me, displaySize } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      <section
        className={
          displaySize ? classes.UserOnlineMobile : classes.UserOnlineDesktop
        }
        style={{ maxHeight: '100%', overflow: 'auto' }}
      >
        <header
          style={{
            display: 'grid',
            gridTemplateColumns: '70% 30%',
            color: 'black',
            backgroundColor: '#03DAC5',
            fontWeight: 'bold',
            padding: '5px',
          }}
        >
          Online User{' '}
          <CopyToClipboard text={me} className={classes.margin}>
            <Button
              size="large"
              fullWidth
              startIcon={<Assignment fontSize="large" />}
              title=" Click to Copy Your ID"
            />
          </CopyToClipboard>
        </header>
        <ul>
          {Object.entries(onlineData).map(([key, value], index) => {
            if (me !== key) {
              return <List code={key} item={value} Index={index} />;
            }
          })}
        </ul>
      </section>
    </Grid>
  );
};

const List = (props) => {
  const classes = useStyles();
  const { item, code, Index } = props;
  const { setIdToCall, setIsActive, isActive } = useContext(SocketContext);
  // eslint-disable-next-line no-console
  console.log(isActive);
  // eslint-disable-next-line no-console
  console.log('index:', Index);
  return (
    <div>
      <CopyToClipboard text={code}>
        <ui
          className={isActive === Index ? classes.red : classes.none}
          title="please click to chat with online user"
          onClick={() => {
            setIdToCall(code);
            setIsActive(Index);
          }}
        >
          {item}
        </ui>
      </CopyToClipboard>
    </div>
  );
};

export default UserOnlineData;
