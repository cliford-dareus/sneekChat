import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import socket from '../Utils/socket';
import { useLocation } from "react-router-dom";
import { useGlobalContext } from '../Context/GlobalContext';
import axios from 'axios';
import { useRef } from 'react';
import { ChatBodyContainer, ChatBubble, ChatPageContainer, ChatPageForm, ChatPageTop } from '../Utils/Styles/Chat.style';
import { Form, InputField } from '../Utils/Styles/Global.style';

const ChatPage = () => {
  const [ arrivalMsgs, setArrivalMsgs ] = useState(null);
  const [ messages, setMessages ] = useState([]); //Add Timestamps for the messages
  const [ text, setText ] = useState('');
  const { user } = useGlobalContext();
  const scrollRef = useRef();
  
  const params = useLocation()
  const to = params.search.slice(1)

  const getAllPastMessage = async () => {
    try {
    const { data } = await axios.post(`http://localhost:5000/api/v1/msg/getmsg`,{
        from: user.userId,
        to: to
    });
    setMessages(data[0].message);
    // console.log(data[0].message);
    } catch (error) {
        console.log(error);
    };
  };

  const sendmessages = async(e) => {
    e.preventDefault();
    setText('');

    const today = new Date();
    const time = today.toLocaleTimeString();

    socket.emit('private_message', {
      msg: text,
      fromSelf: user.userId,
      to, 
      time
    });

    await axios.post(`http://localhost:5000/api/v1/msg/addmsg`, {
      from: user.userId,
      to: to,
      message: {
        msg: text,
        fromSelf: user.userId,
        time: time,
      },
    });

    const msgs ={msg: text, fromSelf: user.userId, time };
    setMessages((prev) => [...prev, msgs]);
    console.log('message sent');
  };

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value)
  };

  useEffect(() => {
    socket.on("private_message", ({ msg, from, time }) => {
      setArrivalMsgs({ msg , fromSelf: from, time });
    });
    getAllPastMessage();
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
        ChatPage
      </ChatPageTop>

      <ChatBodyContainer>
        {messages.map((item)=> {
          const isFromSelf = item.fromSelf === user.userId
          return(
            <ChatBubble 
              fromSelf={isFromSelf}
              ref={scrollRef}
            >
              <p>{item.msg}</p>
            </ChatBubble>
          )
        })}
        
      </ChatBodyContainer>
      <ChatPageForm>
        <Form 
          style={{
            flexDirection: 'row',
            width: '100%'
          }} 
          onSubmit={sendmessages}
        >
          <InputField 
            type="text" 
            value={text}
            onChange={handleChange}
          />
          <button >send</button>
        </Form>
        
      </ChatPageForm>
    </ChatPageContainer>
    
  );
};

export default ChatPage;