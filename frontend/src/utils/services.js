import api from './api';

export const createUser = async (body, setError) => {
    try {
        const response = await api.post('/users', body);
        return response?.data;
    } catch (error) {
        console.log(error.message);
        if(error?.response) {
            setError(error.response.data.message);
        }
        return error?.response?.data;
    }
}