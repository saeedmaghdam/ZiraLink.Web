import service from './service';

const appProjectService = {

  get: () => service.get('/AppProject'),
  getById: (id) => service.get(`/AppProject/${id}`),
  create: (title, appProjectViewId, appProjectType, portType, internalPort, state) =>
    service.post('/AppProject', {
      title: title,
      appProjectViewId: appProjectViewId,
      appProjectType: appProjectType,
      portType: portType,
      internalPort: internalPort,
      state: state
    }),
  patch: (id, title, appProjectViewId, appProjectType, portType, internalPort, state) =>
    service.patch(`/AppProject/${id}`, {
      title: title,
      appProjectViewId: appProjectViewId,
      appProjectType: appProjectType,
      portType: portType,
      internalPort: internalPort,
      state: state
    }),
  delete: (id) => service.delete(`/AppProject/${id}`)
};

export default appProjectService;
