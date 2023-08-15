import service from "./service";

const projectService = {
    get: () => service.get("/Project"),
    create: (title, domainType, domain, internalUrl) => service.post("/Project", {
        "title": title,
        "domainType": domainType,
        "domain": domain,
        "internalUrl": internalUrl
    })
}

export default projectService;