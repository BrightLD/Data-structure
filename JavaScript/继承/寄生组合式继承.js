//ES5中的类的定义是通过函数
function Parent() {
    this.age = "wgh";
}
//ES6中类的定义是通过class关键字来定义的，实际上的采用的原理是寄生组合式继承
class Child{
    constructor(){
        Parent.call(this)
    }
    toString(){}

}
console.log(Child.prototype.constructor === Child);
//寄生组合式继承，是指通过借用构造函数来继承属性，通过原型链的混合形式来继承方法
function inherit(Child,parent) {
    /*var prototype=Object(parent.prototype);//创建对象
    prototype.constructor=child;
    child.prototype=prototype*/
    Child.prototype={...parent.prototype,constructor:Child};
}
inherit(Child,Parent);
Child.prototype.fn=function () {
    console.log(1);
}
var p1=new Child();
console.log(p1);