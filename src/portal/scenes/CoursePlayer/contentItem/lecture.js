import { useState } from "react";
import classNames from "classnames";
import styles from "../styles.module.css";
import css from "./lecture.module.scss";
import { CaretIcon } from "./caretIcon/caretIcon";
import { LectureItem } from "./lectureItem";
export const Lecture = () => {
  const [visible, setVisible] = useState(false);

  const visibility = visible ? "visible" : "hidden";
  const height = visible ? "auto" : "0px";
  return (
    <div
      className={css.lectureContainer}
      onClick={() => {
        setVisible(!visible);
      }}
    >
      <div
        className={classNames(css.lectureSubContainer, {
          [css.active]: visible,
        })}
      >
        <div className={styles.lectureDiv}>
          <div className={styles.navDisplay}>
            <div className={css.progressContainer}>
              <svg
                className={css.svgProgress}
                aria-label="module completed"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(-90)"
              >
                <circle
                  r={11}
                  cx={12}
                  cy={12}
                  className={css.svgCircleBackground}
                  strokeWidth={2}
                />
                <text
                  className={css.svgProgressText}
                  x="49%"
                  y="-31%"
                  textAnchor="middle"
                  transform="rotate(90)"
                >
                  2
                </text>
                <circle
                  r={11}
                  cx={12}
                  cy={12}
                  strokeWidth={2}
                  strokeDasharray="69.11503837897544 69.11503837897544"
                  strokeDashoffset={0}
                  className={css.svgProgressCircle}
                />
              </svg>
            </div>
            <div className={styles.navItemContent}>
              <div className={styles.navItemHeader}>Course Header</div>
              <div className={styles.navItemSubTitle}>
                <svg
                  className={styles.svgDuration}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 23.1a11.44 11.44 0 1 1 11.43-11.43c0 6.3-5.13 11.42-11.43 11.42zm0-20.87a9.44 9.44 0 0 0 0 18.87 9.44 9.44 0 0 0 0-18.87z" />
                  <path d="M13 11V3.95h-2V11H4.36v2H13v-2z" />
                </svg>
                <span className={styles.screenReader}>Module Length</span>
                10 mins
              </div>
            </div>
          </div>
        </div>
        <CaretIcon toggle={visible} />
      </div>
      <div className={css.lectureItemContainer}>
        <div
          className={css.heightTransition}
          style={{
            height: height,
            overflow: visibility,
            visibility: visibility,
           
          }}
        >
          <div>
            <LectureItem />
            <LectureItem />
            <LectureItem />
            <LectureItem />
          </div>
        </div>
      </div>
    </div>
  );
};
