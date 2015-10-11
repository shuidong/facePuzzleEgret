/**
 *
 * @author 
 *
 */
class Utils {
    public static qas: QaModel[] = [];//题库;
    public static questIds: number[] = [];
    public static rightQuestCount: number = 0;
    //public static firstPhase: number = 3;//第1阶段
    
    public static getQuest():QaModel{
        if(Utils.questIds.length == 0) return null;
        var idx = Utils.questIds.pop();
        return Utils.qas[idx];
    }
    
    public static fillQas(objs) { 
        for (var i:number = 0; i < objs.length; i++) {//
            var tmp = new QaModel(objs[i]["i"], objs[i]["l"], objs[i]["r"]);
            Utils.qas.push(tmp);
            Utils.questIds.push(i);
        }
        Utils.questIds.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
    }
    
    public static createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
