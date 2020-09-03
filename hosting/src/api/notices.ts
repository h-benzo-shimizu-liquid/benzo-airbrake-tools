
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import config from "@config/index";
import { RequestNotices, } from "@server/api/notices"
import { IndexedData, getIndexedData, putIndexedData, } from "@client/api/indexedDb"

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export interface Notice {
	id: string;
	groupId: string;
	createdAt: string;
	params: { info: string; };
	errors: { message: string; }[];
	context: {
		messagePattern: string;
		remoteAddr: string;
		remoteCountry: string;
		user: { email: string; };
		userAgent: string;
		version: string;
	};
}

export interface Notices {
	count: number;
	page: number;
	notices: Notice[];
}

export interface ResponseNotices {
	time: string;
	value: Notices;
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default async (request: RequestNotices): Promise<ResponseNotices> => {
	const keyValue: string  = `notices_${request.groupId}_${request.limit}_${request.page}`;
	const indexedData: IndexedData | undefined = await getIndexedData(keyValue);
	const isForceGet: boolean = (Date.now() - new Date(indexedData?.time || 0).getTime() > 1000 * 60 * 60 * 8);
	const time: string = (!isForceGet && indexedData?.time) || new Date().toISOString();
	const value: string = (!isForceGet && indexedData?.value) || await (async (): Promise<string> => {
		// ローカルにデータを保持していなければサーバから取得
		const value: string = await window.fetch(`${config.baseUrl}/notices`, {
			method: "POST",
			headers: { "Content-Type": "application/json", },
			body: JSON.stringify(request),
		}).then((response: Response): Promise<string> => response.text());
		// サーバから受け取ったデータをローカルに保持
		await putIndexedData({ id: keyValue, time, value, });

		return value;
	})();

	return { time, value: JSON.parse(value), };
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

