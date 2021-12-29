// window.history
// 方法 back() , forward() , go(pageNum), pushState(stateData, title, url), replaceState(stateData, title, url)
// 属性 length, state
//  事件 window.onpopState 只能监听 back forward go
/********************************
 *
 *
 * back(): 会退到上一个访问记录
 * forward(): 前进到下一个访问记录
 * go(): 跳转到响应的访问记录
 * pushState(): 在history中创建一个新的访问记录，不能跨域，且不造成页面刷新
 * replaceSate(): 修改当前记录，不能跨域，且不造成页面刷新
 *
 *
 * 为什么vuerouter 的history模式需要后端配合配置
 *
 * 因为history模式提供的pushState  和 replaceState 方法都不会造成页面刷新 不会像服务器请求数据
 * 如果用户直接在地址栏中输入二级目录，此时就会造成页面刷新，这是就会想服务器请求二级目录资源，
 * 因为vue是单页面应用，是不会存在二级目录资源的，所以需要后端在用户直接访问类似二级目录的地址时，统一兜底处理
 */
