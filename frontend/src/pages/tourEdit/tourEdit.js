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
        destination: '',
        people_lb: '',
        people_ub: '',
        budget: '',
        currency: '',
        start_time: '',
        end_time: '',
        event_intro: '',
        user_id: user_id,
        tid: tid,
        status: 'ongoing'
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
                    setTour(prevTour => ({ ...prevTour, ...data.tour }));
                    // toast.success(`${intl.formatMessage({ id: 'tour.viewPageSuccess' })}`);
                }
    
            }
        }catch(e){
            toast.error(`${intl.formatMessage({ id: 'tour.viewPageFailed' })}`);
        }
        setIsLoading(false);
    }


    async function onSubmit() {
        // console.log(tour);

        // api: edit tour
        try{
            const data = await tourApi.editTour(tour, token);
            if(data.success){
                toast.success(`${intl.formatMessage({ id: 'tour.editSuccess' })}`);
                navigate('/post/published');
            }else{
                // alert(`${intl.formatMessage({ id: 'tour.editFailed' })}`);
                toast.error(`${intl.formatMessage({ id: 'tour.editFailed' })}`);
            }
        }
        catch(e){
            // alert(`${intl.formatMessage({ id: 'tour.editFailed' })}`);
            toast.error(`${intl.formatMessage({ id: 'tour.editFailed' })}`);
        }

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