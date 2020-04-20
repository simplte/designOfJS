// 是基于传统面向对象语言的模仿
// 下策略模式的思想：
// 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换
var performanceS = function() {};

performanceS.prototype.calculate = function(salary) {
	return salary * 4;
};

var performanceA = function() {};

performanceA.prototype.calculate = function(salary) {
	return salary * 3;
};

var performanceB = function() {};

performanceB.prototype.calculate = function(salary) {
	return salary * 2;
};

var Bonus = function() {
	this.salary = null; // 原始工资

	this.strategy = null; // 绩效等级对应的策略对象
};

Bonus.prototype.setSalary = function(salary) {
	this.salary = salary; // 设置员工的原始工资
};

Bonus.prototype.setStrategy = function(strategy) {
	this.strategy = strategy; // 设置员工绩效等级对应的策略对象
};

Bonus.prototype.getBonus = function() {
	// 取得奖金数额
	return this.strategy.calculate(this.salary); // 把计算奖金的操作委托给对应的策略对象
};

var bonus = new Bonus();

bonus.setSalary(10000);
bonus.setStrategy(new performanceS());
// 设置策略对象

console.log(bonus.getBonus()); // 输出：40000

bonus.setStrategy(new performanceA()); // 设置策略对象
console.log(bonus.getBonus()); // 输出：30000
// --------------------------------------------------------------

// JavaScript版本的策略模式

var strategies = {
	S: function(salary) {
		return salary * 4;
	},
	A: function(salary) {
		return salary * 3;
	},
	B: function(salary) {
		return salary * 2;
	}
};

var calculateBonus = function(level, salary) {
	return strategies[level](salary);
};

console.log(calculateBonus('S', 20000)); // 输出：80000
console.log(calculateBonus('A', 10000)); // 输出：30000
// ------------------------------------------------------------
// 表单验证
var strategies = {
	isNonEmpty: function(value, errorMsg) {
		// 不为空
		if (value === '') {
			return errorMsg;
		}
	},
	minLength: function(value, length, errorMsg) {
		// 限制小长度
		if (value.length < length) {
			return errorMsg;
		}
	},
	isMobile: function(value, errorMsg) {
		// 手机号码格式
		if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
			return errorMsg;
		}
	}
};
var validataFunc = function() {
	var validator = new Validator(); // 创建一个 validator 对象

	/***************添加一些校验规则****************/

	validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
	validator.add(registerForm.password, 'minLength:6', '密码长度不能少于 6 位');
	validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');

	var errorMsg = validator.start(); // 获得校验结果
	return errorMsg; // 返回校验结果
};
var errorMsg = validataFunc();
// var registerForm = document.getElementById('registerForm');
// registerForm.onsubmit = function() {
// 	var errorMsg = validataFunc();
// 	// 如果 errorMsg 有确切的返回值，说明未通过校验
// 	if (errorMsg) {
// 		alert(errorMsg);
// 		return false; // 阻止表单提交
// 	}
// };

var Validator = function() {
	this.cache = [];
	// 保存校验规则
};

Validator.prototype.add = function(dom, rule, errorMsg) {
	var ary = rule.split(':'); // 把 strategy 和参数分开 [minLength,6]
	this.cache.push(function() {
		// 把校验的步骤用空函数包装起来，并且放入 cache,数组头部截取，方法名
		var strategy = ary.shift(); // [6]
		// 用户挑选的 strategy 数组头部添加
		ary.unshift(dom.value); // [密码,6]
		// 把 input 的 value 添加进参数列表 数组尾部添加
		ary.push(errorMsg); // [密码,6,'密码长度不能少于6位']
		// 把 errorMsg 添加进参数列表
		return strategies[strategy].apply(dom, ary);
	});
};

Validator.prototype.start = function() {
	for (var i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
		var msg = validatorFunc(); // 开始校验，并取得校验后的返回信息
		if (msg) {
			// 如果有确切的返回值，说明校验没有通过
			return msg;
		}
	}
};
