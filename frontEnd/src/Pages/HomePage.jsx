import React, { useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import socket from '../Utils/socket';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatRecentContainer, ChatRecentContent, ChatRecentPic, HomePageContainer, HomePageFriendContainer, HomePageFriendList, HomePageFriendPicContainer, HomePageMessageContainer, HomePageTopContainer } from '../Utils/Styles/Home.style';
import { getAllChats, getAllUsers } from '../Utils/chat.api';

const HomePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // queryClient.invalidateQueries('Users');

  const userQuery = useQuery(['Users'], getAllUsers );
  const chatQuery = useQuery(['Chat'], getAllChats );

  const startChat = async (id) => {
      navigate(`/chat/?${id}`);
  };

  return (
    <HomePageContainer>
      <HomePageTopContainer>
        <h3>Welcome, back!</h3>
        <strong></strong>
        <HomePageFriendContainer>
          <h3>New Sneeks</h3>

          <HomePageFriendList>
              {userQuery.data?.data.users
                .filter((users)=> users._id)
                .map((user) => {
              return(
                <div key={user._id}>
                  <HomePageFriendPicContainer
                    onClick={() => startChat(user._id)}
                  >
                  </HomePageFriendPicContainer>
                  <p>{user.username}</p>
                  <div
                    // Notifications div
                  >
                  </div>
                </div>
                
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