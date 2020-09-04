
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import config from "@config/index";
import { RequestGroups, } from "@server/api/groups"
import { IndexedData, getIndexedData, putIndexedData, } from "@client/api/indexedDb"

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export interface Group {
	id: string;
	projectId: number;
	createdAt: string;
	noticeCount: number;
	noticeTotalCount: number;
	resolved: boolean;
	muted: boolean;
	errors: { message: string; }[];
}

export interface Groups {
	count: number;
	page: number;
	resolvedCount: number;
	unresolvedCount: number;
	groups: Group[];
}

export interface ResponseGroups {
	time: string;
	value: Groups;
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default async (request: RequestGroups): Promise<ResponseGroups> => {
	const keyValue: string  = `groups_${request.limit}_${request.page}`;
	const indexedData: IndexedData | undefined = await getIndexedData(keyValue);
	const isForceGet: boolean = (Date.now() - new Date(indexedData?.time || 0).getTime() > 1000 * 60 * 60 * 8);
	const time: string = (!isForceGet && indexedData?.time) || new Date().toISOString();
	const value: string = (!isForceGet && indexedData?.value) || await (async (): Promise<string> => {
		// ローカルにデータを保持していなければサーバから取得
		const response: Response = await window.fetch(`${config.baseUrl}/groups`, {
			method: "POST",
			headers: { "Content-Type": "application/json", },
			body: JSON.stringify(request),
		});
		if (response.status >= 400) { throw new Error(); }
		const value: string = await response.text();
		// サーバから受け取ったデータをローカルに保持
		await putIndexedData({ id: keyValue, time, value, });

		return value;
	})();

	return { time, value: JSON.parse(value), };
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

