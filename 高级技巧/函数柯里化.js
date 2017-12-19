/*函数柯里化:
 定义：函数柯里化的基本方法和普通函数是一样的：使用一个闭包来返回一个函数，两者的区别是在函数瘪掉用的时候，返回的函数还需要传递一些参数。
*/

//我们由普通函数类引申出函数柯里化
function sum(a, b) {
    return a + b;
}

function add(num) {
    return sum(5, num)
}

console.log(sum(2, 3));//5
console.log(add(3));//8

//创建函数柯里化的通用方式
function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var inner = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(inner);
        console.log(finalArgs);
        return fn.apply(null, finalArgs);
    }
}

var fn1 = curry(sum, 5);
console.log(fn1(3));//8
var fn2 = curry(sum, 2, 3);
console.log(fn2());

//升级版的函数柯里化函数
function bind(fn, context) {
    var args = Array.prototype.slice.call(arguments, 2);
    return function () {
        var inner = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(inner);
        console.log(finalArgs);
        return fn.apply(context, finalArgs);
    }
}

//bind函数接受一个函数和一个对象作为该函数的参数，对此我们在函数里面要做的处理就是改变slice克隆数组的起始值即1=>2,当时用bind的时候，它会返回绑定到给定环境的函数。


