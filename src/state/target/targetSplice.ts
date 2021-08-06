import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { coursesApi, Lecture } from "services/courses";
import { AppThunk, RootState } from "store";
import type { Experience, Goal, Requirement } from "services/courses";

export interface TargetState {
  experiences: Experience[];
  goals: Goal[];
  requirements: Requirement[];
}

export const initialState: TargetState = {
  experiences: null,
  goals: null,
  requirements: null,
};

export const targetSplice = createSlice({
  name: "target",
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
        coursesApi.endpoints.createExperience.matchFulfilled,
        (state, { payload }) => {
          state.experiences = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.fetchExperience.matchFulfilled,
        (state, { payload }) => {
          state.experiences = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.createGoal.matchFulfilled,
        (state, { payload }) => {
          state.goals = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.fetchGoals.matchFulfilled,
        (state, { payload }) => {
          state.goals = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.createRequirement.matchFulfilled,
        (state, { payload }) => {
          state.requirements = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.fetchRequirements.matchFulfilled,
        (state, { payload }) => {
          state.requirements = payload;
        }
      )
      .addMatcher(
        coursesApi.endpoints.editExperience.matchFulfilled,
        (state, { payload }) => {
          const experiences = state.experiences.map((experience) => {
            if (experience.id == payload.id) {
              return payload;
            }
            return experience;
          });
          state.experiences = experiences;
        }
      )
      .addMatcher(
        coursesApi.endpoints.editGoal.matchFulfilled,
        (state, { payload }) => {
          const goals = state.goals.map((goal) => {
            if (goal.id == payload.id) {
              return payload;
            }
            return goal;
          });
          state.goals = goals;
        }
      )
      .addMatcher(
        coursesApi.endpoints.editRequirement.matchFulfilled,
        (state, { payload }) => {
          const requirements = state.requirements.map((req) => {
            if (req.id == payload.id) {
              return payload;
            }
            return req;
          });
          state.requirements = requirements;
        }
      )
      .addMatcher(
        coursesApi.endpoints.deleteExperience.matchFulfilled,
        (state, { payload }) => {
          state.experiences = state.experiences.filter(
            (experience) => experience.id != payload.id
          );
        }
      )
      .addMatcher(
        coursesApi.endpoints.deleteGoal.matchFulfilled,
        (state, { payload }) => {
          state.goals = state.goals.filter((goal) => goal.id != payload.id);
        }
      )
      .addMatcher(
        coursesApi.endpoints.deleteRequirement.matchFulfilled,
        (state, { payload }) => {
          state.requirements = state.requirements.filter(
            (req) => req.id != payload.id
          );
        }
      );
  },
});

// export const { addSection, addLecture } = curriculumSplice.actions;

export default targetSplice.reducer;
export const selectExperience = (state: RootState) => state.target.experiences;
export const selectGoals = (state: RootState) => state.target.goals;
export const selectRequirements = (state: RootState) => state.target.requirements;

