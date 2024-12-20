import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchDeleteUser, fetchSignIn, fetchSignOut, fetchUpdateUser } from './async';
import { IUserEntity } from './entity';

interface IUserState extends IReduxState {
    data: IUserEntity | null;
    type: '' | 'fetchSignIn' | 'fetchUpdateUser' | 'fetchDeleteUser' | 'fetchSignOut';
}

const initialState: IUserState = {
    type: '',
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
            state.type = '';
            state.loading = 'idle';
            state.error = undefined;
        }),
        clear: creators.reducer((state) => {
            state.type = '';
            state.data = null;
            state.loading = 'idle';
            state.error = undefined;
        }),
    }),
    extraReducers: (builder) => {
        // fetchSignIn
        builder.addCase(fetchSignIn.pending, (state) => {
            state.type = 'fetchSignIn';
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(fetchSignIn.fulfilled, (state, { payload }) => {
            if (state.loading === 'pending') {
                state.data = payload;
                state.loading = 'fulfilled';
                state.error = undefined;
            }
        });
        builder.addCase(fetchSignIn.rejected, (state, { payload }) => {
            state.loading = 'rejected';
            state.error = payload!.message;
        });

        // fetchUpdateUser
        builder.addCase(fetchUpdateUser.pending, (state) => {
            state.type = 'fetchUpdateUser';
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(fetchUpdateUser.fulfilled, (state, { payload }) => {
            if (state.loading === 'pending') {
                state.data = payload;
                state.loading = 'fulfilled';
                state.error = undefined;
            }
        });
        builder.addCase(fetchUpdateUser.rejected, (state, { payload }) => {
            state.loading = 'rejected';
            state.error = payload!.message;
        });

        // fetchDeleteUser
        builder.addCase(fetchDeleteUser.pending, (state) => {
            state.type = 'fetchDeleteUser';
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(fetchDeleteUser.fulfilled, (state, { payload }) => {
            if (state.loading === 'pending') {
                state.data = payload;
                state.loading = 'fulfilled';
                state.error = undefined;
            }
        });
        builder.addCase(fetchDeleteUser.rejected, (state, { payload }) => {
            state.loading = 'rejected';
            state.error = payload!.message;
        });

        // fetchSignOut
        builder.addCase(fetchSignOut.pending, (state) => {
            state.type = 'fetchSignOut';
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(fetchSignOut.fulfilled, (state, { payload }) => {
            if (state.loading === 'pending') {
                state.data = payload;
                state.loading = 'idle';
                state.error = undefined;
            }
        });
        builder.addCase(fetchSignOut.rejected, (state, { payload }) => {
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
