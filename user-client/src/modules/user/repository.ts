import { http } from '~core';
import { getAxiosError } from '~helper';
import { IUserEntity, IUserListData } from './entity';

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
export const allUserRepo = async (params: Record<string, string | number | undefined | null>) => {
    try {
        const res = await http.get<IUserListData>('/api/user', { params });
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
export const deleteUserRepo = async (id: string) => {
    try {
        const res = await http.delete<string>(`/api/user/delete/${id}`);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
export const userInfo = async (id: string) => {
    try {
        const res = await http.get<IUserEntity>(`/api/user/${id}`);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
