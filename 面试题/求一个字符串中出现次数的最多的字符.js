//求一个字符串中出现次数最多的那个字符
var str = 'aaabbbccc';
var getMost = function (str) {  
    var item = {};
    //这里定义一个空对象来充当一个容器
    for (let i = 0; i < str.length; i++) {
        var element = str.charAt(i);
        // 如果空对象中没有对应的key，我们将其value设置为1;
        if (!item[element]) {
            item[element] = 1
        } else {
            item[element] += 1;
        }
    }
    var maxNum=1;
    var result;
    // 遍历这个对象，取到value最大对应的key
    for (const key in item) {
        if (item.hasOwnProperty(key)) {
           if(maxNum<item[key]){
            maxNum=item[key]
            result= key;
           }
        }
    }
    return result;
}
console.log(getMost(str));