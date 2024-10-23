import { createSlice } from '@reduxjs/toolkit';

import { fetchSignIn } from './async';
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
        clear: creators.reducer((state) => {
            state.data = null;
            state.loading = 'idle';
            state.error = undefined;
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(fetchSignIn.pending, (state) => {
            state.data = null;
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
    },
    selectors: {
        allState: (state) => state,
    },
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;

export default userSlice.reducer;
