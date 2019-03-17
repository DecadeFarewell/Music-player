(function ($,root) {
    //渲染图片
    function renderImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            $('.img-box>img').attr('src',src)
            root.blurImg(img,$('body'));
        }
    }

    // 渲染歌曲信息
    function renderInfo(info){
        var str = ' <div class="song-name">'+ info.song +'</div>\
        <div class="singer-name">'+ info.singer +'</div>\
        <div class="album">' + info.album +'</div>';
        $('.song-info').html(str);
    }

    //是否收藏歌曲/是否点击了喜欢
    function renderIsLike(data){
        if(data.isLike){
            $('.control>.like').addClass('liking')
        }
    }

    // root = {
    //     renderImg,
    //     renderInfo,
    //     renderIsLike
    // }

    root.render = function(data){
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data)
    }


})(window.Zepto, window.player || (window.player = {}))

