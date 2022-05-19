// 接口中泛型的位置
// 泛型接口表示一个类， 返回的实例对象 诎诘语使用接口时的传入
interface IPerson<T> {
  new (...args: unknown[]): T;
}
function getInstance<T>(Clazz: IPerson<T>) {
  return new Clazz();
}

class Person {}
const person = getInstance(Person);

// tips
// 当泛型出现在接口中时，比如interface IPerson<T>
// 代表的是使用接口时需要传入泛型的类型，比如IPerson<T>。

// --------

// 声明一个接口 表示函数 接口里有泛型 函数啥时候调用时啥时候才清楚泛型的具体表示类型
interface OPerson {
  <T>(a: T): T;
}
const getPersonVal: OPerson = <T>(a: T): T => {
  return a;
};
const pv = getPersonVal(2);
// tips
// 当泛型出现在接口内部时，比如例子中的 OPerson接口代表一个函数，接口本身并不具备任何泛型定义。
// 而接口代表的函数则会接受一个泛型定义。
// 换句话说接口本身不需要泛型，而在实现使用接口代表的函数类型时需要声明该函数接受一个泛型参数。

// -------------------------------------------------

// foreach的例子
//  正确的callback接口约束写法
// item 的类型取决于使用类型时传入的泛型参数，在item中是可以静态推断出类型的
type Callback1<T> = (item: T) => void;

// 在声明阶段就已经确定了 callback 接口中的泛型参数为外部传入的
// const forEach = <T>(arr: T[], callback: Callback1<T>) => {
//   for (let i = 0; i < arr.length - 1; i++) {
//     callback(arr[i]);
//   }
// };
// forEach<string | number>(['1', 2, 3, '4'], (item) => {});

// 错误的callback接口约束写法
type Callback = <T>(item: T) => void;

const forEach = <T>(arr: T[], callback: Callback) => {
  for (let i = 0; i < arr.length - 1; i++) {
    // 这里调用callback时，ts并不会执行我们的代码。
    // 换句话说：它并不清楚arr[i]是什么类型
    callback(arr[i]);
  }
};

// 所以这里我们并不清楚 callback 定义中的T是什么类型，自然它的类型还是T
forEach(['1', 2, 3, '4'], (item) => {});

// --------------------------
// 泛型约束-约束泛型/限制泛型,给泛型增加条件
interface IHasLength {
  length: number;
}
function getLength<T extends IHasLength>(arg: T) {
  return arg.length;
}

getLength([1, 2, 3]); // correct
getLength('123'); // correct
// getLength(1);

// ----------------------------------------------------------------

// keyof 关键字
interface IProps {
  name: string;
  age: number;
  sex: string;
}
type Keys = keyof IProps;
const valK: Keys = 'name';
type KeysA = keyof any;
// any 可以代表任何类型。那么任何类型的 key 都可能为 string 、 number 或者 symbol 。
// 所以自然 keyof any 为 string | number | symbol 的联合类型。

// 该函数希望接受两个参数，第一个参数为一个对象object，第二个参数为该对象的 key 。
// 函数内部通过传入的 object 以及对应的 key 返回 object[key] 。
function getObjVal<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
getObjVal({ a: 2 }, 'a');

// 此时由于isNumber函数返回值根据类型谓词的保护
// 所以可以断定如果 isNumber 返回true 那么传入的参数 val 一定是 number 类型
function isNumber(arg: any): arg is number {
  return typeof arg === 'number';
}
function getTypeByVal(val: any) {
  if (isNumber(val)) {
    val.toFixed();
  }
}

// 分发  将联合类型中所有的类型依次带入三目运算中，得到最终结果的集合 这就是分发
// 1：条件类型
type isString<T> = T extends string ? true : false;
let a: isString<'a'>;
let b: isString<1>;

// type GetSomeType<T extends string | number> = T extends string ? 'a' : 'b';

// let someTypeOne: GetSomeType<string>; // someTypeone 类型为 'a'

// let someTypeTwo: GetSomeType<number>; // someTypeone 类型为 'b'

// let someTypeThree: GetSomeType<string | number>; // what ?
// 此时的T并不是一个单独的”裸类型“T 而是 [T]
type GetSomeType<T extends string | number | [string]> = [T] extends string[] ? 'a' : 'b';

// 即使我们修改了对应的类型判断，仍然不会产生所谓的分发效果。因为[T]并不是一个裸类型
// 只会产生一次判断  [string] | number extends string[]  ? 'a' : 'b'
// someTypeThree 仍然只有 'b' 类型 ，如果进行了分发的话那么应该是 'a' | 'b'
let someTypeThree: GetSomeType<[string] | number>;

// 使用分发实现Exclude
type TypeA = string | number | boolean | symbol;
type MyExclude<T, K> = T extends K ? never : T;
type ExcludeSymbolType = MyExclude<TypeA, symbol | boolean>;

// 使用分发实现Exclude
type MyExtract<T, K> = T extends K ? T : never;
type ExtractSymbolType = MyExtract<TypeA, symbol | boolean>;
type ExtractSymbolType1 = Extract<TypeA, symbol | boolean>;

