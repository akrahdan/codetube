// import { NavLink } from "react-router-dom";

import { selectLocationPathName, selectLocationPayload } from "state/location/selectors";
import { selectCourse } from "state/course/courseSplice";
import { selectSections } from "state/curriculum/currriculumSplice";
import {Section, useFetchCourseQuery, useFetchPricingQuery, useSubmitReviewMutation, useFetchSectionsQuery } from "services/courses";
import type { Review } from "services/courses";
import { useAlert } from "react-alert";
import type { CourseResponse, Requirement, Experience, Goal } from "services/courses";

import { useAppSelector } from "store/hooks";
import { selectPricing } from "state/course/courseSplice";
import { selectExperience, selectGoals, selectRequirements } from "state/target/targetSplice";
import { useEffect, useState } from "react";
import { NavLink } from "redux-first-router-link";
import * as paths from "portal/state/location/paths";
import classNames from "classnames";
export const ManageSidebar = ({ courseId }) => {

  const locationPayload = useAppSelector(selectLocationPayload)
  const locationType = useAppSelector(selectLocationPathName)
  const selectedExperience = useAppSelector(selectExperience)
  const selectedGoals = useAppSelector(selectGoals)
  const selectedRequirements = useAppSelector(selectRequirements)

  const [active, setActive] = useState(locationType);
  const course = useAppSelector(selectCourse)
  const selectedSections = useAppSelector(selectSections)
  const pricing = useAppSelector(selectPricing)
  const alert = useAlert()
  const [courseUpdate, setCourseUpdate] = useState<CourseResponse>(course)
  const [price, setPrice] = useState(pricing)
  const [review, setReview] = useState(false)
  const [experience, setExperience] = useState<Experience[]>(selectedExperience)
  const [goals, setGoals] = useState<Goal[]>(selectedGoals)
  const [requirements, setRequirements] = useState<Requirement[]>(selectedRequirements)
  const { data: courseQuery } = useFetchCourseQuery(locationPayload.id)
  const { data: sectionsQuery } = useFetchSectionsQuery(locationPayload.id)
  const { data: pricingQuery } = useFetchPricingQuery(locationPayload.id)
  const [submitReview] = useSubmitReviewMutation()
  const [sections, setSections] = useState<Section[]>()
  const [clips, setClips] = useState<String[]>()
  const [duration, setDuration ] = useState(0)

  useEffect(() => {
    
    setActive(locationType)
  }, [locationType])
  useEffect(() => {
    setCourseUpdate(course || courseQuery)

    //setSections(course?.s)
  }, [course, courseQuery])

  useEffect(() => {
      setSections(selectedSections)
      const  lectures = selectedSections?.flatMap(sec => sec?.lectures)
      if(lectures && lectures?.length) {

        const clips = lectures?.flatMap(lecture => lecture?.video_url)
        
        setClips(clips)

      }

  }, [selectedSections])

  useEffect(() => {
    setPrice(pricing)
  }, [pricing])

  useEffect(() => {
    setExperience(selectedExperience)
    setRequirements(selectedRequirements)
    setGoals(selectedGoals)
  }, [selectedExperience, selectedGoals, selectedRequirements])

  return (
    <div className="app--nav--QVTHS">
      <div className="side-nav--side-nav--h8FTL" data-purpose="side-menu">
        <div className="nav-collapse">
          <input
            type="checkbox"
            id="menu-base"
            className="nav-collapse__toggle"
          />
          <label
            htmlFor="menu-base"
            data-type="button"
            className="nav-collapse__toggle-btn btn btn-tertiary"
          >
            <span className="cfi cfi-reorder" />
          </label>
          <div className="nav-container">
            <ul className="nav-steps nav nav-tabs nav-stacked">
              <li className="active sub-nav">
                <strong className="sub-nav__title">Plan your course</strong>
                <div className="nav-container">
                  <ul className="nav">
                    <li role="presentation" className={classNames({
                      'active': active == `/instructor/course/${courseId}/manage/goals`,
                      'checked': experience && experience.filter(item => item.name).length && goals
                        && goals.filter(item => item.name).length && requirements && requirements.filter(item => item.name).length
                    })}>
                      <NavLink
                        to={`/instructor/course/${courseId}/manage/goals`}
                      >
                        Target your students
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="active sub-nav">
                <strong className="sub-nav__title">Create your content</strong>
                <div className="nav-container">
                  <ul className="nav">
                    <li role="presentation" className={classNames({
                      'active': active == `/instructor/course/${courseId}/manage/curriculum`,
                      'checked': clips?.length > 4
                    })}>
                      <NavLink

                        to={`/instructor/course/${courseId}/manage/curriculum`}
                      >
                        Curriculum
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="active sub-nav">
                <strong className="sub-nav__title">Publish your course</strong>
                <div className="nav-container">
                  <ul className="nav">
                    <li role="presentation" className={classNames({
                      'active': active == `/instructor/course/${courseId}/manage/basics`,
                      'checked': courseUpdate && Object.keys(courseUpdate).every((k) => courseUpdate[k])
                    })}>
                      <NavLink

                        to={`/instructor/course/${courseId}/manage/basics`}
                      >
                        Course landing page
                      </NavLink>
                    </li>
                    <li role="presentation" className={classNames({
                      'active': active == `/instructor/course/${courseId}/manage/pricing`,
                      'checked': price && price.amount && price.currency
                    })}>
                      <NavLink

                        to={`/instructor/course/${courseId}/manage/pricing`}
                      >
                        Pricing
                      </NavLink>
                    </li>

                    <li role="presentation" className={classNames({
                      'active': active == `/instructor/course/${courseId}/manage/messages`
                    })}>
                      <NavLink

                        to={`/instructor/course/${courseId}/manage/messages`}
                      >
                        Course messages
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="side-nav--publish-button--yW0v1">
          <button onClick={() => {
            setReview(!review)

            submitReview({
              id: locationPayload.id,
              state: 'PENDING'
            
            }).then((res: { data: Review}) => {
              console.log(res.data)
              setReview(false)
             
              if(res.data && res.data.state == "LIVE") {
                alert.show("Congratulations! Your course is now published on Codefluent")
              }
            })
          }
          } type="button" className="btn btn-lg btn-primary">
            Submit for Review
          </button>
          <div />
        </div>
      </div>
      {review && (<div className="fxc popup-backdrop">
        <span
          aria-label="Loading"
          className="text-white cfi-large cfi cfi-circle-loader"
        />
      </div>)}
    </div>
  );
};
