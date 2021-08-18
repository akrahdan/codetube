import React, { useEffect, useState } from "react";
import { Lecture, Section } from "services/courses";
import { SectionContent } from './Section'
type CurriculumProps = {
  sections: Section[]
}
export const Curriculum: React.FC<CurriculumProps> = ({ sections }) => {
  const [ lectures, setLectures ] = useState<Lecture[]>()
  const [ hours, setHours ] = useState(0)
  const [ minutes, setMinutes ] = useState(0)


  useEffect(() => {
     if(sections) {
      const lectures = sections.flatMap(lec => lec.lectures)
     
      setLectures(lectures)
      const sum = lectures?.reduce((acc, curr) => acc + curr.duration, 0)
      if(sum) {
        const hours = Math.floor(sum / 3600)
        const minutes = Math.floor((sum - hours*3600) / 60)
        setMinutes(minutes)
        setHours(hours)
      }
   
     }
  }, [sections])

  return (
    <div
      className="course-landing-page__main-content component-margin"
     
    >
      <div className="clp-component-render">
        <div className="clp-component-render">
          <div
            className="ud-component--course-landing-page-udlite--curriculum"
            
          >
            <div data-purpose="course-curriculum">
              <h2
                className="udlite-heading-xl curriculum--header--1d_Nv"
                data-purpose="curriculum-header"
              >
                Course content
              </h2>
              <div className="curriculum--sub-header--23ncD">
                <div className="udlite-text-sm" data-purpose="curriculum-stats">
                  <span className="curriculum--content-length--1XzLS">
                    {sections?.length} sections{/* */} • {/* */}{lectures?.length} lectures{/* */} •{" "}
                    <span>
                      <span>{hours}h&nbsp;{minutes}m</span> total length
                    </span>
                  </span>
                </div>
                <button
                  type="button"
                  data-purpose="expand-toggle"
                  className="udlite-btn udlite-btn-medium udlite-btn-ghost udlite-heading-sm"
                >
                  <span>Expand all sections</span>
                </button>
              </div>
              <div>
                { sections?.map(section => <SectionContent key={section.id} section={section} /> )}
              </div>
              <button
                type="button"
                className="udlite-btn udlite-btn-medium udlite-btn-secondary udlite-heading-sm curriculum--show-more--2tshH"
                data-purpose="show-more"
              >
                <span>24 more sections</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
