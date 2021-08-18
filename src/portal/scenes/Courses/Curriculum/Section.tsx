import React, { useEffect, useState } from "react";
import { Section } from "services/courses";
import { LectureContent} from './Lecture';
import { ExpandIcon } from '../Icons';

type SectionProps =  {
  section: Section
}
export const SectionContent: React.FC<SectionProps> = ({ section }) => {
  const [ checked, setChecked] = useState(false)
  const [minutes, setMinutes ] = useState(0)

  useEffect(() => {
    const sum = section?.lectures?.reduce((acc, current) => acc + current.duration, 0)
    if (sum) {
      setMinutes(Math.floor(sum /60))
    }
  }, [section])
  return (
    <div className="section--panel--1tqxC panel--panel--3uDOH">
      <span
        id="u125-accordion-panel--2"
        data-type="checkbox"
        data-checked={checked? 'checked': ''}
        style={{ display: "none" }}
      />
      <div
        className="udlite-btn udlite-btn-large udlite-btn-link udlite-heading-md udlite-accordion-panel-toggler panel--panel-toggler--30J_B panel--outer-panel-toggler--3I6w6"
        data-css-toggle-id="u125-accordion-panel--2"
      >
        <h3 className="udlite-accordion-panel-heading">
          <button
            type="button"
            aria-expanded="true"
            onClick={
              () => setChecked(!checked)
            }
            className="udlite-btn udlite-btn-large udlite-btn-link udlite-heading-md js-panel-toggler panel--panel-toggler--30J_B"
            id="u125-accordion-panel-title--3"
          >
            <span className="udlite-accordion-panel-title">
              <span className="section--section-title--8blTh">
                {section?.title}
              </span>
              <span
                className="udlite-text-sm section--hidden-on-mobile--171Q9 section--section-content--9kwnY"
                data-purpose="section-content"
              >
               {section?.lectures?.length} lectures{/* */} • <span>{minutes}min</span>
              </span>
            </span>
          </button>
        </h3>
        <ExpandIcon />
      </div>
      <div
        className="panel--content-wrapper--1g5eE"
        aria-labelledby="u125-accordion-panel-title--3"
        aria-hidden="false"
        role="region"
      >
        <div className="udlite-accordion-panel-content panel--content--2q9WW">
          <ul className="unstyled-list udlite-block-list">
            { section?.lectures?.map(lecture => <LectureContent key={lecture.id} lecture={lecture} />)}
           
          </ul>
        </div>
      </div>
    </div>
  );
};
