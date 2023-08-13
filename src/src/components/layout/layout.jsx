import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";

const Layout = () => {
  return (
    <>
      <header className="ui">
        <h1 className="prevent-highlight">
          Zira <span className={styles.yellow}>Link</span> <span className={styles.small}>dashbboard</span>
        </h1>
      </header>
      <div className="ui grid noMarginTop noMarginBottom">
        <div className="row noPadding">
          <div className={`one wide column noPadding ${styles.fullHeight}`}>
            <div className="ui segment pushable noBorder noBorderRadius">
              <div
                className={`ui inverted vertical labeled icon ui overlay centered wide animating visible sidebar menu fullWidth ${styles.menu}`}
              >
                <a className="item">
                  <i aria-hidden="true" className="home icon"></i>Overview
                </a>
                <a className="item">
                  <i aria-hidden="true" className="cube icon"></i>Projects
                </a>
                <a className="item">
                  <i aria-hidden="true" className="file alternate icon"></i>
                  Reports
                </a>

                <a className="item">
                  <i aria-hidden="true" className="user icon"></i>Profile
                </a>

                <a className="item">
                  <i aria-hidden="true" className="cog icon"></i>Settings
                </a>
              </div>
            </div>
          </div>
          <div
            className={`fifteen wide column ${styles.fullHeight} ${styles.container}`}
          >
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
