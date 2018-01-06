//数组去重的思路：
// 首先我们拿到数组相对居中的那一项，并将其从数组中删除，然后让数组中的每一项和删除的这一项进行比较，当前项小于删除的那一项的话，我们把它放在leftAay，否则放在lightAry中，quickSort函数返回结果是递归的循环我们lightAry和rightAry，采用数组的concat方法将其拼接起来。

var ary = [2, 3, 3, 1, 5, 4, 6, 9, 10];

function quickSort(ary) {
    //如果说数组的长度小于或者等于一的话不用执行下面的递归了。
    if (ary.length <= 1)
        return ary;
    //取得数组相对中间的那一项
    var midIndex = Math.ceil(ary.length / 2);
    console.log(midIndex);
    //删除索引为midIndex的那一项，在这里我们调用的是数组上面的slice方法，返回的是一个数组，包含了删除的那一项，我们通过索引[0]来取到对应的值。
    var delItem = ary.splice(midIndex, 1)[0];
    console.log(delItem);
    var leftAry = [];
    var lightAry = [];
    for (var i = 0; i < ary.length; i++) {
        var cur = ary[i];
        cur > delItem ? lightAry.push(cur) : leftAry.push(cur);
    }
    //递归的思想
    return quickSort(leftAry).concat(delItem, quickSort(lightAry));
}

console.log(quickSort(ary));