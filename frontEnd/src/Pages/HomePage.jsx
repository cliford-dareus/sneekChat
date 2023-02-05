import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connectSocket } from "../Utils/socket";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChatRecentContainer,
  ChatRecentContent,
  ChatRecentPic,
  HomePageContainer,
  HomePageFriendContainer,
  HomePageFriendList,
  HomePageFriendPicContainer,
  HomePageMessageContainer,
  HomePageTopContainer,
} from "../Utils/Styles/Home.style";
import { getAllChats, getAllPastMessage, getAllUsers } from "../Utils/chat.api";
import { useLocalStorage } from "../Utils/useLocalStorage";

const HomePage = () => {
  const useStorage = new useLocalStorage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userQuery = useQuery(["Users"], getAllUsers);
  const chatQuery = useQuery({
    queryKey: ["Chat"],
    queryFn: () => getAllChats(useStorage.getUserId()),
      onSuccess: (data) => {
        connectSocket(useStorage.getUser());
      },
    }
  );

  const startChat = async (id) => {
    // await queryClient.prefetchQuery({
    //   queryKey: ["Private_Chat", id],
    //   queryFn: () => getAllPastMessage(useStorage.getUserId(), id),
    // });
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
              .filter((users) => users._id)
              .map((user) => {
                return (
                  <div key={user._id}>
                    <HomePageFriendPicContainer
                      onClick={() => startChat(user._id)}
                    ></HomePageFriendPicContainer>
                    <p>{user.username}</p>
                    <div
                    // Notifications div
                    ></div>
                  </div>
                );
              })}
          </HomePageFriendList>
        </HomePageFriendContainer>
      </HomePageTopContainer>

      <HomePageMessageContainer>
        <h3>Recent Chat</h3>
        {chatQuery?.data?.data.messages.map((chat) => {
          const { message, sender } = chat;

          return (
            <ChatRecentContainer onClick={() => startChat(sender)}>
              <ChatRecentPic></ChatRecentPic>
              <ChatRecentContent>
                <h4>Sender Name</h4>
                <p>{message[message.length - 1].msg}</p>
              </ChatRecentContent>
              <span>1 day ago</span>
            </ChatRecentContainer>
          );
        })}
      </HomePageMessageContainer>
    </HomePageContainer>
  );
};

export default HomePage;
