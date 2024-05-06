import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { ImageUploadDiv } from '../shareCreate/imageDiv'

// import './shareCreate-style.css';

import {
  FormInput,
  FormRange,
  FormBudget,
  FormDate
} from '../../components/FormInput';
import Button from '../../components/Button';

// import { AiOutlineMail } from 'https://esm.sh/react-icons/ai';
// import TextField from '@material-ui/core/TextField';
import { api } from '../../api';


export default function Share() {
  const intl = useIntl();
  let navigate = useNavigate(); 

  const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
  };

  const [oldTitle, setOldTitle] = useState('');
  const [oldContent, setOldContent] = useState('');
  
  const { pid } = useParams();

  const getInfo = async () => {
    // const pid = "6617996b1067c62b7d704652";
// const pid = "6617996b106";  // 文章ID格式錯誤
// const pid = "6617996b1067c62b7d704650"; // 尚未發布文章
    const postInfo = await api.getPostDetail(pid);
    setOldTitle(postInfo.item.title);
    console.log(postInfo);
    setOldContent(postInfo.item.content);
    // setOldPhoto(postInfo.item.coverPhoto);
  }

  useEffect(() => {
      getInfo();
  }, []);

  const [post, setPost] = useState({
    title: '',
    content: '',
    photo: '',
    // status: ['draft'],
  })
  post.title = oldTitle
  post.content = oldContent

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
    console.log('abc')
    api.updatePost(pid, post)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  return (
    <div className='container'>
      <div className='content'>
        <FormInput
          type='input'
          title={intl.formatMessage({ id: 'title' })}
          placeholder={intl.formatMessage({ id: 'inputTitle' })}          
          // text={oldTitle}
          text={post.title}
          setText={setTitle}
        />
        <FormInput
          type='textarea'
          title={intl.formatMessage({ id: 'textarea' })}
          placeholder={intl.formatMessage({ id: 'inputTextarea' })}
          // text={oldContent}
          text={post.content}
          setText={setContent}
        />
        <ImageUploadDiv
          photo={post.photo}
          setPhoto={setPhoto} />
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button
            text={intl.formatMessage({ id: 'back' })}
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
