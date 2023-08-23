import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

import axiosInstance from '../utils/axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleRegisterForm = async (e) => {
    try {
      e.preventDefault();
      await axiosInstance.post('user/register', {
        name,
        email,
        password,
      });
      toast.success('Registration successful. Now you can login');
      setRedirect(true);
    } catch (err) {
      if (err.response) {
        const { message } = err.response.data;
        toast.error(message);
      } else if (err.request) {
        toast.error(err.request);
      } else {
        console.log('Error: ', err.message);
      }
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mt-4 grow flex justify-around items-center p-4 md:p-0">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handleRegisterForm}>
          <input
            type="text"
            placeholder="John Doe"
            className='bg-slate-100 text-black'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className='bg-slate-100 text-black'
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className='bg-slate-100 text-black'
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="mx-auto my-4 flex bg-primary text-white py-2 px-20 rounded-full font-semibold text-xl">Register</button>
          <div className="text-center py-2 text-slate-100">
            Already a member?{" "}
            <Link className="text-white underline" to={'/login'}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
