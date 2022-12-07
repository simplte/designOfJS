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

// 12. push
type MyPush<T extends readonly unknown[], R> = [...T, R];
// type Result = MyPush<[1, 2], '3'> // [1, 2, '3']

// 13. Unshift
type MyUnshift<T extends readonly unknown[], R> = [R, ...T];
// type Result = MyUnshift<[1, 2], 0>; // [0, 1, 2,]

// 14. FunctionParamsType
/**
 * 读取方法中的参数类型
 * 1.约束传入的泛型为函数类型
 * 2.使用infer 定义 函数 入参的类型
 * 3. 判断 T 是不是函数类型 如果是的话则返回 infer定义的形参类型 U 否则 返回nerver
 */
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer U) => any ? U : never;
const foo = (arg1: string, arg2: number): void => {};
type FnType = MyParameters<typeof foo>;

// type Exclude<T, R> = T extends R ? never : R;
type MP<T extends (...args: any[]) => any> = T extends (...any: infer R) => any ? R : never;

// 15. 获取函数返回类型
type MyFnReturnType<T extends (...args: any[]) => any> = T extends (...any: any[]) => infer T ? T : never;
// const fn = (v: boolean) => {
//   if (v) return 1;
//   else return 2;
// };
// type a = MyFnReturnType<typeof fn>; // 应推导出 "1 | 2"

// 16. Omit
/**
 * 1. 限制第二个泛型为 第一个泛型中的key
 * 2. 使用in 关键字循环 T
 * 3. 使用as 关键字 处理 循环的当前 P 类型是不是 属于第二泛型类型
 *    属于的话就返回never 不属于就返回 当前循环的 P
 *    P in xx  P相当于 xxx.foreach(x=> ...)循环中 x 指当前循环的形参（这里值形类型）
 */

type MyOmit<T, R extends keyof T> = {
  [P in keyof T as P extends R ? never : P]: T[P];
};
// interface Todo {
//   title: string;
//   description: string;
//   completed: boolean;
// }

// type TodoPreview = MyOmit<Todo, 'description' | 'title'>;

// const todo: TodoPreview = {
//   completed: false,
// };

// 17.Readonly 2
/**
 * 用法：接收两个类型
 * 第一个类型：需要处理的类型
 * 第二个类型：需要处理的第一个类型中的key的集合
 *
 * 1.首先限制第一个泛型没有什么特别限制
 * 2.第二个泛型必须是第一个泛型的key 因此需要  K extends keyof T  不过后面的 = keyof T 不知道是什么意思
 * 3.然后先处理只能readonly的key 使用 in 循环 泛型
 *  {
      readonly [P in K]: T[P];
    }
   4.最后将第一个泛型中剩余的key处理出来 , 使用 Exclude 将第一个泛型T 中不包含第二泛型的值处理出来
   {
      [P in Exclude<keyof T, K>]: T[P];
    }
 * */
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
} & {
  [P in Exclude<keyof T, K>]: T[P];
};

// interface Todo1 {
//   title: string;
//   description: string;
//   completed: boolean;
// }

// type todo = MyReadonly2<Todo1, 'title' | 'description'>;
// const valTodo: todo = { title: '', description: '', completed: false };
// valTodo.title = '123';
// valTodo.description = '123';
// valTodo.completed = false;

// 18. deepReadonly
/**
 * 1. 通过 in 循环泛型 的key
 * 2. 判断当前循环的泛型类型是不是对象类型
 *   通过 keyof T[P] extends never 判断当前类型是不是对象
 *   属于 never 则直接返回当前泛型类型对应的类型
 *   不属于
 */
type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};
// type X = {
//   x: {
//     a: 1;
//     b: 'hi';
//   };
//   y: 'hey';
// };

