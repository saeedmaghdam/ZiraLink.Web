import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import notify from '../../services/notify';
import enums from '../../enums/enums';
import appProjectService from '../../services/appProjectService';


const UpdateProject = () => {
  const [portUsageType, setPortUsageType] = useState("default");
  const [title, setTitle] = useState("");
  const [breadcrumbTitle, setBreadcrumbTitle] = useState('');
  const [appUniqueName, setAppUniqueName] = useState("");
  const [projectViewId, setProjectViewId] = useState("");
  const [internalPort, setInternalPort] = useState("");
  const [state, setState] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    appProjectService
      .getById(id)
      .then((resp) => {
        setPortUsageType(resp.data.portUsageType === enums.portUsageType.default ? 'default' : 'custom');
        setTitle(resp.data.title);
        setBreadcrumbTitle(resp.data.title);
        setProjectViewId(resp.data.projectViewId);
        setState(resp.data.state);

        const colonIndex = resp.data.internalPort.indexOf(':');
        let internalPort = resp.data.internalPort;
        if (colonIndex !== -1) {
          setInternalPort(internalPort.slice(0, colonIndex));
          internalPort = internalPort.slice(colonIndex + 3);
        }
        setInternalPort(internalPort);
      })
      .catch((err) => notify.error(`Operation failed. ${err ?? ''}`));
  }, [id]);

  const onPortUsageChanged = ($event) => setPortUsageType($event.target.value);

  const onActiveClicked = ($event) => {
    $event.preventDefault();
    setState(!state);
  };

  const onSubmitClicked = ($event) => {
    $event.preventDefault();
    appProjectService
      .patch(
        id,
        title,
        portUsageType === 'default' ? enums.portUsageType.default : enums.portUsageType.custom,
        appUniqueName,
        `${projectViewId}://${internalPort}`,
        state ? enums.projectState.active : enums.projectState.inactive
      )
      .then(() => {
        notify.success('Project updated successfully');
        navigate('/app-projects');
      })
      .catch((err) => notify.error(`Operation failed. ${err ?? ''}`));
  };

  return (
    <div className="ui grid">
      <div className="row">
        <div className="fifteen wide column">
          <div className="ui breadcrumb">
            <Link to="/app-projects" className="section">
              Projects
            </Link>
            <i aria-hidden="true" className="right angle icon divider"></i>
            <div className="active section">Update {breadcrumbTitle}</div>
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
                  value="default"
                  onChange={onPortUsageChanged}
                  checked={portUsageType === "default"}
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
                  checked={portUsageType === "custom"}
                />
                <label>Use a port</label>
              </div>
            </div>
            {portUsageType === "default" ? (<>

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

export default UpdateProject;
