import viewStyles from '../../styles/View.module.css';

const ViewMemberPost = () => {
  return (
    <div className={viewStyles.post}>
      <div className={viewStyles.postContainer}>
        <span className={viewStyles.postLabel}>過往發文紀錄</span>
        <textarea className={viewStyles.postIntro} placeholder="過往發文紀錄" disabled></textarea>
      </div>
    </div>
  );
};

export default ViewMemberPost;