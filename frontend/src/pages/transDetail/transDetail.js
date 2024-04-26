import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { api } from '../../api';

import {
    DetailContainer,
    DetailButtonContainer
} from './transDetail-style';

import PostDetail from '../../components/PostDetail';
import Button from '../../components/Button';

export default function TransDetail() {
    const intl = useIntl();

    const [trans, setTrans] = useState({
        trans_title: '',
        trans_type: 'sell',
        trans_method: '',
        price_lb: '',
        price_ub: '',
        rent_start_time: '',
        rent_end_time: '',
        trans_intro: '',
    })

    const sampleTrans = {
        trans_title: '大同電鍋',
        trans_type: 'rent',
        trans_method: '寄送',
        price_lb: '50',
        price_ub: '100',
        rent_start_time: '2024/04/01',
        rent_end_time: '2024/04/04',
        trans_intro: '放假想煮家常菜跟朋友分享，徵求一個 6 人份大同電鍋！',
    }

    useEffect(() => {
        setTrans(sampleTrans);
        // api: get trans detail
        // 串好就可以把 sampleTrans 拿掉
    }, []);

    function contact() {
        console.log('contact');

        // api: send msg
    }

    return (
        <DetailContainer>
            <PostDetail post={trans} />
            {/* <DetailButtonContainer>
                <Button
                    text={intl.formatMessage({ id: 'back' })}
                    secondary={true}
                />
                <Button
                    text={intl.formatMessage({ id: 'tour.message' })}
                    onClick={() => contact()}
                />
            </DetailButtonContainer> */}
        </DetailContainer>
    )
}