import styles from "./style.module.css";
export const LectureItem = () => {
  return (
    <button className={styles.lectureItemContainer}>
      <div className={styles.iconContainer}>
        <div className={styles.iconPosition}>
          <svg
            aria-label="selected"
            className={styles.svgIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M6.23 20.7L19.77 12 6.23 3.3" />
          </svg>
        </div>
      </div>
      <div className={styles.lectureItemDisplay}>
        <h3 className={styles.lectureItemH3}>
          <div className={styles.textCenter}>
            <span title="Introduction">Introduction</span>
          </div>
        </h3>
        <div className={styles.lectureDuration}>1m 58s</div>
      </div>
    </button>
  );
};
