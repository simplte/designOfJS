/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { axiosCanceler } from './cancel';
import { axiosRetry } from './retry';
import { ContentTypeEnum, HttpError, HttpRequestOptions, MethodEnum } from './types';
export class AxiosRequest {
  private axiosInstance: AxiosInstance;
  private options: HttpRequestOptions;

  constructor(options: HttpRequestOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * @description: 拦截器配置
   */
  private setupInterceptors() {
    const transform = this.options?.transform;

    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use(async (config: HttpRequestOptions) => {
      if (transform?.onBeforeRequest) {
        config = await transform?.onBeforeRequest(config);
      }

      const shouldIgnoreCancel = config?.closeCancelToken ?? this.options?.closeCancelToken;

      if (!shouldIgnoreCancel) {
        axiosCanceler.addPending(config);
      }

      return config;
    }, undefined);

    // 响应结果拦截器处理, 数据处理
    this.axiosInstance.interceptors.response.use((res: AxiosResponse) => {
      // 清除重复请求
      res && axiosCanceler.removePending(res.config);

      if (transform?.onSuccessResponse) {
        return transform?.onSuccessResponse(res);
      }

      return res;
    }, undefined);

    // 捕获异常错误，是否尝试重试
    this.axiosInstance.interceptors.response.use(undefined, async (error: HttpError) => {
      return axiosRetry(error).then(() => this.request(error?.config));
    });

    // 响应结果拦截器错误捕获
    this.axiosInstance.interceptors.response.use(undefined, async (error: HttpError) => {
      if (transform?.onErrorResponse) {
        return transform?.onErrorResponse(error);
      }

      return Promise.reject(error);
    });
  }

  /**
   * @description: 请求方法
   */
  request<T = any>(config: HttpRequestOptions): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse>(config)
        .then((res: AxiosResponse) => {
          if (axios.isCancel(res)) return;
          resolve(res as unknown as Promise<T>);
        })
        .catch((error: Error) => reject(error));
    });
  }

  /**
   * @description: GET 请求方法
   */
  get(config: HttpRequestOptions) {
    return this.request({ ...config, method: MethodEnum.GET });
  }

  /**
   * @description: POST 请求方法
   */
  post(config: HttpRequestOptions) {
    return this.request({ ...config, method: MethodEnum.POST });
  }

  /**
   * @description: File Upload 请求方法
   */
  upload(config: HttpRequestOptions) {
    const formData = new FormData();
    const isFormData = (value) => value instanceof FormData;

    if (!isFormData(config.data) && config.data) {
      Object.keys(config.data).forEach((key) => {
        formData.append(key, config.data[key]);
      });
    }

    return this.request({
      ...config,
      data: isFormData(config.data) ? config.data : formData,
      method: MethodEnum.POST,
      headers: { 'Content-type': ContentTypeEnum.FORM_DATA },
    });
  }
}
