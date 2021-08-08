// 斐波那契
function fib(n) {
    if (n <= 1) return n;
    return fib( n - 2 ) + fib( n - 1 );
}
console.log(fib(3))
// 相互递归调用
function isOdd(v) {
    if (v === 0) return false;
    return isEven( Math.abs( v ) - 1 );
}

function isEven(v) {
    if (v === 0) return true;
    return isOdd( Math.abs( v ) - 1 );
}

// 循环求和改为递归
function getAll(total, ...nums){
    for(let i =0;i<=nums.length;i++){
        total +=nums[i]
    }
    return total;
}
function diguiAll(toatl, ...nums) {
    if(nums.length === 0) return toatl;
    return toatl + diguiAll(...nums) // 将nums初始数组 变成了 (nums[0], ...nums)
}