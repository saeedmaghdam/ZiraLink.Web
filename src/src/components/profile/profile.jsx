const Profile = () => {
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
              <input placeholder="Username" disabled />
            </div>
            <div className="field">
              <label>Email</label>
              <input placeholder="Email" disabled />
            </div>
            <div className="field">
              <label>Password</label>
              <input placeholder="Password" />
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <input placeholder="Confirm Password" />
            </div>
            <button className="ui button" type="submit">
              Save
            </button>
          </form>
          <div class="ui divider"></div>
          <form className="ui form">
            <div className="field">
              <label>Name</label>
              <input placeholder="Name" />
            </div>
            <div className="field">
              <label>Family</label>
              <input placeholder="Family" />
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
