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

var scope = 'global scope';
function checkscope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f();
}
console.log(checkscope()); // local scope

var scope = 'global scope';
function checkscope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f;
}
console.log(checkscope()()); // local scope

// =========因为JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置=========

var scope = 'global scope';
function checkscope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f;
}
checkscope()();

// 上面代码执行上下文栈的情况
/*****
 * 1：创建全局执行上下文，
 *  {
 *    VO: [global],
 *    scope: [globalContext.VO],
 *    this: globalContext.VO
 * }
 * 
 * 并将全局执行上下文放入执行栈
 * 此时执行栈为：
 * ECStack = [
 *    globalContext
 * ] 
 * 2: 创建checkscope函数
 *  2.1：保存checkscope的作用域链到函数的内部（个人理解既是一个保存作用域的属性）scope中
 *    checkscope[scope] = [ globalContext.VO ]
 * 3：执行checkscope函数
 *  
 *  3.1：checkscope函数执行上下文对象初始化
 *       1：复制2.1中创建的scope属性到上下文对象中的Scope属性中
 *         
 *          checkscopeContext(上下文对象) = {
 *            Scope: [ globalContext.VO ]
 *          }
 *       2：创建活动对象(个人理解就是在上下文对象中增加一个AO属性对象,
 *          其内容主要有
 *             2.1 arguments形参,
 *             2.2 函数内其他定义的属性值) ，
 * 
 *          此时checkscope上下文对象为：
 *          checkscopeContext(上下文对象) = {
 *            // 活动对象（AO）内容为：
 *            AO: {
 *              arguemnts: {
 *                length: 0
 *              },
 *              scope： undefined,
 *              f: refernece to function f() {}
 *            },
 *            Scope: [ globalContext.VO ],
 *            this: undefined
 *          }
 *        3：将活动对象AO 放入checkscope作用域链的顶端（也就是上下文对象的Scope属性值的第一个中）
 *          此时checkscope上下文对象为：
 *          checkscopeContext(上下文对象) = {
 *            // 活动对象（AO）内容为：
 *            AO: {
 *              arguemnts: {
 *                length: 0
 *              },
 *              scope： undefined,
 *              f: refernece to function f() {}
 *            },
 *            Scope: [AO, globalContext.VO ],
 *            this: undefined
 *          }     
 *    3.2:   checkscopeContext压入执行栈：
 *        ECStack= [ checkscopeContext, globalContext.VO]
 * 4：checkscope 执行完毕从执行上下文栈中弹出，此时执行上下文为
 *      ECStack= [ globalContext.VO]
 * 
 * 5：执行f函数重复上面步骤，
 *    5.1：得到的f函数的执行上下文为：
 *      fContext(上下文对象) = {
 *            // 活动对象（AO）内容为：
 *            AO: {
 *              arguemnts: {
 *                length: 0
 *              },
 *              f: refernece to function f() {}
 *            },
 *            Scope: [AO,checkscopeContext.AO, globalContext.VO ],
 *            this: undefined
 *          } 
 * 6：执行f时需要访问checkscopeContext的AO，不过正常执行完已经销毁了（(即从执行上下文栈中被弹出），
 *    正常不能被访问到，不过就是被访问到，js就是支持，
 *    checkscope执行完之后从执行栈出栈（销毁），
 *    因为f函数的上下文对象中的Scope属性还对checkscopeContext.OA有引用，所以checkscopeContext.OA还会在内存中
 *    因此能够被访问，这就是闭包产生的原因
 * 
 * 
 * 

 */
