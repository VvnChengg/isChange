import react, { Fragment, useEffect } from 'react';
import { editApi } from '../../api/editApi';
import editStyles from '../../styles/Edit.module.css';
import Button from '../../components/Button';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

// 編輯自我介紹的元件
export const SelfInfo = ({setIntroText, introText}) => {
    const intl = useIntl();
    const ChangeIntro = (e) => {
        setIntroText(e.target.value);
    }

    useEffect(() => {
        setIntroText(introText);
    }, [introText]);

    // 儲存自我介紹
    const handleSubmitIntro = async() => {
        if (introText.length > 200) {
            toast.error(`${intl.formatMessage({ id: 'edit.introRule' })}`);
            return;
        }

        try{
            const token = localStorage.getItem('access_token');
            const data = await editApi.editIntro(introText, token);
            if(data.status === 'success'){
                toast.success(`${intl.formatMessage({ id: 'edit.saveIntroSuccess' })}`);
            }
        }catch(error){
            toast.error(`${intl.formatMessage({ id: 'edit.saveIntroFail' })}`);
        }
    }

    return (
        <Fragment>
            <div className={editStyles.sectionHeading}> 
                <FormattedMessage id='edit.intro' />
            </div>
            <FormattedMessage id='edit.introRule'>
            {text=> <textarea onChange={ChangeIntro} value={introText} className={editStyles.selfIntro} placeholder={text}/> }
            </FormattedMessage>

            <div className={editStyles.introContainer}>
                <FormattedMessage id='edit.saveIntro'>
                {text=> <Button
                    style = {{width: '100%', marginTop: '10px'}}
                    onClick={handleSubmitIntro} 
                    text={text}/>}
                </FormattedMessage>
            </div>
        </Fragment>
    );
};