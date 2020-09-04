
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
interface ActionGetCsvResponseGroups extends Redux.Action<ActionTypes> {
	value: StateGetCsvResponse;
}

// ----------------------------------------------------------------

// 命令作成
function createActionGetCsvResponseGroups(value: StateGetCsvResponse): ActionGetCsvResponseGroups {
	return {
		type: ActionTypes.stateAirbrakeGetCsvResponseGroups,
		value,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerGetCsvResponseGroups(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.stateAirbrakeGetCsvResponseGroups) { return state; }
	const myAction: ActionGetCsvResponseGroups = action as ActionGetCsvResponseGroups;
	const newState: State = Object.assign({}, state);
	newState.getCsvResponse = Object.assign({}, myAction.value);
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const stateAirbrakeCreateActionGetCsvResponseGroups = createActionGetCsvResponseGroups;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

