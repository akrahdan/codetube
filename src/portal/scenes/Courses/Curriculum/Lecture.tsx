import { useEffect, useState } from "react";
import { Lecture } from "services/courses";
import { PlayIcon } from '../Icons'
type LectureProps = {
  lecture: Lecture
}
export const LectureContent: React.FC<LectureProps> = ({ lecture }) => {
  const [ seconds, setSeconds ] = useState(0)
  const [minutes, setMinutes ] = useState(0)

  useEffect(() => {
    const minutes = Math.floor(lecture?.duration / 60)
    const seconds = Math.round(lecture?.duration - minutes * 60)
    setMinutes(minutes)
    setSeconds(seconds)
  }, [lecture])
  return (
    <li>
      <div className="section--previewable-item--3C8nb udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-link udlite-text-sm">
        <PlayIcon />
        <div className="udlite-block-list-item-content">
          <div>
            <div className="section--row--3PNBT">
              <button
                type="button"
                className="udlite-btn udlite-btn-large udlite-btn-link udlite-text-sm section--item-title--2k1DQ"
              >
                <span>{lecture.title}</span>
              </button>
            </div>
          </div>
          <span
            className="section--hidden-on-mobile--171Q9"
            style={{ flex: 1 }}
          />
          <span className="section--hidden-on-mobile--171Q9 section--preview-text--38nT0">
            Preview
          </span>
          <span className="section--hidden-on-mobile--171Q9 section--item-content-summary--126oS">
            {minutes}:{seconds}
          </span>
        </div>
      </div>
    </li>
  );
};
