
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import { Group, } from "@client/api/groups";
import { Notice, } from "@client/api/notices";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export type StateGetCsvLoading = {
	isLoading: boolean;
	current: number;
	total: number;
}

export type StateGetCsvResponse = {
	[key: string]: {
		time: string;
		value: Group;
		list: {
			time: string;
			value: Notice;
		}[];
	};
};

export interface State {
	projectId: string;
	userKey: string;
	getCsvLoading: StateGetCsvLoading;
	getCsvResponse: StateGetCsvResponse | null;
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

