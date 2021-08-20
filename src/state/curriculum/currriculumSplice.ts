import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { coursesApi, Lecture, Section} from "services/courses";
import { AppThunk, RootState } from "store";
import type { MediaResponse } from "services/courses";
export interface CurriculumState {
  sections: Section[];
  lectures: Lecture[];
  resources: MediaResponse[]
}



export const initialState: CurriculumState = {
  sections: null,
  lectures: null,
  resources: null
};

export const curriculumSplice = createSlice({
  name: "curriculum",
  initialState,
  reducers: {
    // addSection: (state, action: PayloadAction<Section>) => {
    //   state.sections.push(action.payload);
    // },
    // addLecture: (state, action: PayloadAction<Lecture>) => {
    //   state.lectures = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        coursesApi.endpoints.createSection.matchFulfilled,
        (state, { payload }) => {
          state.sections = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.fetchSections.matchFulfilled,
        (state, { payload }) => {
          state.sections = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.fetchLectures.matchFulfilled,
        (state, { payload }) => {
          state.lectures = payload;
          
        }
      )
      .addMatcher(
        coursesApi.endpoints.createLecture.matchFulfilled,
        (state, { payload }) => {
          state.lectures = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.editSection.matchFulfilled,
        (state, { payload }) => {
          const sections = state.sections.map((section) => {
            if (section.id == payload.id) {
              return payload;
            }
            return section;
          });
          state.sections = sections;
        }
      )
      .addMatcher(
        coursesApi.endpoints.editLecture.matchFulfilled,
        (state, { payload }) => {
          const lectures = state.lectures.map((lecture) => {
            if (lecture.id == payload.id) {
              return payload;
            }
            return lecture;
          });
          state.lectures = lectures;
        }
      )
      .addMatcher(
        coursesApi.endpoints.deleteSection.matchFulfilled,
        (state, { payload }) => {
          state.sections = state.sections.filter(
            (section) => section.id != payload.id
          );
        }
      )
      .addMatcher(
        coursesApi.endpoints.deleteLecture.matchFulfilled,
        (state, { payload }) => {
          state.lectures = state.lectures.filter(
            (lecture) => lecture.id != payload.id
          );
        }
      );
  },
});

// export const { addSection, addLecture } = curriculumSplice.actions;

export default curriculumSplice.reducer;
export const selectSections = (state: RootState) => state.curriculum.sections;
export const selectLectures = (state: RootState) => state.curriculum.lectures;
