// 函数编程定义:使用函数而不是只是使用一种业务逻辑过程，
// 个人理解:抽象出业务逻辑 对应出一个具体输入输出的函数

// 1：函数式编程，遵循函数有输入，即有入参
// 2：... 收集和结构在函数中的不同位置中的区别
// 2.1： 在参数列表中表示参数收集
function test(...rest) {
    console.log(rest);

}
test(1,2,3,4,55)
// 2.2: 函数调用时，表示展开
function test1(x,y,z,...rest) {
    console.log(x,y,z, rest)
}
test1(...[1,2,3,4,5])
// 2.3: 给传入的一个数组前几个值一个对应参数名
function test2([x,y,...rest] = []) {
    console.log(x, y, rest);
}
test2([1,23,4,5,5])
// 3：结构对象参数
function test4({x,y} = {}) {
    console.log(y)
}
test4({y:4})

// 4:函数具有多个返回值时,需要将返回值收集到数组或对象这样的复合值中

// 5: 函数的输出

function sum(list) {
    var total = 0;
    for (let i = 0; i < list.length; i++) {
        // 改变了外层nums[4]的值
        // 'list'保存了'nums'引用的引用副本，而不是[1,3,9，..]数组值的值副本。通常javascript使用数组、对象和函数的引用和引用副本
        // list 指向外层nums的内存
        if (!list[i]) list[i] = 0;

        total = total + list[i];
    }

    return total;
}

var nums = [ 1, 3, 9, 27, , 84 ];

sum( nums );
console.log(nums)

// 6:高阶函数
// 6.1 输出一个函数/将一个函数作为参数
function forEach(list,fn) {
    for (let v of list) {
        fn( v );
    }
}

forEach( [1,2,3,4,5], function each(val){
    console.log( val );
} );
// -----------
function foo() {
    return function inner(msg){
        return msg.toUpperCase();
    };
}

var f = foo();

f( "Hello!" );  
// 6.2 将其他函数当做值得函数 也是高阶函数
function foo() {
    return bar( function inner(msg){
        return msg.toUpperCase();
    } );
}

function bar(func) {
    return func( "Hello!" );
}

foo(); 

// 7: 闭包 当内部函数引用外部函数中的变量时，这称为闭包。
// 'foo（..）'作用域内的'msg'参数变量在内部函数内被引用。
// 当执行“foo（..）”并创建内部函数时，它捕获对“msg”变量的访问，
// 并且即使在“return”之后仍然保留该访问

function foo(msg) {
    var fn = function inner(){
        return msg.toUpperCase();
    };

    return fn;
}

var helloFn = foo( "Hello!" );

helloFn();

// 7.1 如果有一个操作需要两个输入，其中一个现在知道，另一个稍后将被指定，则可以使用闭包记住第一个输入
function makeAdder(x) {
    return function sum(y){
        return x + y;
    };
}

// 我们已经知道“10”和“37”分别作为第一个输入
var addTo10 = makeAdder( 10 );
var addTo37 = makeAdder( 37 );

// 稍后，我们将指定第二个输入
addTo10( 3 );           // 13
addTo10( 90 );          // 100

addTo37( 13 );          // 50

// 7.1.10 由于函数只是JS中的值，我们可以通过闭包来记住函数值
// 函数式编程鼓励我们创建简单的函数来封装这种行为，而不是在代码中到处分发/重复
function formatter(formatFn) {
    return function inner(str){
        return formatFn( str );
    };
}

var lower = formatter( function formatting(v){
    return v.toLowerCase();
} );

var upperFirst = formatter( function formatting(v){
    return v[0].toUpperCase() + v.substr( 1 ).toLowerCase();
} );

lower( "WOW" );             // wow
upperFirst( "hello" );      // Hello
/**
 *
 但是让我们清楚什么是函数。它不仅仅是语句/操作的集合。具体来说，一个函数需要一个或多个输入（理想情况下，只有一个！）和输出。

函数内部的函数可以在外部变量上有闭包，并在以后记住它们。这是所有编程中最重要的概念之一，也是函数式编程的基础。

注意匿名函数，尤其是=>箭头函数。他们写起来很方便，但他们把成本从作者转移到读者身上。我们在这里学习函数式编程的全部原因是为了写更可读的代码，所以不要那么快就跳上这股潮流。

不要使用“this”感知函数。不要这么做。
 */