import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { head } from "lodash";
import cookie from "react-cookies";
import { RootState } from "store";

import { User } from "./auth";

export interface MessageThread {
  id: number;
  first: User;
  second: User;
  messages: Message[];
}

export interface ChatUser {
  user: User;
  avatar: string;
}

export interface Message {
  message: string;
  id: number,
  thread: number;
  user: User;
  timestamp: string;
}
export interface MessageRequest {
  message: string;
  username: string;
}
export const messagingApi = createApi({
  reducerPath: "messagingApi",
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
  endpoints: (build) => ({
    createMessage: build.mutation<MessageThread[], MessageRequest>({
      query: ({ username, ...body }) => ({
        url: `api/messages/compose/${username}/`,
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchMessageThreads: build.query<MessageThread[], void>({
      query: () => ({
        url: `api/messages/threads/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),
    fetchUserProfile: build.query<ChatUser, number>({
      query: (id) => ({
        url: `api/messages/user/${id}/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchThreadDetail: build.query<MessageThread, number>({
      query: (id) => ({
        url: `api/messages/threads/${id}/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),
  }),
});

export const { useCreateMessageMutation, useFetchMessageThreadsQuery, useFetchUserProfileQuery, useFetchThreadDetailQuery } =
  messagingApi;
