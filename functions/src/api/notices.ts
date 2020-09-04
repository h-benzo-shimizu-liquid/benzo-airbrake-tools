
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import { IncomingMessage, ClientRequest, } from "http";
import * as https from "https";
import * as express from "express";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export interface RequestNotices {
	projectId: string;
	userKey: string;
	groupId: string;
	page: string;
	limit: string;
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> => {
	try {
		const requestBody: RequestNotices = req.body;
		const url: string = `https://api.airbrake.io/api/v4/projects/${requestBody.projectId}/groups/${requestBody.groupId}/notices?key=${requestBody.userKey}&limit=${requestBody.limit}&page=${requestBody.page}`;

		const response: string = await new Promise((resolve: (res: IncomingMessage) => void, reject: (error: Error) => void) => {
			const req: ClientRequest = https.request(url, resolve);
			req.on("error", reject);
			req.end();
		}).then((res: IncomingMessage): Promise<string> => new Promise((resolve: (data: string) => void): void => {
			if (res.statusCode === undefined || res.statusCode >= 400) { throw Error(); }
			let list: string[] = [];
			res.on("data", chunk => list.push(chunk));
			res.on("end", () => resolve(list.join("")));
		}));

		return res.status(200).send(response);
	} catch(error) {
		return next(error);
	}
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

