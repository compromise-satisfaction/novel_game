enchant()
function Load(width,height){
  var core = new Core(width, height);
  core.preload("image/Title.png");
  core.preload("image/背景/1.png");
  core.preload("image/キャラ/1.png");
  core.fps = 10;
  core.onload = function(){
    var TitleScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Title = new Sprite(1600,900);
      Title.image = core.assets["image/Title.png"];
      Title.x = 0;
      Title.y = 0;
      scene.addChild(Title);

      var Beginning = new Label();
      Beginning.font  = "200px monospace";
      Beginning.color = 'black';
      Beginning.x = 0;
      Beginning.y = 900;
      Beginning.width = 1600;
      Beginning.height = 200;
      Beginning.text = ("▶ 最初から");
      scene.addChild(Beginning);

      var Continuation = new Label();
      Continuation.font  = "200px monospace";
      Continuation.color = 'black';
      Continuation.x = 0;
      Continuation.y = 1100;
      Continuation.width = 1600;
      Continuation.height = 200;
      Continuation.text = ("▶ 続きから");
      scene.addChild(Continuation);

      Beginning.addEventListener('touchstart',function(e){
        core.replaceScene(MainScene(1));
      });

      Continuation.addEventListener('touchstart',function(e){
        core.replaceScene(MainScene(1));
      });

      return scene;
    };
    var MainScene = function(Number){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,900);
      Background.image = core.assets["image/背景/"+ Number +".png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Character1 = new Sprite(800,900);
      Character1.image = core.assets["image/キャラ/"+ Number +".png"];
      Character1.x = 0;
      Character1.y = 0;
      scene.addChild(Character1);

      var Enter = new Label();
      Enter.font  = "200px monospace";
      Enter.color = 'black';
      Enter.x = 0;
      Enter.y = 900;
      Enter.width = 1600;
      Enter.height = 200;
      Enter.text = ("進む ▶");
      scene.addChild(Enter);

      var Return = new Label();
      Return.font  = "200px monospace";
      Return.color = 'black';
      Return.x = 0;
      Return.y = 1100;
      Return.width = 1600;
      Return.height = 200;
      Return.text = ("◀ 戻る");
      scene.addChild(Return);

      Enter.addEventListener('touchstart',function(e){
        console.log("最初から");
      });

      Return.addEventListener('touchstart',function(e){
        console.log("続きから");
      });

      return scene;
    };
    core.replaceScene(TitleScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  core.start()
}
