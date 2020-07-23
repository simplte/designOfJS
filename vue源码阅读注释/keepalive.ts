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
                include return true 取反 就不会 走pruneCacheEntry 删除缓存
                exclude 取反  表示 如果返回 true 两次取反 还是true 会进入 pruneCacheEntry
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
    // 移除数组中的key值value
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
         * 
         *  <keep-alive include="bookLists,bookLists">
                <router-view></router-view>
            </keep-alive>
            <keep-alive exclude="indexLists">
                <router-view></router-view>
            </keep-alive>
        */
        this.$watch('include', val => {
            pruneCache(this, name => matches(val, name))
        })
        this.$watch('exclude', val => {
            pruneCache(this, name => !matches(val, name))
        })
    },

    render() {
        // 获取所有插槽中的组件
        const slot = this.$slots.default
        // 获取keep-alive中的第一个子组件 keep-alive也只允许放一个组件
        const vnode: VNode = getFirstComponentChild(slot)
        // 给 componentOptions 赋值  看是不是组件 不是组件 直接返回 插槽中的子元素
        const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
        if (componentOptions) {
            // check pattern
            // 获取子组件名字
            const name: ?string = getComponentName(componentOptions)
            const { include, exclude } = this
            if (
                // not included
                // include中不包含当前子组件
                (include && (!name || !matches(include, name))) ||
                // excluded
                // 或者exlcude中有当前子组件
                (exclude && name && matches(exclude, name))
            ) {
                // 不拿缓存数据 直接加载组件
                return vnode
            }

            const { cache, keys } = this
            // 设置缓存key
            const key: ?string = vnode.key == null
                // same constructor may get registered as different local components
                // so cid alone is not enough (#3269)
                ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
                : vnode.key
            /**
             * 如果有缓存
             * 直接通过缓存中的数据 渲染组件
             * 并且跟新  keys数组中 当前已经缓存组件的key  放入 数组尾部
            */
            if (cache[key]) {
                vnode.componentInstance = cache[key].componentInstance
                // make current key freshest
                remove(keys, key)
                keys.push(key)
            } else {
                /**
                 * 没有缓存
                 * 将当前组件放入缓存
                 * 并且将当前组件的key值放入 keys数组底部
                 */
                cache[key] = vnode
                keys.push(key)
                // prune oldest entry
                /**
                 * 判断当前缓存的数量是否已经超出了最大缓存长度
                 * 如果超出 删除 keys数组中的第一个组件的缓存数据
                */
                if (this.max && keys.length > parseInt(this.max)) {
                    pruneCacheEntry(cache, keys[0], keys, this._vnode)
                }
            }

            vnode.data.keepAlive = true
        }
        return vnode || (slot && slot[0])
    }
}