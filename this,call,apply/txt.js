// this
// 跟别的语言大相径庭的是，JavaScript的 this 总是指向一个对象，而具体指向哪个对象是在 运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境
var MyClass = function() {
	this.name = 'sven';
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
Function.prototype.bind = function() {
	var self = this, // 保存原函数
		context = [].shift.call(arguments), // 需要绑定的 this 上下文
		args = [].slice.call(arguments); // 剩余的参数转成数组
	return function() {
		// 返回一个新的函数
		console.log(context, args);

		return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
		// 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this
		// 并且组合两次分别传入的参数，作为新函数的参数
	};
};
// --------------
var obj = {
	name: 'sven'
};

var func = function(a, b, c, d) {
	console.log(this.name); // 输出：sven
	console.log([ a, b, c, d ]); // 输出：[ 1, 2, 3, 4 ]
}.bind(obj, 1, 2);

func(3, 4);
// -------------------

var A = function(name) {
	this.name = name;
};

var B = function() {
	A.apply(this, arguments);
};

B.prototype.getName = function() {
	return this.name;
};

var b = new B('sven');
// -------------------
var a = {};
Array.prototype.push.call(a, 'first');

console.log(a.length); // 输出：1
console.log(a[0]); // first

// 节流 函数编写
// 规定时间内只执行一次  关键点是 flag
function throttle(delay, fn) {
	let flag = true;
	let timer = null;
	return function(...arguments) {
		let that = this;
		if (!flag) return;
		flag = false;
		clearTimeout(timer);
		timer = setTimeout(function() {
			fn.apply(that, arguments);
			flag = true;
		}, delay);
	};
}

// debounce
// 多次触发时 计时器清零
function debounce(delay, fn) {
	let timer = null;
	return function(...args) {
		let that = this;
		clearTimeout(timer);
		let timer = setTimeout(function() {
			fn.apply(that, args);
		}, delay);
	};
}

// 柯理化函数
let currying = (fn, ...args) => console.log(args);
fn.length > args.length ? (...arguments) => currying(fn, ...args, ...arguments) : fn(...args);

// let addSum = (a, b, c) => a+b+c
// let add = currying(addSum)
// console.log(add(1)(2)(3))
// console.log(add(1, 2)(3))
// console.log(add(1,2,3))

// ----------------
// 首先apply是Function.prototype上的一个方法
Function.prototype.myCall = function() {
	// 由于目标函数的实参数量是不定的，这里就不写形参了
	// 实际上通过arugments对象，我们能拿到所有实参
	// 第一个参数是绑定的this
	var thisArg = arguments[0];
	// 接着要判断是不是严格模式
	var isStrict = (function() {
		return this === undefined;
	})();
	if (!isStrict) {
		// 如果在非严格模式下，thisArg的值是null或undefined，需要将thisArg置为全局对象
		if (thisArg === null || thisArg === undefined) {
			// 获取全局对象时兼顾浏览器环境和Node环境
			thisArg = (function() {
				return this;
			})();
		} else {
			// 如果是其他原始值，需要通过构造函数包装成对象
			var thisArgType = typeof thisArg;
			if (thisArgType === 'number') {
				thisArg = new Number(thisArg);
			} else if (thisArgType === 'string') {
				thisArg = new String(thisArg);
			} else if (thisArgType === 'boolean') {
				thisArg = new Boolean(thisArg);
			}
		}
	}
	// 截取从索引1开始的剩余参数 [...arguments] 将参数转为数组 取第一个参数
	var invokeParams = [ ...arguments ].slice(1);
	// 接下来要调用目标函数，那么如何获取到目标函数呢？
	// 实际上this就是目标函数，因为myCall是作为一个方法被调用的，this当然指向调用对象，而这个对象就是目标函数
	// 这里做这么一个赋值过程，是为了让语义更清晰一点
	var invokeFunc = this;
	// 此时如果thisArg对象仍然是null或undefined，那么说明是在严格模式下，并且没有指定第一个参数或者第一个参数的值本身就是null或undefined，此时将目标函数当成普通函数执行并返回其结果即可
	if (thisArg === null || thisArg === undefined) {
		return invokeFunc(...invokeParams);
	}
	// 否则，让目标函数成为thisArg对象的成员方法，然后调用它
	// 直观上来看，可以直接把目标函数赋值给对象属性，比如func属性，但是可能func属性本身就存在于thisArg对象上
	// 所以，为了防止覆盖掉thisArg对象的原有属性，必须创建一个唯一的属性名，可以用Symbol实现，如果环境不支持Symbol，可以通过uuid算法来构造一个唯一值。
	var uniquePropName = Symbol(thisArg);
	thisArg[uniquePropName] = invokeFunc;
	// 返回目标函数执行的结果
	return thisArg[uniquePropName](...invokeParams);
};
Function.prototype.myApply = function(thisArg, params) {
	var isStrict = (function() {
		return this === undefined;
	})();
	if (!isStrict) {
		var thisArgType = typeof thisArg;
		if (thisArgType === 'number') {
			thisArg = new Number(thisArg);
		} else if (thisArgType === 'string') {
			thisArg = new String(thisArg);
		} else if (thisArgType === 'boolean') {
			thisArg = new Boolean(thisArg);
		}
	}
	var invokeFunc = this;
	// 处理第二个参数
	var invokeParams = Array.isArray(params) ? params : [];
	if (thisArg === null || thisArg === undefined) {
		return invokeFunc(...invokeParams);
	}
	var uniquePropName = Symbol(thisArg);
	thisArg[uniquePropName] = invokeFunc;
	return thisArg[uniquePropName](...invokeParams);
};
Function.prototype.myBind = function() {
    // 保存要绑定的this
    var boundThis = arguments[0];
    // 获得预置参数
    var boundParams = [].slice.call(arguments, 1);
    // 获得绑定的目标函数
    var boundTargetFunc = this;
    if (typeof boundTargetFunc !== 'function') {
      throw new Error('绑定的目标必须是函数')
    }
    // 返回一个新的函数
    return function() {
      // 获取执行时传入的参数
      var restParams = [].slice.call(arguments);
      // 合并参数
      var allParams = boundParams.concat(restParams)
      // 新函数被执行时，通过执行绑定的目标函数获得结果，并返回结果
      return boundTargetFunc.apply(boundThis, allParams)
    }
  }