/*编写一个能将非负整数的数组列表中的数字最大化的函数*/
//全都小于10的数，将数组排序，倒过来，替换，强制转换即可。
var ary=[5,9,5,2];
var aryMaxNum=function (ary) {
     var itemAry=ary.sort();
     var revAry=itemAry.reverse();
     var str=revAry.join("");
    return Number(str)
}
console.log(aryMaxNum(ary));
//如果说数组中出现了大于10的数或者大于100的数
var ary=[98,76,56,45,3];
var temp=function (ary) {
    var hry=[];
    var numString=ary.toString().replace(/,/g, "");
    var numArray=numString.split("");
    for (var i = 0; i < numArray.length; i++) {
       hry.push(Number(numArray[i]))
    }
    return aryMaxNum(hry)
}
console.log(temp(ary));
