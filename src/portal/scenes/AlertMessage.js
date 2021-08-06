
import classNames from "classnames";

export const AlertMessage = ({
    style, options, message, close
}) => {
  return (
    <div
      className="feedbacks-bar--feedbacks-bar--RapCY"
      style={{ display: "block" }}
    >
      <div
       
        role="button"
        tabIndex={0}
        className={classNames("ui-feedback-close-btn feedbacks-bar--feedback-bar--3OWyr", {
            'feedbacks-bar--feedback-type-info--1PAbl': options.type == 'info',
            'feedbacks-bar--feedback-type-error--3Nt-k': options.type == 'error'
        })}
        style={{ maxHeight: "55px" }}
      >
        <span className="feedbacks-bar--close--2wAwj cfi cfi-close" onClick={close} />
        <div className="feedbacks-bar--feedback-container--3Dpkf">
          <p className="feedbacks-bar--message--3Na3Q">
            { message}
          </p>
        </div>
      </div>
    </div>
  );
};
