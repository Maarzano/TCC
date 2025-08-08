import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/v1/",
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token.replace("Bearer ", "")}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
