// react setState的实现思想
function perform(anyMethod, wrappers) {
    return function() {
        // 需要在具体业务逻辑之前执行的动作
        wrappers.forEach(wrapper => wrapper.initialize())
        // 具体业务逻辑
        anyMethod && anyMethod()
        // 在具体业务逻辑之后执行的动作
        wrappers.forEach(wrapper => wrapper.close())
    }
    
}
let newFn = perform(
	function() {
		console.log('说,说');
	},
	[
		{
			// wrapper1
			initialize() {
				console.log('1说之前');
			},
			close() {
				console.log('1关闭');
			}
		},
		{
			// wrapper2
			initialize() {
				console.log('2说之前');
			},
			close() {
				console.log('2关闭');
			}
		}
	]
);
newFn()