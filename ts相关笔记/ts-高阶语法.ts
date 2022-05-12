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
const forEach = <T>(arr: T[], callback: Callback1<T>) => {
  for (let i = 0; i < arr.length - 1; i++) {
    callback(arr[i]);
  }
};
forEach<string | number>(['1', 2, 3, '4'], (item) => {});

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
