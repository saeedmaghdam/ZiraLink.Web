import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import notify from '../../services/notify';
import enums from '../../enums/enums';
import appProjectService from '../../services/appProjectService';


const UpdateAppProject = () => {
  const [appProjectType, setAppProjectType] = useState("default");
  const [title, setTitle] = useState("");
  const [breadcrumbTitle, setBreadcrumbTitle] = useState('');
  const [appProjectViewId, setappProjectViewId] = useState("");
  const [internalPort, setInternalPort] = useState("");
  const [state, setState] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    appProjectService
      .getById(id)
      .then((resp) => {
        // eslint-disable-next-line no-debugger
        debugger
        setAppProjectType(resp.data.appProjectType === enums.appProjectType.share ? 'share' : 'use');
        setTitle(resp.data.title);
        setBreadcrumbTitle(resp.data.title);
        setappProjectViewId(resp.data.appProjectViewId);
        setState(resp.data.state); 
        setInternalPort(resp.data.internalPort);
      })
      .catch((err) => notify.error(`Operation failed. ${err ?? ''}`));
  }, [id]);

  const onAppProjectTypeChanged = ($event) => setAppProjectType($event.target.value);

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
        appProjectType === "use" ? appProjectViewId : "",
        appProjectType === "share"
          ? enums.appProjectType.share
          : enums.appProjectType.use,
        internalPort,
        state ? enums.rowState.active : enums.rowState.inactive
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
                  value={appProjectViewId}
                  onChange={($event) => setappProjectViewId($event.target.value)}
                />
              </div>
            )}
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

export default UpdateAppProject;
