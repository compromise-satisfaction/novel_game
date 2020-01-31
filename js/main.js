enchant();
//サウンド変更前
var Version = "バージョン 6.6";
var Already = false;
var Data_loading = false;
var BGM = document.createElement("audio");
BGM.addEventListener("ended",function(e){
  BGM.currentTime = BGM.id*1;
  BGM.play();
  console.log(BGM.currentTime);
});

var GAS = Foldar;

function Datas_load(width,height,GAS_URL){
  if(GAS_URL) GAS = GAS_URL;
  Data_loading = true;
  fetch(GAS,
    {
      method: 'POST',
      body: ""
    }
  )
  .then(res => res.json())
  .then(result => {
    Image_urls = [];
    Move_DATAS = result.移動;
    Sounds_DATAS = result.音;
    Image_DATAS = result.画像;
    Main_DATAS = result.メイン;
    Choice_DATAS = result.選択;
    Branch_DATAS = result.分岐;
    Item_get_DATAS = result.入手;
    Inspect_DATAS = result.調べる;
    I_C_F_T_DATAS = result.フラグ類;
    Speech_DATAS = result.吹き出し;
    Kousin1 = result.更新[0].更新日;
    Interrogation_DATAS = result.尋問;
    for (var i = 0; i < Image_DATAS.length; i++){
      if(Image_DATAS[i].url.substring(0,4)!="http"){
        Image_DATAS[i].url = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/" + Image_DATAS[i].url;
      }
      else if(Image_DATAS[i].url.substring(0,18)=="https://gyazo.com/"){
          Image_DATAS[i].url = "https://i."+Image_DATAS[i].url.substring(8)+".png\")";
      }
      Image_urls[i] = Image_DATAS[i].url;
    }
    BGM_DATAS = [];
    Sounds_urls = [];
    Voice_DATAS = [];
    Sound_effect_DATAS = [];
    SE = [];
    for (var i=0,k0=0,k1=0,k2=0,k3=0; i < Sounds_DATAS.length; i++){
      if(Sounds_DATAS[i].url.substring(0,4)!="http"){
        Sounds_DATAS[i].url = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/" + Sounds_DATAS[i].url +".wav";
      }
      switch (Sounds_DATAS[i].備考) {
        default:
          BGM_DATAS[k1] = [Sounds_DATAS[i].url,Sounds_DATAS[i].備考];
          k1++;
          break;
        case "音声":
          Sounds_urls[k0] = Sounds_DATAS[i].url;
          Voice_DATAS[k2] = Sounds_DATAS[i].名前;
          SE[k0] = document.createElement("audio");
          SE[k0].src = Sounds_DATAS[i].url;
          SE[k0].title = Sounds_DATAS[i].名前;
          k0++;
          k2++;
          break;
        case "効果音":
          Sounds_urls[k0] = Sounds_DATAS[i].url;
          Sound_effect_DATAS[k3] = Sounds_DATAS[i].名前;
          SE[k0] = document.createElement("audio");
          SE[k0].src = Sounds_DATAS[i].url;
          SE[k0].title = Sounds_DATAS[i].名前;
          k0++;
          k3++;
          break;
      }
    }
    Game_load(width,height);
  },);
}

var Button_time_next = 3;
var Button_time = Button_time_next;

