import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { tourApi } from '../../api/tourApi';
import { useToken } from '../../hooks/useToken';

import {
    CreateContainer,
    CreateButtonContainer
} from './tourCreate-style';

import TourForm from '../../components/TourForm';
import Button from '../../components/Button';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function TourCreate() {
    const intl = useIntl();
    const navigate = useNavigate();
    const token = useToken();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const user_id = localStorage.getItem('user_id');

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
        event_pic: '',
        user_id: user_id,
        latitude: '',
        longitude: '',
    })

    async function onSubmit() {
        setIsSubmitting(true);

        if(tour.destination_en_string !== undefined || tour.destination_zh_string !== undefined){
            // 送出前先把destination_en, destination_zh轉成後端需要的格式
            let destination_en_string = tour.destination_en_string;
            let destination_zh_string = tour.destination_zh_string;
        
            // 如果只有一個destination, 則將其設為另一個語言的destination
            if (typeof destination_en_string === 'undefined') {
                destination_en_string = destination_zh_string;
            }
        
            if (typeof destination_zh_string === 'undefined') {
                destination_zh_string = destination_en_string;
            }
        
            tour.destination_en = destination_en_string.split(", ").map(item => item.trim());
            tour.destination_zh = destination_zh_string.split(", ").map(item => item.trim());
        }

        if(tour.longitude !== undefined && tour.latitude !== undefined){
            // 把經緯度轉成後端需要的格式
            let location = {
                type: "Point",
                coordinates: [Number(tour.longitude), Number(tour.latitude)]
            };
            tour.location = location;
        }

        // Error control
        let trySubmit = true;
        if (tour.event_title === "") {
            toast.error(intl.formatMessage({ id: 'tour.titleRequired' }));
            trySubmit = false;
        }
        
        if (tour.longitude === "" && tour.latitude === "") {
            toast.error(intl.formatMessage({ id: 'tour.destinationRequired' }));
            trySubmit = false;
        }

        if (tour.people_lb === "" && tour.people_ub === "") {
            toast.error(intl.formatMessage({ id: 'tour.rangeOfPeopleRequired' }));
            trySubmit = false;
        }else if (tour.people_lb > tour.people_ub) {
            toast.error(intl.formatMessage({ id: 'tour.rangeOfPeopleError' }));
            trySubmit = false;
        }

        if (tour.budget === "") {
            toast.error(intl.formatMessage({ id: 'tour.rangeOfBudgetRequired' }));
            trySubmit = false;
        }

        if (tour.start_time === "" && tour.end_time === "") {
            toast.error(intl.formatMessage({ id: 'tour.dateRequired' }));
            trySubmit = false;
        }

        if (tour.event_intro === "") {
            toast.error(intl.formatMessage({ id: 'tour.descriptionRequired' }));
            trySubmit = false;
        }

        if (trySubmit) {
            try{
                const data = await tourApi.createTour(tour, token);
                console.log(data);
                if(data.success){
                    toast.success(intl.formatMessage({ id: 'tour.createSuccess' }));
                    navigate('/post/published');
                }else{
                    toast.error(intl.formatMessage({ id: 'tour.createFailed' }));
                }
            }catch(err){
                toast.error(intl.formatMessage({ id: 'tour.createFailed' }));
            }
        }

        setIsSubmitting(false);
    }

    return (
        <CreateContainer>
            <TourForm tour={tour} setTour={setTour} />
            <CreateButtonContainer>
                <Button
                    text={intl.formatMessage({ id: 'back' })}
                    secondary={true}
                    onClick={() => window.history.back()}
                />
                <Button
                    style={{
                        backgroundColor: isSubmitting ? '#ccc' : '',
                        color: isSubmitting ? '#888' : '',
                        cursor: isSubmitting ? 'not-allowed' : '',
                    }}
                    text={isSubmitting ?
                        <div>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                        {intl.formatMessage({ id: 'loading' })}
                        </div> 
                        : intl.formatMessage({ id: 'tour.create' })}
                    onClick={isSubmitting ? undefined : onSubmit}
                />
            </CreateButtonContainer>
        </CreateContainer>
    )
}