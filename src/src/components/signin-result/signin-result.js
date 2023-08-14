import config from "../../config";
import customerService from "../../services/customer";

const SigninResult = () => {
    const accessToken = new URLSearchParams(window.location.search).get("access_token");
    localStorage.setItem("token", accessToken);

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

        localStorage.setItem("profile", JSON.stringify(resp.data));
      }).catch(err => {
        alert(err);
      }).finally(() => {
        window.location.href = "/";
      });
}

export default SigninResult;