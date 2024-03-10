import { createSlice } from "@reduxjs/toolkit";
import { FilterType } from "../types/sliceType";

const initialState: FilterType = {
  items: [],
  loading: false,
  error: null,
  search: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searchSkillsRequest(state) {
      console.info(state);

      state.loading = true;
      state.error = null;
    },
    searchSkillsFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    searchSkillsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.items = action.payload;
    },
    changeSearchField(state, action) {
      state.search = action.payload;
    },
  },
});

export const {
  changeSearchField,
  searchSkillsSuccess,
  searchSkillsRequest,
  searchSkillsFailure,
} = filterSlice.actions;
export default filterSlice.reducer;
