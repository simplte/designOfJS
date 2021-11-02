import { HttpError } from './types';

/**
 * 请求重试机制
 * @param error HttpError
 * @returns Promise
 */
export function axiosRetry(error: HttpError) {
  const { config } = error;
  // 判断是否设置重试配置
  if (!config?.retry) {
    return Promise.reject(error);
  }

  // 设置重试次数
  config.retryCount = config.retryCount || 0;

  // 检查重试次数是否达到总数
  if (config.retryCount >= config.retry) {
    return Promise.reject(error);
  }

  // 重试次数自增
  config.retryCount += 1;

  // 使用promise函数-延时处理
  const backOff = new Promise((resolve) => {
    setTimeout(() => resolve(config), config.retryDelay || 1000);
  });

  // 重新发起axios请求
  return backOff;
}
