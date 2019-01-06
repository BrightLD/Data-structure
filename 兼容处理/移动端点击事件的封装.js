HTMLElement.prototype.myTap=HTMLElement.prototype.myTap||function (callBack) {
    var myTapStart=0,
        myTapEnd=0,
        timeTap=300;
    this.addEventListener("touchstart",function (e) {
        //获取touchstart事件的时间戳
        console.log(e);
        myTapStart=e.timeStamp;
        let point=e.changedTouches[0];
       this.strX=point.pageX;
       this.strY=point.pageY;
       this.isMove=false;
    },false);
    this.addEventListener("touchmove",function (e) {
        let point=e.changedTouches[0];
        let changeX=point.pageX-this.strX;
        let changeY=point.pageY-this.strY;
        if(Math.abs(changeX)>10||Math.abs(changeY)>10){
            this.isMove=true;
        }
    },false);
    this.addEventListener("touchend",function (e) {
        //获取touchend事件的时间戳
        myTapEnd=e.timeStamp;
        timeTap=myTapEnd-myTapStart;
        if(!this.isMove&&timeTap<=300){
            callBack();
        }
    },false);
};
var box=document.querySelector("#box");
box.myTap(function () {
    console.log("这个是我封装好的单击事件myTap");
});