function Game_load(width,height){
  var game = new Game(width, height);

  var loadScene = new Scene();
	game.loadingScene = loadScene;

  var label = new Label();
  var progress = 0;

  var Texts = Class.create(Label, {
    initialize: function(a,b) {
      Label.call(this);
      this.font  = "30px monospace";
      this.color = 'black';
      this.x = 10;
      this.y = 100 + 40*b;
      this.width = width;
      this.height = 30;
      this.text = a;
      loadScene.addChild(this);
    }
  });

  if(Data_loading){
    var Kousin2 = Kousin1+"↓"+Version;
    var Kousin3 = Kousin2.split("↓")
    for (var i = 0; i < Kousin3.length; i++) {
      new Texts(Kousin3[i],i);
    }
  }

  var Sheets = new Texts("",5);

    loadScene.addEventListener('progress', function(e){

    label.moveTo(10,100 + 40*4);
    label.color = 'Black';
    label.font  = "30px monospace";
    label.width = width;
    loadScene.addChild(label);

  	progress = e.loaded / e.total;
  	progress *= 100;
  	progress = Math.round(progress);
    if(progress<10) progress = "00" + progress;
    else if(progress<100) progress = "0" + progress;
    label.text = "画像・音読み込み" + progress + "％";

  });
  loadScene.addEventListener('load', function(e) {
      var core = enchant.Core.instance;
      core.removeScene(core.loadingScene);
      core.dispatchEvent(e);
  });
  game.preload("../image/カットイン.png");
  game.preload("../image/Explosion.png");
  //game.preload("../image/リバーシ.png");
  //game.preload("../image/Set_button.png");
  //game.preload("../image/stone.png");
  //game.preload("../image/Hand.png");
  //game.preload("../image/V_or_D.png");

  game.fps = 10;
  game.onload = function(){

  	game.addEventListener("enterframe", function(){
      if(Button_time==Button_time_next) return;
      else Button_time++;
      return;
    });

    var XXX = width;
    var YYY = width/16*9;
    var Rotation_Y = 0;
    var Cut_in_time = 0;
    var Syougen_time = 0;
    var Syougen_time2 = 1;
    var Datas = [];
    var Setting_Flag = ["名前","苗字","未設定",game.fps,"最初から",0,0,0,true,5,5,5,"最初から","Black","",0];
    var Favorability_Flag = [];//好感度
    //[0名前,1苗字,2性別,3fps,4直前,5アイテムページ,6人物ページ,7トロフィーページ,8オートセーブ,9BGM音量,10効果音音量,11音声音量,12調べる,13背景,14BGM,15ループ箇所];
    var Flag = [];//フラグ
    var Log_Flag = [];//記録
    var Item_Flag = [];//所持アイテム
    var Character_Flag = [];//人物
    var Trophy_Flag = [];//トロフィー
    var Scene_kazu = 1;
    var OASOBI = false;

    function Button_push(expression){
      if(Button_time==Button_time_next){
        game.fps = 10;
        Button_time = 0;
        switch (expression) {
          case "音無し":
            break;
          default:
            Sound_ON(expression);
            break;
        }
        return(false);
      }
      else return(true);
    }
    function conversion_url(name,Type){
      switch (Type) {
        case "画像":
          for (var i = 0; i < Image_DATAS.length; i++) {
            if(Image_DATAS[i].名前==name) return(Image_DATAS[i].url);
          }
          break;
        case "サウンド":
          for (var i = 0; i < Sounds_DATAS.length; i++) {
            if(Sounds_DATAS[i].名前==name) return(Sounds_DATAS[i].url);
          }
          break;
        case "id":
          for (var i = 0; i < Sounds_DATAS.length; i++) {
            if(Sounds_DATAS[i].名前==name) return(Sounds_DATAS[i].備考);
          }
          break;
        case "比率":
          for (var i = 0; i < Image_DATAS.length; i++) {
            if(Image_DATAS[i].名前==name) return(Image_DATAS[i].備考);
          }
          break;
      }
      return(name);
    }
    function Sound_branch(Sound_url,Volume){
      for (var i = 0; i < SE.length; i++) {
        if(SE[i].title == Sound_url) break;
      }
      if(Volume){
        Volume /= 10;
        SE[i].volume = Volume;
        if(SE[i].paused) SE[i].play();
        else SE[i].currentTime = 0;
      }
      else{
        if(SE[i].paused==false) SE[i].pause();
      }
      return;
    }
    function Sound_ON(Sound_Name){
      for (var i = 0; i < Sound_effect_DATAS.length; i++) {
        if(Sound_effect_DATAS[i]==Sound_Name){
          Sound_branch(Sound_Name,Setting_Flag[10]);
          return;
          Sound_branch(conversion_url(Sound_Name,"サウンド"),Setting_Flag[10]);
          return;
        }
      }
      for (var i = 0; i < Voice_DATAS.length; i++) {
        if(Voice_DATAS[i]==Sound_Name){
          Sound_branch(Sound_Name,Setting_Flag[11]);
          return;
          Sound_branch(conversion_url(Sound_Name,"サウンド"),Setting_Flag[11]);
          return;
        }
      }
      Sound_branch("スカ",Setting_Flag[10]);
      return;
    }
    function BGM_ON(BGM_Name){
      if(BGM_Name=="変化無し") BGM_Name = Setting_Flag[14];
      else Setting_Flag[14] = BGM_Name;
      if(BGM_Name==""){
        if(BGM.paused==false) BGM.pause();
        BGM.title = "無";
      }
      else{
        if(BGM.title == BGM_Name && BGM.paused == false) return;
        if(BGM.paused==false) BGM.pause();
        BGM.src = conversion_url(BGM_Name,"サウンド");
        BGM.currentTime = 0;
        BGM.volume = Setting_Flag[9]/10;
        BGM.play();
        BGM.title = BGM_Name;
        BGM.id = conversion_url(BGM_Name,"id");
      }
      return;
    }
    function Get_ICFT(DATAS){
      switch (DATAS[0]) {
        case "フラグ":
          for (var i = 0; i < Flag.length; i++){
            if(DATAS[1].split("→")[1]=="消滅"&&Flag[i]==DATAS[1].split("→")[0]){
              Flag.splice(i,1);
              return;
            }
            if(Flag[i]==DATAS[1]) return;
          }
          Flag[Flag.length] = DATAS[1];
          return;
          break;
        case "記録":
          for (var i = 0; i < Log_Flag.length; i++){
            if(DATAS[1].split("→")[1]=="消滅"&&Log_Flag[i]==DATAS[1].split("→")[0]){
              Log_Flag.splice(i,1);
              return;
            }
            if(Log_Flag[i]==DATAS[1]) return;
          }
          Log_Flag[Log_Flag.length] = DATAS[1];
          window.localStorage.setItem(GAS+"Log_Flag",Log_Flag);
          return;
          break;
        case "人物":
          Choice_Flag = Character_Flag;
          Numbers = 6;
          break;
        case "アイテム":
          Choice_Flag = Item_Flag;
          Numbers = 5;
          break;
        case "トロフィー":
          Choice_Flag = Trophy_Flag;
          Numbers = 7;
          break;
        case "好感度":
          for (var i = 0; i < Favorability_Flag.length; i++){
            if(Favorability_Flag[i][0]==DATAS[1].split("→")[0]) break;
          }
          if(i==Favorability_Flag.length) Favorability_Flag[i] = [DATAS[1].split("→")[0],0];
          var PURAMAI = DATAS[1].split("→")[1].substring(0,1);
          switch (PURAMAI){
            case "+":
            case "-":
              Favorability_Flag[i][1] = Favorability_Flag[i][1]*1+DATAS[1].substring(DATAS[1].indexOf(PURAMAI))*1;
              break;
            default:
              Favorability_Flag[i][1] = DATAS[1].split("→")[1]*1;
              break;
          }
          console.log(Favorability_Flag);
          return;
          break;
        default:
          return;
          break;
      }
      if(DATAS[1].split("→").length==2){
        for (var i = 0; i < Choice_Flag.length; i++) {
          if(Choice_Flag[i][0]==DATAS[1].split("→")[0]) break;
        }
        if(Choice_Flag.length==i) return;
        if(DATAS[1].split("→")[1]=="消滅"){
          Choice_Flag.splice(i,1);
          if(Setting_Flag[Numbers]==Choice_Flag.length) Setting_Flag[Numbers]-=5;
        }
        else{
          DATAS = [
            DATAS[1].split("→")[1],
            DATAS[2],
            DATAS[3],
            DATAS[4],
            DATAS[5],
            DATAS[6],
          ];
          Choice_Flag[i] = DATAS;
        }
      }
      else{
        for (var i = 0; i < Choice_Flag.length; i++) {
          if(Choice_Flag[i][0]==DATAS[1]) break;
        }
        DATAS = [
          DATAS[1],
          DATAS[2],
          DATAS[3],
          DATAS[4],
          DATAS[5],
          DATAS[6],
        ];
        Choice_Flag[i] = DATAS;
      }
      return;
    }//アイテム関連
    function Get_ICFT2(DATAS,Person,Get){
      if(DATAS.入手!=false){
        GET = DATAS.入手.replace(/↓/g,"\n");
        GET = GET.split("\n");
          for (var l = 0; l < GET.length; l++) {
            switch(GET[l]){
            case "フラグリセット":
                Flag = [];
                continue;
                break;
            case "アイテムリセット":
              Item_Flag = [];
              continue;
              break;
            case "人物リセット":
              Character_Flag = [];
              continue;
              break;
            default:
              if(Get==false) return;
              console.log(GET[l]);
              break;
            }
            for (var k = 0; k < I_C_F_T_DATAS.length; k++) {
              if(I_C_F_T_DATAS[k].入手==GET[l]){
                break;
              }
            }
            DATAS = [
              I_C_F_T_DATAS[k].タイプ,
              I_C_F_T_DATAS[k].アイテムor人物orフラグ名orトロフィー名,
              I_C_F_T_DATAS[k].説明文.replace(/\n/g,"↓").replace(/\(一人称\)/g,Person),
              I_C_F_T_DATAS[k].画像,
              I_C_F_T_DATAS[k].詳細文,
              I_C_F_T_DATAS[k].詳細内容,
              I_C_F_T_DATAS[k].コード
            ];
            Get_ICFT(DATAS);
          }
        }
    }
    function Scene_loads(Number,Return,Item,Item_type){
      if(Item){
        if(Item_type) Number = [Number+"で"+Item+"をつきつける",Number+"で"+Item_type+"をつきつける"];
        else Number = [Number.split("↓")[0]+"で"+Item+"を使用",Number.split("↓")[1]];
        Item = Number[1];
        Number = Number[0];
        if(have(Number+"既読")){
          var Get = false;
        }
        else{
          var Get = true;
          Flag[Flag.length] = Number+"既読";
        }
        if(have(Number+"プレイ済み")==false){
          Log_Flag[Log_Flag.length] = Number+"プレイ済み";
          window.localStorage.setItem(GAS+"Log_Flag",Log_Flag);
          console.log(Number);
        }
      }
      else{
        if(have(Number+"既読")){
          var Get = false;
        }
        else{
          var Get = true;
          Flag[Flag.length] = Number+"既読";
        }
        if(have(Number+"プレイ済み")==false){
          Log_Flag[Log_Flag.length] = Number+"プレイ済み";
          window.localStorage.setItem(GAS+"Log_Flag",Log_Flag);
          console.log(Number);
        }
      }
      var Name = Setting_Flag[0];
      var Gender = Setting_Flag[2];
      var Surname = Setting_Flag[1];
      if(Gender=="男"){
      var www = ["僕","俺"];
      var Person = www[rand(1)];
      var S_image = "男主人公";
      var S_Sound = "男主人公ポポポ";
      if(Surname=="不動"&&Name=="遊星"){
        var Person = "俺";
        var S_image = "蟹";
      }
      }
      else if(Gender=="女"){
      var Person = "私";
      var S_image = "女主人公";
      var S_Sound = "女主人公ポポポ";
      }
      else{
      var Person = "我";
      var S_image = "../image/ユベル.png";
      var S_Sound = "未設定主人公ポポポ";
      }
      if(Surname=="妥協"&&Name=="満足"){
        var Person = "僕";
        var S_image = "満足";
        var S_Sound = "スナネコ";
      }
      switch (Number) {
        case "セーブ読み込み":
          Moves = Load_Datas();
          game.pushScene(MoveScene(10));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
          return;
          break;
        case "タイトルに戻る":
          if(BGM.paused==false) BGM.pause();
          BGM.currentTime = 0;
          game.replaceScene(TitleScene());
          return;
          break;
        case "直前":
          if(Scene_kazu==2){
            game.popScene();
            Scene_kazu--;
            console.log(Scene_kazu);
            return;
          }
          Number = Setting_Flag[4];
          console.log("直前",Number);
          Scene_loads(Number,true,false);
          return;
          break;
        case "調べる何もない":
          Datas[1] = 0;
          Datas[2] = 0;
          Datas[3] = 0;
          Datas[4] = 0;
          Datas[5] = 0;
          Datas[6] = 0;
          Datas[7] = "";
          Datas[8] = "特に気になるものはない。";
          Datas[9] = 0;
          Datas[10] = 0;
          Datas[11] = "無し";
          Datas[12] = Setting_Flag[12];
          Datas[13] = 0;
          Datas[19] = S_Sound;
          game.replaceScene(MainScene(Return,Number));
          return;
          break;
        case "調べる":
          Number = Setting_Flag[12];
          Scene_loads(Number,false,false);
          return;
          break;
        default:
          break;
      }
      Datas = [];
      game.fps = 10;
      Setting_Flag[3] = game.fps;
      for (var i = 0; i < Main_DATAS.length; i++) {
        if(Number==Main_DATAS[i].シーン名){
          BGM_ON(Main_DATAS[i].BGM);
          Get_ICFT2(Main_DATAS[i],Person,Get);
          game.fps = Main_DATAS[i].速度;
          Setting_Flag[3] = game.fps;
          if(Main_DATAS[i].背景=="変化無し") Datas[0] = conversion_url(Setting_Flag[13],"画像");
          else {
            if(Main_DATAS[i].セーブ!="無し") Setting_Flag[13] = Main_DATAS[i].背景;
            Datas[0] = conversion_url(Main_DATAS[i].背景,"画像");
          }
          if(Main_DATAS[i].左側の人物.split("イン").length==1&&Main_DATAS[i].左側の人物.split("アウト").length==1&&Main_DATAS[i].左側の人物.split("点滅").length==1){
            Datas[1] = Main_DATAS[i].左側の人物;
            Datas[2] = 0;
          }
          else{
            if(Main_DATAS[i].左側の人物.split("イン").length==2){
              Datas[1] = Main_DATAS[i].左側の人物.split("イン")[0];
              Datas[2] = Main_DATAS[i].左側の人物.split("イン")[1]*1;
            }
            else if(Main_DATAS[i].左側の人物.split("点滅").length==2){
              Datas[1] = Main_DATAS[i].左側の人物.split("点滅")[0];
              Datas[2] = "点滅";
            }
            else{
              Datas[1] = Main_DATAS[i].左側の人物.split("アウト")[0];
              Datas[2] = Main_DATAS[i].左側の人物.split("アウト")[1]*-1;
            }
          }
          if(Main_DATAS[i].真ん中の人物.split("イン").length==1&&Main_DATAS[i].真ん中の人物.split("アウト").length==1){
            Datas[3] = Main_DATAS[i].真ん中の人物;
            Datas[4] = 0;
          }
          else{
            if(Main_DATAS[i].真ん中の人物.split("イン").length==2){
              Datas[3] = Main_DATAS[i].真ん中の人物.split("イン")[0];
              Datas[4] = Main_DATAS[i].真ん中の人物.split("イン")[1]*1;
            }
            else{
              Datas[3] = Main_DATAS[i].真ん中の人物.split("アウト")[0];
              Datas[4] = Main_DATAS[i].真ん中の人物.split("アウト")[1]*-1;
            }
          }
          if(Main_DATAS[i].右側の人物.split("イン").length==1&&Main_DATAS[i].右側の人物.split("アウト").length==1){
            Datas[5] = Main_DATAS[i].右側の人物;
            Datas[6] = 0;
          }
          else{
            if(Main_DATAS[i].右側の人物.split("イン").length==2){
              Datas[5] = Main_DATAS[i].右側の人物.split("イン")[0];
              Datas[6] = Main_DATAS[i].右側の人物.split("イン")[1]*1;
            }
            else{
              Datas[5] = Main_DATAS[i].右側の人物.split("アウト")[0];
              Datas[6] = Main_DATAS[i].右側の人物.split("アウト")[1]*-1;
            }
          }
          if(Main_DATAS[i].人物名=="(主人公名前)") Datas[18] = true;
          Datas[7] = Main_DATAS[i].人物名.replace(/\(主人公苗字\)/g,Surname).replace(/\(主人公名前\)/,Name);
          Datas[8] = Main_DATAS[i].文章.replace(/\n/g,"↓").replace(/\(主人公苗字\)/g,Surname).replace(/\(主人公名前\)/g,Name).replace(/\(一人称\)/g,Person);
          for (var k = 0; k < Favorability_Flag.length; k++){
            var Favorability = "("+Favorability_Flag[k][0]+"好感度)";
            Datas[8] = Datas[8].replace(Favorability,Favorability_Flag[k][1]);
          }
          Datas[9] = Main_DATAS[i].前前;
          Datas[10] = Main_DATAS[i].前;
          Datas[11] = Main_DATAS[i].セーブ;
          Datas[12] = Main_DATAS[i].次;
          Datas[13] = Main_DATAS[i].次次;
          Datas[14] = Main_DATAS[i].表示アイテムx座標;
          Datas[15] = conversion_url(Main_DATAS[i].表示アイテム画像,"画像");
          Datas[16] = Main_DATAS[i].トロフィー;
          Datas[19] = Main_DATAS[i].文章音;
          Datas[20] = Main_DATAS[i].表示アイテムy座標;
          Datas[21] = Main_DATAS[i].表示アイテムフェード;
          if(Datas[1]=="主人公") Datas[1] = S_image;
          if(Datas[3]=="主人公") Datas[3] = S_image;
          if(Datas[5]=="主人公") Datas[5] = S_image;
          if(Datas[19]=="主人公") Datas[19] = S_Sound;
          game.replaceScene(MainScene(Return,Number));
          return;
        }
      }
      for (var i = 0; i < Choice_DATAS.length; i++) {
        if(Number==Choice_DATAS[i].シーン名){
          BGM_ON(Choice_DATAS[i].BGM);
          Get_ICFT2(Choice_DATAS[i],Person,Get);
          if(Choice_DATAS[i].背景=="変化無し") Datas[0] = conversion_url(Setting_Flag[13],"画像");
          else {
            if(Choice_DATAS[i].セーブ!="無し") Setting_Flag[13] = Choice_DATAS[i].背景;
            Datas[0] = conversion_url(Choice_DATAS[i].背景,"画像");
          }
          Datas[1] = Choice_DATAS[i].左側の人物;
          Datas[2] = Choice_DATAS[i].真ん中の人物;
          Datas[3] = Choice_DATAS[i].右側の人物;
          Datas[4] = Choice_DATAS[i].前前;
          Datas[5] = Choice_DATAS[i].前;
          Datas[6] = Choice_DATAS[i].セーブ;
          Datas[7] = Choice_DATAS[i].選択肢1;
          Datas[8] = Choice_DATAS[i].選択肢1移動先;
          Datas[9] = Choice_DATAS[i].選択肢2;
          Datas[10] = Choice_DATAS[i].選択肢2移動先;
          Datas[11] = Choice_DATAS[i].選択肢3;
          Datas[12] = Choice_DATAS[i].選択肢3移動先;
          Datas[13] = Choice_DATAS[i].選択肢4;
          Datas[14] = Choice_DATAS[i].選択肢4移動先;
          Datas[15] = Choice_DATAS[i].選択肢5;
          Datas[16] = Choice_DATAS[i].選択肢5移動先;
          Datas[17] = Choice_DATAS[i].選択肢6;
          Datas[18] = Choice_DATAS[i].選択肢6移動先;
          if(Datas[1]=="主人公") Datas[1] = S_image;
          if(Datas[2]=="主人公") Datas[2] = S_image;
          if(Datas[3]=="主人公") Datas[3] = S_image;
          game.replaceScene(ChoiceScene(Number));
          return;
        }
      }
      for (var i = 0; i < Move_DATAS.length; i++) {
        if(Number==Move_DATAS[i].シーン名){
          Moves = Move_DATAS[i].移動先;
          game.pushScene(MoveScene(10));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
          return;
        }
      }
      for (var i = 0; i < Branch_DATAS.length; i++) {
        if(Number==Branch_DATAS[i].シーン名){
          if(Branch_DATAS[i].アイテムorフラグ名.split(">").length==2){
            for (var k = 0; k < Favorability_Flag.length; k++){
              if(Favorability_Flag[k][0]==Branch_DATAS[i].アイテムorフラグ名.split(">")[0]) break;
            }
            if(k==Favorability_Flag.length) Favorability_Flag[k] = [Branch_DATAS[i].アイテムorフラグ名.split(">")[0],0];
            if(Favorability_Flag[k][1]>Branch_DATAS[i].アイテムorフラグ名.split(">")[1]*1){
              Scene_loads(Branch_DATAS[i].ある,Return,Item);
            }
            else Scene_loads(Branch_DATAS[i].ない,Return,Item);
            return;
          }
          if(have(Branch_DATAS[i].アイテムorフラグ名)) Scene_loads(Branch_DATAS[i].ある,Return,Item);
          else Scene_loads(Branch_DATAS[i].ない,Return,Item);
          return;
        }
      }
      for (var i = 0; i < Item_get_DATAS.length; i++) {
        if(Number==Item_get_DATAS[i].シーン名){
          Get_ICFT2(Item_get_DATAS[i],Person,Get);
          if(Get){
            game.pushScene(ItemgetScene(conversion_url(Item_get_DATAS[i].画像,"画像"),Item_get_DATAS[i].文章,Item_get_DATAS[i].次のシーン));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else Scene_loads(Item_get_DATAS[i].次のシーン,false,false);
          return;
        }
      }
      for (var i = 0; i < Inspect_DATAS.length; i++) {
        if(Number==Inspect_DATAS[i].シーン名){
          var Inspect = ["背景ナンバー","(幅,高さ,x座標,y座標,シーンナンバー)"];
          Setting_Flag[12] = Number;
          if(Inspect_DATAS[i].背景=="変化無し") Inspect[0] = conversion_url(Setting_Flag[13],"画像");
          else {
            if(Inspect_DATAS[i].背景=="留置所背景") Inspect[0] = "../image/背景/留置所背景.png";
            else if (Inspect_DATAS[i].背景=="留置所") Inspect[0] = "../image/背景/留置所.png";
            else Inspect[0] = Inspect_DATAS[i].背景;
            Setting_Flag[13] = Inspect[0];
          }
          if(Inspect_DATAS[i].x座標1) Inspect[1] = Inspect_DATAS[i].x座標1;
          if(Inspect_DATAS[i].y座標1) Inspect[2] = Inspect_DATAS[i].y座標1;
          if(Inspect_DATAS[i].幅1) Inspect[3] = Inspect_DATAS[i].幅1;
          if(Inspect_DATAS[i].高さ1) Inspect[4] = Inspect_DATAS[i].高さ1;
          if(Inspect_DATAS[i].移動先1) Inspect[5] = Inspect_DATAS[i].移動先1;
          if(Inspect_DATAS[i].x座標2) Inspect[6] = Inspect_DATAS[i].x座標2;
          if(Inspect_DATAS[i].y座標2) Inspect[7] = Inspect_DATAS[i].y座標2;
          if(Inspect_DATAS[i].幅2) Inspect[8] = Inspect_DATAS[i].幅2;
          if(Inspect_DATAS[i].高さ2) Inspect[9] = Inspect_DATAS[i].高さ2;
          if(Inspect_DATAS[i].移動先2) Inspect[10] = Inspect_DATAS[i].移動先2;
          if(Inspect_DATAS[i].x座標3) Inspect[11] = Inspect_DATAS[i].x座標3;
          if(Inspect_DATAS[i].y座標3) Inspect[12] = Inspect_DATAS[i].y座標3;
          if(Inspect_DATAS[i].幅3) Inspect[13] = Inspect_DATAS[i].幅3;
          if(Inspect_DATAS[i].高さ3) Inspect[14] = Inspect_DATAS[i].高さ3;
          if(Inspect_DATAS[i].移動先3) Inspect[15] = Inspect_DATAS[i].移動先3;
          if(Inspect_DATAS[i].x座標4) Inspect[16] = Inspect_DATAS[i].x座標4;
          if(Inspect_DATAS[i].y座標4) Inspect[17] = Inspect_DATAS[i].y座標4;
          if(Inspect_DATAS[i].幅4) Inspect[18] = Inspect_DATAS[i].幅4;
          if(Inspect_DATAS[i].高さ4) Inspect[19] = Inspect_DATAS[i].高さ4;
          if(Inspect_DATAS[i].移動先4) Inspect[20] = Inspect_DATAS[i].移動先4;
          if(Inspect_DATAS[i].x座標5) Inspect[21] = Inspect_DATAS[i].x座標5;
          if(Inspect_DATAS[i].y座標5) Inspect[22] = Inspect_DATAS[i].y座標5;
          if(Inspect_DATAS[i].幅5) Inspect[23] = Inspect_DATAS[i].幅5;
          if(Inspect_DATAS[i].高さ5) Inspect[24] = Inspect_DATAS[i].高さ5;
          if(Inspect_DATAS[i].移動先5) Inspect[25] = Inspect_DATAS[i].移動先5;
          Datas[0] = conversion_url(Inspect[0],"画像");
          game.replaceScene(InspectScene(Inspect));
          return;
        }
      }
      for (var i = 0; i < Interrogation_DATAS.length; i++) {
        if(Number==Interrogation_DATAS[i].シーン名){
          if(Interrogation_DATAS[i].セーブ!="無し") Setting_Flag[13] = "stand";
          BGM_ON(Interrogation_DATAS[i].BGM);
          Datas[0] = Interrogation_DATAS[i].人物;
          Datas[1] = Interrogation_DATAS[i].人物名;
          Datas[2] = Interrogation_DATAS[i].証言;
          Datas[3] = Interrogation_DATAS[i].待った移動場所;
          Datas[4] = Interrogation_DATAS[i].前;
          Datas[5] = Interrogation_DATAS[i].セーブ;
          Datas[6] = Interrogation_DATAS[i].次;
          Datas[7] = Interrogation_DATAS[i].正解移動場所;
          Datas[8] = Interrogation_DATAS[i].正解アイテム;
          game.replaceScene(InterrogationScene(Number));
          return;
        }
      }
      for (var i = 0; i < Speech_DATAS.length; i++) {
        if(Number==Speech_DATAS[i].シーン名){
          Datas[0] = conversion_url(Speech_DATAS[i].吹き出し画像,"画像");
          Datas[1] = Speech_DATAS[i].再生音声;
          Datas[2] = Speech_DATAS[i].次のシーン;
          Scene_kazu++;
          console.log(Scene_kazu);
          game.pushScene(PopScene(Datas[2],Datas[0],Datas[1]));
          return;
        }
      }
      if(Item){
        Scene_loads(Item,false,false);
        return;
      }
      Datas[0] = "Black";
      Datas[1] = "";
      Datas[2] = "";
      Datas[3] = "";
      Datas[4] = "";
      Datas[5] = "";
      Datas[6] = "";
      Datas[7] = "製作者";
      Datas[8] = "ここから先は出来ていません。↓更新をお待ちください。↓" + Kousin2;
      Datas[9] = "";
      Datas[10] = "";
      Datas[11] = "";
      Datas[12] = "未完成";
      Datas[13] = "";
      Datas[14] = "";
      Datas[15] = "";
      Datas[16] = "";
      Datas[17] = "";
      Datas[18] = "";
      Datas[19] = "日付";
      game.replaceScene(MainScene(Return));
      return;
    }
    function Load_Datas(){
      Flag = window.localStorage.getItem(GAS+"Flag").split(",");
      Log_Flag = window.localStorage.getItem(GAS+"Log_Flag").split(",");
      Setting_Flag = window.localStorage.getItem(GAS+"Setting_Flag").split(",");
      Datas = window.localStorage.getItem(GAS+"Datas").split(",");
      Number = window.localStorage.getItem(GAS+"Number");
      if(Number.replace(/\d/g,"").replace(/\./g,"")=="") Number = Number*1;
      Item_Flag = window.localStorage.getItem(GAS+"Item").split("端");
      Trophy_Flag = window.localStorage.getItem(GAS+"Trophy").split("端");
      Character_Flag = window.localStorage.getItem(GAS+"Character").split("端");
      Favorability_Flag = window.localStorage.getItem(GAS+"Favorability").split("端");
      for (var i = 0; i < Item_Flag.length; i++){
        Item_Flag[i] = Item_Flag[i].split(",");
      }
      for (var i = 1; i < Item_Flag.length; i++){
        var Item_Flag2 = [];
        for (var k = 1; k < Item_Flag[i].length; k++){
          Item_Flag2[k-1] = Item_Flag[i][k];
        }
        Item_Flag[i] = Item_Flag2;
      }
      for (var i = 0; i < Item_Flag.length-1; i++) {
        Item_Flag2[i] = Item_Flag[i];
      }
      Item_Flag = Item_Flag2;
      if(Item_Flag == undefined) Item_Flag = [];
      for (var i = 0; i < Character_Flag.length; i++){
        Character_Flag[i] = Character_Flag[i].split(",");
      }
      for (var i = 1; i < Character_Flag.length; i++){
        var Character_Flag2 = [];
        for (var k = 1; k < Character_Flag[i].length; k++){
          Character_Flag2[k-1] = Character_Flag[i][k];
        }
        Character_Flag[i] = Character_Flag2;
      }
      for (var i = 0; i < Character_Flag.length-1; i++) {
        Character_Flag2[i] = Character_Flag[i];
      }
      Character_Flag = Character_Flag2;
      if(Character_Flag == undefined) Character_Flag = [];
      for (var i = 0; i < Trophy_Flag.length; i++){
        Trophy_Flag[i] = Trophy_Flag[i].split(",");
      }
      for (var i = 1; i < Trophy_Flag.length; i++){
        var Trophy_Flag2 = [];
        for (var k = 1; k < Trophy_Flag[i].length; k++){
          Trophy_Flag2[k-1] = Trophy_Flag[i][k];
        }
        Trophy_Flag[i] = Trophy_Flag2;
      }
      for (var i = 0; i < Trophy_Flag.length-1; i++) {
        Trophy_Flag2[i] = Trophy_Flag[i];
      }
      Trophy_Flag = Trophy_Flag2;
      if(Trophy_Flag == undefined) Trophy_Flag = [];
      for (var i = 0; i < Favorability_Flag.length; i++){
        Favorability_Flag[i] = Favorability_Flag[i].split(",");
      }
      for (var i = 1; i < Favorability_Flag.length; i++){
        var Favorability_Flag2 = [];
        for (var k = 1; k < Favorability_Flag[i].length; k++){
          Favorability_Flag2[k-1] = Favorability_Flag[i][k];
        }
        Favorability_Flag[i] = Favorability_Flag2;
      }
      for (var i = 0; i < Favorability_Flag.length-1; i++) {
        Favorability_Flag2[i] = Favorability_Flag[i];
      }
      Favorability_Flag = Favorability_Flag2;
      if(Favorability_Flag == undefined) Favorability_Flag = [];
      for (var i = 3; i < Setting_Flag.length; i++){
        if(Setting_Flag[i]=="true") Setting_Flag[i] = true;
        else if(Setting_Flag[i]=="false") Setting_Flag[i] = false
        else if(Setting_Flag[i].replace(/\d/g,"").replace(/\./g,"")=="") Setting_Flag[i] = Setting_Flag[i]*1;
        //[0名前,1苗字,2性別,3fps,4直前,5アイテムページ,6人物ページ,7トロフィーページ,8オートセーブ,9BGM音量,10効果音音量,11音声音量,12調べる,13背景,14BGM,15ループ箇所];
      }
      for (var i = 0; i < Datas.length; i++){
        if(Datas[i].replace(/\d/g,"").replace(/\./g,"")=="") Datas[i] = Datas[i]*1;
      }
      return(Number);
    }
    function have(a){
      for (var i = 0; i < Item_Flag.length; i++) {
        if(Item_Flag[i][5]==a) return(true);
      }
      for (var i = 0; i < Trophy_Flag.length; i++) {
        if(Trophy_Flag[i][0]==a) return(true);
      }
      for (var i = 0; i < Flag.length; i++) {
        if(Flag[i]==a) return(true);
      }
      for (var i = 0; i < Log_Flag.length; i++) {
        if(Log_Flag[i]==a) return(true);
      }
      return(false);
    }
    function Save(Number){
    if(Setting_Flag[1]=="妥協"&&Setting_Flag[0]=="満足"){
      window.localStorage.setItem("管理者","満足");
    }
    else if(Setting_Flag[2]=="男"&&Setting_Flag[1]=="不動"&&Setting_Flag[0]=="遊星"){
      window.localStorage.setItem("管理者","満足");
    }
    else if(Setting_Flag[1]=="テスト"&&Setting_Flag[0]=="プレイヤー"){
      window.localStorage.setItem("管理者","満足");
    }
    else window.localStorage.setItem("管理者","不満");
    window.localStorage.setItem("GAS",GAS);
    window.localStorage.setItem(GAS+"Flag",Flag);
    window.localStorage.setItem(GAS+"Datas",Datas);
    window.localStorage.setItem(GAS+"Number",Number);
    window.localStorage.setItem(GAS+"Version",Version);
    window.localStorage.setItem(GAS+"Log_Flag",Log_Flag);
    window.localStorage.setItem(GAS+"Setting_Flag",Setting_Flag);
    var Item_Flag2 = [];
    for (var i = 0; i < Item_Flag.length; i++) {
    Item_Flag2[i] = Item_Flag[i] + "端";
    }
    if(Item_Flag2==[]) Item_Flag2 = [[]+"端"]
    window.localStorage.setItem(GAS+"Item",Item_Flag2);
    var Character_Flag2 = [];
    for (var i = 0; i < Character_Flag.length; i++) {
    Character_Flag2[i] = Character_Flag[i] + "端";
    }
    if(Character_Flag2==[]) Character_Flag2 = [[]+"端"]
    window.localStorage.setItem(GAS+"Character",Character_Flag2);
    var Favorability_Flag2 = [];
    for (var i = 0; i < Favorability_Flag.length; i++) {
    Favorability_Flag2[i] = Favorability_Flag[i] + "端";
    }
    if(Favorability_Flag2==[]) Favorability_Flag2 = [[]+"端"]
    window.localStorage.setItem(GAS+"Favorability",Favorability_Flag2);
    window.localStorage.setItem(GAS+"syoken",false);
    console.log(Datas);
    }//セーブ
    function rand(n) {
    return Math.floor(Math.random() * (n + 1));
    }
    function GAS_nyuryoku(a){
      GAS = a;
      fetch(a,
        {
          method: 'POST',
          body: ""
        }
      )
      .then(res => res.json())
      .then(result => {
        Image_urls = [];
        Move_DATAS = result.移動;
        Sounds_DATAS = result.音;
        Image_DATAS = result.画像;
        Main_DATAS = result.メイン;
        Choice_DATAS = result.選択;
        Branch_DATAS = result.分岐;
        Item_get_DATAS = result.入手;
        Inspect_DATAS = result.調べる;
        I_C_F_T_DATAS = result.フラグ類;
        Speech_DATAS = result.吹き出し;
        Kousin1 = result.更新[0].更新日;
        Kousin2 = Kousin1+"↓"+Version;
        Interrogation_DATAS = result.尋問;
        for (var i = 0; i < Image_DATAS.length; i++){
          if(Image_DATAS[i].url.substring(0,4)!="http"){
            Image_DATAS[i].url = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/" + Image_DATAS[i].url;
          }
          else if(Image_DATAS[i].url.substring(0,18)=="https://gyazo.com/"){
              Image_DATAS[i].url = "https://i."+Image_DATAS[i].url.substring(8)+".png\")";
          }
          Image_urls[i] = Image_DATAS[i].url;
        }
        BGM_DATAS = [];
        Sounds_urls = [];
        Voice_DATAS = [];
        Sound_effect_DATAS = [];
        SE = [];
        for (var i=0,k0=0,k1=0,k2=0,k3=0; i < Sounds_DATAS.length; i++){
          if(Sounds_DATAS[i].url.substring(0,4)!="http"){
            Sounds_DATAS[i].url = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/" + Sounds_DATAS[i].url +".wav";
          }
          switch (Sounds_DATAS[i].備考) {
            default:
              BGM_DATAS[k1] = [Sounds_DATAS[i].url,Sounds_DATAS[i].備考];
              k1++;
              break;
            case "音声":
              Sounds_urls[k0] = Sounds_DATAS[i].url;
              Voice_DATAS[k2] = Sounds_DATAS[i].名前;
              SE[k0] = document.createElement("audio");
              SE[k0].src = Sounds_DATAS[i].url;
              SE[k0].title = Sounds_DATAS[i].名前;
              k0++;
              k2++;
              break;
            case "効果音":
              Sounds_urls[k0] = Sounds_DATAS[i].url;
              Sound_effect_DATAS[k3] = Sounds_DATAS[i].名前;
              SE[k0] = document.createElement("audio");
              SE[k0].src = Sounds_DATAS[i].url;
              SE[k0].title = Sounds_DATAS[i].名前;
              k0++;
              k3++;
              break;
          }
        }
        SE[k0] = document.createElement("audio");
        SE[k0].src = "../sound/スカ.wav";
        SE[k0].title = "スカ";
        Sound_ON("セーブ");
        game.replaceScene(TitleScene());
      },);
      return;
    }
    var TitleScene = function(){

      var scene = new Scene();                                // 新しいシーンを作る
      if(window.localStorage.getItem(GAS+"syoken")!="false"){
        var Data = false;
      }
      else{
        if(window.localStorage.getItem(GAS+"Version")==Version){
          var Version_new = true;
        }
        else var Version_new = false;
        var Data = true;
      }

      if(Data_loading){
        var Title = new Entity();
        Title._element = document.createElement("img");
        Title._element.src = conversion_url("タイトル画面","画像");
        Title.width = width;
        Title.height = width/16*9;
        scene.addChild(Title);

      var Button = [];
      var submits = 0;
      var Numbers = width/16*9+(width/30);
      function Submit(a){
        Button[submits] = new Entity();
        if(a=="データ初期化"){
          Button[submits].moveTo(width/4,0);
        }
        else{
          Button[submits].moveTo(width/4,Numbers);
          Numbers += (width/20)+(width/25)+(width/25);
        }
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        Button[submits].addEventListener('touchstart',function(e){
          Already = true;
          switch (a) {
            case "データ初期化":
            case "データ初期化(推奨)":
              var ooo = "音無し";
              break;
            default:
              var ooo ="選択音";
              break;
          }
          if(Button_push(ooo)) return;
          if(a!="データ初期化"&&a!="データ初期化(推奨)"&&Data) Load_Datas();
          if(a=="最初から"){
            Flag = [];//フラグ
            Item_Flag = [];//所持アイテム
            Character_Flag = [];//人物
          }
          if(a=="テスト用"){
            Log_Flag = [];//記録
            for (var i = 0; i < Main_DATAS.length; i++) {
              Log_Flag[i] = Main_DATAS[i].シーン名 + "プレイ済み";
            }
            for (var k = 0; k < Choice_DATAS.length; k++) {
              Log_Flag[i+k] = Choice_DATAS[k].シーン名 + "プレイ済み";
            }
          }
          switch (a) {
            case "続きから":
              Scene_loads("セーブ読み込み",false,false);
              break;
              case "データ初期化":
              case "データ初期化(推奨)":
              game.pushScene(ClearScene());
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              break;
            default:
              Scene_loads(a,false,false);
              break;
          }
        });
        submits++;
      }

      Submit("最初から");
      if(Data){
        if(Version_new) Submit("データ初期化");
        else Submit("データ初期化(推奨)")
        Submit("続きから");
      }
      Submit("説明");

      if(Version_new){
        if(window.localStorage.getItem("管理者")=="満足") Submit("テスト用");
        else if(Already);
        else {
          fetch(GAS,)
          .then(res => res.json())
          .then(result => {
          },);
        }
      }
      else if(window.localStorage.getItem("管理者")=="満足");
      else if(Already);
      else{
        fetch(GAS,)
        .then(res => res.json())
        .then(result => {
        },);
      }

      var Set_button = new Entity();
      Set_button._element = document.createElement("img");
      Set_button._element.src = "../image/リバーシ.gif";
      Set_button.x = 105;
      Set_button.y = 455;
      Set_button.width = 195;
      Set_button.height = 95;
      //Set_button.frame = 15;
      //scene.addChild(Set_button);

      Set_button.addEventListener('touchstart',function(e){
        console.log(Set_button);
        return;
        game.pushScene(ReversiScene());
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      });

      }
      else{

        var Background = new Entity();
        Background._element = document.createElement("img");
        Background._element.src = "../image/Background.png";
        Background.width = width;
        Background.height = height;
        scene.addChild(Background);

        var Numbers = (width/20);

        var Datakousin = false;
        var Button = [];
        var submits = 0;
        var Numbers = (width/10)+(width/30);
        function Submit(a){
          Button[submits] = new Entity();
          Button[submits].moveTo(width/2-width/1.2/2,Numbers);
          Button[submits].width = width/1.2;
          Button[submits].height = width/10;
          Button[submits]._element = document.createElement('input');
          Button[submits]._element.value = a;
          if(a=="GASのURLを入力してこのボタンを押してね。"){
            Button[submits]._element.type = "submit";
          }
          else {
            if(window.localStorage.getItem("GAS")!=null){
              Button[submits]._element.value = window.localStorage.getItem("GAS");
            }
          }
          scene.addChild(Button[submits]);
          if(a=="GASのURLを入力してこのボタンを押してね。"){
            Button[0].addEventListener('touchstart',function(e){
              if(Data_loading) return;
              this._element.value = "読み込み中…………。";
              Data_loading = true;
              GAS_nyuryoku(Button[1]._element.value);
              return;
            });
          }
          submits++;
          Numbers += (width/20)+(width/25)+(width/25);
        }
        Submit("GASのURLを入力してこのボタンを押してね。");
        Numbers += (width/20)+(width/25)+(width/25);
        Submit("ここにGASのURLを入力してね。");
        if(window.localStorage.getItem("管理者")=="満足"){
          Numbers += (width/20)+(width/25)+(width/25);
          Button[submits] = new Entity();
          Button[submits].moveTo(width/2-width/1.2/2,Numbers);
          Button[submits].width = width/1.2;
          Button[submits].height = width/10;
          Button[submits]._element = document.createElement('input');
          Button[submits]._element.type = "submit";
          Button[submits]._element.value = "家庭用";
          scene.addChild(Button[submits]);
          Button[submits].addEventListener('touchstart',function(e){
            if(Data_loading) return;
            this._element.value = "読み込み中…………。";
            Data_loading = true;
            GAS_nyuryoku("https://script.google.com/macros/s/AKfycbwpMKf5237VlebQuUNjHKYGvLrOi3bdGV1Oa2CKsKAMmv_-mpM/exec");
            return;
          });
          submits++;
          Numbers += (width/20)+(width/25)+(width/25);
          Numbers += (width/20)+(width/25)+(width/25);
          Button[submits] = new Entity();
          Button[submits].moveTo(width/2-width/1.2/2,Numbers);
          Button[submits].width = width/1.2;
          Button[submits].height = width/10;
          Button[submits]._element = document.createElement('input');
          Button[submits]._element.type = "submit";
          Button[submits]._element.value = "自分用";
          scene.addChild(Button[submits]);
          Button[submits].addEventListener('touchstart',function(e){
            if(Data_loading) return;
            this._element.value = "読み込み中…………。";
            Data_loading = true;
            GAS_nyuryoku("https://script.google.com/macros/s/AKfycbykP5rFHcjf_Sd-u0u5_iRoqUlHNl_A02IyjsECYOeaO_Vn00Ap/exec");
            return;
          });
          submits++;
          Numbers += (width/20)+(width/25)+(width/25);
          Numbers += (width/20)+(width/25)+(width/25);
          Button[submits] = new Entity();
          Button[submits].moveTo(width/2-width/1.2/2,Numbers);
          Button[submits].width = width/1.2;
          Button[submits].height = width/10;
          Button[submits]._element = document.createElement('input');
          Button[submits]._element.type = "submit";
          Button[submits]._element.value = "共有用";
          scene.addChild(Button[submits]);
          Button[submits].addEventListener('touchstart',function(e){
            if(Data_loading) return;
            this._element.value = "読み込み中…………。";
            Data_loading = true;
            GAS_nyuryoku("https://script.google.com/macros/s/AKfycbyfEnjDE8FhsxIo97tN5hsvYF_nSW47gwYia54D0-JPgyWti0K4/exec");
            return;
          });
        }
      }

      return scene;
    };
    var MainScene = function(Return,Number){
      var scene = new Scene();                                // 新しいシーンを作る

      var Sound_effect = Datas[8].match(/\(♪[^♪]+♪\)/g);
      Datas[8] = Datas[8].replace(/\(♪[^♪]+♪\)/g,"§");

      if(Datas[11]){
        if(Datas[11]=="無し") Datas[11] = Number;
        else{
          Setting_Flag[4] = Datas[11];
          if(Setting_Flag[8]) Save(Datas[11]);
        }
      }

      if(Datas[0]){
        switch (Datas[0]) {
          case "ヒント":
            var Background = new Sprite();
            Background._element = document.createElement("img");
            Background._element.src = "../image/融合.png";
            Background.width = width*1.2;
            Background.height = width*1.2;
            Background.x = (width - width*1.2)/2;
            Background.y = (width - width*1.6)/2;
            Rotation_Y -= 10;
            Background.rotation = Rotation_Y;
            scene.addChild(Background);//背景
            Background.addEventListener("enterframe",function(){
              Rotation_Y -= 10;
              Background.rotation = Rotation_Y;
              if(Rotation_Y==-360) Rotation_Y = 0;
            });
            break;
            case "Black":
            case "left":
            case "right":
            case "stand":
            case "留置所":
            case "裁判長席":
            var Background = new Sprite();
            Background._element = document.createElement("img");
            Background._element.src = "../image/背景/"+Datas[0]+".png";
            Background.width = width;
            Background.height = width/16*9;
            scene.addChild(Background);
            break;
          case "カットイン":
            break;
          default:
            var Background = new Sprite();
            Background._element = document.createElement("img");
            Background._element.src = conversion_url(Datas[0],"画像");
            Background.width = width;
            Background.height = width/16*9;
            scene.addChild(Background);
            break;
        }

        if(Datas[0]=="カットイン"){
          var ccx = game.assets["../image/カットイン.png"].width*3;
          var ccy = game.assets["../image/カットイン.png"].height;
          var Cut_in = new Sprite(ccx,ccy);
          Cut_in.scaleX = width/ccx*3;
          Cut_in.scaleY = width/16*9/ccy;
          Cut_in.image = game.assets["../image/カットイン.png"];
          Cut_in_time += 10;
          Cut_in.x = (Cut_in.scaleX*ccx/2)-ccx/2-Cut_in_time;
          Cut_in.y = (Cut_in.scaleY*ccy/2)-ccy/2;
          scene.addChild(Cut_in);//背景
          Cut_in.addEventListener("enterframe",function(){
            Cut_in_time += 10;
            Cut_in.x -= 10;
            if(Cut_in_time>width*2){
              Cut_in_time = 0;
              Cut_in.x = (Cut_in.scaleX*ccx/2)-ccx/2;
            }
          })
        }
      }

      var xxx = 80;
      var yyy = 80;
      var Explosion = new Sprite(xxx,yyy);
      Explosion.scaleX = ((width/2)/xxx);
      Explosion.scaleY = (((width/16)*9)/yyy);
      Explosion.image = game.assets["../image/Explosion.png"];
      Explosion.frame = 11;
      Explosion.y = (Explosion.scaleY*yyy/2)-yyy/2;
      scene.addChild(Explosion);

      if(Datas[3]!=false){
        var Character2 = new Sprite();
        Character2._element = document.createElement("img");
        Character2._element.src = conversion_url(Datas[3],"画像");
        Character2.width = width/16*9;
        Character2.height = width/16*9;
        if(Datas[0]=="カットイン"){
          Character2.width = width;
          Character2.height = width;
        }
        else {
          Character2.x = width/4-width/32;
        }
        if(Datas[4]!=0){
          if(Datas[4]>0){
            if(Return!=true){
              Character2.opacity = 0;
              Character2.tl.fadeIn(Datas[4]);
            }
          }
          else{
            if(Return!=true){
              Character2.tl.fadeOut(Datas[4]*-1);
            }
            else Character2.opacity = 0;
          }
        }
        scene.addChild(Character2);
      }//キャラ真ん中

      switch (Datas[0]) {
        case "stand":
        case "留置所":
        case "裁判長席":
          var Stand = new Sprite();
          Stand._element = document.createElement("img");
          Stand._element.src = "../image/"+Datas[0]+".png";
          Stand.width = width;
          Stand.height = width/16*9;
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[1]!=false){
        var Character1 = new Sprite();
        Character1._element = document.createElement("img");
        Character1._element.src = conversion_url(Datas[1],"画像");
        Character1.width = width/16*9;
        Character1.height = width/16*9;
        if(Datas[0]=="カットイン"){
          Character1.width = width;
          Character1.height = width;
          Character1.x = -width/3;
        }
        else {
          Character1.x = -width/32;
        }
        if(Datas[2]!=0){
          if(Datas[2]=="点滅"){
            Character1.opacity = Syougen_time;
            if(Syougen_time<=0){
              Character1.opacity = 0;
              Syougen_time2 = 1;
            }
            scene.addChild(Character1);
            Character1.addEventListener("enterframe",function(){
              Syougen_time += 0.1 * Syougen_time2;
              Character1.opacity = Syougen_time;
              if(Syougen_time>=1) Syougen_time2 = -1;
              if(Syougen_time<=0){
                Character1.opacity = 0;
                Syougen_time2 = 1;
              }
            })
          }
          else if(Datas[2]>0){
            Syougen_time = 0;
            Syougen_time2 = 1;
            if(Return!=true){
              Character1.opacity = 0;
              Character1.tl.fadeIn(Datas[2]);
            }
          }
          else{
            Syougen_time = 0;
            Syougen_time2 = 1;
            if(Return!=true){
              Character1.tl.fadeOut(Datas[2]*-1);
            }
            else Character1.opacity = 0;
          }
        }
        scene.addChild(Character1);
      }//キャラ左

      if(Datas[5]!=false){
        var Character3 = new Sprite();
        Character3._element = document.createElement("img");
        Character3._element.src = conversion_url(Datas[5],"画像");
        Character3.width = width/16*9;
        Character3.height = width/16*9;
        if(Datas[0]=="カットイン"){
          Character3.width = width;
          Character3.height = width;
          Character3.x = width/3;
        }
        else {
          Character3.x = width/2-width/32;
        }
        if(Datas[6]!=0){
          if(Datas[6]>0){
            if(Return!=true){
              Character3.opacity = 0;
              Character3.tl.fadeIn(Datas[6]);
            }
          }
          else{
            if(Return!=true){
              Character3.tl.fadeOut(Datas[6]*-1);
            }
            else Character3.opacity = 0;
          }
        }
        scene.addChild(Character3);
      }//キャラ右

      switch (Datas[0]) {
        case "right":
        case "left":
          var Stand = new Sprite();
          Stand._element = document.createElement("img");
          Stand._element.src = "../image/"+Datas[0]+".png";
          Stand.width = width;
          Stand.height = width/16*9;
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[14]!=undefined&&Datas[14]!=false){
        var Item = new Sprite();
        Item._element = document.createElement("img");
        Item._element.src = conversion_url(Datas[15],"画像");
        Item.width = width/4;
        Item.height = width/4;
        Item.x = Datas[14]*(width/1600);
        Item.y = Datas[20]*(width/16/100);
        if(Datas[21]!=0){
          if(Datas[21]>0){
            if(Return!=true){
              Item.opacity = 0;
              Item.tl.fadeIn(Datas[21]);
              Sound_ON("アイテム表示音");
            }
          }
          else{
            if(Return!=true){
              Item.tl.fadeOut(Datas[21]*-1);
              Sound_ON("アイテム表示音");
            }
            else Item.opacity = 0;
          }
        }
        scene.addChild(Item);
      }//アイテム

      var White_Background = new Sprite();
      White_Background._element = document.createElement("img");
      White_Background._element.src = "../image/白.png";
      White_Background.y = width/16*9;
      White_Background.width = width;
      White_Background.height = height-width/16*9;
      scene.addChild(White_Background);

      C_name = new Sprite();
      C_name._element = document.createElement("innerHTML");
      C_name._style.font  = width/20+"px monospace";
      C_name._element.textContent = "【" + Datas[7].replace(/[㊧㊥㊨]/,"") + "】";
      C_name.y = width/16*9+width/25;
      if(Datas[7]!="") scene.addChild(C_name);//キャラ名

      if(Number=="赤き竜"){

        var S_Input1 = new Entity();
        S_Input1.moveTo((width/4),width/16*9+(width/20)+(width/25)+(width/25));
        S_Input1.width = width/2;
        S_Input1.height = (width/10);
        S_Input1._element = document.createElement("select");

        var Option = [];

        for (var i = 0; i < Choice_DATAS.length; i++){
        Option[i] = document.createElement("option");
        Option[i].text = Choice_DATAS[i].シーン名;
        Option[i].value = Choice_DATAS[i].シーン名;
        S_Input1._element.appendChild(Option[i]);
        }
        for (var i = 0; i < Interrogation_DATAS.length; i++){
        Option[i] = document.createElement("option");
        Option[i].text = Interrogation_DATAS[i].シーン名;
        Option[i].value = Interrogation_DATAS[i].シーン名;
        S_Input1._element.appendChild(Option[i]);
        }
        for (var i = 0; i < Main_DATAS.length; i++){
        Option[i] = document.createElement("option");
        Option[i].text = Main_DATAS[i].シーン名;
        Option[i].value = Main_DATAS[i].シーン名;
        S_Input1._element.appendChild(Option[i]);
        }
        scene.addChild(S_Input1);

        var Buttons = new Entity();
        Buttons.moveTo(width/4,width/16*9+(width/20)+(width/25)+(width/25)+(width/5));
        Buttons.width = width/2;
        Buttons.height = width/10;
        Buttons._element = document.createElement('input');
        Buttons._element.type = "submit";
        Buttons._element.value = "決定";
        scene.addChild(Buttons);
        Buttons.addEventListener('touchstart',function(e){
          if(Button_push("選択音")) return;
          Moves = S_Input1._element.value;
          game.pushScene(MoveScene(10));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        });
      }

      var Numbers = width/16*9+(width/20)+(width/25);

      function Texts(){
        Numbers += width/20+width/25;
        Text[i] = new Sprite();
        Text[i]._element = document.createElement("innerHTML");
        Text[i]._style.font  = width/20+"px monospace";
        Text[i]._element.textContent = "";
        Text[i].y = Numbers;
        if(Datas[19]=="日付") Text[i]._style.color = "green";
        scene.addChild(Text[i]);
      }//会話文

      var Time = 0;
      var k = 0;
      var Text_defined = true;
      var Speak_Character = Datas[7].replace(/[^㊧㊥㊨]/g,"");
      if(Datas[18]){
        if(Datas[1]=="男主人公"||Datas[1]=="女主人公") Speak_Character = "㊧";
        if(Datas[3]=="男主人公"||Datas[3]=="女主人公") Speak_Character = "㊥";
        if(Datas[5]=="男主人公"||Datas[5]=="女主人公") Speak_Character = "㊨";
      }

      var Speak_Background1 = new Sprite();
      Speak_Background1._element = document.createElement("img");
      Speak_Background1._element.src = "../image/吹き出し枠.png";
      Speak_Background1.width = width;
      Speak_Background1.height = height;
      if(Datas[8].substring(0,1)=="「"||Datas[8].substring(0,1)=="(") scene.addChild(Speak_Background1);

      var Speak_Background2 = new Sprite();
      Speak_Background2._element = document.createElement("img");
      Speak_Background2._element.src = "../image/透明.png";
      Speak_Background2.width = width/4;
      Speak_Background2.height = height/5;
      Speak_Background2.y = width/16*9+width/8-height/5;

      if(Speak_Character==""&&Datas[7]){
        switch (Datas[7]){
          case Datas[1]:
            Speak_Character = "㊧";
            break;
          case Datas[3]:
            Speak_Character = "㊥";
            break;
          case Datas[5]:
            Speak_Character = "㊨";
            break;
          default:
            Speak_Character = "無し";
            break;
        }
      }

      switch(Speak_Character){
        case "㊧":
          Speak_Background2.x = width/2-width/8-width/4;
          break;
        case "㊥":
          Speak_Background2.x = width/2-width/8;
          break;
        case "㊨":
          Speak_Background2.x = width/2-width/8+width/4;
          break;
        default:
          Speak_Character = "無し";
          break;
      }

      var Speak_Character_image = 0;
      var Winking_time = 0;
      var sese = 0;

      var Text =[];

      for (var i = 0; i < 6; i++) {
        Texts();
      }

      function T_D(){
        var s = true;
        var Itimozi = Datas[8].substring(Time,Time+1);
        scene.addChild(Speak_Background2);
        switch (Itimozi) {
          case "§":
            s = false;
            if(Return==false) Sound_ON(Sound_effect[sese].replace(/[\(♪\)]/g,""));
            sese++;
            break;
          case "→":
            s = false;
            if(Datas[1]){
              if(Character1._element.title != Datas[1]){
                Character1._element.title = Datas[1];
                Character1._element.src = conversion_url(Datas[1],"画像");
              }
            }
            if(Datas[3]){
              if(Character2._element.title != Datas[3]){
                Character2._element.title = Datas[3];
                Character2._element.src = conversion_url(Datas[3],"画像");
              }
            }
            if(Datas[5]){
              if(Character3._element.title != Datas[5]){
                Character3._element.title = Datas[5];
                Character3._element.src = conversion_url(Datas[5],"画像");
              }
            }
            Speak_Background2._element.src = "../image/透明.png";
            break;
          case "↦":
          s = false;
            if(Return==false) game.fps += 200;
            Setting_Flag[3] = game.fps;
            console.log(game.fps);
            break;
          case "↤":
          s = false;
            game.fps = 10;
            break;
          case "☞":
            s = false;
            if(Return==false) Scene_loads(Datas[12],false,false);
            break;
          case "㊨":
            s = false;
            if(Return==false){
              Explosion.x = (Explosion.scaleX*80/2)-80/2+(width/2);
              Explosion.frame = 0;
              Sound_ON("爆発");
            }
            break;
          case "㊥":
            s = false;
            if(Return==false){
              Explosion.x = (Explosion.scaleX*80/2)-80/2+(width/4);
              Explosion.frame = 0;
              Sound_ON("爆発");
            }
            break;
          case "㊧":
          s = false;
            if(Return==false){
              Explosion.x = (Explosion.scaleX*80/2)-80/2;
              Explosion.frame = 0;
              Sound_ON("爆発");
            }
            break;
          case "":
          case "…":
          case "\"":
          case "「":
          case "　":
          case "」":
          case "(":
          case " ":
          case ")":
          case "・":
          case "!":
          case "！":
          case "?":
          case "？":
            if(Datas[1]){
              if(Character1._element.title != Datas[1]){
                Character1._element.title = Datas[1];
                Character1._element.src = conversion_url(Datas[1],"画像");
              }
            }
            if(Datas[3]){
              if(Character2._element.title != Datas[3]){
                Character2._element.title = Datas[3];
                Character2._element.src = conversion_url(Datas[3],"画像");
              }
            }
            if(Datas[5]){
              if(Character3._element.title != Datas[5]){
                Character3._element.title = Datas[5];
                Character3._element.src = conversion_url(Datas[5],"画像");
              }
            }
            Speak_Background2._element.src = "../image/透明.png";
            break;
          default:
            if(Text[k]._element.textContent.substring(0,1)=="「"||Text[k]._element.textContent.substring(0,1)=="　"){
              switch(Speak_Character){
                case "㊧":
                  if(Character1._element.title != Datas[1]+"口パク"){
                    if(conversion_url(Datas[1]+"口パク","画像")!=Datas[1]+"口パク"){
                      Character1._element.src = conversion_url(Datas[1]+"口パク","画像");
                      Character1._element.title = Datas[1]+"口パク";
                    }
                  }
                  break;
                case "㊥":
                  if(Character2._element.title != Datas[3]+"口パク"){
                    if(conversion_url(Datas[3]+"口パク","画像")!=Datas[3]+"口パク"){
                      Character2._element.src = conversion_url(Datas[3]+"口パク","画像");
                      Character2._element.title = Datas[3]+"口パク";
                    }
                  }
                  break;
                case "㊨":
                  if(Character3._element.title != Datas[5]+"口パク"){
                    if(conversion_url(Datas[5]+"口パク","画像")!=Datas[5]+"口パク"){
                      Character3._element.src = conversion_url(Datas[5]+"口パク","画像");
                      Character3._element.title = Datas[5]+"口パク";
                    }
                  }
                  break;
                default:
                  break;
              }
              if(Speak_Character=="無し") Speak_Background2._element.src = "../image/透明.png";
              else Speak_Background2._element.src = "../image/吹き出し1.png";
            }
            else if(Text[k]._element.textContent.substring(0,1)=="("||Text[k]._element.textContent.substring(0,1)==" "){
              if(Speak_Character=="無し") Speak_Background2._element.src = "../image/透明.png";
              else Speak_Background2._element.src = "../image/吹き出し2.png";
            }
            break;
        }
        Time ++;
        if(s){
          if(Datas[8].substring(Time-1,Time)=="↓"){
            k++;
            if(Text[k-1]._element.textContent.substring(0,1)=="("||Text[k-1]._element.textContent.substring(0,1)==" "){
              if(Text[k-1]._element.textContent.substring(Text[k-1]._element.textContent.length-1)==")") Text[k]._element.textContent = "";
              else{
                Text[k]._element.textContent = " 　";
                Text[k]._style.color = "blue";
                Speak_Background2._element.src = "../image/吹き出し2.png";
              }
            }
            else if(Text[k-1]._element.textContent.substring(0,1)=="「"||Text[k-1]._element.textContent.substring(0,1)=="　"){
              if(Text[k-1]._element.textContent.substring(Text[k-1]._element.textContent.length-1)=="」") Text[k]._element.textContent = "";
              else{
                Text[k]._element.textContent = "　";
                Text[k]._style.color = "Black";
                Speak_Background2._element.src = "../image/吹き出し1.png";
              }
            }
          }
          else if(Datas[8].substring(Time-1,Time)!=""){
            if(Text[k]._element.textContent.substring(0,2)==" 　") Text[k]._style.color = "blue";
            switch (Datas[8].substring(Time-1,Time)) {
                case "(":
                if(Text[k]._element.textContent=="") Text[k]._element.textContent = Text[k]._element.textContent+" 　(";
                else Text[k]._element.textContent = Text[k]._element.textContent+Datas[8].substring(Time-1,Time);
                break;
              default:
                Text[k]._element.textContent = Text[k]._element.textContent+Datas[8].substring(Time-1,Time);
                break;
            }
            if(Return==false){
              if(Datas[19]){
                if(Datas[19]=="メカ"){
                  switch(Text[k]._element.textContent.substring(Text[k]._element.textContent.length-1)){
                    case "ア":
                    case "イ":
                    case "ウ":
                    case "エ":
                    case "オ":
                    case "カ":
                    case "キ":
                    case "ク":
                    case "ケ":
                    case "コ":
                    case "サ":
                    case "シ":
                    case "ス":
                    case "セ":
                    case "ソ":
                    case "タ":
                    case "チ":
                    case "ツ":
                    case "テ":
                    case "ト":
                    case "ナ":
                    case "ニ":
                    case "ヌ":
                    case "ネ":
                    case "ノ":
                    case "ハ":
                    case "ヒ":
                    case "フ":
                    case "ヘ":
                    case "ホ":
                    case "マ":
                    case "ミ":
                    case "ム":
                    case "メ":
                    case "モ":
                    case "ヤ":
                    case "ユ":
                    case "ヨ":
                    case "ラ":
                    case "ラ":
                    case "リ":
                    case "ル":
                    case "レ":
                    case "ロ":
                    case "ワ":
                    case "ヲ":
                    case "ン":
                      Sound_ON(Text[k]._element.textContent.substring(Text[k]._element.textContent.length-1));
                      break;
                    default:
                      break;
                  }
                }
                else{
                  switch(Text[k]._element.textContent.substring(Text[k]._element.textContent.length-1)){
                    case "\"":
                    case "「":
                    case "　":
                    case "」":
                    case "(":
                    case " ":
                    case ")":
                    case "・":
                    case "!":
                    case "！":
                      break;
                    default:
                      Sound_ON(Datas[19]);
                      break;
                  }
                }
              }
            }
          }
          else if(Datas[8].substring(Time-1,Time)==""){
            Text_defined = false;
            if(Datas[1]) Character1._element.src = conversion_url(Datas[1],"画像");
            if(Datas[3]) Character2._element.src = conversion_url(Datas[3],"画像");
            if(Datas[5]) Character3._element.src = conversion_url(Datas[5],"画像");
            Speak_Background2._element.src = "../image/透明.png";
          }
        }
      }

      White_Background.addEventListener("enterframe",function(){
        if(Explosion.frame!=11) Explosion.frame++;
        if(Return!=true&&Text_defined){
          T_D();
        }
      });

      if(Return){
          for (var i = 0; i < Datas[8].length+1; i++) {
            T_D();
          }
        }

      var Buttons = [];

      function Button(a,b,c){
        Buttons[a] = new Entity();
        Buttons[a].moveTo((width/5)*a,height-(width/5));
        Buttons[a].width = (width/5);
        Buttons[a].height = (width/5);
        Buttons[a]._element = document.createElement('input');
        Buttons[a]._element.type = "submit";
        Buttons[a]._element.value = b;
        scene.addChild(Buttons[a]);
        Buttons[a].addEventListener('touchstart',function(e){
          if(b=="アイテム") var ooo = "メニュー";
          else var ooo = "進む";
          if(Button_push(ooo)) return;
          if(a==2){
            game.pushScene(ItemScene(c,false,"アイテム"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else if(a==3){
            if(Text_defined&&have(c+"プレイ済み")==false){
              Return = true;
              Text_defined = false;
              for (var i = 0; i < 6; i++) {
                Text[i]._element.textContent = "";
              }
              Time = 0;
              k = 0;
              for (var i = 0; i < Datas[8].length+1; i++) {
                T_D();
              }
            }
            else Scene_loads(c,false,false);
          }
          else Scene_loads(c,true,false);
        });
      }
      if(Datas[9]!=false) Button(0,"◀ ◀",Datas[9]);//戻る1
      if(Datas[10]!=false) Button(1,"◀",Datas[10]);//戻る2
      if(Datas[11]!=false) Button(2,"アイテム",Datas[11]);//設定
      if(Datas[12]!=false) Button(3,"▶",Datas[12]);//進む1
      if(Datas[13]!=false&&have(Datas[13]+"プレイ済み")) Button(4,"▶ ▶",Datas[13]);//進む2

      if(Datas[16]!=false&&Datas[16]!=undefined){
          for (var i = 0; i < I_C_F_T_DATAS.length; i++) {
            if(I_C_F_T_DATAS[i].入手==(Datas[16])) break;
          }
          DATAS = [
            I_C_F_T_DATAS[i].タイプ,
            I_C_F_T_DATAS[i].アイテムor人物orフラグ名orトロフィー名,
            I_C_F_T_DATAS[i].説明文,
            I_C_F_T_DATAS[i].画像,
            I_C_F_T_DATAS[i].詳細文,
            I_C_F_T_DATAS[i].詳細内容,
            I_C_F_T_DATAS[i].コード
          ];
      if(have(I_C_F_T_DATAS[i].アイテムor人物orフラグ名orトロフィー名)==false){
          Get_ICFT(DATAS);
          var Trophy_Time = 0;
          var Trophy = new Sprite();
          Trophy._element = document.createElement("img");
          Trophy._element.src = "../image/Trophy.png";
          Trophy.width = width/3.61;
          Trophy.height = width/14.15;
          Trophy.x = width-width/3.5;
          Trophy.y = width/80;
          Trophy.opacity = 0;
          Trophy.tl.fadeIn(5);
          scene.addChild(Trophy);
          Datas[17] = conversion_url(I_C_F_T_DATAS[i].画像,"画像");
          var Trophy_image = new Sprite();
          Trophy_image._element = document.createElement("img");
          Trophy_image._element.src = Datas[17];
          Trophy_image.width = width/18.82;
          Trophy_image.height = width/18.82;
          Trophy_image.x = width-width/3.6;
          Trophy_image.y = width/50;
          Trophy_image.opacity = 0;
          Trophy_image.tl.fadeIn(5);
          scene.addChild(Trophy_image);

          var Trophy_text = new Sprite();
          Trophy_text._element = document.createElement("innerHTML");
          Trophy_text._style.font  = width/40+"px monospace";
          Trophy_text._style.color = 'white';
          Trophy_text._element.textContent = I_C_F_T_DATAS[i].アイテムor人物orフラグ名orトロフィー名;
          Trophy_text.x = width-width/5;
          Trophy_text.y = width/28+width/80;
          Trophy_text.opacity = 0;
          Trophy_text.tl.fadeIn(5);
          scene.addChild(Trophy_text);

          var Trophy_Flag2 = [];
          for (var i = 0; i < Trophy_Flag.length; i++) {
          Trophy_Flag2[i] = Trophy_Flag[i] + "端";
          }
          if(Trophy_Flag2==[]) Trophy_Flag2 = [[]+"端"]
          window.localStorage.setItem(GAS+"Trophy",Trophy_Flag2);

          Sound_ON("トロフィー");
          Trophy.addEventListener("enterframe",function(){
            Trophy_Time++;
            if(Trophy_Time==20){
              Trophy.tl.fadeOut(5);
              Trophy_image.tl.fadeOut(5);
              Trophy_text.tl.fadeOut(5);
            }
          })
        }
      }//トロフィー
      return scene;
    };
    var MoveScene = function(Out){
      var scene = new Scene();                                // 新しいシーンを作る

      game.fps = 10;

      var Background = new Sprite();
      Background._element = document.createElement("img");
      Background._element.src = "../image/黒.png";
      Background.width = width;
      Background.height = width/16*9;
      scene.addChild(Background);

      if(Out!=0){
        if(Out>0){
            Background.opacity = 0;
            Background.tl.fadeIn(Out);
        }
        else{
            Background.tl.fadeOut(Out*-1);
        }
      }
      scene.addChild(Background);//背景

      var White_Background = new Sprite();
      White_Background._element = document.createElement("img");
      White_Background._element.src = "../image/白.png";
      White_Background.y = width/16*9;
      White_Background.width = width;
      White_Background.height = height - width/16*9;
      scene.addChild(White_Background);//白地

      var Buttons = new Entity();
      Buttons.moveTo((width/5)*3,height-(width/5));
      Buttons.width = (width/5);
      Buttons.height = (width/5);
      Buttons._element = document.createElement('input');
      Buttons._element.type = "submit";
      Buttons._element.value = "▶";
      scene.addChild(Buttons);

      Buttons.addEventListener('touchstart',function(e){
        if(Button_push("進む")) return;
        game.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        Scene_loads(Moves,false,false);
      });

      Background.addEventListener("enterframe",function(){
        if(Background.opacity == 1 && Out>0){
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Scene_loads(Moves,false,false);
          game.pushScene(MoveScene(-10));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        }
        if(Background.opacity == 0 && Out<0){
          game.fps = Setting_Flag[3];
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
      })

      return scene;
    };
    var ChoiceScene = function(Number){
      var scene = new Scene();                                // 新しいシーンを作る

      if(Datas[6]){
        if(Datas[6]=="無し") Datas[6] = Number;
        else{
          Setting_Flag[4] = Datas[6];
          if(Setting_Flag[8]&&Datas[6]!="ゲームオーバー") Save(Datas[6]);
        }
      }

      switch (Datas[0]) {
        case "ヒント":
          var Background = new Sprite();
          Background._element = document.createElement("img");
          Background._element.src = "../image/融合.png";
          Background.width = width*1.2;
          Background.height = width*1.2;
          Background.x = (width - width*1.2)/2;
          Background.y = (width - width*1.6)/2;
          Rotation_Y -= 10;
          Background.rotation = Rotation_Y;
          scene.addChild(Background);//背景
          Background.addEventListener("enterframe",function(){
            Rotation_Y -= 10;
            Background.rotation = Rotation_Y;
            if(Rotation_Y==-360) Rotation_Y = 0;
          });
          break;
          case "Black":
          case "left":
          case "right":
          case "stand":
          case "裁判長席":
          case "留置所":
          var Background = new Sprite();
          Background._element = document.createElement("img");
          Background._element.src = "../image/背景/"+Datas[0]+".png";
          Background.width = width;
          Background.height = width/16*9;
          scene.addChild(Background);
          break;
        default:
          var Background = new Sprite();
          Background._element = document.createElement("img");
          Background._element.src = conversion_url(Datas[0],"画像");
          Background.width = width;
          Background.height = width/16*9;
          scene.addChild(Background);
          break;
      }
      if(Datas[2]!=false){
        var Character2 = new Sprite();
        Character2._element = document.createElement("img");
        Character2._element.src = conversion_url(Datas[2],"画像");
        Character2.width = width/16*9;
        Character2.height = width/16*9;
        Character2.x = width/4-width/32;
        scene.addChild(Character2);
      }//キャラ真ん中

      switch (Datas[0]) {
        case "stand":
        case "裁判長席":
        case "留置所":
          var Stand = new Sprite();
          Stand._element = document.createElement("img");
          Stand._element.src = "../image/"+Datas[0]+".png";
          Stand.width = width;
          Stand.height = width/16*9;
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[1]!=false){
        var Character1 = new Sprite();
        Character1._element = document.createElement("img");
        Character1._element.src = conversion_url(Datas[1],"画像");
        Character1.width = width/16*9;
        Character1.height = width/16*9;
        Character1.x = -width/32;
        scene.addChild(Character1);
      }//キャラ左

      if(Datas[3]!=false){
        var Character3 = new Sprite();
        Character3._element = document.createElement("img");
        Character3._element.src = conversion_url(Datas[3],"画像");
        Character3.width = width/16*9;
        Character3.height = width/16*9;
        Character3.x = width/2-width/32;
        scene.addChild(Character3);
      }//キャラ右

      switch (Datas[0]) {
        case "right":
        case "left":
          var Stand = new Sprite();
          Stand._element = document.createElement("img");
          Stand._element.src = "../image/"+Datas[0]+".png";
          Stand.width = width;
          Stand.height = width/16*9;
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      var White_Background = new Sprite();
      White_Background._element = document.createElement("img");
      White_Background._element.src = "../image/白.png";
      White_Background.y = width/16*9;
      White_Background.width = width;
      White_Background.height = height-width/16*9;
      scene.addChild(White_Background);

      var submits = 0;
      var Numbers = width/16*9+(width/30);
      function Submit(a,b){
        Text[submits] = new Entity();
        Text[submits].moveTo(0,Numbers);
        Text[submits].width = width;
        Text[submits].height = width/10;
        Text[submits]._element = document.createElement('input');
        Text[submits]._element.type = "submit";
        Text[submits]._element.value = a;
        if(a) scene.addChild(Text[submits]);
        if(have(a)){
          Text[submits]._element.value += " ✓";
          Text[submits].backgroundColor = "red";
        }
        Text[submits].addEventListener('touchstart',function(e){
          if(a=="戻る") var ooo = "戻る";
          else if(a == "つきつける") var ooo = "メニュー";
          else var ooo = "選択音";
          if(Button_push(ooo)) return;
          if (a == "つきつける"){
            game.pushScene(ItemScene(Datas[6],"日常","アイテム"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else Scene_loads(b,false,false);
        });
        submits++;
        Numbers += (width/20)+(width/25)+(width/25);
      }

      var Text = [];
      for (var i = 7; i < Datas.length; i = i+2) {
        Submit(Datas[i],Datas[i+1]);
      }

      var Buttons = [];

      function Button(a,b,c){
        Buttons[a] = new Entity();
        Buttons[a].moveTo((width/5)*a,height-(width/5));
        Buttons[a].width = (width/5);
        Buttons[a].height = (width/5);
        Buttons[a]._element = document.createElement('input');
        Buttons[a]._element.type = "submit";
        Buttons[a]._element.value = b;
        scene.addChild(Buttons[a]);
        Buttons[a].addEventListener('touchstart',function(e){
          if(b=="アイテム") var ooo = "メニュー";
          else var ooo = "進む";
          if(Button_push(ooo)) return;
          if(b=="アイテム"){
            game.pushScene(ItemScene(c,false,b));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else Scene_loads(c,true,false);
        });
      }
      if(Datas[4]!=false) Button(0,"◀ ◀",Datas[4]);//戻る1
      if(Datas[5]!=false) Button(1,"◀",Datas[5]);//戻る2
      if(Datas[6]!=false&&Datas[6]!="ゲームオーバー") Button(2,"アイテム",Datas[6]);//設定

      return scene;
    };
    var PopScene = function(Number,Type,Sound){
      var scene = new Scene();                                // 新しいシーンを作る

      switch (Type) {
        case "異議あり！":
        case "待った！":
          Type = "../image/"+Type+".png";
          break;
      }

      switch (Sound) {
        case "主人公異議あり！":
        case "主人公待った！":
          Sound = Setting_Flag[2]+Sound;
          break;
      }

      var Pop = new Sprite();
      Pop._element = document.createElement("img");
      Pop._element.src = conversion_url(Type,"画像");
      Pop.width = width;
      Pop.height = width/16*9;

      scene.addChild(Pop);

      if(Sound) Sound_ON(Sound);

      var Time = 0;

      Pop.addEventListener("enterframe",function(){
        Time++;
        switch (Time) {
          case 2:
            Pop.x = 10;
            Pop.y = 10;
            break;
          case 3:
            Pop.x = -20;
            Pop.y = -30;
            break;
          case 4:
            Pop.x = 30;
            Pop.y = 20;
            break;
          case 15:
            game.popScene();
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
            Scene_loads(Number,false,false);
            break;
          default:
            Pop.x = 0;
            Pop.y = 0;
            break;
        }
      })

      return scene;
    };
    var InterrogationScene = function(Number){
      var scene = new Scene();                                // 新しいシーンを作る

      if(Datas[5]){
        if(Datas[5]=="無し") Datas[5] = Number;
        else{
          Setting_Flag[4] = Datas[5];
          if(Setting_Flag[8]) Save(Datas[5]);
        }
      }

      Setting_Flag[4] = Datas[5];

      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "../image/背景/stand.png";
      Background.width = width;
      Background.height = width/16*9;
      scene.addChild(Background);

      var Character = new Entity();
      Character._element = document.createElement("img");
      Character._element.src = conversion_url(Datas[0],"画像");
      Character.width = width/16*9;
      Character.height = width/16*9;
      Character.x = width/4-width/32;
      scene.addChild(Character);

      var Speak_Character_image = 0;

      var Stand = new Entity();
      Stand._element = document.createElement("img");
      Stand._element.src = "../image/stand.png";
      Stand.width = width;
      Stand.height = width/16*9;
      scene.addChild(Stand);


      if(Datas[1]!=""){
        C_name = new Sprite();
        C_name._element = document.createElement("innerHTML");
        C_name._style.font  = width/20+"px monospace";
        C_name._element.textContent = "【" + Datas[1] + "】";
        C_name.y = width/16*9+(width/25);
        scene.addChild(C_name);//キャラ名
      }

      var Numbers = width/16*9+(width/20)+(width/25);

      function Texts(a){
        Numbers += width/20+width/25;
        Text[i] = new Sprite();
        Text[i]._element = document.createElement("innerHTML");
        Text[i]._style.font  = width/20+"px monospace";
        Text[i]._element.textContent = a;
        Text[i].y = Numbers;
        Text[i]._style.color = "green";
        scene.addChild(Text[i]);
      }//証言

      var Text = [];
      var Syougen = Datas[2].split("↓");

      for (var i = 0; i < Syougen.length; i++) {
        Texts(Syougen[i]);
      }

      if(Text[0]._element.textContent.substring(0,1)=="「"&&Text[i-1]._element.textContent.substring(Text[i-1]._element.textContent.length-1)=="」"){
        for (var i = 1; i < Text.length; i++) {
          Text[i]._element.textContent = "　" + Text[i]._element.textContent;
        }
      }

      var Buttons = [];

      function Button(a,b,c){
        Buttons[a] = new Entity();
        Buttons[a].moveTo((width/5)*a,height-(width/5));
        Buttons[a].width = (width/5);
        Buttons[a].height = (width/5);
        Buttons[a]._element = document.createElement('input');
        Buttons[a]._element.type = "submit";
        Buttons[a]._element.value = b;
        scene.addChild(Buttons[a]);
        Buttons[a].addEventListener('touchstart',function(e){
          switch (b) {
            case "ゆさぶる":
              if(Button_push("音無し")) return;
              game.pushScene(PopScene(c,"待った！","主人公待った！"));
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              break;
            case "設定を開く":
              if(Button_push("メニュー")) return;
              game.pushScene(SettingScene(Datas[5]));
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              break;
            case "つきつける":
              if(Button_push("メニュー")) return;
              game.pushScene(ItemScene(Datas[7],Datas[8],"アイテム"));
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              break;
            default:
              if(Button_push("進む")) return;
              Scene_loads(c,false,false);
              break;
          }
        });
      }
      Button(0,"ゆさぶる",Datas[3]);//ゆさぶる
      if(Datas[4]!=false) Button(1,"◀",Datas[4]);//戻る
      Button(2,"設定を開く",Datas[5]);//設定
      Button(3,"▶",Datas[6]);//進む
      Button(4,"つきつける",Datas[7]);//つきつける

      return scene;
    };
    var SettingScene = function(Number){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "../image/Background.png";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      var Button = [];
      var submits = 0;
      var Numbers = (width/10)+(width/30);
      function Submit(a){
        Button[submits] = new Entity();
        Button[submits].moveTo(width/4,Numbers);
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        Button[submits].addEventListener('touchstart',function(e){
          switch (a) {
            case "設定を閉じる":
              if(Button_push("戻る")) return;
              break;
            case "サウンド設定":
            case "プレイヤー設定":
              if(Button_push("メニュー")) return;
              break;
            case "セーブする":
            if(Button_push("セーブ")) return;
              break;
            case "現在はオートセーブです。":
              if(Button_push("お任せなのだ")) return;
              break;
            default:
              if(Button_push("選択音")) return;
              break;
          }
          switch(a){
            case "設定を閉じる":
            game.popScene();
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
            break;
            case "タイトルに戻る":
            game.popScene();
            Scene_kazu--;
            if(Scene_kazu==2){
              game.popScene();
              Scene_kazu--;
            }
            console.log("Scene数",Scene_kazu);
            Scene_loads("タイトル移動",false,false,false);
            break;
            case "サウンド設定":
            game.pushScene(SoundSettingScene());
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            break;
            case "セーブする":
              Save(Number);
              this._element.value = "セーブしました。";
              break;
              case "セーブ方法の切り替え":
              if(Setting_Flag[8]){
                Button[6]._element.value = "セーブする";
                Setting_Flag[8] = false;
                scene.addChild(Button[6]);
                scene.removeChild(Button[7]);
              }
              else{
                Setting_Flag[8] = true;
                scene.addChild(Button[7]);
                scene.removeChild(Button[6]);
              }
              window.localStorage.setItem(GAS+"Setting_Flag",Setting_Flag);
              break;
              case "プレイヤー設定":
                Scene_kazu++;
                console.log("Scene数",Scene_kazu);
                game.pushScene(PlayerSettingScene());
                break;
              case "セーブデータ読み込み":
              game.popScene();
              Scene_kazu--;
              if(Scene_kazu==2){
                game.popScene();
                Scene_kazu--;
              }
              console.log("Scene数",Scene_kazu);
              Scene_loads("セーブ読み込み",false,false);
              break;
          }
        });
        submits++;
        Numbers += (width/20)+(width/25)+(width/25);
      }

      Submit("設定を閉じる");
      Numbers += (width/20)+(width/25)+(width/25);
      Submit("タイトルに戻る");
      Submit("サウンド設定");
      Submit("プレイヤー設定");
      Submit("セーブデータ読み込み");
      Submit("セーブ方法の切り替え");
      Submit("セーブする");
      Numbers -= (width/20)+(width/25)+(width/25);
      Submit("現在はオートセーブです。");
      if(Setting_Flag[8]) scene.removeChild(Button[6]);
      else scene.removeChild(Button[7]);

      return scene;
    };
    var PlayerSettingScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "../image/Background.png";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      var Numbers = width/2;

      var Gender = new Entity();
      Gender.moveTo(width/4+width/20,Numbers);
      Gender.width = width/2;
      Gender.height = width/10;
      Gender._element = document.createElement("select");
      Numbers += (width/20)+(width/25)+(width/25);

      var Option = [];
      switch (Setting_Flag[2]) {
        case "男":
          var Choice_Transform = ["男","女","どちらでもない"];
          break;
        case "女":
          var Choice_Transform = ["女","男","どちらでもない"];
          break;
        default:
          var Choice_Transform = ["どちらでもない","男","女"];
          break;
      }

      for (var i = 0; i < Choice_Transform.length; i++){
        Option[i] = document.createElement("option");
        Option[i].text = Choice_Transform[i];
        Option[i].value = Choice_Transform[i];
        Gender._element.appendChild(Option[i]);
      }
      scene.addChild(Gender);

      var S_Input1 = new Entity();
      S_Input1.moveTo(width/4+width/20,Numbers);
      S_Input1.width = width/2;
      S_Input1.height = (width/10);
      S_Input1._element = document.createElement('input');
      S_Input1._element.value = Setting_Flag[1];
      S_Input1._element.placeholder = "苗字を入力";
      Numbers += (width/20)+(width/25)+(width/25);
      scene.addChild(S_Input1);

      var S_Input2 = new Entity();
      S_Input2.moveTo(width/4+width/20,Numbers);
      S_Input2.width = width/2;
      S_Input2.height = (width/10);
      S_Input2._element = document.createElement('input');
      S_Input2._element.value = Setting_Flag[0];
      S_Input2._element.placeholder = "名前を入力";
      scene.addChild(S_Input2);

      Numbers = (width/10)+(width/30);
      var Button = [];
      var submits = 0;
      function Submit(a){
        Button[submits] = new Entity();
        Button[submits].moveTo(width/4,Numbers);
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        Button[submits].addEventListener('touchstart',function(e){
          if(Button_push("戻る")) return;
          if(S_Input1._element.value.replace(/[^,]/g,"")!=""||S_Input2._element.value.replace(/[^,]/g,"")!=""){
            scene.addChild(Text[3]);
          }
          else{
            Setting_Flag[0] = S_Input2._element.value;
            Setting_Flag[1] = S_Input1._element.value;
            if(Gender._element.value=="男"){
              Setting_Flag[2] = "男";
              if(S_Input1._element.value=="") Setting_Flag[1] = "若辻";
              if(S_Input2._element.value=="") Setting_Flag[0] = "俛人";
            }
            else if(Gender._element.value=="女"){
              Setting_Flag[2] = "女";
              if(S_Input1._element.value=="") Setting_Flag[1] = "防人";
              if(S_Input2._element.value=="") Setting_Flag[0] = "玲奈";
            }
            else{
              Setting_Flag[2] = "未設定";
              if(S_Input1._element.value=="") Setting_Flag[1] = "カードの精霊";
              if(S_Input2._element.value=="") Setting_Flag[0] = "ユベル";
            }
            game.popScene();
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
          }
          window.localStorage.setItem(GAS+"Setting_Flag",Setting_Flag);
        });
        submits++;
      }

      Submit("戻る");

      function Texts(a,b,c){
        Text[i] = new Sprite();
        Text[i]._element = document.createElement("innerHTML");
        Text[i]._style.font  = width/10+"px monospace";
        Text[i]._element.textContent = a;
        Text[i].x = width/15;
        Text[i].y = b;
        if(c!=undefined){
          Text[i].x = width/7;
          Text[i]._style.color = 'red';
          Text[i]._style.font = c+"px monospace";
        }
        else scene.addChild(Text[i]);
        i++;
      }

      var i = 0;
      var Text = [];
      Texts("性別",Gender.y);
      Texts("苗字",S_Input1.y);
      Texts("名前",S_Input2.y);
      Texts(",(カンマ)は使用できません。",width/3,width/20);

      return scene;
    };
    var SoundSettingScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "../image/Background.png";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      var Numbers = (width/10)+(width/30);
      var Button = [];
      var submits = 0;
      function Submit(a){
        Button[submits] = new Entity();
        Button[submits].moveTo(width/4,Numbers);
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        Button[submits].addEventListener('touchstart',function(e){
          if(Button_push("戻る")) return;
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        });
        submits++;
      }

      Submit("戻る");

      Numbers = width/2;
      var Text = [];
      var i = 10;

      function Texts(a,b,c){
        Text[i] = new Sprite();
        Text[i]._element = document.createElement("innerHTML");
        Text[i]._style.font  = width/10+"px monospace";
        Text[i].c = i;
        Text[i].x = b;
        Text[i].y = c;
        switch (a) {
          case 10:
          case "BGM":
          case "効果音":
          case "音声":
            Text[i]._element.textContent = a;
            break;
          default:
            Text[i]._element.textContent = "0" + a;
            break;
        }
        scene.addChild(Text[i]);
        Numbers += (width/4);
        i++;
      }

      Texts("BGM",width/8,Numbers);
      Texts("効果音",width/8,Numbers);
      Texts("音声",width/8,Numbers);

      submits = 0;
      var Button2 = [];
      function Submit2(a,b,c){
        Button2[submits] = new Entity();
        Button2[submits].moveTo(a,b);
        Button2[submits].width = width/10;
        Button2[submits].height = width/10;
        Button2[submits]._element = document.createElement('input');
        Button2[submits]._element.type = "submit";
        Button2[submits]._element.value = c;
        scene.addChild(Button2[submits]);
        Button2[submits].addEventListener('touchstart',function(e){
          if(Button_push("音無し")) return;
          switch (b) {
            case Text[10].y:
              if(c=="+"){
                if(Setting_Flag[9]!=10) Setting_Flag[9] ++;
              }
              else{
                if(Setting_Flag[9]!=0) Setting_Flag[9] --;
              }
              if(Setting_Flag[9]==10) Text[13]._element.textContent = Setting_Flag[9];
              else Text[13]._element.textContent = "0"+Setting_Flag[9];
              BGM.volume = Setting_Flag[9]/10;
              break;
            case Text[11].y:
              if(c=="+"){
                if(Setting_Flag[10]!=10) Setting_Flag[10] ++;
              }
              else{
                if(Setting_Flag[10]!=0) Setting_Flag[10] --;
              }
              if(Setting_Flag[10]==10) Text[14]._element.textContent = Setting_Flag[10];
              else Text[14]._element.textContent = "0"+Setting_Flag[10];
              Sound_ON("進む");
              break;
            case Text[12].y:
              if(c=="+"){
                if(Setting_Flag[11]!=10) Setting_Flag[11] ++;
              }
              else{
                if(Setting_Flag[11]!=0) Setting_Flag[11] --;
              }
              if(Setting_Flag[11]==10) Text[15]._element.textContent = Setting_Flag[11];
              else Text[15]._element.textContent = "0"+Setting_Flag[11];
              Sound_ON("音量調整用");
              break;
          }
          window.localStorage.setItem(GAS+"Setting_Flag",Setting_Flag);
        });
        submits++;
      }
      Submit2(width/2,Text[10].y,"-");
      Texts(Setting_Flag[9],width/2+width/8,Text[10].y);
      Submit2(width/2+width/4,Text[10].y,"+");
      Submit2(width/2,Text[11].y,"-");
      Texts(Setting_Flag[10],width/2+width/8,Text[11].y);
      Submit2(width/2+width/4,Text[11].y,"+");
      Submit2(width/2,Text[12].y,"-");
      Texts(Setting_Flag[11],width/2+width/8,Text[12].y);
      Submit2(width/2+width/4,Text[12].y,"+");

      return scene;
    };
    var InspectScene = function(Inspect){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite();
      Background._element = document.createElement("img");
      Background._element.src = conversion_url(Inspect[0],"画像");
      Background.width = width;
      Background.height = width/16*9;
      scene.addChild(Background);
      Background.addEventListener('touchstart',function(e){
        Sound_ON("選択音");
        if(Inspect=="Black") Scene_loads("調べる出来てない",false,false);
        else Scene_loads("調べる何もない",false,false);
      });

      var NaturalWidth = Background._element.naturalWidth;
      var NaturalHeight = Background._element.naturalHeight;

      function Touchs(x,y,width_t,height_t,Number){
        Touch[k] = new Sprite();
        Touch[k]._element = document.createElement("img");
        Touch[k]._element.src = "../image/半透明.png";
        Touch[k].x = x*width/NaturalWidth;
        Touch[k].y = y*width/16*9/NaturalHeight;
        Touch[k].width = width_t*width/NaturalWidth;
        Touch[k].height = height_t*width/16*9/NaturalHeight;
        console.log(Number);
        scene.addChild(Touch[k]);
        Touch[k].addEventListener('touchstart',function(e){
          Sound_ON("選択音");
          Scene_loads(Number,false,false);
          return;
        });
        return;
      }

      var Touch = [];
      var k = 0;

      for (var i = 1; i < Inspect.length; i = i+5) {
        Touchs(Inspect[i],Inspect[i+1],Inspect[i+2],Inspect[i+3],Inspect[i+4]);
        k++;
      }

      var Modoru = new Entity();
      Modoru.moveTo(width/4,width/16*9+(width/30));
      Modoru.width = width/2;
      Modoru.height = (width/10);
      Modoru._element = document.createElement('input');
      Modoru._element.type = "submit";
      Modoru._element.value = "戻る";
      scene.addChild(Modoru);
      Modoru.addEventListener('touchstart',function(e){
        if(Button_push("戻る")) return;
        Scene_loads(Setting_Flag[4],true,false);
      });

      return scene;
    };
    var ItemgetScene = function(a,b,c){
      var scene = new Scene();                                // 新しいシーンを作る

      var White_Background = new Sprite();
      White_Background._element = document.createElement("img");
      White_Background._element.src = "../image/白.png";
      White_Background.y = width/16*9;
      White_Background.width = width;
      White_Background.height = height-width/16*9;
      scene.addChild(White_Background);

      var Numbers = width/16*9+(width/20)+(width/25);

      function Texts(){
        Numbers += width/20+width/25;
        Text[i] = new Sprite();
        Text[i]._element = document.createElement("innerHTML");
        Text[i]._style.font  = width/20+"px monospace";
        Text[i]._element.textContent = "";
        Text[i].x = width/50;
        Text[i].y = Numbers;
        Text[i]._style.color = "blue";
        scene.addChild(Text[i]);
      }

      var Text =[];

      for (var i = 0; i < 6; i++) {
        Texts();
      }

      var Time = 0;
      var k = 0;
      var Text_defined = true;

      function T_D(){
        var s = true;
        Time ++;
        if(s){
          if(b.substring(Time-1,Time)=="↓"){
            k++;
          }
          else if(b.substring(Time-1,Time)!=""){
            Text[k]._element.textContent = Text[k]._element.textContent+b.substring(Time-1,Time);
          }
          else if(b.substring(Time-1,Time)==""){
            Text_defined = false;
          }
        }
      }

      White_Background.addEventListener("enterframe",function(){
        T_D();
      })

      var Buttons = new Entity();
      Buttons.moveTo((width/5)*3,height-(width/5));
      Buttons.width = (width/5);
      Buttons.height = (width/5);
      Buttons._element = document.createElement('input');
      Buttons._element.type = "submit";
      Buttons._element.value = "▶";
      scene.addChild(Buttons);

      var Item = new Sprite();
      Item._element = document.createElement("img");
      Item._element.src = a;
      Item.width = width/2;
      Item.height = width/2;
      Item.x = width;
      Item.y = width/32;
      scene.addChild(Item);
      Sound_ON("アイテムゲット");

      Item.addEventListener("enterframe",function(){
        if(Item.x < width/2-width/4-width/18 || Item.x > width/2-width/4+width/18){
          Item.x -= width/18;
        }
        else {
          Item.x = width/2-width/4;
        }
        if(Item.x<-width/2){
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Scene_loads(c,false,false);
        }
      })

      Buttons.addEventListener('touchstart',function(e){
        if(Button_push("進む")) return;
        if(Text_defined){
          Text_defined = false;
          for (var i = 0; i < 6; i++) {
            Text[i]._element.textContent = "";
          }
          Time = 0;
          k = 0;
          for (var i = 0; i < b.length+1; i++) {
            T_D();
          }
        }
        if(Item.x>width/2-width/4){
          Item.x = width/2 -width/4;
        }
        else if(Item.x==width/2-width/4){
          Item.x -= width/18+1;
        }
        else{
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Scene_loads(c,false,false);
        }
      });//進む
      return scene;
    };
    var ItemScene = function(Number,Ig,Type){

      var scene = new Scene();                                // 新しいシーンを作る
      switch (Type) {
        case "アイテム":
          var PAGAS = 5;
          var Choice_Flag = Item_Flag;
          var Type2 = "人物";
          break;
        case "人物":
          var PAGAS = 6;
          var Choice_Flag = Character_Flag;
          if(Ig) var Type2 = "アイテム";
          else var Type2 = "トロフィー";
          break;
        case "トロフィー":
          var PAGAS = 7;
          var Choice_Flag = Trophy_Flag;
          var Type2 = "アイテム";
          break;
      }

      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "../image/Background.png";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      var Item_image = new Sprite();
      Item_image._element = document.createElement("img");
      Item_image._element.src = "../image/白.png";
      Item_image.width = width/4;
      Item_image.height = width/4;
      Item_image.x = width/1.6;
      Item_image.y = width/4+width/20+width/25;
      Item_image.border = 2;
      scene.addChild(Item_image);

      var Button = [];
      var submits = 0;
      function Submit(a,b,c,d,e,f){
        Button[submits] = new Entity();
        Button[submits].moveTo(b,c);
        Button[submits].width = d;
        Button[submits].height = e;
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        if(a){
          if((a=="設定を開く"&&Ig)==false&&a!="詳細") scene.addChild(Button[submits]);
        }
        Button[submits].addEventListener('touchstart',function(e){
          switch (a) {
            case "戻る":
              var ooo = "戻る";
              break;
              case "▶":
              case "◀":
              var ooo ="メニュー移動";
              break;
            case "設定を開く":
            case Type2:
              var ooo ="メニュー";
              break;
            case "":
              if(Ig=="日常") var ooo ="選択音";
              else var ooo ="音無し";
              break;
            default:
              var ooo ="選択音";
              break;
          }
          if(this.backgroundColor=="red"){
            var ooo ="戻る";
          }
          if(Button_push(ooo)) return;
          if(this.backgroundColor=="red"){
            game.replaceScene(ItemScene(Number,Ig,Type));
          }
          if(a=="詳細"){
            switch (Button[3]._element.value){
              case "遊ぶ":
                OASOBI = true;
                game.popScene();
                game.pushScene(ReversiScene());
                console.log("Scene数",Scene_kazu);
                break;
              case "改造":
                game.replaceScene(TransformScene(Number,Ig));
                console.log("Scene数",Scene_kazu);
                break;
              default:
                if(Button[3].詳細.substring(0,2)=="移動"){
                  Button[3].詳細 = Button[3].詳細.substring(2);
                  game.popScene();
                  Scene_kazu--;
                  console.log("Scene数",Scene_kazu);
                  Scene_loads(Number+"↓"+Button[3].詳細,false,Choice_Item,false);
                }
                else {
                  game.pushScene(DetailsScene(Button[3].詳細,0));
                  Scene_kazu++;
                  console.log("Scene数",Scene_kazu);
                }
                break;
            }
          }
          else{
            switch (this._element.value){
              case "◀":
                if(Setting_Flag[PAGAS]==0){
                  Setting_Flag[PAGAS] = Choice_Flag.length-Choice_Flag.length%5;
                  if(Choice_Flag.length%5==0) Setting_Flag[PAGAS]-=5;
                }
                else Setting_Flag[PAGAS]-=5;
                game.replaceScene(ItemScene(Number,Ig,Type));
                break;
              case "▶":
                if(Setting_Flag[PAGAS] == Choice_Flag.length-Choice_Flag.length%5) Setting_Flag[PAGAS] = 0;
                else{
                  Setting_Flag[PAGAS]+=5;
                  if(Setting_Flag[PAGAS]==Choice_Flag.length) Setting_Flag[PAGAS] = 0;
                }
                game.replaceScene(ItemScene(Number,Ig,Type));
                break;
              case "戻る":
                game.fps = Setting_Flag[3];
                game.popScene();
                Scene_kazu--;
                console.log("Scene数",Scene_kazu);
                break;
              case "設定を開く":
                game.pushScene(SettingScene(Number));
                Scene_kazu++;
                console.log("Scene数",Scene_kazu);
                break;
              case Type2:
                game.replaceScene(ItemScene(Number,Ig,Type2));
                break;
              case "つきつける":
                game.popScene();
                Scene_kazu--;
                console.log("Scene数",Scene_kazu);
                if(Ig==Choice_Item||(Ig!="日常"&&(Choice_Item=="強欲な壺"||Choice_Item=="万能"||Choice_Item=="ヒント"))){
                  if(Choice_Item=="ヒント"){
                    Scene_loads(Number+"のヒント",false,false);
                    return;
                  }
                  if(Choice_Item=="強欲な壺"){
                    Get_ICFT(["アイテム","強欲な壺→強欲なカケラ","強欲な壺を使った証。","強欲なカケラ","","","強欲なカケラ"]);
                  }
                  game.pushScene(PopScene(Number,"異議あり！","主人公異議あり！"));
                  Scene_kazu++;
                  console.log("Scene数",Scene_kazu);
                }
                else if(Ig=="日常") Scene_loads(Number,false,Choice_Item,Type);
                else{
                  game.pushScene(PopScene("つきつけ失敗","異議あり！","主人公異議あり！"));
                  Scene_kazu++;
                  console.log("Scene数",Scene_kazu);
                }
                break;
              default:
                for (var i = 0; i < 5; i++) {
                  if(f[1].split("↓")[i]==undefined) Text[i]._element.textContent = "";
                  else Text[i]._element.textContent = f[1].split("↓")[i];
                }
                for (var i = 0; i < submits; i++) {
                  Button[i].backgroundColor = "buttonface";
                }
                Choice_Item = f[5];
                var Item_image_url = conversion_url(f[2],"画像");
                Item_image._element.src = Item_image_url;
                this.backgroundColor = "red";
                if(f[3]){
                  Button[3]._element.value = f[3];
                  Button[3].詳細 = f[4];
                  scene.addChild(Button[3]);
                }
                else scene.removeChild(Button[3]);
                if(Ig){
                  Button[4]._element.value = "つきつける";
                  scene.addChild(Button[4]);
                }
                console.log(f);
                break;
            }
          }
        });
        submits++;
      }
      var S_X_H = (width-width/6)/3-width/12;
      var S_Y_H = width/10;
      var W_X_H = width/12;
      var W_Y_H = width/9;
      Submit("戻る",W_X_H,W_Y_H,S_X_H,S_Y_H);
      Submit("設定を開く",width/2-S_X_H/2,W_Y_H,S_X_H,S_Y_H);
      Submit(Type2,width-S_X_H-W_X_H,W_Y_H,S_X_H,S_Y_H);
      Submit("詳細",width/2+width/20,(width/4)+((width/20)+(width/25)+(width/50))*4,width/2.5+W_X_H-width/8,W_X_H);
      Submit("",width/2+width/20,(width/4)+((width/20)+(width/25)*14),width/2.5+W_X_H-width/8,W_X_H);

      var Text = [];

      function Description_text(){
        Text[i] = new Sprite();
        Text[i]._element = document.createElement("innerHTML");
        Text[i]._style.font  = width/20+"px monospace";
        Text[i].x = width/8;
        Text[i].y = (width/4) + ((width/20)+(width/25)*(18+i*2)) - (width/25);
        scene.addChild(Text[i]);
      }

      for (var i = 0; i < 5; i++) {
        Description_text();
      }

      if(Choice_Flag.length>5){
        Submit("◀",width/8,(width/4)+((width/20)+(width/25)*14),W_X_H,W_X_H);
        Submit("▶",width/2.5,(width/4)+((width/20)+(width/25)*14),W_X_H,W_X_H);
      }
      else Setting_Flag[PAGAS] = 0;


      var Item = [];
      var Image = [];
      var Item_Number = 0;
      var Numbers = (width/4);
      var Choice_Item = "未設定";

      for (var i = 0; i < 5; i++) {
        if(Choice_Flag[i+Setting_Flag[PAGAS]]){
          Submit(Choice_Flag[i+Setting_Flag[PAGAS]][0],width/8,Numbers,width/2.5+W_X_H-width/8,W_X_H,Choice_Flag[i+Setting_Flag[PAGAS]]);
          Numbers += (width/20)+(width/25)+(width/50);
        };
      }

      return scene;
    };
    var DetailsScene = function(Syousai,Pages,Big){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "../image/Background.png";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      var Button = [];
      var submits = 0;
      function Submit(a){
        Button[submits] = new Entity();
        Button[submits].moveTo(width/4,width/10+width/30);
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        Button[submits].addEventListener('touchstart',function(e){
          if(Button_push("戻る")) return;
          if(BGM.paused&&BGM.title!="無") BGM.play();
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        });
        submits++;
      }
      Submit("戻る");

      function Texts(a){
        Numbers += width/20+width/25;
        Text[i] = new Sprite();
        Text[i]._element = document.createElement("innerHTML");
        Text[i]._style.font  = width/20+"px monospace";
        Text[i].x = width/12;
        Text[i].y = Numbers;
        Text[i]._element.textContent = a;
        switch (a) {
          case "前のページボタン":
          case "次のページボタン":
          case "最初のページボタン":
          case undefined:
            break;
          default:
            scene.addChild(Text[i]);
            break;
        }
      }

      var Text = [];
      var Numbers = width/10;
      Numbers += width/20;

      var Button2 = [];
      var submits2 = 0;
      function Submit2(a,b,c,d,e,f){
        Button[submits2] = new Entity();
        Button[submits2].moveTo(b,c);
        Button[submits2].width = d;
        Button[submits2].height = e;
        Button[submits2]._element = document.createElement('input');
        Button[submits2]._element.type = "submit";
        Button[submits2]._element.value = a;
        scene.addChild(Button[submits2]);
        Button[submits2].addEventListener('touchstart',function(e){
          if(Button_push("ページ")) return;
          if(BGM.paused&&BGM.title!="無") BGM.play();
          switch (a) {
            case "前のページ":
              Pages -= 13;
              break;
            case "次のページ":
              Pages += 13;
              break;
            default:
              Pages = 0;
              break;
          }
          game.replaceScene(DetailsScene(Syousai,Pages));
        });
        submits2++;
      }
      var S_X_H = (width-width/6)/3;
      var S_Y_H = width/10;
      var W_X_H = width/12;
      var W_Y_H = width/9;

      var S_Text = Syousai.replace(/\n/g,"↓").split("↓");
      for (var i = 0; i < S_Text.length; i++) {
        Texts(S_Text[Pages+i]);
        if(Text[i]._element.textContent.substring(0,2)=="画像"){
          var Photo_url = Text[i]._element.textContent.substring(2);
          Text[i]._element.textContent = "";
          var Photo = new Sprite();
          Photo._element = document.createElement("img");
          Photo._element.src = conversion_url(Photo_url,"画像");
          if(conversion_url(Photo_url,"比率")=="正方形"||Photo._element.NaturalWidth==Photo._element.naturalHeight){
            Photo.width = width*0.8;
            Photo.height = width*0.8;
            Photo.x = width/10;
            Photo.y = width/10+width/30+width/5;
          }
          else{
            Photo.x = width/10;
            Photo.y = height/2 - width*0.8/16*9/2;
            Photo.width = width*0.8;
            Photo.height = width*0.8/16*9;
          }
          if(Big){
            Photo.addEventListener('touchstart',function(e){
              Sound_ON("戻る");
              Scene_kazu--;
              console.log("Scene数",Scene_kazu);
              game.popScene();
            });
          }
          scene.addChild(Photo);
        }
        else if(Text[i]._element.textContent.substring(0,3)=="小画像"){
          var Photo_url = Text[i]._element.textContent.substring(3);
          Photo_url = conversion_url(Photo_url,"画像");
          var Big_Photo = Text[i]._element.textContent.substring(1);
          Text[i]._element.textContent = "";
          var Photo = new Sprite();
          Photo._element = document.createElement("img");
          Photo._element.src = Photo_url;
          Photo.width = width*0.8/2;
          Photo.height = width*0.8/2;
          Photo.x = width/10;
          Photo.y = width/10+width/30+width/5;
          scene.addChild(Photo);
          Photo.addEventListener('touchstart',function(e){
            Sound_ON("選択音");
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            game.pushScene(DetailsScene(Big_Photo,0,true));
          });
        }
        else if(Text[i]._element.textContent.substring(0,7)=="YOUTUBE"){
          if(BGM.paused==false) BGM.pause();
          var Video = new Entity()
          var Video_url = Text[i]._element.textContent.substring(7);
          Text[i]._element.textContent = "";
          Video.visible =  true;
          Video._element = document.createElement('div');
          Video.x = width/10;
          Video.y = height/2-width/16*9*0.8/2;
          Video._element.innerHTML = '<iframe src="https://www.youtube.com/embed/'+Video_url+'?enablejsapi=1&controls=0&showinfo=0&autoplay=0&rel=0&vq=small"  width="'+(width*0.8)+'" height="'+(width/16*9*0.8)+'" frameborder="0" id="player"></iframe>'
          scene.addChild(Video);
        }
        if(Text[i]._element.textContent=="前のページボタン") Submit2("前のページ",W_X_H,height-W_Y_H-W_Y_H,S_X_H,S_Y_H);
        if(Text[i]._element.textContent=="次のページボタン") Submit2("次のページ",width-S_X_H-W_X_H,height-W_Y_H-W_Y_H,S_X_H,S_Y_H);
        if(Text[i]._element.textContent=="最初のページボタン") Submit2("最初のページ",width-S_X_H-W_X_H,height-W_Y_H-W_Y_H,S_X_H,S_Y_H);
        if(i==12) break;
      }

      return scene;
    };
    var ClearScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "../image/Background.png";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      var Button = [];
      var submits = 0;
      var Numbers = width/16*9+(width/30);
      function Submit(a){
        Button[submits] = new Entity();
        Button[submits].moveTo(width/4,Numbers);
        Numbers += (width/20)+(width/25)+(width/25)+(width/25)+(width/25)+(width/25);
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        submits++;
      }

      Submit("データ初期化実行");
      Submit("戻る");

      Button[0].addEventListener('touchstart',function(e){
        if(Button_push("音無し")) return;
        game.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        Data = false;
        window.localStorage.clear();
        Datas = [];
        Setting_Flag = ["名前","苗字","未設定",game.fps,"最初から",0,0,0,true,5,5,5,"最初から","Black","",0];
        //[0名前,1苗字,2性別,3fps,4直前,5アイテムページ,6人物ページ,7トロフィーページ,8オートセーブ,9BGM音量,10効果音音量,11音声音量,12調べる,13背景,14BGM,15ループ箇所];
        Flag = [];//フラグ
        Log_Flag = [];//記録
        Item_Flag = [];//所持アイテム
        Character_Flag = [];//人物
        Trophy_Flag = [];//トロフィー
        Favorability_Flag = [];//好感度
        Scene_kazu = 1;
        Already= true;
        Version_new = true;
        game.replaceScene(TitleScene());
        return;
      });

      Button[1].addEventListener('touchstart',function(e){
        if(Button_push("戻る")) return;
        game.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        return;
      });

      return scene;
    };
    var TransformScene = function(Number,Ig){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "../image/Background.png";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      function Texts(i){
        Text[i] = new Sprite();
        Text[i]._element = document.createElement("innerHTML");
        Text[i]._style.font  = width/20+"px monospace";
        Text[i]._style.color  = "red";
        Text[i].x = width/10;
        Text[i].y = Numbers;
        scene.addChild(Text[i]);
      }

      var Text = [];
      var Datakousin = false;

      var Button = [];
      var submits = 0;
      var Numbers = (width/10)+(width/30);
      function Submit(a){
        Button[submits] = new Entity();
        Button[submits].moveTo(width/4,Numbers);
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        if(a) Button[submits]._element = document.createElement('input');
        else Button[submits]._element = document.createElement("select");
        switch (a) {
          case "実行する":
          case "改造をやめる":
            Button[submits]._element.type = "submit";
            break;
          default:
            Button[submits]._element.type = "text";
            break;
        }
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        if(a=="改造をやめる"){
          Button[submits].addEventListener('touchstart',function(e){
            if(Button_push("戻る")) return;
            if(Datakousin) return;
            game.replaceScene(ItemScene(Number,Ig,"アイテム"));
          });
        }
        if(a=="実行する"){
          Button[submits].addEventListener('touchstart',function(e){
            if(Button_push("音無し")) return;
            for (var i = 3; i < 7; i++){
              if(Button[i]._element.value.replace(/[^,]/g,"")!=""){
                Text[0]._element.textContent = ",(カンマ)は使用できません。";
                return;
              }
            }
            switch (Button[1]._element.value){
            case "アイテム作成":
              Item_Flag[Item_Flag.length] = [
                Button[3]._element.value,//名前
                Button[5]._element.value,//説明文
                Button[4]._element.value,//画像
                "詳細内容",//詳細文
                Button[6]._element.value,//詳細内容
                Button[3]._element.value//つきつけるデータ
              ];
              this._element.value = Button[3]._element.value + " 入手。";
              Sound_ON("セーブ");
              break;
            case "フラグ類入手":
              for (var i = 0; i < I_C_F_T_DATAS.length; i++) {
                if(I_C_F_T_DATAS[i].入手==Button[2]._element.value) break;
              }
              DATAS = [
                I_C_F_T_DATAS[i].タイプ,
                I_C_F_T_DATAS[i].アイテムor人物orフラグ名orトロフィー名,
                I_C_F_T_DATAS[i].説明文,
                I_C_F_T_DATAS[i].画像,
                I_C_F_T_DATAS[i].詳細文,
                I_C_F_T_DATAS[i].詳細内容,
                I_C_F_T_DATAS[i].コード
              ];
              Get_ICFT(DATAS);
              this._element.value = Button[2]._element.value+" 入手。";
              Sound_ON("セーブ");
              break;
            case "フラグ追加 or 消去":
              for (var i = 0; i < Flag.length; i++){
                if(Flag[i]==Button[3]._element.value){
                  Flag.splice(i,1);
                  this._element.value = Button[3]._element.value+" オフ。";
                  Sound_ON("セーブ");
                  console.log(Flag);
                  return;
                }
              }
              Flag[Flag.length] = Button[3]._element.value;
              this._element.value = Button[3]._element.value+" オン。";
              Sound_ON("セーブ");
              console.log(Flag);
              break;
            case "フラグリセット":
              Flag = [];
              this._element.value = Button[1]._element.value;
              Sound_ON("セーブ");
              break;
            case "アイテムリセット":
              Item_Flag = [
                ["万能ツール","色々出来るぞ。↓つきつけても無敵。","万能ツール","改造","画像万能ツール","万能"]
              ];
              this._element.value = Button[1]._element.value;
              Sound_ON("セーブ");
              break;
            case "人物リセット":
              Character_Flag = [];
              this._element.value = Button[1]._element.value;
              Sound_ON("セーブ");
              break;
            case "トロフィーリセット":
              Trophy_Flag = [];
              this._element.value = Button[1]._element.value;
              Sound_ON("セーブ");
              break;
            case "記録削除":
              Log_Flag = [];
              this._element.value = Button[1]._element.value;
              Sound_ON("セーブ");
              break;
            case "シーンデータ更新":
              Datakousin = true;
              this._element.value = Button[1]._element.value+"中……";
              fetch(GAS,
                {
                  method: 'POST',
                  body: ""
                }
              )
              .then(res => res.json())
              .then(result => {
                Move_DATAS = result.移動;
                Image_DATAS = result.画像;
                Main_DATAS = result.メイン;
                Choice_DATAS = result.選択;
                Branch_DATAS = result.分岐;
                Item_get_DATAS = result.入手;
                Inspect_DATAS = result.調べる;
                I_C_F_T_DATAS = result.フラグ類;
                Speech_DATAS = result.吹き出し;
                Interrogation_DATAS = result.尋問;
                for (var i = 0; i < Image_DATAS.length; i++){
                  if(Image_DATAS[i].url.substring(0,4)!="http"){
                    Image_DATAS[i].url = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/" + Image_DATAS[i].url;
                  }
                  else if(Image_DATAS[i].url.substring(0,18)=="https://gyazo.com/"){
                      Image_DATAS[i].url = "https://i."+Image_DATAS[i].url.substring(8)+".png\")";
                  }
                  Image_urls[i] = Image_DATAS[i].url;
                }
                BGM_DATAS = [];
                Sounds_urls = [];
                Voice_DATAS = [];
                Sound_effect_DATAS = [];
                SE = [];
                for (var i=0,k0=0,k1=0,k2=0,k3=0; i < Sounds_DATAS.length; i++){
                  if(Sounds_DATAS[i].url.substring(0,4)!="http"){
                    Sounds_DATAS[i].url = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/" + Sounds_DATAS[i].url +".wav";
                  }
                  switch (Sounds_DATAS[i].備考) {
                    default:
                      BGM_DATAS[k1] = [Sounds_DATAS[i].url,Sounds_DATAS[i].備考];
                      k1++;
                      break;
                    case "音声":
                      Sounds_urls[k0] = Sounds_DATAS[i].url;
                      Voice_DATAS[k2] = Sounds_DATAS[i].名前;
                      SE[k0] = document.createElement("audio");
                      SE[k0].src = Sounds_DATAS[i].url;
                      SE[k0].title = Sounds_DATAS[i].名前;
                      k0++;
                      k2++;
                      break;
                    case "効果音":
                      Sounds_urls[k0] = Sounds_DATAS[i].url;
                      Sound_effect_DATAS[k3] = Sounds_DATAS[i].名前;
                      SE[k0] = document.createElement("audio");
                      SE[k0].src = Sounds_DATAS[i].url;
                      SE[k0].title = Sounds_DATAS[i].名前;
                      k0++;
                      k3++;
                      break;
                  }
                }
                this._element.value = "シーンデータ更新完了。";
                Sound_ON("セーブ");
                Datakousin = false;
              },);
              break;
            default:
              this._element.value = "することを選択してください。";
              break;
          }
          });
        }
        submits++;
        Numbers += (width/20)+(width/25)+(width/25);
      }
      Submit("改造をやめる");
      Texts(0);
      Numbers += (width/20)+(width/25)+(width/25);
      Submit("");
      Submit("");
      Submit("強欲な壺");
      Submit("強欲な壺");
      Submit("チーター(強)に勝って貰った賞品。↓尋問時につきつけると先へ進める。↓その後強欲な壺が一つ無くなり↓強欲なカケラを入手する。");
      Submit("画像強欲な壺");
      Submit("実行する");

      var Option = [];
      var Choice_Transform = [
        "シーンデータ更新",
        "フラグ類入手",
        "アイテム作成",
        "フラグ追加 or 消去",
        "記録削除",
        "アイテムリセット",
        "人物リセット",
        "フラグリセット",
        "トロフィーリセット"
      ];

      for (var i = 0; i < Choice_Transform.length; i++){
        Option[i] = document.createElement("option");
        Option[i].text = Choice_Transform[i];
        Option[i].value = Choice_Transform[i];
        Button[1]._element.appendChild(Option[i]);
      }

      Option = [];

      for (var i = 0; i < I_C_F_T_DATAS.length; i++){
        Option[i] = document.createElement("option");
        Option[i].text = I_C_F_T_DATAS[i].アイテムor人物orフラグ名orトロフィー名;
        Option[i].value = I_C_F_T_DATAS[i].入手;
        Button[2]._element.appendChild(Option[i]);
      }

      return scene;
    };
    game.replaceScene(TitleScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  game.start();
}
