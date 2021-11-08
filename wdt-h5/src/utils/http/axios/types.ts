/* eslint-disable */
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpRequestOptions extends AxiosRequestConfig {
  // 拦截处理
  transform?: HttpRequestHooks;
  // 重试次数
  retry?: number;
  // 重试延迟毫秒, 默认值为 100
  retryDelay?: number;
  // 重试次数限制
  retryCount?: number;
  // 关闭取消重复请求限制
  closeCancelToken?: boolean;
  // 路由改变是否取消请求，默认值为 true
  routeChangeCancel?: boolean;
  // 是否显示错误信息
  showErrorMessage?: boolean;
  // 错误消息提示类型
  errorMessageType?: 'warning' | 'error';
  // 错误信息显示时间
  errorMessageTimeout?: number;
}

export interface HttpError extends AxiosError {
  config: HttpRequestOptions;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: any;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}

export enum MethodEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
  X_Requested_With = 'XMLHttpRequest',
}

export type HttpRequestHooks = {
  /**
   * 请求之前时的请求拦截器
   */
  onBeforeRequest?: (
    config: HttpRequestOptions
  ) => HttpRequestOptions | Promise<HttpRequestOptions>;
  /**
   * 请求成功时的响应拦截器
   */
  onSuccessResponse?: (res: AxiosResponse<any>) => Promise<any>;
  /**
   * 请求失败时的响应拦截器
   */
  onErrorResponse?: (error: Error) => void;
};
