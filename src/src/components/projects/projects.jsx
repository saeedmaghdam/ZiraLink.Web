import styles from "./projects.module.css";

const Projects = () => {
  return (
    <div class={`ui container ${styles.container}`}>
      <button class="ui active blue button">
        <i class="icon cube"></i>
        New Project
      </button>
      <table class="ui single line table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Domain</th>
            <th>Username</th>
            <th>State</th>
            <th>Update Date</th>
            <th>Full Name</th>
            <th>Actions</th>
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
            <td>
              <span className={`ui green message ${styles.state}`}>Active</span>
            </td>
            <td>August 13, 2023</td>
            <td>
              <button class="circular ui icon button">
                <i class="icon edit"></i>
              </button>
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
            <td>
              <span className={`ui green message ${styles.state}`}>Active</span>
            </td>
            <td>August 13, 2023</td>
            <td>
              <button class="circular ui icon button">
                <i class="icon edit"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>antaeus.md.api</td>
            <td>
              <span className="bold">antaeus-md-api</span>
              <span className={styles.gray}>.zira.aghdam.nl</span>
            </td>
            <td>saeedmaghdam</td>
            <td>Saeed Aghdam</td>
            <td>
              <span className={`ui red message ${styles.state}`}>Inactive</span>
            </td>
            <td>August 13, 2023</td>
            <td>
              <button class="circular ui icon button">
                <i class="icon edit"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        aria-label="Pagination Navigation"
        role="navigation"
        class="ui pagination menu"
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
  );
};

export default Projects;
