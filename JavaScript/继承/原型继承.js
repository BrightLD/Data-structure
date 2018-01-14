/*原型继承：父类的私有属性和方法都被子类的实例继承了，而且都变成而来子类实例的公有属性和方法
* 原理：让子类的原型等于父类的实例（父类的实例能拥有父类的私有和公有的属性和方法），这样子类的实例同时也能拥有父类的私有和公有的属性和方法；但是原型继承和遗传不一样，遗传是相当于把父亲的东西克隆一份给子类，原型继承仅仅是让子类和父类之间建立了连接通道，子类的实例依然使用的是父类的公有方法，依然在父类的原型上面，使用的时候是通过原型链的机制进行查找的。
*
* 弊端：不管是父类公有的还是私有的都变成了子类公有的了。
* */
//父类
function Parent() {
    this.age=23;
    this.name="wgh";
}
Parent.prototype.getAge=function () {
    console.log(this.age);
};
//子类
function Child() {
    this.sex="男"
}
Child.prototype=new Parent();
Child.prototype.constructor=Child;
Child.prototype.getSex=function () {
    console.log(this.sex);
};
var p1=new Child();
console.log(p1);