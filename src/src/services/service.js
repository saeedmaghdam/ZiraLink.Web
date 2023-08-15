import config from "../config";
import sessionService from "../session";

const service = {
    get: (apiUrl) => {
        if (!sessionService.isAuthenticated) {
            alert('Not authenticated');
            return;
        }

        return new Promise(function(resolve, reject) {
            fetch(`${config.BASE_URL}${apiUrl}`, {
                method: "GET",
                headers: {
                    "Accept": "text/plain",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(resp => {
                if (resp.status === 401) {
                    localStorage.removeItem("token");
                    alert("Not authorized");
                } else {
                    return resp.json() ;
                }
            }).then(json => {
                if (json === undefined)
                    reject(`Response is empty`);

                resolve(json);
            }).catch(err => {
                reject(err);
            });
        })
    },
    post: (apiUrl, object) => {
        if (!sessionService.isAuthenticated) {
            alert('Not authenticated');
            return;
        }

        return new Promise(function(resolve, reject) {
            fetch(`${config.BASE_URL}${apiUrl}`, {
                method: "POST",
                headers: {
                    "Accept": "text/plain",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            }).then(resp => {
                if (resp.status === 401) {
                    localStorage.removeItem("token");
                    alert("Not authorized");
                } else {
                    return resp.json() ;
                }
            }).then(json => {
                if (json === undefined)
                    reject(`Response is empty`);

                resolve(json);
            }).catch(err => {
                reject(err);
            });
        })
    },
    patch: (apiUrl, object) => {
        if (!sessionService.isAuthenticated) {
            alert('Not authenticated');
            return;
        }

        return new Promise(function(resolve, reject) {
            fetch(`${config.BASE_URL}${apiUrl}`, {
                method: "PATCH",
                headers: {
                    "Accept": "text/plain",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            }).then(resp => {
                if (resp.status === 401) {
                    localStorage.removeItem("token");
                    alert("Not authorized");
                } else {
                    return resp.json() ;
                }
            }).then(json => {
                if (json === undefined)
                    reject(`Response is empty`);

                resolve(json);
            }).catch(err => {
                reject(err);
            });
        })
    }
}

export default service;