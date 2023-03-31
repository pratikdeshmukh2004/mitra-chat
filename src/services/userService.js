import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';

const API_URL = process.env.REACT_APP_API_URL // your API URL here

// create axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
});

// set JWT token as default Authorization header
axiosInstance.interceptors.request.use((config) => {
    const token = reactLocalStorage.getObject('token');
    if (token?.data) {
        config.headers.Authorization = token.data.accessToken
    }
    return config;
});

// authentication API functions
const clientService = {
    login: async (email, password) => {
        const response = await axiosInstance.post('/auth/login', { email, password });
        if (response.data.status) {
            reactLocalStorage.setObject("token", response.data.user)
        }
        return response.data;
    },
    register: async (name, email, password) => {
        const response = await axiosInstance.post('/auth/register', { name, email, password });
        return response.data;
    },
    logout: async () => {
        reactLocalStorage.remove("token")
    },
    getCurrentUser: async () => {
        try {
            const tokenData = reactLocalStorage.getObject("token")
            if (tokenData?.data) {
                return tokenData
            }
            return null
        } catch {
            return null
        }
    }
};

export default clientService;