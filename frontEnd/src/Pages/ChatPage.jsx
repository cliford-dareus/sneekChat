import React, { useState, useEffect, useRef } from "react";
import { socket } from "../Utils/socket";
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
import { getAllPastMessage, sendMsg } from "../Utils/chat.api";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ChatPage = () => {
  const [user, setUser] = useState(useLocalStorage.getUser());
  const [arrivalMsgs, setArrivalMsgs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const scrollRef = useRef();

  const params = useLocation();
  const to = params.search.slice(1);

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(["Users"]);

  queryClient.invalidateQueries({
    queryKey: ["Pivate_Chat", to],
  });

  const msgQuery = useQuery({
    queryKey: ["Private_Chat", to],
    queryFn: () => getAllPastMessage(user.userId, to),
    onSuccess: (data) => {
      if (!messages && data?.data.length == 0){
        setMessages(data?.data[0]?.message);
        return
      }
    },
    // staleTime: 5000, 
    refetchInterval: 10000
  });

  const sendMsgMutation = useMutation({
    mutationFn: ({ userId, to, text, time }) => {
      return sendMsg(userId, to, text, time);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Private_Chat", to] });
      queryClient.invalidateQueries({ queryKey: ["Chat"] });
    },
  });

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

    sendMsgMutation.mutate({ userId: user.userId, to, text, time });
    setMessages((prev) => [...prev, msgs]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  useEffect(() => {
    if (!messages == 0 && msgQuery?.data?.data.length == 0) return;
    setMessages(msgQuery?.data?.data[0]?.message);
  }, [msgQuery.isSuccess]);

  useEffect(() => {
    socket.on("private_message", ({ msg, from, reciepient, time }) => {
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
        {userData?.data.users
          .filter((user) => user._id === to)
          .map((user) => (
            <strong key={user._id}>{user.username}</strong>
          ))}
      </ChatPageTop>

      <ChatBodyContainer>
        {msgQuery.isFetched &&
          messages?.map((item) => {
            const isFromSelf = item.fromSelf === user.userId;
            return (
              <ChatBubble key={item._id} fromSelf={isFromSelf} ref={scrollRef}>
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
