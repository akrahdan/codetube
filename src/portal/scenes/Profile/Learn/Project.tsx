import { ProjectEntityResponse } from "services/projects";

type ProjectProps = {
  project: ProjectEntityResponse,
  onClick?: React.MouseEventHandler;

}
export const Project: React.FC<ProjectProps> = ({ project, onClick }) => {
  return (
    <div onClick={onClick} className="col-12 col-sm-6 col-md-4 col-lg-3 cf-mb-2">
      <div className="MBu65OB6vETwhUBMH8eko cf-corners--rounded cf-background cf-background--color-medium cf-background--fit-content">
        <div className="cf-background__background-container" />
        <div className="cf-background__content-container">
          <div className="cf-background__content">
            <span>
              <div className="cf-corners--rounded cf-tile cf-tile--1x1 cf-tile--pointer">
                <div className="cf-tile__content content">
                  <div className="cf-tile-image cf-corners--rounded cf-img-wrapper">
                    <img
                      className="cf-img-wrapper__image"
                      src={project?.thumbnail_url}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex cf-py-6 cf-ml-6 cf-mr-4">
                <div className="flex-grow-1 cf-mr-2">
                  <h5 className="cf-text-h5 cf-mb-2">{project?.title}</h5>
                  <p className="cf-text-small cf-opacity--hinted cf-clickable">
                    {project?.instructor?.first_name ? `${project?.instructor?.first_name} ${project?.instructor?.last_name}`:project?.instructor?.email }
                  </p>
                </div>
                <div className="align-self-start">
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
          </div>
        </div>
      </div>
    </div>
  );
};
