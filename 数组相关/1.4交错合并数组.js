var ary=["A","B","C","D"];
var ary2=[1,2,3,4,5,6,];
function aryJoinAry(ary,ary2) {
    var itemAry=[];
    var minLength;
    //先拿到两个数组中长度较短的那个数组的长度
    if(ary.length>ary2.length){
        minLength=ary2.length;
    }
    else{
        minLength=ary.length;
    }
    //将两个数组中较长的数组记录下来
    var longAry=arguments[0].length>arguments[1].length?arguments[0]:arguments[1];
    //循环范围为较短的那个数组的长度
    for (var i = 0; i < minLength; i++) {
        //将数组放入临时数组中
        itemAry.push(ary[i]);
        itemAry.push(ary2[i])
    }
    //itemAry和多余的新数组拼接起来并返回。
    return itemAry.concat(longAry.slice(minLength));
}
console.log(aryJoinAry(ary, ary2));