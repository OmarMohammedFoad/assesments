import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
export interface IUser {
  id: number;
  name: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}
interface AuthState {
  user: IUser | null | string;
  token: string | null;
  loading: boolean;
  error: string | null;
}



const initialState: AuthState = {
  user: localStorage.getItem('user') || null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

const API_URL = `${import.meta.env.VITE_EXAMPLE_API_KEY}/api/auth`;

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post<ILoginResponse>(`${API_URL}/login`);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem('user', res.data.user.name);
      return res.data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", action.payload.name);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Login failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
