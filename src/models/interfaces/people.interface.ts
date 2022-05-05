import { Response } from "express";

/**
 * Model People
 */
export interface IPeople {
  _id: string;
  ref_people: string;
  appearance: string;
  history: string;
  img: string;
}

interface Json {
  message: string;
  code: number;
  error: boolean;
  results?: IPeople[] | object;
}

type Send<T = Response> = (body?: Json) => T;

export interface CustomResponse extends Response {
  json: Send<this>;
}

/**
 * Paths route
 */
export type TPathsRoute = {
  people: "/api/people";
};
