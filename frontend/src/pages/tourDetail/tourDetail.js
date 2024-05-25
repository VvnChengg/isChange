import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import { tourApi } from '../../api/tourApi';

import {
    DetailContainer,
    DetailButtonContainer
} from './tourDetail-style';

import PostDetail from '../../components/PostDetail';
import Button from '../../components/Button';

import { toast } from 'react-toastify';


export default function TourDetail() {
    const intl = useIntl();
    const { tid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const user_id = localStorage.getItem('user_id');

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
        // api: get tour detail
        if(tid){
            viewTour();
        }

    }, [tid, user_id]);

    async function viewTour() {
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        }
        
        try{
            const data = await tourApi.viewTour(tid,user_id);
            // console.log(data);
            if(data.success){
                data.tour.start_time = formatDate(data.tour.start_time);
                data.tour.end_time = formatDate(data.tour.end_time);
                setTour(prevTour => ({...prevTour, ...data.tour, tid: data.tour._id}));
                // toast.success(`${intl.formatMessage({ id: 'tour.viewPageSuccess' })}`);
            }
    
        }catch(err){
            toast.error(`${intl.formatMessage({ id: 'tour.viewPageFailed' })}`);
        }

        setIsLoading(false);
    }

    function contact() {
        // console.log('contact');

        // api: send msg
        if(tour.creator_username){
            navigate(`/member/${tour.creator_username}`);
        }
        
    }

    if (isLoading) {
        return <Spin />;
    }


    return (
        <DetailContainer>
            <PostDetail post={tour} />
            <DetailButtonContainer>
                <Button
                    text={intl.formatMessage({ id: 'back' })}
                    secondary={true}
                    onClick={() => window.history.back()}
                />
                {user_id !== tour.creator_id && tour.creator_username &&
                    <Button
                        text={intl.formatMessage({ id: 'tour.message' })}
                        onClick={() => contact()}
                    />
                }
            </DetailButtonContainer>
        </DetailContainer>
    )
}