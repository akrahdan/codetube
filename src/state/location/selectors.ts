import { RootState } from "store";

export const selectLocationType = (state: RootState) => state.location.type;
export const selectLocationPathName = (state: RootState) =>
  state.location.pathname;

export const selectLocationPayload = (state: RootState) =>
  state.location.payload;
