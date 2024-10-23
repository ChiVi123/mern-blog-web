import { http } from '~core';
import { getAxiosError } from '~helper';

interface IUserForm {
    username: string;
    email: string;
    password: string;
}
interface IResolveGoogle {
    name: string;
    email: string;
    googlePhotoUrl: string;
}

export const signupRepo = async (formData: IUserForm) => {
    try {
        const res = await http.post('/api/auth/signup', formData);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};

export const continueWithGoogleRepo = async (data: IResolveGoogle) => {
    try {
        const res = await http.post('/api/auth/google', data);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
