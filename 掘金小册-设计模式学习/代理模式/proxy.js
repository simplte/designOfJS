let bqc = {
    name:'bqc'
}

const bqcProxy = new Proxy(bqc,{
    get:function() {
        return '12'
    }
})
// console.log(bqcProxy.name)

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
console.log(JuejinLovers.name)