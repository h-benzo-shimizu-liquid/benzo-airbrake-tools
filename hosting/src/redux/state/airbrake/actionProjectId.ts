
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { State, } from "@client/redux/state/airbrake/State";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const key: string = "benzo_airbrake_tools_projectId";

export const defaultProjectId: string = window.localStorage.getItem(key) || "";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionProjectId extends Redux.Action<ActionTypes> {
	value: string;
}

// ----------------------------------------------------------------

// 命令作成
function createActionProjectId(value: string): ActionProjectId {
	return {
		type: ActionTypes.stateAirbrakeProjectId,
		value,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerProjectId(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.stateAirbrakeProjectId) { return state; }
	const myAction: ActionProjectId = action as ActionProjectId;
	const newState: State = Object.assign({}, state);
	newState.projectId = myAction.value;
	window.localStorage.setItem(key, myAction.value);
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const stateAirbrakeCreateActionProjectId = createActionProjectId;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

