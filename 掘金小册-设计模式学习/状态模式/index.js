// 策略模式处理

  class CoffeeMaker {
    constructor() {
      /**
      这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
    **/
      // 初始化状态，没有切换任何咖啡模式
      this.state = 'init';
    }
    stateToProcessor = {
        american() {
          console.log('我只吐黑咖啡');    
        },
        latte() {
          this.american();
          console.log('加点奶');  
        },
        vanillaLatte() {
          this.latte();
          console.log('再加香草糖浆');
        },
        mocha() {
          this.latte();
          console.log('再加巧克力');
        }
      }
    // 关注咖啡机状态切换函数
    changeState(state) {
      // 记录当前状态
      this.state = state;
      // 若状态不存在，则返回
      if(!this.stateToProcessor[state]) {
        return ;
      }
      this.stateToProcessor[state]();
    }
  }
  
  const mk = new CoffeeMaker();
  mk.changeState('latte');

// 策略模式和状态模式确实是相似的，它们都封装行为、都通过委托来实现行为分发
class CoffeeMaker {
    constructor() {
      /**
      这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
    **/
      // 初始化状态，没有切换任何咖啡模式
      this.state = 'init';
      // 初始化牛奶的存储量
      this.leftMilk = '500ml';
    }
    stateToProcessor = {
      that: this,
      american() {
        // 尝试在行为函数里拿到咖啡机实例的信息并输出
        console.log('咖啡机现在的牛奶存储量是:', this.that.leftMilk)
        console.log('我只吐黑咖啡');
      },
      latte() {
        this.american()
        console.log('加点奶');
      },
      vanillaLatte() {
        this.latte();
        console.log('再加香草糖浆');
      },
      mocha() {
        this.latte();
        console.log('再加巧克力');
      }
    }
  
    // 关注咖啡机状态切换函数
    changeState(state) {
      this.state = state;
      if (!this.stateToProcessor[state]) {
        return;
      }
      this.stateToProcessor[state]();
    }
  }
  
  const mk = new CoffeeMaker();
  mk.changeState('latte');

  /* 
    类的 stateToProcessor 对象中的方法拿不到类中的属性值
        这时候就需要在对象中定义一个that属性 将this存储到这个属性中，
            这样stateToProcessor对象中的属性就可以通过that属性拿到类中的属性值了
    
    tips：
    个人理解 策略模式和状态模式的区别
        策略模式中  存储算法的对象  其中的算法各自独立, 不依赖于其他属性  也就是说没有状态的概念
        状态模式中  存储算法的对象 由于某种原因 其中的算法依赖于 类中的某个属性（换句话讲也就是某个状态）
                   这时候就需要将这个状态存入到对象的某个属性中
  
  */