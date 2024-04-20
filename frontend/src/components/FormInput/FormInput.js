import {
    FormTextBox,
    FormTextTitle,
    FormTextInput,
    FormTextarea
} from './FormInput-style.js';

import { useIntl } from 'react-intl';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export function FormInput({type, title, placeholder, text, setText}) {
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

export function FormRange({title, placeholder, unit, range, setRange}) {
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

export function FormBudget({title, placeholder, currency, setCurrency, budget, setBudget}) {
    const intl = useIntl();
    return (
        <FormTextBox>
            <FormTextTitle>{title}</FormTextTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between' }}>
                    <FormTextInput
                        value={budget}
                        onChange={e => setBudget(e.target.value)}
                        placeholder={placeholder}
                    />
                </div>
                <FormTextInput
                    value={currency}
                    onChange={e => setCurrency(e.target.value)}
                    placeholder={intl.formatMessage({ id: 'formInput.unit' })}
                    style={{ width: '50px', textAlign: 'right' }}
                />
            </div>
        </FormTextBox>
    )
}

export function FormDate({title, setDate}) {
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
            />
        </FormTextBox>
    )
}