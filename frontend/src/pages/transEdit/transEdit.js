import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { api } from '../../api';

import {
    EditContainer,
    EditButtonContainer
} from './transEdit-style';

import TransForm from '../../components/TransForm';
import Button from '../../components/Button';

export default function TransEdit() {
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

    useEffect(() => {
        // api: get trans detail & setTrans
    })

    function onSubmit() {
        console.log(trans);

        // api.createtrans(trans)
        // .then(res => {
        //     console.log(res);
        //     alert(res.message);
        // })
        // .catch(err => {
        //     console.log(err);
        //     alert(err.message);
        // });
    }

    return (
        <EditContainer>
            <TransForm trans={trans} setTrans={setTrans} />
            <EditButtonContainer>
                <Button
                    text={intl.formatMessage({ id: 'back' })}
                    secondary={true}
                />
                <Button
                    text={intl.formatMessage({ id: 'trans.edit' })}
                    onClick={() => onSubmit()}
                />
            </EditButtonContainer>
        </EditContainer>
    )
}