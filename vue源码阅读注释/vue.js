/**
 * - vue双向绑定 方法调用流程
 * observe 方法中
 *      调用 Observer 循环入参对象 
 *             调用 defineReactive 给对象属性添加 get和set方法
 *                  defineReactive 方法中
 *                      实例化Dep
 *          
 *                      递归调用 observe 处理对象属性值为对象的情况
 *                      设置get属性 区分get方法触发时 
 *                                      是watcher中调用
 *                                      还是普通调用的 通过 Dep.target判断是不是null 非null时 将 Dep.target(wather) 加入消息－订阅器
 *                      设置set属性 新值 调用observe 添加get和set属性
 *                                  同时调用 dep消息－订阅器 中的发布方法
 *                  Dep 消息－订阅器 
 *                      addSub 订阅消息
 *                      notify 发布消息
 *
 * Watcher方法中
 *  update 供订阅器发布消息时统一调用的方法
 *  run    调用get 获取当前属性值
 *                 如果新获取的值不等于旧值 执行回调
 *  get    获取属性值 给Dep.target赋值 
 *                   然后获取取属性值 这时候就会触发当前属性的get方法 将当前wather加入 消息－订阅器 队列中
 *                      
 */

// 创建观察者observer  给每一个对象的属性都添加getter  和 setter
class Observer {
	constructor(value) {
		this.value = value;
		this.walk(value);
	}
	//递归。。让每个字属性可以observe
	walk(value) {
		Object.keys(value).forEach((key) => this.convert(key, value[key]));
	}
	convert(key, val) {
		defineReactive(this.value, key, val);
	}
}

// export function defineReactive(obj, key, val) {
// 	var childOb = observe(val);
// 	Object.defineProperty(obj, key, {
// 		enumerable: true,
// 		configurable: true,
// 		get: () => val,
// 		set: (newVal) => {
// 			childOb = observe(newVal); //如果新赋值的值是个复杂类型。再递归它，加上set/get。。
// 		}
// 	});
// }

/**
 * 给对象属性添加get 和set属性 
 * get中  判断Dep.target 是否有值  有值则加入订阅器中
 * set中 比较新值和旧值 如果新值 
 *                  将值通过observe 给新属性值添加get 和set属性 
 *                  并且执行消息－订阅器 的notify 发布方法
 *         
 * @param {*} obj 
 * @param {*} key 
 * @param {*} val 
 */
function defineReactive(obj, key, val) {
	var dep = new Dep();
	var childOb = observe(val);
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		// get: () => val,
		get: () => {
			if (Dep.target) {
				dep.addSub(Dep.target);
			}
		},
		set: (newVal) => {
			var value = val;
			if (newVal === value) {
				return;
			}
			val = newVal;
			childOb = observe(newVal);
			// dep.notify()就遍历订阅者
			dep.notify();
		}
	});
}

function observe(value, vm) {
	if (!value || typeof value !== 'object') {
		return;
	}
	return new Observer(value);
}
// 2. 消息－订阅器
class Dep {
	constructor() {
		this.subs = [];
	}
	// 订阅消息
	addSub(sub) {
		this.subs.push(sub);
	}
	// 发布消息 发布者
	notify() {
		this.subs.forEach((sub) => sub.update());
	}
}
/**
 * Watcher方法中
 *  update 供订阅器发布消息时统一调用的方法
 *  run    调用get 获取当前属性值
 *                 如果新获取的值不等于旧值 执行回调
 *  get    获取属性值 给Dep.target赋值 
 *                   然后获取取属性值 这时候就会触发当前属性的get方法 将当前wather加入 消息－订阅器 队列中
 * 
 */
// 3. 实现一个Watcher订阅者
class Watcher {
	constructor(vm, expOrFn, cb) {
		this.cb = cb;
		this.vm = vm;
		//此处简化.要区分fuction还是expression,只考虑最简单的expression
		this.expOrFn = expOrFn;
		this.value = this.get();
	}
	update() {
		this.run();
	}
	run() {
		const value = this.get();
		if (value !== this.value) {
			this.value = value;
			this.cb.call(this.vm);
		}
	}
	// get() {
	// 	//此处简化。。要区分fuction还是expression
	// 	const value = this.vm._data[this.expOrFn];
	// 	return value;
	// }
	get() {
        // 用于区别是watcher中调用属性值时触发的get方法还是 普通的属性值调用时触发的get方法
		Dep.target = this;
		//此处简化。。要区分fuction还是expression
		const value = this.vm._data[this.expOrFn];
		Dep.target = null;
		return value;
	}
}
/**
 * 1: 给实例化入参时对象的属性添加get和set方法
 * 2：通过observe方法给属性添加get和set方法  进行数据监听
 * 3：$watch 监听属性值变化
 *          调用 Watcher 将当前属性的加入 消息-订阅器缓存中 等待触发
 *                           
 */
class Vue {
	constructor(options = {}) {
		//这里简化了。。其实要merge
		this.$options = options;
		//这里简化了。。其实要区分的
		let data = (this._data = this.$options.data);
        Object.keys(data).forEach((key) => this._proxy(key));
        // 给实例化入参的option对象属性添加get和set方法
		observe(data, this);
	}

	$watch(expOrFn, cb, options) {
		new Watcher(this, expOrFn, cb);
	}

	_proxy(key) {
		var self = this;
		Object.defineProperty(self, key, {
			configurable: true,
			enumerable: true,
			get: function proxyGetter() {
				return self._data[key];
			},
			set: function proxySetter(val) {
				self._data[key] = val;
			}
		});
	}
}
