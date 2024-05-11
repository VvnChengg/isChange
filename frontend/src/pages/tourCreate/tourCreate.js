import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';

import {
    CreateContainer,
    CreateButtonContainer
} from './tourCreate-style';

import TourForm from '../../components/TourForm';
import Button from '../../components/Button';
import { toast } from 'react-toastify';

export default function TourCreate() {
    const intl = useIntl();
    const navigate = useNavigate();

    const [tour, setTour] = useState({
        event_title: '',
        destination: '',
        people_lb: '',
        people_ub: '',
        budget: '',
        currency: 'TWD',
        start_time: '',
        end_time: '',
        event_intro: '',
    })

    function onSubmit() {
        console.log(tour);

        api.createTour(tour)
        .then(res => {
            // console.log(res);
            toast.success(res.message);
            navigate('/post/published');
        })
        .catch(err => {
            // console.log(err);
            toast.error(err.message);
        });
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
                    text={intl.formatMessage({ id: 'tour.create' })}
                    onClick={() => onSubmit()}
                />
            </CreateButtonContainer>
        </CreateContainer>
    )
}