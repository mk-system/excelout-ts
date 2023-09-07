import axios, { AxiosResponse } from "axios";
import { Request, FormattedRequest } from "@/types";
import { mapRequest } from "@/utils";

interface Options {
  host: string;
}

const MAX_REQUESTS = 100000;

export const createDocument = async (requests: Request[], options: Options) => {
  const formattedRequests: FormattedRequest[] = requests.map(mapRequest);

  if (formattedRequests.length > MAX_REQUESTS) {
    /* TODO: excelout-ruby に実装されている multiple_step_downloadの実装が必要 */
    console.error(
      `Requests exceeding ${MAX_REQUESTS} are currently not supported`
    );
    throw new Error(`${MAX_REQUESTS} exceeded`);
  }

  const response: AxiosResponse = await (async () => {
    return await axios.post(`${options.host}/download`, {
      file: "server_file_name",
      requests: formattedRequests,
    });
  })();

  return response.data;
}
