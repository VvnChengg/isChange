import { StyledImg } from "./CollectPost-style";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spin } from 'antd';
import { useIntl } from "react-intl";
import { collectApi } from "../../api/collectAPi";


export default function CollectPost({ post, user_id, token, size }) {

    const [imgSrc, setImgSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const intl = useIntl();
    const post_id = post.tid || post._id;
    const [save_count, setSaveCount] = useState(post.save_count);

    const collectPost = async () => {
        if (token && user_id) {
            if (post.trans_title) {
                try {
                    const data = await collectApi.collectPost(post_id, user_id, "Product", token);


                    if (data.message === '成功收藏文章') {
                        toast.success(`${intl.formatMessage({ id: 'trans.collectSuccess' })}`);
                        setImgSrc('/icons/collectFilled.png');
                    } else if (data.message === '成功取消收藏文章') {
                        toast.success(`${intl.formatMessage({ id: 'trans.collectCancelSucess' })}`);
                        setImgSrc('/icons/collect.png');
                    }
                    setSaveCount(data.save_count);

                } catch (err) {
                    toast.error(`${intl.formatMessage({ id: 'trans.collectFailed' })}`);
                }
            }
            if (post.event_title) {
                try {
                    const data = await collectApi.collectPost(post_id, user_id, "Event", token);

                    if (data.message === '成功收藏文章') {
                        toast.success(`${intl.formatMessage({ id: 'tour.collectSuccess' })}`);
                        setImgSrc('/icons/collectFilled.png');
                    } else if(data.message === '成功取消收藏文章') {
                        toast.success(`${intl.formatMessage({ id: 'tour.collectCancelSucess' })}`);
                        setImgSrc('/icons/collect.png');
                    }
                    setSaveCount(data.save_count);
                }
                catch (err) {
                    toast.error(`${intl.formatMessage({ id: 'tour.collectFailed' })}`);
                }
            }
            if (post.title) {
                try {
                    const data = await collectApi.collectPost(post_id, user_id, "Article", token);

                    if (data.message === '成功收藏文章') {
                        toast.success(`${intl.formatMessage({ id: 'post.collectSuccess' })}`);
                        setImgSrc('/icons/collectFilled.png');
                    } else if (data.message === '成功取消收藏文章'){
                        toast.success(`${intl.formatMessage({ id: 'post.collectCancelSucess' })}`);
                        setImgSrc('/icons/collect.png');
                    }
                    setSaveCount(data.save_count);
                } catch (err) {
                    toast.error(`${intl.formatMessage({ id: 'post.getCollectFailed' })}`);
                }
            }

        } else {
            toast.error(`${intl.formatMessage({ id: 'token.pleaseLogIn' })}`);
        }
    }

    const getCollectPost = async () => {
        setIsLoading(true);
        try {
            const data = await collectApi.getMyCollectPost(user_id, token);
            if (data.success) {

                let hasPostId = data.favorite.some(favorite => favorite.item_id === post_id);
            
                if (hasPostId) {
                    setImgSrc('/icons/collectFilled.png');
                } else {
                    setImgSrc('/icons/collect.png');
                }
            }
        } catch (err) {
            toast.error(`${intl.formatMessage({ id: 'trans.getCollectFailed' })}`);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (token && user_id) {
            getCollectPost();
        } else {
            setImgSrc('/icons/collect.png');
            setIsLoading(false);
        }
    }, [user_id, token])

    return (
        isLoading ? <Spin /> :
            <>
                <StyledImg
                    loading='lazy'
                    src={imgSrc}
                    onClick={collectPost}
                    size={size}
                />
                <p>{save_count}</p>
            </>
    );
}