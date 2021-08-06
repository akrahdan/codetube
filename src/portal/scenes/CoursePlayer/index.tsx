import styles from './styles.module.css'
import Manager from './Manager';
import { useState } from 'react';
import Container from './Container';
import ActionOverlay from './Overlay';
import ControlBar from './control-bar/control-bar';
import ProgressBar from './progress-bar/progress-bar';
import Header from './header/header';
import CommandLayer from './command-layer/command-layer';
import BufferingIndicator from './buffering-indicator/buffering-indicator';
import Video from './video/video';
import SyncSettings from './sync-settings/sync-settings';
import SyncClipProgress from './sync-clip-progress/sync-clip-progress';
import Captions from './captions/captions';
import ErrorModal from './error-modal/error-modal';
import KeyboardShortcuts from './keyboard-shortcuts/keyboard-shortcuts';
import classNames from 'classnames';
import { Lecture } from './contentItem/lecture';
const CoursePlayer = () => {
    const [toggle, setToggle] = useState(false);


    return (
        <div className={styles.next}>
            <div className={classNames(styles.courseLayout, {
                [styles.navCollapse]: toggle
            })}>
                <div className={styles.coursePlayerLayout}>
                    <div className={styles.navToggleButtonContainer}>
                        <button className={styles.navToggle} onClick={() => {
                            setToggle(!toggle)
                        }}>
                            <span >
                                <svg className={styles.navToggleSvg} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path d="M2 17.02h17.33v2H2zM2 11.06h15.49v2H2zM18.55 2.52L17.2 3.98l1.16 1.08H2v2h16.4L17.35 8.2l1.46 1.37L22.2 5.9l-3.64-3.39zm.78 3.54v-.08l.04.04-.04.04z"></path></svg>
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
                                    <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
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
                                <div className={styles.courseTitleSection} >
                                    <h1 className={styles.courseTitle}>
                                        <a className={styles.courseTitleLink}>
                                            Building a Streaming Service From Scratch
                                        </a>
                                    </h1>
                                    <h2 className={styles.courseSubTitle}>Basics and Fundamentals</h2>
                                </div>
                                <div>
                                    <div role={'tablist'} tabIndex={0} className={styles.tabList}>
                                        <div className={styles.tabListHeader}>
                                            <button tabIndex={-1} className={classNames(styles.navTab, styles.navTabItem)}>
                                                <div tabIndex={-1} className={styles.navTabItemCss}>
                                                    <div tabIndex={-1} className={styles.nestedCss}>
                                                        Table of Contents
                                                    </div>
                                                    <span className={styles.tableContentBackground}></span>
                                                </div>
                                            </button>
                                            <button className={classNames(styles.navTab, styles.navTabItem)}>
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
                                <div role={'tabpanel'} className={styles.navTabPanel}>
                                    <div className={styles.navPanelItem}>
                                        <div className={styles.navPanelItemBackground}>
                                            <div className={styles.navPanelPadding}>
                                                <div className={styles.navDisplay}>
                                                    <div className={styles.progressContainer}>
                                                        <svg className={styles.svgProgress} aria-label="module completed" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" transform="rotate(-90)">
                                                            <circle r={11} cx={12} cy={12} className={styles.svgProgressBackground} strokeWidth={2} />
                                                            <text className={styles.svgProgressText} x="49%" y="-31%" textAnchor="middle" transform="rotate(90)">1</text>
                                                            <circle r={11} cx={12} cy={12} strokeWidth={2} strokeDasharray="69.11503837897544 69.11503837897544" strokeDashoffset={0} className={styles.svgProgressCircle} />
                                                        </svg>
                                                    </div>
                                                    <div className={styles.navItemContent}>
                                                        <div className={styles.navItemHeader}>
                                                            Course Header
                                                        </div>
                                                        <div className={styles.navItemSubTitle}>
                                                            <svg className={styles.svgDuration} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path d="M12 23.1a11.44 11.44 0 1 1 11.43-11.43c0 6.3-5.13 11.42-11.43 11.42zm0-20.87a9.44 9.44 0 0 0 0 18.87 9.44 9.44 0 0 0 0-18.87z" /><path d="M13 11V3.95h-2V11H4.36v2H13v-2z" />
                                                            </svg>
                                                            <span className={styles.screenReader}>Module Length</span>
                                                            10 mins

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.navDisplayCss}>

                                            </div>
                                        </div>
                                        <div className={styles.courseLectureBg}>
                                            <div style={{ height: 'auto', overflow: 'visible', visibility: 'visible' }} className={styles.lectureDiv}>
                                                <button className={styles.lectureContent}>
                                                    <div className={styles.contentItemCircle}>
                                                        <div className={styles.contentCircleThing}>
                                                            <svg aria-label="selected" className={styles.contentCircleSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.23 20.7L19.77 12 6.23 3.3" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className={styles.contentItemBody}>
                                                        <h3 className={styles.contentBodyH3}>
                                                            <div className={styles.contentCenter}>
                                                                <span>Course Overview</span>
                                                            </div>
                                                        </h3>
                                                        <div className={styles.contentItemDuration}>1m 32s</div>
                                                    </div>
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                    <Lecture />
                                    <Lecture />
                                    <Lecture />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CoursePlayer;