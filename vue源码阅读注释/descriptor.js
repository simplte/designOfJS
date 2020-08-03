
// 装饰器
function debounce(wait) {
    return function(target, name, descriptor) {
        descriptor.value = debounce(descriptor.value, wait);
    }
}
class MyClass {
    @debounce(100);
    follow() {
        console.log('hahaha')
    }
}

// vue中使用
function log() {
    return function(target, name, descriptor) {
        console.log(target, name, descriptor);
        const fn = descriptor.value;
        descriptor.value = function(...rest) {
            console.log(`调用前`)
            fn.call(this, ...rest);
            console.log(`调用后`)
        }
    }
}

export default {
    created() {
        this.getData()
    },
    methods: {
        @log();
        getData() {
            console.log(`获取数据`)
        }
    }
}
// 函数节流防抖使用装饰器实现
// 使用lodash工具
import {throttle, debounce} from 'lodash';
/**
 * 函数节流装饰器
 * @param {number} wait 节流的毫秒
 * @param {Object} options 节流选项对象
 * [options.leading=true] (boolean): 指定调用在节流开始前。
 * [options.trailing=true] (boolean): 指定调用在节流结束后。
 */
export const throttle = function(wait, options = {}) {
    return function(target, name, descriptor) {
        descriptor.value = throttle(descriptor.value, wait, options);
    }
}
/**
 * 函数防抖装饰器
 * @param {number} wait 需要延迟的毫秒数。
 * @param {Object} options 选项对象
 * [options.leading=false] (boolean): 指定在延迟开始前调用。
 * [options.maxWait] (number): 设置 func 允许被延迟的最大值。
 * [options.trailing=true] (boolean): 指定在延迟结束后调用。
 */
export const debounce = function(wait, options = {}) {
    return function(target, name, descriptor) {
        descriptor.value = debounce(descriptor.value, wait, options);
    }
}
// 组件中使用
import {debounce} from '@/decorator'

export default {
  methods:{
    @debounce(100)
    resize(){}
  }
}

// =============
// 将loading封装为装饰器

import { Toast } from 'vant';
export const loading = function(msg = '加载中...', errorFn = function(){} ){
    return function(target, name, descriptor) {
        const fn = descriptor.value;
        descriptor.value = async function(...rest) {
            const loading = Toast.loading({
                message:msg,
                forbidClick: true
            })
            try {
                fn.call(this, ...rest);
            } catch (error) {
                errorFn && errorFn.call(this, error, ...rest);
            }finally{
                loading.clear()
            }
        }
    }
}
// 组件中使用
export  default{
    methods: {
        @loading('加载中');
        async getData() {
            try {
                const data = await loadData()
            } catch (error) {
                Toast.fail('加载失败')
            }
        }
    }
}
// ==============
// 确认框使用装饰器编写
import {Dialog} from 'vant';
export const confirm = function(
    message = '确定要删除数据，此操作不可回退。',
    title = '提示',
    cancelFn = function() {}
){
    return function(target, name, descriptor){
        const fn = descriptor.value;
        try {
           await Dialog.confirm({
            title,
            message,
           }) 
           fn.call(this, ...rest);
        } catch (error) {
            cancelFn && cancelFn.call(this, error);
        }
    }
}
// 组件中使用
export default{
    methods: {
        @confirm();
        delete() {
            console.log('在这里做删除操作')
        }
    }
}