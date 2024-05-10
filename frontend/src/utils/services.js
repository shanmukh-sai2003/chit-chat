import api from './api';

export const createUser = async (body) => {
    try {
        const response = await api.post('/users', body);
        return response?.data;
    } catch (error) {
        console.log(error.message);
        if(error?.response) {
            return error?.response?.data;
        }   
    }
}

export const login = async (body) => {
    try {
        const response = await api.post('/users/login', body);
        return response?.data;
    } catch (error) {
        console.log(error.message);
        if(error?.response) {
            return error?.response?.data;
        }
    }
}

export const getAllUsers = async (auth) => {
    try {
        const response = await api.get('/users', { headers: { 'Authorization' : `Bearer ${auth.accessToken}` } });
        return response?.data;
    } catch (error) {
        console.log(error?.response);
        if(error?.response) {
            return error?.response?.data;
        }
    }
} 