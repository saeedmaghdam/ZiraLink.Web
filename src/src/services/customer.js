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
    }
}

export default customerService;