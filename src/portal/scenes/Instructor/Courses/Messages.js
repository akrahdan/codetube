export const Messages = () => {
  return (
    <div>
      <h2 className="font-heading-serif-xl app--subheader--39nO8">
        Course messages
      </h2>
      <div className="main-content--wrap_component--2TEkz">
        {" "}
        <div className="pb20" data-purpose="section-description">
          Write messages to your students (optional) that will be sent
          automatically when they join or complete your course to encourage
          students to engage with course content. If you do not wish to send a
          welcome or congratulations message, leave the text box blank.
        </div>
        <form className>
          <div className="form-group">
            <label htmlFor="welcome" className="control-label">
              Welcome Message
            </label>
            <div className="form-control-counter-container">
              <textarea
                name="welcome"
                maxLength={1000}
                rows={4}
                id="welcome"
                className="form-control"
                defaultValue={""}
              />
              <div
                className="form-control-counter"
                data-purpose="form-control-counter"
              >
                1000
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="welcome" className="control-label">
              Congratulations Message
            </label>
            <div className="form-control-counter-container">
              <textarea
                name="complete"
                maxLength={1000}
                rows={4}
                id="welcome"
                className="form-control"
                defaultValue={""}
              />
              <div
                className="form-control-counter"
                data-purpose="form-control-counter"
              >
                1000
              </div>
            </div>
          </div>
        </form>{" "}
      </div>
    </div>
  );
};

export default Messages;
