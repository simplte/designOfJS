export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : fals;
// 1. HelloWorld
type HelloWorld = string;
// 2. Pick
type MyPick<T, K extends keyof T> = {
  [Z in K]: T[Z];
};
// 3. Readonly
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
// 4. 元祖转换为对象
/**
 * 元祖肯定是 一组字符串或者数字为值的数组 并且元祖是不可修改的数组
 * 首先要限制传入的类型为元祖类型
 * 然后循环元祖
 * T[number] 代表取数组中的值作为key
 */

type TupleToObject<T extends readonly (string | number)[]> = {
  [K in T[number]]: K;
};
// 5. 取类型数组中的第一个值
type First<T extends unknown[]> = T['length'] extends 0 ? never : T[0];
type test1 = [1, 2, 3, 4];
type res = First<test1>;

// 6. 获取元祖类型的长度
type Length<T extends unknown[]> = T['length'] extends 0 ? 0 : T['length'];
type reslen = Length<test1>;

// 7. 实现 exclude 排除
// T extends K  = T K中都有的不要  保留没有的
type MyExclude<T, K> = T extends K ? never : T;

// 8. 实现await
// PromiseLike 定义类型是不是promise类型
/*
 * 本道题用到了递归的思想
 * 首先限制泛型 T 是满足promise类型的
 * 然后通过 infer 关键字 定义当前Promise泛型中的类型 为 R
 * 再判断 R 是否还是Promise类型 如果还是 则递归调用 MyAwait
 *    否则返回 传入Promise泛型中的类型
 * 如果T一开始就不满足promise类型 则直接返回never
 *
 **/
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? R extends PromiseLike<any>
    ? MyAwaited<R>
    : R
  : never;

// type Result = MyAwaited<Promise<string>>;

// 9. If
type If<T extends Boolean, A extends any, B extends any> = T extends true ? A : B;

// 10. concat
type Concat<T extends Array<unknown>, R extends Array<unknown>> = [...T, ...R];
// type Result = Concat<[1], [2]>; // expected to be [1, 2]

// 11. Includes
/**
 * 首先限制泛型T 为只读数组
 * 判断 T 是否属于数组类型
 *    然后通过 infer 定义数组中第一个的类型  和 剩余类型 rest
 *    然后判断 第一个类型 F 和 R是否相等  相等返回 true
 *         不相等则递归剩余rest 类型
 *  不属于数组类型则 返回 false
 */
type MyInclude<T extends readonly unknown[], R> = T extends [infer F, ...infer rest]
  ? Equal<F, R> extends true
    ? true
    : MyInclude<rest, R>
  : false;

type isPillarMen = MyInclude<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>;
