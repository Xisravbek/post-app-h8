import React, { useEffect, useState } from 'react';
import Home from './pages/home/Home';
import {Route, Routes, useNavigate } from "react-router-dom"
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useDispatch } from 'react-redux';
import PostId from './pages/postId/PostId';
import { axiosInstance } from './services/axiosInstance';
import { PostService } from './services/postService';
import { loginSuccess } from './store/slice/authSlice';



const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin ] = useState(false)

  const checkUser = async(token) => {
    try{
      await PostService.showMyPosts(token);
      setIsLogin(true)
      dispatch(loginSuccess(JSON.parse(localStorage.getItem("user"))))
      let path = window.location.pathname;
      if(path.includes("/login") || path.includes("/register") ){
        navigate("/")
      }
    }catch (error) {
      console.log(error);
      navigate("/login")
    }
  }


  useEffect(() => {
    let token = localStorage.getItem("token");
    checkUser(token)
  }, [])
  return (
    <>
  <Routes>
    <Route  path={"/*"} element={<Home />} />
    {!isLogin && <Route path="/login" element={<Login/>} />}
    <Route path='/register' element={<Register />} />
    <Route path='/post/:id' element={<PostId />} />
  </Routes>
    </>
  )
}

export default App