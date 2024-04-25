import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { api } from '../../api';

import {
    CreateContainer,
    CreateButtonContainer
} from './tourEdit-style';

import TourForm from '../../components/TourForm';
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

    useEffect(() => {
        // api: get tour detail & setTour
    })

    function onSubmit() {
        console.log(tour);

        // api: edit tour
        // api.createTour(tour)
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
            <TourForm tour={tour} setTour={setTour} />
            <CreateButtonContainer>
                <Button
                    text={intl.formatMessage({ id: 'back' })}
                    secondary={true}
                />
                <Button
                    text={intl.formatMessage({ id: 'tour.edit' })}
                    onClick={() => onSubmit()}
                />
            </CreateButtonContainer>
        </CreateContainer>
    )
}