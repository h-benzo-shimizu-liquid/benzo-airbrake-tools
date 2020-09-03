
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { State, } from "@client/redux/state/airbrake/State";
import { defaultProjectId, reducerProjectId, } from "@client/redux/state/airbrake/actionProjectId";
import { defaultUserKey, reducerUserKey, } from "@client/redux/state/airbrake/actionUserKey";
import { reducerHogeLoading, } from "@client/redux/state/airbrake/actionHogeLoading";
import { reducerHogeResponse, } from "@client/redux/state/airbrake/actionHogeResponse";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// Redux状態初期値
const initialState: State = {
	projectId: defaultProjectId,
	userKey: defaultUserKey,
	hogeLoading: false,
	hogeResponse: null,
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 状態初期化と処理集積
const reducer: Redux.Reducer<State> = (state: State | undefined, action: Redux.Action<ActionTypes>): State => {
	if (state === undefined) { state = Object.assign({}, initialState); }
	state = reducerProjectId(state, action);
	state = reducerUserKey(state, action);
	state = reducerHogeLoading(state, action);
	state = reducerHogeResponse(state, action);
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

