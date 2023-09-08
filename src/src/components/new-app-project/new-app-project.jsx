import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appProjectService from "../../services/appProjectService";
import enums from "../../enums/enums";
import notify from "../../services/notify"; 

const NewAppProject = () => {
  const [appProjectType, setAppProjectType] = useState("share");
  const [title, setTitle] = useState("");
  const [appUniqueName, setAppUniqueName] = useState("");
  const [projectViewId, setProjectViewId] = useState("");
  const [internalPort, setInternalPort] = useState("");
  const [state, setState] = useState(true);
  const navigate = useNavigate();

  const onAppProjectTypeChanged = ($event) => setAppProjectType($event.target.value);

  const onSubmitClicked = ($event) => {
    $event.preventDefault();
    
    appProjectService
      .create(
        title,
        appProjectType === "use" ? projectViewId : "",
        appProjectType === "share"
          ? enums.appProjectType.share
          : enums.appProjectType.use,
        appUniqueName,
        internalPort,
        state ? enums.rowState.active : enums.rowState.inactive
      )
      .then(() => {
        notify.success("App project added successfully");
        navigate("/app-projects");
      })
      .catch((err) => notify.error(`Operation failed. ${err ?? ""}`));
  };

  const onActiveClicked = ($event) => {
    $event.preventDefault();
    setState(!state);
  };
 
  return (
    <div className="ui grid">
      <div className="row">
        <div className="fifteen wide column">
          <div className="ui breadcrumb">
            <Link to="/app-projects" className="section">
              App Projects
            </Link>
            <i aria-hidden="true" className="right angle icon divider"></i>
            <div className="active section">New App Project</div>
          </div>
        </div>
        <div className="one wide column right aligned">
          <Link to="/app-projects" className="circular ui icon button">
            <i className="icon close"></i>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column">
          <form className="ui form">
            <div className="field">
              <label>Project Title</label>
              <input
                placeholder="Project Title"
                value={title}
                onChange={($event) => setTitle($event.target.value)}
              />
            </div>

            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="radioGroup"
                  value="share"
                  onChange={onAppProjectTypeChanged}
                  checked={appProjectType === "share"}
                />
                <label>Share a port</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="radioGroup"
                  value="use"
                  onChange={onAppProjectTypeChanged}
                  checked={appProjectType === "use"}
                />
                <label>Use a port</label>
              </div>
            </div>
            {appProjectType === "share" ? (<>

            </>
            ) : (
              <div className="field">
                <label>Project ViewId</label>
                <input
                  type="text"
                  placeholder="Project ViewId"
                  value={projectViewId}
                  onChange={($event) => setProjectViewId($event.target.value)}
                />
              </div>
            )}
            <div className="field">
              <label>App Unique Name</label>
              <input
                type="text"
                placeholder="App Unique Name"
                value={appUniqueName}
                onChange={($event) => setAppUniqueName($event.target.value)}
              />
            </div>

            <div className="field">
              <label>Internal Port</label>
              <input
                type="number"
                placeholder="Internal Port"
                value={internalPort}
                onChange={($event) => setInternalPort($event.target.value)}
              />
            </div>

            <div className="field">
              <button
                className={`ui toggle button ${state && "green"}`}
                onClick={onActiveClicked}
              >
                Active
              </button>
            </div>
            <button
              className="ui button"
              type="submit"
              onClick={onSubmitClicked}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAppProject;
