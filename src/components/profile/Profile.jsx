import React, { useEffect, useRef, useState } from 'react'
import "./Profile.scss"
import {LikeOutlined , DislikeOutlined ,AppstoreOutlined} from "@ant-design/icons"
import { PostService } from '../../services/postService'
import PostCard from '../postCard/PostCard'
import { Button, Form, Input, Modal, Row, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { changePostFailure, changePostStart, changePostSuccess } from '../../store/slice/postSlice'

const Profile = () => {
  const {authSlice, postSlice} = useSelector(state => state);
  const {user } = authSlice;
  const [open, setOpen] = useState(false);
  const [url , setUrl] = useState("")
  const image_rf = useRef();
  const [form] = Form.useForm();
  const [tempId, setTempId] = useState(null)
  const dispatch = useDispatch()
     

  const [myPosts, setMyPosts] = useState([]);
  
  const likeCount = () => {
    let like = 0;
    myPosts.map(item => {
      like += item.like.length;
    })
    return like;
  }
  
  const dislikeCount = () => {
    let like = 0;
    myPosts.map(item => {
      like += item.dislike.length;
    })
    return like;
  }

  
  const getPostId = (id) => {
    setTempId(id);
    setOpen(true);

    let updatedPost = myPosts.find(item => item._id == id);
    
    form.setFieldsValue({
      title: updatedPost.title,
      content: updatedPost.content,
    })
    setUrl(updatedPost.image.url)
    

    
  }

  const OwnPostInfo = async() => {
    try{
      const token = localStorage.getItem("token");
      const data = await PostService.showMyPosts(token);
      setMyPosts(data);
    }catch(error) {
      console.log(error);
    }
  }


  const handleUpdate = async({title, content}) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    dispatch(changePostStart());
    
    if(image_rf.current.files[0]) formData.append("image", image_rf.current.files[0]);
    try{
      const token = localStorage.getItem("token");
      const data = await PostService.updPost(tempId, token, formData)
      message.success(data.message);
      dispatch(changePostSuccess())
    }catch (error) {
      message.error(error.response.data.message);
      dispatch(changePostFailure())
    }
    setOpen(false)
    
  }

  const changingImage = () =>{
    setUrl(URL.createObjectURL(image_rf.current.files[0]));
    
  }
  useEffect(() => {
    OwnPostInfo();
  }, [postSlice.isChange,])

  return (
    <div className='profile'>
      <div className="profile-header">
        <h3 className="name">{user?.name} {user?.surname}</h3>
       
        <p className="email">{user?.email}</p>
        <div className="profile-actions">
          <span>
            
            <h4><AppstoreOutlined/> Posts </h4>
            <p>{myPosts?.length}</p>
          </span>
          <span>
          
            <h4> <LikeOutlined /> Likes</h4>
            <p>{likeCount()}</p>
          </span>
          <span>
            
            <h4> <DislikeOutlined /> Dislikes</h4>
            <p>{dislikeCount()}</p>
          </span>
        </div>
      </div>
      <div className="profile-body">
      <Row gutter={24}>
            {
              myPosts && 
              myPosts.map((post, index) => {
                return (
                  <PostCard getPostId={getPostId} key={index} post={post} allow={true} />
                )
              })
            }
          </Row>

          <Modal open={open} onCancel={() => setOpen(false)} title="Postni o'zgartirish"
          footer={false}>
            <Form form={form} onFinish={handleUpdate}  >
              <Form.Item name="title" rules={[{required: true, message: "Sarlavhani kiriting"}]}>
                <Input  placeholder="Postning sarlavhasi"/>
              </Form.Item>
              <Form.Item name="content" rules={[{required: true, message: "Malumotni kiriting"}]}>
                <Input placeholder="Post haqida batafsil malumot" />
              </Form.Item>
              <Form.Item name={'img'}  >
                <label htmlFor="myImg">
                  <img src={url}  alt="Image" />
                </label>
                <input id='myImg' style={{display: "none" }} type="file" accept='image/*' ref={image_rf} onChange={() => changingImage()} />
              </Form.Item>
              <Button loading={postSlice.isLoading} htmlType='submit'> Saqlash</Button>
            </Form>
          </Modal>
      </div>
    </div>
  )
}

export default Profile