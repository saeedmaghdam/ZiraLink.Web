import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import notify from '../../services/notify';
import enums from '../../enums/enums';
import projectService from '../../services/projectService';
import styles from './update-project.module.css';
import config from '../../config';

const UpdateProject = () => {
  const [domainType, setDomainType] = useState('default');
  const [title, setTitle] = useState('');
  const [breadcrumbTitle, setBreadcrumbTitle] = useState('');
  const [domainProtocol, setDomainProtocol] = useState('http');
  const [domain, setDomain] = useState('');
  const [internalUrl, setInternalUrl] = useState('');
  const [state, setState] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    projectService
      .getById(id)
      .then((resp) => {
        setDomainType(resp.data.domainType === enums.domainType.default ? 'default' : 'custom');
        setTitle(resp.data.title);
        setBreadcrumbTitle(resp.data.title);
        setDomain(resp.data.domain);
        setState(resp.data.state);

        const colonIndex = resp.data.internalUrl.indexOf(':');
        let internalUrl = resp.data.internalUrl;
        if (colonIndex !== -1) {
          setDomainProtocol(internalUrl.slice(0, colonIndex));
          internalUrl = internalUrl.slice(colonIndex + 3);
        }
        setInternalUrl(internalUrl);
      })
      .catch((err) => notify.error(`Operation failed. ${err ?? ''}`));
  }, [id]);

  const onDomainTypeChanged = ($event) => setDomainType($event.target.value);

  const onActiveClicked = ($event) => {
    $event.preventDefault();
    setState(!state);
  };

  const onDomainProtocolClicked = ($event) => {
    $event.preventDefault();

    if (domainProtocol === 'http') setDomainProtocol('https');
    else setDomainProtocol('http');
  };

  const onSubmitClicked = ($event) => {
    $event.preventDefault();
    projectService
      .patch(
        id,
        title,
        domainType === 'default' ? enums.domainType.default : enums.domainType.custom,
        domain,
        `${domainProtocol}://${internalUrl}`,
        state ? enums.projectState.active : enums.projectState.inactive
      )
      .then(() => {
        notify.success('Project updated successfully');
        navigate('/projects');
      })
      .catch((err) => notify.error(`Operation failed. ${err ?? ''}`));
  };

  return (
    <div className="ui grid">
      <div className="row">
        <div className="fifteen wide column">
          <div className="ui breadcrumb">
            <Link to="/projects" className="section">
              Projects
            </Link>
            <i aria-hidden="true" className="right angle icon divider"></i>
            <div className="active section">Update {breadcrumbTitle}</div>
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
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="radioGroup"
                  value="default"
                  onChange={onDomainTypeChanged}
                  checked={domainType === 'default'}
                />
                <label>Zira's Subdomain</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="radioGroup"
                  value="custom"
                  onChange={onDomainTypeChanged}
                  checked={domainType === 'custom'}
                  disabled
                />
                <label>Custom Domain</label>
              </div>
            </div>
            {domainType === 'default' ? (
              <div className="field">
                <label>Public Domain</label>
                <div className="ui right labeled input">
                  <input
                    type="text"
                    placeholder="Public Domain"
                    value={domain}
                    onChange={($event) => setDomain($event.target.value)}
                  />
                  <div className="ui label">{config.DEFAULT_DOMAIN}</div>
                </div>
              </div>
            ) : (
              <div className="field">
                <label>Public Domain</label>
                <input
                  type="text"
                  placeholder="Public Domain"
                  value={domain}
                  onChange={($event) => setDomain($event.target.value)}
                />
              </div>
            )}
            <div className="field">
              <label>Internal Url</label>
              <div className="ui labeled input">
                <button
                  className={`ui label toggle button ${domainProtocol === 'https' && 'green'} ${
                    styles.protocol
                  }`}
                  onClick={onDomainProtocolClicked}>
                  {domainProtocol}://
                </button>
                <input
                  placeholder="Internal Url"
                  value={internalUrl}
                  onChange={($event) => setInternalUrl($event.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <button className={`ui toggle button ${state && 'green'}`} onClick={onActiveClicked}>
                Active
              </button>
            </div>
            <button className="ui button" type="submit" onClick={onSubmitClicked}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
