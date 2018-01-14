var str="123王光辉love";
function getBytes(str) {
    var strLength=str.length;
    var num=strLength;
    for (var i = 0; i < strLength; i++) {
        /*字符串的charCodeAt()方法获取指定索引对应的ASCII码值，汉字的ASCII大于255。*/
        if(str.charCodeAt(i)>255){
           num+=2;
       }
    }
    return num;
}
console.log(getBytes(str));