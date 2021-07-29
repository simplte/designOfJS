
// 1：柯里化函数
// 这个方法的处理方式可以用来固定数量的表单提交验证
// 比如一个表单两个输入,需要用户处理后才能点亮底部按钮
function partial(fn,...presetArgs) {
    return (...lasterArgs) => {
        fn(...presetArgs, ...lasterArgs);
    }
}
let vailddata = null;
let btnShow = false;
let formList = {
    val1: '', 
    val2: ''
}
function btnLign(val1, val2) {
    if(val1 && val2) {
        btnshow = true;
        console.log(btnshow)
    }
}
// 模拟 用户输入第一个表单输入框后掉用partial
vailddata = partial(btnLign, '我是值1');
// 模拟 用户输入第二个表单输入框后 调用vailddata
vailddata('我是值2') // 这时btnshow = true了




// 上述方法比较有局限性，需要固定第一个输入框时传入fn,且还需要固定参数数量
function currying(fn, len= fn.length) {
    return (function next(prevArgs) {
        return function cur(nextArgs) { 
            var args = [...prevArgs,nextArgs];
            if(args.length >= len){
                return fn(...args)
            }else {
                return next(args);
            }
        }
    })([]);
}

// 1: 第一个函数使用自执行函数 iffe 创建闭包将传入的参数锁住
// 2：返回一个新的函数主要进行：
//          1：将新传入的参数和闭包中保存的参数合并
//          2: 判断闭包中需要执行函数的参数长度是否小于等于合并后的参数数量
//          3：函数参数小于闭包保存参数数量执行函数
//          4：函数参数不小于闭包中保存的参数数量 
//                   返回并执行第一个函数，
//                   将闭包中合并的参数当做入参 (这里其实又使用了闭包将之前合并的参数传入cur函数找那个保存)

function curringMine(fn, len =fn.length) {
    return (
        function iffeFun(curArgs) {
            return function sureFun(newArgs) {
                let allArgs = [...curArgs, newArgs];
                if(allArgs.length >= len){
                   return fn(...allArgs)
                }else {
                    return iffeFun(allArgs);
                }
            }
        }
    )([])
}

function addFun(x,y,z,j) {
    return x+ y+z+j
}
let resFun = curringMine(addFun);
let resFun1 = resFun(1)(1)(1)(1);



console.log(resFun1)
[1,2,3,4,5].map( x=> {

} );
[1,2,3,4,5].map( curringMine( add )( 3 ) );
/*
=  [1,2,3,4,5].map( iffeFun( x ) {
    allArgs = [x];
    return iffeFun(allArgs)
}(3) // 每次map内置的for循环又执行了一次入参为3 的iffeFun 这样闭包中的参数长度和add所需参数一致就会执行add方法
    因此数组中所有的数据都加了3
*/ 
/*******
 * 
 个人思考柯理化函数在实际业务场景中的使用:
 比如一个应用的首页调用三个接口
 其中第三个 需要依赖两外两个接口的反参作为入参才能进行调用
 这时就可以使用柯里化函数了
 在页面初始化时将第三个接口掉用的方法进行柯里化 成一个新的方法  curringApi3
 在两外两个接口异步成功后 调用curringApi3  将参数传入
 这样等到两个接口都相应成功后  就会自动执行调用接口api3 的操作 
 */

// 不固定每次入参个数的柯里化实现方式
 function looseCurry(fn,arity = fn.length) {
    return (function nextCurried(prevArgs){
        return function curried(...nextArgs){
            var args = [ ...prevArgs, ...nextArgs ];

            if (args.length >= arity) {
                return fn( ...args );
            }
            else {
                return nextCurried( args );
            }
        };
    })( [] );
}

var curriedSum = looseCurry( sum, 5 );

curriedSum( 1 )( 2, 3 )( 4, 5 );  

// 不用在意参数顺序的柯理化和局部应用程序，个人理解就是通过对象属性的映射关系实现，只要对象个数够了就执行
function partialProps(fn,presetArgsObj) {
    return function partiallyApplied(laterArgsObj){
        return fn( Object.assign( {}, presetArgsObj, laterArgsObj ) );
    };
}

function curryProps(fn,arity = 1) {
    return (function nextCurried(prevArgsObj){
        return function curried(nextArgObj = {}){
            var [key] = Object.keys( nextArgObj );
            var allArgsObj = Object.assign(
                {}, prevArgsObj, { [key]: nextArgObj[key] }
            );

            if (Object.keys( allArgsObj ).length >= arity) {
                return fn( allArgsObj );
            }
            else {
                return nextCurried( allArgsObj );
            }
        };
    })( {} );
}