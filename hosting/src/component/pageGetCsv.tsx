
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import { Link, } from "react-router-dom";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import { Notice, } from "@client/api/notices";
import { ReduxStoreState, } from "@client/redux/store";
import { StateGetCsvResponse, } from "@client/redux/state/airbrake/State";
import { middlewareAirbrakeCreateActionGetCsvGroups, } from "@client/redux/middleware/airbrake/actionGetCsvGroups";
import { middlewareAirbrakeCreateActionGetCsvNotices, } from "@client/redux/middleware/airbrake/actionGetCsvNotices";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const Component: React.FunctionComponent<{}> = ({}): JSX.Element => {
	const dispatch: Redux.Dispatch = ReactRedux.useDispatch();

	// ステート設定 ストア値
	const storeIsLoading: boolean = ReactRedux.useSelector((state: ReduxStoreState): boolean => state.stateAirbrake.getCsvIsLoading);
	const storeResponse: StateGetCsvResponse | null = ReactRedux.useSelector((state: ReduxStoreState): StateGetCsvResponse | null => state.stateAirbrake.getCsvResponse);

	// ステート設定 ローカル値
	const [localFlagsShow, setLocalFlagsShow,]: [{ [key: string]: boolean; }, (value: { [key: string]: boolean; }) => void,] = React.useState<{ [key: string]: boolean; }>({});

	React.useEffect((): () => void => {
		dispatch(middlewareAirbrakeCreateActionGetCsvGroups());
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
			<div>csv取得</div>
			<hr></hr>
			{storeIsLoading || storeResponse === null ? (
				<div>loading</div>
			) : Object.keys(storeResponse).map((key: string): JSX.Element => (
				<div key={key} style={{
					padding: "20px",
					backgroundColor: storeResponse[key].loadingCount > 0 ? "#dddddd" : storeResponse[key].list === null ? "#eeeeee" : "#ffffff",
				}}>
					<div style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
						minWidth: "1200px",
					}}>
						<button style={{ width: "65px", }} onClick={(): void => {
							setLocalFlagsShow(Object.assign({}, localFlagsShow, { [key]: !localFlagsShow[key], }));
						}}>{localFlagsShow[key] ? "▲ hide" : "▼ show"}</button>
						{storeResponse[key].loadingCount > 0 ? (
							<div style={{ width: "100px", marginLeft: "20px", }}>loading {storeResponse[key].loadingCount}</div>
						) : storeResponse[key].list === null ? (
							<button style={{ width: "100px", marginLeft: "20px", }} onClick={(): void => {
								dispatch(middlewareAirbrakeCreateActionGetCsvNotices(key));
							}}>get data</button>
						) : (
							<button style={{ width: "100px", marginLeft: "20px", }} onClick={(): void => {
								const data: string = [[
									"id",
									"time",
									"info",
									"error",
									"userToken",
									"userAgent",
								].join(",")].concat(storeResponse[key].list?.map((notice: {
									time: string;
									value: Notice;
								}): string => [
									`"${notice.value.id}"`,
									`"${notice.value.createdAt}"`,
									`"${notice.value.params?.info || ""}"`,
									`"${notice.value.errors[0].message}"`,
									`"${notice.value.context.user.email}"`,
									`"${notice.value.context.userAgent}"`,
								].join(",")) || []).join("\n");
								const blob: Blob = new Blob([data], { "type": "text/csv", });
								const anchor: HTMLAnchorElement = window.document.createElement("a");
								anchor.download = `${key}.csv`;
								anchor.href = window.URL.createObjectURL(blob);
								anchor.click();
							}}>download csv</button>
						)}
						<div style={{ marginLeft: "20px", width: "220px", }}><a href={`https://liquidinc.airbrake.io/projects/224929/groups/${storeResponse[key].value.id}`}>{storeResponse[key].value.id}</a></div>
						<div style={{ marginLeft: "20px", width: "70px", }}>{storeResponse[key].value.noticeCount}</div>
						<div style={{ marginLeft: "20px", width: "70px", }}>{((value: number | undefined): string => value !== undefined ? `${value}` : "???")(storeResponse[key].list?.length)}</div>
						<div style={{ marginLeft: "20px", width: "400px", }}>{storeResponse[key].value.errors[0].message}</div>
					</div>
					{localFlagsShow[key] && (<table style={{ minWidth: "2000px", }}><thead><tr>
						<td style={{ width: "240px", }}>id</td>
						<td style={{ width: "240px", }}>time</td>
						<td style={{ width: "600px", }}>info</td>
						<td style={{ width: "600px", }}>error</td>
						<td style={{ width: "240px", }}>userToken</td>
						<td style={{ width: "1080px", }}>userAgent</td>
					</tr></thead><tbody>{storeResponse[key].list?.slice(0, 30).map((notice: {
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
							{ value: notice.value.params?.info || "" },
							{ value: notice.value.errors[0].message },
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
									{index > 0 ? param.value : (<a href={`https://liquidinc.airbrake.io/projects/224929/groups/${key}/notices/${param.value}?tab=notice-detail`}>{param.value}</a>)}
								</div>
							</td>
						))}</tr>
					))}</tbody></table>)}
				</div>
			))}
			<hr></hr>
			<Link to="/">top</Link>
		</div>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

