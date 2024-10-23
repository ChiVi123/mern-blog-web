import { createSlice } from '@reduxjs/toolkit';

interface IThemeState {
    data: 'light' | 'dark';
}

const initialState: IThemeState = { data: 'light' };
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: (creators) => ({
        toggle: creators.reducer((state) => {
            state.data = state.data === 'light' ? 'dark' : 'light';
        }),
    }),
    selectors: {
        data: (state) => state.data,
    },
});

export const themeActions = themeSlice.actions;
export const themeSelectors = themeSlice.selectors;

export default themeSlice.reducer;
