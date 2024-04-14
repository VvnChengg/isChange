import viewStyles from '../../styles/View.module.css';

const ViewMemberPost = () => {
  return (
    <div className={viewStyles.post}>
      <div className={viewStyles.postContainer}>
        <span className={viewStyles.postLabel}>過往發文紀錄</span>
        <textarea className={viewStyles.postIntro} placeholder="過往發文紀錄- demo2進度(拿掉版面會亂掉所以先留著)" disabled></textarea>
      </div>
    </div>
  );
};

export default ViewMemberPost;