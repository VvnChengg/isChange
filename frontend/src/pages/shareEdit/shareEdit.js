import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { ImageUploadDiv } from '../shareCreate/imageDiv'
import { useToken } from '../../hooks/useToken';
// import './shareCreate-style.css';

import {
  FormInput,
  FormImage
} from '../../components/FormInput';
import Button from '../../components/Button';

// import { AiOutlineMail } from 'https://esm.sh/react-icons/ai';
// import TextField from '@material-ui/core/TextField';
import { api } from '../../api';


export default function Share() {
  const intl = useIntl();
  let navigate = useNavigate(); 
  
  const { pid } = useParams();
  const token = useToken();
  const user_id = localStorage.getItem('user_id');
  
  const [post, setPost] = useState({
    title: '',
    content: '',
    photo: '',
    // status: ['draft'],
  })

  const getInfo = async () => {
    // const pid = "6617996b1067c62b7d704652";
// const pid = "6617996b106";  // 文章ID格式錯誤
// const pid = "6617996b1067c62b7d704650"; // 尚未發布文章
    try{
      const postInfo = await api.getPostDetail(pid);
      console.log(postInfo);
      console.log('aaa');
      setPost(prevPost => ({ ...prevPost, ...postInfo.item }));
    }catch(e){
        alert(`${intl.formatMessage({ id: 'tour.checkEditFailed' })}`);
    }
  }

  useEffect(() => {
      if(token && pid && user_id){
        getInfo();
      }
  }, [token, pid, user_id])

  function setTitle(input) {
    setPost({
        ...post,
        title: input
    });
  }
  
  function setContent(input) {
      setPost({
          ...post,
          content: input
      });
  }

  function setPhoto(input) {
    setPost({
        ...post,
        photo: input
    });
  }

  function onSubmit() {
    console.log(post);
    api.updatePost(pid, post)
    .then(res => {
      console.log(res)
      navigate('/post/published');
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='container'>
      <div className='content'>
        <FormInput
          type='input'
          title={intl.formatMessage({ id: 'title' })}
          placeholder={intl.formatMessage({ id: 'inputTitle' })}          
          text={post.title}
          setText={setTitle}
        />
        <FormInput
          type='textarea'
          title={intl.formatMessage({ id: 'textarea' })}
          placeholder={intl.formatMessage({ id: 'inputTextarea' })}
          text={post.content}
          setText={setContent}
        />
        <FormImage
          type='file'
          title={intl.formatMessage({ id: 'post.articlePicture' })}
          placeholder={intl.formatMessage({ id: 'post.articlePicture' })}
          onFileChange={e => console.log(e.target.files)}
          imagePreviewUrl={post.photo}
          setImagePreviewUrl={setPhoto}
        />
        {/* <ImageUploadDiv
          photo={post.photo}
          setPhoto={setPhoto} /> */}
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button
            text={intl.formatMessage({ id: 'back' })}
            onClick={() => window.history.back()}
          />
          <Button
            text={intl.formatMessage({ id: 'post.edit' })}
            onClick={() => onSubmit()}
          />
        </div>
      </div>
    </div>
  );
}
