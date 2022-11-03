import React, { useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../Context/GlobalContext';
import axios from 'axios';
import socket from '../Utils/socket';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatRecentContainer, ChatRecentContent, ChatRecentPic, HomePageContainer, HomePageFriendContainer, HomePageFriendList, HomePageFriendPicContainer, HomePageMessageContainer, HomePageTopContainer } from '../Utils/Styles/Home.style';

const HomePage = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const getAllUsers = () => {
    const data  = axios.get(`http://localhost:5000/api/v1/users`, { 
    withCredentials: true,
    credentials: 'include'})
    .then((res) => res)
    return data;
  };

  const getAllChats = async () => {
    const { data } = await axios.post(`http://localhost:5000/api/v1/msg/getAllmsg`, {from: user.userId}, { 
    withCredentials: true,
    credentials: 'include'});
    return data
  };

  const userQuery = useQuery({ queryKey:['Users'], queryFn: getAllUsers });
  const chatQuery = useQuery({ queryKey:['Chat'], queryFn: getAllChats });
  queryClient.refetchQueries({ queryKey: ['Chat'] });

  const startChat = async (id) => {
      navigate(`/chat/?${id}`);
      console.log(id)
  };

  return (
    <HomePageContainer>
      <HomePageTopContainer>
        <h3>Welcome, back!</h3>
        <strong>{user.username}</strong>
        <HomePageFriendContainer>
          <h4>New Sneeks</h4>

          <HomePageFriendList>
              {userQuery.data?.data.users
                .filter((users)=> users._id !== user.userId)
                .map((user) => {
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
        {chatQuery.data?.messages?.map((chat)=>{
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