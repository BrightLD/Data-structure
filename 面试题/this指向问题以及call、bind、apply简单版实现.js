// 2022 3.8

// 在ES5 中所谓的this其实可以理解为一个指针：this永远指向最后调用它的那个对象
// 1. 普通函数中this指向的window
function test() {
    console.log(this);
}
test(); //window
// 2. 以obj.fn()调用的时指向的obj
let foo = function () {
    console.log(this.name);
}
let obj = {
    name: "wgh",
    sayName: function () {
        console.log(this.name);
    },
    foo: foo
}
obj.sayName();
obj.foo();
// 3 .箭头函数中的this指向的是定义时的this，而不是执行时的this。
var obj2 = {
    x: 100, //属性x
    show() {
        //延迟500毫秒，输出x的值
        setTimeout(
            //匿名函数
            function () {
                console.log(this.x)
            },
            500
        );
    }
};
obj2.show(); //打印结果：undefined

var obj3 = {
    x: 100, //属性x
    show() {
        //延迟500毫秒，输出x的值
        setTimeout(
            //匿名函数
            () => {
                console.log(this);//{x:100,show:f}
                console.log(this.x)
            },
            500
        );
    }
};
obj3.show(); 

// call()使用一个指定的this值和单独给出的一个或者多个参数来调用一个函数
let a = {
    name: "wgh",
    fn: (a, b) => a + b
}
var b = a.fn;
b.apply(a, [1, 2]); //3


// apply() 方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

let numbers = [1, 2, 3, 4, 5, 6, ];
const max = Math.max.apply(null, numbers); //6


// bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

let a1 = {
    name: "wgh",
    fn: (a, b) => a + b
}
var b1 = a1.fn;
//bind是改变了this的指向，创建了一个新的函数，执行需要我们调用
b1.bind(a1, [1, 2])(); //3

