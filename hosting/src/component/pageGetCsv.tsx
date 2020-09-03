
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import { Notice, } from "@client/api/notices";
import { ReduxStoreState, } from "@client/redux/store";
import { StateGetCsvResponse, } from "@client/redux/state/airbrake/State";
import { middlewareAirbrakeCreateActionGetCsv, } from "@client/redux/middleware/airbrake/actionGetCsv";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const Component: React.FunctionComponent<{}> = ({}): JSX.Element => {
	const dispatch: Redux.Dispatch = ReactRedux.useDispatch();

	// ステート設定 ストア値
	const storeValue: StateGetCsvResponse | null = ReactRedux.useSelector((state: ReduxStoreState): StateGetCsvResponse | null => state.stateAirbrake.getCsvResponse);

	// ステート設定 ローカル値
	const [localFlagsShow, setLocalFlagsShow,]: [{ [key: string]: boolean; }, (value: { [key: string]: boolean; }) => void,] = React.useState<{ [key: string]: boolean; }>({});

	React.useEffect((): () => void => {
		dispatch(middlewareAirbrakeCreateActionGetCsv());
		return (): void => {};
	}, []);

	return (
		<div style={{
			position: "absolute",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			overflow: "scroll",
		}}>
			{!storeValue ? (
				<div>loading</div>
			) : Object.keys(storeValue).map((key: string): JSX.Element => (
				<div key={key}>
					<div style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
					}}>
						<button style={{ width: "60px", }} onClick={(): void => {
							setLocalFlagsShow(Object.assign({}, localFlagsShow, { [key]: !localFlagsShow[key], }));
						}}>{localFlagsShow[key] ? "hide" : "show"}</button>
						<button style={{ marginLeft: "20px", }} onClick={(): void => {
							const data: string = [[
								"id",
								"time",
								"info",
								"userToken",
								"userAgent",
							].join(",")].concat(storeValue[key].list.map((notice: {
								time: string;
								value: Notice;
							}): string => [
								`"${notice.value.id}"`,
								`"${notice.value.createdAt}"`,
								`"${notice.value.params.info}"`,
								`"${notice.value.context.user.email}"`,
								`"${notice.value.context.userAgent}"`,
							].join(","))).join("\n");
							const blob: Blob = new Blob([data], { "type": "text/csv", });
							const anchor: HTMLAnchorElement = window.document.createElement("a");
							anchor.download = `${key}.csv`;
							anchor.href = window.URL.createObjectURL(blob);
							anchor.click();
						}}>download csv</button>
						<div style={{ marginLeft: "20px", }}>{storeValue[key].value.id}</div>
						<div style={{ marginLeft: "20px", }}>{storeValue[key].list.length}</div>
						<div style={{ marginLeft: "20px", }}>{storeValue[key].value.errors[0].message}</div>
					</div>
					{localFlagsShow[key] && (<table style={{ minWidth: "2000px", }}><thead><tr>
						<td style={{ width: "240px", }}>id</td>
						<td style={{ width: "240px", }}>time</td>
						<td style={{ width: "600px", }}>info</td>
						<td style={{ width: "240px", }}>userToken</td>
						<td style={{ width: "1080px", }}>userAgent</td>
					</tr></thead><tbody>{storeValue[key].list.slice(0, 30).map((notice: {
						time: string;
						value: Notice;
					}): JSX.Element => (
						<tr key={notice.value.id}>{[
							{ value: notice.value.id },
							{ value: ((date: Date): string => {
								const yy: string = `00${date.getFullYear()}`.slice(-2);
								const MM: string = `00${date.getMonth() + 1}`.slice(-2);
								const dd: string = `00${date.getDate()}`.slice(-2);
								const HH: string = `00${date.getHours()}`.slice(-2);
								const mm: string = `00${date.getMinutes()}`.slice(-2);
								const ss: string = `00${date.getSeconds()}`.slice(-2);
								return `${yy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
							})(new Date(notice.value.createdAt)) },
							{ value: notice.value.params.info },
							{ value: notice.value.context.user.email },
							{ value: notice.value.context.userAgent },
						].map((param: {
							value: string;
						}, index: number): JSX.Element => (
							<td key={`${notice.value.id}_${index}`} style={{
								position: "relative",
								height: "20px",
							}}>
								<div style={{
									position: "absolute",
									left: 0,
									right: 0,
									top: 0,
									bottom: 0,
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}>
									{param.value}
								</div>
							</td>
						))}</tr>
					))}</tbody></table>)}
				</div>
			)).reduce((accumulator: JSX.Element[], currentValue: JSX.Element, index: number): JSX.Element[] => {
				if (index > 0) { accumulator.push(<hr key={`hr-${index}`}></hr>); }
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

