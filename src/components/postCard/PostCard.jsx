import { CommentOutlined, DislikeOutlined, EyeOutlined, LikeOutlined, UserOutlined, DeleteOutlined, EditOutlined, DislikeFilled } from '@ant-design/icons'
import { Button, Card, Col, message } from 'antd'
import React from 'react'
import PostImageChecker from '../PostImageChecker';
import "./PostCard.scss";
import { Link } from 'react-router-dom';
import { PostService } from '../../services/postService';
import { useDispatch, useSelector } from 'react-redux';
import { changePostFailure, changePostStart, changePostSuccess } from '../../store/slice/postSlice';
import { ReactionsService } from '../../services/ReactionService';

const PostCard = ({post, allow, getPostId }) => {

  const {user} = useSelector(state => state.authSlice)

    const {_id,views,  image,content,  author, title,  like, dislike, comments } = post;
    const {name, surname } = author[0];
    const dispatch = useDispatch();
    const { url } = image;

 

    const delatePost = async () => {
      dispatch(changePostStart())
      try{
        const token = localStorage.getItem("token");
        let id = _id;
        const data = await PostService.delatePost(id, token);
        message.success(data.message);
        dispatch(changePostSuccess())
      }catch(error) {
        message.error(error.response.data.message)
        dispatch(changePostFailure())
      }
    }

    const handleLike = async(id) => {
      dispatch(changePostStart())
      try{
        const token = localStorage.getItem("token");
        const data = await ReactionsService.getLikes(id, token);
        message.success(data.message)
        dispatch(changePostSuccess())

      }catch(error){
        message.error(error.response.data.message);
        dispatch(changePostFailure())
      }
    }

    const handleDisike = async(id) => {
      dispatch(changePostStart())
      try{
        const token = localStorage.getItem("token");
        const data = await ReactionsService.getDislike(id, token);
        message.success(data.message)
        dispatch(changePostSuccess())


      }catch(error){
        message.error(error.response.data.message)
        dispatch(changePostFailure());
      }
    }


  return (
          <Col  xs={24} sm={24} md={12} lg={8}>
               <div className="post-card">
               <Card hoverable cover={<Link to={`/post/${_id}`}>{<PostImageChecker url={url} />}</Link>} >
                      <div className="author">
                        <UserOutlined /> {name } {surname}
                      </div>
                      <div className="body">
                        <h3>{title}</h3>
                        <p>
                          {content}
                        </p>
                      </div>
                      <div className="footer d-flex gap-3">
                        <span onClick={() => handleLike(_id)} style={post.like.find(id => id === user?._id) && {color: "red"}}>
                          <LikeOutlined /> {like.length} 
                        </span>     
                        <span onClick={() => handleDisike(_id) } >
                          { post.dislike.find(id => id === user?._id) ? <DislikeFilled /> : <DislikeOutlined/>}
                           {dislike.length} </span>   
                          <span >
                            <CommentOutlined /> {comments.length}  
                           </span>     
                           <span>
                            <EyeOutlined /> {views}
                            </span>    
                            {allow && <div>
                              <span>
                              <Button icon={<DeleteOutlined/>} onClick={delatePost}></Button>
                              
                            </span>
                            <span>
                              <Button onClick={() => getPostId(_id)} icon={<EditOutlined/>}></Button>
                            </span>
                            </div> }   
                       </div>
                    </Card>
                </div>   
                  </Col>
  )
}

export default PostCard