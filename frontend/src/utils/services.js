import api from './api';
import { apiPrivate } from './api';

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
        const response = await apiPrivate.get('/users', { headers: { 'Authorization' : `Bearer ${auth.accessToken}` } });
        return response?.data;
    } catch (error) {
        console.log(error.message);
        if(error?.response) {
            return error?.response?.data;
        }
    }
} 

export const getAllChats = async (auth) => {
    try {
        const response = await apiPrivate.get('/chats', { headers: { "Authorization": `Bearer ${auth.accessToken}` } });
        return response?.data;
    } catch (error) {
        console.log(error.message);
        if(error?.response) {
            return error?.response?.data;
        }
    }
}

export const getChatMessages = async (auth, chatId) => {
    try {
        const response = await apiPrivate.get(`/messages/${chatId}`, { headers: { 'Authorization': `Bearer ${auth.accessToken}` } });
        return response?.data;
    } catch (error) {
        console.log(error.message);
        if(error?.response) {
            return error?.response?.data;
        }
    }
}

export const sendMessage = async (auth, chatId, body) => {
    try {
        const response = await apiPrivate.post(`/messages/${chatId}`, body, { headers: { 'Authorization': `Bearer ${auth.accessToken}` } });
        return response?.data;
    } catch (error) {
        console.log(error.message);
        if(error?.response) {
            return error?.response?.data;
        }
    }
}

export const refreshToken = async () => {
    try {
        const response = await api.get('/users/refresh');
        return response?.data;
    } catch (error) {
        console.log(error.message);
        if(error?.response) {
            return error?.response?.data;
        }
    }
}

export const userLogout = async () => {
    try {
        const response = await api.delete('/users/logout');
        return response?.data;
    } catch (error) {
        console.log(error.message);
        if(error?.response) {
            return error?.response?.data;
        }
    }
}

export const createChat = async (auth, receiverId) => {
    try {
        const response = await apiPrivate.post(`/chats/${receiverId}`, {}, { headers: { "Authorization": `Bearer ${auth?.accessToken}` } });
        return response?.data;
    } catch (error) {
        console.log(error.message);
        if(error?.response) {
            return error?.response?.data;
        }
    }
}

export const createGroup = async (auth, body) => {
    try {
        const response = await apiPrivate.post('/chats/groups', body, { headers: { "Authorization": `Bearer ${auth?.accessToken}`} });
        return response?.data;
    } catch (error) {
        console.log(error.message)
        if(error?.response) {
            return error?.response?.data;
        }
    }
}