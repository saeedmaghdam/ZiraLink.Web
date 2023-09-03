import service from './service';

const appProjectService = {
  get: () => service.get('/AppProject'),
  getById: (id) => service.get(`/AppProject/${id}`),
  create: (title, domainType, domain, internalUrl, state) =>
    service.post('/AppProject', {
      title: title,
      domainType: domainType,
      domain: domain,
      internalUrl: internalUrl,
      state: state
    }),
  patch: (id, title, domainType, domain, internalUrl, state) =>
    service.patch(`/AppProject/${id}`, {
      title: title,
      domainType: domainType,
      domain: domain,
      internalUrl: internalUrl,
      state: state
    }),
  delete: (id) => service.delete(`/AppProject/${id}`)
};

export default appProjectService;
