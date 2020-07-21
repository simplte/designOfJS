function copyAugment(target, src, keys) {
	for (var i = 0, l = keys.length; i < l; i++) {
		var key = keys[i];
		def(target, key, src[key]);
	}
}
function def(obj, key, val, enumerable) {
	Object.defineProperty(obj, key, {
		value: val,
		enumerable: !!enumerable, // 强制转换成布尔值
		writable: true,
		configurable: true
	});
}
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
var arrTest = [ 1, 2, 3, 4 ];
copyAugment(arrTest, arrayMethods, arrayKeys);
console.log(arrayMethods);
console.log(arrayKeys);
console.log(arrTest)
