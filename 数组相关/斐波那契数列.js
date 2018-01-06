//斐波那契数列[0,1,1,2,3,5,8,13,21],写一个斐波那契数列数列,传递一个参数n来规范数组的长度，在里面我们定义一个起始变量i用来定义数组的前两项
//feibo[i]=feibo[i-1]+feibo[i-2](i>=1)

function feibo(n) {
    //定义一个临时数组用来存放我们的队列
    let item=[];
    var i=0;
    while(i<n) {
        if (i <= 1) {
            item.push(i)
        }
        else {
            item.push(item[i-1] + item[i-2])
        }
        i++;
    }
    return item
}
console.log(feibo(7));