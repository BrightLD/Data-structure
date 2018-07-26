//多维数组的扁平化方式
var ary=[1,[2,[3,[4]]]];
//方法一：利用toString()将多维数组强制转换为字符串，调用split()方法将其转化为数组,限制是数组中的必须全部是数字
var temAry=ary.toString().split(",");
console.log(temAry);//["1", "2", "3", "4"]
 var result=temAry.map(function (item,index) {
    return +item;
});
console.log(result);


/* 方法二:利用reduce()方法来实现,但是reduce方法存在着局限性，只能是一维数组的扁平化；
reduce函数的第二个参数要传递一个数组，利用数组的concat方法将里面的每一项拼入新的数组中*/
var ary2=[1,2,3,[4],[5]];
var ary2Temp=ary2.reduce(function (prev,next) { 
    return prev.concat(next)  },[])
console.log(ary2Temp);

var ary3=[1,2,3,[9],[3],[8,[7]]];
var result3=[].concat.apply([],ary3);
console.log(result3);

// flatten函数来判断数组中是否含有数组，有的话将其解构出来，再和数组进行拼接
function flatten(ary) {
    while(ary.some(item=>Array.isArray(item))){
        ary=[].concat.apply([],ary);
        // ary=[].concat(...ary)
    }
    return ary
}
console.log(flatten(result3));






