import React, { useState, useEffect, useRef } from "react";
import { socket } from "../Utils/socket";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, InputField } from "../Utils/Styles/Global.style";
import { useMutation } from "@tanstack/react-query";
import {
  ChatBodyContainer,
  ChatBubble,
  ChatPageContainer,
  ChatPageForm,
  ChatPageTop,
} from "../Utils/Styles/Chat.style";
import { getAllPastMessage } from "../Utils/chat.api";
import { useLocalStorage } from "../Utils/useLocalStorage";

const ChatPage = () => {
  const useStorage = new useLocalStorage();
  const [user, setUser] = useState(useStorage.getUser());
  const [arrivalMsgs, setArrivalMsgs] = useState(null);
  const [messages, setMessages] = useState([]); //Add Timestamps for the messages
  const [text, setText] = useState("");
  const scrollRef = useRef();

  const params = useLocation();
  const to = params.search.slice(1);

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["Users"]);

  const msgQuery = useQuery(
    ["Private_Chat"],
    () => getAllPastMessage(user.userId, to),
    {
      onSuccess: (data) => {
        console.log(data)
        setMessages(data?.data[0].message);
      },
    }
  );

  const sendmessages = async (e) => {
    e.preventDefault();
    setText("");

    const today = new Date();
    const time = today.toLocaleTimeString();

    socket.emit("private_message", {
      msg: text,
      fromSelf: user.userId,
      to,
      time,
    });

    const msgs = { msg: text, fromSelf: user.userId, time };
    setMessages((prev) => [...prev, msgs]);
    console.log("message sent");

    await axios.post(`http://localhost:5000/api/v1/msg/addmsg`, {
      from: user.userId,
      to: to,
      message: {
        msg: text,
        fromSelf: user.userId,
        time: time,
      },
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  useEffect(() => {
    socket.on("private_message", ({ msg, from, time }) => {
      if (from === to) {
        setArrivalMsgs({ msg, fromSelf: from, time });
      }
    });
  }, []);

  useEffect(() => {
    arrivalMsgs && setMessages((prev) => [...prev, arrivalMsgs]);
  }, [arrivalMsgs]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatPageContainer>
      <ChatPageTop>
        {data?.data.users
          .filter((user) => user._id === to)
          .map((user) => (
            <strong>{user.username}</strong>
          ))}
      </ChatPageTop>

      <ChatBodyContainer>
        {messages?.map((item) => {
          const isFromSelf = item.fromSelf === user.userId;
          return (
            <ChatBubble fromSelf={isFromSelf} ref={scrollRef}>
              <p>{item.msg}</p>
            </ChatBubble>
          );
        })}
      </ChatBodyContainer>
      <ChatPageForm>
        <Form
          style={{
            flexDirection: "row",
            width: "100%",
          }}
          onSubmit={sendmessages}
        >
          <InputField type="text" value={text} onChange={handleChange} />
          <button>send</button>
        </Form>
      </ChatPageForm>
    </ChatPageContainer>
  );
};

export default ChatPage;
