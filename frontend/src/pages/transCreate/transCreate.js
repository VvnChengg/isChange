import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import {
    CreateContainer,
    CreateButtonContainer
} from './transCreate-style';

import TransForm from '../../components/TransForm';
import Button from '../../components/Button';
import { transApi } from '../../api/transApi';
import { useToken } from '../../hooks/useToken';

export default function TransCreate() {
    const intl = useIntl();
    const token = useToken();
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();

    const [trans, setTrans] = useState({
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
        transaction_region: '', //待補前端設計

        price_lb: '', // price_lb目前是沒使用到的變數, 但之後可能會用到先留著
        price_ub: '', // price_ub目前是沒使用到的變數, 但之後可能會用到先留著

    })

    async function onSubmit() {
        console.log(trans);
        try{
            const data = await transApi.createTrans(trans, token);
            console.log(data);
            if(data.success){
                alert(intl.formatMessage({ id: 'trans.createSuccess'}));
                navigate('/post/published');
            }else{
                alert(intl.formatMessage({ id: 'trans.createFail'}));
            }
        }
        catch(e){
            // console.log(e);
            alert(intl.formatMessage({ id: 'trans.createFail'}));
        }
    }

    return (
        <CreateContainer>
            <TransForm trans={trans} setTrans={setTrans} />
            <CreateButtonContainer>
                <Button
                    text={intl.formatMessage({ id: 'back' })}
                    secondary={true}
                    onClick={() => window.history.back()}
                />
                <Button
                    text={intl.formatMessage({ id: 'trans.create' })}
                    onClick={() => onSubmit()}
                />
            </CreateButtonContainer>
        </CreateContainer>
    )
}