import react, { Fragment, useEffect, useState } from 'react';
import { editApi } from '../../api/editApi';


export const SelfInfo = ({setIntroText, introText}) => {
    
    const ChangeIntro = (e) => {
        setIntroText(e.target.value);
    }

    useEffect(() => {
        setIntroText(introText);
    }, [introText]);

    const handleSubmitIntro = async() => {
        console.log('儲存自我介紹:', introText);
        if (introText.length > 200) {
            alert('自我介紹超過兩百字');
            return;
        }

        try{
            const token = localStorage.getItem('access_token');
            const data = await editApi.editIntro(introText, token);
            if(data.status === 'success'){
                alert('儲存自我介紹成功');
            }
        }catch(error){
            console.error(error);
            alert('更新失敗');
        }
    }

    return (
        <Fragment>
            <div className="section-heading">自我介绍(限兩百字以內)</div>
            <textarea onChange={ChangeIntro} value={introText} className="self-intro" placeholder="限兩百字以內"></textarea>
            <button onClick={handleSubmitIntro}>儲存自我介紹</button>
        </Fragment>
    );
};