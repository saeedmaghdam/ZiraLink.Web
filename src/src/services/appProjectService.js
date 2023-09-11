import service from './service';

const appProjectService = {

  get: () => service.get('/AppProject'),
  getById: (id) => service.get(`/AppProject/${id}`),
  create: (title, projectViewId, appProjectType, internalPort, state) =>
    service.post('/AppProject', {
      title: title,
      projectViewId: projectViewId,
      appProjectType: appProjectType,
      internalPort: internalPort,
      state: state
    }),
  patch: (id, title, projectViewId, appProjectType, internalPort, state) =>
    service.patch(`/AppProject/${id}`, {
      title: title,
      projectViewId: projectViewId,
      appProjectType: appProjectType,
      internalPort: internalPort,
      state: state
    }),
  delete: (id) => service.delete(`/AppProject/${id}`)
};

export default appProjectService;
