import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { transApi } from '../../api/transApi';

import {
    DetailContainer,
    DetailButtonContainer
} from './transDetail-style';

import PostDetail from '../../components/PostDetail';
import Button from '../../components/Button';

export default function TransDetail() {
    const intl = useIntl();
    const navigate = useNavigate();
    const { tid } = useParams();


    const [trans, setTrans] = useState({
        trans_title: '',
        trans_type: 'sell',
        product_type: 'others',
        currency: 'TWD',
        budget: '',
        rent_start_time: '',
        rent_end_time: '',
        trans_intro: '',

        product_pic: '', //待補前端設計
        transaction_region: '', //待補前端設計

        price_lb: '', // price_lb目前是沒使用到的變數, 但之後可能會用到先留著
        price_ub: '', // price_ub目前是沒使用到的變數, 但之後可能會用到先留著
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
        // 串好就可以把 sampleTrans 拿掉
        // setTrans(sampleTrans);
        // api: get trans detail
        viewPost();
    }, []);

    function contact() {
        console.log('contact');

        // api: send msg
    }

    async function viewPost() {
        try{
            const data = await transApi.viewTrans(tid);
            // console.log(data);
            // console.log(data.trans.product_title);
            // console.log(data.trans.currency);
            // console.log(data.trans.description);
            // console.log(data.trans.product_type);
            
            if(data.success){
                let period = data.trans.period;
                let dates = period.split(" - "); // split the string into an array of two strings
            
                let rent_start_time = dates[0]; // "2024-05-24"
                let rent_end_time = dates[1]; // "2024-06-23"
            
                setTrans({
                    rent_start_time: rent_start_time,
                    rent_end_time: rent_end_time,

                    tid: data.trans._id,
                    trans_title: data.trans.product_title,
                    trans_intro: data.trans.description,
                    product_type: data.trans.product_type,
                    post_time: data.trans.post_time,
                    currency: data.trans.currency,
                    budget: data.trans.price.$numberDecimal,
                    status: data.trans.status,
                    transaction_region: data.trans.transaction_region,
                    trans_type: data.trans.transaction_way,
                    user_id: data.trans.creator_id,
                    // __v: data.__v
                });
                }

        }catch(e){
            alert(`${intl.formatMessage({ id: 'trans.checkEditFailed' })}`);
        }

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