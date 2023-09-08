import { Link } from 'react-router-dom';
import appProjectService from '../../services/appProjectService';
import { useEffect, useState } from 'react';
import notify from '../../services/notify';
import { Confirm } from 'semantic-ui-react'; 
import enums from '../../enums/enums';
import styles from './app-projects.module.css';

const AppProjects = () => {
  const [projects, setProjects] = useState([]);
  const [confirmShown, setConfirmShown] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(0);

  const handleConfirm = () => {
    appProjectService
      .delete(productIdToDelete)
      .then(() => {
        getData();
        notify.success('App project successfully removed');
      })
      .catch((err) => notify.error(`Operation failed. ${err ?? ''}`));
    setConfirmShown(false);
  };
  const handleCancel = () => setConfirmShown(false);

  useEffect(() => getData(), []);

  const getData = () => {
    appProjectService
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
      month: 'numeric',
      day: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    });

    return <>
    <p className={styles.date}>{formattedDate}</p>
    <p>{formattedTime}</p>
    </>
  };


  return (
    <div className="ui grid">
      <div className="row">
        <div className="sixteen wide column">
          <div className="ui breadcrumb">
            <div className="active section">App Projects</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="four wide column">
          <Link to="/app-projects/new" className="ui active blue button">
            <i className="icon cube"></i>
            New App Project
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
                <th>Project ViewId</th>
                <th>App Unique Name</th>
                <th>Internal Port</th>
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
                    <td>{item.viewId}</td> 
                    <td>{item.appUniqueName}</td> 
                    <td>{item.internalPort}</td>
                    <td>{item.customer.username}</td>
                    <td>
                      {item.customer.name} {item.customer.family}
                    </td>
                    <td>{dateFormat(item.dateUpdated)}</td>
                    <td>
                      <span
                        className={`ui message ${
                          item.state === enums.rowState.active ? 'green' : 'yellow'
                        } ${styles.state}`}>
                        {item.state === enums.rowState.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <Link to={`/app-projects/update/${item.id}`} className="circular ui icon button">
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

export default AppProjects;
