import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ErrorMessages = {
  400: '错误请求!',
  401: '登录失效，请尝试重新登录!',
  403: '暂无该操作权限',
  404: '资源不存在',
  500: '服务异常',
  NetworkError: '网络异常，请检查您的网络连接是否正常!',
  TimeoutError: '请求超时，请刷新页面重试!',
  CancelToken: '请求已取消',
};

export enum ErrorStatus {
  NetworkError = 'NetworkError',
  TimeoutError = 'TimeoutError',
  CancelToken = 'CancelToken',
}

export function handleError(error) {
  const { response, message, code, config } = error || {};
  if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
    error.message = ErrorMessages.TimeoutError;
    error.status = ErrorStatus.TimeoutError;
  }

  if (message === 'Network Error') {
    error.message = ErrorMessages.NetworkError;
    error.status = ErrorStatus.NetworkError;
  }

  if (ErrorMessages[response?.status]) {
    error.message = ErrorMessages[response?.status];
  }

  if (axios.isCancel(error)) {
    console.log('CancelToken: 请求已取消');
    error.message = ErrorMessages.CancelToken;
    error.status = ErrorStatus.CancelToken;
  }

  if (config?.showErrorMessage) {
    console.log({
      message: `${error.status}: ${error.message}`,
      type: error.type || 'error',
      duration: error.timeout,
    });
  }

  return error;
}
