var SingletonApple = require("./test");
console.log(SingletonApple)
module.exports = function () {
    let copyApple = SingletonApple.getInstance()
    copyApple.setName('苹果公司3')
}
console.log(module.exports)