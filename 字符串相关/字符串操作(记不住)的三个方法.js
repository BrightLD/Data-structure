let str = "0123456789";
// 字符串中的三个方法substr()、substring()、slice()
// 不考虑负数的情况下 1个参数都一样


// 警告：尽管 String.prototype.substr(…) 没有严格被废弃 (as in "removed from the Web standards"), 但它被认作是遗留的函数并且可以的话应该避免使用。它并非JavaScript核心语言的一部分，未来将可能会被移除掉。如果可以的话，使用 substring() 替代它.
console.log(str.substr(1));//123456789
console.log(str.substring(1)); //123456789
console.log(str.slice(1)); //123456789

// 两个参数substr不一样
// substr 表示从索引为1 的地方截取5个字符
console.log(str.substr(1,1));//12345
// substring、slice表示从索引为1的地方截取到索引为5的地方
console.log(str.substring(1,1)); //1234
console.log(str.slice(1,5)); //1234
// 数组中也有slice方法,和字符串的效果是一样的,操作的对象都是不变的。
let numbers = [0,1,2,3,4,5,6];
let ary = numbers.slice(0,3)
console.log(ary);//[0,1,2]
console.log(numbers);//[0,1,2,3,4,5,6]


console.log(str.substr(-1));//9
// substring 如果任一参数小于 0 或为 NaN，则被当作 0。
console.log(str.substring(-1,-5)); //0123456789
console.log(str.slice(-1)); //9