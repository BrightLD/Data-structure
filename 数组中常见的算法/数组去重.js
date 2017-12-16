//方法一：
// 实现思路：首先我们需要的是一个临时的空数组，将我们要去重数组的第一项放进去（第一项是不可能重复的;然后循环数组中的每一项，看看每一项在临时数组中是否存在，存在的话我们将其放在临时数组，最后返回临时数组即可）
var ary = [12, 1, 1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 8, 789];
Array.prototype.myUnique = function myUnique() {
    var itemAry = [];
    itemAry[0] = ary[0];
    for (var i = 1; i < ary.length; i++) {
        if (itemAry.indexOf(ary[i]) === -1) {
            itemAry[itemAry.length] = ary[i]
        }
    }
    return itemAry;
};
ary.myUnique();

// ps：数组中的方法indexOf()方法不兼容IE6-8，因此需要继续完善,数组中的indexOf方法不兼容IE低版本浏览器但是字符串中的indexOf兼容

//方法二：
//实现思路： 新创建一个临时对象，循环数组中的每一项，让数组的每一项对应临时对象的key，如果key的值为undefined的时候，就会进去循环，我们给当前key设置一个对应的值（随便设置），后来循环执行的时候，如果key有属性值，说明当前项已经存在了，从而达到了去重的目的。
Array.prototype.myUnique1 = function myUnique() {
    var itemAry = [];
    var itemObj = {};
    for (var i = 0; i < ary.length; i++) {
        if (!itemObj[ary[i]])
        /*代码分析；
        第1次循环：itemObj[12]=undefined
        第2次循环：itemObj[1]=undefined
        第3次循环：itemObj[1]=1此时条件不成立，所以不会进入到循环之内，也
        ......
        */
        {
            itemObj[ary[i]] = 1;
            itemAry[itemAry.length] = ary[i];
        }
    }
    return itemAry;
};
ary.myUnique1();


//方法三：
// 实现思路：将数组进行排序（升序降序都可以），数组的最后一项和其前一项进行比较，重复的话删除后面的那一项；小技巧循环的时候，为了防止删除的时候产生的数组塌陷问题，我们倒过来循环即可实现。
Array.prototype.myUnique2 = function myUnique2() {

    var itemAry = ary.sort((function (a, b) {
        return a - b;
        //数组按照升序排列
    }));
    ary = JSON.parse(JSON.stringify(ary));
    //保证了原来数组没有被修改，提示：JSON方法也是不兼容IE低版本浏览器的。
    for (var i = itemAry.length - 1; i >= 0; i--) {
        //这样可以防止数组塌陷的问题
        if (itemAry[i] === itemAry[i - 1]) {
            itemAry.splice(i, 1);
        }
    }
    return itemAry;
};
ary.myUnique2();

//方法四：
//实现原理：利用ES6的新增的数据结构set来实现,Set函数类似于数组，但是他的每一项都是唯一的，没有重复的值。Set接受一个数组作为参数,Set是一个构造函数。
let itemAry = [...new Set(ary)];
// 返回的结果是一个set(a){}a代表去重后对象的length





