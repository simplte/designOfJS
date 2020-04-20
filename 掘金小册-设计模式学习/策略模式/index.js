// 典型的if-else 重度患者写法

function askPrice(tag, originPrice) {

    // 处理预热价
    if(tag === 'pre') {
      if(originPrice >= 100) {
        return originPrice - 20
      } 
      return originPrice * 0.9
    }
    // 处理大促价
    if(tag === 'onSale') {
      if(originPrice >= 100) {
        return originPrice - 30
      } 
      return originPrice * 0.8
    }
  
    // 处理返场价
    if(tag === 'back') {
      if(originPrice >= 200) {
        return originPrice - 50
      }
      return originPrice
    }
  
    // 处理尝鲜价
    if(tag === 'fresh') {
       return originPrice * 0.5
    }
    
    // 处理新人价
    if(tag === 'newUser') {
      if(originPrice >= 100) {
        return originPrice - 50
      }
      return originPrice
    }
  }

/* 
  利用单一功能原则  和 开放封闭原则改造
  1:将不同算法逻辑拆分 做到了一个函数只做一件事。现在每个函数都有了自己明确的、单一的分工
  2：使用对象的映射关系 将方法放到对象中
*/
// 1:将不同算法逻辑拆分
// 处理预热价
function prePrice(originPrice) {
    if(originPrice >= 100) {
      return originPrice - 20
    } 
    return originPrice * 0.9
  }
  
  // 处理大促价
  function onSalePrice(originPrice) {
    if(originPrice >= 100) {
      return originPrice - 30
    } 
    return originPrice * 0.8
  }
  
  // 处理返场价
  function backPrice(originPrice) {
    if(originPrice >= 200) {
      return originPrice - 50
    }
    return originPrice
  }
  
  // 处理尝鲜价
  function freshPrice(originPrice) {
    return originPrice * 0.5
  }
  
  function askPrice(tag, originPrice) {
    // 处理预热价
    if(tag === 'pre') {
      return prePrice(originPrice)
    }
    // 处理大促价
    if(tag === 'onSale') {
      return onSalePrice(originPrice)
    }
  
    // 处理返场价
    if(tag === 'back') {
      return backPrice(originPrice)
    }
  
    // 处理尝鲜价
    if(tag === 'fresh') {
       return freshPrice(originPrice)
    }
  }

//   2：使用对象的映射关系

// 定义一个询价处理器对象
const priceProcessor = {
    pre(originPrice) {
      if (originPrice >= 100) {
        return originPrice - 20;
      }
      return originPrice * 0.9;
    },
    onSale(originPrice) {
      if (originPrice >= 100) {
        return originPrice - 30;
      }
      return originPrice * 0.8;
    },
    back(originPrice) {
      if (originPrice >= 200) {
        return originPrice - 50;
      }
      return originPrice;
    },
    fresh(originPrice) {
      return originPrice * 0.5;
    },
  };

//   如果想要其中某个价格时
function askPrice(tag, originPrice) {
    return priceProcessor[tag](originPrice)
  }
// 如果要是想要添加一个新的算法
priceProcessor.newUser = function (originPrice) {
  if (originPrice >= 100) {
    return originPrice - 50;
  }
  return originPrice;
}

// 这样查询每个算法都是单独的方法 实现方法解耦，避免改一处所有都要自测一遍的问题
// 同时添加新方法 也不会对老的代码进行改动 只是在对象中添加了一个新的属性 