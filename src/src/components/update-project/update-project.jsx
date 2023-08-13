import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const UpdateProject = () => {
  const [domainType, setDomainType] = useState("zira");
  const [projectTitle, setProjectTitle] = useState("");
  const { id } = useParams();

  const onDomainTypeChanged = ($event) => setDomainType($event.target.value);

  return (
    <div className="ui grid">
      <div className="row">
        <div className="fifteen wide column">
          <div className="ui breadcrumb">
            <Link to="/projects" className="section">
              Projects
            </Link>
            <i aria-hidden="true" className="right angle icon divider"></i>
            <div className="active section">Update {id}</div>
          </div>
        </div>
        <div className="one wide column right aligned">
          <Link to="/projects" class="circular ui icon button">
            <i class="icon close"></i>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column">
          <form className="ui form">
            <div className="field">
              <label>Project Title</label>
              <input placeholder="Project Title" />
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="radioGroup"
                  value="zira"
                  onClick={onDomainTypeChanged}
                  checked={domainType == "zira"}
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
                  onClick={onDomainTypeChanged}
                  checked={domainType == "custom"}
                />
                <label>Custom Domain</label>
              </div>
            </div>
            {domainType == "zira" ? (
              <div className="field">
                <label>Domain</label>
                <div className="ui right labeled input">
                  <input type="text" placeholder="Domain" />
                  <div className="ui label">.zira.aghdam.nl</div>
                </div>
              </div>
            ) : (
              <div className="field">
                <label>Domain</label>
                <input placeholder="Domain" />
              </div>
            )}
            <div className="field">
              <label>Internal Url</label>
              <input placeholder="Internal Url" />
            </div>
            <button className="ui button" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
