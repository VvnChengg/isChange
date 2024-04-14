import viewStyles from '../../styles/View.module.css';

const ViewMemberSelfIntro = ({intro}) => {
  console.log(intro);
  return (
    <div className={viewStyles.introduction}>
      <div className={viewStyles.introContainer}>
        <span className={viewStyles.introLabel}>自我介紹</span>
        <textarea className={viewStyles.selfIntro} placeholder={intro} disabled></textarea>
      </div>
    </div>
  );
};

export default ViewMemberSelfIntro;