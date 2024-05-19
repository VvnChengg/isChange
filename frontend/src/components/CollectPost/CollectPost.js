import { StyledImg } from "./CollectPost-style";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spin } from 'antd';
import { useIntl } from "react-intl";
import { collectApi } from "../../api/collectAPi";


export default function CollectPost({ post, user_id, token, size, className}) {

    // console.log(post);
    const [imgSrc, setImgSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const intl = useIntl();
    const post_id = post.tid || post._id;

    const collectPost = async () => {
        if(token && user_id) {
            if(post.trans_title){
                try{
                    const data = await collectApi.collectPost(post_id, user_id, "Product", token);

                    // console.log(data);

                    if(data.favId){
                        toast.success(`${intl.formatMessage({id: 'trans.collectSuccess'})}`);
                        setImgSrc('/icons/collectFilled.png');
                    }else{
                        toast.success(`${intl.formatMessage({id: 'trans.collectCancelSucess'})}`);
                        setImgSrc('/icons/collect.png');
                    }

                }catch(err){
                    toast.error(`${intl.formatMessage({id: 'trans.collectFailed'})}`);
                }
            }
            if(post.event_title){
                try{
                    const data = await collectApi.collectPost(post_id, user_id, "Event", token);

                    // console.log(data);

                    if(data.favId){
                        toast.success(`${intl.formatMessage({id: 'tour.collectSuccess'})}`);
                        setImgSrc('/icons/collectFilled.png');
                    }else{
                        toast.success(`${intl.formatMessage({id: 'tour.collectCancelSucess'})}`);
                        setImgSrc('/icons/collect.png');
                    }
                }
                catch(err){
                    toast.error(`${intl.formatMessage({id: 'tour.collectFailed'})}`);
                }
            }
            if(post.title){
                try{
                    const data = await collectApi.collectPost(post_id, user_id, "Article", token);

                    // console.log(data);

                    if(data.favId){
                        toast.success(`${intl.formatMessage({id: 'post.collectSuccess'})}`);
                        setImgSrc('/icons/collectFilled.png');
                    }else{
                        toast.success(`${intl.formatMessage({id: 'post.collectCancelSucess'})}`);
                        setImgSrc('/icons/collect.png');
                    }
                }catch(err){
                    toast.error(`${intl.formatMessage({id: 'post.collectFailed'})}`);
                }
            }
            
        }
    }

    const getCollectPost = async () => {
        setIsLoading(true);
        try{
            const data = await collectApi.getCollectPost(user_id, token);

            if(data.success){
                const hasPostId = data.favorite.some(item => item.item_id === post_id);
                if(hasPostId) {
                    setImgSrc('/icons/collectFilled.png');
                } else {
                    setImgSrc('/icons/collect.png');
                }
            }
        }catch(err){
            toast.error(`${intl.formatMessage({id: 'trans.getCollectFailed'})}`);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if(token && user_id){
            getCollectPost();
        }
    }, [user_id, token])

    return (
        isLoading ? <Spin /> :
        <StyledImg                
            loading='lazy'
            src={imgSrc}
            onClick={collectPost}
            size = {size}
        />
    );
}