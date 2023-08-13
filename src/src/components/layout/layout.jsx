import { Link, Outlet } from "react-router-dom";
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
                <Link to="/" className="item">
                  <i aria-hidden="true" className="home icon"></i>Overview
                </Link>
                <Link to="/projects"  className="item">
                  <i aria-hidden="true" className="cube icon"></i>Projects
                </Link>
                <Link to="/profile"  className="item">
                  <i aria-hidden="true" className="user icon"></i>Profile
                </Link>
                <Link to="/settings"  className="item">
                  <i aria-hidden="true" className="cog icon"></i>Settings
                </Link>
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
