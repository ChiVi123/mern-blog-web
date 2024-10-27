import { http } from '~core';
import { getAxiosError } from '~helper';
import { IPostEntity, PostListDataType } from './entity';

export const createPostRepo = async (data: Record<string, unknown>) => {
    try {
        const res = await http.post<IPostEntity>('/api/post/create', data);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
export const postListRepo = async (params: Record<string, string | number | undefined>) => {
    try {
        const res = await http.get<PostListDataType>('/api/post', { params });
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
export const deletePostRepo = async (postId: string, userId: string) => {
    try {
        const res = await http.delete<string>(`/api/post/delete/${postId}/${userId}`);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
