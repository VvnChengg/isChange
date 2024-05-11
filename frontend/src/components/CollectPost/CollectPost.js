import { StyledImg } from "./CollectPost-style";
import { transApi } from "../../api/transApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spin } from 'antd';
import { useIntl } from "react-intl";


export default function CollectPost({ post, user_id, token}) {

    const [imgSrc, setImgSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const intl = useIntl();
    const post_id = post.tid;

    const collectPost = async () => {
        if(token && user_id) {
            if(post.trans_title){
                try{
                    const data = await transApi.collectTrans(post_id, user_id, token);

                    if(data.message === '成功收藏商品'){
                        toast.success(`${intl.formatMessage({id: 'trans.collectSuccess'})}`);
                        setImgSrc('/icons/collectFilled.png');
                    }else if(data.message === '成功取消收藏商品'){
                        toast.success(`${intl.formatMessage({id: 'trans.collectCancelSucess'})}`);
                        setImgSrc('/icons/collect.png');
                    }

                }catch(err){
                    toast.error(`${intl.formatMessage({id: 'trans.collectFailed'})}`);
                }
            }
            
        }
    }

    const getCollectPost = async () => {
        setIsLoading(true);
        if(post.trans_title){
            try{
                const data = await transApi.getCollectTrans(user_id, token);

                if(data.success){
                    const hasPostId = data.collection.some(item => item.item_id === post_id);
                    if(hasPostId) {
                        setImgSrc('/icons/collectFilled.png');
                    } else {
                        setImgSrc('/icons/collect.png');
                    }
                }
            }catch(err){
                toast.error(`${intl.formateMessage({id: 'trans.getCollectFailed'})}`);
            }
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
        />
    );
}