let str = "  guanghui  ";
let  str1 = "  my name is wang guang hui ";

//这种方法只能除去字符中间没有空格的这种格式，如果有空格的话就会背道而驰了。
String.prototype.delSpace = String.prototype.delSpace || function () {
    let  item = this.replace(/\s/g, "");//\s匹配空白符
    console.log(item.length);
    return item;
};
console.log(str.delSpace());
//字符串的trim方法就很好的实现了,实现myTrim方法的封装，
String.prototype.myTrim = String.prototype.delSpace || function () {
    let  item = this.replace(/(\^s*)|(\s*$)/g, "");//\s匹配空白符
    console.log(item.length);
    return item;
};
console.log(str1.myTrim());
/*
* 正则中的量词修饰符
* *：{0，}
* +：{1，}
* ?：{0,1}
* */
