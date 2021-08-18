import { useEffect, useState, useRef, useCallback } from "react";
import classNames from "classnames";
import styles from "../styles.module.css";
import { selectAnalytics } from "state/course/courseSplice";

import css from "./lecture.module.scss";
import { CaretIcon } from "./caretIcon/caretIcon";
import { LectureItem } from "./lectureItem";
import { Section } from "services/courses";


type SectionProps = {
  section: Section,
  position: number,
  views: number[]
}
export const Lecture: React.FC<SectionProps> = ({ section, position, views }) => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0)
  const [active, setActive] = useState(0)
  const [offset, setOffset] = useState(0)
  const navRef = useRef<HTMLDivElement>()
  const [heightDom, setHeightDom] = useState(null)
  const callbackRef = useCallback(node => {
    if (node) {
      setHeightDom(node.getBoundingClientRect().height)
    }
  }, [])
  // const height = visible ? "auto" : "0px";
  const visibility = visible ? "visible" : "hidden";
  const collapse = (navigation) => {
    const height = navigation.scrollHeight
    const transition = navigation.style.transition
    navigation.style.transition = ''
    requestAnimationFrame(() => {
      navigation.style.height = height + 'px'
      navigation.style.transition = transition
      requestAnimationFrame(() => {
        navigation.style.height = 0 + "px"
      });
    });
  }


  const expand = (navigation) => {
    const height = navigation.scrollHeight
    navigation.style.height = height + 'px'
    navigation.addEventListener('transitionend', function (e) {
      navigation.removeEventListener('transitionend', (ev) => {

      })
      
    })
  }

  useEffect(() => {
    if (views && section) {
      const currentViews = section.lectures.filter(lec => views.includes(lec.id))
      if (currentViews.length) {
        setOffset((69.11503837897544 * currentViews.length) / section.lectures.length)
      }

    }
  }, [views])

  

  return (
    <div
      className={css.lectureContainer}

    >
      <div
        className={classNames(css.lectureSubContainer, {
          [css.active]: visible,
        })}
      >
        <div className={styles.lectureDiv}
          onClick={() => {
            const navigation = navRef.current
            
            if (!visible) {
              expand(navigation)
              setVisible(!visible);
            } else {
              collapse(navigation)
              setVisible(!visible);
            }

          }}
        >

          <div className={styles.navDisplay}>
            <div className={css.progressContainer}>
              <svg
                className={classNames(css.svgProgress)}
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
                  {position + 1}
                </text>
                <circle
                  r={11}
                  cx={12}
                  cy={12}
                  strokeWidth={2}
                  strokeDasharray="69.11503837897544 69.11503837897544"
                  strokeDashoffset={active == section.id ? (69.11503837897544 - offset) : 69.11503837897544}
                  className={classNames(css.svgProgressCircle, {
                    [css.current]: active == section.id
                  })}
                />
              </svg>
            </div>
            <div className={styles.navItemContent}>
              <div className={styles.navItemHeader}>{section.title}</div>
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
                {Math.round(section.duration / 60)} mins
              </div>
            </div>
          </div>
        </div>
        <CaretIcon toggle={visible} />
      </div>
      <div className={css.lectureItemContainer}>
        <div
          ref={navRef}
          className={classNames(css.heightTransition)}
          style={{
            height: "0px",
            overflow: visibility,
            visibility: visibility,

          }}
        >
          <div >
            {section.lectures && section.lectures.map(lecture =>
              <LectureItem
                handleActive={() => setActive(section.id)}
                key={lecture.id}
                lecture={lecture} handleCurrent={() => setCurrent(lecture.id)}
                isCurrent={current == lecture.id}
                complete={views && views.includes(lecture.id)} />)}

          </div>
        </div>
      </div>
    </div>
  );
};
