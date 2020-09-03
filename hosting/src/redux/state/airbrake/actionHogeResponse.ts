
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { State, StateHogeResponse, } from "@client/redux/state/airbrake/State";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionHogeResponse extends Redux.Action<ActionTypes> {
	value: StateHogeResponse | null;
}

// ----------------------------------------------------------------

// 命令作成
function createActionHogeResponse(value: StateHogeResponse | null): ActionHogeResponse {
	return {
		type: ActionTypes.stateAirbrakeHogeResponse,
		value,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerHogeResponse(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.stateAirbrakeHogeResponse) { return state; }
	const myAction: ActionHogeResponse = action as ActionHogeResponse;
	const newState: State = Object.assign({}, state);
	newState.hogeResponse = myAction.value;
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const stateAirbrakeCreateActionHogeResponse = createActionHogeResponse;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

