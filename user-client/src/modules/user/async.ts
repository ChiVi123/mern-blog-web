import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { http } from '~core';

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
            return rejectWithValue(
                error instanceof AxiosError
                    ? error.response?.data
                    : {
                          success: false,
                          statusCode: 500,
                          message: 'Internal Server Error',
                      },
            );
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
            return rejectWithValue(
                error instanceof AxiosError
                    ? error.response?.data
                    : {
                          success: false,
                          statusCode: 500,
                          message: 'Internal Server Error',
                      },
            );
        }
    },
);
