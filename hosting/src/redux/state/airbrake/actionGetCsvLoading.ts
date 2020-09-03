
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { State, } from "@client/redux/state/airbrake/State";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionGetCsvLoading extends Redux.Action<ActionTypes> {
	value: boolean;
}

// ----------------------------------------------------------------

// 命令作成
function createActionGetCsvLoading(value: boolean): ActionGetCsvLoading {
	return {
		type: ActionTypes.stateAirbrakeGetCsvLoading,
		value,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerGetCsvLoading(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.stateAirbrakeGetCsvLoading) { return state; }
	const myAction: ActionGetCsvLoading = action as ActionGetCsvLoading;
	const newState: State = Object.assign({}, state);
	newState.getCsvLoading = myAction.value;
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const stateAirbrakeCreateActionGetCsvLoading = createActionGetCsvLoading;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

