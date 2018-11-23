//冒泡排序的算法思想：
/*比较相邻的元素。如果第一个比第二个大，就交换他们两个。
对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
针对所有的元素重复以上的步骤，除了最后一个。
持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较*/
var ary = [4,1,3,2];

function bubbleSort(ary) {
    //外层循环控制循环的次数，例如：数组长度为3的话，需要比较2次
    for (var i = 0; i < ary.length - 1; i++) {
        console.log(i,"iiiii")
        // 第一轮循环之后，最大的数已经在最后面了，下次就不需要再比较了额
        for (var j = 0; j < ary.length - i - 1; j++) {
            console.log(j,"jjjjj");
            console.log(i,"里面的iii");
            if (ary[j] > ary[j + 1]) {
                var temp = ary[j];
                ary[j] = ary[j + 1];
                ary[j + 1] = temp
            }
        }
    }
    return ary;
}

console.log(bubbleSort(ary));
 