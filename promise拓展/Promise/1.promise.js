const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
class Promise {
	constructor(executor) {
        // 实例上有的
		this.status = PENDING;
		this.value = undefined;
		this.reason = undefined;
		
		this.onResolveCbs = []
		this.onRejectCbs = []
        // 私有的
		let resolve = (val) => {
			if (this.status == PENDING) {
				this.value = val;
				this.status = RESOLVED;
				this.onResolveCbs.forEach(fn => fn())
			}
		};
		let reject = (err) => {
			if (this.status == PENDING) {
				this.reason = err;
				this.status = REJECTED;
				this.onRejectCbs.forEach(fn => fn())
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
		// 同步的操作
		if (this.status == RESOLVED) {
			onfulfilled(this.value);
		}
		if (this.status == REJECTED) {
			onrejected(this.reason);
		}
		// 异步的操作
		// pending状态将对应状态方法放入对应状态数组 也就是订阅了状态
		// 当状态改变时，触发对应状态数组中的方法执行  （也就是发布)
		if(this.status == PENDING) {
			this.onResolveCbs.push(() => {
				onfulfilled(this.value)
			})
			this.onRejectCbs.push(()=> {
				onrejected(this.reason)
			})
		}
	}
}

module.exports = Promise;
