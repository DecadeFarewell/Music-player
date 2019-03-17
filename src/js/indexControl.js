(function($,root){

    function Control(len){
        this.index = 0;
        this.len = len
    }

    Control.prototype = {
        prev(){
            return this.getIndex(-1)
        },
        next(){
            return this.getIndex(1);
        },
        getIndex(val){
            this.index =  ( this.index + this.len + val ) % this.len
            return this.index
        }
    }

    root.controlIndex = Control;

})(window.Zepto,window.player || (window.player = {}))
