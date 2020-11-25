const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

const resolvePromise = (promise2, x, resolve, reject) => {};
class Promise {
	constructor(executor) {
		// 实例上有的
		this.status = PENDING;
		this.value = undefined;
		this.reason = undefined;

		this.onResolveCbs = [];
		this.onRejectCbs = [];
		// 私有的
		let resolve = (val) => {
			if (this.status == PENDING) {
				this.value = val;
				this.status = RESOLVED;
				this.onResolveCbs.forEach((fn) => fn());
			}
		};
		let reject = (err) => {
			if (this.status == PENDING) {
				this.reason = err;
				this.status = REJECTED;
				this.onRejectCbs.forEach((fn) => fn());
			}
		};
		try {
			executor(resolve, reject);
		} catch (error) {
			reject(error); // 如果执行时报错了 也默认走reject方法
		}
	}
	// 原型上的
	// 有两个参数
	then(onfulfilled, onrejected) {
		// 递归处理 then中返回promise的情况
		let promise2 = new Promise((resolve, reject) => {
			// executor会立即执行
			// 同步的操作
			if (this.status == RESOLVED) {
				//  正常不考虑then中还有promise的情况的话 直接执行onfulfilled就行了
				// 考虑then中还会有promise 则需要进行对 onfulfilled 方法执行结果的判断
				// x可能是普通值也可能是promise
				setTimeout(() => {
					// 使用settime 倒计时  将当前需要执行的resolvePromise变成宏任务放到最后执行 避免promise2在实例过程中就去使用的报promise2为undefined的错误
					try {
						//使用trycatch 捕获 onfulfilled方法执行中的报错 ，因为使用了settimeout变成了异步任务 所以外面的trycatch不能被捕获
						let x = onfulfilled(this.value);
						resolvePromise(promise2, x, resolve, reject);
					} catch (error) {
						reject(error);
					}
				}, 0);
			}
			if (this.status == REJECTED) {
				setTimeout(() => {
					try {
						let x = onrejected(this.reason);
						resolvePromise(promise2, x, resolve, reject);
					} catch (error) {
						reject(error);
					}
				}, 0);
			}
			// 异步的操作
			// pending状态将对应状态方法放入对应状态数组 也就是订阅了状态
			// 当状态改变时，触发对应状态数组中的方法执行  （也就是发布)
			if (this.status == PENDING) {
				this.onResolveCbs.push(() => {
					setTimeout(() => {
						try {
							let x = onfulfilled(this.value);
							resolvePromise(promise2, x, resolve, reject);
						} catch (error) {
							reject(error);
						}
					}, 0);
				});
				this.onRejectCbs.push(() => {
					setTimeout(() => {
						try {
							let x = onrejected(this.reason);
							resolvePromise(promise2, x, resolve, reject);
						} catch (error) {
							reject(error);
						}
					}, 0);
				});
			}
		});
	}
}

module.exports = Promise;
