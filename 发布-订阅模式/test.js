// var salesOffices = {}; // 定义售楼处

// salesOffices.clientList = []; // 缓存列表，存放订阅者的回调函数

// salesOffices.listen = function (fn) { // 增加订阅者
//     this.clientList.push(fn); // 订阅的消息添加进缓存列表
// };

// salesOffices.trigger = function () { // 发布消息
//     for (var i = 0, fn; fn = this.clientList[i++];) {
//         fn.apply(this, arguments); // (2) // arguments 是发布消息时带上的参数
//     }
// };
// salesOffices.listen(function (price, squareMeter) { // 小明订阅消息
//     console.log('小明：价格= ' + price);
//     console.log('squareMeter= ' + squareMeter);
// });

// salesOffices.listen(function (price, squareMeter) { // 小红订阅消息
//     console.log('小红：价格= ' + price)
//     console.log('squareMeter= ' + squareMeter);
// });

// salesOffices.trigger(2000000, 88); // 输出：200 万，88 平方米
// salesOffices.trigger(3000000, 110); // 输出：300 万，110 平方米

// var salesOffices = {}; // 定义售楼处

// salesOffices.clientList = {}; // 缓存列表，存放订阅者的回调函数

// salesOffices.listen = function (key, fn) {
//     if (!this.clientList[key]) { // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
//         this.clientList[key] = [];
//     }
//     this.clientList[key].push(fn); // 订阅的消息添加进消息缓存列表
// };

// salesOffices.trigger = function () { // 发布消息
//     var key = Array.prototype.shift.call(arguments), // 取出消息类型
//         fns = this.clientList[key]; // 取出该消息对应的回调函数集合
//     console.log(key)
//     if (!fns || fns.length === 0) { // 如果没有订阅该消息，则返回
//         return false;
//     }

//     for (var i = 0, fn; fn = fns[i++];) {
//         fn.apply(this, arguments); // (2) // arguments 是发布消息时附送的参数
//     }
// };

// salesOffices.listen('squareMeter88', function (price) { // 小明订阅 88 平方米房子的消息
//     console.log('价格= ' + price); // 输出： 2000000
// });

// salesOffices.listen('squareMeter110', function (price) { // 小红订阅 110 平方米房子的消息
//     console.log('价格= ' + price); // 输出： 3000000
// });

// salesOffices.trigger('squareMeter88', 2000000); // 发布 88 平方米房子的价格
// salesOffices.trigger('squareMeter88', 4000000); // 发布 88 平方米房子的价格
// salesOffices.trigger('squareMeter110', 3000000); // 发布 110 平方米房子的价格

// --------------------------------------------------------------------------------------
// 定义发布者
// class FD {
//     constructor() {

//     }
//     fabu = []

//     adD(fn) {
//         this.fabu.push(fn)
//     }

//     tigger() {
//         console.log(arguments)
//         for (var i = 0, fn; fn = this.fabu[i++];) {
//             fn.apply(this, arguments)
//         }
//     }

// }

// let fd = new FD();
// fd.adD(function (price, squareMeter) { // 小明订阅消息
//     console.log('小明')
//     console.log('价格= ' + price);
//     console.log('squareMeter= ' + squareMeter);
// })
// fd.adD(function (price, squareMeter) { // 小花订阅消息
//     console.log('小花')
//     console.log('价格= ' + price);
//     console.log('squareMeter= ' + squareMeter);
// })
// fd.tigger(2, 22)

// ----------------------------------------------------------
// 有条件限制的发布订阅者
// class FD {
//     constructor() {}
//     fabu = []

//     adD(key, fn) {
//         if (!this.fabu[key]) {
//             this.fabu[key] = []
//         }
//         this.fabu[key].push(fn)
//     }

//     // tigger1() {
//     //     let key = Array.prototype.shift.call(arguments),
//     //         fns = this.fabu[key];
//     //     if (fns && !fns.length) return;
//     //     for (var i = 0, fn; fn = fns[i++];) {
//     //         fn.apply(this, arguments)
//     //     }
//     // }
//     tigger(key, params) {
//         let fns = this.fabu[key];
//         if (fns && !fns.length) return;
//         for (var i = 0, fn; fn = fns[i++];) {
//             fn.apply(this, params)
//         }
//     }

// }

// let fd = new FD();
// fd.adD('88', function (price, squareMeter) { // 小明订阅消息
//     console.log('小明')
//     console.log('价格= ' + price);
//     console.log('squareMeter= ' + squareMeter);
// })
// fd.adD('188', function (price, squareMeter) { // 小花订阅消息
//     console.log(arguments)
//     console.log('小花')
//     console.log('价格= ' + price);
//     console.log('squareMeter= ' + squareMeter);
// })
// fd.tigger('188', [2, 22])
// -----------------------------------------------------------------

// 通用发布订阅者模式
/* 
    理解一下：
        发布者基本包含三个属性
        1：用于存放订阅者传来的回调函数的数组
        2：用于接收并保存订阅者传来回调函数的方法
        3：用于触发订阅者回调函数的方法

        tips:那么上面我用es6 class实现的发布订阅者模式也是通用的发布订阅者模式

*/
// var event = {
//     clientList: [],
//     listen: function (key, fn) {
//         if (!this.clientList[key]) {
//             this.clientList[key] = [];
//         }
//         this.clientList[key].push(fn); // 订阅的消息添加进缓存列表
//     },
//     trigger: function () {
//         var key = Array.prototype.shift.call(arguments), // (1);
//             fns = this.clientList[key];

//         if (!fns || fns.length === 0) { // 如果没有绑定对应的消息
//             return false;
//         }

