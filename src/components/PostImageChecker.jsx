import React, { useEffect, useState } from 'react';
import "./postCard/PostCard.scss"

const PostImageChecker = ({url}) => {
    const [ isExists, setIsExists ] = useState(false);
    const handleCheckImage = async() => {
       const res =  await fetch(url);
       if( res.status === 200) setIsExists(true);
       
    }
    
    useEffect(() => {
     
        handleCheckImage();
    }, [url])
  return isExists ? <img className='post-id-img' src={url} alt="post image" /> : <img src="https://api.uznews.uz/images/default-image.jpg" alt="default image" />
}

export default PostImageChecker