import { useState } from 'react';
import { useIntl } from 'react-intl';

import { api } from '../../api';

import {
    CreateContainer,
    CreateButtonContainer
} from './transCreate-style';

import TransForm from '../../components/TransForm';
import Button from '../../components/Button';

export default function TransCreate() {
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
        <CreateContainer>
            <TransForm trans={trans} setTrans={setTrans} />
            <CreateButtonContainer>
                <Button
                    text={intl.formatMessage({ id: 'back' })}
                    secondary={true}
                />
                <Button
                    text={intl.formatMessage({ id: 'trans.create' })}
                    onClick={() => onSubmit()}
                />
            </CreateButtonContainer>
        </CreateContainer>
    )
}