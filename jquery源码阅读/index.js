const jQuery = require("jquery");

// function each(obj, cb,arg) {
//     var value,
//         i = 0;
//         len = obj.length,
//         isArr = isArray(obj)
//      // 有参数
//     if(arg) {
//         // 是数组 
//         if(isArr) {
//             for(; i< len; i++) {
//                 // 使用apply改变回调的作用域，将参数穿进去
//                 value = cb.apply(obj[i], args);
//                 // 如果执行返回false终止循环
//                 if(value === false) {
//                     break;
//                 }
                
//             }

//         }else {
//             // 通过for in 拿到对象key
//             for(i in obj) {
//                 value =  cb.apply(obj[i], args)
//                 if(value === false) {
//                     break;
//                 }
//             }
//         }

//     }else {
//         if ( isArray ) {    // 处理数组
//             for ( ; i < len; i++ ) {
//                 value = callback.call( obj[ i ], i, obj[ i ] );

//                 if ( value === false ) {
//                     break;
//                 }
//             }
//         } else {    // 处理对象
//             for ( i in obj ) {
//                 value = callback.call( obj[ i ], i, obj[ i ] ); // value 为callback的返回值

//                 if ( value === false ) {    // 注意这里，当value===false的时候，直接跳出循环了
//                     break;
//                 }
//             }
//         }
//     }
//     return obj;
// }
extend = function() {
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},    // 常见用法 jQuery.extend( obj1, obj2 )，此时，target为arguments[0]
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {    // 如果第一个参数为true，即 jQuery.extend( true, obj1, obj2 ); 的情况
        deep = target;  // 此时target是true
        target = arguments[1] || {};    // target改为 obj1
        // skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !jQuery.isFunction(target) ) {  // 处理奇怪的情况，比如 jQuery.extend( 'hello' , {nick: 'casper})~~
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    if ( length === i ) {   // 处理这种情况 jQuery.extend(obj)，或 jQuery.fn.extend( obj )
        target = this;  // jQuery.extend时，this指的是jQuery；jQuery.fn.extend时，this指的是jQuery.fn
        --i;
    }

    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) != null ) { // 比如 jQuery.extend( obj1, obj2, obj3, ojb4 )，options则为 obj2、obj3...
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {    // 防止自引用，不赘述
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                // 如果是深拷贝，且被拷贝的属性值本身是个对象
                if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                    if ( copyIsArray ) {    // 被拷贝的属性值是个数组
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];

                    // } else {    被拷贝的属性值是个plainObject，比如{ nick: 'casper' }
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = jQuery.extend( deep, clone, copy );  // 递归~

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {  // 浅拷贝，且属性值不为undefined
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};
console.log(extend(true,{a:1,b:2,h:[1,2,3]},{c:1,d:2,h: [44,1]}))