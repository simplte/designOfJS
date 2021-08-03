// 闭包和对象之间可以相互转换（个人理解：闭包和对象都可以实现我们想要声明一个目标值得目的）
// 闭包和对象实现相同的功能，只是语法形式不同
function createCase(name,age) {
    return function getInfo() {
        age += 1; 
        return `${name},今年${age}岁`
    }
}
console.log(createCase('bqc', 11)())
let creatObj = {
    name: 'bqc', 
    age: 11,
    getInfo() {
        return `${this.name},今年${this.age}岁`
    }
}
console.log(creatObj.getInfo('bqc', 11))

function bibaoTest(name) {
    let xixi = [name];
    return function(age) {
        xixi[0] = age;
        return xixi;
    }
} 
let test = bibaoTest(1)
let test2 = bibaoTest(1)
console.log(test(123),test(345),test(456))
// ... 扩展运算符和Object.assign() 一样也是浅拷贝
let a = {a:{b:123}}
let b ={...a}
b.a.b=333;
console.log(a,b)
// 对象和闭包是同构的，这意味着它们可以在一定程度上互换使用，以表示程序中的状态和行为。

// 表示为闭包有一定的好处，比如粒度更改控制和自动隐私。表示为对象还有其他好处，比如更容易克隆状态