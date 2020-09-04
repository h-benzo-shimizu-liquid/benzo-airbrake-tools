
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { State, StateGetCsvResponseGroup, } from "@client/redux/state/airbrake/State";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionGetCsvResponseNotices extends Redux.Action<ActionTypes> {
	key: string;
	value: StateGetCsvResponseGroup;
}

// ----------------------------------------------------------------

// 命令作成
function createActionGetCsvResponseNotices(key: string, value: StateGetCsvResponseGroup): ActionGetCsvResponseNotices {
	return {
		type: ActionTypes.stateAirbrakeGetCsvResponseNotices,
		key,
		value,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerGetCsvResponseNotices(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.stateAirbrakeGetCsvResponseNotices) { return state; }
	const myAction: ActionGetCsvResponseNotices = action as ActionGetCsvResponseNotices;
	const newState: State = Object.assign({}, state);
	newState.getCsvResponse = Object.assign({}, newState.getCsvResponse, { [myAction.key]: Object.assign({}, myAction.value), });	
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const stateAirbrakeCreateActionGetCsvResponseNotices = createActionGetCsvResponseNotices;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

