var SingletonApple = require("./test");
console.log(SingletonApple)
module.exports = function () {
    let copyApple = SingletonApple.getInstance()
    copyApple.getName()
}
console.log(module.exports)