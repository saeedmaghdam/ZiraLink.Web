import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import projectService from "../../services/projectService";
import enums from "../../enums/domainType";
import notify from "../../services/notify";

const NewProject = () => {
  const [domainType, setDomainType] = useState("default");
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [internalUrl, setInternalUrl] = useState("");
  const navigate = useNavigate();

  const onDomainTypeChanged = ($event) => setDomainType($event.target.value);

  const onSubmitClicked = ($event) => {
    $event.preventDefault();
    projectService.create(title, domainType == "default" ? enums.domainType.default : enums.domainType.custom, domain, internalUrl).then(() => {
      notify.success("Project added successfully");
      navigate("/projects");
    }).catch(err => notify.error(`Operation failed. ${err ?? ""}`));;
  }

  return (
    <div className="ui grid">
      <div className="row">
        <div className="fifteen wide column">
          <div className="ui breadcrumb">
            <Link to="/projects" className="section">
              Projects
            </Link>
            <i aria-hidden="true" className="right angle icon divider"></i>
            <div className="active section">New Project</div>
          </div>
        </div>
        <div className="one wide column right aligned">
          <Link to="/projects" className="circular ui icon button">
            <i className="icon close"></i>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column">
          <form className="ui form">
            <div className="field">
              <label>Project Title</label>
              <input placeholder="Project Title" value={title} onChange={$event => setTitle($event.target.value)} />
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="radioGroup"
                  value="default"
                  onChange={onDomainTypeChanged}
                  checked={domainType == "default"}
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
                  onChange={onDomainTypeChanged}
                  checked={domainType == "custom"}
                />
                <label>Custom Domain</label>
              </div>
            </div>
            {domainType == "default" ? (
              <div className="field">
                <label>Domain</label>
                <div className="ui right labeled input">
                  <input type="text" placeholder="Domain" value={domain} onChange={$event => setDomain($event.target.value)} />
                  <div className="ui label">.zira.aghdam.nl</div>
                </div>
              </div>
            ) : (
              <div className="field">
                <label>Domain</label>
                <input type="text" placeholder="Domain" value={domain} onChange={$event => setDomain($event.target.value)} />
              </div>
            )}
            <div className="field">
              <label>Internal Url</label>
              <input placeholder="Internal Url" value={internalUrl} onChange={$event => setInternalUrl($event.target.value)} />
            </div>
            <button className="ui button" type="submit" onClick={onSubmitClicked}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
