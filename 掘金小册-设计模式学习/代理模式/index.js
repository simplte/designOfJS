
// 事件代理的实现
// 获取父元素
const father = document.getElementById('father')

// 给父元素安装一次监听函数
father.addEventListener('click', function(e) {
    // 识别是否是目标子元素
    if(e.target.tagName === 'A') {
        // 以下是监听函数的函数体
        e.preventDefault()
        alert(`我是${e.target.innerText}`)
    }
} )

/* 
    1:点击的都是父元素
    2：父元素对事件进行处理和分发，间接的作用于子元素
*/

// 虚拟代理

/* 
    图片预加载
*/
class ImgReload{
    constructor(imgNode) {
        this.imgUrl = "";
        this.ImgNode = imgNode;
    }
    setSrc(targetUrl) {
        this.imgNode.src = this.imgUrl;
        let newImg = new Image();
        newImg.onload = ()=> {
            ImgNode.src = targetUrl;
        }
        newImg.src = targetUrl;
    }
}

// 优化上面的代码 使用单一职责原则
class Img {
    constructor(imgNode) {
        this.imgNode = imgNode;
    }
    setSrc(src) {
        this.imgNode = src
    }
}
class ProxyImg{
    static LoadingUrl = "";
    constructor(target){
         // 目标Image，即Imge实例
        this.target = target;
    }
    setSrc(targetUrl) {
        this.target.setSrc(LoadingUrl);
        let img = new Image();
        img.onload= ()=>{
            this.target.setSrc(targetUrl)
        }
        img.src = targetUrl;
    }
}
// -------------------
// 缓存代理 

/* 
    用空间换时间
 */
// addAll方法会对你传入的所有参数做求和操作
const addAll = function() {
    console.log('进行了一次新计算')
    let result = 0
    const len = arguments.length
    for(let i = 0; i < len; i++) {
        result += arguments[i]
    }
    return result
}

// 为求和方法创建代理

/* 
    tips: 利用闭包将计算过的放入 变量resultCache 存在内存中
         每次请求之前 根据参数key值 判断 内存resultCahce中有没有 有就直接返回 没有才计算
*/
const proxyAddAll = (function(){
    // 求和结果的缓存池
    const resultCache = {}
    return function() {
        // 将入参转化为一个唯一的入参字符串
        const args = Array.prototype.join.call(arguments, ',')
        
        // 检查本次入参是否有对应的计算结果
        if(args in resultCache) {
            // 如果有，则返回缓存池里现成的结果
            return resultCache[args]
        }
        return resultCache[args] = addAll(...arguments)
    }
})()
proxyAddAll(1,2,3,4)

// es6 proxy
// 未知妹子
const girl = {
    // 姓名
    name: '小美',
    // 自我介绍
    aboutMe: '...',
    // 年龄
    age: 24,
    // 职业
    career: 'teacher',
    // 假头像
    fakeAvatar: 'xxxx',
    // 真实头像
    avatar: 'xxxx',
    // 手机号
    phone: 123456,
  }
  // 普通私密信息
const baseInfo = ['age', 'career']
// 最私密信息
const privateInfo = ['avatar', 'phone']

// 用户（同事A）对象实例
const user = {
    isValidated: true,
    isVIP: false,
}

// 掘金婚介所登场了
const JuejinLovers = new Proxy(girl, {
  get: function(girl, key) {
      console.log(2)
      if(baseInfo.indexOf(key)!==-1 && !user.isValidated) {
          console.log('您还没有完成验证哦')
          return
      }
      
      //...(此处省略其它有的没的各种校验逻辑)
    
      // 此处我们认为只有验证过的用户才可以购买VIP
      if(user.isValidated && privateInfo.indexOf(key) && !user.isVIP) {
          console.log(key)
          console.log('只有VIP才可以查看该信息哦')
          return
      }
  }
})
console.log(1111111)
console.log(JuejinLovers)