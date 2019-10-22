enchant()
function Load(width,height){
  var core = new Core(width, height);
  core.preload("image/Round.png");
  core.preload("image/Title.png");
  core.preload("image/Buttons.png");
  core.preload("image/Background.png");
  for (var i = 0; i <= 1; i++){
    core.preload("image/背景/"+i+".png");
  }
  for (var i = 0; i <= 3; i++){
    core.preload("image/キャラ/"+i+".png");
  }
  core.fps = 100;
  core.onload = function(){
    if(window.localStorage.getItem("syoken")!="false"){
      var Data = false;
      window.localStorage.setItem("sex","男");
      window.localStorage.setItem("name","俛人");
      window.localStorage.setItem("surname","若辻");
    }
    else var Data = true;

    function Scene_loads(Number){
      var Surname = window.localStorage.getItem("surname");
      var S_name = window.localStorage.getItem("name");
      var Name = "？？？";
      var Line = "…";
      if(Number=="セーブ読み込み") Number = window.localStorage.getItem("Scene")*1;
      //背景 (キャラNumber キャラframe キャラフェードイン キャラ存在)*3 キャラネーム テキスト 戻れる 前のシーン 今のシーン 次のシーン
      switch (Number) {
        case 0:
        window.localStorage.setItem("syoken","false");
        Data = true;
        Name = Surname + " " + S_name;
        Line = "とりあえずどれくらいテキストが入力できるか確かめておく必要がありそうですな。結構いけますよコレ。改行の仕方がよくわからないんだが空白でごまかせばいけそうではあるな。";
        core.replaceScene(MainScene(0,0,0,false,false,0,0,false,false,0,0,false,false,Name,Line,false,0,Number,1));
          break;
        case 1:
        Line = "暗闇なら違和感なく出すことができますね。";
        core.replaceScene(MainScene(0,0,0,false,false,0,0,false,false,3,1,true,true,Name,Line,true,0,Number,2));
          break;
        case 2:
        core.replaceScene(MainScene(0,0,0,false,false,0,0,false,false,3,0,true,true,Name,Line,true,1,Number,3));
          break;
        case 3:
        core.replaceScene(MainScene(1,3,0,true,true,3,0,false,true,0,0,false,false,Name,Line,true,2,Number,4));
          break;
        case 4:
        core.replaceScene(MainScene(1,3,0,false,true,3,0,false,true,3,0,true,true,Name,Line,true,3,Number,5));
          break;
        case "タイトルに戻る":
          core.replaceScene(TitleScene());
          break;
        case "ゲームオーバー":
        //背景 (キャラNumber キャラframe キャラ存在)*3
        var C1 = "タイトルに戻る";
        var C2 = "セーブ地点に戻る";
        if(window.localStorage.getItem("Save")=="マニュアル") var M = true;
        else var M = false;
        core.replaceScene(ChoiceScene(0,0,0,false,0,0,false,0,0,false,C1,true,C2,M,C1,false,C1,false,"タイトルに戻る","セーブ読み込み",0,0,0));
          break;
        default:
        var Name = "";
        var Line = "ここから先はできていません。";
        core.replaceScene(MainScene(0,0,0,false,false,0,0,false,false,0,0,false,false,Name,Line,false,0,0,"ゲームオーバー",0));
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
      if(Data) scene.addChild(Continuation);

      Beginning.addEventListener('touchstart',function(e){
        Scene_loads(0);
      });

      Continuation.addEventListener('touchstart',function(e){
        Scene_loads("セーブ読み込み");
      });

      return scene;
    };
    var MainScene = function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){
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
      Text.x = 60;
      Text.y = 1040;
      Text.width = 1480;
      Text.height = 800;
      Text.text = o;
      scene.addChild(Text);

      var Return = new Sprite(320,60);
      Return.image = core.assets["image/Buttons.png"];
      Return.x = 0;
      Return.y = height-65;
      Return.frame = 0;
      if(p) scene.addChild(Return);

      var Settings = new Sprite(320,60);
      Settings.image = core.assets["image/Buttons.png"];
      Settings.x = 640;
      Settings.y = height-65;
      Settings.frame = 1;
      scene.addChild(Settings);

      var Enter = new Sprite(320,60);
      Enter.image = core.assets["image/Buttons.png"];
      Enter.x = width-320;
      Enter.y = height-65;
      Enter.frame = 2;
      scene.addChild(Enter);

      Return.addEventListener('touchstart',function(e){
        if(window.localStorage.getItem("Save")!="マニュアル") window.localStorage.setItem("Scene",q);
        Scene_loads(q);
      });

      Settings.addEventListener('touchstart',function(e){
        core.pushScene(SettingScene(r));
      });

      Enter.addEventListener('touchstart',function(e){
        if(window.localStorage.getItem("Save")!="マニュアル") window.localStorage.setItem("Scene",s);
        Scene_loads(s);
      });

      return scene;
    };
    var ChoiceScene = function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){
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
      if(d) scene.addChild(Character1);

      var Character2 = new Sprite(800,900);
      Character2.image = core.assets["image/キャラ/"+ e +".png"];
      Character2.x = 800;
      Character2.y = 0;
      Character2.frame = f;
      if(g) scene.addChild(Character2);

      var Character3 = new Sprite(800,900);
      Character3.image = core.assets["image/キャラ/"+ h +".png"];
      Character3.x = 400;
      Character3.y = 0;
      Character3.frame = i;
      if(j) scene.addChild(Character3);

      var C1 = new Label();
      C1.font  = "60px monospace";
      C1.color = 'black';
      C1.x = 0;
      C1.y = 960;
      C1.width = 1600;
      C1.height = 60;
      C1.text = "▶ " + k;
      if(l) scene.addChild(C1);

      var C2 = new Label();
      C2.font  = "60px monospace";
      C2.color = 'black';
      C2.x = 0;
      C2.y = 1060;
      C2.width = 1600;
      C2.height = 60;
      C2.text = "▶ " + m;
      if(n) scene.addChild(C2);

      var C3 = new Label();
      C3.font  = "60px monospace";
      C3.color = 'black';
      C3.x = 0;
      C3.y = 1160;
      C3.width = 1600;
      C3.height = 60;
      C3.text = "▶ " + o;
      if(p) scene.addChild(C3);

      var C4 = new Label();
      C4.font  = "60px monospace";
      C4.color = 'black';
      C4.x = 0;
      C4.y = 1260;
      C4.width = 1600;
      C4.height = 60;
      C4.text = "▶ " + q;
      if(r) scene.addChild(C4);

      var Settings = new Sprite(320,60);
      Settings.image = core.assets["image/Buttons.png"];
      Settings.x = 640;
      Settings.y = height-65;
      Settings.frame = 1;
      scene.addChild(Settings);

      C1.addEventListener('touchstart',function(e){
        if(window.localStorage.getItem("Save")!="マニュアル") window.localStorage.setItem("Scene",s);
        Scene_loads(s);
      });

      C2.addEventListener('touchstart',function(e){
        if(window.localStorage.getItem("Save")!="マニュアル") window.localStorage.setItem("Scene",t);
        Scene_loads(t);
      });

      C3.addEventListener('touchstart',function(e){
        if(window.localStorage.getItem("Save")!="マニュアル") window.localStorage.setItem("Scene",u);
        Scene_loads(u);
      });

      C4.addEventListener('touchstart',function(e){
        if(window.localStorage.getItem("Save")!="マニュアル") window.localStorage.setItem("Scene",v);
        Scene_loads(v);
      });

      Settings.addEventListener('touchstart',function(e){
        core.pushScene(SettingScene(w));
      });

      return scene;
    };
    var SettingScene = function(a){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,1600);
      Background.image = core.assets["image/Background.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Text = new Label();
      Text.font  = "60px monospace";
      Text.color = 'black';
      Text.x = 200;
      Text.y = 200;
      Text.width = 1600;
      Text.height = 60;
      Text.text = "▶ 設定を閉じる";
      scene.addChild(Text);

      var Text2 = new Label();
      Text2.font  = "60px monospace";
      Text2.color = 'black';
      Text2.x = 200;
      Text2.y = 300;
      Text2.width = 1600;
      Text2.height = 60;
      Text2.text = "▶ タイトルに戻る";
      scene.addChild(Text2);

      var Text3 = new Label();
      Text3.font  = "60px monospace";
      Text3.color = 'black';
      Text3.x = 200;
      Text3.y = 400;
      Text3.width = 1600;
      Text3.height = 60;
      Text3.text = "▶ セーブ方法の切り替え";
      scene.addChild(Text3);

      var Text4 = new Label();
      Text4.font  = "60px monospace";
      Text4.color = 'black';
      Text4.x = 200;
      Text4.y = 500;
      Text4.width = 1600;
      Text4.height = 60;
      if(window.localStorage.getItem("Save")=="マニュアル") Text4.text = "▶ セーブする";
      else Text4.text = "現在はオートセーブです。";
      scene.addChild(Text4);

      var Text5 = new Label();
      Text5.font  = "60px monospace";
      Text5.color = 'black';
      Text5.x = 200;
      Text5.y = 600;
      Text5.width = 1600;
      Text5.height = 60;
      Text5.text = "セーブしました。";

      var Text6 = new Label();
      Text6.font  = "60px monospace";
      Text6.color = 'black';
      Text6.x = 200;
      Text6.y = 900;
      Text6.width = 1600;
      Text6.height = 60;
      Text6.text = "性別";
      scene.addChild(Text6);

      var Text7 = new Label();
      Text7.font  = "60px monospace";
      Text7.color = 'black';
      Text7.x = 200;
      Text7.y = 1000;
      Text7.width = 1600;
      Text7.height = 60;
      Text7.text = "姓";
      scene.addChild(Text7);

      var S_Input = new Entity();
      S_Input.moveTo(270,1000);
      S_Input.width = 190;
      S_Input.height = 60;
      S_Input._element = document.createElement('input');
      S_Input._element.type = "text";
      S_Input._element.name = "myText";
      S_Input._element.value = window.localStorage.getItem("surname");
      S_Input._element.placeholder = "姓を入力";
      scene.addChild(S_Input);

      var Text8 = new Label();
      Text8.font  = "60px monospace";
      Text8.color = 'black';
      Text8.x = 200;
      Text8.y = 1100;
      Text8.width = 1600;
      Text8.height = 60;
      Text8.text = "名";
      scene.addChild(Text8);

      var S_Input2 = new Entity();
      S_Input2.moveTo(270,1100);
      S_Input2.width = 190;
      S_Input2.height = 60;
      S_Input2._element = document.createElement('input');
      S_Input2._element.type = "text";
      S_Input2._element.name = "myText";
      S_Input2._element.value = window.localStorage.getItem("name");
      S_Input2._element.placeholder = "名を入力";
      scene.addChild(S_Input2);

      var Text9 = new Label();
      Text9.font  = "60px monospace";
      Text9.color = 'black';
      Text9.x = 400;
      Text9.y = 900;
      Text9.width = 1600;
      Text9.height = 60;
      Text9.text = "男";
      scene.addChild(Text9);

      var Text10 = new Label();
      Text10.font  = "60px monospace";
      Text10.color = 'black';
      Text10.x = 500;
      Text10.y = 900;
      Text10.width = 1600;
      Text10.height = 60;
      Text10.text = "女";
      scene.addChild(Text10);

      var Text11 = new Label();
      Text11.font  = "60px monospace";
      Text11.color = 'black';
      Text11.x = 200;
      Text11.y = 1200;
      Text11.width = 1600;
      Text11.height = 60;
      Text11.text = "▶ 設定する";
      scene.addChild(Text11);

      var Text12 = new Label();
      Text12.font  = "60px monospace";
      Text12.color = 'black';
      Text12.x = 200;
      Text12.y = 1300;
      Text12.width = 1600;
      Text12.height = 60;
      Text12.text = "設定しました。";

      var Round = new Sprite(60,60);
      Round.image = core.assets["image/Round.png"];
      if(window.localStorage.getItem("sex")=="女"){
        Round.x = Text10.x;
        Round.y = Text10.y;
      }
      else{
        Round.x = Text9.x;
        Round.y = Text9.y;
      }
      scene.addChild(Round);

      Text.addEventListener('touchstart',function(e){
        core.popScene();
        return;
      });

      Text2.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_loads("タイトルに戻る");
        return;
      });

      Text3.addEventListener('touchstart',function(e){
        if(window.localStorage.getItem("Save")=="マニュアル"){
          window.localStorage.setItem("Save","オート");
          Text4.text = "現在はオートセーブです。";
          scene.removeChild(Text5);
        }
        else{
          window.localStorage.setItem("Save","マニュアル");
          Text4.text = "▶ セーブする";
        }
        return;
      });

      Text4.addEventListener('touchstart',function(e){
        if(Text4.text == "▶ セーブする"){
          window.localStorage.setItem("Scene",a);
          scene.addChild(Text5);
        }
        return;
      });

      Text9.addEventListener('touchstart',function(e){
        Round.x = Text9.x;
        Round.y = Text9.y;
        return;
      });

      Text10.addEventListener('touchstart',function(e){
        Round.x = Text10.x;
        Round.y = Text10.y;
        return;
      });

      Text11.addEventListener('touchstart',function(e){
        window.localStorage.setItem("surname",S_Input._element.value);
        window.localStorage.setItem("name",S_Input2._element.value);
        if(Round.x == Text9.x){
          window.localStorage.setItem("sex","男");
          if(S_Input._element.value=="") window.localStorage.setItem("surname","若辻");
          if(S_Input2._element.value=="") window.localStorage.setItem("name","俛人");
        }
        else{
          window.localStorage.setItem("sex","女");
          if(S_Input._element.value=="") window.localStorage.setItem("surname","防人");
          if(S_Input2._element.value=="") window.localStorage.setItem("name","玲奈");
        }
        scene.addChild(Text12);
        return;
      });

      return scene;
    };
    core.replaceScene(TitleScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  core.start()
}
