/* 
    var createDiv = (function () {
        var instance = null;
        var createDiv = function (name) {
            if (instance) {
                return instance
            }
            console.log(name)
            this.html = name;
            this.init();
            return instance = this
        }
        createDiv.prototype.init = function () {
            var div = document.createElement('div');
            div.innerHTML = this.html;
            document.body.appendChild(div);
        }
        return createDiv;
    })()

    var a = new createDiv('a')
    var b = new createDiv('b')
 */

// -----------------------
// 当前方法里面有连个属性一个  html  一个init方法
/* 
    var CreateDiv = function (html) {
        this.html = html;
        this.init();
    };

    CreateDiv.prototype.init = function () {
        var div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    }; 
*/
// 使用代理类，把管理单例的逻辑放到这里，这是一个自调函数，
// 利用闭包将instance封存在内容中，并且返回一个匿名函数
// 当这个代理类被实例化的时候执行这个匿名函数判断单例类是否被实例化过
// 如果实例化过了就把之前实例化过单例类返回，返回的实际上是 createDiv方法
/* 
    var ProxySingletonCreateDiv = (function () {

        var instance;
        return function (html) {
            if (!instance) {
                instance = new CreateDiv(html);
            }

            return instance;
        }

    })(); 

*/
// 第一次实话会把seven1传到createDiv中
// var a = new ProxySingletonCreateDiv('sven1');
// 第二次实例不会吧seven2传到createDiv中，
// 实际上 b的实例还是a的实例，b里面html，和init（）取到的值和执行的结果同 第一次实例a一样
// var b = new ProxySingletonCreateDiv('sven2');

// a.init() == b.init()
// -------------------------
// 单例的作用

/* 
    但是全局变量存在很多问题，它很容易造成命名空间污染。
    在大中型项目中，如果不加以限 制和管理，程序中可能存在很多这样的变量。
    JavaScript 中的变量也很容易被不小心覆盖，
    相信 每个 JavaScript程序员都曾经历过变量冲突的痛苦，
    就像上面的对象 var a = {};，随时有可能被 别人覆盖 
*/

// 降低全局变量的方法
// 1：使用命名空间
var namespace1 = {
    a: function () {
        alert(1);
    },
    b: function () {
        alert(2);
    }
};
// 2. 使用闭包封装私有变量 
var user = (function () {
    var __name = 'sven',
        __age = 29;

    return {
        getUserInfo: function () {
            return __name + '-' + __age;
        }
    }

})();


// -----------------------------------、

// 5:惰性单例

// 惰性单例指的是在需要的时候才创建对象实例。

// eg
/* 
    var createLoginLayer = (function () {
        var div;
        return function () {
            if (!div) {
                div = document.createElement('div');
                div.innerHTML = '我是登录浮窗';
                div.style.display = 'none';
                document.body.appendChild(div);
            }

            return div;
        }
    })();
    document.getElementById('loginBtn').onclick = function () {
        var loginLayer = createLoginLayer();
        loginLayer.style.display = 'block';
    };
 */


// 6:通用的惰性单例 

// 
// 上面这段代码仍然是违反单一职责原则的， 
// 创建对象和管理单例的逻辑都放在 createLoginLayer 对象内部。
//  如果我们下次需要创建页面中唯一的 iframe， 
// 或者 script 标签， 用来跨域请求数据， 就 必须得如法炮制，
//  把 createLoginLayer 函数几乎照抄一遍如：
/* 
    var createIframe = (function () {
        var iframe;
        return function () {
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
            }
            return iframe;
        }
    })();
 */

// -------------------------------------------
// 通用的单例模式函数
var getSingle = function (fn) {
    var result;

    return function () {
        // arguments 参数为传进来fn函数在被调用时传进来的参数类数组
        return result || (result = fn.apply(this, arguments));
    }
};
// 调用
var createLoginLayer = function () {
    var a = 0;
    return a;
};

var createSingleLoginLayer = getSingle(createLoginLayer);
// 1: createSingleLoginLayer =
//  function () {
//     return result || (result = createLoginLayer.apply(this, arguments));
// }

console.log(createSingleLoginLayer())
//  function () {
//     return result || (result = createLoginLayer.apply(this, arguments));
//     return出去的result = createLoginLayer执行后的结果 就是a
// }()




// 在这个例子中，
// 我们把创建实例对象的职责和管理单例的职责分别放置在两个方法里，
// 这两 个方法可以独立变化而互不影

// 惰性单例技术，在合适的时候才创建对象，并且只创建唯一的一个
// 创建对象和管理单例的职责被分布在两个不同的方法中，这两个方法组合起来才具有单例模 式的威力。 