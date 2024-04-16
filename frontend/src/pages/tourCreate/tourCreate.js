import { useEffect, useState } from "react";

import { api } from "../../api";

import {
    CreateContainer,
    CreateButtonContainer
} from "./tourCreate-style";

import {
    FormInput,
    FormRange,
    FormBudget,
    FormDate
} from "../../components/FormInput";
import Button from "../../components/Button";

export default function TourCreate() {
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
                title='活動標題'
                placeholder='標題是什麼咧～'
                text={tour.event_title}
                setText={setTitle}
            />
            <FormInput
                type='input'
                title='目的地'
                placeholder='想要去哪裡玩？'
                text={tour.destination}
                setText={setDestination}
            />
            <FormRange
                title='徵求人數範圍'
                placeholder={['最少', '最多']}
                unit='人'
                range={[tour.people_lb, tour.people_ub]}
                setRange={setPeople}
            />
            <FormBudget
                title='預算範圍'
                placeholder={'最高'}
                currency={tour.currency}
                setCurrency={setCurrency}
                budget={tour.budget}
                setBudget={setBudget}
            />
            <FormDate
                title='日期'
                setDate={setDate}
            />
            <FormInput
                type='textarea'
                title='文字說明'
                placeholder='說些什麼吧！'
                text={tour.event_intro}
                setText={setIntro}
            />
            <CreateButtonContainer>
                <Button text='返回上頁' />
                <Button text='創建活動' onClick={() => onSubmit()}/>
            </CreateButtonContainer>
        </CreateContainer>
    )
}