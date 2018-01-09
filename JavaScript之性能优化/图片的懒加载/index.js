/*
延迟加载的优点：
当一个网页中有很多的图片的时候，打开页面的时候需要将页面中的全部图片都进行加载，如果网速慢的话，会导致很长的加载时间，造成用户体验差。通过懒加载，我们有选择性的加载图片，提高了用户体验，减小了服务器的压力。*/
function lazyLoad() {
    var images = document.getElementsByTagName("img");
    var n = 0; // 用于存储图片加载到的位置，避免每次都从第一张图片开始遍历
    return function () {
        console.log(1);
        var seeHeight = document.documentElement.clientHeight;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        for (var i = n; i < images.length; i++) {
            if (images[i].offsetTop < seeHeight + scrollTop) {
                if (images[i].getAttribute("src") === '') {
                    images[i].src = images[i].getAttribute('data-src');
                }
                n = n + 1;
            }
        }
    }
}

//一定要注意函数本身并不等于函数执行，lazyLoad()后返回的的是一个函数，只有将这个函数执行后，才能让第一张图片正常显示。
lazyLoad()();
window.addEventListener('scroll', throttle(lazyLoad()), false);

/*我们通过scroll事件来触发函数执行，scroll事件会频繁的触发dom操作可能会导致浏览器挂起，有时候甚至崩溃，我们可以通过函数节流来控制。
* 函数节流：某些代码不可以在没有间断的情况下连续执行
* 可以使用定时器对函数进行节流。
* */
function throttle(method, context) {
    clearTimeout(method.timer);
    return function () {
        //给函数增加一个timer属性，这个属性的值对应的为一个定时器，将传进来的函数执行。
        method.timer = setTimeout(function () {
            method.call(context)
        }, 300)
    }
}



