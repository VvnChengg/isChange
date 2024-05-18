import React, { useState } from 'react';
// import { useIntl } from 'react-intl';
import { api } from '../../api';

import { 
    StyledImg,
 } from './LikePost-style';

// import { toast } from 'react-toastify';


export default function LikePost({likes, isLiked, pid}) {
    // const intl = useIntl();

    function PressLike() {
        console.log(likes);
        console.log(isLiked);
        
        console.log(pid);
        api.pressLike(pid)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        window.location.reload()
      }
    
    return (
        <>
            {isLiked === true ?
                <StyledImg
                    loading='lazy'
                    src='/icons/heartFilled.png'
                    onClick={() => PressLike()}
                /> :
                <StyledImg
                    loading='lazy'
                    src='/icons/heartHollow.png'
                    onClick={() => PressLike()}
                />
            }
            <div>
                {likes}
            </div>
        </>
    );
}
