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
        if (response.status){
            reactLocalStorage.setObject("token", response)
        }
        return response.data;
    },
    register: async (name, email, password) => {
        const response = await axiosInstance.post('/auth/register', { name, email, password });
        return response.data;
    },
    logout: async () => {
        const response = await axiosInstance.post('/auth/logout');
        return response.data;
    },
    getCurrentUser: async () => {
        try{
        const tokenData = reactLocalStorage.getObject("token")
        if (tokenData?.data){
            const response = await axiosInstance.post('/auth/me');
            if (response?.data){
                return response
            }
        }
        return null
    }catch{
        return null
    }
    }
};

export default clientService;
