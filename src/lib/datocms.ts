import { executeQuery as libExecuteQuery, type ExecuteQueryOptions, type TypedDocumentNode } from "@datocms/cda-client";

export async function executeQuery(query: string, options?: ExecuteQueryOptions) {
  return await libExecuteQuery(query, {
    ...options,
    token: import.meta.env.DATOCMS_API_TOKEN,
  });
}
