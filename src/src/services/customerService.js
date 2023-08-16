import config from "../config";
import notify from "./notify";
import service from "./service";

const customerService = {
    getProfile: () => service.get("/Customer/Profile"),
    updateProfile: (name, family) => service.patch("/Customer", {
        "name": name,
        "family": family
    }),
    changePassword: (currentPassword, password, confirmPassword) => {
        if (password !== confirmPassword)
        {
            notify.info("Password does not match");
            return;
        }

        return service.patch("/Customer/ChangePassword", {
            "currentPassword": currentPassword,
            "newPassword": password
        });
    }, 
    signOut: () => {
        localStorage.removeItem("token");
        window.location.href = config.IDS_URL + "/Account/Logout"
    }
}

export default customerService;