import React, { useState } from 'react';
import { useIntl } from 'react-intl';


import { FacebookShareButton, 
    TwitterShareButton, 
    EmailShareButton, 
    LineShareButton,
} from 'react-share';

import { 
    StyledFacebookIcon, 
    StyledTwitterIcon, 
    StyledEmailIcon, 
    StyledLineIcon,
    StyledImg,
    StyledLinkIcon,
    StyledButton,
    StyledButtonContainer
 } from './SharePage-style';

import { Modal } from 'antd';

import { toast } from 'react-toastify';


export default function SharePage({url}) {
    const [modal2Open, setModal2Open] = useState(false);
    const intl = useIntl();
  
    function PressShare() {
        navigator.clipboard.writeText(url)
            .then(() => {
                // console.log('URL copied to clipboard:', url);
                toast.success(`${intl.formatMessage({ id: 'CopyURLSuccess' })}`);
            })
            .catch((error) => {
                // console.error('Failed to copy URL:', error);
                toast.error(`${intl.formatMessage({ id: 'CopyURLFailed' })}`);
                });
      }
    
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
                <StyledButtonContainer>
                    <FacebookShareButton url={url}>
                        <StyledFacebookIcon round={true} />
                    </FacebookShareButton>

                    <TwitterShareButton url={url}>
                        <StyledTwitterIcon round={true} />
                    </TwitterShareButton>

                    <EmailShareButton url={url}>
                        <StyledEmailIcon round={true} />
                    </EmailShareButton>

                    <LineShareButton url={url}>
                        <StyledLineIcon round={true} />
                    </LineShareButton>

                    <StyledButton onClick={PressShare}>
                        <StyledLinkIcon src="/icons/link.png" alt="Link Icon" />
                    </StyledButton>
                </StyledButtonContainer>
            </Modal>
        </>
    );
}
