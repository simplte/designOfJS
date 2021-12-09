// 定义：个人理解是 定义的变量可访问的区域叫做作用域
// 因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar(); // 1

// 思考

var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
console.log(checkscope()) // local scope


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
console.log(checkscope()()) // local scope

// =========因为JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置=========