import React ,{useRef} from 'react'
import "./Register.scss";
import { Button, Divider, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerFailure, registerStart, registerSuccess } from '../../store/slice/authSlice';
import { AuthService } from '../../services/AuthService';
import { toast } from 'react-toastify';


const Register = () => {
    const dispatch = useDispatch();
    const {isLoading } = useSelector(state => state.authSlice);

    const navigate = useNavigate();

    const handleRegister = async(user) => {
        dispatch(registerStart());
        try{
            const data = await AuthService.register(user);
            dispatch(registerSuccess());
            toast.success(data.message);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
        }catch ( error ) {
            toast.error(error.response.data.message);
            console.log(error);
            dispatch(registerFailure())
        }
    }
    const [ form ] = Form.useForm();
  return (
    <div className='register'>
        <div className="register-content">
            <Form from={form} onFinish={handleRegister}>
                <h2>Post App</h2>
                <p>Sign up to see photos and videos from your friends</p>
                <Divider>OR</Divider>
                <Form.Item name="name">
                    <Input placeholder="name"   />
                </Form.Item>
                <Form.Item name="surname">
                    <Input placeholder="surname" />
                </Form.Item>
                <Form.Item name="email">
                    <Input placeholder="email" />
                </Form.Item>
                <Form.Item name="password">
                    <Input placeholder="password"  />
                </Form.Item>
                <Button loading={isLoading} htmlType='submit' >Register</Button>
            </Form>
            <p>Have an account? <Link to="/login">Log In</Link></p>
        </div>
    </div>
  )
}

export default Register