// type Expected = {
//   readonly x: {
//     readonly a: 1;
//     readonly b: 'hi';
//   };
//   readonly y: 'hey';
// };
// type Todo = DeepReadonly<X>;
// let a: Todo = {
//   x: {
//     a: 1,
//     b: 'hi',
//   },
//   y: 'hey',
// };

// 19：TupleToUnion 它返回元组所有值的合集。
/**
 * 1. 限制泛型为数组
 * 2. 需要用到循环且不能使用in的情况基本上都需要用到递归 (个人理解 in 仅用在 对对象类型的 key值的循环中)
 * 3. 通过infer 对泛型T进行分割，然后单个值判断
 *    T extends [infer R, ...infer Rest]
 *    将数组分割成 R 和Rest两部分
 * 4. 通过 extend 判断泛型T是不是属于 数组
 *    属于则返回R 且递归执行 Rest
 *    直至不属于数组类型 则返回 never
 *
 *
 */
type TupleToUnion<T extends unknown[]> = T extends [infer R, ...infer Rest] ? R | TupleToUnion<Rest> : never;
type Arr = ['1', '2', '3'];
type Test = TupleToUnion<Arr>;

// 20. 可串联构造器
type Chainable<options = {}> = {
  option<K extends string, V>(key: K, value: V): Chainable<options & { [S in K]: V }>;
  get(): { [P in keyof options]: options[P] };
};
// declare const config: Chainable;

// const result = config
//   .option('foo', 123)
//   .option('name', 'type-challenges')
//   .option('bar', { value: 'Hello World' })
//   .get();

// // 期望 result 的类型是：
// interface Result {
//   foo: number;
//   name: string;
//   bar: {
//     value: string;
//   };
// }

// 21.获取数组的最有一个元素类型
/**
 * 利用之前总结的一个方法 如果是需要循环取到需要值的方法 就需要用到递归
 * 判断空数组需要用到  Rest extends []
 * 还是利用 infer 去占位类型 然后递归判断占位的类型是否满足条件
 */
type Last<T extends unknown[]> = T extends [infer F, ...infer Rest] ? (Rest extends [] ? Last<Rest> : F) : never;
// type arr1 = ['a', 'b', 'c'];
// type arr2 = [3, 2, 1];

// type tail1 = Last<arr1>; // expected to be 'c'
// type tail2 = Last<arr2>; // expected to be 1

// 22. 删除数组中最后一个类型
type Pop<T extends unknown[]> = T extends [...infer F, any] ? F : T;
type arr1 = ['a', 'b', 'c', 'd'];
type arr2 = [3, 2, 1];

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]

type Unshift<T extends unknown[], R> = [R, ...T];
type re3 = Unshift<arr1, '1'>;
type Push<T extends unknown[], R> = [...T, R];
type re4 = Push<arr1, '1'>;
type shift<T extends unknown[]> = T extends [infer R, ...infer Rest] ? Rest : T;
type re5 = shift<arr1>;

// 23. Promise.all
/**
 * 1.声明函数 declare function
 * 2.定义泛型T为数组类型
 * 3.限制入参value 为只读类型的数组 value: readonly [...T] 因为 使用时传入的入参都是只读类型的
 * 4.定义返回值 按照题解提示 输出值为 Promise类型
 *  因此外面肯定是 Promise<>
 *  然后循环传入数组判断数组当前类型是不是Promise类型 且使用infer A 定义Promise的形参
 *    是promise类型则返回类型形参A
 *    不是promise类型则返回 当前数组对应的值 T[K]
 *    [K in keyof T] ? T[K] extends Promise<infer A> ? A : T[K];
 * @param value
 */
declare function PromiseAll<T extends unknown[]>(
  value: readonly [...T]
): Promise<{
  [K in keyof T]: T[K] extends Promise<infer A> ? A : T[K];
}>;
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);

// 24. LookUp
// 获取联合类型中对应type值的类型
type LookUp<U extends { type: string }, T> = U extends any ? (U['type'] extends T ? U : never) : never;
