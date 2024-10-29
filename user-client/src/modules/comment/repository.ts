import { http } from '~core';
import { getAxiosError } from '~helper';
import { ICommentEntity } from './entity';

export const createCommentRepo = async (data: Record<string, unknown>) => {
    try {
        const res = await http.post<ICommentEntity>('/api/comment/create', data);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
export const listCommentRepo = async (postId: string) => {
    try {
        const res = await http.get<ICommentEntity[]>(`/api/comment/${postId}`);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
export const likeCommentRepo = async (commentId: string) => {
    try {
        const res = await http.put<ICommentEntity>(`/api/comment/like/${commentId}`);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
export const editCommentRepo = async (commentId: string, data: { content: string }) => {
    try {
        const res = await http.put<ICommentEntity>(`/api/comment/edit/${commentId}`, data);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
export const deleteCommentRepo = async (commentId: string) => {
    try {
        const res = await http.delete<string>(`/api/comment/delete/${commentId}`);
        return res.data;
    } catch (error) {
        return getAxiosError(error);
    }
};
