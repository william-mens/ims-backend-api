import { configuration } from '../helpers/responseStatus';

const config = new configuration();

export const prepareResponse = (
    responseType: string | number,
    responseBody: any = {},
    platform: string = "lambda",
    customMessage?: string,
    customHttpCode?: number
  ) => {
    const defaultResponse = config.responseVariables[responseType] ?? {};
  
    const body = {
      statusCode: defaultResponse.responseCode ?? 500,
      statusMessage: customMessage || defaultResponse.responseMessage || "Unknown error",
      data: responseBody,
    };
  

  
    console.log("Returning response", body);
    return body;
  };
  