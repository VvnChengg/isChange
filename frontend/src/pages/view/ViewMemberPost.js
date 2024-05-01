import viewStyles from '../../styles/View.module.css';
import { FormattedMessage } from 'react-intl';

// 包含過往發文紀錄 (demo2進度)
const ViewMemberPost = () => {
  return (
    <div className={viewStyles.post}>
      <div className={viewStyles.postContainer}>
        <span className={viewStyles.postLabel}>
          <FormattedMessage id='view.past' />
          </span>
        <textarea className={viewStyles.postIntro} placeholder='過往發文紀錄- NULL' disabled></textarea>
      </div>
    </div>
  );
};

export default ViewMemberPost;