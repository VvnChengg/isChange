import React from 'react';
import { FacebookShareButton, 
    TwitterShareButton, 
    EmailShareButton, 
    LineShareButton,
    FacebookMessengerShareButton
} from 'react-share';

import { 
    StyledFacebookIcon, 
    StyledTwitterIcon, 
    StyledEmailIcon, 
    StyledLineIcon,
    StyledFacebookMessengerIcon
 } from './SharePage-style';

export default function SharePage({url}) {
    // console.log(url);
    return (
        <div style={{textAlign: 'left'}}>
            <FacebookShareButton url={url}>
                <StyledFacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <FacebookMessengerShareButton url={url}>
                <StyledFacebookMessengerIcon size={32} round={true} />
            </FacebookMessengerShareButton>

            <TwitterShareButton url={url}>
                <StyledTwitterIcon size={32} round={true} />
            </TwitterShareButton>

            <EmailShareButton url={url}>
                <StyledEmailIcon size={32} round={true} />
            </EmailShareButton>

            <LineShareButton url={url}>
                <StyledLineIcon size={32} round={true} />
            </LineShareButton>
            {/* 添加更多的分享按钮 */}
        </div>
    );
}
