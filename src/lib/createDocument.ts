import axios, { AxiosResponse } from "axios";
import { Request, FormattedRequest } from "../types";
import { mapRequest } from "../utils";

export type CreateDocumentOptions = {
  host: string;
}

const MAX_REQUESTS = 100000;

export const createDocument = async (filename: string, requests: Request[], options: CreateDocumentOptions) => {
  const formattedRequests: FormattedRequest[] = requests.map(mapRequest);

  if (formattedRequests.length > MAX_REQUESTS) {
    /* TODO: excelout-ruby に実装されている multiple_step_downloadの実装が必要 */
    console.error(
      `Requests exceeding ${MAX_REQUESTS} are currently not supported`
    );
    throw new Error(`${MAX_REQUESTS} exceeded`);
  }

  const response: AxiosResponse<ArrayBuffer> = await (async () => {
    return await axios.post(`${options.host}/download`, {
      file: filename,
      requests: formattedRequests,
    }, {
      responseType: "arraybuffer",
    });
  })();

  return response.data;
}
