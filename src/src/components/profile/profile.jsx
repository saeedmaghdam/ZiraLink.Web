import { useEffect, useState } from "react";
import customerService from "../../services/customer";
import config from "../../config";

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
      if (resp.status == 401) {
        localStorage.removeItem("token");
        window.localStorage.href = config.IDS_URL;
        return;
      }
  
      return resp.json()
    })
    .then(resp => {
      if (resp.status == false){
        alert(resp.errorMessage);
        return;
      }

      setUsername(resp.data.username);
      setEmail(resp.data.email);
      setName(resp.data.name);
      setFamily(resp.data.family);
    }).catch(err => {
      alert(err);
    }).finally(() => {
  });
  }, []);
  
  const onUpdateProfileClicked = ($event) => {
    $event.preventDefault();

    customerService.updateProfile(name, family).then((resp) => {
      if (resp.status == 401) {
        localStorage.removeItem("token");
        window.localStorage.href = config.IDS_URL;
        return;
      }

      return resp.json();
    })
    .then((resp) => {
      if (resp.status == false) {
        alert(resp.errorMessage);
        return;
      }

      console.log(resp);
      alert("Profile updated");
    })
    .catch((err) => {
      alert(err);
    });
  }

  const onChangePasswordClicked = ($event) => {
    $event.preventDefault();

    customerService.changePassword(currentPassword, password, confirmPassword).then((resp) => {
      if (resp.status == 401) {
        localStorage.removeItem("token");
        window.localStorage.href = config.IDS_URL;
        return;
      }

      return resp.json();
    })
    .then((resp) => {
      if (resp.status == false) {
        alert(resp.errorMessage);
        return;
      }

      alert("Password changed");
    })
    .catch((err) => {
      alert(err);
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
              <input placeholder="Current Password" value={currentPassword} onChange={$event => setCurrentPassword($event.target.value)} />
            </div>
            <div className="field">
              <label>Password</label>
              <input placeholder="Password" value={password} onChange={$event => setPassword($event.target.value)} />
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <input placeholder="Confirm Password" value={confirmPassword} onChange={$event => setConfirmPassword($event.target.value)} />
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
