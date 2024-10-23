import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { http } from '~core';

import { IUserEntity } from './entity';

type ParamsType = Omit<IUserEntity, 'username'>;

export const fetchSignIn = createAsyncThunk<IUserEntity, ParamsType, { rejectValue: IRejectValue }>(
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
