import styles from "./styles.module.css";
import Manager from "./Manager";
import { useEffect, useState } from "react";
import { useAppDispatch } from "store/hooks";
import Container from "./Container";
import ActionOverlay from "./Overlay";
import ControlBar from "./control-bar/control-bar";
import ProgressBar from "./progress-bar/progress-bar";
import Header from "./header/header";
import CommandLayer from "./command-layer/command-layer";
import BufferingIndicator from "./buffering-indicator/buffering-indicator";
import Video from "./video/video";
import SyncSettings from "./sync-settings/sync-settings";
import SyncClipProgress from "./sync-clip-progress/sync-clip-progress";
import Captions from "./captions/captions";
import ErrorModal from "./error-modal/error-modal";
import KeyboardShortcuts from "./keyboard-shortcuts/keyboard-shortcuts";
import classNames from "classnames";
import { Lecture } from "./contentItem/lecture";
import { selectLocationPayload, selectLocationQuery } from "state/location/selectors";
import { useAppSelector } from "store/hooks";
import _ from 'lodash';
import { selectPlayerCourse, setCurrentUrl } from "state/player/playerSlice";
import { CoursePlayerResponse, useFetchPlayerCourseQuery, useFetchViewsQuery } from "services/courses";
import { selectViews } from "state/course/courseSplice";
const CoursePlayer = () => {
  const [toggle, setToggle] = useState(false);
  const locationPayload = useAppSelector(selectLocationPayload)
  const dispatch = useAppDispatch()
  const locationQuery = useAppSelector(selectLocationQuery)
  const selectedViews = useAppSelector(selectViews)
  const selectedCourse = useAppSelector(selectPlayerCourse)
  const { data: courseQuery} = useFetchPlayerCourseQuery(locationPayload.id)
  const { data: viewsQuery } = useFetchViewsQuery()
  const [course, setCourse ] = useState<CoursePlayerResponse>();
  const [views, setViews] = useState(selectedViews ? selectedViews.map(view => view.object_id): [])

  useEffect(() => {
    setCourse(selectedCourse)
  }, [selectedCourse])

  useEffect(() => {
    if(selectedViews) {
      const views = _.uniq(selectedViews.map(view => view.object_id))
      setViews(views)
    }
   
  }, [selectedViews])
  useEffect(() => {
    if (locationQuery) {
      const baseUrl = `https://cdn.filestackcontent.com/${locationQuery.clipid}`;
      
      dispatch(setCurrentUrl(baseUrl))
    }
  }, [locationQuery])

  if(!course) return null;

  return (
    <div className={styles.next}>
      <div
        className={classNames(styles.courseLayout, {
          [styles.navCollapse]: toggle,
        })}
      >
        <div className={styles.coursePlayerLayout}>
          <div className={styles.navToggleButtonContainer}>
            <button
              className={styles.navToggle}
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <span>
                <svg
                  className={styles.navToggleSvg}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                >
                  <path d="M2 17.02h17.33v2H2zM2 11.06h15.49v2H2zM18.55 2.52L17.2 3.98l1.16 1.08H2v2h16.4L17.35 8.2l1.46 1.37L22.2 5.9l-3.64-3.39zm.78 3.54v-.08l.04.04-.04.04z"></path>
                </svg>
              </span>
            </button>
          </div>
          <div tabIndex={-1}>
            <div className={styles.playerWrapper}>
              <Manager>
                <Container>
                  <SyncSettings />
                  <SyncClipProgress />
                  <ErrorModal />
                  <ActionOverlay />
                  <Captions />
                  <BufferingIndicator />
                  <Header />
                  <KeyboardShortcuts />
                  <CommandLayer />
                  <Video />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      left: 0,
                    }}
                  >
                    <ProgressBar />
                    <ControlBar />
                  </div>
                </Container>
              </Manager>
            </div>
          </div>
        </div>
        <div className={styles.courseLayoutNav}>
          <div className={styles.courseLayoutNavContent}>
            <div className={styles.navNavigation}>
              <div className={styles.navHeader}>
                <div className={styles.courseTitleSection}>
                  <h1 className={styles.courseTitle}>
                    <a className={styles.courseTitleLink}>
                      { course.title}
                    </a>
                  </h1>
                  <h2 className={styles.courseSubTitle}>
                   {course.headline}
                  </h2>
                </div>
                <div>
                  <div role={"tablist"} tabIndex={0} className={styles.tabList}>
                    <div className={styles.tabListHeader}>
                      <button
                        tabIndex={-1}
                        className={classNames(styles.navTab, styles.navTabItem)}
                      >
                        <div tabIndex={-1} className={styles.navTabItemCss}>
                          <div tabIndex={-1} className={styles.nestedCss}>
                            Table of Contents
                          </div>
                          <span
                            className={styles.tableContentBackground}
                          ></span>
                        </div>
                      </button>
                      <button
                        className={classNames(styles.navTab, styles.navTabItem)}
                      >
                        <div tabIndex={-1} className={styles.navTabItemCss}>
                          <div tabIndex={-1} className={styles.nestedCss}>
                            Notes
                          </div>
                          <span className={styles.notesBackground}></span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.navContent}>
                <div role={"tabpanel"} className={styles.navTabPanel}>
                  
                  { course.sections && course.sections.map((section, index) =>
                   <Lecture key={section.id} position={index} section = {section} views={views}/>)}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
