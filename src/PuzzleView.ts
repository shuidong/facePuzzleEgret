/**
 *
 * @author 
 *
 */
class PuzzleView extends egret.DisplayObjectContainer{
    
    private stageW: number;
    private stageH: number;
    
    private currentQuestTotal: number = 0;
    private star: egret.Bitmap;
    private timeBar: egret.Bitmap;
    private timer: egret.Timer;
    private barUp: egret.Bitmap;
    private barDown: egret.Shape;
    
    private bai: egret.TextField;
    private wang: egret.TextField;
    private keyA: boolean = true;
    private keyB: boolean = !this.keyA;
    private questTxt: egret.TextField;
    private emoji: egret.TextField;
    private shareTxt: egret.TextField;
    
    private buttonA: egret.Shape;
    private buttonB: egret.Shape;
    private smallClick: boolean = false;
    private bigClick: boolean = false;
    
    private currentPic: egret.Bitmap;
    private pic1: egret.Bitmap
    
	public constructor(w:number, h:number) {
        super();
        this.stageW = w;
        this.stageH = h;
        this.createView();
        
        this.timer = new egret.Timer(100);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onEnterFrame,this);
               
        this.touchEnabled = true;        
	}
	
    public onEnterFrame(advancedTime:number){
        this.shareTxt.x -= 3;
        if(this.shareTxt.x < -this.stageW/2) { 
            this.shareTxt.x = this.stageW;
        }
    }
    
    private createView():void {
        this.star = Utils.createBitmapByName("star");
        this.star.x = 10;
        this.star.y = 10;
        //this.star.blendMode = egret.BlendMode.ADD;
        this.addChild(this.star);
        
        var xx = this.star.x + this.star.width * 2;
        var yy = this.star.height / 2;
        
        this.barUp = Utils.createBitmapByName("probartop");
        
        this.barDown = new egret.Shape();
        this.barDown.graphics.beginFill(0x00ff00, 0.5);
        this.barDown.graphics.drawRect(xx,  yy, this.stageW - 100, this.barUp.height);
        this.barDown.graphics.endFill();
        this.barDown.width = this.stageW - 100;
        this.barDown.height = this.barUp.height;
        this.addChildAt(this.barDown, 0);
                
        this.barUp.x = xx;
        this.barUp.y = yy;
        this.barUp.width = 0;//this.barDown.width;
        this.addChildAt(this.barUp, 8);
        
        var egretLogo: egret.Bitmap = Utils.createBitmapByName("egretIcon");
        egretLogo.x = this.stageW / 2 - egretLogo.width / 2;
        egretLogo.y = this.stageH / 2 - egretLogo.height / 2;
        egretLogo.alpha = 0.2;
        this.addChildAt(egretLogo, 0);
        
        this.questTxt = new egret.TextField();
        this.questTxt.textColor = 0xffffff;
        this.questTxt.x = 10;
        this.questTxt.y =  this.stageH / 2;
        this.questTxt.size = 30;
        this.questTxt.text = "图中左侧的人物是？";
        this.addChildAt(this.questTxt, 3);
        
        this.emoji = new egret.TextField();
        this.emoji.textColor = 0xffffff;
        this.emoji.x = 10;
        this.emoji.y =  this.stageH / 2 + 110;
        this.emoji.size = 110;
        this.emoji.text = "";
        this.addChildAt(this.emoji, 3);
        
        this.drawCircle();
        this.removeCurrentPic();
    }
    
    private removeCurrentPic(){
        if(this.currentPic == null) {
            this.callNextPic();
            return;
        }
        egret.Tween.get(this.currentPic).to({ x: this.stageW * (Math.random() * 2 - 1), y: this.stageH * Math.random() },1000,egret.Ease.sineOut).wait(0).call(function() { 
            //console.log('tween finish.');
            this.callNextPic();
            }, this);
    }
    
    private jumpResult(){
        //this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onEnterFrame,this);
        this.buttonB.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.doClick,this);
        this.buttonB.removeEventListener(egret.TouchEvent.TOUCH_END,this.doClickEnd,this);
        
        if(null != this.currentPic && null != this.currentPic.parent) { 
            this.currentPic.parent.removeChild(this.currentPic);
        }
        
        this.wang.text = "";
        this.bai.text = "";
        this.questTxt.y = this.stageH / 4;
        this.questTxt.text = "找对了"+ Utils.rightQuestCount + "位明星wwwwww...";
        
        this.shareTxt = new egret.TextField();
        this.shareTxt.text = "如果觉得有意思不妨点击右上角分享给您的朋友，谢谢";
        this.shareTxt.y = 50;
        this.shareTxt.size = 20;
        this.shareTxt.x = this.stageW / 2;
        this.addChild(this.shareTxt);
        
       
        this.timer.start();
        
        //this.removeChild(this);
        var result: egret.Bitmap = Utils.createBitmapByName("great");
        result.x = this.stageW / 2 - result.width / 2;
        result.y = this.stageH / 2 - result.height / 2;
        this.addChild(result);
    }
    
    private callNextPic(){
        //this.removeCurrentPic();
        if(null != this.currentPic && null != this.currentPic.parent) { 
            this.currentPic.parent.removeChild(this.currentPic);
        }
        
        var obj = Utils.getQuest();
        if(null == obj){
            this.jumpResult();
            return;
        }
        
        
        
        if(Math.random() > 0.5){ 
            this.keyB = false;
            this.bai.text = obj.right;
            this.wang.text = obj.left;
            
            //this.questTxt.text = "图中左侧人物是？";
        }else{
            this.keyB = true;
            this.bai.text = obj.left;
            this.wang.text = obj.right;
            
            //this.questTxt.text = "图中右侧人物是？";
        }
        this.keyA = !this.keyB;
        
        //console.log("@img=" + obj.img);
        var pic: egret.Bitmap = Utils.createBitmapByName("" + obj.img);
        var w = pic.width;
        var h = pic.height;
        
        var wr = this.stageW / w;
        var hr = this.stageH / h;
        var scalexy = Math.min(wr, hr);
        //pic.scaleX = pic.scaleY = scalexy;
        
        pic.x = 0;//this.stageW / 2;
        pic.y = 0;//this.stageH / 2;
        //pic.anchorOffsetX = this.stageW / 2;
        //pic.anchorOffsetY = this.stageH / 2;
        this.currentPic = pic;
        
        egret.Tween.get(this.currentPic).to({ scaleX: scalexy, scaleY:scalexy },1000,egret.Ease.sineOut);
        
        this.addChildAt(pic, 1);
    }
    
    private drawCircle() { 
        this.buttonA = new egret.Shape();
        this.buttonA.x = this.stageW;
        this.buttonA.y = this.stageH;
        this.buttonA.graphics.lineStyle( 5, 0x00ff00 );
        this.buttonA.graphics.beginFill( 0x00ff00, 0.6);
        this.buttonA.graphics.drawCircle( 0, 0, this.stageW * 0.4 );
        this.buttonA.graphics.endFill();
        this.addChildAt( this.buttonA , 2);
        this.bai = new egret.TextField();
        //this.bai.text = this.aString;
        this.bai.textColor = 0xffffff;
        this.bai.x = this.stageW - 150;
        this.bai.y =  this.stageH - 50;
        this.bai.size = 40;
        this.bai.textAlign = "center";
        this.addChildAt(this.bai, 3);
        
        this.buttonB = new egret.Shape();
        this.buttonB.x = this.stageW;
        this.buttonB.y = this.stageH;
        this.buttonB.graphics.lineStyle( 5, 0x0000ff );
        this.buttonB.graphics.beginFill( 0x0000ff, 0.6);
        this.buttonB.graphics.drawCircle( 0, 0, this.stageW * 0.7 );
        this.buttonB.graphics.endFill();
        this.addChildAt( this.buttonB , 1);
        
        this.wang = new egret.TextField();
        //this.wang.text = this.bString;
        this.wang.textColor = 0xffffff;
        this.wang.x = this.stageW * 0.3;
        this.wang.y =  this.stageH - 50;
        this.wang.size = 40;
        this.wang.textAlign = "center";
        this.addChildAt(this.wang, 3);
        
        this.buttonB.touchEnabled = true;
        this.buttonB.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.doClick,this);
        this.buttonB.addEventListener(egret.TouchEvent.TOUCH_END,this.doClickEnd,this);
    }
    
    private doClick(e:egret.TouchEvent){
        //console.log("0-0");
        var x = e.stageX;
        var y = e.stageY;
        
        var dltx = this.stageW - x;
        var dlty = y - this.stageH;
        
        var len = Math.sqrt(dltx * dltx + dlty * dlty);
        if(len < this.stageW * 0.4){
            //btnA click
            //console.log('small clicked');
            this.smallClick = true;
            
            this.buttonA.graphics.clear();
            
            this.buttonA.graphics.beginFill( 0x00ff00, 1);
            this.buttonA.graphics.drawCircle( 0, 0, this.stageW * 0.4 - 10 );
            this.buttonA.graphics.endFill();
                
        }else if(len < this.stageW * 0.7){
            //console.log('big clicked');
            this.bigClick = true;
            
            this.buttonB.graphics.clear();
            
            this.buttonB.graphics.beginFill( 0x0000ff, 1);
            this.buttonB.graphics.drawCircle( 0, 0, this.stageW * 0.7 - 10);
            this.buttonB.graphics.endFill();
        }
        
    }
    
    private doClickEnd(e:egret.TouchEvent) { 
        if(this.smallClick){ 
            this.buttonA.graphics.clear();
            this.buttonA.graphics.lineStyle( 5, 0x00ff00 );
            this.buttonA.graphics.beginFill(0x00ff00, 0.6);
            this.buttonA.graphics.drawCircle( 0, 0, this.stageW * 0.4 );
            this.buttonA.graphics.endFill();
        } else if(this.bigClick){
            this.buttonB.graphics.clear();
            this.buttonB.graphics.lineStyle( 5, 0x0000ff );
            this.buttonB.graphics.beginFill(0x0000ff, 0.6);
            this.buttonB.graphics.drawCircle( 0, 0, this.stageW * 0.7 );
            this.buttonB.graphics.endFill();
        }
        
        if(this.smallClick || this.bigClick) {
            this.removeCurrentPic();

            if(
                (this.bigClick && this.keyA) || (this.smallClick && this.keyB)
                ) {//right
                console.log("@bingo.");
                this.emojiEffect(':-)');
                Utils.rightQuestCount++;
            } else { //wrong
                this.emojiEffect(':-(');
            }
            
            this.currentQuestTotal++;
            this.barUp.width = (this.currentQuestTotal * this.barDown.width / Utils.qas.length);
            //if(Utils.firstPhase == this.currentQuestTotal){//第一阶段已经完成
              //  this.finishFirst();       
            //}
            //console.log("@key" + this.bigClick + "," + this.keyB + "," + this.smallClick + "," + this.keyA);
        }
        this.smallClick = this.bigClick = false;
    }
    
    private emojiEffect(str:string){
        this.emoji.text = str;
        this.emoji.scaleX = 1;
        this.emoji.scaleY = 1;
        this.emoji.alpha = 1;
        
        egret.Tween.get(this.emoji).to({ alpha:0.3 , scaleX : 1.5, scaleY : 1.5},900,egret.Ease.sineOut).wait(0).call(function() { 
            //console.log('tween finish.');
            this.emoji.text = "";
            
        }, this);
    }
    
}
