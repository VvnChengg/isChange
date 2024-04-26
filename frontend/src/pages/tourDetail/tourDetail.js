import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { api } from '../../api';

import {
    DetailContainer,
    DetailButtonContainer
} from './tourDetail-style';

import PostDetail from '../../components/PostDetail';
import Button from '../../components/Button';

export default function TourDetail() {
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

    const sampleTour = {
        event_title: '西班牙四天三夜自由行',
        destination: '西班牙',
        people_lb: 1,
        people_ub: 10,
        budget: 600,
        currency: 'EUR',
        start_time: '2024/04/14',
        end_time: '2024/04/23',
        event_intro: 
            `4/1 9:00AM 馬德里機場集合\n
            Day 1 馬德里王宮、普拉多博物館\n
            Day 2 太陽門廣場、托雷多、賽哥維亞\n
            Day 3 聖家堂、奎爾公園\n
            Day 4 米拉之家、蒙塞拉特修道院\n
            4/4 18:00 馬德里機場解散`
    }

    useEffect(() => {
        setTour(sampleTour);
        // api: get tour detail
        // 串好就可以把 sampleTour 拿掉
    }, []);

    function contact() {
        console.log('contact');

        // api: send msg
    }

    return (
        <DetailContainer>
            <PostDetail post={tour} />
            <DetailButtonContainer>
                <Button
                    text={intl.formatMessage({ id: 'back' })}
                    secondary={true}
                />
                <Button
                    text={intl.formatMessage({ id: 'tour.message' })}
                    onClick={() => contact()}
                />
            </DetailButtonContainer>
        </DetailContainer>
    )
}