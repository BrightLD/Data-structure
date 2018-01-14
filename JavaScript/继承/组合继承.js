/*组合继承：call继承+原型继承
* 父类的私有的在子类的私有和公有上面各有一份有点重复，这就是组合继承的缺点
* */
function Parent() {
    this.age=23
}
Parent.prototype.getAge=function () {
    console.log(this.age);
};
function Child() {
    this.name="wgh";
    Parent.call(this)
};
Child.prototype=new Parent();
Child.prototype.constructor=Child;
Child.prototype.getName=function () {
    console.log(this.name);
};
var p1=new Child();