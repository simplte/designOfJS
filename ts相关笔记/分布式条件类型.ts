// extends
// 1：对原始类型的进一步收敛，是比原始类型更精确的类型
export type _t1 = 'bqc' extends string ? true : false;
// 2：字面量类型其实就是继承自原始类型
export class LinbuduLiteralType extends String {
  public value = 'Linbudu';
}
// 3：对于基类和派生类的子类型关系
class Base {
  name!: string;
  he!: string;

  constructor(name: string) {
    this.name = name;
  }
}
class Child extends Base {
  age!: string;
}
type _t2 = Child extends Base ? true : false;
const t2v: _t2 = true;

const cv = new Child('bqc');
console.log(cv);

type _t3 = { name: 'bqc'; he: '11' } extends Base ? true : false;
const t3v: _t3 = true;

type _t4 = { name: 'bqc'; age: '11'; sex: false } extends Base ? true : false;
const t4v: _t4 = true;

type _t5 = { age: '11'; sex: false } extends Base ? true : false;
const t5v: _t5 = false;
/**
 * 以上总结：
 * 只要 判断对象中存在 extends 的所有属性 则为true
 */
type _T6 = {} extends {} ? true : false;
const t6v: _T6 = true;

type _T7 = { age: 1 } extends {} ? true : false;
const t7v: _T7 = true;
type _T8 = string extends {} ? true : false;
const t8v: _T8 = true;

// 分布式条件类型
type Extract<T, U> = T extends U ? T : never;

interface BQC {
  b: string;
  q: string;
  c: string;
}
type B = Extract<keyof BQC, 'q' | 'b'>;
type C = Extract<'d', 'q' | 'b'>; // never
const bv: B = 'b';

// 分布式条件类型要发生的前提条件：

// 首先，你得是联合类型
// 其次，你的联合类型需要是通过泛型参数的形式传入
// 最后，你的泛型参数在条件类型语句中需要是裸类型参数，即没有被 [] 包裹

// 分布式条件类型的应用

// 提取 集合T 中也存在于 集合U 中的类型分支，即 T 与 U 的交集
type ExtractM<T, U> = T extends U ? T : never;
// Exclude，提取 集合T 中不存在于 集合U 中的类型分支，即 T 相对于 U 的差集 T有 U没有
type Exclude<T, U> = T extends U ? never : T;
// 移除集合中的 null 与 undefined
type NonNullable<T> = T extends null | undefined ? never : T;
// 并集
type Concurrence<A, B> = A | B;
// 补集： 满足  B 属于 A  得到 A中有 B没有的部分
type Complement<A, B extends A> = Exclude<A, B>;

// 定义对象类型
type PlainObjectType = Record<string, any>;
// 交集
type Intersection<A, B> = A extends B ? A : never;
// 差集
type Difference<A, B> = A extends B ? never : A;
// 对象key得交集 -- 形成key的类型集合
type ObjectKeysInterSection<T extends PlainObjectType, U extends PlainObjectType> = Intersection<keyof T, keyof U> &
  Intersection<keyof U, keyof T>;
interface AG {
  a?: number;
  b: number;
  c: string;
}
interface BG {
  a: number;
  b: number;
  d: string;
}
type ABK = ObjectKeysInterSection<AG, BG>;
const abv: ABK = 'a';

// 对象key的差集 -- 形成key的类型集合
type ObjectKeysDiffence<T extends PlainObjectType, U extends PlainObjectType> = Difference<keyof T, keyof U>;

type PA = Pick<AG, 'a'>;
// 选出属性交集 -- 形成新的类型
type ObjectIntersection<T extends PlainObjectType, U extends PlainObjectType> = Pick<T, ObjectKeysInterSection<T, U>>;
// 选出属性的差集 -- 形成新的类型
type ObjectDifference<T extends PlainObjectType, U extends PlainObjectType> = Pick<T, ObjectKeysDiffence<T, U>>;

// 合并两个类型  形成新的类型 merge
type Merge<T extends PlainObjectType, U extends PlainObjectType> = ObjectKeysInterSection<T, U> &
  ObjectKeysDiffence<T, U> &
  ObjectKeysDiffence<U, T>;

// tips 普通集合交集使用的是 | ，但对象的交集使用的是交叉类型 &

type Pick<T, U extends keyof T> = {
  [P in U]: T[P];
};

type Omit<T, U extends keyof any> = Pick<T, Exclude<keyof T, U>>;

const user = { name: 'amy', age: 18 };
type UserType = typeof user;

function getPersonInfo<T extends keyof UserType>(key: T): UserType[T] {
  return user[key];
}

const userName = getPersonInfo('name'); // string

// 4: 使用 infer 解析url参数为对象类型
type UrlParse<T extends string> = T extends `${infer Key}=${infer Value}&${infer Nextkey}`
  ? { [k in Key]: Value & UrlParse<Nextkey> }
  : T extends `${infer Key2}=${infer Value2}`
  ? { [k in Key2]: Value2 }
  : null;

type U1 = UrlParse<'a=2'>;

// 根据interface类型来定义 函数格式的对象
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
const personCase: PersonGetters = {
  getName: () => {
    return '22';
  },
  getAge: () => {
    return 22;
  },
};
console.log(personCase);
// 最新的ts中 结构出的变量如果前面有_  则会认为 这解构变量标记是未使用的 只会报 second 没有被使用。
// 不知道为什么我本地没有用
function getValues() {
  return ['a', 'b'];
}
const [_first, second] = getValues();

// 常用的工具函数
/**
 * 1: Partial 将传入属性变为可选项
 * 2：Required  将传入属性经过转换后就可以变成必填
 * 3：Readonly 把所有参数变成只读
 * 4：Record 用来快速定义一个对象的 key 和 value 类型的
 * 5：Pick 从前面抽取包含后面的属性
 * 6：Omit 从前面删除包含后面的属性
 * 7：Exclude 过滤出前面独有的属性
 * 8：Extrac 取相交值
 * 9：Parameters 将函数的参数作为元祖类型返回
 * 10：ReturnType 获取函数返回值
 */
