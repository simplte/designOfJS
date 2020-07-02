const { isArray } = require("jquery");

function each(obj, cb,arg) {
    var value,
        i = 0;
        len = obj.length,
        isArr = isArray(obj)
     // 有参数
    if(arg) {
        // 是数组 
        if(isArr) {
            for(; i< len, i++) {
                // 使用apply改变回调的作用域，将参数穿进去
                value = cb.apply(obj[i], args);
                // 如果执行返回false终止循环
                if(value === false) {
                    break;
                }
                
            }

        }else {
            // 通过for in 拿到对象key
            for(i in obj) {
                value =  cb.apply(obj[i], args)
                if(value === false) {
                    break;
                }
            }
        }

    }else {
        if ( isArray ) {    // 处理数组
            for ( ; i < len; i++ ) {
                value = callback.call( obj[ i ], i, obj[ i ] );

                if ( value === false ) {
                    break;
                }
            }
        } else {    // 处理对象
            for ( i in obj ) {
                value = callback.call( obj[ i ], i, obj[ i ] ); // value 为callback的返回值

                if ( value === false ) {    // 注意这里，当value===false的时候，直接跳出循环了
                    break;
                }
            }
        }
    }
    return obj;
}