import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, message } from 'antd'
import React, {useRef, useState} from 'react';
import "./AddPost.scss";
import { PostService } from '../../services/postService';

const {TextArea} = Input;

const AddPost = () => {
    const img_rf = useRef();
    const [url, setUrl ] = useState("");
    const { form } = Form.useForm();
    const [isLoading, setIsLoading] = useState(false)
 
    const showImg = () => {
        if(img_rf.current.files[0]){
        setUrl(URL.createObjectURL(img_rf.current.files[0]))
        }
    }

    const handleAddPost = async({title, content}) => {
        setIsLoading(true)
        try{
            let formData= new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("image", img_rf.current.files[0]);
            const token = localStorage.getItem("token");
            const data = await PostService.createPost(token, formData);
            message.success(data.message)
            

        }catch(error) {
            message.error(error.response.data.message)
            
        }
        setIsLoading(false)
    }
    
  return (
    <div className='add-post'>
        <Row>
            <Col>
            <div className="add-post-header">
            <div>
                <label htmlFor="post-img">
                {url === "" ? <PlusOutlined /> : <img id='my-image' src={url} alt="" /> }
                <input onChange={showImg} ref={img_rf} type="file" id='post-img' />
                
                </label>
            </div>
        </div>
        <div className="add-post-body">
            <Form form={form} onFinish={handleAddPost}>
                <Form.Item name={'title'} rules={[{required: true, message: "Please fill post title"}]}>
                    <Input placeholder='Post Title'/>
                </Form.Item>
                <Form.Item name={'content'} rules={[{required: true, message: "Please fill post description"}]}>
                    <TextArea placeholder='Some description' />
                </Form.Item>
                <Button loading={isLoading} htmlType='submit'>Create Post</Button>
            </Form>
        </div>
            </Col>
        </Row>
    </div>
  )
}

export default AddPost