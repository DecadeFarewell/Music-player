(function($,root){
    //play  pause  getAudio
    function AudioManager(){
        //创建audio对象
        this.audio = new Audio();
        //默认状态
        this.status = 'pause';
    }

    AudioManager.prototype = {
        play(){
            this.audio.play();
            this.status = 'play';
        },
        pause(){
            this.audio.pause();
            this.status = 'pause'
        },
        getAudio(src){
            this.audio.src = src;
            this.audio.load();
        },
        playTo(time){
            this.audio.currentTime = time;
            this.audio.play();
        }
    }

    root.AudioManager = new AudioManager();

})(window.Zepto,window.player || (window.player = {}))