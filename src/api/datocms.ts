import { executeQuery as libExecuteQuery, type ExecuteQueryOptions } from "@datocms/cda-client";

export const executeQuery = async (query: string, options?: ExecuteQueryOptions) => {
  return await libExecuteQuery(query, {
    ...options,
    token: import.meta.env.DATOCMS_API_TOKEN,
  });
}
