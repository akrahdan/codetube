import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSubmitKey } from "components/Forms/RegistrationForm/dist/types";
import type { User } from "services/auth";
import type { RootState } from "store";
import {
  CoursePlayerResponse,
  CourseResponse,
  coursesApi,
  MediaResponse,
  Pricing,
  VideoAnalytics,
  ViewsResponse,
} from "services/courses";

interface submitProps {
  submit: boolean;
  locationPath: string;
}
type CourseState = {
  course: CourseResponse | null;
  views: ViewsResponse[] | null,
  courses: CoursePlayerResponse[] | [];
  analytics: VideoAnalytics[] | [];
  resources: MediaResponse[] | [];
  saveProps: submitProps | null;
  pricing: Pricing | null;
};
const initialState = {
  course: null,
  pricing: null,
  saveProps: {
    submit: false,
    locationPath: null,
  },
};
const courseSlice = createSlice({
  name: "course",
  initialState: initialState as CourseState,
  reducers: {
    saveCourse: (state, action: PayloadAction<submitProps>) => {
      state.saveProps = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        coursesApi.endpoints.createCourse.matchFulfilled,
        (state, { payload }) => {
          state.course = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.fetchCourse.matchFulfilled,
        (state, { payload }) => {
          state.course = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.trackViews.matchFulfilled,
        (state, { payload }) => {
          state.views = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.fetchViews.matchFulfilled,
        (state, { payload }) => {
          state.views = payload;
        }
      ).addMatcher(
        coursesApi.endpoints.fetchCourseViews.matchFulfilled,
        (state, { payload }) => {
          state.analytics = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.fetchVideoViews.matchFulfilled,
        (state, { payload }) => {
          state.analytics = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.updateVideoViews.matchFulfilled,
        (state, { payload }) => {
          const analytics = state.analytics?.map((view: VideoAnalytics) => {
            if(payload.lecture === view.lecture) {
              return payload

            }
            return view;
          })
         state.analytics = analytics;
        }
      )
      .addMatcher(
        coursesApi.endpoints.updateCourse.matchFulfilled,
        (state, { payload }) => {
          state.course = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.fetchResources.matchFulfilled,
        (state, { payload }) => {
          state.resources = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.fetchPricing.matchFulfilled,
        (state, { payload }) => {
          state.pricing = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.updatePricing.matchFulfilled,
        (state, { payload }) => {
          state.pricing = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.createResource.matchFulfilled,
        (state, { payload }) => {
          state.resources = payload;
        }
      ).addMatcher(
        coursesApi.endpoints.fetchInstructorCourses.matchFulfilled,
        (state, { payload }) => {
          state.courses = payload;
        }
      );
  },
});

export const { saveCourse } = courseSlice.actions;

export default courseSlice.reducer;

export const selectCourse = (state: RootState) => state.course.course;
export const selectCourses = (state: RootState) => state.course.courses;
export const selectResources = (state: RootState) => state.course.resources;
export const selectPricing = (state: RootState) => state.course.pricing;
export const selectSave = (state: RootState) => state.course.saveProps;
export const selectViews = (state: RootState) => state.course.views;
export const selectAnalytics = (state: RootState) => state.course.analytics;
