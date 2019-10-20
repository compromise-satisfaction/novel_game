enchant()
function Load(width,height){
  var core = new Core(width, height);
  core.preload("image/Title.png");
  for (var i = 0; i <= 1; i++){
    core.preload("image/背景/"+i+".png");
  }
  core.preload("image/キャラ/1.png");
  core.fps = 10;
  core.onload = function(){

    function Scene_loads(Number){
      switch (Number) {
        case 0:
        core.replaceScene(MainScene(0,1,0,true,1,0,true,"セラ","とりあえずどれくらいテキストが入力できるか確かめておく必要がありそうですな。結構いけますよコレ。改行の仕方がよくわからないんだが空白でごまかせばいけそうではあるな。"));
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
        core.replaceScene(MainScene(1,1,0,true,1,0,true,"セラ","とりあえずどれくらいテキストが入力できるか確かめておく必要がありそうですな。結構いけますよコレ。改行の仕方がよくわからないんだが空白でごまかせばいけそうではあるな。"));
      });

      return scene;
    };
    var MainScene = function(B_Number,C1_Number,C1_frame,C1_fadeIn,C2_Number,C2_frame,C2_fadeIn,C_name_text,C_text){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,900);
      Background.image = core.assets["image/背景/"+ B_Number +".png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Character1 = new Sprite(800,900);
      Character1.image = core.assets["image/キャラ/"+ C1_Number +".png"];
      Character1.x = 0;
      Character1.y = 0;
      Character1.frame = C1_frame;
      if(C1_fadeIn){
        Character1.opacity = 0;
        Character1.tl.fadeIn(20);
      }
      scene.addChild(Character1);

      var Character2 = new Sprite(800,900);
      Character2.image = core.assets["image/キャラ/"+ C2_Number +".png"];
      Character2.x = 800;
      Character2.y = 0;
      Character2.frame = C2_frame;
      if(C2_fadeIn){
        Character2.opacity = 0;
        Character2.tl.fadeIn(20);
      }
      scene.addChild(Character2);

      var C_name = new Label();
      C_name.font  = "60px monospace";
      C_name.color = 'black';
      C_name.x = 0;
      C_name.y = 960;
      C_name.width = 1600;
      C_name.height = 60;
      C_name.text = "【" + C_name_text + "】";
      if(C_name.text == "【】") C_name.text = "";
      scene.addChild(C_name);

      var Text = new Label();
      Text.font  = "60px monospace";
      Text.color = 'black';
      Text.x = 0;
      Text.y = 1020;
      Text.width = 1600;
      Text.height = 1600;
      Text.text = C_text;
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
      scene.addChild(Return);

      Enter.addEventListener('touchstart',function(e){
        core.replaceScene(MainScene(1,1,0,false,1,0,false,"","テスト"));
      });

      Return.addEventListener('touchstart',function(e){
        core.replaceScene(MainScene(1,1,0,false,1,0,false,"天の声","無し"));
      });
      return scene;
    };
    core.replaceScene(TitleScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  core.start()
}
