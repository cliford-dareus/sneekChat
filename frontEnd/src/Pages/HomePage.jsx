import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectSocket, socket } from "../Utils/socket";
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
import { getAllChats, getAllUsers } from "../Utils/chat.api";
import { useLocalStorage } from "../Utils/useLocalStorage";

const HomePage = () => {
  const [msgNotification, setMsgNotification] = useState([]);
  const useStorage = new useLocalStorage();
  const navigate = useNavigate();
  const userQuery = useQuery(["Users"], getAllUsers);

  const chatQuery = useQuery({
    queryKey: ["Chat"],
    queryFn: () => getAllChats(useStorage.getUserId()),
    onSuccess: (data) => {
      connectSocket(useStorage.getUser());
    },
  });

  const startChat = async (id) => {
    // await queryClient.prefetchQuery({
    //   queryKey: ["Private_Chat", id],
    //   queryFn: () => getAllPastMessage(useStorage.getUserId(), id),
    // });
    navigate(`/chat/?${id}`);
  };

  useEffect(() => {
    socket.on("notification", ({ from, newMessage }) => {
      const isAlreadyDisplay = msgNotification.filter((msg) => {
        return msg.id == from;
      });

      console.log(isAlreadyDisplay);

      if (isAlreadyDisplay.length == 0) {
        console.log("runnig");
        setMsgNotification([...msgNotification, { id: from, newMessage }]);
      }
    });
  }, []);

  return (
    <HomePageContainer>
      <HomePageTopContainer>
        <h3>Welcome, back!</h3>
        <strong>{useStorage.getUser().username}</strong>
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
