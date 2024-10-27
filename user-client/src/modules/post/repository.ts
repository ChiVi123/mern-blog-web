import { http } from '~core';
import { getAxiosError } from '~helper';
import { IPostEntity } from './entity';

export const createPostRepo = async (data: Record<string, unknown>) => {
    try {
        const res = await http.post<IPostEntity>('/api/post/create', data);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
