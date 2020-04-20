// var cache = {};

// var mult = function () {
//     console.log(arguments)
//     var args = [].join.call(arguments, ',');
//     console.log(args)
//     console.log(cache[args])
//     console.log(cache)
//     if (cache[args]) {
//         return cache[args];
//     }
//     var a = 1;
//     for (var i = 0, l = arguments.length; i < l; i++) {
//         a = a * arguments[i];
//     }

//     return cache[args] = a;
// };
// console.log(mult(1, 2, 3))
// console.log(mult(1, 2, 3))

// -----------------------------------------

// var mult = (function () {
//     var cache = {};
//     return function () {
//         var args = Array.prototype.join.call(arguments, ',');
//         if (args in cache) {
//             return cache[args];
//         }
//         var a = 1;
//         for (var i = 0, l = arguments.length; i < l; i++) {
//             a = a * arguments[i];
//         }
//         return cache[args] = a;
//     }
// })();
// console.log(mult(1, 2, 3))
// console.log(mult(1, 2, 3))

// -------------------------------------------

var mult = (function() {
	var cache = {};
	var calculate = function() {
		// 封闭 calculate 函数
		var a = 1;
		for (var i = 0, l = arguments.length; i < l; i++) {
			a = a * arguments[i];
		}
		return a;
	};

	return function() {
		var args = Array.prototype.join.call(arguments, ',');
		if (args in cache) {
			return cache[args];
		}
		return (cache[args] = calculate.apply(null, arguments));
	};
})();
var a = [ 1, 2 ];
var b = [].join.call(a, ',');
console.log(b);

// -------------------------

// var report = function (src) {
//     var img = new Image();
//     img.src = src;
// };

// report('http://xxx.com/getUserInfo');

var report = (function() {
	var imgs = [];
	return function(src) {
		var img = {
			src: ''
		};
		img.src = src;
		imgs.push(img);
	};
	return imgs;
})();

for (var i = 0; i++; i <= 7) {
	console.log(report(i));
}

// -------------------------

// 用闭包实现命令模式

// 命令模式的意图是把请求封装为对象，
// 从而分离请求的发起者和请求的接收者（执行者）之 间的耦合关系
/* 
    在面向对象版本的命令模式中，预先植入的命令接收者被当成对象的属性保存起 
    来；
    而在闭包版本的命令模式中，命令接收者会被封闭在闭包形成的环境中，
 */

// 面向对象的方式来编写一段命令模式的代码
// 命令接收者
var Tv = {
	open: function() {
		console.log('打开电视机');
	},
	close: function() {
		console.log('关上电视机');
	}
};

var OpenTvCommand = function(receiver) {
	this.receiver = receiver;
};

OpenTvCommand.prototype.execute = function() {
	this.receiver.open(); // 执行命令，打开电视机
};

OpenTvCommand.prototype.undo = function() {
	this.receiver.close(); // 撤销命令，关闭电视机
};

var setCommand = function(command) {
	document.getElementById('execute').onclick = function() {
		command.execute(); // 输出：打开电视机
	};
	document.getElementById('undo').onclick = function() {
		command.undo(); // 输出：关闭电视机
	};
};

setCommand(new OpenTvCommand(Tv));

// 闭包实现
// 命令接收者
var Tv = {
	open: function() {
		console.log('打开电视机');
	},
	close: function() {
		console.log('关上电视机');
	}
};

var createCommand = function(receiver) {
	var execute = function() {
		return receiver.open(); // 执行命令，打开电视机
	};

	var undo = function() {
		return receiver.close(); // 执行命令，关闭电视机
	};

	return { execute: execute, undo: undo };
};

var setCommand = function(command) {
	document.getElementById('execute').onclick = function() {
		command.execute(); // 输出：打开电视机
	};
	document.getElementById('undo').onclick = function() {
		command.undo(); // 输出：关闭电视机
	};
};

setCommand(createCommand(Tv));
