/**
 * 用闭包
 * @type {function(string,boolean):number}
 */
let function1;
/**
 * @type {(s:string, b:boolean) => number}
 */
var function2;

/**
 * @typedef {object} Animal - 这是自定义的Animal类型
 * @property {string} name 复杂类型的一个string类型属性
 * @property {number} age 复杂类型的一个number类型属性
 * @prop {boolean} [hasOwner] 复杂类型的一个boolean类型属性，可选
 * @property {string[]=} toys 复杂类型的一个string数组属性，可选
 * @prop {string} [ownerName='xyz'] 复杂类型的一个string类型属性，默认值为xyz, 可选
 *
 */

/**
 * @type {Animal}
 */
var animal = { name: 'miao', age: 2, hasOwner: false };
/**
 * @callback Predicate
 * @param {string} data
 * @param {number} [index]
 * @returns {boolean}
 */
/** @type {Predicate} */
const ok = (s) => !(s.length % 2);

/**
 * @param {string}  name - string类型参数
 * @param {string=} age - 可选参数，number类型
 * @param {number} [hasOwner] - 可选参数，number类型
 * @param {string} [ownerName="xyz"] - 带默认值的可选参数
 * @return {string} 这是返回值
 */
function getAnimal(name, age, hasOwner, ownerName) {
  // TODO
}
/**
 * @enum
 * @property {string} FileType.Image 图片
 * @property {string} FileType.Video 视频
 * @property {string} FileType.Audio 音频
 * @property {string} FileType.Accessory 附件
 * @description enum 类型需要配合property 去定义
 */
export const FileType = {
  /** 图片 */
  Image: '1',
  /** 视频 */
  Video: '2',
  /** 音频 */
  Audio: '3',
  /** 附件 */
  Accessory: '4',
};

/**
 * @constructor
 * @param {number} width 宽度
 * @param {number} height 高度
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};
//  必须要通过new来调用，不然编辑器会报错
var rectrangele = new Rectangle();

/**
 * @this {HTMLElement}
 * @description 一些场景没法很好的做出推断，通过使用@this可以帮助我们来显式指定 this 的类型。
 */
function getScrollbarWidth() {
  return this.offsetWidth - this.scrollWidth;
}

/**
 * @param {T} x
 * @param {S} y
 * @template {number|string} T
 * @template {number|string} S
 */
function foo(x, y) {
  x = y;
}
