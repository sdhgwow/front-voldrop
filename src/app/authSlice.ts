import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// interface AuthState {
//   token: string | null;
// }

// const initialState: AuthState = {
//   token: null,
// };

const initialToken = Cookies.get('token') || null;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: initialToken,
    },
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            Cookies.set('token', action.payload, { expires: 7 });
        },
        clearToken: (state) => {
            state.token = null;
            Object.keys(Cookies.get()).forEach((cookie) => {
                Cookies.remove(cookie);
            });
            const theme = localStorage.getItem('theme');
            localStorage.clear();
            if (theme) {
                localStorage.setItem('theme', theme);
            }
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;