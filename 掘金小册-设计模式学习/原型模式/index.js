// 什么是原型 什么是原型链
/* 
    原型：
    每个构造函数都拥有一个 prototype属性
            prototype指向构造函数的原型对象，
                可以理解成构造函数上有一个属性，这个属性的值是一个对象，
                对象里面有原型对象中的属性和方法
            prototype中有一个constructor属性,这个属性的值又是构造函数
            关系类似于这样
                                            实例有一个__proto__ 属性
                                构造函数实例-----------------------------------------------> __proto__
                                    ^                                                       |
                                    |                                                       |
                                    |                                                       |__proto__的值是构造函数的原型对象
                                    |                                                       |
                                    |                                                       |
                                       构造函数有一个属性               prototype的值
                                 构造函数----------------> prototype -----------------> 构造函数的原型对象 
                                    ^                                                        |
                                    |                                                        |
                                    |                                                        | 原型对象中有一个 construtor 属性
                                    |                                                        |
                                    -------------------------------------------------  construtor 
                                            construtor这个属性的值是构造函数



    每个构造函数的实例都有一个 __proto__ 属性  这个属性的值  指向的是构造函数的原型对象
    实例的__proto__  === 构造函数的.prototype
*/
// 创建一个Dog构造函数
function Dog(name, age) {
  this.name = name
  this.age = age
}

Dog.prototype.eat = function() {
  console.log('肉骨头真好吃')
}
  
// 使用Dog构造函数创建dog实例
const dog = new Dog('旺财', 3)
// 输出"肉骨头真好吃"
dog.eat()

// 输出"[object Object]"
dog.toString()

// 什么是原型链
/* 
    这是因为当我试图访问一个 JavaScript 实例的属性/方法时，
    它首先搜索这个实例本身；当发现实例没有定义对应的属性/方法时，
    它会转而去搜索实例的原型对象；如果原型对象中也搜索不到，
    它就去搜索原型对象的原型对象，这个搜索的轨迹，就叫做原型链。
*/

// 深拷贝
function deepClone(obj) {
    // 如果是 值类型 或 null，则直接return
    if(typeof obj !== 'object' || obj === null) {
        return obj
    }
    
    // 定义结果对象
    let copy = {}
    
    // 如果对象是数组，则定义结果数组
    if(obj.constructor === Array) {
        copy = []
    }
    
    // 遍历对象的key
    for(let key in obj) {
        // 如果key是对象的自有属性
        if(obj.hasOwnProperty(key)) {
            // 递归调用深拷贝方法
            copy[key] = deepClone(obj[key])
        }
    }
    
    return copy
} 