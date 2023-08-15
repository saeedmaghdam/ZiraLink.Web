import { useEffect, useState } from "react";
import customerService from "../../services/customerService";
import notify from "../../services/notify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [currentPassword, setCurrentPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    customerService.getProfile().then(resp => {
      setUsername(resp.data.username);
      setEmail(resp.data.email);
      setName(resp.data.name);
      setFamily(resp.data.family);
    });
  }, []);
  
  const onUpdateProfileClicked = ($event) => {
    $event.preventDefault();
    customerService.updateProfile(name, family).then((resp) => notify.success("Profile updated"));
  }

  const onChangePasswordClicked = ($event) => {
    $event.preventDefault();
    customerService.changePassword(currentPassword, password, confirmPassword).then((resp) => {
      notify.success("Password changed");
    });
  }

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
              <input placeholder="Username" disabled value={username} />
            </div>
            <div className="field">
              <label>Email</label>
              <input placeholder="Email" disabled value={email} />
            </div>
            <div className="field">
              <label>Current Password</label>
              <input type="password" placeholder="Current Password" value={currentPassword} onChange={$event => setCurrentPassword($event.target.value)} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="Password" value={password} onChange={$event => setPassword($event.target.value)} />
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={$event => setConfirmPassword($event.target.value)} />
            </div>
            <button className="ui button" type="submit" onClick={onChangePasswordClicked}>
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
            <button className="ui button" type="submit" onClick={onUpdateProfileClicked}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
