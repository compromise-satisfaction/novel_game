enchant()
function Load(width,height){
  var core = new Core(width, height);
  core.preload("image/Title.png");
  for (var i = 0; i <= 1; i++){
    core.preload("image/背景/"+i+".png");
  }
  core.preload("image/キャラ/1.png");
  core.fps = 100;
  core.onload = function(){

    function Scene_loads(Number){
      //背景 (キャラNumber キャラframe キャラフェードイン キャラ存在)*3 キャラネーム テキスト 戻れる 前のシーン 次のシーン
      switch (Number) {
        case 0:
        var Name = "";
        var Line = "とりあえずどれくらいテキストが入力できるか確かめておく必要がありそうですな。結構いけますよコレ。改行の仕方がよくわからないんだが空白でごまかせばいけそうではあるな。";
        core.replaceScene(MainScene(0,1,1,1,false,1,1,1,false,1,1,1,false,Name,Line,false,1,1));
          break;
        case 1:
        var Name = "未知の決闘者";
        var Line = "1人";
        core.replaceScene(MainScene(1,1,1,false,false,1,1,false,false,1,1,true,true,Name,Line,true,0,2));
          break;
        case 2:
        var Name = "未知の決闘者";
        var Line = "2人";
        core.replaceScene(MainScene(1,1,1,true,true,1,1,false,true,1,1,false,false,Name,Line,true,1,3));
          break;
        case 3:
        var Name = "未知の決闘者";
        var Line = "3人";
        core.replaceScene(MainScene(1,1,1,false,true,1,1,false,true,1,1,true,true,Name,Line,true,2,0));
          break;
        default:
          break;
      }
    }

    var TitleScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Title = new Sprite(1600,900);
      Title.image = core.assets["image/Title.png"];
      Title.x = 0;
      Title.y = 0;
      scene.addChild(Title);

      var Beginning = new Label();
      Beginning.font  = "60px monospace";
      Beginning.color = 'black';
      Beginning.x = 0;
      Beginning.y = 960;
      Beginning.width = 1600;
      Beginning.height = 60;
      Beginning.text = ("▶ 最初から");
      scene.addChild(Beginning);

      var Continuation = new Label();
      Continuation.font  = "60px monospace";
      Continuation.color = 'black';
      Continuation.x = 0;
      Continuation.y = 1040;
      Continuation.width = 1600;
      Continuation.height = 60;
      Continuation.text = ("▶ 続きから");
      scene.addChild(Continuation);

      Beginning.addEventListener('touchstart',function(e){
        Scene_loads(0);
      });

      Continuation.addEventListener('touchstart',function(e){
        Scene_loads(1);
      });

      return scene;
    };
    var MainScene = function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,900);
      Background.image = core.assets["image/背景/"+ a +".png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Character1 = new Sprite(800,900);
      Character1.image = core.assets["image/キャラ/"+ b +".png"];
      Character1.x = 0;
      Character1.y = 0;
      Character1.frame = c;
      if(d){
        Character1.opacity = 0;
        Character1.tl.fadeIn(15);
      }
      if(e) scene.addChild(Character1);

      var Character2 = new Sprite(800,900);
      Character2.image = core.assets["image/キャラ/"+ f +".png"];
      Character2.x = 800;
      Character2.y = 0;
      Character2.frame = g;
      if(h){
        Character2.opacity = 0;
        Character2.tl.fadeIn(20);
      }
      if(i) scene.addChild(Character2);

      var Character3 = new Sprite(800,900);
      Character3.image = core.assets["image/キャラ/"+ j +".png"];
      Character3.x = 400;
      Character3.y = 0;
      Character3.frame = k;
      if(l){
        Character3.opacity = 0;
        Character3.tl.fadeIn(20);
      }
      if(m) scene.addChild(Character3);

      var C_name = new Label();
      C_name.font  = "60px monospace";
      C_name.color = 'black';
      C_name.x = 0;
      C_name.y = 960;
      C_name.width = 1600;
      C_name.height = 60;
      C_name.text = "【" + n + "】";
      if(C_name.text == "【】") C_name.text = "";
      scene.addChild(C_name);

      var Text = new Label();
      Text.font  = "60px monospace";
      Text.color = 'black';
      Text.x = 0;
      Text.y = 1020;
      Text.width = 1600;
      Text.height = 1600;
      Text.text = o;
      scene.addChild(Text);

      var Enter = new Label();
      Enter.font  = "60px monospace";
      Enter.color = 'black';
      Enter.x = width-180;
      Enter.y = height-65;
      Enter.width = 1600;
      Enter.height = 60;
      Enter.text = ("進む ▶");
      scene.addChild(Enter);

      var Return = new Label();
      Return.font  = "60px monospace";
      Return.color = 'black';
      Return.x = 0;
      Return.y = height-65;
      Return.width = 1600;
      Return.height = 60;
      Return.text = ("◀ 戻る");
      if(p) scene.addChild(Return);

      Return.addEventListener('touchstart',function(e){
        Scene_loads(q);
      });

      Enter.addEventListener('touchstart',function(e){
        Scene_loads(r);
      });

      return scene;
    };
    core.replaceScene(TitleScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  core.start()
}
