import { axiosCanceler as canceler } from './axios/cancel';
import { AxiosRequest } from './axios/request';
import { ContentTypeEnum, HttpRequestHooks } from './axios/types';
import { handleError } from './handleError';

async function onBeforeRequest(config) {
  return config;
}

function onSuccessResponse(response) {
  const code = response?.status;

  if ((code >= 200 && code < 300) || code === 304) {
    return Promise.resolve(response?.data);
  }
  return Promise.reject(response);
}

function onErrorResponse(error) {
  return Promise.reject(handleError(error));
}

const transform: HttpRequestHooks = {
  onBeforeRequest,
  onSuccessResponse,
  onErrorResponse,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const Axios = new AxiosRequest({
  timeout: 10 * 1000,
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
    'X-Requested-With': ContentTypeEnum.X_Requested_With,
  },
  transform,
  withCredentials: true,
  showErrorMessage: true,
});

export default Axios;

export { canceler };
