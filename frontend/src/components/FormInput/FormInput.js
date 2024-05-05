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
import axios from 'axios';


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

export function FormCheck({ title, options, onChange, defaultOption, trans_NowStatus, statusOptions, setStatus }) {

    let defaultOptionIndex = -1;
    if (defaultOption !== undefined) {
        defaultOptionIndex = options.findIndex(option => option.value === defaultOption);
    }


    return (
        <FormTextBox>
        <FormTextTitle>{title}</FormTextTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between' }}>

                <Radio.Group
                    style={{ textAlign: 'left' }}
                    options={options}
                    defaultValue={options[0].value}
                    value={defaultOptionIndex != -1 ? options[defaultOptionIndex].value : options[0].value}
                    onChange={onChange}
                />
            </div>
            {setStatus &&
                <FormTextSelect value={trans_NowStatus} onChange={e => setStatus(e.target.value)}>
                    {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                </FormTextSelect>
            }
        </div>

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


export function FormLocation({ type, title, placeholder, value, setValue, inputValue, setInputValue,
    setRegionCountry_Latitude_Longitute }) {
    // console.log(GOOGLE_MAPS_API_KEY);

    function loadScript(src, position, id) {
        if (!position) {
            return;
        }

        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', id);
        script.src = src;
        position.appendChild(script);
    }

    async function getCountryNameZH(lat, lng) {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}&language=en`);
        const results = response.data.results;
        if (results[0]) {
            for (let i = 0; i < results[0].address_components.length; i++) {
                if (results[0].address_components[i].types.includes('country')) {
                    return results[0].address_components[i].long_name;
                }
            }
        }
        return null;
    }

    async function getCityOrCountryNameZH(lat, lng) {
        function isChinese(text) {
            const re = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            return re.test(text);
        }

        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}&language=zh-TW`);
        const results = response.data.results;
        let country = null;
        let city = null;

        for (let j = 0; j < results.length; j++) {
            for (let i = 0; i < results[j].address_components.length; i++) {
                if (results[j].address_components[i].types.includes('locality') && isChinese(results[j].address_components[i].long_name)) {
                    city = results[j].address_components[i].long_name;
                }
                if (results[j].address_components[i].types.includes('country') && isChinese(results[j].address_components[i].long_name)) {
                    country = results[j].address_components[i].long_name;
                }
                if (!city && results[j].address_components[i].types.includes('administrative_area_level_1') && isChinese(results[j].address_components[i].long_name)) {
                    city = results[j].address_components[i].long_name;
                }
            }
        }

        return city ? `${country}, ${city}` : country;
    }

    async function getCityOrCountryNameEN(lat, lng) {
        function isEnglish(text) {
            const re = /^[A-Za-z\s]*$/;
            return re.test(text);
        }

        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}&language=en`);
        const results = response.data.results;
        let country = null;
        let city = null;

        for (let j = 0; j < results.length; j++) {
            for (let i = 0; i < results[j].address_components.length; i++) {
                if (results[j].address_components[i].types.includes('locality') && isEnglish(results[j].address_components[i].long_name)) {
                    city = results[j].address_components[i].long_name;
                }
                if (results[j].address_components[i].types.includes('country') && isEnglish(results[j].address_components[i].long_name)) {
                    country = results[j].address_components[i].long_name;
                }
                if (!city && results[j].address_components[i].types.includes('administrative_area_level_1') && isEnglish(results[j].address_components[i].long_name)) {
                    city = results[j].address_components[i].long_name;
                }
            }
        }

        return city ? `${country}, ${city}` : country;
    }

    const autocompleteService = { current: null };

    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
                document.querySelector('head'),
                'google-maps',
            );
        }

        loaded.current = true;
    }

    const fetch = React.useMemo(
        () =>
            debounce((request, callback) => {
                if (autocompleteService.current)
                    autocompleteService.current.getPlacePredictions(request, callback);
            }, 400),
        [autocompleteService],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current =
                new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }
        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue]);

    React.useEffect(() => {
        // 這裡的代碼只有在 `value` 變化時才會運行
        // console.log(value);

        if (value !== null && value !== undefined && value.description !== undefined && value.description !== null) {
            // 這邊可以轉經緯度, 但還沒確定有沒要用所以先註解掉
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: value.description }, (results, status) => {
                if (status === 'OK') {
                    const latitude = results[0].geometry.location.lat();
                    const longitude = results[0].geometry.location.lng();
                    // console.log('Latitude: ' + latitude);
                    // console.log('Longitude: ' + longitude);


                    (async () => {
                        try {
                            const region_en = await getCityOrCountryNameEN(latitude, longitude);
                            const region_zh = await getCityOrCountryNameZH(latitude, longitude);
                            // console.log(region_en);
                            // console.log(region_zh);
                            setRegionCountry_Latitude_Longitute({
                                region_string: value.description,
                                transaction_region_zh: region_zh,
                                transaction_region_en: region_en,
                                latitude: latitude,
                                longitude: longitude,
                            })
                        } catch (error) {
                            console.log(error);
                        }
                    })();
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        }

    }, [value]);

    // React.useEffect(() => {
    //     // 這裡的代碼只有在 `inputValue` 變化時才會運行
    //     console.log("inputValue")
    //     console.log(inputValue)
    // }, [inputValue]);

    // React.useEffect(() => {
    //     // 這裡的代碼只有在 `fetch` 變化時才會運行
    //     console.log("fetch")
    //     console.log(fetch)
    // }, [fetch]);

    return (
        <Autocomplete
            id="google-map-demo"
            sx={{
                minWidth: '50px',
            }}

            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="No locations"
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                // <TextField {...params} 
                // // label="Add a location" 
                // fullWidth
                // />
                <FormTextBox ref={params.InputProps.ref}>
                    <FormTextTitle>{title}</FormTextTitle>
                    <input
                        type="text"
                        style={{
                            minWidth: '50px',
                            border: '0',
                            padding: '0',
                            outline: 'none',
                        }}
                        placeholder={placeholder}
                        {...params.inputProps}
                    />
                </FormTextBox>

            )}
            renderOption={(props, option) => {
                const matches =
                    option.structured_formatting.main_text_matched_substrings || [];

                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <LocationOnIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                {parts.map((part, index) => (
                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                    >
                                        {part.text}
                                    </Box>
                                ))}
                                <Typography variant="body2" color="text.secondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}
