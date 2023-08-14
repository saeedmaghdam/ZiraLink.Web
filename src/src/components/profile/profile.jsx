import { useState } from "react";

const Profile = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const [name, setName] = useState(profile.given_name);
  const [family, setFamily] = useState(profile.family_name);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <div className="ui grid">
      <div className="row">
        <div className="fifteen wide column">
          <div className="ui breadcrumb">
            <div className="active section">Profile</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column">
          <form className="ui form">
            <div className="field">
              <label>Username</label>
              <input placeholder="Username" disabled value={profile.preferred_username} />
            </div>
            <div className="field">
              <label>Email</label>
              <input placeholder="Email" disabled value={profile.email} />
            </div>
            <div className="field">
              <label>Password</label>
              <input placeholder="Password" value={password} onChange={$event => setPassword($event.target.value)} />
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <input placeholder="Confirm Password" value={confirmPassword} onChange={$event => setConfirmPassword($event.target.value)} />
            </div>
            <button className="ui button" type="submit">
              Save
            </button>
          </form>
          <div className="ui divider"></div>
          <form className="ui form">
            <div className="field">
              <label>Name</label>
              <input placeholder="Name" value={name} onChange={$event => setName($event.target.value)} />
            </div>
            <div className="field">
              <label>Family</label>
              <input placeholder="Family" value={family} onChange={$event => setFamily($event.target.value)} />
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

export default Profile;
