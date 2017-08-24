function StatusBar (position, width, height, progressStat, fullStat, showValues = false) {
    this.progress = progressStat / fullStat;
    this.position = position.copy();
    this.progressStat = progressStat;
    this.fullStat = fullStat;
    
    this.update = function (curProgress, fullStat = this.fullStat) {
        this.progress = curProgress / fullStat;
        this.progressStat = curProgress;
        this.fullStat = fullStat;
    };
    
    this.show = function () {
        push();
        stroke(11,11,11);
        fill(244, 244, 244, .2);
        rect(this.position.x, this.position.y, width, height);
       
        fill(41);
        rect(this.position.x, this.position.y, width * (this.progress), height);
        if(showValues){
            textFont(weaponFont, 14);
           text(Math.floor(this.progressStat) + "/" + Math.floor(this.fullStat), (this.position.x), (this.position.y));
        }
        pop();
    };
    
    this.updatePosition = function (position) {
        this.position = position.copy();   
    }
    

    
}