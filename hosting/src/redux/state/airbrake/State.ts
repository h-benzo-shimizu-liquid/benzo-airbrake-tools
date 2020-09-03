
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import { Notice, } from "@client/api/notices";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export type StateHogeResponse = {
	[key: string]: {
		time: string;
		value: {
			time: string;
			value: Notice;
		}[];
	};
};

export interface State {
	projectId: string;
	userKey: string;
	hogeLoading: boolean;
	hogeResponse: StateHogeResponse | null;
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

