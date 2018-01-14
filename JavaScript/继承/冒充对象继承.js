/*
* 冒充对象继承：我们设置一个对象来充当父类的实例，然后我们使用for in循环遍历当前实例，可以把父类的公有或者私有的属性和方法，放在子类的任何地方，
(这个种继承方式一般不用)
* */

//父类
function Parent() {
    this.age = 23;
    this.name = "wgh";
}
Parent.prototype.getAge = function () {
    console.log(this.age);
};
function Child() {
    this.sex = "男";
    var obj = new Parent();
    //for in 循环遍历对象既可以遍历父类的公有属性和方法也会遍历私有属性和方法，还会沿着原型链进行遍历，我们可以使用对象的hasOwnPrototype(对象的私有属性)来进行遍历限制。
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            this[key] = obj[key]
        }
        else {
            Child.prototype[key] = obj[key]
        }
    }
}
Child.prototype.getSex = function () {
    console.log(this.sex);
};
var p1 = new Child();