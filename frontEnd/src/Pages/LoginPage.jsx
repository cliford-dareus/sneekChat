import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FormInput from '../Components/FormInput';
import { Form } from '../Utils/Styles/Global.style';
import { useNavigate } from 'react-router-dom';
import { PageContainer, RegisterCallToAction, RegisterPageFormContainer, RegisterPageTextContainer } from '../Utils/Styles/Register.style';
import { useGlobalContext } from '../Context/GlobalContext';

const LoginPage = () => {
  const Navigate = useNavigate();
  const { saveUser } = useGlobalContext()
  const [ userInfo, setUserInfo ] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  };

  const onSubmit = async(e) => {
    e.preventDefault();

    const { username, password } = userInfo;
    const logInUser = { username, password };

    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/auth/login', logInUser, { 
      withCredentials: true,
      credentials: 'include'});
      saveUser(data.user);
      setUserInfo({ username: '', password: '' });
      connectSocket(data.user.username);
      Navigate('/');
    } catch (error) {
      console.log(error)
    }
  };
  
  return (
    <PageContainer>
      <RegisterPageTextContainer>
        <h1>SneekChat</h1>
        <p>Join Our simple and fun chat app made for friends and all</p>
      </RegisterPageTextContainer>

      <RegisterPageFormContainer>
          <Form onSubmit={onSubmit}>
            <FormInput 
              label='Username'
              type='text'
              name='username'
              value={userInfo.username}
              handleChange={handleChange}
            />

            <FormInput 
              label='Password'
              type='password'
              name='password'
              value={userInfo.password}
              handleChange={handleChange}
            />

            <button
              style={{marginTop: '2em', borderRadius: '2em'}}
            >
              Log In
            </button>

            <RegisterCallToAction>Already have an account? <Link to='/register'>Sign In Here</Link></RegisterCallToAction>
          </Form>
      </RegisterPageFormContainer>
    </PageContainer>
  );
};

export default LoginPage;