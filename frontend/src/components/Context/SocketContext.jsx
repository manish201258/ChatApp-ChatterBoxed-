import { createContext, useContext, useEffect, useState } from "react";
import { UseAuth } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { isAuthenticated, currentUser } = UseAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    if (currentUser) setCurrentUserId(currentUser._id);
  }, [currentUser]);

  useEffect(() => {
    if (isAuthenticated && currentUserId) {
      const newSocket = io("http://localhost:3000/", {
        query: {
          userId: currentUserId,
        },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [isAuthenticated, currentUserId]);

  return (
    <SocketContext.Provider value={{ onlineUsers,socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const UseSocketContext = () => useContext(SocketContext);
