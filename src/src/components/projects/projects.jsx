import { Link } from "react-router-dom";
import styles from "./projects.module.css";

const Projects = () => {
  return (
    <div className="ui grid">
      <div className="row">
        <div className="sixteen wide column">
          <div class="ui breadcrumb">
            <div class="active section">Projects</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="four wide column">
          <Link to="/projects/new" class="ui active blue button">
            <i class="icon cube"></i>
            New Project
          </Link>
        </div>
        <div className="twelve wide column right aligned">
          <div class="ui icon input">
            <input
              type="text"
              placeholder="Search..."
              data-listener-added_f3844f1b="true"
            />
            <i class="circular search link icon"></i>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column">
          <table class="ui single line table">
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
              <tr>
                <td>Test React App</td>
                <td>
                  <span className="bold">test</span>
                  <span className={styles.gray}>.zira.aghdam.nl</span>
                </td>
                <td>saeedmaghdam</td>
                <td>Saeed Aghdam</td>
                <td>August 13, 2023</td>
                <td>
                  <span className={`ui green message ${styles.state}`}>
                    Active
                  </span>
                </td>
                <td>
                  <Link to="/projects/update/1" class="circular ui icon button">
                    <i class="icon edit"></i>
                  </Link>
                  {/* <button class="circular ui icon button">
                    <i class="icon file"></i>
                  </button> */}
                </td>
              </tr>
              <tr>
                <td>IIS Test Project</td>
                <td>
                  <span className="bold">iis</span>
                  <span className={styles.gray}>.zira.aghdam.nl</span>
                </td>
                <td>saeedmaghdam</td>
                <td>Saeed Aghdam</td>
                <td>August 13, 2023</td>
                <td>
                  <span className={`ui green message ${styles.state}`}>
                    Active
                  </span>
                </td>
                <td>
                  <Link to="/projects/update/2" class="circular ui icon button">
                    <i class="icon edit"></i>
                  </Link>
                  {/* <button class="circular ui icon button">
                    <i class="icon file"></i>
                  </button> */}
                </td>
              </tr>
              <tr>
                <td>antaeus.md.api</td>
                <td>
                  <span className="bold">md.antaeusproject.com</span>
                </td>
                <td>saeedmaghdam</td>
                <td>Saeed Aghdam</td>
                <td>August 13, 2023</td>
                <td>
                  <span className={`ui red message ${styles.state}`}>
                    Inactive
                  </span>
                </td>
                <td>
                  <Link to="/projects/update/2" class="circular ui icon button">
                    <i class="icon edit"></i>
                  </Link>
                  {/* <button class="circular ui icon button">
                    <i class="icon file"></i>
                  </button> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column">
          <div
            aria-label="Pagination Navigation"
            role="navigation"
            class="ui pagination pointing secondary menu"
          >
            <a
              aria-current="false"
              aria-disabled="false"
              tabindex="0"
              value="1"
              aria-label="Previous item"
              type="prevItem"
              class="item"
            >
              ⟨
            </a>
            <a
              aria-current="true"
              aria-disabled="false"
              tabindex="0"
              value="1"
              type="pageItem"
              class="active item"
            >
              1
            </a>
            <a
              aria-current="false"
              aria-disabled="false"
              tabindex="0"
              value="2"
              type="pageItem"
              class="item"
            >
              2
            </a>
            <a
              aria-current="false"
              aria-disabled="false"
              tabindex="0"
              value="3"
              type="pageItem"
              class="item"
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
              class="item"
            >
              ⟩
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
