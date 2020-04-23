// 迭代器 就是指 对象 或者数组循环的方法  forEach map 等
/* 
    const arr = [1, 2, 3]
    // 通过调用iterator，拿到迭代器对象
    const iterator = arr[Symbol.iterator]()

    // 对迭代器对象执行next，就能逐个访问集合的成员
    iterator.next()
    iterator.next()
    iterator.next()
*/

// for  of 做的事情等价于下面的操作
const iterator = arr[Symbol.iterator]();
const now = {done:false};
while(!now.done) {
    now = iterator.next();
    if(!now.done) {
        console.log(`现在遍历的值${now.value}`)
    }
}

// 编写一个迭代器生成函数
function *iteratorGenerator() {
    yield '1号选手'
    yield '2号选手'
    yield '3号选手'
}

const iterator = iteratorGenerator()

iterator.next()
iterator.next()
iterator.next()


// es5写一个能够生成迭代器对象的迭代器生成函数
// 定义生成器函数，入参是任意集合
// 为了记录每次遍历的位置，我们实现了一个闭包，借助自由变量来做我们的迭代过程中的“游标”
function iteratorGenerator(list) {
    // idx记录当前访问的索引
    var idx = 0
    // len记录传入集合的长度
    var len = list.length
    return {
        // 自定义next方法
        next: function() {
            // 如果索引还没有超出集合长度，done为false
            var done = idx >= len
            // 如果done为false，则可以继续取值
            var value = !done ? list[idx++] : undefined
            
            // 将当前值与遍历是否完毕（done）返回
            return {
                done: done,
                value: value
            }
        }
    }
}

var iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手'])
iterator.next()
iterator.next()
iterator.next()

function bqc(list) {
    var idx = 0;
    var len = list.length;
    return {
        next:function() {
            // 当前index大于等于长度了说明 数组已经便利完了
            var done = idx >= len;
            var value = done ? undefined: list[idx++];
            return {
                done,
                value
            }
        }
    }
}
var c = bqc([1,2,3,4])
c.next()