//数组求和的几种方式，规定数组的每一项都为数字
let ary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//利用for循环
function sum1(ary) {
    let total = 0;
    for (let i = 0; i < ary.length; i++) {
        total += ary[i];
    }
    return total;
}

console.log(sum1(ary));

//将数组转化为字符串，利用字符串的replace方法，将“，”变为“+”，利用eval方法实现数组的求和
function sum2(ary) {
    return eval(ary.toString().replace(/,/g, "+"))
}

console.log(sum2(ary));

//利用数组的join()，将数组变成以加号连接的字符串，利用eval方法实现数组求和
function sum3(ary) {
    return eval(ary.join("+"))
}

console.log(sum3(ary));

//递归求数组的和，但是要注意在使用递归的时候，一定要设置判断条件，否则就会造成栈内存过大的情况
function sum4(ary) {
    var len = ary.length;
    if (len === 0) {
        return 0
    }
    else if (len === 1) {
        return ary[0];
    }
    else {
        return ary[0] + sum4(ary.slice(1))
    }
}

console.log(sum4(ary));

//函数式变成
function sum5(ary) {
    return ary.reduce(function (prev, cur) {
        return prev + cur
    })
}

console.log(sum5(ary));
