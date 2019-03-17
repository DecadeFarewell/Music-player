
var root = window.player;
var dataList;
var len;
var audio = root.AudioManager;
var control = null;
var timer = null;
var pro = root.pro
var dutation;

console.log(root)
//获取数据
function getData(url){
    $.ajax({
        type: "get",
        url: url,
        success: function (data) {
            console.log(data)
            dataList = data;
            len = data.length;
            control = new root.controlIndex(len);
            root.render(data[0])
            audio.getAudio(data[0].audio)
            duration = data[0].duration
            pro.renderAllTime(duration)
            root.playList.renderList(data)
            bindEvent();
            bindTouch();
        }
    });
}

//给控制按钮绑定事件
function bindEvent(){
    //自定义事件--根据索引切歌
    $('body').on('play:change',function(e,index){
        //获取到音频资源
        audio.getAudio(dataList[index].audio)
        //获取总时间， 因为在后面的拖动中还会用到，所以保存到全局
        duration = dataList[index].duration
        //渲染歌曲总时间
        pro.renderAllTime(duration)
        if(audio.status == 'play'){
            audio.play();
            //播放之后时间开始增加
            pro.start(0);
            //这个是rotate里面是异步的，下面第53行会先执行，所以切换的时候会从头开始旋转
            rotate(0);
        }else if(audio.status == 'pause'){
            //暂停状态下切换，start(0) -> lastPeriod=0 ,相当于从0开始，stop清除动画帧，不让时间增加
            pro.start(0);
            pro.stop();
        }
        root.render(dataList[index])
        $('.img-box').data('deg',0)
        $('.img-box').css({
            transform : 'rotateZ(0deg)',
            transition : 'none'
        })
    })
    //收藏
    $('.like').on('click',function(){
        $(this).toggleClass('liking')
    })
    //上一曲
    $('.prev').on('click',function(){
        //根据封装的模块处理index
        var i = control.prev();
        //触发自定义事件
       $('body').trigger('play:change',i);
    })
    //下一曲
    $('.next').on('click',function(){
        var i = control.next();
        $('body').trigger('play:change',i);       
    })
    //暂停/播放
    $('.play').on('click',function(){
        $(this).toggleClass('playing');
        if(audio.status == 'pause'){
            //开始播放
            audio.play();
            //播放之后时间开始增加
            pro.start();
            var deg = $('.img-box').data('deg') || 0;
            rotate(deg)
        }else if(audio.status == 'play'){
            audio.pause();
            //时间停止,清除requestAnimationFrame 
            //清除不了怎么回事????????????
            pro.stop()
            clearInterval(timer)
        }
        
        
    })
    //播放列表
    $('.list').on('click',function(){
      root.playList.show(control);
    })

}
//拖动进度条
function bindTouch(){
    var left = $('.pro-bottom').offset().left;
    var width = $('.pro-wrapper').width();
    $('.spot').on('touchstart',function(e){
        pro.stop();
    }).on('touchmove',function(e){
        //移动的水平位置
        var x =  e.changedTouches[0].clientX;
        //移动距离占父级总距离的百分比
        var per = (x - left) / width;
        if (per >= 0 && per <= 1) {
            root.pro.upDate(per);
        }
    }).on('touchend',function(e){
        var x =  e.changedTouches[0].clientX;
        var per = (x - left) / width;
        var time = duration * per
        //根据拖动进度条的距离，跳到对应时间的音乐
        // debugger;
        audio.playTo(time);
        $('.play').addClass('playing');
        audio.status = 'play'
        //将拖动的时间作为一次 从开始->暂停所经过的时间，这样拖动只够暂停就不会出错
        pro.start(per)

    })
}
//播放结束自动切换下一首
function autoNext(){
    $(audio.audio).on('ended',function(){
        $('.next').trigger('click');
    })
}
//专辑封面旋转
function rotate(deg){
    clearInterval(timer);
    deg = parseInt(deg) 
    timer = setInterval(function(){
        deg += 2;
        $('.img-box').data('deg',deg)
        $('.img-box').css({
            transform : 'rotateZ('+ deg +'deg)',
            transition : 'all 0.2s linear'
        })
    },200)
}


function init(){
    getData('../mock/data.json');
    autoNext();
}
init()
