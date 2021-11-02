# Http

基于 `axios` 库二次封装的请求工具

**特性**

- 继承 `axios` 库所有功能
- 支持请求服务异常 `retry` 重试机制
- 支持重复请求取消 `CancelToken`
- 支持全局拦截和请求数据处理
- 支持是否显示错误信息 `showErrorMessage`，默认为显示

## 代码演示

### 基础用法

```js
import http from '@/utils/http';

enum Api {
  Login = '/login',
  GetUserList = '/getUserList',
  GetUserInfoById = '/getUserInfoById',
}

// http.request，默认是GET方式
export function getUserList(params) {
  return http.request({ url: Api.GetUserList, params });
}

// http.get
export function getUserInfoById(params) {
  return http.get({ url: Api.GetUserInfoById, params });
}

// http.post
export function userLogin(data) {
  return http.post({ url: Api.Login, data });
}

```

### 请求重试

```js
import http from '@/utils/http';

enum Api {
  GetUserInfoById = '/getUserInfoById',
}

export function getUserInfoById(params) {
  return http.get({
    url: Api.GetUserInfoById,
    params,
    retry: 3, // 重试次数
    retryDelay: 2000 // 重试间隔时间
  });
}
```

### 取消重复请求

**是否关闭取消重复请求**

```js
import http from '@/utils/http';

enum Api {
  GetUserInfoById = '/getUserInfoById',
}

export function getUserInfoById(params) {
  return http.get({
    url: Api.GetUserInfoById,
    params,
    closeCancelToken: false // 关闭取消请求，默认是取消重复请求
  });
}

```

**路由改变，是否关闭取消指定的请求**

```js
import http from '@/utils/http';

enum Api {
  GetUserInfoById = '/getUserInfoById',
}

export function getUserInfoById(params) {
  return http.get({
    url: Api.GetUserInfoById,
    params,
    routeChangeCancel: false // 关闭取消请求，默认是取消重复请求（针对路由发生改变使用）
  });
}

```

**取消显示错误信息**

```js
import http from '@/utils/http';

enum Api {
  GetUserInfoById = '/getUserInfoById',
}

export function getUserInfoById(params) {
  return http.get({
    url: Api.GetUserInfoById,
    params,
    showErrorMessage: false
  });
}

```

**取消请求工具函数**

```js
import { canceler } from '@/utils/http';

// 取消所有请求
canceler.removeAllPending();

// 路由改变，关闭取消指定的请求
canceler.removeRouterPending();
```
