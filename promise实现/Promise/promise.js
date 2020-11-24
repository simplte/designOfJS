const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
class Promise {
	constructor(executor) {
        // 实例上有的
		this.status = PENDING;
		this.value = undefined;
        this.reason = undefined;
        // 私有的
		let resolve = (val) => {
			if (this.status == PENDING) {
				this.value = val;
				this.status = RESOLVED;
			}
		};
		let reject = (err) => {
			if (this.status == PENDING) {
				this.reason = err;
				this.status = REJECTED;
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
		if (this.status == RESOLVED) {
			onfulfilled(this.value);
		}
		if (this.status == REJECTED) {
			onrejected(this.reason);
		}
	}
}

module.exports = Promise;
