/* 
    SRP原则是所有原则中简单也是难正确运用的原则之一
    。 要明确的是，并不是所有的职责都应该一一分离。
    一方面，如果随着需求的变化，
    有两个职责总是同时变化，那就不必分离他们。
    比如在 ajax 请求的时候，创建 xhr 对象和发送 xhr 
    请求几乎总是在一起的，那么创建 xhr 对象的职责和发送 xhr
    请求的职责就没有必要分开 
*/

/* 
    当需要改变一个程序的功能或者给这个程序增加新功能的时候，
    可以使用增加代码的方式，但是不允许改动程序的源代码  
*/

// 代码重构
/* 
     避免出现超大函数。
     独立出来的函数有助于代码复用。
     独立出来的函数更容易被覆写 
     独立出来的函数如果拥有一个良好的命名，它本身就起到了注释的作用\
    合并重复的条件片段
     
    
  */
//
// 把条件分支语句提炼成函数
var getPrice = function(price) {
	var date = new Date();
	if (date.getMonth() >= 6 && date.getMonth() <= 9) {
		// 夏天
		return price * 0.8;
	}
	return price;
};
// ====
var isSummer = function() {
	var date = new Date();
	return date.getMonth() >= 6 && date.getMonth() <= 9;
};

var getPrice = function(price) {
	if (isSummer()) {
		// 夏天
		return price * 0.8;
	}
	return price;
};
// 合理使用循环 在函数体内，
// 如果有些代码实际上负责的是一些重复性的工作，那么合理利用循环不仅可以 完成同样的功能，
// 还可以使代码量更少。
var createXHR = function() {
	var xhr;
	try {
		xhr = new ActiveXObject('MSXML2.XMLHttp.6.0');
	} catch (e) {
		try {
			xhr = new ActiveXObject('MSXML2.XMLHttp.3.0');
		} catch (e) {
			xhr = new ActiveXObject('MSXML2.XMLHttp');
		}
	}
	return xhr;
};

var xhr = createXHR();
// =======
var createXHR = function() {
	var versions = [ 'MSXML2.XMLHttp.6.0ddd', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp' ];
	for (var i = 0, version; (version = versions[i++]); ) {
		try {
			return new ActiveXObject(version);
		} catch (e) {}
	}
};

var xhr = createXHR();
// 提前让函数退出代替嵌套条件分支
var del = function(obj) {
	var ret;
	if (!obj.isReadOnly) {
		// 不为只读的才能被删除
		if (obj.isFolder) {
			// 如果是文件夹
			ret = deleteFolder(obj);
		} else if (obj.isFile) {
			// 如果是文件
			ret = deleteFile(obj);
		}
	}
	return ret;
};
// =============
var del = function(obj) {
	if (obj.isReadOnly) {
		// 反转 if 表达式
		return;
	}
	if (obj.isFolder) {
		return deleteFolder(obj);
	}
	if (obj.isFile) {
		return deleteFile(obj);
	}
};
// 传递对象参数代替过长的参数列表
var setUserInfo = function(id, name, address, sex, mobile, qq) {
	console.log('id= ' + id);
	console.log('name= ' + name);
	console.log('address= ' + address);
	console.log('sex= ' + sex);
	console.log('mobile= ' + mobile);
	console.log('qq= ' + qq);
};

setUserInfo(1314, 'sven', 'shenzhen', 'male', '137********', 377876679);
// ==========
var setUserInfo = function(obj) {
	console.log('id= ' + obj.id);
	console.log('name= ' + obj.name);
	console.log('address= ' + obj.address);
	console.log('sex= ' + obj.sex);
	console.log('mobile= ' + obj.mobile);
	console.log('qq= ' + obj.qq);
};

setUserInfo({ id: 1314, name: 'sven', address: 'shenzhen', sex: 'male', mobile: '137********', qq: 377876679 });

// 少用三目运算符
// 合理使用链式调用
// 用return 退出多重循环
