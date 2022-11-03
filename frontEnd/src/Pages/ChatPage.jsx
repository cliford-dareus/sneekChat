import React, { useState, useEffect, useRef }  from 'react';
import socket from '../Utils/socket';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useGlobalContext } from '../Context/GlobalContext';
import { useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import { Form, InputField } from '../Utils/Styles/Global.style';
import { ChatBodyContainer, ChatBubble, ChatPageContainer, ChatPageForm, ChatPageTop } from '../Utils/Styles/Chat.style';

const ChatPage = () => {
  const [ arrivalMsgs, setArrivalMsgs ] = useState(null);
  const [ messages, setMessages ] = useState([]); //Add Timestamps for the messages
  const [ text, setText ] = useState('');
  const { user } = useGlobalContext();
  const scrollRef = useRef();
  
  const params = useLocation();
  const to = params.search.slice(1);

  const queryClient = useQueryClient();

  const { data } = queryClient.getQueryData(['Users']);
 
  const getAllPastMessage = async () => {
    const { data } = await axios.post(`http://localhost:5000/api/v1/msg/getmsg`,{
        from: user.userId,
        to: to
    });
    setMessages(data[0]?.message);
    return data[0]?.message;
  };

  const msgQuery = useQuery({ queryKey: ['message'], queryFn: getAllPastMessage });

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

    const msgs ={msg: text, fromSelf: user.userId, time };
    setMessages((prev) => [...prev, msgs]);
    console.log('message sent');

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
    getAllPastMessage();
    socket.on("private_message", ({ msg, from, time }) => {
      if(from === to){
        setArrivalMsgs({ msg , fromSelf: from, time });
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
        { data?.users.filter(user => user._id === to).map(user => (<strong>{user.username}</strong>))}
      </ChatPageTop>

      <ChatBodyContainer>
        {messages?.map((item)=> {
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