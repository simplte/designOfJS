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