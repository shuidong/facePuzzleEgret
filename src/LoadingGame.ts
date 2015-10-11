/**
 *
 * @author 
 *
 */
class LoadingGame extends egret.DisplayObjectContainer {
    private pror: egret.Sprite;
    private bm: egret.Bitmap;
    private barr: egret.Bitmap;
    
    private stageW: number;
    private stageH: number;
    
	public constructor(w:number, h:number) {
        super();
        this.stageW = w;
        this.stageH = h;
        
        this.createView();
	}
	
    private createView():void {
        var topMask:egret.Shape = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 1);
        topMask.graphics.drawRect(0, 0, this.stageW, this.stageH);
        topMask.graphics.endFill();
        topMask.width = this.stageW;
        topMask.height = this.stageH;
        this.addChildAt(topMask, 0);
                
        this.pror = new egret.Sprite();
        this.pror.x = this.stageW / 2;
        this.pror.y = this.stageH / 2;
        this.addChild(this.pror);
        
        this.bm = Utils.createBitmapByName("probarbg");
        this.pror.addChild(this.bm);
        //182 18
        this.barr = Utils.createBitmapByName("probartop");
        this.barr.x = 9;
        this.barr.y = 9;
        this.barr.width = 1;
        this.pror.addChild(this.barr);
        
        this.pror.anchorOffsetX = this.bm.width / 2;
        
    }
    
    public setProgress(current, total){
        this.barr.width=current/total*182;
        //console.log("@pro:" + current + "," + total);
    }
}
