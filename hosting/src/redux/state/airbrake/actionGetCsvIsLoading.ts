
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
interface ActionGetCsvIsLoading extends Redux.Action<ActionTypes> {
	value: boolean;
}

// ----------------------------------------------------------------

// 命令作成
function createActionGetCsvIsLoading(value: boolean): ActionGetCsvIsLoading {
	return {
		type: ActionTypes.stateAirbrakeGetCsvIsLoading,
		value,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerGetCsvIsLoading(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.stateAirbrakeGetCsvIsLoading) { return state; }
	const myAction: ActionGetCsvIsLoading = action as ActionGetCsvIsLoading;
	const newState: State = Object.assign({}, state);
	newState.getCsvIsLoading = myAction.value;
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const stateAirbrakeCreateActionGetCsvIsLoading = createActionGetCsvIsLoading;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

