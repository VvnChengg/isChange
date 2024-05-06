import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

import './shareCreate-style.css';

import {
  FormInput,
  FormImage
} from '../../components/FormInput';
import Button from '../../components/Button';
import {
  CreateButtonContainer
} from '../transCreate/transCreate-style';

// import { AiOutlineMail } from 'https://esm.sh/react-icons/ai';
// import TextField from '@material-ui/core/TextField';
import { api } from '../../api';


export default function Share() {
  const intl = useIntl();
  let navigate = useNavigate();

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

  async function onSubmit() {
    try {
      const data = await api.createPost(post);
      if (data.success) {
        alert(intl.formatMessage({ id: 'post.createSuccess' }));
        navigate('/post/published');
      } else {
        alert(intl.formatMessage({ id: 'post.createFail' }));
      }
    }
    catch (e) {
      alert(intl.formatMessage({ id: 'post.createFail' }));
    }
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
        {/* <ImageUploadDiv
          photo={post.photo}
          setPhoto={setPhoto} />
        <div style={{display: 'flex', justifyContent: 'space-between'}}> */}
        <FormImage
          type='file'
          title={intl.formatMessage({ id: 'post.articlePicture' })}
          placeholder={intl.formatMessage({ id: 'post.articlePicture' })}
          onFileChange={e => console.log(e.target.files)}
          imagePreviewUrl={post.article_pic}
          setImagePreviewUrl={setPhoto}
        />
        <CreateButtonContainer>
          <Button
            text={intl.formatMessage({ id: 'back' })}
          />
          <Button
            text={intl.formatMessage({ id: 'post.create' })}
            onClick={() => onSubmit()}
          />
        </CreateButtonContainer>
      </div>
    </div>
    // </div >
  );
}
