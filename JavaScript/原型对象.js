function Parent() {
    this.name = "wgh";
}

// Parent.prototype.age = 23;
// Parent.prototype.name = "王洪彬";
// Parent.prototype.sayAge = function () {
//     console.log(this.age);
// };
// Parent.prototype.sex = "男";

//更简单的语法来重写整个原型对象，不用每一次都写一遍Parent.prototype。但是这样的话完全重写了prototype对象，因此constructor属性就变成了新对象的constructor属性，指向的是Object基类，我们可以手动的配置一下
Parent.prototype={
    constructor:Parent,
    age:23,
    name:"王光辉",
    sayAge:function () {
        console.log(this.age);
    },
    sex:"男"
};
//对constructor可枚举性的处理
Object.defineProperty(Parent.prototype,"construct",{
    enumerable:false,
    value:Parent
});

let p1 = new Parent();

//in方法和for in 方法都可以遍历当前实例的私有属性和方法以及原型对象上面的属性和方法
console.log("name" in p1);//true
console.log(p1.name);//"wgh"
delete p1.name;//删除实例上面的属性
console.log(p1.name);//"王洪彬"
var obj = {};
for (var key in p1) {
    //如果说实例上面的属性和原型对象上面的属性同名了，那么原型对象上面的属性将会被屏蔽。
    obj[key] = p1[key]
}
console.log(obj);
//ECMAScript5中的Object.keys()方法接受一个对象作为参数返回一个包含所有可以枚举属性的字符串数组
console.log(Object.keys(Parent.prototype));
//getOwnPropertyNames包含了实例所有的属性，无论他是否可以枚举
console.log(Object.getOwnPropertyNames(Parent.prototype));
//[ 'constructor', 'age', 'name', 'sayAge', 'sex' ]
