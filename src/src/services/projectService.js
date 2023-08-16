import service from "./service";

const projectService = {
    get: () => service.get("/Project"),
    getById: (id) => service.get(`/Project/${id}`),
    create: (title, domainType, domain, internalUrl) => service.post("/Project", {
        "title": title,
        "domainType": domainType,
        "domain": domain,
        "internalUrl": internalUrl
    }),
    patch: (id, title, domainType, domain, internalUrl, state) => service.patch(`/Project/${id}`, {
        "title": title,
        "domainType": domainType,
        "domain": domain,
        "internalUrl": internalUrl,
        "state": state
    }),
    delete: (id) => service.delete(`/Project/${id}`)
}

export default projectService;