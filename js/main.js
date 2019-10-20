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
        core.replaceScene(MainScene(1,1,1,1,1));
      });

      Continuation.addEventListener('touchstart',function(e){
        core.replaceScene(MainScene(1,1,1,1,1));
      });

      return scene;
    };
    var MainScene = function(B_Number,C1_Number,C1_frame,C2_Number,C2_frame){
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
      Character1.opacity = 0;
      Character1.tl.fadeIn(20);
      scene.addChild(Character1);

      var Character2 = new Sprite(800,900);
      Character2.image = core.assets["image/キャラ/"+ C2_Number +".png"];
      Character2.x = 800;
      Character2.y = 0;
      Character2.frame = C2_frame;
      Character2.opacity = 0;
      Character2.tl.fadeIn(20);
      scene.addChild(Character2);

      var Text = new Label();
      Text.font  = "60px monospace";
      Text.color = 'black';
      Text.x = 0;
      Text.y = 900;
      Text.width = 1600;
      Text.height = 1600;
      Text.text = ("【未知の決闘者】\n");
      scene.addChild(Text);

      var Enter = new Label();
      Enter.font  = "60px monospace";
      Enter.color = 'black';
      Enter.x = width-180;
      Enter.y = height-65;
      Enter.width = 180;
      Enter.height = 60;
      Enter.text = ("進む ▶");
      scene.addChild(Enter);

      var Return = new Label();
      Return.font  = "60px monospace";
      Return.color = 'black';
      Return.x = 0;
      Return.y = height-65;
      Return.width = 180;
      Return.height = 60;
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
