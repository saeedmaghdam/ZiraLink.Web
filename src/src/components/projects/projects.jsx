import { Link } from 'react-router-dom';
import projectService from '../../services/projectService';
import { useEffect, useState } from 'react';
import enums from '../../enums/enums';
import styles from './projects.module.css';
import notify from '../../services/notify';
import { Confirm } from 'semantic-ui-react';
import config from '../../config';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [confirmShown, setConfirmShown] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(0);

  const handleConfirm = () => {
    projectService
      .delete(productIdToDelete)
      .then(() => {
        getData();
        notify.success('Project successfully removed');
      })
      .catch((err) => notify.error(`Operation failed. ${err ?? ''}`));
    setConfirmShown(false);
  };
  const handleCancel = () => setConfirmShown(false);

  useEffect(() => getData(), []);

  const getData = () => {
    projectService
      .get()
      .then((resp) => {
        setProjects(resp.data);
      })
      .catch((err) => notify.error(`Operation failed. ${err ?? ''}`));
  };

  const onDeleteClicked = (id) => {
    setProductIdToDelete(id);
    setConfirmShown(true);
  };

  const dateFormat = (inp) => {
    const date = new Date(inp);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });

    return formattedDate;
  };

  const getUrl = (input) => {
    const colonIndex = input.indexOf(':');
    let url = input;
    if (colonIndex === -1) return <span>{input}</span>;
    const schema = url.slice(0, colonIndex);
    url = url.slice(colonIndex + 3);

    return (
      <>
        <span className={schema === 'http' ? '' : 'green bold'}>{schema}://</span>
        {url}
      </>
    );
  };

  return (
    <div className="ui grid">
      <div className="row">
        <div className="sixteen wide column">
          <div className="ui breadcrumb">
            <div className="active section">Projects</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="four wide column">
          <Link to="/projects/new" className="ui active blue button">
            <i className="icon cube"></i>
            New Project
          </Link>
        </div>
        <div className="twelve wide column right aligned">
          <div className="ui icon input">
            <input type="text" placeholder="Search..." data-listener-added_f3844f1b="true" />
            <i className="circular search link icon"></i>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column">
          <table className="ui single line table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Public Domain</th>
                <th>Internal Url</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Update Date</th>
                <th>State</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      {item.domainType === enums.domainType.default && (
                        <a
                          href={`https://${item.domain}${config.DEFAULT_DOMAIN}`}
                          target="_blank"
                          rel="nofollow noreferrer">
                          <span className="bold black">{item.domain}</span>
                          <span className={styles.gray}>{config.DEFAULT_DOMAIN}</span>
                        </a>
                      )}
                      {item.domainType !== enums.domainType.default && (
                        <a href={item.domain} target="_blank" rel="nofollow noreferrer">
                          <span className="black">{item.domain}</span>
                        </a>
                      )}
                    </td>
                    <td>{getUrl(item.internalUrl)}</td>
                    <td>{item.customer.username}</td>
                    <td>
                      {item.customer.name} {item.customer.family}
                    </td>
                    <td>{dateFormat(item.dateUpdated)}</td>
                    <td>
                      <span
                        className={`ui message ${
                          item.state === enums.projectState.active ? 'green' : 'yellow'
                        } ${styles.state}`}>
                        {item.state === enums.projectState.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <Link to={`/projects/update/${item.id}`} className="circular ui icon button">
                        <i className="icon edit"></i>
                      </Link>
                      <button
                        className="circular ui icon button red"
                        onClick={() => onDeleteClicked(item.id)}>
                        <i className="icon delete"></i>
                      </button>
                      {/* <button className="circular ui icon button">
                          <i className="icon file"></i>
                        </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Confirm open={confirmShown} onCancel={handleCancel} onConfirm={handleConfirm} />
    </div>
  );
};

export default Projects;
