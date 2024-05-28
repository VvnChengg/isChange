import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import {
    EditContainer,
    EditButtonContainer
} from './transEdit-style';

import TransForm from '../../components/TransForm';
import Button from '../../components/Button';
import { transApi } from '../../api/transApi';
import { useToken } from '../../hooks/useToken';
import { toast } from 'react-toastify';

export default function TransEdit() {
    const intl = useIntl();
    const navigate = useNavigate();
    const { tid } = useParams();
    const token = useToken();
    const user_id = localStorage.getItem('user_id');

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [trans, setTrans] = useState({
        transform_type: 'edit',
        trans_title: '',
        trans_type: 'sell',
        currency: 'TWD',
        budget: '',
        rent_start_time: '',
        rent_end_time: '',
        trans_intro: '',
        user_id: user_id,

        product_type: 'kitchen',
        product_pic: '', //待補前端設計

        price_lb: '', // price_lb目前是沒使用到的變數, 但之後可能會用到先留著
        price_ub: '', // price_ub目前是沒使用到的變數, 但之後可能會用到先留著

        destination_object: '',
        latitude: '',
        longitude: '',
    })

    useEffect(() => {
        // api: get trans detail & setTrans
        if(token && tid && user_id){
            checkValidation();
        }
    }, [token, tid, user_id])

    if (isLoading) {
        return <Spin />;
    }

    async function checkValidation(){
        try{
            const data = await transApi.editViewTrans(tid, user_id, token);
            
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
                    product_pic: data.trans.product_pic,
                    transform_type: 'edit',
                    trans_status: data.trans.status,

                    transaction_region_en: data.trans.transaction_region_en,
                    transaction_region_zh: data.trans.transaction_region_zh,
                    longitude: data.trans.location.coordinates[0],
                    latitude: data.trans.location.coordinates[1],
                    region_object: (intl.locale === 'en' ? data.trans.transaction_region_en : data.trans.transaction_region_zh).join(', ')

                });
            }
        }catch(e){
            toast.error(`${intl.formatMessage({ id: 'trans.checkEditFailed' })}`);
        }
        setIsLoading(false);
    }

    async function onSubmit() {
        setIsSubmitting(true);
        
        if(trans.destination_en_string !== undefined || trans.destination_zh_string !== undefined){
            // 送出前先把destination_en, destination_zh轉成後端需要的格式
            let destination_en_string = trans.destination_en_string;
            let destination_zh_string = trans.destination_zh_string;
        
            // 如果只有一個destination, 則將其設為另一個語言的destination
            if (typeof destination_en_string === 'undefined') {
                destination_en_string = destination_zh_string;
            }
        
            if (typeof destination_zh_string === 'undefined') {
                destination_zh_string = destination_en_string;
            }
        
            trans.destination_en = destination_en_string.split(", ").map(item => item.trim());
            trans.destination_zh = destination_zh_string.split(", ").map(item => item.trim());
        }else{
            // 如果沒有輸入地點, 則把原本的地點設回去
            trans.destination_en = trans.transaction_region_en
            trans.destination_zh = trans.transaction_region_zh
        }

        if(trans.longitude !== undefined && trans.latitude !== undefined){
            // 把經緯度轉成後端需要的格式
            let location = {
                type: "Point",
                coordinates: [Number(trans.longitude), Number(trans.latitude)]
            };
            trans.location = location;
        }

        try{
            const data = await transApi.editTrans(trans, token);
            console.log(data);
            if(data.success){
                toast.success(`${intl.formatMessage({ id: 'trans.editSuccess' })}`);
                navigate('/post/published'); // redirect
            }else{
                toast.error(`${intl.formatMessage({ id: 'trans.editFailed' })}`);
            }
        }catch(e){
            toast.error(`${intl.formatMessage({ id: 'trans.editFailed' })}`);
        }
        setIsSubmitting(false)
        
    }

    if(isLoading){
        return <Spin />;
    }

    return (
        <EditContainer>
            <TransForm trans={trans} setTrans={setTrans} />
            <EditButtonContainer>
                <Button
                    text={intl.formatMessage({ id: 'back' })}
                    secondary={true}
                    onClick={() => window.history.back()}
                />
                <Button
                    style={{
                        backgroundColor: isSubmitting ? '#ccc' : '',
                        color: isSubmitting ? '#888' : '',
                        cursor: isSubmitting ? 'not-allowed' : '',
                    }}
                    text={isSubmitting?
                        <div>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                        {intl.formatMessage({ id: 'loading' })}
                        </div> 
                        : intl.formatMessage({ id: 'trans.edit' })}
                    onClick={isSubmitting ? undefined : onSubmit}
                />
            </EditButtonContainer>
        </EditContainer>
    )
}