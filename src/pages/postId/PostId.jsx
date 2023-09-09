import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { PostService } from '../../services/postService';
import { Button, Col, Input, Row, message, Modal } from 'antd';
import PostImageChecker from '../../components/PostImageChecker';
import { DislikeOutlined, EditOutlined, EyeOutlined, LikeOutlined, DeleteOutlined, SendOutlined, UserOutlined, DislikeFilled } from '@ant-design/icons';
import moment from 'moment/moment';
import { CommentService } from '../../services/CommentService';
import { useDispatch, useSelector } from 'react-redux';
import "./PostId.scss"
import { changeComFailure, changeComStart, changeComSuccess } from '../../store/slice/commentSlice';
import { ReactionsService } from '../../services/ReactionService';


const PostId = () => {
    const {id} = useParams();
    const [post, setPost ] = useState(null);
    const { authSlice, commentSlice } = useSelector(state => state);
    const {user} = authSlice;
    const {isLoading, isChange } = commentSlice;
    const [tempId, setTempId] = useState(null);
    const editInput = useRef();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = async (id) => {
      setIsModalOpen(true);
      setTempId(id)
      let editingComment = await post.comments.find(item => item._id === id);
      editInput.current.value = editingComment.content;

    };
    const handleOk = async () => {
        dispatch(changeComStart())
      try{
        const token = localStorage.getItem("token")
        const data = await CommentService.updComment(token, tempId, { content: editInput.current.value})
        message.success(data?.message);
        dispatch(changeComSuccess())
    }catch (error) {
        console.log(error);
        message.error(error.response.data.message)
        dispatch(changeComFailure())
    }
    setIsModalOpen(false);

    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };


    const handleOnePost = async() => {
        try{
            const data = await PostService.getPostById(id)
            setPost(data[0]);
            setComments(data[0].comments.reverse())
        }catch (error) {
            console.log(error);
        }
    }
    const content = useRef();

    const submitComment = async () => {
        dispatch(changeComStart())
        try{
            const token = localStorage.getItem("token");
            const comment = {
                postId: id, content: content.current.value,
            }
            const data = await CommentService.addComment(token, comment)
            message.success(data.message);
            dispatch(changeComSuccess())
        }catch (error) {
            message.error(error.response.data.message)
            dispatch(changeComFailure())
        }
        content.current.value = "";
    }
    const delateComment = async( id) => {
        dispatch(changeComStart())
        try{
            const token = localStorage.getItem("token");
            const data = await CommentService.delComment(token, id);
            message.success(data.message);
            dispatch(changeComSuccess())
        }catch (error) {
            message.error(error.response.data.message)
            dispatch(changeComFailure())
        }
    }

    const tapLike = async () => {
        dispatch(changeComStart())
        try{
            const token = localStorage.getItem("token");
            const data = await ReactionsService.getLikes(id, token);
            message.success(data.message)
            dispatch(changeComSuccess())
        }catch(error) {
            message.error(error.response.data.message);
            dispatch(changeComFailure())
        }
        
    }

    const tapDislike = async () => {
        dispatch(changeComStart())
        try{
            const token = localStorage.getItem("token");
            const data = await ReactionsService.getDislike(id, token);
            message.success(data.message)
            dispatch(changeComSuccess())
        }catch(error) {
            message.error(error.response.data.message);
            dispatch(changeComFailure())
        }
    }

    

    useEffect(() => {
        handleOnePost();
    } , [id, isChange])
  return (
    <div className='post-id'>
        {post ?
        (<Row>
            <Col span={12} className='img-span'>
                <PostImageChecker url={post.image.url}/>
                <div className="actions">
                        <span onClick={tapLike} style={post.like.find(item => item == user?._id) ? {color: "red" } : { }}>
                            <LikeOutlined /> {post.like.length}
                        </span>
                        <span onClick={tapDislike}>
                            {
                                post.dislike.find(item => item == user?._id) ? <DislikeFilled /> : <DislikeOutlined />
                            }
                             {post.dislike.length}
                        </span>
                        <span>
                            <EyeOutlined /> {post.views}
                        </span>
                    </div>
            </Col>
            <Col span={12}>
                <div className="post-id-content">
                    <div className="author">
                        <h3 > <UserOutlined /> {post.author[0].name} {post.author[0].surname}</h3>
                    </div>
                    <h3 className='title'>{post.title}</h3>
                    <p className='content'>Bio: {post.content}</p>
                   
                    <div className="comment">
                        <input type="text" placeholder='Add a comment '  ref={content}/>
                        <Button onClick={submitComment} icon={<SendOutlined/>} ></Button>
                        <ul className="comment-list">
                            {
                                comments.map((com, index) => {
                                    return <li key={index}>
                                        <div className="comment-box">
                                            <div className="comment-author">
                                                <UserOutlined className='user-icon' />
                                            </div>
                                            <div className="comment-body">
                                                <h4>{com.author[0].name} {com.author[0].surname}: </h4>
                                                <p className="text">{
                                                com.id === tempId ? <input type='text'   /> :  <p>{com.content}</p>
                                            }</p>
                                            <div className="comment-time">
                                                <span>{moment(com.createdAt).format("DD-MM-YYYY, h:m")}</span>
                                            </div>
                                            </div>
                                            
                                        </div>
                                        
                                        
                                        <div className="comment-action">
                                            { com.authorId === user?._id && (
                                                <>
                                                <Button onClick={() => delateComment(com._id)} danger size='sm' icon={<DeleteOutlined />}></Button>
                                                {/* {
                                                    tempId === com._id ? <Button onClick={updateComment} size='sm'>Save</Button> : <Button onClick={() => openInput(com._id)} size='sm' icon={<EditOutlined />}></Button>
                                                } */}
                                                {/* <Modal1 item={com} post={post} /> */}
                                                <Button icon={<EditOutlined/>} className='edit-button'  onClick={() => showModal(com._id)}>
                                                
                                                </Button>
                                                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                                <input className='modal-input' ref={editInput} /> 
                                                </Modal>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                        
                    </div>
                </div>
            </Col>
        </Row>): "Loading..." }
    </div>
  )
}

export default PostId
