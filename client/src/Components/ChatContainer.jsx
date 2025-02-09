import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchChatRooms } from "../Redux/ChatSlice";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeletons/MessageSkeleton";
import { formatMessageTime } from "../Lib/utils";
import userIcon from "../../public/UserIcon.png";
import { getSocket } from "../SocketService/SocketIoService";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const { room, participants, messages, isMessagesLoading } = useSelector(
    (state) => state.chat
  );

  const receiver = participants?.find((u) => u._id !== user.id);
  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      console.error("❌ Socket is not connected.");
      return;
    }

    console.log("✅ Socket connected successfully!"); 

    socket.on("chatMessage", (newMessage) => {
      console.log("📩 New message received:", newMessage);
      dispatch(fetchChatRooms());
      if (newMessage.room === room) {
        dispatch(addMessage(newMessage));
      } else {
        console.log("❌ Message does not belong to this room, ignoring.");
      }
    });

    return () => {
      socket.off("chatMessage"); 
    };
  }, [dispatch, messages, room]);

  useEffect(() => {
    const socket = getSocket();
    if (room) {
      
      socket.emit("join room", room);
    }
  }, [room]);

  useEffect(() => {
    scrollBottom();
  }, [messages]);
  const scrollBottom = () => {
    
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        {messages?.map((message, index) => (
          <div
            // key={message._id}
            key={index}
            className={`chat ${
              message.sender === user.id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.sender === user.id
                      ? user.profilepic || userIcon
                      : receiver?.profilepic || userIcon
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.timestamp)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
              <div ref={messageEndRef}></div>
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
