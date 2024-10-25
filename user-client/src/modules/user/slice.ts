import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchSignIn, fetchUpdateUser } from './async';
import { IUserEntity } from './entity';

interface IUserState extends IReduxState {
    data: IUserEntity | null;
}

const initialState: IUserState = {
    data: null,
    loading: 'idle',
    error: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: (creators) => ({
        signInSuccess: creators.reducer((state, { payload }: PayloadAction<IUserEntity>) => {
            state.data = payload;
            state.loading = 'fulfilled';
        }),
        reset: creators.reducer((state) => {
            state.loading = 'idle';
            state.error = undefined;
        }),
        clear: creators.reducer((state) => {
            state.data = null;
            state.loading = 'idle';
            state.error = undefined;
        }),
    }),
    extraReducers: (builder) => {
        // fetchSignIn
        builder.addCase(fetchSignIn.pending, (state) => {
            state.loading = 'pending';
            state.error = undefined;
        });

        builder.addCase(fetchSignIn.fulfilled, (state, { payload }) => {
            if (state.loading === 'pending') {
                state.data = payload;
                state.loading = 'fulfilled';
            }
        });

        builder.addCase(fetchSignIn.rejected, (state, { payload }) => {
            state.data = null;
            state.loading = 'rejected';
            state.error = payload!.message;
        });

        // fetchUpdateUser
        builder.addCase(fetchUpdateUser.pending, (state) => {
            state.loading = 'pending';
            state.error = undefined;
        });

        builder.addCase(fetchUpdateUser.fulfilled, (state, { payload }) => {
            if (state.loading === 'pending') {
                state.data = payload;
                state.loading = 'fulfilled';
            }
        });

        builder.addCase(fetchUpdateUser.rejected, (state, { payload }) => {
            state.loading = 'rejected';
            state.error = payload!.message;
        });
    },
    selectors: {
        allState: (state) => state,
        data: (state) => state.data,
    },
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;

export default userSlice.reducer;
