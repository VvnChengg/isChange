import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

import './shareCreate-style.css';

import {
  FormInput,
  FormImage,
  FormLocation
} from '../../components/FormInput';
import Button from '../../components/Button';
import {
  CreateButtonContainer
} from '../transCreate/transCreate-style';

import { api } from '../../api';

import { useToken } from '../../hooks/useToken';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';




export default function Share() {
  const intl = useIntl();
  let navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');
  const token = useToken();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [post, setPost] = useState({
    title: '',
    content: '',
    photo: '',
    // status: ['draft'],

    region_object: '',
    latitude: '',
    longitude: '',
    user_id: user_id,
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

  //需要詳細地點object資料的時候才用
  function setRegionObject(input) {
    setPost({
      ...post,
      region_object: input
    });
  }

  function setRegionString(input) {
    setPost({
      ...post,
      destination_string: input
    })
  }

  function setRegionCountry_Latitude_Longitute(input) {
    setPost({
      ...post,
      destination_string: input.destination_string,
      destination_zh_string: input.destination_zh_string,
      destination_en_string: input.destination_en_string,
      longitude: input.longitude,
      latitude: input.latitude,
    })
  }


  async function onSubmit() {
    setIsSubmitting(true);
    if (post.destination_en_string !== undefined || post.destination_zh_string !== undefined) {
      // 送出前先把destination_en, destination_zh轉成後端需要的格式
      let destination_en_string = post.destination_en_string;
      let destination_zh_string = post.destination_zh_string;

      // 如果只有一個destination, 則將其設為另一個語言的destination
      if (typeof destination_en_string === 'undefined') {
        destination_en_string = destination_zh_string;
      }

      if (typeof destination_zh_string === 'undefined') {
        destination_zh_string = destination_en_string;
      }

      post.destination_en = destination_en_string.split(", ").map(item => item.trim());
      post.destination_zh = destination_zh_string.split(", ").map(item => item.trim());
    }

    if (post.longitude !== undefined && post.latitude !== undefined) {
      // 把經緯度轉成後端需要的格式
      let location = {
        type: "Point",
        coordinates: [Number(post.longitude), Number(post.latitude)]
      };
      post.location = location;
    }


    try {
      const data = await api.createPost(post, token);
      if (data.success) {
        toast.success(intl.formatMessage({ id: 'post.createSuccess' }));
        navigate('/post/published');
      } else {
        toast.error(intl.formatMessage({ id: 'post.createFail' }));
      }
    }
    catch (e) {
      toast.error(intl.formatMessage({ id: 'post.createFail' }));
    }

    setIsSubmitting(false);
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

        <FormLocation
          title={intl.formatMessage({ id: 'post.location' })}
          placeholder={intl.formatMessage({ id: 'post.inputLocation' })}
          value={post.region_object}
          setValue={setRegionObject}
          inputValue={post.destination_string}
          setInputValue={setRegionString}
          setRegionCountry_Latitude_Longitute={setRegionCountry_Latitude_Longitute}
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
        <CreateButtonContainer>
          <Button
            text={intl.formatMessage({ id: 'back' })}
            secondary={true}
            onClick={() => window.history.back()}
          />
          <Button
            style={{
              backgroundColor: isSubmitting ? '#ccc' : '',
              color: isSubmitting ? '#888' : '',
              cursor: isSubmitting ? 'not-allowed' : '',
            }}

            text={isSubmitting ?
              <div>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                {intl.formatMessage({ id: 'loading' })}
              </div>
              : intl.formatMessage({ id: 'post.create' })}

            onClick={isSubmitting ? undefined : onSubmit}
          />
        </CreateButtonContainer>
      </div>
    </div>
  );
}
