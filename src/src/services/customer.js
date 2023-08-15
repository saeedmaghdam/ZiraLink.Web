import config from "../config";

const customerService = {
    getProfile: () => {
        const request = fetch(`${config.BASE_URL}/Customer/Profile`, {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        return request;
    },
    updateProfile: (name, family) => {
        const request = fetch(`${config.BASE_URL}/Customer`, {
            method: "PATCH",
            headers: {
                "Accept": "text/plain",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "family": family
            })
        });

        return request;
    },
    changePassword: (currentPassword, password, confirmPassword) => {
        if (password != confirmPassword)
        {
            alert("Password does not match");
            return;
        }

        const request = fetch(`${config.BASE_URL}/Customer/ChangePassword`, {
            method: "PATCH",
            headers: {
                "Accept": "text/plain",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "currentPassword": currentPassword,
                "newPassword": password
            })
        });

        return request;
    }
}

export default customerService;