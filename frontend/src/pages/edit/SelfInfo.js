import react, { Fragment, useState } from 'react';



export const SelfInfo = ({setIntroText, introText}) => {
    const ChangeIntro = (e) => {
        setIntroText(e.target.value);
    }

    return (
        <Fragment>
            <div className="section-heading">自我介绍</div>
            <textarea onChange={ChangeIntro} value={introText} className="self-intro" placeholder="限兩百字以內"></textarea>
        </Fragment>
    );
};