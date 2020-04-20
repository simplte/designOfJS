// var SingletonApple = require("./test");
// module.exports = function () {
//     let appleCompany = SingletonApple.getInstance('苹果公司', '乔布斯', ['iPhone', 'iMac', 'iPad', 'iPod']);
// }
var Singleton = function (name) {
    this.name = name;
};

Singleton.prototype.getName = function () {
    console.log(this.name);
};

Singleton.getInstance = (function () {
    var instance = null;
    return function (name) {
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})();
var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');
b.getName()