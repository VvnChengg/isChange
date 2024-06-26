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
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function TransCreate() {
    const intl = useIntl();
    const token = useToken();
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [trans, setTrans] = useState({
        transform_type: 'create',
        trans_title: '',
        trans_type: 'sell',
        currency: 'TWD',
        budget: '',
        rent_start_time: '',
        rent_end_time: '',
        trans_intro: '',
        user_id: user_id,

        product_type: 'kitchen',
        product_pic: '',

        price_lb: '', // price_lb目前是沒使用到的變數, 但之後可能會用到先留著
        price_ub: '', // price_ub目前是沒使用到的變數, 但之後可能會用到先留著

        destination_object: '',
        latitude: '',
        longitude: '',
    })

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
        }

        if(trans.longitude !== undefined && trans.latitude !== undefined){
            // 把經緯度轉成後端需要的格式
            let location = {
                type: "Point",
                coordinates: [Number(trans.longitude), Number(trans.latitude)]
            };
            trans.location = location;
        }

        // Error control
        let trySubmit = true;
        if (trans.trans_title === "") {
        toast.error(intl.formatMessage({ id: 'trans.titleRequired' }));
        trySubmit = false;
        }

        if (trans.longitude === "" && trans.latitude === "") {
        toast.error(intl.formatMessage({ id: 'trans.productRegionRequired' }));
        trySubmit = false;
        }

        if (trans.budget === "") {
            toast.error(intl.formatMessage({ id: 'trans.priceRequired' }));
            trySubmit = false;
        }

        if (trans.trans_intro === "") {
            toast.error(intl.formatMessage({ id: 'trans.descriptionRequired' }));
            trySubmit = false;
        }

        if (trySubmit) {
            try{
                const data = await transApi.createTrans(trans, token);
                if(data.success){
                    toast.success(intl.formatMessage({ id: 'trans.createSuccess'}));
                    navigate('/post/published');
                }else{
                    toast.error(intl.formatMessage({ id: 'trans.createFail'}));
                }
            }
            catch(e){
                toast.error(intl.formatMessage({ id: 'trans.createFail'}));
            }
        }

        setIsSubmitting(false);
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
                        : intl.formatMessage({ id: 'trans.create' })}
                    onClick={isSubmitting ? undefined : onSubmit}
                />
            </CreateButtonContainer>
        </CreateContainer>
    )
}