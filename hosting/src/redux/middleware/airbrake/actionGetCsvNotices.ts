
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import apiNotices, { ResponseNotices, } from "@client/api/notices";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { ReduxStoreState, } from "@client/redux/store";
import { StateGetCsvResponse, StateGetCsvResponseGroup, StateGetCsvResponseNotice, } from "@client/redux/state/airbrake/State";
import { stateAirbrakeCreateActionGetCsvResponseNotices, } from "@client/redux/state/airbrake/actionGetCsvResponseNotices";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionGetCsvNotices extends Redux.Action<ActionTypes> {
	value: string;
}

// ----------------------------------------------------------------

// 命令作成
function createActionGetCsvNotices(value: string): ActionGetCsvNotices {
	return {
		type: ActionTypes.middlewareAirbrakeGetCsvNotices,
		value: value,
	};
}

// ----------------------------------------------------------------

// 命令処理
type TypeArgument1 = Redux.Action<ActionTypes>;
type TypeArgument2 = Redux.Dispatch<TypeArgument1>;
type TypeArgument3 = Redux.MiddlewareAPI<Redux.Dispatch, ReduxStoreState>;
export async function middlewareGetCsvNotices(api: TypeArgument3, next: TypeArgument2, action: TypeArgument1): Promise<boolean> {
	if (action.type !== ActionTypes.middlewareAirbrakeGetCsvNotices) { return false; }
	const myAction: ActionGetCsvNotices = action as ActionGetCsvNotices;
	const groupId: string = myAction.value;
	const groups: StateGetCsvResponse | null = api.getState().stateAirbrake.getCsvResponse;
	if (groups === null) { return false; }
	const group: StateGetCsvResponseGroup = groups[groupId];
	if (group.loadingCount > 0) { return false; }
	if (group.list !== null) { return false; }

	group.loadingCount = 1;
	next(stateAirbrakeCreateActionGetCsvResponseNotices(groupId, group));

	const notices: StateGetCsvResponseNotice[] = [];
	const count: number = group.value.noticeCount;
	const limit: number = 1000;
	let page: number = 1;
	while ((page - 1) * limit < count) {
		let isBreak: boolean = false;

		const projectId: string = api.getState().stateAirbrake.projectId;
		const userKey: string = api.getState().stateAirbrake.userKey;
		const response2: ResponseNotices = await apiNotices({ projectId, userKey, groupId, page: `${page}`, limit: `${limit}`, });
		console.log("notices", response2);

		// 1週間分のデータを取得
		const week: number = 1000 * 60 * 60 * 24 * 7;
		const now: number = new Date(response2.time).getTime();
		for (let i: number = 0; i < response2.value.notices.length; i++) {
			const createdAt: number = new Date(response2.value.notices[i].createdAt).getTime();
			if (now - createdAt < week) {
				notices.push({ time: response2.time, value: response2.value.notices[i], });
			} else {
				isBreak = true;
			}
			if (isBreak) { break; }
		}
		if (isBreak) { break; }

		group.loadingCount++;
		next(stateAirbrakeCreateActionGetCsvResponseNotices(groupId, group));

		page++;
	}

	group.loadingCount = 0;
	group.list = notices;
	next(stateAirbrakeCreateActionGetCsvResponseNotices(groupId, group));

	return true;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const middlewareAirbrakeCreateActionGetCsvNotices = createActionGetCsvNotices;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

