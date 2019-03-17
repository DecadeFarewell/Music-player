(function($,root){

    function Control(len){
        this.index = 0;
        this.len = len
    }

    Control.prototype = {
        prev(){
            // if(nowIndex == 0){
            //     nowIndex = len -1
            // }else{
            //     nowIndex --
            // }
            return this.getIndex(-1)
        },
        next(){
            // if(nowIndex == len -1){
            //     nowIndex = 0
            // }else{
            //     nowIndex ++
            // }
            return this.getIndex(1);
        },
        getIndex(val){
            this.index =  ( this.index + this.len + val ) % this.len
            return this.index
        }
    }

    root.controlIndex = Control;

})(window.Zepto,window.player || (window.player = {}))
