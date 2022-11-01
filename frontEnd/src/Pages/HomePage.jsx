import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../Context/GlobalContext';
import axios from 'axios';
import socket from '../Utils/socket';
import { ChatRecentContainer, ChatRecentContent, ChatRecentPic, HomePageContainer, HomePageFriendContainer, HomePageFriendList, HomePageFriendPicContainer, HomePageMessageContainer, HomePageTopContainer } from '../Utils/Styles/Home.style';

const HomePage = () => {
  const [ users, setUsers ] = useState([]);
  const [ chats, setChats ] = useState([]);
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const socket = useRef();

  const getAllUsers = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/users`, { 
        withCredentials: true,
        credentials: 'include'});
        const filteredUsers = data.users.filter((users)=> users._id !== user.userId)
        setUsers(filteredUsers);
      } catch (error) {
        console.log(error);
      };  
  };

  const getAllChats = async () => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/v1/msg/getAllmsg`, {from: user.userId}, { 
        withCredentials: true,
        credentials: 'include'});
        console.log(data.messages);
        setChats(data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  const startChat = async (id) => {
    try {
      navigate(`/chat/?${id}`);
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(()=>{
    getAllUsers();
    getAllChats();
  },[]);

  return (
    <HomePageContainer>
      <HomePageTopContainer>
        <h3>Welcome, back!</h3>
        <strong>{user.username}</strong>
        <HomePageFriendContainer>
          <h4>New Sneeks</h4>

          <HomePageFriendList>
              {users.map((user) => {
              return(
                <HomePageFriendPicContainer
                  onClick={() => startChat(user._id)}
                >
                  {user.username}
                </HomePageFriendPicContainer>
              )
            })}
          </HomePageFriendList>
        </HomePageFriendContainer>
      </HomePageTopContainer>

      <HomePageMessageContainer>
        <h3>Recent Chat</h3>
        {chats && chats.map((chat)=>{
          const { message, sender } = chat;
          return(
            <ChatRecentContainer
              onClick={() => startChat(sender)}
            >
              <ChatRecentPic></ChatRecentPic>
              <ChatRecentContent>
                <h4>Sender Name</h4>
                <p>{message[message.length - 1].msg}</p>
              </ChatRecentContent>
              <span>1 day ago</span>
            </ChatRecentContainer>
          )
        })}
      </HomePageMessageContainer>
    </HomePageContainer>
  );
};

export default HomePage;