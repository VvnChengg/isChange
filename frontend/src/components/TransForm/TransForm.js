import { useState } from 'react';
import { useIntl } from 'react-intl';

import {
    FormInput,
    FormRange,
    FormBudget,
    FormDate,
    FormCheck
} from '../FormInput';
import Button from '../Button';

export default function TransForm({ trans, setTrans }) {
    const intl = useIntl();

    function setTitle(input) {
        setTrans({
            ...trans,
            trans_title: input
        });
    }

    function setType(input) {
        setTrans({
            ...trans,
            trans_type: input
        });
    }

    function setPrice([input1, input2]) {
        setTrans({
            ...trans,
            price_lb: input1,
            price_ub: input2,
        });
    }

    function setCurrency(input) {
        setTrans({
            ...trans,
            currency: input
        });
    }

    const setDate = (date, dateString) => {
        setTrans({
            ...trans,
            rent_start_time: dateString[0],
            rent_end_time: dateString[1]
        });
    };

    function setIntro(input) {
        setTrans({
            ...trans,
            event_intro: input
        });
    }

    const typeOptions = [
        {
            label: intl.formatMessage({ id: 'trans.sell'}),
            value: 'sell',
        },
        {
            label: intl.formatMessage({ id: 'trans.buy'}),
            value: 'buy',
        },
        {
            label: intl.formatMessage({ id: 'trans.lend'}),
            value: 'lend',
        },
        {
            label: intl.formatMessage({ id: 'trans.rent'}),
            value: 'rent',
        }
    ]

    function onTypeChange(e) {
        setType(e.target.value)
    }

    return (
        <>
            <FormInput
                type='input'
                title={intl.formatMessage({ id: 'title' })}
                placeholder={intl.formatMessage({ id: 'inputTitle' })}
                text={trans.event_title}
                setText={setTitle}
            />
            <FormCheck
                title={intl.formatMessage({ id: 'trans.type' })}
                options={typeOptions}
                onChange={onTypeChange}
            />
            <FormRange
                title={intl.formatMessage({ id: 'trans.price' })}
                placeholder={[intl.formatMessage({ id: 'trans.min' }),
                              intl.formatMessage({ id: 'trans.max' })]}
                unit={trans.currency}
                range={[trans.price_lb, trans.price_ub]}
                setRange={setPrice}
            />
            {trans.trans_type === 'rent' &&
                <FormDate
                    title={intl.formatMessage({ id: 'trans.date' })}
                    setDate={setDate}
                />
            }
            <FormInput
                type='textarea'
                title={intl.formatMessage({ id: 'textarea' })}
                placeholder={intl.formatMessage({ id: 'inputTextarea' })}
                text={trans.event_intro}
                setText={setIntro}
            />
        </>
    )
}