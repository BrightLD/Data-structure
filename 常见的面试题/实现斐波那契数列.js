/* 斐波那契数列指的是这样一个数列 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89,....
这个数列从第3项开始，每一项都等于前两项之和。 */

//求斐波那契数列第m项的值，使用递归
function feiBoNaQie(m){
    if(m===1||m===2){
        return 1
    }
     return arguments.callee(m-1)+arguments.callee(m-2)
    }
console.log(feiBoNaQie(6));//8
/* 使用上面这种方式的话，效率会很低，假设函数为f，f(10),需要计算f(9)、f(8)、求f(9)的话，需要计算f(8)、f(7) ，将其想象为一个树形结构，会发现在这个结构中存在着很多的重复节点，而且重复的节点数会随着m的增大而急剧增大*/

 //使用循环来实现,中间的数值得到了保存，速度得到了提升，但是定义的变量有点多
 function goodFeiBo(n){
    if(n<0){
        throw("参数不能小于0");
    }
    var starNum =1;
    var midNum=1;
    var end;
    if(n===1||n===2){
        return 1
    }
    else{
        //1,1,2,3,5
        for(var i=2;i<=n;i++){
            end=starNum+midNum;
            starNum=midNum;
            midNum=end               
        }
    }
    return end
 }
 console.log(goodFeiBo(10));