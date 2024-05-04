import React, { useRef, useEffect, useState } from 'react';
import {
    FormTextBox,
    FormTextTitle,
    FormTextInput,
    FormTextarea,
    FormTextSelect
} from './FormInput-style.js';

import { useIntl } from 'react-intl';
import { Radio, DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Button from '../Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';


dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


export function FormInput({ type, title, placeholder, text, setText }) {
    return (
        <FormTextBox>
            <FormTextTitle>{title}</FormTextTitle>
            {type === 'input' ?
                <FormTextInput
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder={placeholder}
                /> :
                <FormTextarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder={placeholder}
                    rows={5}
                />
            }
        </FormTextBox>
    )
}

export function FormRange({ title, placeholder, unit, range, setRange }) {
    return (
        <FormTextBox>
            <FormTextTitle>{title}</FormTextTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between' }}>
                    <FormTextInput
                        value={range[0]}
                        onChange={e => {
                            var newRange = [...range];
                            newRange[0] = e.target.value;
                            setRange(newRange);
                        }}
                        placeholder={placeholder[0]}
                    />
                    <div>—</div>
                    <FormTextInput
                        value={range[1]}
                        onChange={e => {
                            var newRange = [...range];
                            newRange[1] = e.target.value;
                            setRange(newRange);
                        }}
                        placeholder={placeholder[1]}
                    />
                </div>
                <div>{unit}</div>
            </div>
        </FormTextBox>
    )
}

export function FormBudget({ title, placeholder, currency, setCurrency, budget, setBudget, currencies }) {
    if (currencies === undefined) {
        currencies = ["USD", "GBP", "EUR", "TWD", "CAD", "AUD"];
    }
    return (
        <FormTextBox>
            <FormTextTitle>{title}</FormTextTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between' }}>
                    <FormTextInput
                        type="number"
                        value={budget}
                        onChange={e => setBudget(e.target.value)}
                        placeholder={placeholder}
                    />
                </div>
                {/* <FormTextInput
                    value={currency}
                    onChange={e => setCurrency(e.target.value)}
                    placeholder={intl.formatMessage({ id: 'formInput.unit' })}
                    style={{ width: '50px', textAlign: 'right' }}
                /> */}
                <FormTextSelect value={currency} onChange={e => setCurrency(e.target.value)}>
                    {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </FormTextSelect>
            </div>
        </FormTextBox>
    )
}

export function FormDate({ title, setDate, defaultMinDate, defaultMaxDate }) {
    const intl = useIntl();
    return (
        <FormTextBox>
            <FormTextTitle>{title}</FormTextTitle>
            <RangePicker
                style={{
                    border: 'none',
                    padding: 0
                }}
                placeholder={[intl.formatMessage({ id: 'formInput.startDate' }),
                intl.formatMessage({ id: 'formInput.endDate' })]}
                onChange={setDate}
                defaultValue={defaultMinDate && defaultMaxDate ? [dayjs(defaultMinDate, dateFormat), dayjs(defaultMaxDate, dateFormat)] : undefined}
            />
        </FormTextBox>
    )
}

export function FormCheck({ title, options, onChange, defaultOption }) {

    let defaultOptionIndex = -1;
    if (defaultOption !== undefined) {
        defaultOptionIndex = options.findIndex(option => option.value === defaultOption);
    }


    return (
        <FormTextBox>
            <FormTextTitle>{title}</FormTextTitle>
            <Radio.Group
                style={{ textAlign: 'left' }}
                options={options}
                defaultValue={options[0].value}
                value={defaultOptionIndex != -1 ? options[defaultOptionIndex].value : options[0].value}
                onChange={onChange}
            />
        </FormTextBox>
    )
}

export function FormImage({ title, placeholder, text, setText, setImagePreviewUrl, imagePreviewUrl }) {
    const intl = useIntl();
    const fileInput = useRef(null);
    const [blobUrl, setBlobUrl] = useState(null);


    const handleButtonClick = () => {
        fileInput.current.click();
    }

    const onFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        }

        reader.readAsDataURL(file);
    }
    // useEffect(() => {
    //     console.log(imagePreviewUrl);
    // }, [imagePreviewUrl])

    return (
        <FormTextBox style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <FormTextTitle style={{ whiteSpace: 'nowrap' }}>{title}</FormTextTitle>
                <Button
                    text={intl.formatMessage({ id: 'edit.uploadImage' })}
                    onClick={handleButtonClick}
                />
            </div>
            <FormTextInput
                type="file"
                ref={fileInput}
                onChange={onFileChange}
                style={{ display: 'none' }}
                placeholder={placeholder}
            />
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Image preview" style={{ maxWidth: '20vh', maxHeight: '20vh', objectFit: 'contain' }} />}

        </FormTextBox>
    )
}


