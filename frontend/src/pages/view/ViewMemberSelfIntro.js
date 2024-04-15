import viewStyles from '../../styles/View.module.css';

const ViewMemberSelfIntro = () => {
  return (
    <div className={viewStyles.introduction}>
      <div className={viewStyles.introContainer}>
        <span className={viewStyles.introLabel}>自我介紹</span>
        <textarea className={viewStyles.selfIntro} placeholder="自我介紹" disabled></textarea>
      </div>
    </div>
  );
};

export default ViewMemberSelfIntro;