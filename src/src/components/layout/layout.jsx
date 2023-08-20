import { Link, Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import customerService from "../../services/customerService";

const Layout = () => {
  return (
    <>
      <header className="ui">
        <div className="ui grid noMarginTop noMargin">
          <div className="row noPadding noMargin">
            <div className={`eight wide column`}>
              <h1 className="prevent-highlight">
                Zira <span className={styles.yellow}>Link</span>{" "}
                <span className={styles.small}>dashbboard</span>
              </h1>
            </div>
            <div className={`eight wide column right aligned`}>
              <button className={`circular ui icon button ${styles.signOut}`} onClick={() => customerService.signOut() }>
                <i className="icon sign-out"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="ui grid noMarginTop noMarginBottom">
        <div className="row noPadding">
          <div className={`one wide column noPadding ${styles.fullHeight}`}>
            <div className="ui segment pushable noBorder noBorderRadius">
              <div
                className={`ui inverted vertical labeled icon ui overlay centered wide animating visible sidebar menu fullWidth ${styles.menu}`}
              >
                {/* <Link to="/" className="item">
                  <i aria-hidden="true" className="home icon"></i>Overview
                </Link> */}
                <Link to="/projects" className="item">
                  <i aria-hidden="true" className="cube icon"></i>Projects
                </Link>
                <Link to="/profile" className="item">
                  <i aria-hidden="true" className="user icon"></i>Profile
                </Link>
                {/* <Link to="/settings" className="item">
                  <i aria-hidden="true" className="cog icon"></i>Settings
                </Link> */}
                <Link to="/downloads" className="item">
                  <i aria-hidden="true" className="cloud download icon"></i>Downloads
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`fifteen wide column ${styles.fullHeight} ${styles.container}`}
          >
            <div className={`ui container ${styles.componentContainer}`}>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
