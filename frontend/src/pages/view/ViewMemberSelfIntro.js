import viewStyles from '../../styles/View.module.css';
import { FormattedMessage } from 'react-intl';

// 包含自我介紹
const ViewMemberSelfIntro = ({intro}) => {
  return (
    <div className={viewStyles.introduction}>
      <div className={viewStyles.introContainer}>
        <span className={viewStyles.introLabel}>
          <FormattedMessage id='view.intro' />
          </span>
        <textarea className={viewStyles.selfIntro} placeholder={intro} disabled></textarea>
      </div>
    </div>
  );
};

export default ViewMemberSelfIntro;