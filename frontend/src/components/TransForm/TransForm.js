import { useState } from 'react';
import React from 'react';
import { useIntl } from 'react-intl';

import {
    FormInput,
    FormRange,
    FormBudget,
    FormDate,
    FormCheck,
    FormImage,
    FormLocation
} from '../FormInput';
import Button from '../Button';

export default function TransForm({ trans, setTrans }) {
    console.log(trans);
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

    function setStatus(input) {
        setTrans({
            ...trans,
            trans_status: input
        })
    }

    function setProductType(input) {
        setTrans({
            ...trans,
            product_type: input
        });
    }


    function setPrice([input1, input2]) {
        setTrans({
            ...trans,
            price_lb: input1,
            price_ub: input2,
        });
    }

    function setBudget(input) {
        setTrans({
            ...trans,
            budget: input,
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
            trans_intro: input
        });
    }

    function setImage(input) {
        setTrans({
            ...trans,
            product_pic: input
        });
    }

    //需要詳細地點object資料的時候才用
    function setRegionObject(input) {
        setTrans({
            ...trans,
            transaction_region: input
        });
    }

    function setRegionString(input){
        setTrans({
            ...trans,
            transaction_region_string: input
        })
    }

    // React.useEffect(() => {
    //     console.log(trans);
    // },[trans])

    function setRegionCountry_Latitude_Longitute(input){
        setTrans({
            ...trans,
            transaction_region_string: input.region_string,
            transaction_region_zh: input.transaction_region_zh,
            transaction_region_en: input.transaction_region_en,
            transaction_region_location_latitude: input.latitude,
            transaction_region_location_longitude: input.longitude
        })
    }

    const typeOptions = [
        {
            label: intl.formatMessage({ id: 'trans.sell'}),
            value: 'sell',
        },
        {
            label: intl.formatMessage({ id: 'trans.buy'}),
            value: 'purchase',
        },
        {
            label: intl.formatMessage({ id: 'trans.lend'}),
            value: 'lend',
        },
        {
            label: intl.formatMessage({ id: 'trans.rent'}),
            value: 'borrow',
        }
    ]

    const productOptions = [
        {
            label: intl.formatMessage({ id: 'trans.kitchen'}),
            value: 'kitchen',
        },
        {
            label: intl.formatMessage({ id: 'trans.livingRoom'}),
            value: 'living room',
        },
        {
            label: intl.formatMessage({ id: 'trans.restroom'}),
            value: 'restroom',
        },
        {
            label: intl.formatMessage({ id: 'trans.cosmetic'}),
            value: 'cosmetic',
        },
        {
            label: intl.formatMessage({ id: 'trans.clothing'}),
            value: 'clothing',
        },
        {
            label: intl.formatMessage({ id: 'trans.others'}),
            value: 'others',
        }
    ]

    const statusOptions = [
        { value: 'in stock', label: intl.formatMessage({ id: 'trans.instock' }) },
        { value: 'reserved', label: intl.formatMessage({ id: 'trans.reserved' }) },
        { value: 'sold', label: intl.formatMessage({ id: 'trans.sold' }) },
    ];

    function onTypeChange(e) {
        setType(e.target.value)
    }

    function onProductTypeChange(e) {
        setProductType(e.target.value)
    }

    return (
        <>
            <FormInput
                type='input'
                title={intl.formatMessage({ id: 'title' })}
                placeholder={intl.formatMessage({ id: 'inputTitle' })}
                text={trans.trans_title}
                setText={setTitle}
            />
            <FormLocation
                title={intl.formatMessage({ id: 'trans.productRegion' })}
                placeholder={intl.formatMessage({ id: 'trans.productRegionHint' })}
                value = {trans.transaction_region}
                setValue = {setRegionObject}
                inputValue={trans.transaction_region_string}
                setInputValue={setRegionString}
                setRegionCountry_Latitude_Longitute={setRegionCountry_Latitude_Longitute}
            />
            <FormCheck
                title={intl.formatMessage({ id: 'trans.type' })}
                options={typeOptions}
                onChange={onTypeChange}
                defaultOption={trans.trans_type}
                trans_NowStatus = {trans.transform_type === 'edit'? trans.trans_status : null}
                setStatus={trans.transform_type === 'edit'? setStatus : null}
                statusOptions={statusOptions}
            />
            <FormCheck
                title={intl.formatMessage({ id: 'trans.productType' })}
                options={productOptions}
                onChange={onProductTypeChange}
                defaultOption={trans.product_type}
            />

            {/* <FormRange
                title={intl.formatMessage({ id: 'trans.price' })}
                placeholder={[intl.formatMessage({ id: 'trans.min' }),
                              intl.formatMessage({ id: 'trans.max' })]}
                unit={trans.currency}
                range={[trans.price_lb, trans.price_ub]}
                setRange={setPrice}
            /> */}

            <FormBudget
                title={intl.formatMessage({id: 'trans.price'})}
                placeholder={intl.formatMessage({id: 'trans.max'})}
                currency = {trans.currency}
                budget={trans.budget}
                setBudget={setBudget}
                setCurrency = {setCurrency}
            />

            {trans.trans_type === 'borrow' &&
                <FormDate
                    title={intl.formatMessage({ id: 'trans.date' })}
                    setDate={setDate}
                    defaultMinDate={trans.rent_start_time}
                    defaultMaxDate={trans.rent_end_time}
                />
            }

            <FormInput
                type='textarea'
                title={intl.formatMessage({ id: 'textarea' })}
                placeholder={intl.formatMessage({ id: 'inputTextarea' })}
                text={trans.trans_intro}
                setText={setIntro}
            />

            <FormImage
                type='file'
                title={intl.formatMessage({id: 'trans.productPicture'})}
                placeholder={intl.formatMessage({id: 'trans.productPicture'})}
                onFileChange={e => console.log(e.target.files)}
                imagePreviewUrl={trans.product_pic}
                setImagePreviewUrl={setImage}
            />
        </>
    )
}