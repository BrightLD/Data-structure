~function () {
    /* Array.prototype.myBind=function myBind(context) {
         var _this=this;
         var outer=[].slice.call(arguments,1);
         return function () {
            /!* var inner=[].slice.call(arguments);*!/
             _this.apply(context,outer)
         }
     };*/
    function on(curEle, type, fn) {
        //如果说是在标准浏览器下面的话，我们直接调用addEventListener这个方法即可，下面的代码也不用在执行了。
        if ("addEventListener" in curEle) {
            curEle.addEventListener(type, fn, false)
        }
        return;
        //我们利用自定义属性来创建一个事件池，让每一个事件对应一个事件池，
        if (!curEle[type + "poor"]) {
            curEle[type + "poor"] = [];
            //代码如果说能执行到这里说明是在IE浏览器下面运行的，调用的是attachEvent进行监听，我们在这里调用run方法,需要改变this我们通过放在一个函数里面在里面通过call方法来改变this的指向，通过传递我们的事件对象window.event
            curEle.attachEvent("on" + type, function () {
                run.call(curEle, window.event)
            })

        }
        /*
        *     curEle.attachEvent("on"+type,run.myBind(curEle))
        * */
        var ary = curEle[type + "poor"];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) return;
            ary.push(fn)
        }
    }

    function off(curEle, type, fn) {
        if ("removeEventListener" in curEle) {
            curEle.removeEventListener(type, fn, false)
        }
        return;
        var ary = curEle[type + "poor"] || [];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                ary[i] = null;
                break;
            }
        }
    }

    function run(e) {
        if (!e.target) {
            e.target = e.srcElement;
            e.pageX = e.clientWidth + (document.documentElement.scrollTop || document.body.scrollTop);
            e.pageY = e.clientHeight + (document.documentElement.scrollLeft || document.body.scrollLeft);
            e.stopPropagation = function () {
                e.cancelBubble = true;
            }
            e.preventDefault = function () {
                e.stopPropagation = false;
            }
        }

        var ary = this[e.type + "poor"];

        if (ary) {
            for (var i = 0; i < ary.length; i++) {
                var item = ary[i];
                if (!item) {
                    //我们在off的时候将其置为了null，！item=true
                    ary.splice(i, 1);
                    i--;
                    //i--是为了解决数组塌陷的问题
                    continue;
                }
                ary[i].call(this, e)
                //使用call方法来改变this，ie下面没有事件参数，我们需要传递一个。
            }
        }
    }

    //将我们定义的方法暴露在全局，方便自己以后调用
    window.wgh = {
        on: on,
        off: off
    }
}();
window.wgh.on(document.body, 'click', function () {
    console.log('aaa')
});
