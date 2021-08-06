import { useEffect } from "react";

export const QandA = ({ sideNavToggle, perfNavToggle }) => {
  useEffect(() => {
    sideNavToggle(true);
    perfNavToggle(false)
  });
  return (
    <div className="responsive_container app--responsive_container__secondary_nav_bar--active--2j202">
      <div className="question-answer--question-answer-container--3payO">
        <div className="ia-responsive-header--container--whwFw">
          <div className="ia-responsive-header--title-dropdown--3N0GS">
            <h1 className="udlite-heading-serif-xxl ia-responsive-header--title-dropdown__title--3Suzh">
              Q&amp;A
            </h1>
          </div>
        </div>
        <div className="fx-c question-answer--empty-state--W1eOd">
          <div className="text-center w100p">
            <img
              alt=""
              width={240}
              height={180}
              className
              src="https://s.udemycdn.com/communication/empty-mailbox-v2.jpg"
              srcSet="https://s.udemycdn.com/communication/empty-mailbox-v2.jpg 1x, https://s.udemycdn.com/communication/empty-mailbox-2x-v2.jpg 2x"
            />
            <h3 className="empty-state--empty-title--27f48">
              No questions yet
            </h3>
            <div className="empty-state--empty-text--2ABCu">
              Q&amp;A is a forum where your students can ask questions, hear
              your responses, and respond to one another. Here’s where you’ll
              see your courses’ Q&amp;A threads
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QandA;
