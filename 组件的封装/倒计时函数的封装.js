/**
 *@author:BrightLD
 *
 */
function downTime() {
    // 获取当前日期,指的是系统本机的时间
    var dataNow = new Date();
    // 确定目标日期
    var dataEnd = '2018/09/30 00:00:00';
    // 确定当前时间和目标时间的毫秒差
    var time = new Date(dataEnd).getTime() - dataNow.getTime();
    // 将毫秒转换为秒
    time = parseInt(time / 1000);
    console.log(time);
    
    // 设置一个定时器
    var timer = setInterval(function () {
        // 如果时间大于0的话，每秒减少一
        if (time > 0) {
            time--;
        } else {
            // 将时间置为0，清除定时器
            time = 0;
            clearInterval(timer);
        }
        //1天24个小时，一小时对应3600秒
        var d = Math.floor(time / 3600 / 24);
        // 计算所有毫秒对应的小时数，%（取余）就是当天没有走完的那些小时
        var h = Math.floor(time / 3600 % 24);
        // 计算素有毫秒对应的分钟数取余就是当天没有走完的那些分钟
        var m = Math.floor(time / 60 % 60);
         // 计算素有毫秒对应的分钟数取余就是当天没有走完的那些秒
        var s = Math.floor(time % 60);

        $('.span1').html(Math.floor(d / 10));
        $('.span2').html(d % 10);

        $('.span3').html(Math.floor(h / 10));
        $('.span4').html(h % 10);

        $('.span5').html(Math.floor(m / 10));
        $('.span6').html(m % 10);

        $('.span7').html(Math.floor(s / 10));
        $('.span8').html(s % 10);
    }, 1000);

}
downTime();