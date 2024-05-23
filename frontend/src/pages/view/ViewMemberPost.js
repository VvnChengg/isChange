import React, { useState, useEffect } from 'react';
import viewStyles from '../../styles/View.module.css';
import { FormattedMessage } from 'react-intl';
import { viewApi } from '../../api/viewApi';
import {
  NoContent,
} from '../home/home-style';
import { Spin } from 'antd';
import { useIntl } from 'react-intl';
import Post from '../../components/Post';
import { useNavigate } from 'react-router-dom';

// 包含過往發文紀錄
const ViewMemberPost = ({ posts, postLoading }) => {

  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <div className={viewStyles.post}>
        <div className={viewStyles.postContainer}>
            <span className={viewStyles.postLabel}>
                <FormattedMessage id='view.past' />
            </span>
            <div className={viewStyles.selfPostWrapper}>
              {postLoading ?
                <Spin />
              : <div className={viewStyles.scrollableDiv}>
                {posts.length === 0 ?
                  <NoContent>
                    {intl.formatMessage({ id: 'home.noContent' })}
                  </NoContent>
                  :posts.map((post, index) => (
                    <div key={index}>
                      <Post 
                        post={post} 
                        onClick={() => navigate(`/${post.type}/detail/${post._id}`)}
                      />
                    </div>
                  ))
                }
              </div>
              }
            </div>
        </div>
    </div>
);
};

export default ViewMemberPost;