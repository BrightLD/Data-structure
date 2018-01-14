/*call继承：只能让子类的实例继承父类的私有属性和方法，
* 原理：在创建子类的的实例的时候，把父类当做普通的函数执行，让函数中的this变成当前子类的实例（使用call修改this），此时在父类函数体中写的this.xxx=xxx这些私有属性和方法都被子类的实例继承了。
*/
//定义一个parent类
function Parent() {
    this.name = "wgh";
    this.age = 23
}
//在类的prototype原型上面增加一个方法，这上面的方法和属性都是共有的。
Parent.prototype.sayName = function () {
    console.log("parent");
}
function Child() {
    this.y = 100;
    Parent.call(this)
}
Child.prototype.sayAge = function () {
    console.log("child");
};
var p1 = new Child();
console.log(p1.name);
console.log(p1.age);

