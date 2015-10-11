/**
 *
 * @author 
 *
 */
class SimpleParticle extends egret.DisplayObjectContainer{
    private stars: egret.Bitmap[] = [];//各个星星的图片
    private rand: number[] = [];//各个随机因子
    private timer: egret.Timer;
    private isLoop: boolean;
    private longTime: number = 0;
    
	public constructor(_isLoop:boolean = true) {
        super();
        this.isLoop = _isLoop;
        this.init();
	}
	
    public init() {
        /*
        this.bm = Utils.createBitmapByName("star");
        this.stars.push(this.bm);
        this.addChild(this.bm);
        */
        
        this.timer = new egret.Timer(150);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onEnterFrame,this);
        this.timer.start();
    }
    
    private exitDo(){
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onEnterFrame,this);
        this.parent.removeChild(this);
    }
    
    public onEnterFrame(advancedTime:number){
        if(!this.isLoop){
            this.longTime += 1;
            //console.log("is not loop: " + advancedTime);
            if(this.longTime > 20) { 
                //console.log("xxxxx");
                this.exitDo();
            }
            
        }
        if(this.stars.length <= 2){
            var bm:egret.Bitmap = Utils.createBitmapByName("star");
            this.stars.push(bm);
            this.addChild(bm);
            bm.x = (0.5 - Math.random()) * 160;
            bm.y = (0.5 - Math.random()) * 100;
            
            this.rand.push(Math.random() * 0.05 + 0.05);//确保 因子范围(0.05 - 0.1)
        }
        //
        for (var i:number = 0; i < this.stars.length; i++) {
            var tmpStar = this.stars[i];
            if(tmpStar.alpha < 0.3) {
                if(this.isLoop) {
                    this.resetStar(tmpStar);
                } else { 
                    tmpStar.alpha = 0;
                }
            }
            tmpStar.alpha -= this.rand[i];
            tmpStar.alpha = Math.max(0, tmpStar.alpha);//确保它不会为负数
            tmpStar.scaleX = tmpStar.alpha;
            tmpStar.scaleY = tmpStar.alpha;
            tmpStar.x += this.rand[i] * 30;
            tmpStar.y -= this.rand[i] * 40;
        }        
    }
    
    private resetStar(star:egret.Bitmap) { 
        star.x = (0.5 - Math.random()) * 160;
        star.y = (0.5 - Math.random()) * 100;
        star.alpha = 1;
    }
}
