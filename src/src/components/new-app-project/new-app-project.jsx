import { useState } from "react";
import { Link } from "react-router-dom";
import projectService from "../../services/projectService";
import enums from "../../enums/enums";
import notify from "../../services/notify";
import { Tab } from 'semantic-ui-react'

const NewAppProject = () => {
  const [domainType, setPortUsageType] = useState("default");
  const [title, setTitle] = useState("");
  const [appUniqueName, setAppUniqueName] = useState("");
  const [projectViewId, setProjectViewId] = useState("");
  const [internalPort, setInternalPort] = useState("");
  const [state, setState] = useState(true);
  //const navigate = useNavigate();

  const onPortUsageChanged = ($event) => setPortUsageType($event.target.value);

  const onSubmitClicked = ($event) => {
    $event.preventDefault();
    projectService
      .create(
        title,
        domainType === "default"
          ? enums.domainType.default
          : enums.domainType.custom,
        appUniqueName,
        `${projectViewId}://${internalPort}`,
        state ? enums.projectState.active : enums.projectState.inactive
      )
      .then(() => {
        notify.success("App project added successfully");
        //navigate("/projects");
      })
      .catch((err) => notify.error(`Operation failed. ${err ?? ""}`));
  };

  const onActiveClicked = ($event) => {
    $event.preventDefault();
    setState(!state);
  };
  const panes = [
    {
      menuItem: 'HTTP', render: () => <Tab.Pane>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="radioGroup"
              value="default"
              onChange={onPortUsageChanged}
              checked={domainType === "default"}
            />
            <label>Share a port</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="radioGroup"
              value="custom"
              onChange={onPortUsageChanged}
              checked={domainType === "custom"}
            />
            <label>Use a port</label>
          </div>
        </div>
        {domainType === "default" ? (<>

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
            value={title}
            onChange={($event) => setAppUniqueName($event.target.value)}
          />
        </div>

        <div className="field">
          <label>Internal Port</label>
          <input
            type="number"
            placeholder="Internal Port"
            value={appUniqueName}
            onChange={($event) => setInternalPort($event.target.value)}
          />
        </div>
      </Tab.Pane>
    },
    { menuItem: 'Network', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  ]

  return (
    <div className="ui grid">
      <div className="row">
        <div className="fifteen wide column">
          <div className="ui breadcrumb">
            <Link to="/projects" className="section">
              App Projects
            </Link>
            <i aria-hidden="true" className="right angle icon divider"></i>
            <div className="active section">New App Project</div>
          </div>
        </div>
        <div className="one wide column right aligned">
          <Link to="/projects" className="circular ui icon button">
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

            <Tab panes={panes} />

            <div className="ui hidden divider"></div>
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
