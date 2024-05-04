import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { ImageUploadDiv } from './imageDiv'

import './shareCreate-style.css';

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

  const [post, setPost] = useState({
    title: '',
    content: '',
    photo: '',
    // status: ['draft'],
  })

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

  // function setStatus(input) {
  //   setPost({
  //       ...post,
  //       status: input
  //   });
  // }

  function onSubmit() {
    console.log(post);
    console.log('abc')
    api.createPost(post)
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
        {/* <button className='figure-button' onClick={() => routeChange()}><img
            loading='lazy'
            src='https://cdn.builder.io/api/v1/image/assets/TEMP/3f570a0c69a52557b5a1cd2aabd09f0ea82824f62a802a9b9d432ad5b29bbd66?'
          /></button> */}
        <ImageUploadDiv
          photo={post.photo}
          setPhoto={setPhoto} />
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button
            text={intl.formatMessage({ id: 'back' })}
          />
          <Button
            text={intl.formatMessage({ id: 'post.create' })}
            onClick={() => onSubmit()}
          />
        </div>
      </div>
    </div>
  );
}
