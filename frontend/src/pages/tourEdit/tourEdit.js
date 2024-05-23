import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { tourApi } from '../../api/tourApi';

import {
    CreateContainer,
    CreateButtonContainer
} from './tourEdit-style';

import TourForm from '../../components/TourForm';
import Button from '../../components/Button';
import { useToken } from '../../hooks/useToken';
import { toast } from 'react-toastify';

export default function TourCreate() {
    const intl = useIntl();
    const navigate = useNavigate();
    const { tid } = useParams();
    const token = useToken();
    const user_id = localStorage.getItem('user_id');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [tour, setTour] = useState({
        event_title: '',
        people_lb: '',
        people_ub: '',
        budget: '',
        currency: '',
        start_time: '',
        end_time: '',
        event_intro: '',
        user_id: user_id,
        tid: tid,
        status: 'ongoing',

        destination_object: '',
        latitude: '',
        longitude: '',
    })


    useEffect(() => {
        // api: get tour detail & setTour
        if(token && tid && user_id){
            checkValidation();
        }
    }, [token, tid, user_id])


    async function checkValidation(){
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        }

        try{
            const data = await tourApi.editViewTour(tid, user_id, token);
            console.log(tour);
            if(data.success){
                const data = await tourApi.viewTour(tid);
                if(data.success){
                    data.tour.start_time = formatDate(data.tour.start_time);
                    data.tour.end_time = formatDate(data.tour.end_time);
                    console.log(data);
                    console.log(data.tour.destination_en);
                    console.log(data.tour.destination_zh);
                    setTour(prevTour => ({ 
                        ...prevTour,
                        ...data.tour,
                        longitude: data.tour.location.coordinates[0],
                        latitude: data.tour.location.coordinates[1],
                        region_object: (intl.locale === 'en' ? data.tour.destination_en : data.tour.destination_zh).join(', ')
                    }));
                }else{
                    toast.error(`${intl.formatMessage({ id: 'tour.viewPageFailed' })}`);
                }
            }
        }catch(e){
            toast.error(`${intl.formatMessage({ id: 'tour.viewPageFailed' })}`);
        }
        setIsLoading(false);
    }


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

        console.log(tour);

        try{
            const data = await tourApi.editTour(tour, token);
            if(data.success){
                toast.success(`${intl.formatMessage({ id: 'tour.editSuccess' })}`);
                // navigate('/post/published');
            }else{
                toast.error(`${intl.formatMessage({ id: 'tour.editFailed' })}`);
            }
        }
        catch(e){
            toast.error(`${intl.formatMessage({ id: 'tour.editFailed' })}`);
        }

        setIsSubmitting(false);
    }

    if (isLoading) {
        return <Spin />;
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
                
                    text={isSubmitting?
                        <div>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                        {intl.formatMessage({ id: 'loading' })}
                        </div> 
                        : intl.formatMessage({ id: 'tour.edit' })}
                    onClick={isSubmitting ? undefined : onSubmit}
                />
            </CreateButtonContainer>
        </CreateContainer>
    )
}