import { ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";

export type AppRouterResAndReqType = {
  req: Request;
  res: Response;
};

export type SSRResAndReqType = {
  req: NextApiRequest;
  res: NextApiResponse | ServerResponse;
};

export type Token = {
  accessToken: string;
};

export interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  accessToken?: string;
}