//         for (var i = 0, fn; fn = fns[i++];) {
//             fn.apply(this, arguments); // (2) // arguments 是 trigger 时带上的参数
//         }
//     }
// };
// var installEvent = function (obj) {
//     for (var i in event) {
//         obj[i] = event[i];
//     }
// };
// var salesOffices = {};
// installEvent(salesOffices);

// salesOffices.listen('squareMeter88', function (price) {
//     // 小明订阅消息     console.log( '价格= ' + price );
// });

// salesOffices.listen('squareMeter100', function (price) {
//     // 小红订阅消息     console.log( '价格= ' + price );
// });

// salesOffices.trigger('squareMeter88', 2000000);
// // 输出：2000000
// salesOffices.trigger('squareMeter100', 3000000); // 输出：3000000

// ------------------------------------------------------------------

// 取消订阅事件  使用es6  class实现
// class FD {
// 	constructor() {}
// 	fabu = [];

// 	adD(key, fn) {
// 		if (!this.fabu[key]) {
// 			this.fabu[key] = [];
// 		}
// 		this.fabu[key].push(fn);
// 	}

// 	// tigger1() {
// 	//     let key = Array.prototype.shift.call(arguments),
// 	//         fns = this.fabu[key];
// 	//     if (fns && !fns.length) return;
// 	//     for (var i = 0, fn; fn = fns[i++];) {
// 	//         fn.apply(this, arguments)
// 	//     }
// 	// }
// 	tigger(key, params) {
// 		let fns = this.fabu[key];
// 		if (fns && !fns.length) return;
// 		for (let i = 0, fn; (fn = fns[i++]); ) {
// 			fn.apply(this, params);
// 		}
// 	}

// 	remove(key, fn) {
// 		console.log(this.fabu);
// 		var fns = this.fabu[key];
// 		if (!fns) {
// 			return;
// 		}
// 		if (!fn) {
// 			// 如果没有传入具体的方法说明 需要取消掉对应key下面所有的订阅
// 			fns && (fns.length = 0);
// 		} else {
// 			for (let i = fns.length - 1; i >= 0; i--) {
// 				// 反向便利订阅的回调函数列表
// 				let _fn = fns[i];
// 				if (_fn == fn) {
// 					fns.splice(i, 1);
// 				}
// 			}
// 		}
// 	}
// }
// fn1 = function(price, squareMeter) {
// 	// 小明订阅消息
// 	console.log('小明');
// 	console.log('价格= ' + price);
// 	console.log('squareMeter= ' + squareMeter);
// };
// fn2 = function(price, squareMeter) {
// 	// 小花订阅消息
// 	console.log(arguments);
// 	console.log('小花');
// 	console.log('价格= ' + price);
// 	console.log('squareMeter= ' + squareMeter);
// };
// fn3 = function(price, squareMeter) {
// 	// 小花订阅消息
// 	console.log(arguments);
// 	console.log('小红');
// 	console.log('价格= ' + price);
// 	console.log('squareMeter= ' + squareMeter);
// };
// let fd = new FD();
// fd.adD('88', fn1);
// fd.adD('188', fn2);
// fd.adD('188', fn3);
// fd.tigger('188', [ 2, 22 ]);
// fd.remove('188', fn2);
// console.log('再次触发一下');
// fd.tigger('188', [ 2, 22 ]);

// -------------------------------------------------------------------

// 网站登录例子
/* 
    如果一个登录信息被多个地方需要，并且是获取到用户信息之后进行之后的操作，可以使用发布订阅者模式
    当前登录例子，登录信息被 头部信息，导航栏 需要，并且是拿到登录信息之后进行，之后的操作
    tips：
    1：这样写的好处，登录模块不需要关心距离需要登录信息的模块做了什么，
    只需要关心拿到登录信息之后吧这些信息发布给订阅了登录信息的模块
    2：具体这些模块拿到登录信息进行了什么操作，或者说有什么修改都不会对登录模块有什么影响
    3：如果以后其他模块还需要登录信息，只需要订阅登录信息就行了，比如本例子中的地址模块


*/
class Login {
	constructor() {}
	cacheFn = [];
	listen(key, fn) {
		if (!this.cacheFn[key]) {
			this.cacheFn[key] = [];
		}
		this.cacheFn[key].push(fn);
	}
	tigger(key, data) {
		let fns = this.cacheFn[key];
		if (fns && !fns.length) return;
		this.cacheFn[key].forEach((item) => {
			item.call(this, data);
		});
	}
}
let login = new Login();

setTimeout(() => {
	let data = {
		avatar: '我是一个可爱的头像',
		name: '我是一个可爱的名字'
	};
	login.tigger('loginSucc', data);
}, 2000);
var header = (function() {
	// header 模块
	login.listen('loginSucc', function(data) {
		console.log(data);
		header.setAvatar(data.avatar);
	});
	return {
		setAvatar: function(data) {
			console.log('header', data);
			console.log('设置 header 模块的头像');
		}
	};
})();

var nav = (function() {
	// nav 模块
	login.listen('loginSucc', function(data) {
		nav.setAvatar(data.avatar);
	});
	return {
		setAvatar: function(avatar) {
			console.log('nav', avatar);
			console.log('设置 nav 模块的name');
		}
	};
})();
// 收货地址也需要可爱的头像
var address = (function() {
	// nav 模块
	login.listen('loginSucc', function(obj) {
		address.refresh(obj);
	});
	return {
		refresh: function(avatar) {
			console.log('收货地址也需要可爱的头像');
			console.log('刷新收货地址列表');
		}
	};
})();
