import React, { useEffect, useState } from "react";
import { CoursePlayerResponse, CourseResponse, InstructorResponse, Lecture, VideoAnalytics } from "services/courses";
import { selectPlayerCourse } from "state/player/playerSlice";
import { useFetchPlayerCourseQuery } from "services/courses";
import { useHistory } from "react-router";
import { useAppSelector } from "store/hooks";
import avatarLogo from "static/images/avatar/profile-avatar.png";

type CourseProps = {
  course: CoursePlayerResponse,
  instructor: InstructorResponse,
  analytics: VideoAnalytics[]
}

export const CourseProgress: React.FC<CourseProps> = ({ course, instructor, analytics }) => {


  // const { data: courseQuery } = useFetchPlayerCourseQuery(course.id)
  // const selectedCourse = useAppSelector(selectPlayerCourse)
  const [lecture, setLecture] = useState<Lecture>();
  const [lectures, setLectures] = useState<Lecture[]>();
  const [viewProgress, setViewProgress] = useState<VideoAnalytics>()
  const [views, setViews] = useState<VideoAnalytics[]>()
  const [ progress, setProgress ] = useState<number>(0)
  const { push, replace}  = useHistory()
  useEffect(() => {
    if (course) {
      const flatLectures = course.sections?.flatMap(sec => sec.lectures)
      setLectures(flatLectures)
      
      const lectureIds = flatLectures?.map(lec => lec.id)
      
      const views = analytics?.filter(view => lectureIds?.includes(view.lecture))
      
      if (views?.length) {
        const view = views?.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())[0]
        setViews(views?.filter(view => view.complete))
        setViewProgress(view)
        const lecture = flatLectures?.find(lec => lec.id == view?.lecture)
        if (view && view.progress <= lecture?.duration) {
          setProgress((Math.round(view?.progress *100)) / lecture?.duration)
        }
       
        setLecture(lecture)
      }
      else {
        if (flatLectures?.length) {

          setViewProgress({
            progress: 0,
            thumbnail: course.cover_image,
            lecture: flatLectures[0]?.id,
            id: -1,
            updated: Date(),
            complete: false
          })
        }

      }


    }
  }, [course, analytics])

  if (!lectures || !lectures.length) return null;
 
  return (
    <div className="d-flex col-xl-4 col-lg-6 col-md-12">
      <div className="cf-corners--rounded flex-grow-1 cf-background cf-background--color-medium cf-background--fit-content">
        <div className="cf-background__background-container" />
        <div className="cf-background__content-container">
          <div className="cf-background__content">
            <span>
              <div className="d-flex cf-p-6">
                <div className="d-flex flex-grow-1 cf-clickable">
                  <div className="_3QuAWWq2J4PizXEvPNVZ83 cf-tile cf-tile--1x1">
                    <div className="cf-tile__content content">
                      <div className="cf-tile-image cf-corners--rounded _3-NnffEUC5lUFuEipxZPce cf-img-wrapper">
                        <img
                          className="cf-img-wrapper__image"
                          src={instructor.avatar ? instructor.avatar : avatarLogo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1 cf-pl-4 cf-pr-7">
                    <div className="_35fTagprEuSRHCVs1--uV">
                      <h5 className="cf-text-h6 cf-text--1-line-max cf-mb-1">
                        {course.title}
                      </h5>
                    </div>
                    <div className="_35fTagprEuSRHCVs1--uV">
                      <p className="cf-text-small cf-text--1-line-max cf-opacity--hinted">
                        {instructor.first_name ? `${instructor.first_name} ${instructor.last_name}` : instructor.email}
                      </p>
                    </div>
                    <div className="d-flex cf-mt-2">
                      <h3 className="cf-text-h7 cf-mr-3">{`${views?.length || 0 }/${lectures?.length}`}</h3>
                      <div className="flex-fill d-flex align-items-center _2n9RDI1mANFP0g7xI5sQDr">
                        <div className="_2By-5ORUH-TViO7EJ8WYg6" />
                        <div
                          className="_2RKI2eQ-B2r-_SV0Uv1ihc"
                          style={{ width: `${Math.round(views?.length *100/lectures?.length)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="align-self-start cf-clickable">
                  <div className="cf-clickable ">
                    <svg
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="cf-icon"
                    >
                      <path
                        d="M6 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM19.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </span>
            <div className="d-flex">
              <div className="col-12 cf-p-0">
                <span>
                  <div className="cf-clickable cf-tile cf-tile--16x9 cf-tile--pointer">
                    <div className="cf-tile__content content">
                      <div className="cf-tile-image cf-img-wrapper">
                        <img
                          className="cf-img-wrapper__image"
                          src={viewProgress? viewProgress.thumbnail : course.cover_image}
                        />
                      </div>
                      <div className="cf-tile__component cf-tile-overlay cf-tile-overlay--gradient-bottom " />
                      <div className="cf-mr-6 cf-mb-5 cf-tile__component cf-tile-caption cf-tile-caption--x-right cf-tile-caption--y-bottom">
                        <div className="cf-tile-caption__content cf-p-3">
                          <button 
                          onClick= {() => {
                           course && lecture && window.location.replace(`/course-player/${course?.id}?clipid=${lecture?.video.key}`)
                          }}
                          className="c-button c-button--primary c-button--md cf-mb-2 cf-mr-3">
                            <svg
                              width="2em"
                              height="2em"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="cf-mr-3"
                            >
                              <path
                                d="M8.653 6.117A.75.75 0 007.5 6.75v10.5a.75.75 0 001.153.633l8.25-5.25a.75.75 0 000-1.266l-8.25-5.25z"
                                fill="currentColor"
                              />
                            </svg>
                            Resume
                          </button>
                        </div>
                      </div>
                      <div className="col-6 cf-p-0 cf-tile__component cf-tile-caption cf-tile-caption--x-left cf-tile-caption--y-bottom">
                        <div className="cf-tile-caption__content cf-p-3">
                          <h6 className="cf-clickable cf-text-h6 cf-m-3">
                           {lecture? lecture.title : course.title}
                          </h6>
                        </div>
                      </div>
                      <div className="oLDReHpU4wLohxqkKScTu cf-tile__component cf-tile-progress">
                        <div className="cf-tile-progress__content">
                          <div
                            className="cf-tile-progress__bar"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
