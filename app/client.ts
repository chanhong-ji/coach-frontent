import { GraphQLClient } from "graphql-request";
import configuration from "./common/configuration";

export const createClient = (request: Request) => {
  const headers = new Headers();
  headers.append("Cookie", request.headers.get("Cookie") ?? "");
  const endPoint = configuration.server.endPoint;
  const client = new GraphQLClient(endPoint, {
    credentials: "include",
    mode: "cors",
    headers,
  });
  return { client, headers };
};
