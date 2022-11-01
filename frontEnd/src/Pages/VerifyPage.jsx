import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
};

const VerifyPage = () => {
  const query = useQuery();

  const verifyToken = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      },{ 
        withCredentials: true,
        credentials: 'include'});
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
      verifyToken();
  }, []);

  return (
    <div className='page'>
      <h2>Account Confirmed</h2>
      <Link to='/login' className='btn'>
        Please login
      </Link>
    </div>
  );
};

export default VerifyPage;