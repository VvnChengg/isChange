import React, { useState } from 'react';
import { useIntl } from 'react-intl';


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
    StyledFacebookMessengerIcon,
    StyledImg
 } from './SharePage-style';

import { Button, Modal } from 'antd';


export default function SharePage({url}) {
    const [modal2Open, setModal2Open] = useState(false);
    const intl = useIntl();
  
    // console.log(url);
    return (
        <>
            <StyledImg
                loading='lazy'
                src='/icons/shareButton.png'
                onClick={() => setModal2Open(true)}
            />
            <Modal
                width = "auto"
                title={intl.formatMessage({ id: 'shareToOthers' })}
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                footer={null} 
            >
                <FacebookShareButton url={url}>
                    <StyledFacebookIcon round={true} />
                </FacebookShareButton>

                <FacebookMessengerShareButton url={url}>
                    <StyledFacebookMessengerIcon round={true} />
                </FacebookMessengerShareButton>

                <TwitterShareButton url={url}>
                    <StyledTwitterIcon round={true} />
                </TwitterShareButton>

                <EmailShareButton url={url}>
                    <StyledEmailIcon round={true} />
                </EmailShareButton>

                <LineShareButton url={url}>
                    <StyledLineIcon round={true} />
                </LineShareButton>            
            </Modal>
        </>
    );
}
