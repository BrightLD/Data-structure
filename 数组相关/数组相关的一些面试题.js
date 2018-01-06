//1. 找出正数组中的最大差值例如：[1,2,37,38,91,33,233,23]
var ary = [1, 2, 37, 38, 91, 33, 233, 23]

//es6的解构赋值
function find(ary) {
    return Math.max(...ary) - Math.min(...ary)
}

console.log(find(ary));

//sort排序
function find2(ary) {
    ary.sort(function (a, b) {
        return a - b
    });
    return ary[ary.length - 1] - ary[0]
}

console.log(find2(ary));
function find3(ary) {
    let maxNum = Math.max.apply(null, ary);
    let minNum = Math.min.apply(null, ary);
    return maxNum - minNum;
}
console.log(find3(ary));