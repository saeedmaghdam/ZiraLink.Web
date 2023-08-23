import styles from './downloads.module.css';

const Downloads = () => (
  <div className="ui grid">
    <div className="row">
      <div className="sixteen wide column">
        <div className="ui breadcrumb">
          <div className="active section">Download Clients</div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="sixteen wide column">
        <a href="/static/win-x64.zip" target="_black" className={styles.downloadLink}>
          <i className="cloud download icon"></i>Windows x64
        </a>
        <a href="/static/linux-x64.zip" target="_black" className={styles.downloadLink}>
          <i className="cloud download icon"></i>Linux x64
        </a>
        <a href="/static/osx-x64.zip" target="_black" className={styles.downloadLink}>
          <i className="cloud download icon"></i>macOS x64
        </a>
      </div>
    </div>
  </div>
);

export default Downloads;
