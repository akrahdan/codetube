import React, { useEffect, useState } from "react";
import { useAppDispatch } from "store/hooks";
import { useHistory } from "react-router";
import { setCurrentUrl, setCurrentUrlIndex } from "state/player/playerSlice";
import { useTrackViewsMutation } from "services/courses";
import classNames from "classnames";
import { Lecture } from "services/courses";
import styles from "./style.module.scss";

type LectureProps = {
  lecture: Lecture,
  isCurrent: boolean,
  handleCurrent: () => void,
  complete: boolean
  handleActive: () => void
}
export const LectureItem: React.FC<LectureProps> = ({ lecture, isCurrent, handleCurrent, complete, handleActive }) => {

  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [trackViews] = useTrackViewsMutation()
  const dispatch = useAppDispatch()
  const { push } = useHistory()

  useEffect(() => {
    if (lecture) {
      const minutes = Math.floor(lecture.duration / 60)
      const seconds = Math.round(lecture.duration - minutes * 60)
      setMinutes(minutes)
      setSeconds(seconds)
    }

  }, [lecture])
  return (
    <button onClick={() => {
      handleCurrent();
      dispatch(setCurrentUrl(lecture.video_url))
      trackViews({
        id: lecture.id
      })
      handleActive()
      push({
        search: "?" + new URLSearchParams({ clipid: lecture.video.key })
      })

    }} className={classNames(styles.lectureItemContainer, {
      [styles.isCurrent]: isCurrent
    })}>
      <div className={styles.iconContainer}>
        {
          (complete && !isCurrent) ? (<div className={styles.iconPosition}>
            <svg aria-label="completed" className={styles.svgIcon}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2.6 12.3l-1.4 1.4a1 1 0 000 1.5l6.1 6.2c.4.4 1 .4 1.4 0L23 6.9c.4-.4.4-1 0-1.4L21.6 4A1 1 0 0020 4l-12 12.3-4-4a1 1 0 00-1.5 0z" /> 
            </svg>
          </div>) : (<div className={classNames(styles.iconPosition, {
            [styles.isCurrent]: isCurrent
          })}>
            <svg
              aria-label="selected"
              className={styles.svgIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M6.23 20.7L19.77 12 6.23 3.3" />
            </svg>
          </div>)
        }

      </div>
      <div className={styles.lectureItemDisplay}>
        <h3 className={styles.lectureItemH3}>
          <div className={styles.textCenter}>
            <span title="Introduction">{lecture.title}</span>
          </div>
        </h3>
        <div className={styles.lectureDuration}>{minutes}m {seconds}s</div>
      </div>
    </button>
  );
};
