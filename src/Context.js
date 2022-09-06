import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('https://sandesh-server.vercel.app/') || io('http://localhost:5001');

const ContextProvider = ({ children }) => {
  const [isActive, setIsActive] = useState();
  const [idToCall, setIdToCall] = useState('');
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState();
  const [allChat, setAllChat] = useState('');
  const [videoCam, setVideoCam] = useState(true);
  const [onlineData, setOnlineData] = useState({});
  const [chat, setChat] = useState('');
  const [left, setLeft] = useState(false); // using ot differ between left and right message
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const getdata = useCallback(
    (id, Name) => {
      socket.emit('sendId', { username: Name, identity: id });
    },
    [me],
  );
  const [displaySize, setdisplaySize] = useState(false);
  // useEffect(() => {

  // }, []);

  useEffect(() => {
    let w;
    w = window.screen.availWidth;
    function myFunction() {
      setdisplaySize(w.matches);
    }
    w = window.matchMedia('(max-width: 730px)');
    w.addListener(myFunction);
    window.onload = myFunction();
    navigator.mediaDevices
      .getUserMedia({ video: videoCam, audio: true })
      .then((currentStream) => {
        if (videoCam) {
          setStream(currentStream);
        } else {
          currentStream.getTracks().forEach((track) => {
            track.stop();
          });
        }
        myVideo.current.srcObject = currentStream;
      });
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, [videoCam]);
  if (!name) {
    setName(prompt('Please enter your ID:').toUpperCase());
  }
  const createRoom = async (id) => {
    socket.emit('send', { userId: id, name, mge: chat });
    setLeft(false);
    setAllChat(`${name}:
    ${chat}`);
    setChat('');
  };

  socket.on('received', ({ somedata, senderName }) => {
    setLeft(true);
    setAllChat(`${senderName}:
    ${somedata}`);
    setChat('');
  });
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };
  socket.on('connect', () => {
    setMe(socket.id);
    getdata(socket.id, name);
  });

  socket.on('recievedId', (id) => {
    setOnlineData(id);
  });

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const leaveCall = (id) => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
    socket.emit('endCall', { userID: id });
  };

  socket.on('hangUpCall', () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  });

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        createRoom,
        chat,
        left,
        onlineData,
        setChat,
        allChat,
        setVideoCam,
        videoCam,
        idToCall,
        setIdToCall,
        displaySize,
        setIsActive,
        isActive,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
