import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 as uuid } from "uuid";
import { StringChain, stubFalse, without } from "lodash";
import { AppThunk, RootState } from "store";
import { MessageThread, messagingApi } from "services/messaging";


export interface MessagingState {
    threads: MessageThread[]
}

export const initialState: MessagingState = {
    threads: null
}

export const messageSlice = createSlice({
    name: 'messaging',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addMatcher(
            messagingApi.endpoints.createMessage.matchFulfilled,
            (state, { payload}) => {
                state.threads = payload
            }
        )
        builder.addMatcher(
            messagingApi.endpoints.fetchMessageThreads.matchFulfilled,
            (state, { payload}) => {
                state.threads = payload
            }
        )
    }

})

export default messageSlice.reducer;

export const selectedThreads = (state: RootState) => state.messaging?.threads

