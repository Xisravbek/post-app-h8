import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Card, Row, Col, Skeleton, Popconfirm } from 'antd';
import "./Home.scss"
import { useDispatch, useSelector } from 'react-redux';
import { getAllFailure, getAllStart, getAllSuccess } from '../../store/slice/postSlice';
import { PostService } from '../../services/postService';
import PostCard from '../../components/postCard/PostCard';
import { Link, Route, Routes } from 'react-router-dom';
import AddPost from '../../components/addPost/AddPost';
import Profile from '../../components/profile/Profile';
import { items } from './items';
const { Header, Sider, Content } = Layout;

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

const Home = () => {
  const { authSlice, postSlice } = useSelector(state => state);
  const {user }  = authSlice;
  const { isChange } = postSlice;
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setUserInfo ] = useState({posts: 0, like: 0, dislike: 0});
  

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useDispatch();
  const [postList, setPostList ] = useState()

  const handleAllPost = async () => {
    dispatch(getAllStart());
    try {
      const data = await PostService.getAll();
      setPostList(data);
      dispatch(getAllSuccess())

      let posts = 0;
      let like = 0;
      let dislike = 0
      data.forEach(item => {
        if(item.authorId == user?._id) {
          posts += 1; 
          like += item.like.length;
          dislike += item.dislike.length;
        }
      });
      setUserInfo({
        posts, like, dislike 
      });

    } catch (error) {
      console.log(error);
      dispatch(getAllFailure())
    }
  };


  useEffect(() => {

    handleAllPost();
  }, [user, isChange])
  return (
    <div>
      
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" >
          <h3 style={collapsed ? {fontSize: "12px"} : {}}>Post App</h3>
        </div>
        {user && 
        <div className="author">
        <div className="author-img">
          <img alt="aa" src={user.avatar ? user.avatar : "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"}/>
        </div>
        {
          !collapsed  &&<div className="author-title">
          <Link to={"/profile"}><h5>{user.name} {user.surname}</h5></Link>
          <p>{user.email}</p>
        </div>
        }
        <div className="author-info" style={collapsed ? {flexDirection: "column"} : {}}>
          <div>
            <h6>{userInfo.posts}</h6>
            <p>Posts</p>
          </div>
          <div>
            <h6>{userInfo.like}</h6>
            <p>Likes</p>
          </div>
          <div>
            <h6>{userInfo.dislike}</h6>
            <p>Dislikes</p>
          </div>

        </div>
      </div>}
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[...items, {
            key: '7',
            icon: <UploadOutlined />,
            label: <Popconfirm onConfirm={handleLogout} title="Are you sure logout?" okText="logout" cancelText="cancel">
              <Button type='' style={{color: 'red', padding: 0}}>Log out</Button>
            </Popconfirm>,
          }]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px 0 0"
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Link to={'/add-post'}>
            <Button icon={<PlusOutlined /> }>Add Post </Button>
          </Link>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
         <Routes>
          <Route  path='/' element={ <Row gutter={24}>
            {
              postList ? 
              postList.map((post, index) => {
                return (
                  <PostCard key={index} post={post} allow={false} />
                )
              }) : 
            
              <Skeleton active /> 
            }
          </Row>}/>
          <Route path='/add-post' element={<AddPost />} /> 
          <Route path='/profile' element={<Profile />} />
         </Routes>

        </Content>
      </Layout>
    </Layout>
      
    </div>
  )
}

export default Home