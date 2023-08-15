import { Link } from "react-router-dom";
import projectService from "../../services/projectService";
import { useEffect, useState } from "react";
import enums from "../../enums/domainType";
import styles from "./projects.module.css";
import notify from "../../services/notify";
import { Confirm } from "semantic-ui-react";

const Projects = () => {
  const [index, setIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [confirmShown, setConfirmShown] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(0);

  const handleConfirm = () => {
    projectService.delete(productIdToDelete).then(resp => notify.success("Project successfully removed")).catch(err => notify.error(`Operation failed. ${err ?? ""}`));;
    setIndex(index + 1);
    setConfirmShown(false);
  }
  const handleCancel = () => setConfirmShown(false);

  useEffect(() => {
    projectService.get().then((resp) => {
      setProjects(resp.data);
    }).catch(err => notify.error(`Operation failed. ${err ?? ""}`));;
  }, [index]);

  const onDeleteClicked = (id) => {
    setProductIdToDelete(id);
    setConfirmShown(true);
  }

  const dateFormat = (inp) => {
    const date = new Date(inp);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    return formattedDate;
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
            <input
              type="text"
              placeholder="Search..."
              data-listener-added_f3844f1b="true"
            />
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
                <th>Domain</th>
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
                      <span className="bold">{item.domain}</span>
                      {item.domainType == enums.domainType.default && (
                        <span className={styles.gray}>.zira.aghdam.nl</span>
                      )}
                    </td>
                    <td>{item.customer.username}</td>
                    <td>{item.customer.email}</td>
                    <td>{dateFormat(item.dateUpdated)}</td>
                    <td>
                      <span className={`ui green message ${styles.state}`}>
                        Active
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/projects/update/${item.id}`}
                        className="circular ui icon button"
                      >
                        <i className="icon edit"></i>
                      </Link>
                      <button className="circular ui icon button red" onClick={() => onDeleteClicked(item.id)}>
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
      {/* <div className="row">
        <div className="sixteen wide column">
          <div
            aria-label="Pagination Navigation"
            role="navigation"
            className="ui pagination pointing secondary menu"
          >
            <a
              aria-current="false"
              aria-disabled="false"
              tabindex="0"
              value="1"
              aria-label="Previous item"
              type="prevItem"
              className="item"
            >
              ⟨
            </a>
            <a
              aria-current="true"
              aria-disabled="false"
              tabindex="0"
              value="1"
              type="pageItem"
              className="active item"
            >
              1
            </a>
            <a
              aria-current="false"
              aria-disabled="false"
              tabindex="0"
              value="2"
              type="pageItem"
              className="item"
            >
              2
            </a>
            <a
              aria-current="false"
              aria-disabled="false"
              tabindex="0"
              value="3"
              type="pageItem"
              className="item"
            >
              3
            </a>
            <a
              aria-current="false"
              aria-disabled="false"
              tabindex="0"
              value="2"
              aria-label="Next item"
              type="nextItem"
              className="item"
            >
              ⟩
            </a>
          </div>
        </div>
      </div> */}
      <Confirm
          open={confirmShown}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
    </div>
  );
};

export default Projects;
