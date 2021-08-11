import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";
import { ContainerProgress } from "portal/scenes/Dashboard/ProgressBar";
import type {
  TitleDescription,
  HeaderDescription,
  ProjectEntityResponse,
  ProjectEntityRequest,
  Pricing,
} from "services/projects";
import { projectApi } from "services/projects";
interface submitProps {
  submit: boolean;
  locationPath: string;
}
type ProjectState = {
  project: ProjectEntityResponse | null;
  instructorProject: ProjectEntityRequest | null;
  projects: ProjectEntityResponse[] | null;
  saveProps: submitProps | null;
  pricing: Pricing | null;
  outcomes: TitleDescription[] | null;
  header: HeaderDescription | null;
  included: TitleDescription[] | null;
  syllabuses: TitleDescription[] | null;
};
const initialState = {
  pricing: null,
  project: null,
  projects: null,
  saveProps: {
    submit: false,
    locationPath: null,
  },
};
const projectSplice = createSlice({
  name: "project",
  initialState: initialState as ProjectState,
  reducers: {
    saveProject: (state, action: PayloadAction<submitProps>) => {
      state.saveProps = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        projectApi.endpoints.createProject.matchFulfilled,
        (state, { payload }) => {
          state.project = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.updateProject.matchFulfilled,
        (state, { payload }) => {
          state.project = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.fetchProjects.matchFulfilled,
        (state, { payload }) => {
          state.projects = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.fetchInstructorProjects.matchFulfilled,
        (state, { payload }) => {
          state.projects = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.fetchProject.matchFulfilled,
        (state, { payload }) => {
          state.project = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.createHeading.matchFulfilled,
        (state, { payload }) => {
          state.header = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.createIncluded.matchFulfilled,
        (state, { payload }) => {
          state.included = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.createLearningOutcome.matchFulfilled,
        (state, { payload }) => {
          state.outcomes = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.createSyllabus.matchFulfilled,
        (state, { payload }) => {
          state.syllabuses = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.createIncluded.matchFulfilled,
        (state, { payload }) => {
          state.included = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.fetchIncluded.matchFulfilled,
        (state, { payload }) => {
          state.included = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.fetchOutcomes.matchFulfilled,
        (state, { payload }) => {
          state.outcomes = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.deleteOutcome.matchFulfilled,
        (state, { payload }) => {
          state.outcomes = state.outcomes.filter(
            (out) => out.id !== payload.id
          );
        }
      )
      .addMatcher(
        projectApi.endpoints.fetchSyllabus.matchFulfilled,
        (state, { payload }) => {
          state.syllabuses = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.deleteSyllabus.matchFulfilled,
        (state, { payload }) => {
          state.syllabuses = state.syllabuses.filter(
            (sylla) => sylla.id !== payload.id
          );
        }
      )
      .addMatcher(
        projectApi.endpoints.editIncluded.matchFulfilled,
        (state, { payload }) => {
          const included = state.included.map((included) => {
            if (included.id == payload.id) {
              return payload;
            }
            return included;
          });
          state.included = included;
        }
      )
      .addMatcher(
        projectApi.endpoints.deleteIncluded.matchFulfilled,
        (state, { payload }) => {
          const included = state.included.filter(
            (inc) => inc.id !== payload.id
          );
          state.included = included;
        }
      )
      .addMatcher(
        projectApi.endpoints.editHeading.matchFulfilled,
        (state, { payload }) => {
          state.header = payload;
        }
      )
      .addMatcher(
        projectApi.endpoints.editLearningOutcome.matchFulfilled,
        (state, { payload }) => {
          const outcomes = state.outcomes.map((outcome) => {
            if (outcome.id == payload.id) {
              return payload;
            }
            return outcome;
          });
          state.outcomes = outcomes;
        }
      )
      .addMatcher(
        projectApi.endpoints.editSyllabus.matchFulfilled,
        (state, { payload }) => {
          const syllabuses = state.syllabuses.map((syllabus) => {
            if (syllabus.id == payload.id) {
              return payload;
            }
            return syllabus;
          });
          state.syllabuses = syllabuses;
        }
      );
  },
});

export const { saveProject } = projectSplice.actions;

export default projectSplice.reducer;

export const selectProject = (state: RootState) => state.project.project;
export const selectInstructorProject = (state: RootState) =>
  state.project.project;
export const selectProjects = (state: RootState) => state.project.projects;
export const selectOutcomes = (state: RootState) => state.project.outcomes;
export const selectSyllabuses = (state: RootState) => state.project.syllabuses;
export const selectIncluded = (state: RootState) => state.project.included;
export const selectPricing = (state: RootState) => state.course.pricing;
export const selectSave = (state: RootState) => state.course.saveProps;
