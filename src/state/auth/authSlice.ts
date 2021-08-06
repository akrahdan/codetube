import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSubmitKey } from "components/Forms/RegistrationForm/dist/types";
import type { User } from "services/auth";
import type { RootState } from "store";
import { authApi } from "services/auth";

type AuthState = {
  user: User | null;
  avatar: string | null;
  token: string | null;
};
const initialState = { user: null, token: null };
const authSlice = createSlice({
  name: "auth",
  initialState: initialState as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.logout.matchFulfilled,
        (state, { payload }) => {
          state.user = null;
          state.token = null;
        }
      )
      .addMatcher(
        authApi.endpoints.signup.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
        }
      ).addMatcher(
        authApi.endpoints.updateAvatar.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.avatar = payload.avatar;
        }
      ).addMatcher(
        authApi.endpoints.updateProfile.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
        }
      ).addMatcher(
        authApi.endpoints.getProfile.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.avatar = payload.avatar
        }
      );
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAvatar = (state: RootState) => state.auth.avatar
