
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import { Notice, } from "@client/api/notices";
import { ReduxStoreState, } from "@client/redux/store";
import { StateHogeResponse, } from "@client/redux/state/airbrake/State";
import { middlewareAirbrakeCreateActionHoge, } from "@client/redux/middleware/airbrake/actionHoge";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const Component: React.FunctionComponent<{}> = ({}): JSX.Element => {
	const dispatch: Redux.Dispatch = ReactRedux.useDispatch();

	// ステート設定 ストア値
	const storeValue: StateHogeResponse | null = ReactRedux.useSelector((state: ReduxStoreState): StateHogeResponse | null => state.stateAirbrake.hogeResponse);

	React.useEffect((): () => void => {
		dispatch(middlewareAirbrakeCreateActionHoge());
		return (): void => {};
	}, []);

	return (
		<div>
			{!storeValue ? (
				<div>loading</div>
			) : Object.keys(storeValue).map((key: string): JSX.Element => (
				<div key={key}>
					<div>{key}</div>
					<table><thead><tr>
						<td>id</td>
					</tr></thead><tbody>{storeValue[key].value.map((notice: {
						time: string;
						value: Notice;
					}): JSX.Element => (
						<tr key={notice.value.id}>
							<td>{notice.value.id}</td>
						</tr>
					))}</tbody></table>
				</div>
			)).reduce((accumulator: JSX.Element[], currentValue: JSX.Element, index: number): JSX.Element[] => {
				if (index > 0) { accumulator.push(<hr key={`${index}`}></hr>); }
				accumulator.push(currentValue);
				return accumulator;
			}, [])}
		</div>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

