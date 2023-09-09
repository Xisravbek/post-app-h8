import React from 'react'
import "./Login.scss";
import { AuthService } from '../../services/AuthService';
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from '../../store/slice/authSlice';
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const {isLoading} = useSelector(state => state.authSlice);
    const navigate = useNavigate()

    const handleLogin = async (user) => {
        console.log(user);
        dispatch(loginStart());
        try{
            const data = await AuthService.login(user);
            console.log(data);
            dispatch(loginSuccess(data.user));
            toast.success(data.message);
            localStorage.setItem("token",data.token);
            localStorage.setItem("user", JSON.stringify(data.user))
            navigate("/");

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
            dispatch(loginFailure())
        }
    }
  return (
    <div className='login'>
        
        <div className="login-content">
            <div className="left">
                {/* <img src="./nun.png" alt="IMG" /> */}
                
            </div>
            <div className="right" >
                <Form from={form} onFinish={handleLogin}>
                    <h2>Post App</h2>
                    <Form.Item  name="email">
                        <Input placeholder="email" />

                    </Form.Item>
                    <Form.Item name="password">
                        <Input type='password' className='password-inp' placeholder="password" />
                    </Form.Item>
                    <Button loading={isLoading} htmlType="submit" >Log In</Button>
                </Form>

                <p>Don't have an account? <Link to="/register" >Register</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login