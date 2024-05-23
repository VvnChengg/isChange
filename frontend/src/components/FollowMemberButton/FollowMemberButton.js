import Button from "../Button";
import { viewApi } from "../../api/viewApi";
import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { LoadingOutlined } from '@ant-design/icons';


export default function FollowMemberButton({ username, token }) {
    const intl = useIntl();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    async function changeFollowStatus() {
        try{
            const data = await viewApi.changeFollowStatus(username, token);
            if(data.message === '成功追蹤'){
                setIsFollowing(true);
                toast.success(intl.formatMessage({ id: 'view.followSuccess' }));
            }else if(data.message === '成功取消追蹤'){
                setIsFollowing(false);
                toast.success(intl.formatMessage({ id: 'view.followCancelSuccess' }));
            }
        }catch(err){
            toast.error(intl.formatMessage({ id: 'view.followError' }));
        }
    }

    async function getFollowingList(){
        try{
            const data = await viewApi.getFollowingList(token);
            if(data){
                if (data.some(item => item.username === username)) {
                    setIsFollowing(true);
                }else{
                    setIsFollowing(false);
                }
            }
        }catch(err){
            toast.error(intl.formatMessage({ id: 'view.checkFollowFailed' }));
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getFollowingList();
    }, []);

    const buttonText = 
    isLoading ? 
    <div>
        <LoadingOutlined/> {intl.formatMessage({ id: 'loading' })}
    </div>
    : isFollowing ? intl.formatMessage({ id: 'view.unfollow' }) : intl.formatMessage({ id: 'view.follow' });

    return (
        <Button
            style={{
                backgroundColor: isLoading ? '#ccc' : '',
                color: isLoading ? '#888' : '',
                cursor: isLoading ? 'not-allowed' : '',
                width: 'auto',
                minWidth: '100px',
                padding: '5px 10px',
                zIndex: "1000",
                whiteSpace: "nowrap",
            }}
            text={buttonText}
            onClick={changeFollowStatus}
        />
    )
}