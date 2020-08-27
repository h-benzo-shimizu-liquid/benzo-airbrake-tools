
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { ReduxStoreState, } from "@client/redux/store";
import { middlewareTest, createActionTest, } from "@client/redux/middleware/template/actionTest";

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
	if (middlewareTest(action)) { return; }
	next(action);
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const middlewareTemplateCreateActionTest = createActionTest;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
