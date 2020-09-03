
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { State, } from "@client/redux/state/airbrake/State";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const key: string = "benzo_airbrake_tools_userKey";

export const defaultUserKey: string = window.localStorage.getItem(key) || "";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionUserKey extends Redux.Action<ActionTypes> {
	value: string;
}

// ----------------------------------------------------------------

// 命令作成
function createActionUserKey(value: string): ActionUserKey {
	return {
		type: ActionTypes.stateAirbrakeUserKey,
		value,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerUserKey(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.stateAirbrakeUserKey) { return state; }
	const myAction: ActionUserKey = action as ActionUserKey;
	const newState: State = Object.assign({}, state);
	newState.userKey = myAction.value;
	window.localStorage.setItem(key, myAction.value);
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const stateAirbrakeCreateActionUserKey = createActionUserKey;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

