
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { State, } from "@client/redux/state/airbrake/State";
import { defaultProjectId, reducerProjectId, } from "@client/redux/state/airbrake/actionProjectId";
import { defaultUserKey, reducerUserKey, } from "@client/redux/state/airbrake/actionUserKey";
import { reducerGetCsvLoading, } from "@client/redux/state/airbrake/actionGetCsvLoading";
import { reducerGetCsvResponse, } from "@client/redux/state/airbrake/actionGetCsvResponse";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// Redux状態初期値
const initialState: State = {
	projectId: defaultProjectId,
	userKey: defaultUserKey,
	getCsvLoading: { isLoading: false, total: 0, current: 0, },
	getCsvResponse: null,
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 状態初期化と処理集積
const reducer: Redux.Reducer<State> = (state: State | undefined, action: Redux.Action<ActionTypes>): State => {
	if (state === undefined) { state = Object.assign({}, initialState); }
	state = reducerProjectId(state, action);
	state = reducerUserKey(state, action);
	state = reducerGetCsvLoading(state, action);
	state = reducerGetCsvResponse(state, action);
	return state;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export type StateAirbrake = State;
export const stateAirbrake = reducer;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

