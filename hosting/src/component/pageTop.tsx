
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import { Link, } from "react-router-dom";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import { ReduxStoreState, } from "@client/redux/store";
import { stateAirbrakeCreateActionProjectId, } from "@client/redux/state/airbrake/actionProjectId";
import { stateAirbrakeCreateActionUserKey, } from "@client/redux/state/airbrake/actionUserKey";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const Component: React.FunctionComponent<{}> = ({}): JSX.Element => {
	const dispatch: Redux.Dispatch = ReactRedux.useDispatch();

	// ステート設定 ストア値
	const storeProjectId: string = ReactRedux.useSelector((state: ReduxStoreState): string => state.stateAirbrake.projectId);
	const storeUserKey: string = ReactRedux.useSelector((state: ReduxStoreState): string => state.stateAirbrake.userKey);

	// ステート設定 ローカル値
	const [localProjectId, setLocalProjectId,]: [string, (value: string) => void,] = React.useState<string>(storeProjectId);
	const [localUserKey, setLocalUserKey,]: [string, (value: string) => void,] = React.useState<string>(storeUserKey);

	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			position: "absolute",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
		}}>
			<div style={{
				flexGrow: 1,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}>
				<div>benzo airbrake tools</div>
			</div>
			<table>
				<tbody>
					<tr>
						<td><div>project id</div></td>
						<td><input type="text" value={localProjectId} onChange={(event: React.ChangeEvent<HTMLInputElement>): void => { setLocalProjectId(event.target.value); }}></input></td>
						<td><button onClick={(): void => { dispatch(stateAirbrakeCreateActionProjectId(localProjectId));  }}>設定</button></td>
					</tr>
					<tr>
						<td><div>user key</div></td>
						<td><input type="text" value={localUserKey} onChange={(event: React.ChangeEvent<HTMLInputElement>): void => { setLocalUserKey(event.target.value); }}></input></td>
						<td><button onClick={(): void => { dispatch(stateAirbrakeCreateActionUserKey(localUserKey));  }}>設定</button></td>
					</tr>
				</tbody>
			</table>
			<div style={{
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
				width: "100%",
				height: "100px",
			}}>
				<Link to="/getCsv">getCsv</Link>
				<Link to="/template">template</Link>
			</div>
		</div>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

