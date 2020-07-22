/* @flow */

import { isRegExp, remove } from 'shared/util'
import { getFirstComponentChild } from 'core/vdom/helpers/index'

type VNodeCache = { [key: string]: ?VNode };
// 获取组件名称
function getComponentName(opts: ?VNodeComponentOptions): ?string {
    return opts && (opts.Ctor.options.name || opts.tag)
}
// 匹配规则
function matches(pattern: string | RegExp | Array<string>, name: string): boolean {
    if (Array.isArray(pattern)) {
        return pattern.indexOf(name) > -1
    } else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(name) > -1
    } else if (isRegExp(pattern)) {
        return pattern.test(name)
    }
    /* istanbul ignore next */
    return false
}

function pruneCache(keepAliveInstance: any, filter: Function) {
    const { cache, keys, _vnode } = keepAliveInstance
    for (const key in cache) {
        const cachedNode: ?VNode = cache[key]
        if (cachedNode) {
            const name: ?string = getComponentName(cachedNode.componentOptions)
            // 组件存在，并且 将include 和exclude的规则传到 match中，执行没有匹配到改组件 返回false
            /* 
                include return true
                exclude 取反  表示 如果返回 false  这边也不会进入 pruneCacheEntry
             */
            if (name && !filter(name)) {
                pruneCacheEntry(cache, key, keys, _vnode)
            }
        }
    }
}
/* 
    删除缓存方法
*/
function pruneCacheEntry(
    cache: VNodeCache,
    key: string,
    keys: Array<string>,
    current?: VNode
) {
    const cached = cache[key]
    if (cached && (!current || cached.tag !== current.tag)) {
        // 执行缓存中组件的 销毁缓存中的组件
        cached.componentInstance.$destroy()
    }
    // 将缓存中的key设为null
    cache[key] = null
    // 移除数组中的key值
    remove(keys, key)
}

const patternTypes: Array<Function> = [String, RegExp, Array]

export default {
    name: 'keep-alive',
    // 抽象组件
    abstract: true,

    props: {
        // include 值为字符串或正则表达式。包含此名称的组件会被缓存。
        // exclude 值为字符串或正则表达式。任何名称匹配的组件都不会被缓存。
        include: patternTypes,
        exclude: patternTypes,
        max: [String, Number]
    },
    // 声明缓存对象和  映射对象的数组
    created() {
        this.cache = Object.create(null)
        this.keys = []
    },
    // keepalive组件销毁之后 将缓存中的组件销毁 并且将数组和对象中的缓存值移除
    destroyed() {
        for (const key in this.cache) {
            pruneCacheEntry(this.cache, key, this.keys)
        }
    },

    mounted() {
        // 监听 props传进来的 include和exclude属性
        /**
         * 1：如果include 值发生变化
        */
        this.$watch('include', val => {
            pruneCache(this, name => matches(val, name))
        })
        this.$watch('exclude', val => {
            pruneCache(this, name => !matches(val, name))
        })
    },

    render() {
        const slot = this.$slots.default
        const vnode: VNode = getFirstComponentChild(slot)
        const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
        if (componentOptions) {
            // check pattern
            const name: ?string = getComponentName(componentOptions)
            const { include, exclude } = this
            if (
                // not included
                (include && (!name || !matches(include, name))) ||
                // excluded
                (exclude && name && matches(exclude, name))
            ) {
                return vnode
            }

            const { cache, keys } = this
            const key: ?string = vnode.key == null
                // same constructor may get registered as different local components
                // so cid alone is not enough (#3269)
                ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
                : vnode.key
            if (cache[key]) {
                vnode.componentInstance = cache[key].componentInstance
                // make current key freshest
                remove(keys, key)
                keys.push(key)
            } else {
                cache[key] = vnode
                keys.push(key)
                // prune oldest entry
                if (this.max && keys.length > parseInt(this.max)) {
                    pruneCacheEntry(cache, keys[0], keys, this._vnode)
                }
            }

            vnode.data.keepAlive = true
        }
        return vnode || (slot && slot[0])
    }
}