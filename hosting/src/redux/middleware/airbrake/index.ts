
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { ReduxStoreState, } from "@client/redux/store";
import { middlewareGetCsvGroups, } from "@client/redux/middleware/airbrake/actionGetCsvGroups";
import { middlewareGetCsvNotices, } from "@client/redux/middleware/airbrake/actionGetCsvNotices";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

type TypeArgument1 = Redux.Action<ActionTypes>;
type TypeArgument2 = Redux.Dispatch<TypeArgument1>;
type TypeArgument3 = Redux.MiddlewareAPI<Redux.Dispatch, ReduxStoreState>;
type TypeReturn1 = Promise<void>;
type TypeReturn2 = (action: TypeArgument1) => TypeReturn1;
type TypeReturn3 = (next: TypeArgument2) => TypeReturn2;
export default (api: TypeArgument3): TypeReturn3 => (next: TypeArgument2): TypeReturn2 => async (action: TypeArgument1): TypeReturn1 => {
	if (await middlewareGetCsvGroups(api, next, action)) { return; }
	if (await middlewareGetCsvNotices(api, next, action)) { return; }
	next(action);
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

