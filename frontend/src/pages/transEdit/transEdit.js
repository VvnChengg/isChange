import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
    EditContainer,
    EditButtonContainer
} from './transEdit-style';

import TransForm from '../../components/TransForm';
import Button from '../../components/Button';
import { transApi } from '../../api/transApi';
import { useToken } from '../../hooks/useToken';

export default function TransEdit() {
    const intl = useIntl();
    const navigate = useNavigate();
    const { tid } = useParams();
    const token = useToken();
    const user_id = localStorage.getItem('user_id');

    const [trans, setTrans] = useState({
        transform_type: 'edit',
        trans_title: '',
        trans_type: 'sell',
        product_type: 'others',
        currency: 'TWD',
        budget: '',
        rent_start_time: '',
        rent_end_time: '',
        trans_intro: '',
        user_id: user_id,
        tid: tid,

        product_pic: '',
        transaction_region: '', //待補前端設計

        price_lb: '', // price_lb目前是沒使用到的變數, 但之後可能會用到先留著
        price_ub: '', // price_ub目前是沒使用到的變數, 但之後可能會用到先留著

    })

    useEffect(() => {
        // api: get trans detail & setTrans
        if(token && tid && user_id){
            checkValidation();
        }
    }, [token, tid, user_id])

    async function checkValidation(){
        try{
            const data = await transApi.editViewTrans(tid, user_id, token);
            // console.log(data);
            // console.log(data.trans.product_title);
            // console.log(data.trans.currency);
            // console.log(data.trans.description);
            // console.log(data.trans.product_type);
            console.log(data);
            
            if(data.success){
                let period = data.trans.period;
                let dates = period.split(" - "); // split the string into an array of two strings
            
                let rent_start_time = dates[0]; // "2024-05-24"
                let rent_end_time = dates[1]; // "2024-06-23"

                console.log(data.trans.status)
            
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
                    // __v: data.__v
                });
                }

        }catch(e){
            alert(`${intl.formatMessage({ id: 'trans.checkEditFailed' })}`);
        }
    }

    async function onSubmit() {
        // console.log(trans);
        try{
            const data = await transApi.editTrans(trans, token);
            // console.log(data);
            if(data.success){
                alert(`${intl.formatMessage({ id: 'trans.editSuccess' })}`);
                navigate('/post/published'); // redirect
            }else{
                alert(`${intl.formatMessage({ id: 'trans.editFailed' })}`);
            }
        }catch(e){
            // console.log(e);
            alert(`${intl.formatMessage({ id: 'trans.editFailed' })}`);
        }
        
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
                    text={intl.formatMessage({ id: 'trans.edit' })}
                    onClick={() => onSubmit()}
                />
            </EditButtonContainer>
        </EditContainer>
    )
}