
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import apiGroups, { ResponseGroups, } from "@client/api/groups";
import apiNotices, { ResponseNotices, } from "@client/api/notices";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { ReduxStoreState, } from "@client/redux/store";
import { StateGetCsvResponse, } from "@client/redux/state/airbrake/State";
import { stateAirbrakeCreateActionGetCsvResponse, } from "@client/redux/state/airbrake/actionGetCsvResponse";
import { stateAirbrakeCreateActionGetCsvLoading, } from "@client/redux/state/airbrake/actionGetCsvLoading";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionGetCsv extends Redux.Action<ActionTypes> {}

// ----------------------------------------------------------------

// 命令作成
function createActionGetCsv(): ActionGetCsv {
	return {
		type: ActionTypes.middlewareAirbrakeGetCsv,
	};
}

// ----------------------------------------------------------------

// 命令処理
type TypeArgument1 = Redux.Action<ActionTypes>;
type TypeArgument2 = Redux.Dispatch<TypeArgument1>;
type TypeArgument3 = Redux.MiddlewareAPI<Redux.Dispatch, ReduxStoreState>;
export async function middlewareGetCsv(api: TypeArgument3, next: TypeArgument2, action: TypeArgument1): Promise<boolean> {
	if (action.type !== ActionTypes.middlewareAirbrakeGetCsv) { return false; }
	if (api.getState().stateAirbrake.getCsvLoading.isLoading) { return false; }
	if (api.getState().stateAirbrake.getCsvResponse !== null) { return false; }
	next(stateAirbrakeCreateActionGetCsvLoading(true, 0, 0));
	const notices: StateGetCsvResponse = {};

	const projectId: string = api.getState().stateAirbrake.projectId;
	const userKey: string = api.getState().stateAirbrake.userKey;
	const response1: ResponseGroups = await apiGroups({ projectId, userKey, page: "1", limit: "100", });
	console.log("groups", response1);

	for (let i: number = 0; i < response1.value.groups.length; i++) {
		next(stateAirbrakeCreateActionGetCsvLoading(true, i + 1, response1.value.groups.length));
		const groupId: string = response1.value.groups[i].id;
		notices[groupId] = { time: response1.time, value: response1.value.groups[i], list: [], };

		const count: number = response1.value.groups[i].noticeCount;
		const limit: number = 1000;
		let page: number = 1;
		while ((page - 1) * limit < count) {
			let isBreak: boolean = false;

			const response2: ResponseNotices = await apiNotices({ projectId, userKey, groupId, page: `${page}`, limit: `${limit}`, });
			console.log("notices", response2);

			// 1週間分のデータを取得
			const week: number = 1000 * 60 * 60 * 24 * 7;
			const now: number = new Date(response2.time).getTime();
			for (let j: number = 0; j < response2.value.notices.length; j++) {
				const createdAt: number = new Date(response2.value.notices[j].createdAt).getTime();
				if (now - createdAt < week) {
					const groupId: string = response2.value.notices[j].groupId;
					notices[groupId].list.push({ time: response2.time, value: response2.value.notices[j], });
				} else {
					isBreak = true;
				}
				if (isBreak) { break; }
			}
			if (isBreak) { break; }
			page++;
		}
	}

	next(stateAirbrakeCreateActionGetCsvResponse(notices));
	next(stateAirbrakeCreateActionGetCsvLoading(false, 0, 0));
	return true;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const middlewareAirbrakeCreateActionGetCsv = createActionGetCsv;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

