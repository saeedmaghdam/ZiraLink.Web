const sessionService = {
    isAuthenticated: (() => { 
    const token = localStorage.getItem("token");
    if (token === undefined)
        return false;

    return true;
 })()
}


export default sessionService;