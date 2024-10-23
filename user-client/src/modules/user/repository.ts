import { http } from '~core';
import { getAxiosError } from '~helper';

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
        return getAxiosError(error);
    }
};

export const signInRepo = async (formData: Omit<IUserForm, 'username'>) => {
    try {
        const res = await http.post('/api/auth/sign-in', formData);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
