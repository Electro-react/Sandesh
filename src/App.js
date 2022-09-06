import React, { useContext } from 'react';
import Desktop from './desktop';
import Mobile from './Mobile';
import { SocketContext } from './Context';

const App = () => {
  const { displaySize } = useContext(SocketContext);
  return <>{displaySize ? <Mobile /> : <Desktop />}</>;
};

export default App;
