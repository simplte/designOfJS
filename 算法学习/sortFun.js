// 冒泡排序
function MP(arr = [], flag = 1) {
    let len = arr.length;
    for(let i = 0 ;i < arr.length -1 ; i++ ) {
        for(let j = 0; j<arr.length -1 - i; j++) {
            if(arr[j] > arr[j+1]) {
                [arr[j], arr[j +1] ] = [arr[j+1], arr[j]]
            }
        }
    }
    return flag ? arr : arr.reverse()
}


let  ar = [1,2,3,4,1,2]
console.log(MP(ar))

// 快速排序
function sortQuick(arr,flag) {
    if(arr.length <= 1) return arr;
    let mid = Math.floor(arr.length/2);
    let midVal = arr.splice(mid,1)[0];
    let leftArr = [],
        rightArr = [];
    for(let i=0;i<arr.length;i++) {
        if(arr[i] < midVal) {
            leftArr.push(arr[i])
        }else{
            rightArr.push(arr[i])
        }
    }
    return sortQuick(leftArr).concat([midVal], sortQuick(rightArr))

}
console.log(sortQuick([5,4,2,6,3,21,6,2]))

// 并轨排序
function mergeFun(leftArr, rightArr) {
    let sortArr = [];
    while(leftArr.length && rightArr.length) {
        if(leftArr[0]> rightArr.length[0]) {
            sortArr.push(rightArr.shift())
        }else {
            sortArr.push(leftArr.shift())
        }
    }
    while(leftArr.length) {
        sortArr.push(leftArr.shift());
    }
    while(rightArr.length) {
        sortArr.push(rightArr.shift())
    }
    return sortArr;
}

function mergeSort(arr) {
    if(arr.length <= 1) return arr;
    let mid = Math.floor(arr.length/2);
    let leftArr = arr.slice(0,mid);
    let rightArr = arr.slice(mid);
    let mergeLeftArr = mergeSort(leftArr); // 使用递归 将数组从拆成长度1的数组，通过mergeFun比较合并  然后一层一层往上return排好序的左右数组  最后通过mergeFun比较左右数组的大小  合并出排好序的数组
    let mergeRightArr = mergeSort(rightArr);

    return mergeFun(mergeLeftArr,mergeRightArr)
}

// 插入排序

function charufunc(arr) {
    let len = arr.length;
    for(let i =0;i <len; i++) {
        let cur = arr[i];
        let preIdx = i - 1;
        while(preIdx >0 && cur < arr[preIdx]) {
            arr[preIdx + 1] = arr[preIdx];
            preIdx--;
        }
        arr[preIdx + 1] = cur;
    }
    return arr;
}
console.log(charufunc([1,2,7,1,14,,0]))

// 选择排序
function selSort(_arr) {
    let len = _arr.length;
    let sp  = 0;
    for(let i =0; i<len; i++){
        sp =i;
        for(let j = i +1 ;j< len;j++) {
            if(_arr[j] < _arr[sp]) {
                sp = j
            }
            if(sp != i) {
                [_arr[i],_arr[sp]] = [_arr[sp],_arr[i]]
            }
        }
    }
    return _arr;
}
console.log(selSort([1,2,3,1,2,14,1,24,2]))