// 循环
// in  关键字的作用类似于 for 循环
// 重新处理 interface类型
interface IProps1 {
  name: string;
  age: number;
  highs?: string;
  info: {
    sex: string;
    weight?: number;
  };
}
type IPropsKey = { [K in keyof IProps1]: boolean };

// 利用 in 实现内置Partial
// Partial：
type IProps2 = Partial<IProps1>;
type MyPartial<T> = { [K in keyof T]?: T[K] | undefined };
type IProps3 = MyPartial<IProps1>;

// Required
type IProps4 = Required<IProps1>;
type MyRequired<T> = { [K in keyof T]-?: T[K] };
type IProps5 = MyRequired<IProps1>;

// Required Partial 只能实现对象类型最外层的标记 自己动手实现
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
type deepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? deepPartial<T[K]> : T[K];
};
type DeepRequired<T> = { [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K] };
type IProps6 = DeepPartial<IProps1>;
const IpV6: IProps6 = {
  name: 'string',
  age: 1,
  info: {
    weight: 1,
  },
};
// const IpV1: IProps3 = {
//   name: 'string',
//   age: 1,
//   info: {
//     weight: 1,
//   },
// };
type IProps7 = DeepRequired<IProps1>;
type IProps8 = Pick<IProps1, 'name'>;
type IProps9 = Omit<IProps1, 'name'>;
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
type MyOmit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };

// =================================================================

// 逆变
/**
 * 1:ts 中多类型包含少类型的声明时  多类型可以赋值给少类型
 *
 * let a1!: { a: string; b: number };
 * let b1!: { a: string };
 * b1 = a1;
 */

let fn11!: (a: string, b: number) => void;
let fn12!: (a: string, b: number, c: boolean) => void;

// fn11 = fn12; // TS Error: 不能将fn2的类型赋值给fn1

let fn1!: (a: string, b: number) => void;
let fn2!: (a: string, b: number, c: boolean) => void;

fn2 = fn1; // 正确，被允许
// 上述函数的参数类型赋值就被称为逆变，参数少（父）的可以赋给参数多（子）的那一个。
// 通过调用的角度来考虑的话恰恰满足多的可以赋给少的兼容性原则
// 上述这种函数之间互相赋值，他们的参数类型兼容性是典型的逆变
/**
 * 个人理解：逆变分两种情况
 * 1：值类型时  多类型可以赋值给少类型
 * 2：函数类型时  少参数不能赋值多参数类型  看似和值类型相反，不过换个角度考虑
 *          如果从调用的角度考虑的话，相当于多参数函数可以调用少参数函数 也是 多可以赋值给少的关系
 */

// 复杂例子
class Parent {}

// Son继承了Parent 并且比parent多了一个实例属性 name
class Son extends Parent {
  public name: string = '19Qingfeng';
}

// GrandSon继承了Son 在Son的基础上额外多了一个age属性
class Grandson extends Son {
  public age: number = 3;
}

// 分别创建父子实例
const son = new Son();

function someThing(cb: (param: Son) => any) {
  // do some someThing
  // 注意：这里调用函数的时候传入的实参是Son
  cb(Son);
}

// someThing((param: Grandson) => param); // error
someThing((param: Parent) => param); // correct
/**
 * GrandSon 传入会调用失败的原因  参考函数逆变的 条件  GrandSon 作为一个class  其实本质上也是
 * 一个函数，因此GrandSon比 Son多了一个参数 age 因此是不被允许的， Parent则满足逆变条件
 */

// ---------------------
// 协变
let fn21!: (a: string, b: number) => string;
let fn22!: (a: string, b: number) => string | number | boolean;

fn22 = fn21; // correct
// fn21 = fn22; // error: 不可以将 string|number|boolean 赋给 string 类型
// 函数类型赋值兼容时函数的返回值就是典型的协变场景
// fn1 函数返回值类型规定为 string，fn2 返回值类型规定为 string | number | boolean 。

// ------------------------
// 待推断类型
// infer 代表待推断类型，它必须和 extends 条件约束类型一起使用。
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
type subType = Flatten<string>;
type subType1 = Flatten<[string, number]>;
// 我们类型定义时并不能立即确定某些类型，而是在使用类型时来根据条件来推断对应的类型
interface IFn {
  (age: number, name: string): void;
}
// 它接受传入一个函数类型作为泛型参数并且会返回这个函数所有的参数类型组成的元祖。
type FnParameters = Parameters<IFn>;
const fnV: FnParameters = [1, '1'];

type MyParameters<T extends (...args: any) => any> = T extends (...args: infer R) => any ? R : never;

// 快速获取元祖中的类型
type ArrToUnion<T extends any[]> = T extends Array<infer R> ? R : never;
type CC = ArrToUnion<[1, '123', true]>;

// as 子句对映射类型中的键进行重新映射
// type MappedTypeWithNewKeys<T> = {
//      [K in keyof T as NewKeyType]: T[K]
//      //            ^^^^^^^^^^^^^
//      //            这是新的语法！
//  }

type Getter<T> = {
  [K in keyof T as `bqc${Capitalize<string & K>}`]: () => T[K];
};
interface Person1 {
  name: string;
  age: number;
  sex: boolean;
}
type FuturePerson = Getter<Person1>;
