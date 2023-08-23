import config from '../config';
import sessionService from '../session';

const service = {
  get: (apiUrl) => {
    if (!sessionService.isAuthenticated) {
      window.location.href = `${config.BASE_URL}/bff/login`;
      return;
    }

    return new Promise(function (resolve, reject) {
      fetch(`${config.BASE_URL}${apiUrl}`, {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((resp) => {
          if (!isResponseValid(resp)) reject();

          return resp.json();
        })
        .then((json) => {
          if (json === undefined) reject(`Response is empty`);

          resolve(json);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  post: (apiUrl, object) => {
    if (!sessionService.isAuthenticated) {
      window.location.href = `${config.BASE_URL}/bff/login`;
      return;
    }

    return new Promise(function (resolve, reject) {
      fetch(`${config.BASE_URL}${apiUrl}`, {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      })
        .then((resp) => {
          if (!isResponseValid(resp)) reject();

          return resp.json();
        })
        .then((json) => {
          if (json === undefined) reject(`Response is empty`);

          resolve(json);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  patch: (apiUrl, object) => {
    if (!sessionService.isAuthenticated) {
      window.location.href = `${config.BASE_URL}/bff/login`;
      return;
    }

    return new Promise(function (resolve, reject) {
      fetch(`${config.BASE_URL}${apiUrl}`, {
        method: 'PATCH',
        headers: {
          Accept: 'text/plain',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      })
        .then((resp) => {
          if (!isResponseValid(resp)) reject();

          return resp.json();
        })
        .then((json) => {
          if (json === undefined) reject(`Response is empty`);

          resolve(json);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  delete: (apiUrl) => {
    if (!sessionService.isAuthenticated) {
      window.location.href = `${config.BASE_URL}/bff/login`;
      return;
    }

    return new Promise(function (resolve, reject) {
      fetch(`${config.BASE_URL}${apiUrl}`, {
        method: 'DELETE',
        headers: {
          Accept: 'text/plain',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((resp) => {
          if (!isResponseValid(resp)) reject();

          return resp.json();
        })
        .then((json) => {
          if (json === undefined) reject(`Response is empty`);

          resolve(json);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

const isResponseValid = (resp) => {
  if (resp.status === 401) {
    localStorage.removeItem('token');
    window.location.href = `${config.BASE_URL}/bff/login`;
  } else if (!resp.ok) {
    return false;
  } else {
    return true;
  }
};

export default service;
