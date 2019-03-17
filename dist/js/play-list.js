(function ($, root) {
    //播放列表
    var controlIndex;
    var audio = root.AudioManager;
    //歌曲列表
    function renderList(dataList) {
        var str = '';
        dataList.forEach(function (item, index, self) {
            console.log(item)
            str += ` <li class="song-item" data-index=${index}>${item.singer}-${item.song}</li>`
        })
        $('.play-list>ul').html(str);
        bindEvent();
    }

    //弹出列表
    function show(control){
        controlIndex = control;
        $('.play-list').addClass('show')
        curSong(controlIndex.index)
    }
    //绑定事件
    function bindEvent(){
        $('.play-footer').on('click',function(){
            $('.play-list').removeClass('show')
        })
        $('.song-item').on('click',function(){
            var index = $(this).index();
            controlIndex.index = index
            $('body').trigger('play:change',index);
            if(audio.status == 'pause'){
                $('.play').trigger('click')
            }
            $('.play-list').removeClass('show')
            curSong(index)
        })
    }
    //改变当前歌曲样式
    function curSong(index){
        $('.song-item').eq(index).addClass('active')
                                 .siblings().removeClass('active')
    }
    root.playList = {
        renderList: renderList,
        show: show
    }

})(window.Zepto,window.player || (window.player = {}))