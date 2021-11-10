import axios, { AxiosRequestConfig, Canceler } from 'axios';
import { isFunction } from 'lodash-es';
import qs from 'qs';

import { HttpRequestOptions } from './types';

type PendingValue = [Canceler, boolean | undefined];

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string, PendingValue>();

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&');

/**
 * 请求取消处理
 */
export class AxiosCanceler {
  /**
   * @description: 添加请求
   */
  addPending(config: HttpRequestOptions) {
    this.removePending(config);
    const url = getPendingUrl(config);

    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果 pending 中不存在当前请求，则添加进去
          const isRouteChangeCancel =
            config?.routeChangeCancel === undefined ? true : config?.routeChangeCancel;
          pendingMap.set(url, [cancel, isRouteChangeCancel]);
        }
      });
  }

  /**
   * @description: 清空所有pending
   */
  removeAllPending() {
    pendingMap.forEach(([cancel]) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * @description: 路由改变，清空指定pending
   */
  removeRouterPending() {
    pendingMap.forEach(([cancel, routeChangeCancel]) => {
      if (routeChangeCancel) {
        cancel && isFunction(cancel) && cancel();
      }
    });
    pendingMap.clear();
  }

  /**
   * @description: 移除请求
   */
  removePending(config: HttpRequestOptions) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const [cancel] = pendingMap.get(url) as PendingValue;
      cancel && cancel(config.url);
      pendingMap.delete(url);
    }
  }

  /**
   * @description: 重置
   */
  reset(): void {
    pendingMap = new Map<string, PendingValue>();
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const axiosCanceler = new AxiosCanceler();
