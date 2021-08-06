import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { coursesApi } from 'services/courses'
import type { InstructorResponse } from 'services/courses'
interface DashboardState {
  currentPath: string,
  profile: InstructorResponse
}


const initialState = { currentPath: '/instructor/courses', profile: null}
export const instructorSlice = createSlice({
    name: 'instructor',
    initialState: initialState as DashboardState,
    reducers: {
       setCurrentPath: (state, action: PayloadAction<string>) => {
           state.currentPath = action.payload
       }
    },
    extraReducers: (builder) => {
        builder
          .addMatcher(
            coursesApi.endpoints.editInstructorInfo.matchFulfilled,
            (state, { payload }) => {
              state.profile = payload;
            }
          ).addMatcher(
            coursesApi.endpoints.fetchInstructorInfo.matchFulfilled,
            (state, { payload }) => {
              state.profile = payload;
            }
          );
          
      },

})

export const { setCurrentPath } = instructorSlice.actions

export default instructorSlice.reducer

export const selectCurrentPath = (state: RootState) => state.instructor.currentPath
export const selectInstructor = ( state: RootState) => state.instructor.profile