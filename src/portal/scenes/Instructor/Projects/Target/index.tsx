
import "./styles.scss";
import styles from '../Landing/style.module.scss';
import { Section } from "./Section";
import { LearningOutcome } from './LearningOutcome';
import { LearningIncluded } from './LearningPackages';


export const Target = () => {


  return (
    <>

      <div>
        <div className="sub-header--wrapper--3Vunm">
          <div className="sub-header--main-content--22it3">
            <h2
              data-purpose="page-title"
              className="font-heading-serif-xl sub-header--title--2VD8q"
            >
              Syllabus
            </h2>
          </div>

        </div>
        <div className="main-content--wrap_component--2TEkz">
          <div className="curriculum-editor--alert-container--zgMwN">
            <div className="pb20">
             Let your students know what packages are included in your projects: the syllabus, the learning objectives,
             and the learning outcomes. Include, as well, any highlighted takeaways for your students. A minimum of 5 items each is required.
            </div>
            
          </div>
          <div>
            <ul >
              <Section />
              <LearningOutcome />
              <LearningIncluded />
             

            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Target;
