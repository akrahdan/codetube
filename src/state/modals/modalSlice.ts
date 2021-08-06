import { createAsyncThunk, createSlice, PayloadAction 
} from "@reduxjs/toolkit";
import { v1 as uuid } from "uuid";
import { without } from 'lodash';
import { AppThunk, RootState } from "store";

export interface ModalState { 
    id: string
}

export const initialState: ModalState = {
    id: null
}
export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, action: PayloadAction<string>) => {
          
            state.id = action.payload 
        },
        hideCurrentModal: (state) => {
        
         state.id = null
        },

        hideModal: (state, action: PayloadAction<string>) => {
         
          state.id = action.payload
        }

    }
});

export const selectModal = (state: RootState) => state.modal.id


export const  { showModal, hideCurrentModal, hideModal } = modalSlice.actions

export const signupModal = (id: string): AppThunk => (
    dispatch,
    getState
) => {
    
    dispatch(showModal(id))
}

export default modalSlice.reducer;

