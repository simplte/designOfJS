// this
// 跟别的语言大相径庭的是，JavaScript的 this 总是指向一个对象，而具体指向哪个对象是在 运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境
var MyClass = function () {
    this.name = 'sven'
    return 'anne'; // 返回 string 类型 
};

var obj = new MyClass();
// console.log(obj.name); // 输出：sven  
// console.log(obj); // 输出：sven  


// bind实现
// Function.prototype.bind = function (context) {
//     var self = this; // 保存原函数     
//     return function () { // 返回一个新的函数   
//         return self.apply(context, arguments); // 执行新的函数的时候，会把之前传入的 context                                                     // 当作新函数体内的 this     
//     }
// };

// var obj = {
//     name: 'sven'
// };

// var func = function () {
//     console.log(this.name); // 输出：sven 
// }.bind(obj);

// func(1, 2);
Function.prototype.bind = function () {
    var self = this, // 保存原函数         
        context = [].shift.call(arguments), // 需要绑定的 this 上下文
        args = [].slice.call(arguments); // 剩余的参数转成数组     
    return function () { // 返回一个新的函数   
        console.log(context, args)

        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
        // 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this             
        // 并且组合两次分别传入的参数，作为新函数的参数         
    }
};
// --------------
var obj = {
    name: 'sven'
};

var func = function (a, b, c, d) {
    console.log(this.name); // 输出：sven     
    console.log([a, b, c, d]) // 输出：[ 1, 2, 3, 4 ] 
}.bind(obj, 1, 2);

func(3, 4);
// -------------------

var A = function (name) {
    this.name = name;
};

var B = function () {
    A.apply(this, arguments);
};

B.prototype.getName = function () {
    return this.name;
};

var b = new B('sven');
// -------------------
var a = {};
Array.prototype.push.call(a, 'first');

console.log(a.length); // 输出：1
console.log(a[0]); // first 