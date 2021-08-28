import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { head } from "lodash";
import cookie from "react-cookies";
import { RootState } from "store";


export interface LoginRequest {
  email: string;
  password: string;
  csrfmiddlewaretoken: string;
}

export interface UserRequest {
  email: string;
  first_name: string;
  last_name: string;
  csrfmiddlewaretoken: string;
}

export interface Avatar {
  avatar: string;
}

export interface SignupRequest {
  email: string;
  username: string;
  password1: string;
  password2: string;
  csrfmiddlewaretoken: string;
}

export interface Token {
  key: string;
}

export interface Access {
  access_token: string
}

export interface User {
  pk: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
}

export interface Email {
  email: string;
}

export interface UserResponse {
  user: User;
  token: string;
  avatar: string;
}

export interface Logout {
  csrfmiddlewaretoken: string;
}

export interface LogoutResponse {
  detail: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      const csrfToken = cookie.load("csrftoken");

      if (csrfToken) {
        headers.set("X-CSRFToken", csrfToken);
      }
      const token =
        (getState() as RootState).auth.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }

      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  tagTypes: ["LoginRequest", "SignupRequest", "Logout", "User", "UserResponse"],
  endpoints: (build) => ({
    login: build.mutation<UserResponse, Partial<LoginRequest>>({
      query: (body) => ({
        url: "/api/auth/login/",
        method: "POST",
        body,
        responseHandler: (response) => response.json(),
      }),
    }),
    signup: build.mutation<UserResponse, Partial<SignupRequest>>({
      query: (body) => ({
        url: "/api/auth/signup/",
        method: "POST",
        body,
        responseHandler: (response) => response.json(),
      }),
    }),
    logout: build.mutation<LogoutResponse, void>({
      query: (body) => ({
        url: "/api/auth/logout/",
        method: "POST",
        body,
        responseHandler: (response) => response.json(),
      }),
    }),
    facebookLogin: build.mutation<Token, Access>({
      query: (body) => ({
        url: "/api/auth/facebook/",
        method: "POST",
        body,

        responseHandler: (response) => response.json(),
      }),
    }),

    resetPassword: build.mutation<Object, Email>({
      query: (body) => ({
        url: "/api/auth/password_reset/",
        method: "POST",
        body,

        responseHandler: (response) => response.json(),
      }),
    }),

    googleLogin: build.mutation<Token, Access>({
      query: (body) => ({
        url: "/api/auth/google/",
        method: "POST",
        body,

        responseHandler: (response) => response.json(),
      }),
    }),

    googleLoginUrl: build.mutation<User, void>({
      query: () => ({
        url: "/api/auth/google/url",
        method: "POST",

        responseHandler: (response) => response.json(),
      }),
    }),

    facebookLoginUrl: build.mutation<User, void>({
      query: () => ({
        url: "/api/auth/facebook/url",
        method: "POST",

        responseHandler: (response) => response.json(),
      }),
    }),

    getCurrentUser: build.query<User, void>({
      query: () => ({
        url: "rest-auth/user/",
        method: "GET",

        responseHandler: (response) => response.json(),
      }),
    }),
    updateProfile: build.mutation<User, Partial<UserRequest>>({
      query: (body) => ({
        url: "/api/auth/update_profile/",
        method: "PUT",
        body,
        responseHandler: (response) => response.json(),
      }),
    }),

    getProfile: build.query<UserResponse, void>({
      query: () => ({
        url: "/api/auth/profile/",
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),
    updateAvatar: build.mutation<UserResponse, Partial<Avatar>>({
      query: (body) => ({
        url: "/api/auth/update_avatar/",
        method: "PUT",
        body,
        responseHandler: (response) => response.json(),
      }),
    }),
  }),
});

export const { getCurrentUser, getProfile } = authApi.endpoints;

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useFacebookLoginMutation,
  useGoogleLoginMutation,
  useFacebookLoginUrlMutation,
  useGoogleLoginUrlMutation,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useResetPasswordMutation
} = authApi;
