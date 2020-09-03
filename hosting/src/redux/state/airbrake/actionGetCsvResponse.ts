
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { State, StateGetCsvResponse, } from "@client/redux/state/airbrake/State";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionGetCsvResponse extends Redux.Action<ActionTypes> {
	value: StateGetCsvResponse | null;
}

// ----------------------------------------------------------------

// 命令作成
function createActionGetCsvResponse(value: StateGetCsvResponse | null): ActionGetCsvResponse {
	return {
		type: ActionTypes.stateAirbrakeGetCsvResponse,
		value,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerGetCsvResponse(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.stateAirbrakeGetCsvResponse) { return state; }
	const myAction: ActionGetCsvResponse = action as ActionGetCsvResponse;
	const newState: State = Object.assign({}, state);
	newState.getCsvResponse = myAction.value;
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const stateAirbrakeCreateActionGetCsvResponse = createActionGetCsvResponse;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

