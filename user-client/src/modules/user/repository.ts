import { AxiosError } from 'axios';
import { http } from '~core';

interface IUserForm {
    username: string;
    email: string;
    password: string;
}

export const signupRepo = async (formData: IUserForm) => {
    try {
        const res = await http.post('/api/auth/signup', formData);
        return res.data;
    } catch (error) {
        return error instanceof AxiosError ? error.response?.data : error;
    }
};
