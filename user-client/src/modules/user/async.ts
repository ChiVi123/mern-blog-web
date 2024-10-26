import { createAsyncThunk } from '@reduxjs/toolkit';

import { http } from '~core';

import { getAxiosError } from '~helper';
import { IUserEntity } from './entity';

type GetThunkAPIType = { rejectValue: IRejectValue };
type SignInParamsType = Omit<IUserEntity, 'username'>;
type UpdateParamsType = Partial<IUserEntity>;

export const fetchSignIn = createAsyncThunk<IUserEntity, SignInParamsType, GetThunkAPIType>(
    'user/fetchSignIn',
    async (params, { rejectWithValue }) => {
        try {
            const res = await http.post('/api/auth/sign-in', params);
            return res.data;
        } catch (error) {
            return rejectWithValue(getAxiosError(error));
        }
    },
);
export const fetchUpdateUser = createAsyncThunk<IUserEntity, UpdateParamsType, GetThunkAPIType>(
    'user/fetchUpdateUser',
    async (params, { rejectWithValue }) => {
        try {
            const res = await http.put(`/api/user/update/${params._id!}`, params);
            return res.data;
        } catch (error) {
            return rejectWithValue(getAxiosError(error));
        }
    },
);
export const fetchDeleteUser = createAsyncThunk<null, { id: string }, GetThunkAPIType>(
    'user/fetchDeleteUser',
    async ({ id }, { rejectWithValue }) => {
        try {
            const res = await http.delete(`/api/user/delete/${id}`);
            console.log(res.data);
            return null;
        } catch (error) {
            return rejectWithValue(getAxiosError(error));
        }
    },
);
