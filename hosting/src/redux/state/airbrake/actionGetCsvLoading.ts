
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
	isLoading: boolean;
	current: number;
	total: number;
}

// ----------------------------------------------------------------

// 命令作成
function createActionGetCsvLoading(isLoading: boolean, current: number, total: number): ActionGetCsvLoading {
	return {
		type: ActionTypes.stateAirbrakeGetCsvLoading,
		isLoading,
		current,
		total,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerGetCsvLoading(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.stateAirbrakeGetCsvLoading) { return state; }
	const myAction: ActionGetCsvLoading = action as ActionGetCsvLoading;
	const newState: State = Object.assign({}, state);
	newState.getCsvLoading = Object.assign({}, newState.getCsvLoading);
	newState.getCsvLoading.isLoading = myAction.isLoading;
	newState.getCsvLoading.current = myAction.current;
	newState.getCsvLoading.total = myAction.total;
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const stateAirbrakeCreateActionGetCsvLoading = createActionGetCsvLoading;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

