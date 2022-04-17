// 获取数组中所有排列组合的结果
let permute = function (nums) {
  let res = [];
  if (nums.length === 0) return res;
  let used = {},
    path = [];
  dfs(nums, nums.length, 0, path, used, res);
  return res;
};
const dfs = function (nums, len, depth, path, used, res) {
  // 所有数都填完了
  if (depth === len) {
    res.push([...path]);
    return;
  }
  for (let i = 0; i < len; i++) {
    if (!used[i]) {
      //  动态维护数组
      path.push(nums[i]);
      used[i] = true;
      dfs(nums, len, depth + 1, path, used, res);
      used[i] = false;
      path.pop();
    }
  }
};

function permute(nums) {
  let res = [],
    used = {}, // 记录数字中数据是否被排序过
    path = []; // 记录每次循环数组数据排列的结果
  if (nums.length == 0) return res;
  dfs(nums, nums.length, 0, path, used, res);
  return res;
}
/**
 *
 * @param {*} nums
 * @param {*} len
 * @param {*} depth 记录每次循环执行到数组中某个数据的位置
 * @param {*} path  记录每次循环数组数据排列的结果
 * @param {*} used  记录数字中数据是否被排序过
 * @param {*} res
 * @returns
 */
function dfs(nums, len, depth, path, used, res) {
  if (depth == len) {
    res.push([...path]);
    return;
  }
  for (let i = 0; i < len; i++) {
    if (!used[i]) {
      path.push(nums[i]);
      used[i] = true;
      dfs(nums, len, depth + 1, path, used, res);
      used[i] = false;
      path.pop();
    }
  }
}
console.log(permute([1, 2]));

// 生成规定数量的括号数量
const generateP = (n) => {
  const res = [];
  const dsf = (path, l, r) => {
    // 当前是否还有 ( 可以选择, 已选择的结果里的 ( 小于等于已选择里的 ) 时，此时是不能选择 ) 的
    if (l > n || l < r) {
      return;
    }
    if (l + r == n * 2) {
      res.push(path);
      return;
    }
    console.log(l);
    dsf(path + '(', l + 1, r);
    dsf(path + ')', l, r + 1);
  };
  dsf('', 0, 0);
  return res;
};
//        path    l  r
// 上   1 (       1  0
// 下   5 (())
// 上   2 ((      2  0
// 下   4 (()     2  1
// 上   3  return 3  0
console.log(generateP(2));
