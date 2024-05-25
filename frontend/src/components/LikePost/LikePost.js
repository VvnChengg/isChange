import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { api } from '../../api';
import { StyledImg } from './LikePost-style';
import { toast } from 'react-toastify';


export default function LikePost({post, user_id, token}) {
    const intl = useIntl();
    const [imgSrc, setImgSrc] = useState(null);
    const pid = post.tid || post._id;
    const isLiked = post.is_liked;
    const [likes, setLikes] = useState(post.like_count);

    const PressLike = async () => {
        if(token && user_id) {
            if(post.trans_title){
                try{
                    await api.pressLike(pid, user_id, "trans")
                        .then(res => {
                            if(res.message === "成功按讚"){
                                toast.success(`${intl.formatMessage({id: 'trans.likeSuccess'})}`);
                                setImgSrc('/icons/heartFilled.png');
                                setLikes(res.like_count);
                            }else{
                                toast.success(`${intl.formatMessage({id: 'trans.likeCancelSucess'})}`);
                                setImgSrc('/icons/heartHollow.png');
                                setLikes(res.like_count);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            toast.error(`${intl.formatMessage({id: 'post.likeFailed'})}`);
                        });
                }catch(err){
                    toast.error(`${intl.formatMessage({id: 'trans.likeFailed'})}`);
                }
            }
            if(post.event_title){
                try{
                    await api.pressLike(pid, user_id, "tour")
                        .then(res => {
                            if(res.message === "成功按讚"){
                                toast.success(`${intl.formatMessage({id: 'tour.likeSuccess'})}`);
                                setImgSrc('/icons/heartFilled.png');
                                setLikes(res.like_count);
                            }else{
                                toast.success(`${intl.formatMessage({id: 'tour.likeCancelSucess'})}`);
                                setImgSrc('/icons/heartHollow.png');
                                setLikes(res.like_count);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            toast.error(`${intl.formatMessage({id: 'tour.likeFailed'})}`);
                        });
                }
                catch(err){
                    toast.error(`${intl.formatMessage({id: 'tour.likeFailed'})}`);
                }
            }
            if(post.title){
                try{
                    await api.pressLike(pid, user_id, "post")
                        .then(res => {
                            if(res.message === "成功按讚"){
                                toast.success(`${intl.formatMessage({id: 'post.likeSuccess'})}`);
                                setImgSrc('/icons/heartFilled.png');
                                setLikes(res.like_count);
                            }else{
                                toast.success(`${intl.formatMessage({id: 'post.likeCancelSucess'})}`);
                                setImgSrc('/icons/heartHollow.png');
                                setLikes(res.like_count);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            toast.error(`${intl.formatMessage({id: 'post.likeFailed'})}`);
                        });
                }catch(err){
                    toast.error(`${intl.formatMessage({id: 'post.likeFailed'})}`);
                }
            }
        }else{
            toast.error(`${intl.formatMessage({id: 'token.pleaseLogIn'})}`);
        }
      }

    useEffect(() => {
        if(isLiked){
            setImgSrc('/icons/heartFilled.png');
        }else{
            setImgSrc('/icons/heartHollow.png');
        }
    }, [user_id, token])

    return (
        <>
            <StyledImg
                loading='lazy'
                src={imgSrc}
                onClick={() => PressLike()}
            />
            <div>
                {likes}
            </div>
        </>
            
    );
}