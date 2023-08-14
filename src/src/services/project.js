import config from "../config";

const projectService = {
    get: () => {
        const request = fetch(`${config.BASE_URL}/Project`, {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        return request;
    },
    create: (title, domainType, domain, internalUrl) => {
        const request = fetch(`${config.BASE_URL}/Project`, {
            method: "POST",
            headers: {
                "Accept": "text/plain",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": title,
                "domainType": domainType,
                "domain": domain,
                "internalUrl": internalUrl
            })
        });

        return request;
    }
}

export default projectService;