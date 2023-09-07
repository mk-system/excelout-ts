import { Request, FormattedRequest } from "../types";

export const mapRequest = (request: Request): FormattedRequest => {
  const { sheetName, cell } = request;
  const mappedAddress = [`'${sheetName}'`, cell?.toUpperCase()]
    .filter(Boolean)
    .join("!");

  switch (request.type) {
    case "write":
      return {
        write: {
          address: mappedAddress,
          value: request.value,
        },
      };

    case "set_background":
      return {
        set_background: {
          address: mappedAddress,
          color: request.color,
        },
      };

    default:
      throw new Error("Invalid request type");
  }
};
