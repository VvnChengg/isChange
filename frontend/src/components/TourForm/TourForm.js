import { useIntl } from 'react-intl';

import {
    FormInput,
    FormRange,
    FormBudget,
    FormDate,
    FormImage,
    FormLocation
} from '../FormInput';

export default function TourForm({ tour, setTour }) {
    // console.log(tour)
    const intl = useIntl();

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

    function setStatus(input) {
        setTour({
            ...tour,
            status: input
        });
    }

    function setImage(input) {
        setTour({
            ...tour,
            event_pic: input
        });
    }

    //需要詳細地點object資料的時候才用
    function setRegionObject(input) {
        setTour({
            ...tour,
            region_object: input
        });
    }

    function setRegionString(input){
        setTour({
            ...tour,
            destination_string: input
        })
    }

    function setRegionCountry_Latitude_Longitute(input){
        setTour({
            ...tour,
            destination_string: input.destination_string,
            destination_zh_string: input.destination_zh_string,
            destination_en_string: input.destination_en_string,
            longitude: input.longitude,
            latitude: input.latitude,
        })
    }
    

    const statusOptions = [
        {
            value: 'ongoing',
            label: intl.formatMessage({ id: 'tour.ongoing' })
        },
        {
            value: 'complete',
            label: intl.formatMessage({ id: 'tour.complete' })
        },
        {
            value: 'end',
            label: intl.formatMessage({ id: 'tour.end' })
        }
    ];

    return (
        <>
            <FormInput
                type='input'
                title={intl.formatMessage({ id: 'title' })}
                placeholder={intl.formatMessage({ id: 'inputTitle' })}
                text={tour.event_title}
                setText={setTitle}
            />
            {/* <FormInput
                type='input'
                title={intl.formatMessage({ id: 'tour.destination' })}
                placeholder={intl.formatMessage({ id: 'tour.inputDestination' })}
                text={tour.destination}
                setText={setDestination}
                setStatus={setStatus}
                statusOptions={statusOptions}
                defaultStatus={tour.status}
            /> */}

            {tour.status && 
                <FormInput
                    type='temporary input'
                    title={intl.formatMessage({ id: 'tour.status' })}
                    placeholder={intl.formatMessage({ id: 'tour.inputDestination' })}
                    text={tour.destination}
                    setText={setDestination}
                    setStatus={setStatus}
                    statusOptions={statusOptions}
                    defaultStatus={tour.status}
                />
            }


            <FormLocation
                title={intl.formatMessage({ id: 'tour.destination' })}
                placeholder={intl.formatMessage({ id: 'tour.inputDestination' })}
                value = {tour.region_object}
                setValue = {setRegionObject}
                inputValue={tour.destination_string}
                setInputValue={setRegionString}
                setRegionCountry_Latitude_Longitute={setRegionCountry_Latitude_Longitute}
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
                defaultMinDate={tour.start_time? tour.start_time : ""}
                defaultMaxDate={tour.end_time? tour.end_time : ""}
            />
            <FormInput
                type='textarea'
                title={intl.formatMessage({ id: 'textarea' })}
                placeholder={intl.formatMessage({ id: 'inputTextarea' })}
                text={tour.event_intro}
                setText={setIntro}
            />
            <FormImage
                type='file'
                title={intl.formatMessage({id: 'tour.tourPicture'})}
                placeholder={intl.formatMessage({id: 'tour.tourPicture'})}
                imagePreviewUrl={tour.event_pic}
                setImagePreviewUrl={setImage}
            />
        </>
    )
}