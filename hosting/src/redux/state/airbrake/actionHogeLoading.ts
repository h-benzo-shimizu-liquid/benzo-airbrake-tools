
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
interface ActionHogeLoading extends Redux.Action<ActionTypes> {
	value: boolean;
}

// ----------------------------------------------------------------

// 命令作成
function createActionHogeLoading(value: boolean): ActionHogeLoading {
	return {
		type: ActionTypes.stateAirbrakeHogeLoading,
		value,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerHogeLoading(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.stateAirbrakeHogeLoading) { return state; }
	const myAction: ActionHogeLoading = action as ActionHogeLoading;
	const newState: State = Object.assign({}, state);
	newState.hogeLoading = myAction.value;
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const stateAirbrakeCreateActionHogeLoading = createActionHogeLoading;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

