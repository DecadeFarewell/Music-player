
(function ($, root) {
    //渲染总时间  进度条运动
    var curDuration;
    var frameId = true;
    var startTime;
    var lastPeriod = 0;

    function renderAllTime(duration) {
        curDuration = duration;
        duration = formatTime(curDuration)
        $('.all-time').html(duration)
    }

    //将总秒数转换成 分：秒的形式
    function formatTime(duration) {
        var t = Math.round(duration)
        var min = Math.floor(t / 60)
        var sec = t % 60;
        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        return min + ':' + sec;
    }
    //歌曲播放 开始时间增加
    function start(per) {
        lastPeriod = per === undefined ? lastPeriod : per * curDuration *1000;
        //记录下点击播放时的时间
        startTime = new Date().getTime();
        function frame() {
            //记录当前时间
            var curTime = new Date().getTime();
            //计算时间差，并计算出与歌曲总时长的百分比
            var percent = (lastPeriod + curTime - startTime) / (curDuration * 1000);
                update(percent)
                if(frameId){
                    frameId = requestAnimationFrame(frame)
                }
        }
        frame();
    }

    function update(per) {
        var curTime = curDuration * per;
        curTime = formatTime(curTime);
        $('.cur-time').html(curTime)
        var proX = (per - 1) * 100;
        $('.pro-top').css({
            transform: `translateX(${proX}%)`
        })
    }

    //清除requestAnimationFrame
    function stop() {
        console.log('stop的',frameId)
        cancelAnimationFrame(frameId)
        console.log('停下来');
        console.log(frameId)
        //记录停止时间
        var stopTime = new Date().getTime();
        //从播放到停止的时间段，保留下来
        lastPeriod += (stopTime - startTime);
    }

    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        upDate: update
    }

})(window.Zepto, window.player || (window.player = {}))
