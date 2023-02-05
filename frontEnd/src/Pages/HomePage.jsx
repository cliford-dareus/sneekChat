import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectSocket, socket } from "../Utils/socket";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
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
import { getAllChats } from "../Utils/chat.api";
import { useLocalStorage } from "../Utils/hooks/useLocalStorage";
import { getAllUsers } from "../Utils/user.api";

const HomePage = () => {
  const [msgNotification, setMsgNotification] = useState([]);
  const useStorage = new useLocalStorage();
  const navigate = useNavigate();
  const params = useLocation();

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

      if (isAlreadyDisplay.length === 0 && params.pathname === "/") {
        setMsgNotification([...msgNotification, { id: from, newMessage }]);
        localStorage.setItem(
          "notification",
          JSON.stringify({ from, newMessage })
        );
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
          const { message, sender, time } = chat;
          return (
            <ChatRecentContainer
              key={chat._id}
              onClick={() => startChat(sender)}
            >
              <ChatRecentPic></ChatRecentPic>
              <ChatRecentContent>
                <h4>Sender Name</h4>
                <p>{message[message.length - 1].msg}</p>
              </ChatRecentContent>
              <span>{message[message.length - 1].time}</span>
            </ChatRecentContainer>
          );
        })}
      </HomePageMessageContainer>
    </HomePageContainer>
  );
};

export default HomePage;
