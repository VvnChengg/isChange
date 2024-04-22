import { useState } from 'react';
import { useIntl } from 'react-intl';

import { api } from '../../api';

import {
    CreateContainer,
    CreateButtonContainer
} from './tourCreate-style';

import {
    FormInput,
    FormRange,
    FormBudget,
    FormDate
} from '../../components/FormInput';
import Button from '../../components/Button';

export default function TourCreate() {
    const intl = useIntl();

    const [tour, setTour] = useState({
        event_title: '',
        destination: '',
        people_lb: '',
        people_ub: '',
        budget: '',
        currency: '',
        start_time: '',
        end_time: '',
        event_intro: '',
    })

    function setTitle(input) {
        setTour({
            ...tour,
            event_title: input
        });
    }

    function setDestination(input) {
        setTour({
            ...tour,
            destination: input
        });
    }

    function setPeople([input1, input2]) {
        setTour({
            ...tour,
            people_lb: input1,
            people_ub: input2,
        });
    }

    function setBudget(input) {
        setTour({
            ...tour,
            budget: input,
        });
    }

    function setCurrency(input) {
        setTour({
            ...tour,
            currency: input
        });
    }

    const setDate = (date, dateString) => {
        // console.log('Selected Date:', date);
        // console.log('Formatted Date:', dateString);
    
        setTour({
            ...tour,
            start_time: dateString[0],
            end_time: dateString[1]
        });
    };

    function setIntro(input) {
        setTour({
            ...tour,
            event_intro: input
        });
    }

    function onSubmit() {
        console.log(tour);

        api.createTour(tour)
        .then(res => {
            console.log(res);
            alert(res.message);
        })
        .catch(err => {
            console.log(err);
            alert(err.message);
        });
    }

    return (
        <CreateContainer>
            <FormInput
                type='input'
                title={intl.formatMessage({ id: 'title' })}
                placeholder={intl.formatMessage({ id: 'inputTitle' })}
                text={tour.event_title}
                setText={setTitle}
            />
            <FormInput
                type='input'
                title={intl.formatMessage({ id: 'tour.destination' })}
                placeholder={intl.formatMessage({ id: 'tour.inputDestination' })}
                text={tour.destination}
                setText={setDestination}
            />
            <FormRange
                title={intl.formatMessage({ id: 'tour.people' })}
                placeholder={[intl.formatMessage({ id: 'tour.min' }),
                              intl.formatMessage({ id: 'tour.max' })]}
                unit={intl.formatMessage({ id: 'tour.peopleUnit' })}
                range={[tour.people_lb, tour.people_ub]}
                setRange={setPeople}
            />
            <FormBudget
                title={intl.formatMessage({ id: 'tour.budget' })}
                placeholder={intl.formatMessage({ id: 'tour.max' })}
                currency={tour.currency}
                setCurrency={setCurrency}
                budget={tour.budget}
                setBudget={setBudget}
            />
            <FormDate
                title={intl.formatMessage({ id: 'tour.date' })}
                setDate={setDate}
            />
            <FormInput
                type='textarea'
                title={intl.formatMessage({ id: 'textarea' })}
                placeholder={intl.formatMessage({ id: 'inputTextarea' })}
                text={tour.event_intro}
                setText={setIntro}
            />
            <CreateButtonContainer>
                <Button
                    text={intl.formatMessage({ id: 'back' })}
                />
                <Button
                    text={intl.formatMessage({ id: 'tour.create' })}
                    onClick={() => onSubmit()}
                />
            </CreateButtonContainer>
        </CreateContainer>
    )
}