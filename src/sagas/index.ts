import { debounce, put, retry, spawn, takeLatest } from "redux-saga/effects";
import {
  changeSearchField,
  searchSkillsFailure,
  searchSkillsRequest,
  searchSkillsSuccess,
} from "../reducer/filterSlice";
import { searchSkills } from "../api";
import { ChangeSearchFieldAction, SearchSkillsData, SearchSkillsRequestAction } from "../types/sagaTypes";
import { PayloadAction } from "@reduxjs/toolkit";

function filterChangeSearchAction(action: PayloadAction<string>): boolean {
    console.info("filterChangeSearchAction started");
    const { type, payload } = action;
    return type === changeSearchField.type && payload.trim() !== "";
  }
  

function* handleChangeSearchSaga(action: ChangeSearchFieldAction) {
  console.info("handleChangeSearchSaga started");
  yield put(searchSkillsRequest(action.payload));
}

function* handleSearchSkillsSaga(action: SearchSkillsRequestAction) {
  console.info("handleSearchSkillsSaga started");
 
  try {
    const retryCount = 3;
    const retryDelay = 1 * 1000;
    const data: SearchSkillsData = yield retry(
      retryCount,
      retryDelay,
      searchSkills,
      action.payload
    );
    
    yield put(searchSkillsSuccess(data));
  } catch (e) {
    yield put(searchSkillsFailure(e.message));
  }
}

function* watchChangeSearchSaga() {
  console.info("watchChangeSearchSaga started");
  yield debounce(300, filterChangeSearchAction, handleChangeSearchSaga);
}

function* watchSearchSkillsSaga() {
  console.info("watchSearchSkillsSaga started");
  yield takeLatest(searchSkillsRequest.type, handleSearchSkillsSaga);
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
  console.info("Root saga started");
}
