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
/**
 * 题解分析：
 * 因为是需要判断传入类型中 某个属性为第二个泛型的值 并返回对应的类型
 * 1.因此需要限制第一个泛型 必须含有type 类型 T extends { type: string }
 * 这里的入参基本上都是联合类型 联合类型(Cat | Dog)中都要要满足 有type属性
 * 2.然后判断联合类型中 那个类型的type属性为第二个泛型值  然后返回出 此类型
 *  这里有点困惑  ： Cat | Dog 这种联合类型传入LookUp中作为第一个泛型T
 *    在使用 T extends any 的是会默认使用循环去循环联合类型吗
 *    在满足 T['type'] extends U 之后 当前就返回联合类型中满足条件的那个类型吗 那 T 是不是也可以理解成形参类型
 */
type LookUp<T extends { type: string }, U> = T extends any ? (T['type'] extends U ? T : never) : never;
// interface Cat {
//   type: 'cat';
//   breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
// }

// interface Dog {
//   type: 'dog';
//   breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
//   color: 'brown' | 'white' | 'black';
// }

// type MyDogType = LookUp<Cat | Dog, 'dog'>; // expected to be `Dog`

// 25. TrimLeft<T>
// 它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。
type TrimLeft<T extends string> = T extends `${' ' | '\n' | '\t'}${infer R}` ? TrimLeft<R> : T;
// type trimed = TrimLeft<'  Hello World  '>; // 应推导出 'Hello World  '
// 26. trim 将左右的空格都去掉
type Trim<T extends string> = T extends `${' ' | '\n' | '\t'}${infer R}`
  ? Trim<R>
  : T extends `${infer L}${' ' | '\n' | '\t'}`
  ? Trim<L>
  : T;
type trimed = Trim<'  Hello World  '>;
// 27. Capitalize 第一个字符串首字母大写其余不变
// type Capitalize<T extends string> = T extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : T;
// type capitalized = Capitalize<'hello world'>;
// type capitalized1 = Capitalize<'hello'>;

// 增强版 单词首字母大写
type Capitalize<T extends string> = T extends `${infer F}${infer L}${' ' | '\n' | '\t'}${infer R}`
  ? `${Uppercase<F>}${L} ${Capitalize<R>}`
  : T extends `${infer RF}${infer R}`
  ? `${Uppercase<RF>}${R}`
  : `${Uppercase<T>}`;

// 26. Replace
type Replace<T extends string, V extends string, N extends string> = T extends `${infer L}${V}${infer R}`
  ? `${L}${N}${R}`
  : T;
// type replaced = Replace<'fun', 'fun', 'awesome'>; // expected to be 'types are awesome!'
// 26. ReplaceAll
type ReplaceAll<T extends string, V extends string, N extends string> = T extends `${infer L}${V}${infer R}`
  ? `${L}${N}${ReplaceAll<R, V, N>}`
  : T;
type replaced = ReplaceAll<'t y p e s', ' ', ''>;

// 27. AppendArgument
/**
 * 1. ReturnType 获取函数类型的返回值
 */
type AppendArgument<F extends (...args: any[]) => any, A> = F extends (...args: infer P) => any
  ? (...args: [...P, A]) => ReturnType<F>
  : never;

// function getUser() {
//   return {name: 'xxx', age: 10}
// }

// type GetUserType = typeof getUser;
// type ReturnUser = ReturnType<GetUserType>

// 28. Permutation
type Permutation<T, C = T> = [T] extends [never] ? [] : C extends infer U ? [U, ...Permutation<Exclude<T, U>>] : never;
// 29. LengthOfString
/**
 * 1. 将字符串利用infer 递归转成数组
 * 2. 然后使用返回数组长度的方式获取字符串长度
 */
type StrSplit<T extends string> = T extends `${infer R}${infer Rest}` ? [R, ...StrSplit<Rest>] : [];
type StringLen<T extends string> = StrSplit<T>['length'];
// type str = '123';
// type strLen = StringLen<str>;

// 30. Flatten 扁平化数组
/**
 * 1. 如果infer R 为数组类型 则使用... 将R展开并递归使用Flatten
 */
type Flatten<T extends unknown[]> = T extends [infer R, ...infer Rest]
  ? R extends unknown[]
    ? Flatten<[...R, ...Rest]>
    : [R, ...Flatten<Rest>]
  : [];
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>;

// 31. AppendToObject
/**
 * 1.限制第一个泛型为对象类型  T extends {[k in string] : any}
 * 2. 这里有一个点没有想到过： 一直使用的都是 Key in T  没想到过可以使用联合类型的方式增加key 的循环范围
 * [Key in keyof T | K]
 */
type AppendToObject<T extends { [K in string]: any }, K extends string, V> = {
  [Key in keyof T | K]: Key extends K ? V : T[Key];
};
type Test1 = { id: '1' };
type Result = AppendToObject<Test1, 'value', 4>;

// 32.Absolute
// 这里主要是利用`` 将泛型转为字符串类型 然后 使用 infer 取非- 的值
type Absolute<T extends string | bigint | number> = `${T}` extends `-${infer R}` ? `${R}` : `${T}`;

// 33.StringToUnion
type StringToUnion<T extends string> = T extends `${infer F}${infer R}` ? F | StringToUnion<R> : never;
type Test3 = '123';
type Result1 = StringToUnion<Test3>;

type Exclude<T, U> = T extends U ? never : T;

type Includes<T extends unknown[], U extends string> = T extends [infer F, ...infer Rest]
  ? Equal<F, U> extends true
    ? true
    : Includes<Rest, U>
  : false;

type Readonly2<T, U extends keyof T> = {
  readonly [P in U]: T[P];
} & {
  [P in Exclude<keyof T, U>]: T[P];
};

type LookUp2<T extends { type: string }, U extends string> = T extends any ? (T['type'] extends U ? T : never) : never;
