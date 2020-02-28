enchant();

var BGM = document.createElement("audio");
BGM.addEventListener("ended",function(e){
  BGM.currentTime = BGM.id*1;
  BGM.play();
  console.log("BGMを"+BGM.currentTime+"秒のところに移動。");
});

function Game_load(width,height,private,Manager,make){
  var game = new Game(width,height);
  if(make) width/=2.5;

  game.fps = 10;
  game.onload = function(){

  var Now = new Date().getTime();

  $("#base").on("touchstart",function(event){
    event.preventDefault();
  });

  $("#base").on("touchmove",function(event){
    event.preventDefault();
  });

  $("#base").on("touchend",function(event){
    event.preventDefault();
  });

  var Syougen_time = 0;
  var Syougen_time2 = 1;
  var Datas = [];
  var Setting_Datas = ["","","","","","","","","","","","","",""];
  var Send_text = "選択シーンです。";
  var Setting_Flag = ["名前","苗字","未設定",game.fps,"最初から",0,0,0,true,5,5,5,"最初から","Black","","デフォルト","一人称","二人称",false,"自由1→自由2"];
  //[0名前,1苗字,2性別,3fps,4直前,5アイテムページ,6人物ページ,7トロフィーページ,8オートセーブ,
  //9BGM音量,10効果音音量,11音声音量,12調べる,13背景,14BGM,15表示アイテム,16一人称,17二人称,18演出スキップ,19自由,20自由];
  var Favorability_Flag = [];//好感度
  var Flag = [];//フラグ
  var Log_Flag = [];//記録
  var Item_Flag = [];//所持アイテム
  var Character_Flag = [];//人物
  var Trophy_Flag = [];//トロフィー
  var Scene_kazu = 1;
  var OASOBI = false;
  var Play_Sheet = "無し";
  var Play_Sheet2 = "無し";
  var Showing_name = "表示名";
  var Save_Data_Number = "";
  var M_M = 0;
  if(Manager) var Title_Sheet = "170Ui3JDGJRt-VARJnWb19Drmy14gkp-pReAN-BTSjGI";
  else var Title_Sheet = window.localStorage.getItem("Title_Sheet");//これはいい


  function W_S(){
    if(make) return("../画像/半透明(白).png");
    else return("../画像/白.png");
  }
  function free(Data){
    for (var i = 0; i < Setting_Flag[19].split("→").length; i++) {
      var frees = "(自由"+(i+1)+")";
      Data = Data.replace(frees,Setting_Flag[19].split("→")[i]);
    }
    Data = Data.replace(/\(主人公苗字\)/g,Setting_Flag[1]);
    Data = Data.replace(/\(主人公名前\)/g,Setting_Flag[0]);
    Data = Data.replace(/\(一人称\)/g,Setting_Flag[16]);
    Data = Data.replace(/\(二人称\)/g,Setting_Flag[17]);
    Data = Data.replace(/\(カンマ\)/g,",");
    Data = Data.replace(/↓/g,"\n");
    for (var i = 0; i < Favorability_Flag.length; i++){
      var Favorability = "("+Favorability_Flag[i][0]+"好感度)";
      Data = Data.replace(Favorability,Favorability_Flag[i][1]);
    }
    return(Data);
  }
  function Datas_load(ID,Type,test){
    if(Type=="セーブデータ読み込み"){
      if(Play_Sheet==Play_Sheet2){
        Moves = Number;
        game.pushScene(MoveScene(10));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
        return;
      }
      ID = Play_Sheet2;
    }
    else if(Type=="シーンデータ読み込み"){
      if(Play_Sheet==ID){
        if(test){
          for (var i = 0; i < Main_DATAS.length; i++) {
            Log_Flag[i] = Play_Sheet+Main_DATAS[i].シーン名 + "プレイ済み";
          }
          for (var k = 0; k < Choice_DATAS.length; k++) {
            Log_Flag[i+k] = Play_Sheet+Choice_DATAS[k].シーン名 + "プレイ済み";
          }
          for (var i = 0; i < I_C_F_T_DATAS.length; i++) {
            switch (I_C_F_T_DATAS[i].タイプ) {
              case "アイテム":
                if(I_C_F_T_DATAS[i].フラグ類名.indexOf("消滅")==-1){
                  Item_Flag[Item_Flag.length] = [
                    I_C_F_T_DATAS[i].フラグ類名.split("→")[I_C_F_T_DATAS[i].フラグ類名.split("→").length-1],
                      I_C_F_T_DATAS[i].説明文,
                        I_C_F_T_DATAS[i].画像,
                          I_C_F_T_DATAS[i].詳細文,
                            I_C_F_T_DATAS[i].詳細内容,
                              I_C_F_T_DATAS[i].コード
                              ];
                }
                break;
              case "人物":
                if(I_C_F_T_DATAS[i].フラグ類名.indexOf("消滅")==-1){
                  Character_Flag[Character_Flag.length] = [
                    I_C_F_T_DATAS[i].フラグ類名.split("→")[I_C_F_T_DATAS[i].フラグ類名.split("→").length-1],
                      I_C_F_T_DATAS[i].説明文,
                        I_C_F_T_DATAS[i].画像,
                          I_C_F_T_DATAS[i].詳細文,
                            I_C_F_T_DATAS[i].詳細内容,
                              I_C_F_T_DATAS[i].コード
                              ];
                }
                break;
              case "フラグ":
                if(I_C_F_T_DATAS[i].フラグ類名.indexOf("→")==-1){
                  Flag[Flag.length] = I_C_F_T_DATAS[i].フラグ類名;
                }
                break;
              default:
                break;
            }
          }
          Scene_loads("テスト用",false,false,false,false,false);
        }
        else Scene_loads("最初",false,false,false,false,false);
        return;
      }
    }
    else if(Type=="シーンデータ更新"){
      ID = Play_Sheet;
      Type = "セーブデータ読み込み"
      Number = "直前";
    }
    game.pushScene(LoadingScene());
    Scene_kazu++;
    console.log("Scene数",Scene_kazu);
    Sheet = ID;
    if(Sheet.substring(0,4)=="http"){
      Sheet = Sheet.match(/\/d\/[^\/]+\//g)[0];
      Sheet = Sheet.substring(3,Sheet.length-1);
    }
    fetch("https://script.google.com/macros/s/AKfycbzbj_KkdrRMa-jmGW3D0lcRiRsu5Uz8wCsAS4LkHo_EHy1hTSA/exec",
          {
            method: 'POST',
            body: Type + Sheet
          }
         )
    .then(res => res.json())
    .then(result => {
    if(Type=="シーンデータ読み込み"||Type=="セーブデータ読み込み"){
      Play_Sheet = ID;
      var k0 = 0;
      var k1 = 0;
      var k2 = 0;
      var k3 = 0;
      var k4 = 0;
      var k5 = 0;
      var k6 = 0;
      var k7 = 0;
      var k8 = 0;
      var k9 = 0;
      Main_DATAS = [];
      Move_DATAS = [];
      Image_DATAS = [];
      Sounds_DATAS = [];
      Choice_DATAS = [];
      Branch_DATAS = [];
      Inspect_DATAS = [];
      I_C_F_T_DATAS = [];
      Item_get_DATAS = [];
      Interrogation_DATAS = [];
      for (var i = 0; i < result.length; i++) {
        switch (result[i].タイプ) {
          case "メイン":
            result[i] = result[i].データ.split(",");
            for (var k = 0; k < result[i].length; k++) {
              if(result[i][k]=="false") result[i][k] = false;
            }
            Main_DATAS[k1] = document.createElement("void");
            Main_DATAS[k1].タイプ = "メイン";
            Main_DATAS[k1].入手 = result[i][0];
            Main_DATAS[k1].BGM = result[i][1];
            Main_DATAS[k1].表示名 = result[i][2];
            Main_DATAS[k1].シーン名 = result[i][3];
            Main_DATAS[k1].背景 = result[i][4];
            Main_DATAS[k1].左側の人物 = result[i][5];
            Main_DATAS[k1].左倍率 = result[i][6];
            Main_DATAS[k1].真ん中の人物 = result[i][7];
            Main_DATAS[k1].中倍率 = result[i][8];
            Main_DATAS[k1].右側の人物 = result[i][9];
            Main_DATAS[k1].右倍率 = result[i][10];
            Main_DATAS[k1].人物名 = result[i][11];
            Main_DATAS[k1].文章音 = result[i][12];
            Main_DATAS[k1].速度 = result[i][13];
            Main_DATAS[k1].文章男 = result[i][14];
            Main_DATAS[k1].文章女 = result[i][15];
            Main_DATAS[k1].文章未設定 = result[i][16];
            Main_DATAS[k1].前前 = result[i][17];
            Main_DATAS[k1].前 = result[i][18];
            Main_DATAS[k1].セーブ = result[i][19];
            Main_DATAS[k1].次 = result[i][20];
            Main_DATAS[k1].次次 = result[i][21];
            Main_DATAS[k1].表示アイテムx座標 = result[i][22];
            Main_DATAS[k1].表示アイテムy座標 = result[i][23];
            Main_DATAS[k1].表示アイテムフェード = result[i][24];
            Main_DATAS[k1].表示アイテム画像 = result[i][25];
            Main_DATAS[k1].トロフィー = result[i][26];
            k1++;
            break;
          case "音":
            result[i] = result[i].データ.split(",");
            for (var k = 0; k < result[i].length; k++) {
              if(result[i][k]=="false") result[i][k] = false;
            }
            Sounds_DATAS[k2] = document.createElement("void");
            Sounds_DATAS[k2].名前 = result[i][0];
            Sounds_DATAS[k2].url = result[i][1];
            Sounds_DATAS[k2].備考 = result[i][2];
            k2++;
            break;
          case "画像":
            result[i] = result[i].データ.split(",");
            for (var k = 0; k < result[i].length; k++) {
              if(result[i][k]=="false") result[i][k] = false;
            }
            Image_DATAS[k3] = document.createElement("void");
            Image_DATAS[k3].名前 = result[i][0];
            Image_DATAS[k3].url = result[i][1];
            Image_DATAS[k3].画像 = result[i][2];
            Image_DATAS[k3].備考 = result[i][3];
            k3++;
            break;
          case "移行":
            result[i] = result[i].データ.split(",");
            for (var k = 0; k < result[i].length; k++) {
              if(result[i][k]=="false") result[i][k] = false;
            }
            Move_DATAS[k4] = document.createElement("void");
            Move_DATAS[k4].タイプ = "移行";
            Move_DATAS[k4].入手 = result[i][0];
            Move_DATAS[k4].シーン名 = result[i][1];
            Move_DATAS[k4].移動先 = result[i][2];
            Move_DATAS[k4].移動 = result[i][3];
            Move_DATAS[k4].吹き出し画像 = result[i][4];
            Move_DATAS[k4].再生音声 = result[i][5];
            k4++;
            break;
          case "分岐":
            result[i] = result[i].データ.split(",");
            for (var k = 0; k < result[i].length; k++) {
              if(result[i][k]=="false") result[i][k] = false;
            }
            Branch_DATAS[k5] = document.createElement("void");
            Branch_DATAS[k5].タイプ = "分岐";
            Branch_DATAS[k5].シーン名 = result[i][0];
            Branch_DATAS[k5].アイテムorフラグ名 = result[i][1];
            Branch_DATAS[k5].ない = result[i][2];
            Branch_DATAS[k5].ある = result[i][3];
            k5++;
            break;
          case "入手":
            result[i] = result[i].データ.split(",");
            for (var k = 0; k < result[i].length; k++) {
              if(result[i][k]=="false") result[i][k] = false;
            }
            Item_get_DATAS[k6] = document.createElement("void");
            Item_get_DATAS[k6].タイプ = "入手";
            Item_get_DATAS[k6].入手 = result[i][0];
            Item_get_DATAS[k6].シーン名 = result[i][1];
            Item_get_DATAS[k6].画像 = result[i][2];
            Item_get_DATAS[k6].文章 = result[i][3];
            Item_get_DATAS[k6].次のシーン = result[i][4];
            k6++;
            break;
          case "調べる":
            result[i] = result[i].データ.split(",");
            for (var k = 0; k < result[i].length; k++) {
              if(result[i][k]=="false") result[i][k] = false;
            }
            Inspect_DATAS[k7] = document.createElement("void");
            Inspect_DATAS[k7].タイプ = "調べる";
            Inspect_DATAS[k7].シーン名 = result[i][0];
            Inspect_DATAS[k7].背景 = result[i][1];
            Inspect_DATAS[k7].可視化 = result[i][2];
            Inspect_DATAS[k7].前のシーン = result[i][3];
            Inspect_DATAS[k7].x座標1 = result[i][4];
            Inspect_DATAS[k7].y座標1 = result[i][5];
            Inspect_DATAS[k7].幅1 = result[i][6];
            Inspect_DATAS[k7].高さ1 = result[i][7];
            Inspect_DATAS[k7].移動先1 = result[i][8];
            Inspect_DATAS[k7].x座標2 = result[i][9];
            Inspect_DATAS[k7].y座標2 = result[i][10];
            Inspect_DATAS[k7].幅2 = result[i][11];
            Inspect_DATAS[k7].高さ2 = result[i][12];
            Inspect_DATAS[k7].移動先2 = result[i][13];
            Inspect_DATAS[k7].x座標3 = result[i][14];
            Inspect_DATAS[k7].y座標3 = result[i][15];
            Inspect_DATAS[k7].幅3 = result[i][16];
            Inspect_DATAS[k7].高さ3 = result[i][17];
            Inspect_DATAS[k7].移動先3 = result[i][18];
            Inspect_DATAS[k7].x座標4 = result[i][19];
            Inspect_DATAS[k7].y座標4 = result[i][20];
            Inspect_DATAS[k7].幅4 = result[i][21];
            Inspect_DATAS[k7].高さ4 = result[i][22];
            Inspect_DATAS[k7].移動先4 = result[i][23];
            Inspect_DATAS[k7].x座標5 = result[i][24];
            Inspect_DATAS[k7].y座標5 = result[i][25];
            Inspect_DATAS[k7].幅5 = result[i][26];
            Inspect_DATAS[k7].高さ5 = result[i][27];
            Inspect_DATAS[k7].移動先5 = result[i][28];
            k7++;
            break;
          case "選択":
            result[i] = result[i].データ.split(",");
            for (var k = 0; k < result[i].length; k++) {
              if(result[i][k]=="false") result[i][k] = false;
            }
            Choice_DATAS[k8] = document.createElement("void");
            Choice_DATAS[k8].タイプ = "選択";
            Choice_DATAS[k8].入手 = result[i][0];
            Choice_DATAS[k8].BGM = result[i][1];
            Choice_DATAS[k8].表示名 = result[i][2];
            Choice_DATAS[k8].シーン名 = result[i][3];
            Choice_DATAS[k8].背景 = result[i][4];
            Choice_DATAS[k8].左側の人物 = result[i][5];
            Choice_DATAS[k8].左倍率 = result[i][6];
            Choice_DATAS[k8].真ん中の人物 = result[i][7];
            Choice_DATAS[k8].中倍率 = result[i][8];
            Choice_DATAS[k8].右側の人物 = result[i][9];
            Choice_DATAS[k8].右倍率 = result[i][10];
            Choice_DATAS[k8].前前 = result[i][11];
            Choice_DATAS[k8].前 = result[i][12];
            Choice_DATAS[k8].セーブ = result[i][13];
            Choice_DATAS[k8].選択肢1 = result[i][14];
            Choice_DATAS[k8].選択肢1移動先 = result[i][15];
            Choice_DATAS[k8].選択肢2 = result[i][16];
            Choice_DATAS[k8].選択肢2移動先 = result[i][17];
            Choice_DATAS[k8].選択肢3 = result[i][18];
            Choice_DATAS[k8].選択肢3移動先 = result[i][19];
            Choice_DATAS[k8].選択肢4 = result[i][20];
            Choice_DATAS[k8].選択肢4移動先 = result[i][21];
            Choice_DATAS[k8].選択肢5 = result[i][22];
            Choice_DATAS[k8].選択肢5移動先 = result[i][23];
            Choice_DATAS[k8].選択肢6 = result[i][24];
            Choice_DATAS[k8].選択肢6移動先 = result[i][25];
            k8++;
            break;
          case "フラグ類":
            result[i] = result[i].データ.split(",");
            for (var k = 0; k < result[i].length; k++) {
              if(result[i][k]=="false") result[i][k] = false;
            }
            I_C_F_T_DATAS[k9] = document.createElement("void");
            I_C_F_T_DATAS[k9].入手 = result[i][0];
            I_C_F_T_DATAS[k9].タイプ = result[i][1];
            I_C_F_T_DATAS[k9].フラグ類名 = result[i][2];
            I_C_F_T_DATAS[k9].コード = result[i][3];
            I_C_F_T_DATAS[k9].説明文 = result[i][4];
            I_C_F_T_DATAS[k9].画像 = result[i][5];
            I_C_F_T_DATAS[k9].詳細文 = result[i][6];
            I_C_F_T_DATAS[k9].詳細内容 = result[i][7];
            k9++;
            break;
          case "尋問":
          result[i] = result[i].データ.split(",");
          for (var k = 0; k < result[i].length; k++) {
            if(result[i][k]=="false") result[i][k] = false;
          }
          Interrogation_DATAS[k0] = document.createElement("void");
          Interrogation_DATAS[k0].タイプ = "尋問";
          Interrogation_DATAS[k0].BGM = result[i][0];
          Interrogation_DATAS[k0].シーン名 = result[i][1];
          Interrogation_DATAS[k0].人物 = result[i][2];
          Interrogation_DATAS[k0].人物名 = result[i][3];
          Interrogation_DATAS[k0].倍率 = result[i][4];
          Interrogation_DATAS[k0].証言 = result[i][5];
          Interrogation_DATAS[k0].待った移動場所 = result[i][6];
          Interrogation_DATAS[k0].前 = result[i][7];
          Interrogation_DATAS[k0].セーブ = result[i][8];
          Interrogation_DATAS[k0].次 = result[i][9];
          Interrogation_DATAS[k0].正解移動場所 = result[i][10];
          Interrogation_DATAS[k0].正解アイテム = result[i][11];
          k0++;
            break;
        }
      }
      /*
      Move_DATAS = result.移行;
      Sounds_DATAS = result.音;
      Image_DATAS = result.画像;
      Main_DATAS = result.メイン;
      Choice_DATAS = result.選択;
      Branch_DATAS = result.分岐;
      Item_get_DATAS = result.入手;
      Inspect_DATAS = result.調べる;
      I_C_F_T_DATAS = result.フラグ類;
      Interrogation_DATAS = result.尋問;
      */
      BGM_DATAS = [];
      Sounds_urls = [];
      Voice_DATAS = [];
      Sound_effect_DATAS = [];
      SE = [];
      for (var i=0,k0=0,k1=0,k2=0,k3=0; i < Sounds_DATAS.length; i++){
        switch (Sounds_DATAS[i].備考) {
          default:
            BGM_DATAS[k1] = [Sounds_DATAS[i].url,Sounds_DATAS[i].備考,Sounds_DATAS[i].名前];
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
      SE[k0].src = "../スカ.wav";
      SE[k0].title = "スカ";
      game.popScene();
      Scene_kazu--;
      console.log("Scene数",Scene_kazu);
      if(test){
        for (var i = 0; i < Main_DATAS.length; i++) {
          Log_Flag[i] = Play_Sheet+Main_DATAS[i].シーン名 + "プレイ済み";
        }
        for (var k = 0; k < Choice_DATAS.length; k++) {
          Log_Flag[i+k] = Play_Sheet+Choice_DATAS[k].シーン名 + "プレイ済み";
        }
        for (var i = 0; i < I_C_F_T_DATAS.length; i++) {
          switch (I_C_F_T_DATAS[i].タイプ) {
            case "アイテム":
              if(I_C_F_T_DATAS[i].フラグ類名.indexOf("消滅")==-1){
                Item_Flag[Item_Flag.length] = [
                  I_C_F_T_DATAS[i].フラグ類名.split("→")[I_C_F_T_DATAS[i].フラグ類名.split("→").length-1],
                    I_C_F_T_DATAS[i].説明文,
                      I_C_F_T_DATAS[i].画像,
                        I_C_F_T_DATAS[i].詳細文,
                          I_C_F_T_DATAS[i].詳細内容,
                            I_C_F_T_DATAS[i].コード
                            ];
              }
              break;
            case "人物":
              if(I_C_F_T_DATAS[i].フラグ類名.indexOf("消滅")==-1){
                Character_Flag[Character_Flag.length] = [
                  I_C_F_T_DATAS[i].フラグ類名.split("→")[I_C_F_T_DATAS[i].フラグ類名.split("→").length-1],
                    I_C_F_T_DATAS[i].説明文,
                      I_C_F_T_DATAS[i].画像,
                        I_C_F_T_DATAS[i].詳細文,
                          I_C_F_T_DATAS[i].詳細内容,
                            I_C_F_T_DATAS[i].コード
                            ];
              }
              break;
            case "フラグ":
              Flag[Flag.length] = I_C_F_T_DATAS[i].フラグ類名;
              break;
            default:
              break;
          }
        }
        Scene_loads("テスト用",false,false,false,false,false);
        return;
      }
      if(Type=="シーンデータ読み込み") Scene_loads("最初",false,false,false,false,false);
      else{
        Moves = Number;
        game.pushScene(MoveScene(10));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      }
    }
    else{
      Title_Sheet = Sheet;
      window.localStorage.clear();
      window.localStorage.setItem("Title_Sheet",Title_Sheet);//これはいい
      Title_DATAS = result;
      Title_sound1 = document.createElement("audio");
      Title_sound1.src = Title_DATAS[0].音URL;
      Title_sound2 = document.createElement("audio");
      Title_sound2.src = Title_DATAS[1].音URL;
      Title_sound3 = document.createElement("audio");
      Title_sound3.src = Title_DATAS[2].音URL;
      Title_sound4 = document.createElement("audio");
      Title_sound4.src = Title_DATAS[3].音URL;
      Title_sound5 = document.createElement("audio");
      Title_sound5.src = Title_DATAS[4].音URL;
      Title_sound6 = document.createElement("audio");
      Title_sound6.src = Title_DATAS[5].音URL;
      game.popScene();
      Scene_kazu--;
      console.log("Scene数",Scene_kazu);
      game.replaceScene(TitleScene());
    }
  },);
}
  function Load_Datas(result){
  Number = result[0].シーン名;
  Play_Sheet2 = result[0].シート;
  for (var i = 0; i < result.length; i++) {
    if(result[i].フラグ=="コマンド終了"){
      if(i==0) Flag = [];
      break;
    }
    Flag[i] = result[i].フラグ;
  }
  Flag.splice(i,Flag.length);
  for (var i = 0; i < result.length; i++) {
    if(result[i].記録=="コマンド終了"){
      if(i==0) Log_Flag = [];
      break;
    }
    Log_Flag[i] = result[i].記録;
  }
  Log_Flag.splice(i,Log_Flag.length);
  for (var i = 0; i < result.length; i++) {
    if(result[i].設定=="コマンド終了"){
      if(i==0) Setting_Flag = ["名前","苗字","未設定",game.fps,"最初から",0,0,0,true,5,5,5,"最初から","Black","","デフォルト","一人称","二人称",false,"自由1→自由2"];
      break;
    }
    Setting_Flag[i] = result[i].設定;
  }
  for (var i = 0; i < result.length; i++) {
    if(result[i].アイテム=="コマンド終了"){
      if(i==0) Item_Flag = [];
      break;
    }
    Item_Flag[i] = result[i].アイテム.split(",");
  }
  Item_Flag.splice(i,Item_Flag.length);
  for (var i = 0; i < result.length; i++) {
    if(result[i].人物=="コマンド終了"){
      if(i==0) Character_Flag = [];
      break;
    }
    Character_Flag[i] = result[i].人物.split(",");
  }
  Character_Flag.splice(i,Character_Flag.length);
  for (var i = 0; i < result.length; i++) {
    if(result[i].好感度=="コマンド終了"){
      if(i==0) Favorability_Flag = [];
      break;
    }
    Favorability_Flag[i] = result[i].好感度.split(",");
  }
  Favorability_Flag.splice(i,Favorability_Flag.length);
  for (var i = 0; i < result.length; i++) {
    if(result[i].トロフィー=="コマンド終了"){
      if(i==0) Trophy_Flag = [];
      break;
    }
    Trophy_Flag[i] = result[i].トロフィー.split(",");
  }
  Trophy_Flag.splice(i,Trophy_Flag.length);
  return;
  //Flag = ウインドウ.localStorage.getItem(Title_Sheet+"Flag").split(",");
  //Log_Flag = ウインドウ.localStorage.getItem(Title_Sheet+"Log_Flag").split(",");
  //Setting_Flag = ウインドウ.localStorage.getItem(Title_Sheet+"Setting_Flag").split(",");
  //Datas = ウインドウ.localStorage.getItem(Title_Sheet+"Datas").split(",");
  //Number = ウインドウ.localStorage.getItem(Title_Sheet+"Number");
  //if(Number.replace(/\d/g,"").replace(/\./g,"")=="") Number = Number*1;
  //Item_Flag = ウインドウ.localStorage.getItem(Title_Sheet+"Item").split("(端)");
  //Trophy_Flag = ウインドウ.localStorage.getItem(Title_Sheet+"Trophy").split("(端)");
  //Character_Flag = ウインドウ.localStorage.getItem(Title_Sheet+"Character").split("(端)");
  //Favorability_Flag = ウインドウ.localStorage.getItem(Title_Sheet+"Favorability").split("(端)");
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
  }
  for (var i = 0; i < Datas.length; i++){
    if(Datas[i].replace(/\d/g,"").replace(/\./g,"")=="") Datas[i] = Datas[i]*1;
  }
  return(Number);
}
  function Button_push(expression){
    if(new Date().getTime()-Now>350){
      Now = new Date().getTime();
      game.fps = 10;
      switch (expression) {
        case "音無し":
          break;
        default:
          Sound_ON(expression);
          break;
        return(false);
      }
    }
    else return(true);
  }
  function Button_push_title(e){
    if(new Date().getTime()-Now>350){
      Now = new Date().getTime();
      game.fps = 10;
      if(e==false) return;
      if(Setting_Flag[10]){
        var Volume = Setting_Flag[10] / 10;
        e.volume = Volume;
        if(e.paused) e.play();
        else e.currentTime = 0;
      }
      else{
        if(e.paused==false) e.pause();
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
        return("../画像/画像無し.gif");
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
        if(DATAS[1].split("→")[1]!="消滅") Flag[Flag.length] = DATAS[1];
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
        if(DATAS[1].split("→")[1]!="消滅") Log_Flag[Log_Flag.length] = DATAS[1];
        saves("記録");
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
            Favorability_Flag[i][1] = DATAS[1].split("→")[1];
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
  function Get_ICFT2(DATAS){
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
          I_C_F_T_DATAS[k].フラグ類名,
            I_C_F_T_DATAS[k].説明文,
              I_C_F_T_DATAS[k].画像,
                I_C_F_T_DATAS[k].詳細文,
                  I_C_F_T_DATAS[k].詳細内容,
                    I_C_F_T_DATAS[k].コード
                    ];
        Get_ICFT(DATAS);
      }
    }
  }
  function Scene_loads(Number,Return,Item,Item_type,Item_image,Do){
    if(Item){
      if(Item_image) Setting_Flag[15] = Item_image;
      if(Item_type) Number = [Number+"で"+Item+"を"+Do,Number+"で"+Item_type+"を"+Do];
      else Number = [Number.split("\n")[0]+"で"+Item+"を"+Do,Number.split("\n")[1]];
      Item = Number[1];
      Number = Number[0];
      if(have(Number+"既読")){
        var Get = false;
      }
      else{
        var Get = true;
        Flag[Flag.length] = Number+"既読";
      }
      if(have(Play_Sheet+Number+"プレイ済み")==false){
        Log_Flag[Log_Flag.length] = Play_Sheet+Number+"プレイ済み";
        console.log(Number);
        saves("記録");
      }
      else console.log(Number,"プレイ済み");
    }
    else{
      if(have(Number+"既読")){
        var Get = false;
      }
      else{
        var Get = true;
        Flag[Flag.length] = Number+"既読";
      }
      if(have(Play_Sheet+Number+"プレイ済み")==false){
        Log_Flag[Log_Flag.length] = Play_Sheet+Number+"プレイ済み";
        console.log(Number);
        if(Number!="セーブ読み込み"&&Save_Data_Number!="") saves("記録");
      }
      else console.log(Number,"プレイ済み");
    }
    switch (Number) {
      case "セーブ読み込み完了":
        Datas_load(false,"セーブデータ読み込み");
        return;
        break;
      case "セーブ読み込み":
        game.pushScene(Save_ChoiceScene("読み込み"));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
        return;
        break;
      case "直前移動":
        Moves = "直前";
        game.pushScene(MoveScene(10));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
        return;
        break;
      case "タイトル移動":
        Moves = "タイトルに戻る";
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
          console.log("Scene数",Scene_kazu);
          return;
        }
        Number = Setting_Flag[4];
        console.log("直前",Number);
        Scene_loads(Number,true,false);
        return;
        break;
      case "未完成":
        Datas = [];
        Datas[0] = "画像無し";
        Datas[1] = "";
        Datas[2] = "";
        Datas[3] = "";
        Datas[4] = "";
        Datas[5] = "";
        Datas[6] = "";
        Datas[7] = "";
        Datas[8] = "";
        Datas[9] = "";
        Datas[10] = "タイトルに戻る";
        Datas[11] = "タイトル移動";
        Datas[12] = "セーブ読み込み";
        Datas[13] = "セーブ読み込み";
        Datas[14] = "直前のシーンに戻る";
        Datas[15] = "直前移動";
        Datas[16] = "シーンデータを更新して直前のシーンに戻る";
        Datas[17] = "シーンデータ更新";
        Datas[18] = "";
        Datas[19] = "";
        Datas[20] = "";
        Datas[21] = "";
        game.replaceScene(ChoiceScene(Number));
        return;
        break;
      case "シーンデータ更新":
        Datas_load(false,Number);
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
        Setting_Datas = [];
        Setting_Datas[0] = Main_DATAS[i].BGM;
        Setting_Datas[1] = Main_DATAS[i].表示名;
        Setting_Datas[2] = Main_DATAS[i].背景;
        Setting_Datas[3] = Main_DATAS[i].左側の人物;
        Setting_Datas[4] = Main_DATAS[i].左倍率;
        Setting_Datas[5] = Main_DATAS[i].真ん中の人物;
        Setting_Datas[6] = Main_DATAS[i].中倍率;
        Setting_Datas[7] = Main_DATAS[i].右側の人物;
        Setting_Datas[8] = Main_DATAS[i].右倍率;
        Setting_Datas[9] = Main_DATAS[i].人物名;
        Setting_Datas[10] = Main_DATAS[i].文章音;
        Setting_Datas[11] = Main_DATAS[i].表示アイテムx座標;
        Setting_Datas[12] = Main_DATAS[i].表示アイテムy座標;
        Setting_Datas[13] = Main_DATAS[i].表示アイテム画像;
        if(make) M_M = Main_DATAS[i];
        if(Main_DATAS[i].表示名!="変化無し") Showing_name = free(Main_DATAS[i].表示名);
        if(Main_DATAS[i].BGM=="変化無し") BGM_ON(Setting_Flag[14]);
        else {
          if(Main_DATAS[i].セーブ!="無し"&&Main_DATAS[i].セーブ) Setting_Flag[14] = Main_DATAS[i].BGM;
          BGM_ON(Main_DATAS[i].BGM);
        }
        if(Get||Main_DATAS[i].セーブ=="無し"||Main_DATAS[i].セーブ==false) Get_ICFT2(Main_DATAS[i]);
        game.fps = Main_DATAS[i].速度;
        Setting_Flag[3] = game.fps;
        if(Main_DATAS[i].背景=="変化無し") Datas[0] = Setting_Flag[13];
        else {
          if(Main_DATAS[i].セーブ!="無し"&&Main_DATAS[i].セーブ) Setting_Flag[13] = Main_DATAS[i].背景;
          Datas[0] = Main_DATAS[i].背景;
        }
        if(Main_DATAS[i].左側の人物.split("in").length==1&&Main_DATAS[i].左側の人物.split("out").length==1&&Main_DATAS[i].左側の人物.split("点滅").length==1){
          Datas[1] = Main_DATAS[i].左側の人物;
          Datas[2] = 0;
        }
        else{
          if(Main_DATAS[i].左側の人物.split("in").length==2){
            Datas[1] = Main_DATAS[i].左側の人物.split("in")[0];
            Datas[2] = Main_DATAS[i].左側の人物.split("in")[1]*1;
          }
          else if(Main_DATAS[i].左側の人物.split("点滅").length==2){
            Datas[1] = Main_DATAS[i].左側の人物.split("点滅")[0];
            Datas[2] = "点滅";
          }
          else{
            Datas[1] = Main_DATAS[i].左側の人物.split("out")[0];
            Datas[2] = Main_DATAS[i].左側の人物.split("out")[1]*-1;
          }
        }
        if(Main_DATAS[i].真ん中の人物.split("in").length==1&&Main_DATAS[i].真ん中の人物.split("out").length==1){
          Datas[3] = Main_DATAS[i].真ん中の人物;
          Datas[4] = 0;
        }
        else{
          if(Main_DATAS[i].真ん中の人物.split("in").length==2){
            Datas[3] = Main_DATAS[i].真ん中の人物.split("in")[0];
            Datas[4] = Main_DATAS[i].真ん中の人物.split("in")[1]*1;
          }
          else{
            Datas[3] = Main_DATAS[i].真ん中の人物.split("out")[0];
            Datas[4] = Main_DATAS[i].真ん中の人物.split("out")[1]*-1;
          }
        }
        if(Main_DATAS[i].右側の人物.split("in").length==1&&Main_DATAS[i].右側の人物.split("out").length==1){
          Datas[5] = Main_DATAS[i].右側の人物;
          Datas[6] = 0;
        }
        else{
          if(Main_DATAS[i].右側の人物.split("in").length==2){
            Datas[5] = Main_DATAS[i].右側の人物.split("in")[0];
            Datas[6] = Main_DATAS[i].右側の人物.split("in")[1]*1;
          }
          else{
            Datas[5] = Main_DATAS[i].右側の人物.split("out")[0];
            Datas[6] = Main_DATAS[i].右側の人物.split("out")[1]*-1;
          }
        }
        if(Main_DATAS[i].人物名=="(主人公名前)") Datas[18] = true;
        Datas[7] = free(Main_DATAS[i].人物名);
        switch (Setting_Flag[2]) {
          case "男":
            Datas[8] = free(Main_DATAS[i].文章男);
            break;
          case "女":
            Datas[8] = free(Main_DATAS[i].文章女);
            break;
          default:
            Datas[8] = free(Main_DATAS[i].文章未設定);
            break;
        }
        Send_text = Datas[8];
        Datas[9] = Main_DATAS[i].前前;
        Datas[10] = Main_DATAS[i].前;
        Datas[11] = Main_DATAS[i].セーブ;
        Datas[12] = Main_DATAS[i].次;
        Datas[13] = Main_DATAS[i].次次;
        Datas[14] = Main_DATAS[i].表示アイテムx座標;
        if(Main_DATAS[i].表示アイテム画像=="デフォルト") Datas[15] = Setting_Flag[15];
        else Datas[15] = Main_DATAS[i].表示アイテム画像;
        Datas[16] = Main_DATAS[i].トロフィー;
        Datas[19] = Main_DATAS[i].文章音;
        Datas[20] = Main_DATAS[i].表示アイテムy座標;
        Datas[21] = Main_DATAS[i].表示アイテムフェード;
        Datas[22] = Main_DATAS[i].左倍率;
        Datas[23] = Main_DATAS[i].中倍率;
        Datas[24] = Main_DATAS[i].右倍率;
        if(Datas[1].substring(0,3)=="主人公") Datas[1] = Setting_Flag[2]+Datas[1];
        if(Datas[3].substring(0,3)=="主人公") Datas[3] = Setting_Flag[2]+Datas[3];
        if(Datas[5].substring(0,3)=="主人公") Datas[5] = Setting_Flag[2]+Datas[5];
        if(Datas[19]=="主人公") Datas[19] = Setting_Flag[2]+"主人公ポポポ";
        for (var k = 0; k < Inspect_DATAS.length; k++) {
          if(Number==Inspect_DATAS[k].シーン名){
            var Inspect = ["背景ナンバー","(幅,高さ,x座標,y座標,シーンナンバー)"];
            Inspect[0] = Datas[0];
            if(Inspect_DATAS[k].移動先1){
              Inspect[1] = Inspect_DATAS[k].x座標1;
              Inspect[2] = Inspect_DATAS[k].y座標1;
              Inspect[3] = Inspect_DATAS[k].幅1;
              Inspect[4] = Inspect_DATAS[k].高さ1;
              Inspect[5] = Inspect_DATAS[k].移動先1;
            }
            if(Inspect_DATAS[k].移動先2){
              Inspect[6] = Inspect_DATAS[k].x座標2;
              Inspect[7] = Inspect_DATAS[k].y座標2;
              Inspect[8] = Inspect_DATAS[k].幅2;
              Inspect[9] = Inspect_DATAS[k].高さ2;
              Inspect[10] = Inspect_DATAS[k].移動先2;
            }
            if(Inspect_DATAS[k].移動先3){
              Inspect[11] = Inspect_DATAS[k].x座標3;
              Inspect[12] = Inspect_DATAS[k].y座標3;
              Inspect[13] = Inspect_DATAS[k].幅3;
              Inspect[14] = Inspect_DATAS[k].高さ3;
              Inspect[15] = Inspect_DATAS[k].移動先3;
            }
            if(Inspect_DATAS[k].移動先4){
              Inspect[16] = Inspect_DATAS[k].x座標4;
              Inspect[17] = Inspect_DATAS[k].y座標4;
              Inspect[18] = Inspect_DATAS[k].幅4;
              Inspect[19] = Inspect_DATAS[k].高さ4;
              Inspect[20] = Inspect_DATAS[k].移動先4;
            }
            if(Inspect_DATAS[k].移動先5){
              Inspect[21] = Inspect_DATAS[k].x座標5;
              Inspect[22] = Inspect_DATAS[k].y座標5;
              Inspect[23] = Inspect_DATAS[k].幅5;
              Inspect[24] = Inspect_DATAS[k].高さ5;
              Inspect[25] = Inspect_DATAS[k].移動先5;
            }
            game.replaceScene(MainScene(Return,Number,Inspect,Inspect_DATAS[k].可視化));
            return;
          }
        }
        game.replaceScene(MainScene(Return,Number));
        return;
      }
    }
    for (var i = 0; i < Choice_DATAS.length; i++) {
      if(Number==Choice_DATAS[i].シーン名){
        if(make) M_M = Choice_DATAS[i];
        if(Choice_DATAS[i].表示名!="変化無し") Showing_name = free(Choice_DATAS[i].表示名);
        if(Choice_DATAS[i].BGM=="変化無し") BGM_ON(Setting_Flag[14]);
        else {
          if(Choice_DATAS[i].セーブ!="無し"&&Choice_DATAS[i].セーブ) Setting_Flag[14] = Choice_DATAS[i].BGM;
          BGM_ON(Choice_DATAS[i].BGM);
        }
        if(Get) Get_ICFT2(Choice_DATAS[i]);
        if(Choice_DATAS[i].背景=="変化無し") Datas[0] = Setting_Flag[13];
        else {
          if(Choice_DATAS[i].セーブ!="無し"&&Choice_DATAS[i].セーブ) Setting_Flag[13] = Choice_DATAS[i].背景;
          Datas[0] = Choice_DATAS[i].背景;
        }
        Datas[1] = Choice_DATAS[i].左側の人物;
        Datas[2] = Choice_DATAS[i].真ん中の人物;
        Datas[3] = Choice_DATAS[i].右側の人物;
        Datas[4] = Choice_DATAS[i].前前;
        Datas[5] = Choice_DATAS[i].前;
        Datas[6] = Choice_DATAS[i].セーブ;
        Datas[7] = Choice_DATAS[i].左倍率;
        Datas[8] = Choice_DATAS[i].中倍率;
        Datas[9] = Choice_DATAS[i].右倍率;
        Datas[10] = Choice_DATAS[i].選択肢1;
        Datas[11] = Choice_DATAS[i].選択肢1移動先;
        Datas[12] = Choice_DATAS[i].選択肢2;
        Datas[13] = Choice_DATAS[i].選択肢2移動先;
        Datas[14] = Choice_DATAS[i].選択肢3;
        Datas[15] = Choice_DATAS[i].選択肢3移動先;
        Datas[16] = Choice_DATAS[i].選択肢4;
        Datas[17] = Choice_DATAS[i].選択肢4移動先;
        Datas[18] = Choice_DATAS[i].選択肢5;
        Datas[19] = Choice_DATAS[i].選択肢5移動先;
        Datas[20] = Choice_DATAS[i].選択肢6;
        Datas[21] = Choice_DATAS[i].選択肢6移動先;
        if(Datas[1].substring(0,3)=="主人公") Datas[1] = Datas[1] = Setting_Flag[2]+Datas[1];
        if(Datas[2].substring(0,3)=="主人公") Datas[2] = Datas[2] = Setting_Flag[2]+Datas[2];
        if(Datas[3].substring(0,3)=="主人公") Datas[3] = Datas[3] = Setting_Flag[2]+Datas[3];
        Datas[10] = free(Datas[10]);
        Datas[12] = free(Datas[12]);
        Datas[14] = free(Datas[14]);
        Datas[16] = free(Datas[16]);
        Datas[18] = free(Datas[18]);
        Datas[20] = free(Datas[20]);
        game.replaceScene(ChoiceScene(Number));
        return;
      }
    }
    for (var i = 0; i < Move_DATAS.length; i++) {
      if(Number==Move_DATAS[i].シーン名){
        if(make) M_M = Move_DATAS[i];
        if(Get) Get_ICFT2(Move_DATAS[i]);
        if(Setting_Flag[18]){
          Scene_loads(Move_DATAS[i].移動先,Return,false);
        }
        else{
          if(Move_DATAS[i].移動){
            Moves = Move_DATAS[i].移動先;
            game.pushScene(MoveScene(10));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else{
            if(Move_DATAS[i].再生音声||Move_DATAS[i].吹き出し画像){
              Datas[0] = Move_DATAS[i].吹き出し画像;
              Datas[1] = Move_DATAS[i].再生音声;
              Datas[2] = Move_DATAS[i].移動先;
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              game.pushScene(PopScene(Datas[2],Datas[0],Datas[1]));
            }
            else{
              Scene_loads(Move_DATAS[i].移動先,Return,false);
            }
          }
        }
        return;
      }
    }
    for (var i = 0; i < Branch_DATAS.length; i++) {
      if(Number==Branch_DATAS[i].シーン名){
        if(make) M_M = Branch_DATAS[i];
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
        else if(Branch_DATAS[i].アイテムorフラグ名.split("=").length==2){
          for (var k = 0; k < Favorability_Flag.length; k++){
            if(Favorability_Flag[k][0]==Branch_DATAS[i].アイテムorフラグ名.split("=")[0]) break;
          }
          if(k==Favorability_Flag.length) Favorability_Flag[k] = [Branch_DATAS[i].アイテムorフラグ名.split("=")[0],0];
          if(Favorability_Flag[k][1]+""==Branch_DATAS[i].アイテムorフラグ名.split("=")[1]+""){
            Scene_loads(Branch_DATAS[i].ある,Return,Item);
          }
          else Scene_loads(Branch_DATAS[i].ない,Return,Item);
          return;
        }
        else if(Branch_DATAS[i].アイテムorフラグ名=="主人公が男"){
          if(Setting_Flag[2]=="男") Scene_loads(Branch_DATAS[i].ある,Return,Item);
          else Scene_loads(Branch_DATAS[i].ない,Return,Item);
          return;
        }
        else if(Branch_DATAS[i].アイテムorフラグ名=="主人公が女"){
          if(Setting_Flag[2]=="女") Scene_loads(Branch_DATAS[i].ある,Return,Item);
          else Scene_loads(Branch_DATAS[i].ない,Return,Item);
          return;
        }
        else if(Branch_DATAS[i].アイテムorフラグ名=="主人公が未設定"){
          if(Setting_Flag[2]=="男"||Setting_Flag[2]=="女") Scene_loads(Branch_DATAS[i].ない,Return,Item);
          else Scene_loads(Branch_DATAS[i].ある,Return,Item);
          return;
        }
        if(have(Branch_DATAS[i].アイテムorフラグ名)) Scene_loads(Branch_DATAS[i].ある,Return,Item);
        else Scene_loads(Branch_DATAS[i].ない,Return,Item);
        return;
      }
    }
    for (var i = 0; i < Item_get_DATAS.length; i++) {
      if(Number==Item_get_DATAS[i].シーン名){
        if(make) M_M = Item_get_DATAS[i];
        if(Get){
          Get_ICFT2(Item_get_DATAS[i]);
          if(Setting_Flag[18]){
            Scene_loads(Item_get_DATAS[i].次のシーン,false,false);
          }
          else{
            if(make) game.replaceScene(ItemgetScene(conversion_url(Item_get_DATAS[i].画像,"画像"),Item_get_DATAS[i].文章,Item_get_DATAS[i].次のシーン));
            else{
              game.pushScene(ItemgetScene(conversion_url(Item_get_DATAS[i].画像,"画像"),Item_get_DATAS[i].文章,Item_get_DATAS[i].次のシーン));
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
            }
          }
        }
        else{
          if(make) game.replaceScene(ItemgetScene(conversion_url(Item_get_DATAS[i].画像,"画像"),Item_get_DATAS[i].文章,Item_get_DATAS[i].次のシーン));
          else{
            Scene_loads(Item_get_DATAS[i].次のシーン,false,false);
          }
        }
        return;
      }
    }
    for (var i = 0; i < Inspect_DATAS.length; i++) {
      if(Number==Inspect_DATAS[i].シーン名){
        if(make) M_M = (Inspect_DATAS[i]);
        var Inspect = ["背景ナンバー","(幅,高さ,x座標,y座標,シーンナンバー)"];
        Setting_Flag[12] = Number;
        if(Inspect_DATAS[i].背景=="変化無し") Inspect[0] = Setting_Flag[13];
        else {
          Inspect[0] = Inspect_DATAS[i].背景;
          Setting_Flag[13] = Inspect[0];
        }
        if(Inspect_DATAS[i].移動先1){
          Inspect[1] = Inspect_DATAS[i].x座標1;
          Inspect[2] = Inspect_DATAS[i].y座標1;
          Inspect[3] = Inspect_DATAS[i].幅1;
          Inspect[4] = Inspect_DATAS[i].高さ1;
          Inspect[5] = Inspect_DATAS[i].移動先1;
        }
        if(Inspect_DATAS[i].移動先2){
          Inspect[6] = Inspect_DATAS[i].x座標2;
          Inspect[7] = Inspect_DATAS[i].y座標2;
          Inspect[8] = Inspect_DATAS[i].幅2;
          Inspect[9] = Inspect_DATAS[i].高さ2;
          Inspect[10] = Inspect_DATAS[i].移動先2;
        }
        if(Inspect_DATAS[i].移動先3){
          Inspect[11] = Inspect_DATAS[i].x座標3;
          Inspect[12] = Inspect_DATAS[i].y座標3;
          Inspect[13] = Inspect_DATAS[i].幅3;
          Inspect[14] = Inspect_DATAS[i].高さ3;
          Inspect[15] = Inspect_DATAS[i].移動先3;
        }
        if(Inspect_DATAS[i].移動先4){
          Inspect[16] = Inspect_DATAS[i].x座標4;
          Inspect[17] = Inspect_DATAS[i].y座標4;
          Inspect[18] = Inspect_DATAS[i].幅4;
          Inspect[19] = Inspect_DATAS[i].高さ4;
          Inspect[20] = Inspect_DATAS[i].移動先4;
        }
        if(Inspect_DATAS[i].移動先5){
          Inspect[21] = Inspect_DATAS[i].x座標5;
          Inspect[22] = Inspect_DATAS[i].y座標5;
          Inspect[23] = Inspect_DATAS[i].幅5;
          Inspect[24] = Inspect_DATAS[i].高さ5;
          Inspect[25] = Inspect_DATAS[i].移動先5;
        }
        Datas[0] = Inspect[0];
        game.replaceScene(InspectScene(Inspect,Inspect_DATAS[i].前のシーン,Inspect_DATAS[i].可視化));
        return;
      }
    }
    for (var i = 0; i < Interrogation_DATAS.length; i++) {
      if(Number==Interrogation_DATAS[i].シーン名){
        if(make) M_M = Interrogation_DATAS[i];
        if(Interrogation_DATAS[i].セーブ!="無し"&&Interrogation_DATAS[i].セーブ) Setting_Flag[13] = "stand";
        if(Interrogation_DATAS[i].BGM=="変化無し") BGM_ON(Setting_Flag[14]);
        else {
          if(Interrogation_DATAS[i].セーブ!="無し"&&Interrogation_DATAS[i].セーブ) Setting_Flag[14] = Interrogation_DATAS[i].BGM;
          BGM_ON(Interrogation_DATAS[i].BGM);
        }
        Datas[0] = Interrogation_DATAS[i].人物;
        Datas[1] = Interrogation_DATAS[i].人物名;
        Datas[2] = Interrogation_DATAS[i].証言;
        Datas[3] = Interrogation_DATAS[i].待った移動場所;
        Datas[4] = Interrogation_DATAS[i].前;
        Datas[5] = Interrogation_DATAS[i].セーブ;
        Datas[6] = Interrogation_DATAS[i].次;
        Datas[7] = Interrogation_DATAS[i].正解移動場所;
        Datas[8] = Interrogation_DATAS[i].正解アイテム;
        Datas[9] = Interrogation_DATAS[i].倍率;
        game.replaceScene(InterrogationScene(Number));
        return;
      }
    }
    if(Item){
      Scene_loads(Item,false,false);
      return;
    }
    if(make){
      game.replaceScene(SceneSettingScene(Number));
      return;
    }
    Datas[0] = "画像無し";
    Datas[1] = "";
    Datas[2] = "";
    Datas[3] = "";
    Datas[4] = "";
    Datas[5] = "";
    Datas[6] = "";
    Datas[7] = "";
    Datas[8] = "ここから先は出来ていません。\n更新をお待ちください。";
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
  function saves(Type,a){
    switch (Type) {
      case "記録":
        fetch("https://script.google.com/macros/s/AKfycbzbj_KkdrRMa-jmGW3D0lcRiRsu5Uz8wCsAS4LkHo_EHy1hTSA/exec",
          {
            method: 'POST',
            body: "記録更新(改行)"+Log_Flag+"(改行)"+Title_Sheet+"(改行)"+Save_Data_Number
          }
        )
        break;
      case "トロフィー":
        fetch("https://script.google.com/macros/s/AKfycbzbj_KkdrRMa-jmGW3D0lcRiRsu5Uz8wCsAS4LkHo_EHy1hTSA/exec",
          {
            method: 'POST',
            body: "トロフィー更新(改行)"+a+"(改行)"+Title_Sheet+"(改行)"+Save_Data_Number
          }
        )
        break;
    }
    return;
  }
  function Save(Number){
    //ウインドウ.localStorage.setItem(Title_Sheet+"Flag",Flag);
    //ウインドウ.localStorage.setItem(Title_Sheet+"Datas",Datas);
    //ウインドウ.localStorage.setItem(Title_Sheet+"Number",Number);
    //ウインドウ.localStorage.setItem(Title_Sheet+"Log_Flag",Log_Flag);
    //ウインドウ.localStorage.setItem(Title_Sheet+"Play_Sheet",Play_Sheet);
    //ウインドウ.localStorage.setItem(Title_Sheet+"Setting_Flag",Setting_Flag);
    var Item_Flag2 = [];
    for (var i = 0; i < Item_Flag.length; i++) {
      Item_Flag2[i] = Item_Flag[i] + "(端)";
    }
    if(Item_Flag2==[]) Item_Flag2 = [[]+"(端)"]
    //ウインドウ.localStorage.setItem(Title_Sheet+"Item",Item_Flag2);
    var Character_Flag2 = [];
    for (var i = 0; i < Character_Flag.length; i++) {
      Character_Flag2[i] = Character_Flag[i] + "(端)";
    }
    if(Character_Flag2==[]) Character_Flag2 = [[]+"(端)"]
    //ウインドウ.localStorage.setItem(Title_Sheet+"Character",Character_Flag2);
    var Favorability_Flag2 = [];
    for (var i = 0; i < Favorability_Flag.length; i++) {
      Favorability_Flag2[i] = Favorability_Flag[i] + "(端)";
    }
    if(Favorability_Flag2==[]) Favorability_Flag2 = [[]+"(端)"]
    //ウインドウ.localStorage.setItem(Title_Sheet+"Favorability",Favorability_Flag2);
    var Trophy_Flag2 = [];
    for (var i = 0; i < Trophy_Flag.length; i++) {
      Trophy_Flag2[i] = Trophy_Flag[i] + "(端)";
    }
    if(Trophy_Flag2==[]) Trophy_Flag2 = [[]+"(端)"]
    //ウインドウ.localStorage.setItem(Title_Sheet+"Trophy",Trophy_Flag2);
    //ウインドウ.localStorage.setItem(Title_Sheet+"syoken",false);
    Title_DATAS[Save_Data_Number-1].セーブデータ = Showing_name + " " + Setting_Flag[1] + " " + Setting_Flag[0];
    var BoDy = Flag+"(改行)"+Number+"(改行)"+Log_Flag+"(改行)"+Play_Sheet+"(改行)"+Setting_Flag+"(改行)";
    BoDy += Item_Flag2+"(改行)"+Character_Flag2+"(改行)"+Favorability_Flag2+"(改行)"+Trophy_Flag2+"(改行)";
    BoDy += Title_Sheet+"(改行)"+Save_Data_Number+"(改行)"+Title_DATAS[Save_Data_Number-1].セーブデータ;
    BoDy += "(改行)"+Send_text+"(改行)"+Setting_Flag[1]+"(改行)"+Setting_Flag[0]+"(改行)"+Manager;
    fetch("https://script.google.com/macros/s/AKfycbzbj_KkdrRMa-jmGW3D0lcRiRsu5Uz8wCsAS4LkHo_EHy1hTSA/exec",
          {
            method: 'POST',
            body: BoDy
          }
         )
  }//セーブ
  function rand(n) {
    return Math.floor(Math.random() * (n + 1));
  }
  function makes(make_data,scene){

    if(make_data==undefined) return;

    var Background = new Entity();
    Background._element = document.createElement("img");
    Background._element.src = "../画像/白.png";
    Background.x = width;
    Background.width = width*2;
    Background.height = height;
    scene.addChild(Background);

    var Make_datas = [];

    switch (make_data.タイプ) {
      case "メイン":
        Make_datas[Make_datas.length] = [make_data.入手.replace(/↓/g,"\n"),"入手"];
        Make_datas[Make_datas.length] = [make_data.BGM,"ミュージック"];
        Make_datas[Make_datas.length] = [make_data.表示名,"表示名"];
        Make_datas[Make_datas.length] = [make_data.シーン名,"シーン名"];
        Make_datas[Make_datas.length] = [make_data.背景,"背景"];
        Make_datas[Make_datas.length] = [make_data.左側の人物,"左側"];
        Make_datas[Make_datas.length] = [make_data.左倍率,"左倍率"];
        Make_datas[Make_datas.length] = [make_data.真ん中の人物,"真ん中"];
        Make_datas[Make_datas.length] = [make_data.中倍率,"中倍率"];
        Make_datas[Make_datas.length] = [make_data.右側の人物,"右側"];
        Make_datas[Make_datas.length] = [make_data.右倍率,"右倍率"];
        Make_datas[Make_datas.length] = [make_data.人物名,"人物名"];
        Make_datas[Make_datas.length] = [make_data.文章音,"文章音"];
        Make_datas[Make_datas.length] = [make_data.速度,"速度"];
        Make_datas[Make_datas.length] = [make_data.文章男.replace(/↓/g,"\n"),"文章男"];
        Make_datas[Make_datas.length] = [make_data.文章女.replace(/↓/g,"\n"),"文章女"];
        Make_datas[Make_datas.length] = [make_data.文章未設定.replace(/↓/g,"\n"),"文章未設定"];
        Make_datas[Make_datas.length] = [make_data.前前,"前前"];
        Make_datas[Make_datas.length] = [make_data.前,"前"];
        Make_datas[Make_datas.length] = [make_data.セーブ,"セーブ"];
        Make_datas[Make_datas.length] = [make_data.次,"次"];
        Make_datas[Make_datas.length] = [make_data.次次,"次次"];
        Make_datas[Make_datas.length] = [make_data.表示アイテムx座標,"表示アイテム横座標"];
        Make_datas[Make_datas.length] = [make_data.表示アイテムy座標,"表示アイテム縦座標"];
        Make_datas[Make_datas.length] = [make_data.表示アイテムフェード,"表示アイテムフェード"];
        Make_datas[Make_datas.length] = [make_data.表示アイテム画像,"表示アイテム画像"];
        Make_datas[Make_datas.length] = [make_data.トロフィー,"トロフィー"];
        break;
      case "移行":
        Make_datas[Make_datas.length] = [make_data.入手.replace(/↓/g,"\n"),"入手"];
        Make_datas[Make_datas.length] = [make_data.シーン名,"シーン名"];
        Make_datas[Make_datas.length] = [make_data.移動先,"移動先"];
        Make_datas[Make_datas.length] = [make_data.移動,"移動"];
        Make_datas[Make_datas.length] = [make_data.吹き出し画像,"吹き出し画像"];
        Make_datas[Make_datas.length] = [make_data.再生音声,"再生音声"];
        break;
      case "入手":
        Make_datas[Make_datas.length] = [make_data.入手.replace(/↓/g,"\n"),"入手"];
        Make_datas[Make_datas.length] = [make_data.シーン名,"シーン名"];
        Make_datas[Make_datas.length] = [make_data.画像,"画像"];
        Make_datas[Make_datas.length] = [make_data.文章.replace(/↓/g,"\n"),"文章"];
        Make_datas[Make_datas.length] = [make_data.次のシーン,"次のシーン"];
        break;
      case "調べる":
        Make_datas[Make_datas.length] = [make_data.シーン名,"シーン名"];
        Make_datas[Make_datas.length] = [make_data.背景,"背景"];
        Make_datas[Make_datas.length] = [make_data.可視化,"可視化"];
        Make_datas[Make_datas.length] = [make_data.前のシーン,"前のシーン"];
        Make_datas[Make_datas.length] = [make_data.x座標1,"横座標一"];
        Make_datas[Make_datas.length] = [make_data.y座標1,"縦座標一"];
        Make_datas[Make_datas.length] = [make_data.幅1,"幅一"];
        Make_datas[Make_datas.length] = [make_data.高さ1,"高さ一"];
        Make_datas[Make_datas.length] = [make_data.移動先1,"移動先一"];
        Make_datas[Make_datas.length] = [make_data.x座標2,"横座標二"];
        Make_datas[Make_datas.length] = [make_data.y座標2,"縦座標二"];
        Make_datas[Make_datas.length] = [make_data.幅2,"幅二"];
        Make_datas[Make_datas.length] = [make_data.高さ2,"高さ二"];
        Make_datas[Make_datas.length] = [make_data.移動先2,"移動先二"];
        Make_datas[Make_datas.length] = [make_data.x座標3,"横座標三"];
        Make_datas[Make_datas.length] = [make_data.y座標3,"縦座標三"];
        Make_datas[Make_datas.length] = [make_data.幅3,"幅三"];
        Make_datas[Make_datas.length] = [make_data.高さ3,"高さ三"];
        Make_datas[Make_datas.length] = [make_data.移動先3,"移動先三"];
        Make_datas[Make_datas.length] = [make_data.x座標4,"横座標四"];
        Make_datas[Make_datas.length] = [make_data.y座標4,"縦座標四"];
        Make_datas[Make_datas.length] = [make_data.幅4,"幅四"];
        Make_datas[Make_datas.length] = [make_data.高さ4,"高さ四"];
        Make_datas[Make_datas.length] = [make_data.移動先4,"移動先四"];
        Make_datas[Make_datas.length] = [make_data.x座標5,"横座標五"];
        Make_datas[Make_datas.length] = [make_data.y座標5,"縦座標五"];
        Make_datas[Make_datas.length] = [make_data.幅5,"幅五"];
        Make_datas[Make_datas.length] = [make_data.高さ5,"高さ五"];
        Make_datas[Make_datas.length] = [make_data.移動先5,"移動先五"];
        break;
      case "選択":
        Make_datas[Make_datas.length] = [make_data.入手.replace(/↓/g,"\n"),"入手"];
        Make_datas[Make_datas.length] = [make_data.BGM,"ミュージック"];
        Make_datas[Make_datas.length] = [make_data.表示名,"表示名"];
        Make_datas[Make_datas.length] = [make_data.シーン名,"シーン名"];
        Make_datas[Make_datas.length] = [make_data.背景,"背景"];
        Make_datas[Make_datas.length] = [make_data.左側の人物,"左側の人物"];
        Make_datas[Make_datas.length] = [make_data.左倍率,"左倍率"];
        Make_datas[Make_datas.length] = [make_data.真ん中の人物,"真ん中の人物"];
        Make_datas[Make_datas.length] = [make_data.中倍率,"中倍率"];
        Make_datas[Make_datas.length] = [make_data.右側の人物,"右側の人物"];
        Make_datas[Make_datas.length] = [make_data.右倍率,"右倍率"];
        Make_datas[Make_datas.length] = [make_data.前前,"前前"];
        Make_datas[Make_datas.length] = [make_data.前,"前"];
        Make_datas[Make_datas.length] = [make_data.セーブ,"セーブ"];
        Make_datas[Make_datas.length] = [make_data.選択肢1,"選択肢一"];
        Make_datas[Make_datas.length] = [make_data.選択肢1移動先,"移動先一"];
        Make_datas[Make_datas.length] = [make_data.選択肢2,"選択肢二"];
        Make_datas[Make_datas.length] = [make_data.選択肢2移動先,"移動先二"];
        Make_datas[Make_datas.length] = [make_data.選択肢3,"選択肢三"];
        Make_datas[Make_datas.length] = [make_data.選択肢3移動先,"移動先三"];
        Make_datas[Make_datas.length] = [make_data.選択肢4,"選択肢四"];
        Make_datas[Make_datas.length] = [make_data.選択肢4移動先,"移動先四"];
        Make_datas[Make_datas.length] = [make_data.選択肢5,"選択肢五"];
        Make_datas[Make_datas.length] = [make_data.選択肢5移動先,"移動先五"];
        Make_datas[Make_datas.length] = [make_data.選択肢6,"選択肢六"];
        Make_datas[Make_datas.length] = [make_data.選択肢6移動先,"移動先六"];
        break;
      case "尋問":
        Make_datas[Make_datas.length] = [make_data.BGM,"ミュージック"];
        Make_datas[Make_datas.length] = [make_data.シーン名,"シーン名"];
        Make_datas[Make_datas.length] = [make_data.人物,"証人"];
        Make_datas[Make_datas.length] = [make_data.人物名,"証人名"];
        Make_datas[Make_datas.length] = [make_data.倍率,"倍率"];
        Make_datas[Make_datas.length] = [make_data.証言.replace(/↓/g,"\n"),"証言"];
        Make_datas[Make_datas.length] = [make_data.待った移動場所,"待った"];
        Make_datas[Make_datas.length] = [make_data.前,"前"];
        Make_datas[Make_datas.length] = [make_data.セーブ,"セーブ"];
        Make_datas[Make_datas.length] = [make_data.次,"次"];
        Make_datas[Make_datas.length] = [make_data.正解移動場所,"正解移動場所"];
        Make_datas[Make_datas.length] = [make_data.正解アイテム.replace(/↓/g,"\n"),"正解アイテム"];
        break
      default:
        console.log(make_data);
        break;
    }

    var Numbers = 0;

    var S_Input = [];
    var Sub = [];
    var Subs = [];
    j = 0;

    function S_Inputs(i){
      S_Input[i] = new Entity();
      S_Input[i].moveTo(width/2+width,Numbers);
      S_Input[i].width = width/20*13;
      S_Input[i].height = width/20;
      if(Make_datas[i][1]=="ミュージック"){
        S_Input[i]._element = document.createElement("select");
        var Option = [];
        Option[0] = document.createElement("option");
        Option[0].text = Make_datas[i][0];
        Option[0].value = Make_datas[i][0];
        S_Input[i]._element.appendChild(Option[0]);
        for (var k = 1; k < BGM_DATAS.length+1; k++){
          Option[k] = document.createElement("option");
          Option[k].text = BGM_DATAS[k-1][2];
          Option[k].value = BGM_DATAS[k-1][2];
          if(Option[k].text!=Option[0].text) S_Input[i]._element.appendChild(Option[k]);
        }
        if(Option[0].text!="変化無し"){
          Option[k] = document.createElement("option");
          Option[k].text = "変化無し";
          Option[k].value = "変化無し";
          S_Input[i]._element.appendChild(Option[k]);
          k++;
        }
        if(Option[0].text!=""){
          Option[k] = document.createElement("option");
          Option[k].text = "";
          Option[k].value = "";
          S_Input[i]._element.appendChild(Option[k]);
        }
      }
      else if(Make_datas[i][1]=="文章音"){
        S_Input[i]._element = document.createElement("select");
        var Option = [];
        Option[0] = document.createElement("option");
        Option[0].text = Make_datas[i][0];
        Option[0].value = Make_datas[i][0];
        S_Input[i]._element.appendChild(Option[0]);
        for (var k = 1; k < Sound_effect_DATAS.length+1; k++){
          Option[k] = document.createElement("option");
          Option[k].text = Sound_effect_DATAS[k-1];
          Option[k].value = Sound_effect_DATAS[k-1];
          if(Option[k].text!=Option[0].text) S_Input[i]._element.appendChild(Option[k]);
        }
        if(Option[0].text!="主人公"){
          Option[k] = document.createElement("option");
          Option[k].text = "主人公";
          Option[k].value = "主人公";
          S_Input[i]._element.appendChild(Option[k]);
          k++;
        }
        if(Option[0].text!=""){
          Option[k] = document.createElement("option");
          Option[k].text = "";
          Option[k].value = "";
          S_Input[i]._element.appendChild(Option[k]);
        }
      }
      else if(Make_datas[i][1].substring(Make_datas[i][1].length-2)=="人物"){
        S_Input[i]._element = document.createElement("select");
        var Option = [];
        Option[0] = document.createElement("option");
        Option[0].text = Make_datas[i][0];
        Option[0].value = Make_datas[i][0];
        S_Input[i]._element.appendChild(Option[0]);
        for (var k = 1; k < Image_DATAS.length+1; k++){
          Option[k] = document.createElement("option");
          Option[k].text = Image_DATAS[k-1].名前;
          Option[k].value = Image_DATAS[k-1].名前;
          if(Option[k].text!=Option[0].text&&Image_DATAS[k-1].備考=="正方形") S_Input[i]._element.appendChild(Option[k]);
        }
        if(Option[0].text!="主人公"){
          Option[k] = document.createElement("option");
          Option[k].text = "主人公";
          Option[k].value = "主人公";
          S_Input[i]._element.appendChild(Option[k]);
          k++;
        }
        if(Option[0].text!=""){
          Option[k] = document.createElement("option");
          Option[k].text = "";
          Option[k].value = "";
          S_Input[i]._element.appendChild(Option[k]);
        }
      }
      else if(Make_datas[i][1]=="左側"||Make_datas[i][1]=="真ん中"||Make_datas[i][1]=="右側"){
        S_Input[i].width /= 3;
        S_Input[i]._element = document.createElement("select");
        var Option = [];
        Option[0] = document.createElement("option");
        if(Make_datas[i][0].split("in")[1]) Option[0].text = Make_datas[i][0].split("in")[0];
        else if(Make_datas[i][0].split("out")[1]) Option[0].text = Make_datas[i][0].split("out")[0];
        else Option[0].text = Make_datas[i][0];
        Option[0].value = Option[0].text;
        S_Input[i]._element.appendChild(Option[0]);
        for (var k = 1; k < Image_DATAS.length+1; k++){
          Option[k] = document.createElement("option");
          Option[k].text = Image_DATAS[k-1].名前;
          Option[k].value = Image_DATAS[k-1].名前;
          if(Option[k].text!=Option[0].text&&Image_DATAS[k-1].備考=="正方形") S_Input[i]._element.appendChild(Option[k]);
        }
        if(Option[0].text!="主人公"){
          Option[k] = document.createElement("option");
          Option[k].text = "主人公";
          Option[k].value = "主人公";
          S_Input[i]._element.appendChild(Option[k]);
          k++;
        }
        if(Option[0].text!=""){
          Option[k] = document.createElement("option");
          Option[k].text = "";
          Option[k].value = "";
          S_Input[i]._element.appendChild(Option[k]);
        }
        Sub[j] = new Entity();
        Sub[j].moveTo(width/2+width+width/20*13/3,Numbers);
        Sub[j].width = width/20*13/3;
        Sub[j].height = width/20;
        Sub[j]._element = document.createElement("select");
        if(Make_datas[i][0].split("in")[1]){
          var O  = [];
          var OG3 = [
            "in",
            "out",
            ""
          ];
          for (var k = 0; k < OG3.length; k++){
            O[k] = document.createElement("option");
            O[k].text = OG3[k];
            O[k].value = OG3[k];
            Sub[j]._element.appendChild(O[k]);
          }
        }
        else if(Make_datas[i][0].split("out")[1]){
          var O  = [];
          var OG3 = [
            "out",
            "in",
            ""
          ];
          for (var k = 0; k < OG3.length; k++){
            O[k] = document.createElement("option");
            O[k].text = OG3[k];
            O[k].value = OG3[k];
            Sub[j]._element.appendChild(O[k]);
          }
        }
        else{
          var O  = [];
          var OG3 = [
            "",
            "in",
            "out"
          ];
          for (var k = 0; k < OG3.length; k++){
            O[k] = document.createElement("option");
            O[k].text = OG3[k];
            O[k].value = OG3[k];
            Sub[j]._element.appendChild(O[k]);
          }
        }
        scene.addChild(Sub[j]);
        Subs[j] = new Entity();
        Subs[j].moveTo(width/2+width+width/20*13/3+width/20*13/3,Numbers);
        Subs[j].width = width/20*13/3;
        Subs[j].height = width/20;
        Subs[j]._element = document.createElement("input");
        if(Make_datas[i][0].split("in")[1]) Subs[j]._element.value = Make_datas[i][0].split("in")[1];
        else if(Make_datas[i][0].split("out")[1]) Subs[j]._element.value = Make_datas[i][0].split("out")[1];
        scene.addChild(Subs[j]);
        Make_datas[i][1] += "の人物";
        j++;
      }
      else if(Make_datas[i][1]=="背景"){
        S_Input[i].width /= 3;
        S_Input[i]._element = document.createElement("select");
        var Option = [];
        Option[0] = document.createElement("option");
        Option[0].text = Make_datas[i][0].split("→")[0];
        Option[0].value = Option[0].text;
        S_Input[i]._element.appendChild(Option[0]);
        for (var k = 1; k < Image_DATAS.length+1; k++){
          Option[k] = document.createElement("option");
          Option[k].text = Image_DATAS[k-1].名前;
          Option[k].value = Image_DATAS[k-1].名前;
          if(Option[k].text!=Option[0].text) S_Input[i]._element.appendChild(Option[k]);
        }
        if(Option[0].text!="変化無し"){
          Option[k] = document.createElement("option");
          Option[k].text = "変化無し";
          Option[k].value = "変化無し";
          S_Input[i]._element.appendChild(Option[k]);
          k++;
        }
        if(Option[0].text!=""){
          Option[k] = document.createElement("option");
          Option[k].text = "";
          Option[k].value = "";
          S_Input[i]._element.appendChild(Option[k]);
        }
        Sub[j] = new Entity();
        Sub[j].moveTo(width/2+width+width/20*13/3,Numbers);
        Sub[j].width = width/20*13/3;
        Sub[j].height = width/20;
        Sub[j]._element = document.createElement("select");
        var Option = [];
        Option[0] = document.createElement("option");
        if(Make_datas[i][0].split("→")[1]) Option[0].text = Make_datas[i][0].split("→")[1];
        else Option[0].text = "";
        Option[0].value = Option[0].text;
        Sub[j]._element.appendChild(Option[0]);
        for (var k = 1; k < Image_DATAS.length+1; k++){
          Option[k] = document.createElement("option");
          Option[k].text = Image_DATAS[k-1].名前;
          Option[k].value = Image_DATAS[k-1].名前;
          if(Option[k].text!=Option[0].text) Sub[j]._element.appendChild(Option[k]);
        }
        if(Option[0].text!=""){
          Option[k] = document.createElement("option");
          Option[k].text = "";
          Option[k].value = "";
          Sub[j]._element.appendChild(Option[k]);
        }
        Subs[j] = new Entity();
        Subs[j].moveTo(width/2+width+width/20*13/3+width/20*13/3,Numbers);
        Subs[j].width = width/20*13/3;
        Subs[j].height = width/20;
        Subs[j]._element = document.createElement("select");
        var Option = [];
        Option[0] = document.createElement("option");
        if(Make_datas[i][0].split("→")[2]) Option[0].text = Make_datas[i][0].split("→")[2];
        else Option[0].text = "";
        Option[0].value = Option[0].text;
        Subs[j]._element.appendChild(Option[0]);
        for (var k = 1; k < Image_DATAS.length+1; k++){
          Option[k] = document.createElement("option");
          Option[k].text = Image_DATAS[k-1].名前;
          Option[k].value = Image_DATAS[k-1].名前;
          if(Option[k].text!=Option[0].text) Subs[j]._element.appendChild(Option[k]);
        }
        if(Option[0].text!=""){
          Option[k] = document.createElement("option");
          Option[k].text = "";
          Option[k].value = "";
          Subs[j]._element.appendChild(Option[k]);
        }
        scene.addChild(Sub[j]);
        scene.addChild(Subs[j]);
        j++;
      }
      else if(Make_datas[i][1]=="表示アイテム画像"){
        S_Input[i]._element = document.createElement("select");
        var Option = [];
        Option[0] = document.createElement("option");
        Option[0].text = Make_datas[i][0].split("→")[0];
        Option[0].value = Option[0].text;
        S_Input[i]._element.appendChild(Option[0]);
        for (var k = 1; k < Image_DATAS.length+1; k++){
          Option[k] = document.createElement("option");
          Option[k].text = Image_DATAS[k-1].名前;
          Option[k].value = Image_DATAS[k-1].名前;
          if(Option[k].text!=Option[0].text) S_Input[i]._element.appendChild(Option[k]);
        }
        if(Option[0].text!="デフォルト"){
          Option[k] = document.createElement("option");
          Option[k].text = "デフォルト";
          Option[k].value = "デフォルト";
          S_Input[i]._element.appendChild(Option[k]);
          k++;
        }
        if(Option[0].text!=""){
          Option[k] = document.createElement("option");
          Option[k].text = "";
          Option[k].value = "";
          S_Input[i]._element.appendChild(Option[k]);
        }
      }
      else{
        S_Input[i]._element = document.createElement('textarea');
        S_Input[i]._element.value = Make_datas[i][0];
        S_Input[i]._element.placeholder = Make_datas[i][1]+"を入力";
      }
      Numbers += width/20;
      scene.addChild(S_Input[i]);
    }

    for (var i = 0; i < Make_datas.length; i++) {
      S_Inputs(i);
    }

    var M_Button = new Entity();
    M_Button.moveTo(width/2+width,Numbers);
    M_Button.width = width/20*13;
    M_Button.height = width/20;
    M_Button._element = document.createElement('input');
    M_Button._element.type = "submit";
    M_Button._element.value = "適用";
    scene.addChild(M_Button);
    M_Button.addEventListener('touchstart',function(e){
      if(Button_push("選択音")) return;
      switch (make_data.タイプ) {
        case "メイン":
          for (var i = 0; i < Main_DATAS.length; i++) {
            if(S_Input[3]._element.value==Main_DATAS[i].シーン名) break;
          }
          if(i==Main_DATAS.length) Main_DATAS[i] = document.createElement("void");
          Main_DATAS[i].タイプ = "メイン";
          Main_DATAS[i].入手 = S_Input[0]._element.value;
          Main_DATAS[i].BGM = S_Input[1]._element.value;
          Main_DATAS[i].表示名 = S_Input[2]._element.value;
          Main_DATAS[i].シーン名 = S_Input[3]._element.value;
          Scene_name = Main_DATAS[i].シーン名;
          if(S_Input[4]._element.value=="変化無し") Main_DATAS[i].背景 = S_Input[4]._element.value;
          else Main_DATAS[i].背景 = S_Input[4]._element.value+"→"+Sub[0]._element.value+"→"+Subs[0]._element.value;
          Main_DATAS[i].左側の人物 = S_Input[5]._element.value+Sub[1]._element.value+Subs[1]._element.value;
          Main_DATAS[i].左倍率 = S_Input[6]._element.value;
          Main_DATAS[i].真ん中の人物 = S_Input[7]._element.value+Sub[2]._element.value+Subs[2]._element.value;
          Main_DATAS[i].中倍率 = S_Input[8]._element.value;
          Main_DATAS[i].右側の人物 = S_Input[9]._element.value+Sub[3]._element.value+Subs[3]._element.value;
          Main_DATAS[i].右倍率 = S_Input[10]._element.value;
          Main_DATAS[i].人物名 = S_Input[11]._element.value;
          Main_DATAS[i].文章音 = S_Input[12]._element.value;
          Main_DATAS[i].速度 = S_Input[13]._element.value;
          Main_DATAS[i].文章男 = S_Input[14]._element.value;
          Main_DATAS[i].文章女 = S_Input[15]._element.value;
          Main_DATAS[i].文章未設定 = S_Input[16]._element.value;
          Main_DATAS[i].前前 = S_Input[17]._element.value;
          Main_DATAS[i].前 = S_Input[18]._element.value;
          Main_DATAS[i].セーブ = S_Input[19]._element.value;
          Main_DATAS[i].次 = S_Input[20]._element.value;
          Main_DATAS[i].次次 = S_Input[21]._element.value;
          Main_DATAS[i].表示アイテムx座標 = S_Input[22]._element.value;
          Main_DATAS[i].表示アイテムy座標 = S_Input[23]._element.value;
          Main_DATAS[i].表示アイテムフェード = S_Input[24]._element.value;
          Main_DATAS[i].表示アイテム画像 = S_Input[25]._element.value;
          Main_DATAS[i].トロフィー = S_Input[26]._element.value;
          break;
        case "選択":
          for (var i = 0; i < Choice_DATAS.length; i++) {
            if(S_Input[3]._element.value==Choice_DATAS[i].シーン名) break;
          }
          if(i==Choice_DATAS.length) Choice_DATAS[i] = document.createElement("void");
          Choice_DATAS[i].タイプ = "選択";
          Choice_DATAS[i].入手 = S_Input[0]._element.value;
          Choice_DATAS[i].BGM = S_Input[1]._element.value;
          Choice_DATAS[i].表示名 = S_Input[2]._element.value;
          Choice_DATAS[i].シーン名 = S_Input[3]._element.value;
          Scene_name = Choice_DATAS[i].シーン名;
          if(S_Input[4]._element.value=="変化無し") Choice_DATAS[i].背景 = S_Input[4]._element.value;
          else Choice_DATAS[i].背景 = S_Input[4]._element.value+"→"+Sub[0]._element.value+"→"+Subs[0]._element.value;
          Choice_DATAS[i].左側の人物 = S_Input[5]._element.value;
          Choice_DATAS[i].左倍率 = S_Input[6]._element.value;
          Choice_DATAS[i].真ん中の人物 = S_Input[7]._element.value;
          Choice_DATAS[i].中倍率 = S_Input[8]._element.value;
          Choice_DATAS[i].右側の人物 = S_Input[9]._element.value;
          Choice_DATAS[i].右倍率 = S_Input[10]._element.value;
          Choice_DATAS[i].前前 = S_Input[11]._element.value;
          Choice_DATAS[i].前 = S_Input[12]._element.value;
          Choice_DATAS[i].セーブ = S_Input[13]._element.value;
          Choice_DATAS[i].選択肢1 = S_Input[14]._element.value;
          Choice_DATAS[i].選択肢1移動先 = S_Input[15]._element.value;
          Choice_DATAS[i].選択肢2 = S_Input[16]._element.value;
          Choice_DATAS[i].選択肢2移動先 = S_Input[17]._element.value;
          Choice_DATAS[i].選択肢3 = S_Input[18]._element.value;
          Choice_DATAS[i].選択肢3移動先 = S_Input[19]._element.value;
          Choice_DATAS[i].選択肢4 = S_Input[20]._element.value;
          Choice_DATAS[i].選択肢4移動先 = S_Input[21]._element.value;
          Choice_DATAS[i].選択肢5 = S_Input[22]._element.value;
          Choice_DATAS[i].選択肢5移動先 = S_Input[23]._element.value;
          Choice_DATAS[i].選択肢6 = S_Input[24]._element.value;
          Choice_DATAS[i].選択肢6移動先 = S_Input[25]._element.value;
          break;
        case "入手":
          for (var i = 0; i < Item_get_DATAS.length; i++) {
            if(S_Input[1]._element.value==Item_get_DATAS[i].シーン名) break;
          }
          if(i==Item_get_DATAS.length) Item_get_DATAS[i] = document.createElement("void");
          Item_get_DATAS[i].タイプ = "入手";
          Item_get_DATAS[i].入手 = S_Input[0]._element.value;
          Item_get_DATAS[i].シーン名 = S_Input[1]._element.value;
          Scene_name = Item_get_DATAS[i].シーン名;
          Item_get_DATAS[i].画像 = S_Input[2]._element.value;
          Item_get_DATAS[i].文章 = S_Input[3]._element.value;
          Item_get_DATAS[i].次のシーン = S_Input[4]._element.value;
          break;
        case "調べる":
          for (var i = 0; i < Inspect_DATAS.length; i++) {
            if(S_Input[0]._element.value==Inspect_DATAS[i].シーン名) break;
          }
          if(i==Inspect_DATAS.length) Inspect_DATAS[i] = document.createElement("void");
          Inspect_DATAS[i].タイプ = "調べる";
          Inspect_DATAS[i].シーン名 = S_Input[0]._element.value;
          Scene_name = Inspect_DATAS[i].シーン名;
          Inspect_DATAS[i].背景 = S_Input[1]._element.value;
          if(S_Input[2]._element.value=="しない"||S_Input[2]._element.value=="false") Inspect_DATAS[i].可視化 = false;
          else Inspect_DATAS[i].可視化 = true;
          Inspect_DATAS[i].前のシーン = S_Input[3]._element.value;
          Inspect_DATAS[i].x座標1 = S_Input[4]._element.value;
          Inspect_DATAS[i].y座標1 = S_Input[5]._element.value;
          Inspect_DATAS[i].幅1 = S_Input[6]._element.value;
          Inspect_DATAS[i].高さ1 = S_Input[7]._element.value;
          Inspect_DATAS[i].移動先1 = S_Input[8]._element.value;
          Inspect_DATAS[i].x座標2 = S_Input[9]._element.value;
          Inspect_DATAS[i].y座標2 = S_Input[10]._element.value;
          Inspect_DATAS[i].幅2 = S_Input[11]._element.value;
          Inspect_DATAS[i].高さ2 = S_Input[12]._element.value;
          Inspect_DATAS[i].移動先2 = S_Input[13]._element.value;
          Inspect_DATAS[i].x座標3 = S_Input[14]._element.value;
          Inspect_DATAS[i].y座標3 = S_Input[15]._element.value;
          Inspect_DATAS[i].幅3 = S_Input[16]._element.value;
          Inspect_DATAS[i].高さ3 = S_Input[17]._element.value;
          Inspect_DATAS[i].移動先3 = S_Input[18]._element.value;
          Inspect_DATAS[i].x座標4 = S_Input[19]._element.value;
          Inspect_DATAS[i].y座標4 = S_Input[20]._element.value;
          Inspect_DATAS[i].幅4 = S_Input[21]._element.value;
          Inspect_DATAS[i].高さ4 = S_Input[22]._element.value;
          Inspect_DATAS[i].移動先4 = S_Input[23]._element.value;
          Inspect_DATAS[i].x座標5 = S_Input[24]._element.value;
          Inspect_DATAS[i].y座標5 = S_Input[25]._element.value;
          Inspect_DATAS[i].幅5 = S_Input[26]._element.value;
          Inspect_DATAS[i].高さ5 = S_Input[27]._element.value;
          Inspect_DATAS[i].移動先5 = S_Input[28]._element.value;
          break;
        case "尋問":
          for (var i = 0; i < Interrogation_DATAS.length; i++) {
            if(S_Input[1]._element.value==Interrogation_DATAS[i].シーン名) break;
          }
          if(i==Interrogation_DATAS.length) Interrogation_DATAS[i] = document.createElement("void");
          Interrogation_DATAS[i].タイプ = "尋問";
          Interrogation_DATAS[i].BGM = S_Input[0]._element.value;
          Interrogation_DATAS[i].シーン名 = S_Input[1]._element.value;
          Scene_name = Interrogation_DATAS[i].シーン名;
          Interrogation_DATAS[i].人物 = S_Input[2]._element.value;
          Interrogation_DATAS[i].人物名 = S_Input[3]._element.value;
          Interrogation_DATAS[i].倍率 = S_Input[4]._element.value;
          Interrogation_DATAS[i].証言 = S_Input[5]._element.value;
          Interrogation_DATAS[i].待った移動場所 = S_Input[6]._element.value;
          Interrogation_DATAS[i].前 = S_Input[7]._element.value;
          Interrogation_DATAS[i].セーブ = S_Input[8]._element.value;
          Interrogation_DATAS[i].次 = S_Input[9]._element.value;
          Interrogation_DATAS[i].正解移動場所 = S_Input[10]._element.value;
          Interrogation_DATAS[i].正解アイテム = S_Input[11]._element.value;
          break;
        case "移行":
          for (var i = 0; i < Move_DATAS.length; i++) {
            if(S_Input[1]._element.value==Move_DATAS[i].シーン名) break;
          }
          if(i==Move_DATAS.length) Move_DATAS[i] = document.createElement("void");
          Move_DATAS[i].入手 = S_Input[0]._element.value;
          Move_DATAS[i].シーン名 = S_Input[1]._element.value;
          Scene_name = Move_DATAS[i].シーン名;
          Move_DATAS[i].移動先 = S_Input[2]._element.value;
          Move_DATAS[i].移動 = S_Input[3]._element.value;
          Move_DATAS[i].吹き出し画像 = S_Input[4]._element.value;
          Move_DATAS[i].再生音声 = S_Input[5]._element.value;
          break;
      }
      Scene_loads(Scene_name,false,false);
    });

    var M_Button = new Entity();
    M_Button.moveTo(width,Numbers);
    M_Button.width = width/2;
    M_Button.height = width/20;
    M_Button._element = document.createElement('input');
    M_Button._element.type = "submit";
    M_Button._element.value = "このシーンを保存する";
    scene.addChild(M_Button);
    M_Button.addEventListener('touchstart',function(e){
      if(Button_push("セーブ")) return;
      game.pushScene(LoadingScene("保存"));
      Scene_kazu++;
      console.log("Scene数",Scene_kazu);
      var Save_Scene = "";
      var S_T = "";
      for (var i = 0; i < S_Input.length; i++) {
        S_T = S_Input[i]._element.value;
        if(i==4&&(make_data.タイプ=="メイン"||make_data.タイプ=="選択")){
          S_T += "→"+Sub[0]._element.value+"→"+Subs[0]._element.value;
          if(S_T.substring(S_T.length-1)=="→") S_T = S_T.substring(0,S_T.length-1);
          if(S_T.substring(S_T.length-1)=="→") S_T = S_T.substring(0,S_T.length-1);
        }
        if(make_data.タイプ=="メイン"){
          switch (i) {
            case 5:
              S_T += Sub[1]._element.value+Subs[1]._element.value;
              break;
            case 7:
              S_T += Sub[2]._element.value+Subs[2]._element.value;
              break;
            case 9:
              S_T += Sub[3]._element.value+Subs[3]._element.value;
              break;
          }
        }
        Save_Scene += S_T + ",";
      }
      Save_Scene = Save_Scene.substring(0,Save_Scene.length-1);
      fetch("https://script.google.com/macros/s/AKfycbzbj_KkdrRMa-jmGW3D0lcRiRsu5Uz8wCsAS4LkHo_EHy1hTSA/exec",
        {
          method: 'POST',
          body: "新設定(改行)"+make_data.タイプ+"(改行)"+Play_Sheet+"(改行)"+Save_Scene+"(改行)"+Manager
        }
      )
      .then(res => res.json())
      .then(result => {
        game.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        switch (make_data.タイプ) {
          case "メイン":
          case "選択":
            Scene_name = Save_Scene.split(",")[3];
            break;
          case "調べる":
            Scene_name = Save_Scene.split(",")[0];
            break;
          case "尋問":
          case "入手":
            Scene_name = Save_Scene.split(",")[1];
            break;
        }
        Scene_loads(Scene_name,false,false);
      },);
    });

    var M_Text = [];

    function M_Texts(a,b,i){
      M_Text[i] = new Sprite();
      M_Text[i]._element = document.createElement("innerHTML");
      M_Text[i]._style.font  = width/20+"px monospace";
      M_Text[i]._element.textContent = a;
      M_Text[i].x = width/2+width-width/20*a.length;
      M_Text[i].y = b;
      scene.addChild(M_Text[i]);
      i++;
    }

    for (var i = 0; i < Make_datas.length; i++) {
      M_Texts(Make_datas[i][1],S_Input[i].y,i);
    }
    M_Texts(game.fps+"fps "+Now+"t",0,i);
    M_Text[i].x = 0;
    M_Text[i]._style.font  = width/10+"px monospace";
    M_Text[i]._style.color  = "red";
    M_Text[i].backgroundColor  = "white";
    M_Text[i].addEventListener("enterframe",function(){
      M_Text[i]._element.textContent = game.fps+"fps "+Now+"t";
      return;
    });

    return;
  }
  var Save_ChoiceScene = function(Load){
    var scene = new Scene();                                // 新しいシーンを作る

    var Background = new Entity();
    Background._element = document.createElement("img");
    Background._element.src = "../画像/メニュー背景.png";
    Background.width = width;
    Background.height = height;
    scene.addChild(Background);

    var Button = [];
    var submits = 0;
    var Numbers = (width/10)+(width/30);
    function Submit(a){
      Button[submits] = new Entity();
      Button[submits].moveTo(width/2-width/1.2/2,Numbers);
      Button[submits].width = width/1.2;
      Button[submits].height = width/10;
      Button[submits]._element = document.createElement('input');
      Button[submits]._element.type = "submit";
      Button[submits]._element.value = a;
      Button[submits].ナンバー = submits;
      scene.addChild(Button[submits]);
      Button[submits].addEventListener('touchstart',function(e){
        switch (a) {
          case "戻る":
            if(Button_push_title(Title_sound3)) return;
            break;
          default:
            if((Load=="読み込み"||Load=="削除")&&a=="データ無し"){
              if(Button_push_title(Title_sound4)) return;
              return;
            }
            if(Load=="削除"){
              if(Button_push_title(Title_sound5)) return;
            }
            else{
              if(Button_push_title(Title_sound2)) return;
            }
            break;
        }
        switch(a){
          case "戻る":
            game.popScene();
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
            break;
          default:
            if(Load=="削除"){
              game.pushScene(ClearScene(this.ナンバー));
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              return;
            }
            for (var i = 0; i < Button.length; i++) {
              if(Button[i]!=this){
                scene.removeChild(Button[i]);
              }
            }
            Save_Data_Number = this.ナンバー;
            console.log("セーブデータ",Save_Data_Number);
            Showing_name = Title_DATAS[Save_Data_Number-1].セーブデータ;
            if(Showing_name=="データ無し"){
              Flag = [];//フラグ
              Log_Flag = [];//記録
              Item_Flag = [];//所持アイテム
              Trophy_Flag = [];//トロフィー
              Character_Flag = [];//人物
              Favorability_Flag = [];//好感度
              Setting_Flag = ["名前","苗字","未設定",game.fps,"最初から",0,0,0,true,5,5,5,"最初から","Black","","デフォルト","一人称","二人称",false,"自由1→自由2"];
              game.popScene();
              Scene_kazu--;
              console.log("Scene数",Scene_kazu);
              game.replaceScene(Title_ChoiceScene(Load));
              return;
            }
            else{
            game.pushScene(LoadingScene());
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            fetch("https://script.google.com/macros/s/AKfycbzbj_KkdrRMa-jmGW3D0lcRiRsu5Uz8wCsAS4LkHo_EHy1hTSA/exec",
              {
                method: 'POST',
                body: "セーブデータロード"+this.ナンバー+Title_Sheet
              }
            )
            .then(res => res.json())
            .then(result => {
                Showing_name = Showing_name.substring(0,Showing_name.indexOf(" "+result[1].設定));
                Load_Datas(result);
                game.popScene();
                game.popScene();
                Scene_kazu--;
                Scene_kazu--;
                console.log("Scene数",Scene_kazu);
                if(Load=="読み込み") Scene_loads("セーブ読み込み完了");
                else{
                  Flag = [];//フラグ
                  Item_Flag = [];//所持アイテム
                  Character_Flag = [];//人物
                  Favorability_Flag = [];//好感度
                  game.replaceScene(Title_ChoiceScene(Load));
                }
                return;
              },);
            }
            return;
            break;
        }
      });
      submits++;
      Numbers += (width/20)+(width/25)+(width/25);
    }

    Submit("戻る");
    Numbers += (width/20)+(width/25)+(width/25);
    for (var i = 0; i < 7; i++) {
      Submit(Title_DATAS[i].セーブデータ);
    }

    return scene;
  };
  var ClearScene = function(Number){
    var scene = new Scene();

    var Background = new Entity();
    Background._element = document.createElement("img");
    Background._element.src = "../画像/メニュー背景.png";
    Background.width = width;
    Background.height = height;
    scene.addChild(Background);

    var Button = [];
    var submits = 0;
    var Numbers = (width/10)+(width/30);
    function Submit(a){
      Button[submits] = new Entity();
      Button[submits].moveTo(width/2-width/1.2/2,Numbers);
      Button[submits].width = width/1.2;
      Button[submits].height = width/10;
      Button[submits]._element = document.createElement('input');
      Button[submits]._element.type = "submit";
      Button[submits]._element.value = a;
      Button[submits].ナンバー = submits;
      scene.addChild(Button[submits]);
      Button[submits].addEventListener('touchstart',function(e){
        switch (a) {
          case "戻る":
            if(Button_push_title(Title_sound3)) return;
            break;
          case "削除する":
            if(Button_push_title(Title_sound6)) return;
            Button[1]._element.value = "データ無し";
            Title_DATAS[Number-1].セーブデータ = "データ無し";
            fetch("https://script.google.com/macros/s/AKfycbzbj_KkdrRMa-jmGW3D0lcRiRsu5Uz8wCsAS4LkHo_EHy1hTSA/exec",
              {
                method: 'POST',
                body: "データ消去"+Number+Title_Sheet
              }
            )
            return;
            break;
          default:
            return;
            break;
        }
        switch(a){
          case "戻る":
            game.popScene();
            game.popScene();
            Scene_kazu--;
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
            break;
          default:
            return;
            break;
        }
      });
      submits++;
      Numbers += (width/20)+(width/25)+(width/25);
    }

    Submit("削除する");
    Submit(Title_DATAS[Number-1].セーブデータ);
    Numbers += (width/20)+(width/25)+(width/25);
    Numbers += (width/20)+(width/25)+(width/25);
    Numbers += (width/20)+(width/25)+(width/25);
    Numbers += (width/20)+(width/25)+(width/25);
    Submit("戻る");

    return scene;
  }
  var CopyScene = function(Number){
    var scene = new Scene();

    var Background = new Entity();
    Background._element = document.createElement("img");
    Background._element.src = "../画像/メニュー背景.png";
    Background.width = width;
    Background.height = height;
    scene.addChild(Background);

    var Button = [];
    var submits = 0;
    var Numbers = (width/10)+(width/30);
    function Submit(a){
      Button[submits] = new Entity();
      Button[submits].moveTo(width/2-width/1.2/2,Numbers);
      Button[submits].width = width/1.2;
      Button[submits].height = width/10;
      Button[submits]._element = document.createElement('input');
      Button[submits]._element.type = "submit";
      Button[submits]._element.value = a;
      Button[submits].ナンバー = submits;
      scene.addChild(Button[submits]);
      Button[submits].addEventListener('touchstart',function(e){
        switch (a) {
          case "戻る":
            if(Button_push_title(Title_sound3)) return;
            break;
          case "コピーする":
            if(Button_push_title(Title_sound6)) return;
            Button[1]._element.value = "データ無し";
            Title_DATAS[Number-1].セーブデータ = "データ無し";
            fetch("https://script.google.com/macros/s/AKfycbzbj_KkdrRMa-jmGW3D0lcRiRsu5Uz8wCsAS4LkHo_EHy1hTSA/exec",
              {
                method: 'POST',
                body: "データコピー"+Number+Title_Sheet
              }
            )
            return;
            break;
          default:
            return;
            break;
        }
        switch(a){
          case "戻る":
            game.popScene();
            game.popScene();
            Scene_kazu--;
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
            break;
          default:
            return;
            break;
        }
      });
      submits++;
      Numbers += (width/20)+(width/25)+(width/25);
    }

    Submit("削除する");
    Submit(Title_DATAS[Number-1].セーブデータ);
    Numbers += (width/20)+(width/25)+(width/25);
    Numbers += (width/20)+(width/25)+(width/25);
    Numbers += (width/20)+(width/25)+(width/25);
    Numbers += (width/20)+(width/25)+(width/25);
    Submit("戻る");

    return scene;
  }
  var Title_ChoiceScene = function(test){
    var scene = new Scene();                                // 新しいシーンを作る

    var Background = new Sprite();
    Background._element = document.createElement("img");
    Background._element.src = Title_DATAS[1].画像URL;
    Background.width = width;
    Background.height = width/16*9;
    scene.addChild(Background);

    var White_Background = new Sprite();
    White_Background._element = document.createElement("img");
    White_Background._element.src = W_S();
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
      scene.addChild(Text[submits]);
      Text[submits].addEventListener('touchstart',function(e){
        if(b=="戻る"){
          if(Button_push_title(Title_sound3)) return;
          game.replaceScene(TitleScene());
        }
        else{
          if(Button_push_title(Title_sound2)) return;
          for (var i = 0; i < Text.length; i++) {
            if(Text[i]!=this){
              scene.removeChild(Text[i]);
            }
          }
          Datas_load(b,"シーンデータ読み込み",test);
        }
        return;
      });
      submits++;
      Numbers += (width/20)+(width/25)+(width/25);
    }

    var Text = [];

    if(Title_DATAS[2].第一選択肢==false||have(Title_DATAS[2].第一選択肢)||test){
      if(Title_DATAS[0].第一選択肢) Submit(Title_DATAS[0].第一選択肢,Title_DATAS[1].第一選択肢);
    }
    if(Title_DATAS[2].第二選択肢==false||have(Title_DATAS[2].第二選択肢)||test){
      if(Title_DATAS[0].第二選択肢) Submit(Title_DATAS[0].第二選択肢,Title_DATAS[1].第二選択肢);
    }
    if(Title_DATAS[2].第三選択肢==false||have(Title_DATAS[2].第三選択肢)||test){
      if(Title_DATAS[0].第三選択肢)　Submit(Title_DATAS[0].第三選択肢,Title_DATAS[1].第三選択肢);
    }
    if(Title_DATAS[2].第四選択肢==false||have(Title_DATAS[2].第四選択肢)||test){
      if(Title_DATAS[0].第四選択肢)　Submit(Title_DATAS[0].第四選択肢,Title_DATAS[1].第四選択肢);
    }
    if(Title_DATAS[2].第五選択肢==false||have(Title_DATAS[2].第五選択肢)||test){
      if(Title_DATAS[0].第五選択肢)　Submit(Title_DATAS[0].第五選択肢,Title_DATAS[1].第五選択肢);
    }
    if(Title_DATAS[2].第六選択肢==false||have(Title_DATAS[2].第六選択肢)||test){
      if(Title_DATAS[0].第六選択肢)　Submit(Title_DATAS[0].第六選択肢,Title_DATAS[1].第六選択肢);
    }
    Submit("戻る","戻る");

    return scene;
  };
  var LoadingScene = function(a){
    var scene = new Scene();

    var Background = new Entity();
    Background._element = document.createElement("img");
    Background._element.src = "../画像/半透明(黒).png";
    Background.width = width;
    Background.height = height;

    if(a=="保存"){
      Background.width *= 2.5;
      var Loading = new Entity();
      Loading._element = document.createElement("img");
      Loading._element.src = "../画像/保存中.gif";
      Loading.x = width/2;
      Loading.y = height/2-width/20;
      Loading.width = width;
      Loading.height = width/5;
    }
    else{
      var Loading = new Entity();
      Loading._element = document.createElement("img");
      Loading._element.src = "../画像/読み込み中.gif";
      Loading.x = width/2-width/4;
      Loading.y = height/2-width/20;
      Loading.width = width/2;
      Loading.height = width/10;
    }

    scene.addChild(Background);
    scene.addChild(Loading);

    return scene;
  }
  var PublicScene = function(a){
    var scene = new Scene();

    if(a){
      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "../画像/メニュー背景.png";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      var Background2 = new Entity();
      Background2._element = document.createElement("img");
      Background2._element.src = "../画像/半透明(黒).png";
      Background2.width = width;
      Background2.height = height;
      scene.addChild(Background2);

      var Loading = new Entity();
      Loading._element = document.createElement("img");
      Loading._element.src = "../画像/読み込み中.gif";
      Loading.x = width/2-width/4;
      Loading.y = height/2-width/20;
      Loading.width = width/2;
      Loading.height = width/10;
      scene.addChild(Loading);

      Datas_load(a,"タイトルデータ読み込み");
    }
    else{
      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "../画像/メニュー背景.png";
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
        if(a=="入力したらこのボタンを押してね。"){
          Button[submits]._element.type = "submit";
        }
        else {
          if(Title_Sheet!=null){
            Button[submits]._element.value = Title_Sheet;
          }
        }
        scene.addChild(Button[submits]);
        if(a=="入力したらこのボタンを押してね。"){
          Button[0].addEventListener('touchstart',function(e){
            Datas_load(Button[1]._element.value,"タイトルデータ読み込み");
            return;
          });
        }
        submits++;
        Numbers += (width/20)+(width/25)+(width/25);
      }
      Submit("入力したらこのボタンを押してね。");
      Numbers += (width/20)+(width/25)+(width/25);
      Submit("ここにスプレッドシートのIDかURLを入力してね。");
      if(Manager){
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
          Datas_load("11xs4F0yXoqSGHuFGbhGjhefB_abcAqfkdtkWhBRHo4k","タイトルデータ読み込み");
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
          Datas_load("12-ESzeqaV3uEtLDAoCIDPVU18MahgfcB3IOInm0scj8","タイトルデータ読み込み");
          return;
        });
      }
    }

    return scene;
  }
  var TitleScene = function(){

    var scene = new Scene();                                // 新しいシーンを作る

    var Title = new Entity();
    Title._element = document.createElement("img");
    Title._element.src = Title_DATAS[0].画像URL;
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
        switch (a) {
          case "データ消去":
            var ooo = Title_sound5;
            break;
          case "説明":
            var ooo = Title_sound2;
            break;
          default:
            var ooo = Title_sound1;
            break;
        }
        if(Button_push_title(ooo)) return;
        switch (a) {
          case "最初から":
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            game.pushScene(Save_ChoiceScene(false));
            break;
          case "続きから":
            Scene_loads("セーブ読み込み",false,false,false,false,false);
            break;
          case "説明":
            for (var i = 0; i < Button.length; i++) {
              if(Button[i]!=this){
                scene.removeChild(Button[i]);
              }
            }
            Datas_load(Title_DATAS[0].説明,"シーンデータ読み込み");
            break;
          case "テスト用":
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            game.pushScene(Save_ChoiceScene(true));
            break;
          case "データ消去":
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            game.pushScene(Save_ChoiceScene("削除"));
            break;
        }
      });
      submits++;
    }

    Submit("最初から");
    Submit("続きから");
    if(Title_DATAS[0].説明) Submit("説明");
    Submit("データ消去");
    if(Manager) Submit("テスト用");
    /*
    var Set_button = new Entity();
    Set_button._element = document.createElement("img");
    Set_button._element.src = "../画像/リバーシ.gif";
    Set_button.x = 105;
    Set_button.y = 455;
    Set_button.width = 195;
    Set_button.height = 95;
    Set_button.frame = 15;
    scene.addChild(Set_button);

    Set_button.addEventListener('touchstart',function(e){
      console.log(Set_button);
      return;
      game.pushScene(ReversiScene());
      Scene_kazu++;
      console.log("Scene数",Scene_kazu);
    });
    */
    return scene;
  };
  var MainScene = function(Return,Number,Inspect,can){
    var scene = new Scene();                                // 新しいシーンを作る

    if(Setting_Flag[18]&&have(Play_Sheet+Datas[12]+"プレイ済み")) Return = true;
    if(Setting_Flag[18]) Return = true;

    if(Datas[8].substring(0,1)=="Θ"){
      Datas[8] = Datas[8].substring(1);
      var Play = false;
      Return = false;
    }
    else var Play = true;
    var Sound_effect = Datas[8].match(/\(♪[^♪]+♪\)/g);
    Datas[8] = Datas[8].replace(/\(♪[^♪]+♪\)/g,"§");
    var Pose_change = Datas[8].match(/\([㊧㊥㊨][^㊧㊥㊨]+[㊧㊥㊨]\)/g);
    Datas[8] = Datas[8].replace(/\([㊧㊥㊨][^㊧㊥㊨]+[㊧㊥㊨]\)/g,"Ψ");
    var Speech_bubble = Datas[8].match(/\(↑[^↑]+↑\)/g);
    Datas[8] = Datas[8].replace(/\(↑[^↑]+↑\)/g,"↑");
    var Text_sound = Datas[8].match(/\(¶[^¶]+¶\)/g);
    Datas[8] = Datas[8].replace(/\(¶[^¶]+¶\)/g,"¶");

    if(Datas[11]){
      if(Datas[11]=="無し"){
        Datas[11] = Number;
      }
      else{
        Setting_Flag[4] = Datas[11];
        if(Setting_Flag[8]) Save(Datas[11]);
      }
    }

    if(have(Play_Sheet+Datas[13]+"プレイ済み")==false){
      var Skip = null;
      if(have(Play_Sheet+Datas[12]+"プレイ済み")==false){
        Log_Flag[Log_Flag.length] = Play_Sheet+Datas[13]+"→"+Datas[11];
      }
      for (var i = 0; i < Log_Flag.length; i++) {
        if(Log_Flag[i].split("→")[0]==Play_Sheet+Datas[13]) Skip = Log_Flag[i].split("→")[1];
      }
    }

    var Background = new Sprite();
    Background._element = document.createElement("img");
    if(Datas[0].split("→")[0]) Background._element.src = conversion_url(Datas[0].split("→")[0],"画像");
    else Background._element.src = "../画像/黒.png";
    Background.width = width;
    Background.height = width/16*9;
    scene.addChild(Background);

    var Explosion = new Sprite();
    Explosion._element = document.createElement("img");
    Explosion._element.src = "../画像/透明.png";
    Explosion.width = width/16*9;
    Explosion.height = width/16*9;
    scene.addChild(Explosion);

    if(Datas[3]!=false){
      var Character2 = new Sprite();
      Character2._element = document.createElement("img");
      Character2._element.src = conversion_url(Datas[3],"画像");
      Character2._element.title = Datas[3];
      console.log("真ん中のキャラを"+Datas[3]+"に設定");
      Character2.width = width/16*9;
      Character2.height = width/16*9;
      if(Datas[23].split("→")[0]>0){
        Character2.width*=Datas[23].split("→")[0];
        Character2.height*=Datas[23].split("→")[0];
      }
      else{
        Character2.width*=-Datas[23].split("→")[0];
        Character2.height*=-Datas[23].split("→")[0];
        Character2.scaleX = -1;
      }
      Character2.x = (width-Character2.width)/2;
      if(Datas[23].split("→")[1]) Character2.y =  Datas[23].split("→")[1]*(width/16/100);
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

    if(conversion_url(Datas[0].split("→")[1],"画像")!="../画像/画像無し.gif"){
      var Background2 = new Sprite();
      Background2._element = document.createElement("img");
      Background2._element.src = conversion_url(Datas[0].split("→")[1],"画像");
      Background2.width = width;
      Background2.height = width/16*9;
      scene.addChild(Background2);
    }

    if(Datas[1]!=false){
      var Character1 = new Sprite();
      Character1._element = document.createElement("img");
      Character1._element.src = conversion_url(Datas[1],"画像");
      Character1._element.title = Datas[1];
      console.log("左のキャラを"+Datas[1]+"に設定");
      Character1.width = width/16*9;
      Character1.height = width/16*9;
      if(Datas[22].split("→")[0]>0){
        Character1.width*=Datas[22].split("→")[0];
        Character1.height*=Datas[22].split("→")[0];
      }
      else{
        Character1.width*=-Datas[22].split("→")[0];
        Character1.height*=-Datas[22].split("→")[0];
        Character1.scaleX = -1;
      }
      Character1.x = (width-Character1.width)/2-width/4;
      if(Datas[22].split("→")[1]) Character1.y =  Datas[22].split("→")[1]*(width/16/100);
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
      Character3._element.title = Datas[5];
      console.log("右のキャラを"+Datas[5]+"に設定");
      Character3.width = width/16*9;
      Character3.height = width/16*9;
      if(Datas[24].split("→")[0]>0){
        Character3.width*=Datas[24].split("→")[0];
        Character3.height*=Datas[24].split("→")[0];
      }
      else{
        Character3.width*=-Datas[24].split("→")[0];
        Character3.height*=-Datas[24].split("→")[0];
        Character3.scaleX = -1;
      }
      Character3.x = (width-Character3.width)/2+width/4;
      if(Datas[24].split("→")[1]) Character3.y =  Datas[24].split("→")[1]*(width/16/100);
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

    if(conversion_url(Datas[0].split("→")[2],"画像")!="../画像/画像無し.gif"){
      var Background3 = new Sprite();
      Background3._element = document.createElement("img");
      Background3._element.src = conversion_url(Datas[0].split("→")[2],"画像");
      Background3.width = width;
      Background3.height = width/16*9;
      scene.addChild(Background3);
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

    var Speech_bubble_image = new Sprite();
    Speech_bubble_image._element = document.createElement("img");
    Speech_bubble_image._element.src = "../画像/透明.png";
    Speech_bubble_image.width = width;
    Speech_bubble_image.height = width/16*9;
    scene.addChild(Speech_bubble_image);

    var White_Background = new Sprite();
    White_Background._element = document.createElement("img");
    White_Background._element.src = W_S();
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

    if(Number=="テスト"){

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

    var Numbers = width/16*9+width/20+width/25;

    function Texts(){
      Numbers += width/20+width/25;
      Text[i] = new Sprite();
      Text[i]._element = document.createElement("innerHTML");
      Text[i]._style.font  = width/20+"px monospace";
      Text[i]._element.textContent = "";
      if(Datas[8].substring(0,1)=="("||Datas[8].substring(0,1)=="「"){
        Text[i].x = width/20;
        Text[i].width = width-width/10;
      }
      else Text[i].width = width;
      Text[i].y = Numbers;
      if(Datas[19]=="日付") Text[i]._style.color = "green";
      scene.addChild(Text[i]);
    }//会話文

    var Time = 0;
    var k = 0;
    var Text_defined = true;
    var Speak_Character = Datas[7].replace(/[^㊧㊥㊨]/g,"");
    if(Datas[18]){
      if(Datas[1].substring(Datas[1].length-3,Datas[1].length)=="主人公") Speak_Character = "㊧";
      if(Datas[3].substring(Datas[3].length-3,Datas[3].length)=="主人公") Speak_Character = "㊥";
      if(Datas[5].substring(Datas[5].length-3,Datas[5].length)=="主人公") Speak_Character = "㊨";
    }

    var Speak_Background1 = new Sprite();
    Speak_Background1._element = document.createElement("img");
    Speak_Background1._element.src = "../画像/吹き出し枠.png";
    Speak_Background1.width = width;
    Speak_Background1.height = height;
    if(Datas[8].substring(0,1)=="("||Datas[8].substring(0,1)=="「"){
      scene.addChild(Speak_Background1);
    }

    var Speak_Background2 = new Sprite();
    Speak_Background2._element = document.createElement("img");
    Speak_Background2._element.src = "../画像/透明.png";
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
    var pcpc = 0;
    var ksks = 0;
    var vcvc = 0;

    var Text =[];

    for (var i = 0; i < 6; i++) {
      Texts();
    }

    function gamenyurasi(){
      if(Datas[1]){
        Character1.x += width/200;
        Character1.y += width/200;
      }
      if(Datas[3]){
        Character2.x += width/200;
        Character2.y += width/200;
      }
      if(Datas[5]){
        Character3.x += width/200;
        Character3.y += width/200;
      }
      Background.x += width/200;
      Background.y += width/200;
      return;
    }

    function T_D(){
      var Itimozi = Datas[8].substring(Time,Time+1);
      scene.addChild(Speak_Background2);
      switch (Itimozi) {
        case "Σ":
          Time++;
          gamenyurasi();
          T_D();
          return;
          break;
        case "¶":
          Time++;
          if(Return==false){
            var Sound = Text_sound[vcvc].substring(2,Text_sound[vcvc].length-2);
            if(Sound=="無し") Datas[19] = "";
            else if(Sound=="主人公"){
              if(Setting_Flag[2]=="男"){
                var S_Sound = "男主人公ポポポ";
              }
              else if(Setting_Flag[2]=="女"){
                var S_Sound = "女主人公ポポポ";
              }
              else{
                var S_Sound = "未設定主人公ポポポ";
              }
              Datas[19] = S_Sound;
            }
            else Datas[19] = Sound;
            vcvc++;
          }
          T_D();
          return;
          break;
        case "↑":
          Time++;
          var Image = Speech_bubble[ksks].substring(2,Speech_bubble[ksks].length-2);
          if(Image.split("→")[1]) Speech_bubble_image.x += Image.split("→")[1]*1;
          if(Image.split("→")[2]) Speech_bubble_image.y += Image.split("→")[2]*1;
          if(Image.split("→")[0]=="消滅") Speech_bubble_image._element.src = "../画像/透明.png";
          else Speech_bubble_image._element.src = conversion_url(Image.split("→")[0],"画像");
          ksks++;
          T_D();
          return;
          break;
        case "§":
          Time++;
          if(Return==false){
            var Sound = Sound_effect[sese].substring(2,Sound_effect[sese].length-2);
            if(Sound.substring(0,3)=="主人公") Sound = Setting_Flag[2]+Sound;
            Sound_ON(Sound);
            sese++;
          }
          T_D();
          return;
          break;
        case "Ψ":
          Time++;
          var Pose = Pose_change[pcpc].substring(2,Pose_change[pcpc].length-2);
          if(Pose.substring(0,3)=="主人公") Pose = Setting_Flag[2]+Pose;
          switch(Pose_change[pcpc].substring(1,2)){
            case "㊧":
              if(Character1._element.title != Pose){
                Datas[1] = Pose;
                Character1._element.title = Datas[1];
                Character1._element.src = conversion_url(Datas[1],"画像");
                console.log("左のキャラを"+Datas[1]+"に変更");
              }
              break;
            case "㊥":
              if(Character2._element.title != Pose){
                Datas[3] = Pose;
                Character2._element.title = Datas[3];
                Character2._element.src = conversion_url(Datas[3],"画像");
                console.log("真ん中のキャラを"+Datas[3]+"に変更");
              }
              break;
            case "㊨":
              if(Character3._element.title != Pose){
                Datas[5] = Pose;
                Character3._element.title = Datas[5];
                Character3._element.src = conversion_url(Datas[5],"画像");
                console.log("右のキャラを"+Datas[5]+"に変更");
              }
              break;
            default:
              console.log(Pose+"が選択されましたがスピークキャラがいません。");
              break;
          }
          pcpc++;
          T_D();
          return;
          break;
        case "→":
          Time++;
          if(Datas[1]){
            if(Character1._element.title != Datas[1]){
              Character1._element.title = Datas[1];
              Character1._element.src = conversion_url(Datas[1],"画像");
              console.log("左のキャラを"+Datas[1]+"に変更");
            }
          }
          if(Datas[3]){
            if(Character2._element.title != Datas[3]){
              Character2._element.title = Datas[3];
              Character2._element.src = conversion_url(Datas[3],"画像");
              console.log("真ん中のキャラを"+Datas[3]+"に変更");
            }
          }
          if(Datas[5]){
            if(Character3._element.title != Datas[5]){
              Character3._element.title = Datas[5];
              Character3._element.src = conversion_url(Datas[5],"画像");
              console.log("右のキャラを"+Datas[5]+"に変更");
            }
          }
          Speak_Background2._element.src = "../画像/透明.png";
          return;
          break;
        case "↦":
          Time++;
          if(Return==false) game.fps = game.fps*1+10;
          Setting_Flag[3] = game.fps;
          console.log(game.fps);
          T_D();
          return;
          break;
        case "↤":
          Time++;
          game.fps = 10;
          Setting_Flag[3] = game.fps;
          T_D();
          return;
          break;
        case "☞":
          Time++;
          if(Return==false) Scene_loads(Datas[12],false,false);
          return;
          break;
        case "㊨":
          Time++;
          if(Return==false){
            Explosion.x = width/2-width/32;
            Explosion._element.src = "../画像/爆発.gif";
            Sound_ON("爆発");
          }
          T_D();
          return;
          break;
        case "㊥":
          Time++;
          if(Return==false){
            Explosion.x = width/4-width/32;
            Explosion._element.src = "../画像/爆発.gif";
            Sound_ON("爆発");
          }
          T_D();
          return;
          break;
        case "㊧":
          Time++;
          if(Return==false){
            Explosion.x = -width/32;
            Explosion._element.src = "../画像/爆発.gif";
            Sound_ON("爆発");
          }
          T_D();
          return;
          break;
        case "":
        case "\n":
        case "…":
        case "‥":
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
        case "。":
          if(Datas[1]){
            if(Character1._element.title != Datas[1]){
              Character1._element.title = Datas[1];
              Character1._element.src = conversion_url(Datas[1],"画像");
              console.log("左のキャラを"+Datas[1]+"に変更");
            }
          }
          if(Datas[3]){
            if(Character2._element.title != Datas[3]){
              Character2._element.title = Datas[3];
              Character2._element.src = conversion_url(Datas[3],"画像");
              console.log("真ん中のキャラを"+Datas[3]+"に変更");
            }
          }
          if(Datas[5]){
            if(Character3._element.title != Datas[5]){
              Character3._element.title = Datas[5];
              Character3._element.src = conversion_url(Datas[5],"画像");
              console.log("右のキャラを"+Datas[5]+"に変更");
            }
          }
          Speak_Background2._element.src = "../画像/透明.png";
          break;
        default:
          if(Text[k]._element.textContent.substring(0,1)=="「"||Text[k]._element.textContent.substring(0,1)=="　"){
            switch(Speak_Character){
              case "㊧":
                if(Datas[1]){
                  if(Character1._element.title != Datas[1]+"口パク"){
                    if(conversion_url(Datas[1]+"口パク","画像")!="../画像/画像無し.gif"){
                      Character1._element.src = conversion_url(Datas[1]+"口パク","画像");
                      Character1._element.title = Datas[1]+"口パク";
                      console.log("左のキャラを"+Datas[1]+"口パクに変更");
                    }
                  }
                }
                break;
              case "㊥":
                if(Datas[3]){
                  if(Character2._element.title != Datas[3]+"口パク"){
                    if(conversion_url(Datas[3]+"口パク","画像")!="../画像/画像無し.gif"){
                      Character2._element.src = conversion_url(Datas[3]+"口パク","画像");
                      Character2._element.title = Datas[3]+"口パク";
                      console.log("真ん中のキャラを"+Datas[3]+"口パクに変更");
                    }
                  }
                }
                break;
              case "㊨":
                if(Datas[5]){
                  if(Character3._element.title != Datas[5]+"口パク"){
                    if(conversion_url(Datas[5]+"口パク","画像")!="../画像/画像無し.gif"){
                      Character3._element.src = conversion_url(Datas[5]+"口パク","画像");
                      Character3._element.title = Datas[5]+"口パク";
                      console.log("右のキャラを"+Datas[5]+"口パクに変更");
                    }
                  }
                }
                break;
              default:
                break;
            }
            if(Speak_Character=="無し") Speak_Background2._element.src = "../画像/透明.png";
            else Speak_Background2._element.src = "../画像/吹き出し1.png";
          }
          else if(Text[k]._element.textContent.substring(0,1)=="("||Text[k]._element.textContent.substring(0,1)==" "){
            if(Speak_Character=="無し") Speak_Background2._element.src = "../画像/透明.png";
            else Speak_Background2._element.src = "../画像/吹き出し2.png";
          }
          break;
      }
      Time++;
      if(Datas[8].substring(Time-1,Time)=="\n"){
        k++;
        if(Text[k-1]._element.textContent.substring(0,1)=="("||Text[k-1]._element.textContent.substring(0,1)==" "){
          if(Text[k-1]._element.textContent.substring(Text[k-1]._element.textContent.length-1)==")") Text[k]._element.textContent = "";
          else{
            Text[k]._element.textContent = " ";
            Text[k]._style.color = "blue";
            if(Speak_Character=="無し") Speak_Background2._element.src = "../画像/透明.png";
            else Speak_Background2._element.src = "../画像/吹き出し2.png";
          }
        }
        else{
          if(Text[k-1]._element.textContent.substring(Text[k-1]._element.textContent.length-1)=="」") Text[k]._element.textContent = "";
          else if(Text[k-1]._element.textContent.substring(0,1)=="「"||Text[k-1]._element.textContent.substring(0,1)=="　"){
            Text[k]._element.textContent = "　";
            Text[k]._style.color = "Black";
            Speak_Background2._element.src = "../画像/吹き出し1.png";
            if(Speak_Character=="無し") Speak_Background2._element.src = "../画像/透明.png";
            else Speak_Background2._element.src = "../画像/吹き出し1.png";
          }
        }
        T_D();
        return;
      }
      else if(Datas[8].substring(Time-1,Time)==""){
        Text_defined = false;
        game.fps = 10;
        Setting_Flag[3] = game.fps;
        if(Datas[1]){
          if(Character1._element.title != Datas[1]){
            Character1._element.title = Datas[1];
            Character1._element.src = conversion_url(Datas[1],"画像");
            console.log("左のキャラを"+Datas[1]+"に変更");
          }
        }
        if(Datas[3]){
          if(Character2._element.title != Datas[3]){
            Character2._element.title = Datas[3];
            Character2._element.src = conversion_url(Datas[3],"画像");
            console.log("真ん中のキャラを"+Datas[3]+"に変更");
          }
        }
        if(Datas[5]){
          if(Character3._element.title != Datas[5]){
            Character3._element.title = Datas[5];
            Character3._element.src = conversion_url(Datas[5],"画像");
            console.log("右のキャラを"+Datas[5]+"に変更");
          }
        }
        Speak_Background2._element.src = "../画像/透明.png";
      }
      else{
        if(Text[k]._element.textContent.substring(0,1)==" ") Text[k]._style.color = "blue";
        switch (Datas[8].substring(Time-1,Time)) {
          case "(":
            if(Text[k]._element.textContent=="") Text[k]._element.textContent = Text[k]._element.textContent+" (";
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
    }

    White_Background.addEventListener("enterframe",function(){
      if(make) management();
      if(Background.x==width/200){
        if(Datas[1]){
          Character1.x -= width/100;
          Character1.y -= width/100;
        }
        if(Datas[3]){
          Character2.x -= width/100;
          Character2.y -= width/100;
        }
        if(Datas[5]){
          Character3.x -= width/100;
          Character3.y -= width/100;
        }
        Background.x -= width/100;
        Background.y -= width/100;
      }
      else if(Background.x==-width/200){
        if(Datas[1]){
          Character1.x += width/200;
          Character1.y += width/200;
        }
        if(Datas[3]){
          Character2.x += width/200;
          Character2.y += width/200;
        }
        if(Datas[5]){
          Character3.x += width/200;
          Character3.y += width/200;
        }
        Background.x += width/200;
        Background.y += width/200;
      }
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
          if(Text_defined&&have(Play_Sheet+c+"プレイ済み")==false){
            Return = true;
            Text_defined = false;
            for (var i = 0; i < 6; i++) {
              Text[i]._element.textContent = "";
            }
            Time = 0;
            k = 0;
            pcpc = 0;
            for (var i = 0; i < Datas[8].length+1; i++) {
              T_D();
            }
          }
          else Scene_loads(c,false,false);
        }
        else Scene_loads(c,true,false);
      });
    }
    if(Datas[9]!=false) Button(0,"早戻し",Datas[9]);//戻る1
    if(Datas[10]!=false) Button(1,"前",Datas[10]);//戻る2
    if(Datas[11]!=false) Button(2,"アイテム",Datas[11]);//設定
    if(Datas[12]!=false&&Play) Button(3,"次",Datas[12]);//進む1
    if(Datas[13]!=false){
      if(have(Play_Sheet+Datas[13]+"プレイ済み")&&Datas[12]!=Datas[13]){
        Button(4,"スキップ",Datas[13]);//進む2
      }
      else{
        if(Skip&&Skip!=Number&&Skip!=Datas[11]&&Skip!=Datas[12]&&Datas[12]!=Datas[13]) Button(4,"スキップ",Skip);//進む2
      }
    }

    if(Datas[16]!=false&&Datas[16]!=undefined){
      for (var i = 0; i < I_C_F_T_DATAS.length; i++) {
        if(I_C_F_T_DATAS[i].入手==(Datas[16])) break;
      }
      DATAS = [
        I_C_F_T_DATAS[i].タイプ,
        I_C_F_T_DATAS[i].フラグ類名,
          I_C_F_T_DATAS[i].説明文,
            I_C_F_T_DATAS[i].画像,
              I_C_F_T_DATAS[i].詳細文,
                I_C_F_T_DATAS[i].詳細内容,
                  I_C_F_T_DATAS[i].コード
                  ];
      if(have(I_C_F_T_DATAS[i].フラグ類名)==false){
        Get_ICFT(DATAS);
        var Trophy_Time = 0;
        var Trophy = new Sprite();
        Trophy._element = document.createElement("img");
        Trophy._element.src = "../画像/トロフィー.png";
        Trophy.width = width/3.61;
        Trophy.height = width/14.15;
        Trophy.x = width-width/3.5;
        Trophy.y = width/80;
        Trophy.opacity = 0;
        Trophy.tl.fadeIn(5);
        scene.addChild(Trophy);
        Datas[17] = I_C_F_T_DATAS[i].画像;
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
        Trophy_text._element.textContent = I_C_F_T_DATAS[i].フラグ類名;
        Trophy_text.x = width-width/5;
        Trophy_text.y = width/28+width/80;
        Trophy_text.opacity = 0;
        Trophy_text.tl.fadeIn(5);
        scene.addChild(Trophy_text);

        var Trophy_Flag2 = [];
        for (var i = 0; i < Trophy_Flag.length; i++) {
          Trophy_Flag2[i] = Trophy_Flag[i] + "(端)";
        }
        if(Trophy_Flag2==[]) Trophy_Flag2 = [[]+"(端)"]
        saves("トロフィー",Trophy_Flag2);

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
    if(Inspect){
      function Touchs(x,y,width_t,height_t,Number){
        Touch[tk] = new Sprite();
        Touch[tk]._element = document.createElement("img");
        if(can) Touch[tk]._element.src = "../画像/半透明(赤).png";
        else Touch[tk]._element.src = "../画像/透明.png";
        Touch[tk].x = x*width/NaturalWidth;
        Touch[tk].y = y*width/16*9/NaturalHeight;
        Touch[tk].width = width_t*width/NaturalWidth;
        Touch[tk].height = height_t*width/16*9/NaturalHeight;
        console.log(Touch[tk].x,Touch[tk].y,Touch[tk].width,Touch[tk].height,Number);
        scene.addChild(Touch[tk]);
        Touch[tk].addEventListener('touchstart',function(e){
          Sound_ON("選択音");
          Scene_loads(Number,false,false);
          return;
        });
        return;
      }

      if(Background._element.naturalWidth) var NaturalWidth = Background._element.naturalWidth;
      else var NaturalWidth = conversion_url(Inspect[0],"比率").split("×")[0];
      if(Background._element.naturalHeight) var NaturalHeight = Background._element.naturalHeight;
      else var NaturalHeight = conversion_url(Inspect[0],"比率").split("×")[1];

      var Touch = [];
      var tk = 0;

      for (var i = 1; i < Inspect.length; i = i+5) {
        Touchs(Inspect[i],Inspect[i+1],Inspect[i+2],Inspect[i+3],Inspect[i+4]);
        tk++;
      }
    }

    var Setting_mode1 = 0;
    var Setting_mode2 = 0;
    function management(){
      if (game.input.up){
        Setting_mode1--;
        if(Datas[1]!=false){
          Character1.y =  Setting_mode1*(width/16/100);
        }
        if(Datas[3]!=false){
          Character2.y =  Setting_mode1*(width/16/100);
        }
        if(Datas[5]!=false){
          Character3.y =  Setting_mode1*(width/16/100);
        }
        console.log(Setting_mode1);
      }
      if (game.input.right){
        Setting_mode2+=0.1;
        if(Datas[1]!=false){
          Character1.width = width/16*9;
          Character1.height = width/16*9;
          if(Setting_mode2>0){
            Character1.width*=Setting_mode2;
            Character1.height*=Setting_mode2;
            Character1.scaleX = 1;
          }
          else{
            Character1.width*=-Setting_mode2;
            Character1.height*=-Setting_mode2;
            Character1.scaleX = -1;
          }
          Character1.x = (width-Character1.width)/2-width/4;
        }
        if(Datas[3]!=false){
          Character2.width = width/16*9;
          Character2.height = width/16*9;
          if(Setting_mode2>0){
            Character2.width*=Setting_mode2;
            Character2.height*=Setting_mode2;
            Character2.scaleX = 1;
          }
          else{
            Character2.width*=-Setting_mode2;
            Character2.height*=-Setting_mode2;
            Character2.scaleX = -1;
          }
          Character2.x = (width-Character2.width)/2;
        }
        if(Datas[5]!=false){
          Character3.width = width/16*9;
          Character3.height = width/16*9;
          if(Setting_mode2>0){
            Character3.width*=Setting_mode2;
            Character3.height*=Setting_mode2;
            Character3.scaleX = 1;
          }
          else{
            Character3.width*=-Setting_mode2;
            Character3.height*=-Setting_mode2;
            Character3.scaleX = -1;
          }
          Character3.x = (width-Character3.width)/2+width/4;
        }
        console.log(Setting_mode2);
      }
      if (game.input.left){
        Setting_mode2-=0.1;
        if(Datas[1]!=false){
          Character1.width = width/16*9;
          Character1.height = width/16*9;
          if(Setting_mode2>0){
            Character1.width*=Setting_mode2;
            Character1.height*=Setting_mode2;
            Character1.scaleX = 1;
          }
          else{
            Character1.width*=-Setting_mode2;
            Character1.height*=-Setting_mode2;
            Character1.scaleX = -1;
          }
          Character1.x = (width-Character1.width)/2-width/4;
        }
        if(Datas[3]!=false){
          Character2.width = width/16*9;
          Character2.height = width/16*9;
          if(Setting_mode2>0){
            Character2.width*=Setting_mode2;
            Character2.height*=Setting_mode2;
            Character2.scaleX = 1;
          }
          else{
            Character2.width*=-Setting_mode2;
            Character2.height*=-Setting_mode2;
            Character2.scaleX = -1;
          }
          Character2.x = (width-Character2.width)/2;
        }
        if(Datas[5]!=false){
          Character3.width = width/16*9;
          Character3.height = width/16*9;
          if(Setting_mode2>0){
            Character3.width*=Setting_mode2;
            Character3.height*=Setting_mode2;
            Character3.scaleX = 1;
          }
          else{
            Character3.width*=-Setting_mode2;
            Character3.height*=-Setting_mode2;
            Character3.scaleX = -1;
          }
          Character3.x = (width-Character3.width)/2+width/4;
        }
        console.log(Setting_mode2);
      }
      if (game.input.down){
        Setting_mode1++;
        if(Datas[1]!=false){
          Character1.y =  Setting_mode1*(width/16/100);
        }
        if(Datas[3]!=false){
          Character2.y =  Setting_mode1*(width/16/100);
        }
        if(Datas[5]!=false){
          Character3.y =  Setting_mode1*(width/16/100);
        }
        console.log(Setting_mode1);
      }
    }
    if(make) makes(M_M,scene);
    return scene;
  };
  var MoveScene = function(Out){
    var scene = new Scene();                                // 新しいシーンを作る

    game.fps = 10;

    var Background = new Sprite();
    Background._element = document.createElement("img");
    Background._element.src = "../画像/黒.png";
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
    White_Background._element.src = W_S();
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
    Buttons._element.value = "次";
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
    if(make) makes(M_M,scene);
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

    var Background = new Sprite();
    Background._element = document.createElement("img");
    if(Datas[0].split("→")[0]) Background._element.src = conversion_url(Datas[0].split("→")[0],"画像");
    else Background._element.src = "../画像/黒.png";
    Background.width = width;
    Background.height = width/16*9;
    scene.addChild(Background);

    if(Datas[2]!=false){
      var Character2 = new Sprite();
      Character2._element = document.createElement("img");
      Character2._element.src = conversion_url(Datas[2],"画像");
      Character2.width = width/16*9;
      Character2.height = width/16*9;
      if(Datas[8].split("→")[0]>0){
        Character2.width*=Datas[8].split("→")[0];
        Character2.height*=Datas[8].split("→")[0];
      }
      else{
        Character2.width*=-Datas[8].split("→")[0];
        Character2.height*=-Datas[8].split("→")[0];
        Character2.scaleX = -1;
      }
      Character2.x = (width-Character2.width)/2;
      if(Datas[8].split("→")[1]) Character2.y =  Datas[8].split("→")[1]*(width/16/100);
      scene.addChild(Character2);
    }//キャラ真ん中

    if(conversion_url(Datas[0].split("→")[1],"画像")!="../画像/画像無し.gif"){
      var Background2 = new Sprite();
      Background2._element = document.createElement("img");
      Background2._element.src = conversion_url(Datas[0].split("→")[1],"画像");
      Background2.width = width;
      Background2.height = width/16*9;
      scene.addChild(Background2);
    }

    if(Datas[1]!=false){
      var Character1 = new Sprite();
      Character1._element = document.createElement("img");
      Character1._element.src = conversion_url(Datas[1],"画像");
      Character1.width = width/16*9;
      Character1.height = width/16*9;
      if(Datas[7].split("→")[0]>0){
        Character1.width*=Datas[7].split("→")[0];
        Character1.height*=Datas[7].split("→")[0];
      }
      else{
        Character1.width*=-Datas[7].split("→")[0];
        Character1.height*=-Datas[7].split("→")[0];
        Character1.scaleX = -1;
      }
      Character1.x = (width-Character1.width)/2-width/4;
      if(Datas[7].split("→")[1]) Character1.y =  Datas[7].split("→")[1]*(width/16/100);
      scene.addChild(Character1);
    }//キャラ左

    if(Datas[3]!=false){
      var Character3 = new Sprite();
      Character3._element = document.createElement("img");
      Character3._element.src = conversion_url(Datas[3],"画像");
      Character3.width = width/16*9;
      Character3.height = width/16*9;
      if(Datas[9].split("→")[0]>0){
        Character3.width*=Datas[9].split("→")[0];
        Character3.height*=Datas[9].split("→")[0];
      }
      else{
        Character3.width*=-Datas[9].split("→")[0];
        Character3.height*=-Datas[9].split("→")[0];
        Character3.scaleX = -1;
      }
      Character3.x = (width-Character3.width)/2+width/4;
      if(Datas[9].split("→")[1]) Character3.y =  Datas[9].split("→")[1]*(width/16/100);
      scene.addChild(Character3);
    }//キャラ右

    if(conversion_url(Datas[0].split("→")[2],"画像")!="../画像/画像無し.gif"){
      var Background3 = new Sprite();
      Background3._element = document.createElement("img");
      Background3._element.src = conversion_url(Datas[0].split("→")[2],"画像");
      Background3.width = width;
      Background3.height = width/16*9;
      scene.addChild(Background3);
    }

    var White_Background = new Sprite();
    White_Background._element = document.createElement("img");
    White_Background._element.src = W_S();
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
        switch (a) {
          case "戻る":
          case "やめる":
          case "やめとく":
            var ooo = "戻る";
            break;
          case "アイテム":
            var ooo = "メニュー";
            break;
          default:
            var ooo = "選択音";
            break;
        }
        if(Button_push(ooo)) return;
        if (b == "アイテム"){
          game.pushScene(ItemScene(Datas[6],"日常","アイテム",a));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        }
        else Scene_loads(b,false,false);
      });
      submits++;
      Numbers += (width/20)+(width/25)+(width/25);
    }

    var Text = [];
    for (var i = 10; i < Datas.length; i = i+2) {
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
    if(Datas[4]!=false) Button(0,"早戻し",Datas[4]);//戻る1
    if(Datas[5]!=false) Button(1,"前",Datas[5]);//戻る2
    if(Datas[6]!=false&&Datas[6]!="ゲームオーバー") Button(2,"アイテム",Datas[6]);//設定
    if(make) makes(M_M,scene);
    return scene;
  };
  var PopScene = function(Number,Type,Sound){
    var scene = new Scene();                                // 新しいシーンを作る

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
    Background._element.src = conversion_url("証人席","画像");
    Background.width = width;
    Background.height = width/16*9;
    scene.addChild(Background);

    if(Datas[0]){
      var Character = new Entity();
      Character._element = document.createElement("img");
      Character._element.src = conversion_url(Datas[0],"画像");
      Character.width = width/16*9;
      Character.height = width/16*9;
      if(Datas[9].split("→")[0]>0){
        Character.width*=Datas[9].split("→")[0];
        Character.height*=Datas[9].split("→")[0];
      }
      else{
        Character.width*=-Datas[9].split("→")[0];
        Character.height*=-Datas[9].split("→")[0];
        Character.scaleX = -1;
      }
      Character.x = (width-Character.width)/2;
      if(Datas[9].split("→")[1]) Character.y =  Datas[9].split("→")[1]*(width/16/100);
      scene.addChild(Character);//証人
    }

    var Speak_Character_image = 0;

    var Stand = new Entity();
    Stand._element = document.createElement("img");
    Stand._element.src = conversion_url("証言台","画像");
    Stand.width = width;
    Stand.height = width/16*9;
    scene.addChild(Stand);

    var White_Background = new Sprite();
    White_Background._element = document.createElement("img");
    White_Background._element.src = W_S();
    White_Background.y = width/16*9;
    White_Background.width = width;
    White_Background.height = height-width/16*9;
    scene.addChild(White_Background);

    C_name = new Sprite();
    C_name._element = document.createElement("innerHTML");
    C_name._style.font  = width/20+"px monospace";
    C_name._element.textContent = "【" + Datas[1] + "】";
    C_name.y = width/16*9+width/25;
    if(Datas[1]!="") scene.addChild(C_name);//証人名

    var Numbers = width/16*9+(width/20)+(width/25);

    function Texts(a){
      Numbers += width/20+width/25;
      Text[i] = new Sprite();
      Text[i]._element = document.createElement("innerHTML");
      Text[i]._style.font  = width/20+"px monospace";
      Text[i]._element.textContent = a;
      Text[i].x = width/20;
      Text[i].y = Numbers;
      Text[i].width = width-width/10;
      Text[i]._style.color = "green";
      scene.addChild(Text[i]);
    }//証言

    var Text = [];
    var Syougen = free(Datas[2]).split("\n");

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
            game.pushScene(ItemScene(Datas[7],Datas[8],"アイテム","つきつける"));
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
    if(Datas[3]!=false) Button(0,"ゆさぶる",Datas[3]);//ゆさぶる
    if(Datas[4]!=false) Button(1,"前",Datas[4]);//戻る
    if(Datas[5]!=false) Button(2,"設定を開く",Datas[5]);//設定
    if(Datas[6]!=false) Button(3,"次",Datas[6]);//進む
    if(Datas[7]!=false) Button(4,"つきつける",Datas[7]);//つきつける
    if(make) makes(M_M,scene);
    return scene;
  };
  var SettingScene = function(Number,Ig,Type,Do){
    var scene = new Scene();                                // 新しいシーンを作る

    var Background = new Entity();
    Background._element = document.createElement("img");
    Background._element.src = "../画像/メニュー背景.png";
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
      Button[submits].ナンバー　= submits;
      scene.addChild(Button[submits]);
      Button[submits].addEventListener('touchstart',function(e){
        switch (a) {
          case "設定を閉じる":
            if(Button_push("戻る")) return;
            break;
          case "改造":
          case "サウンド設定":
          case "プレイヤー設定":
            if(Button_push("メニュー")) return;
            break;
          case "セーブする":
            if(Button_push("セーブ")) return;
            break;
          case "現在はオートセーブです。":
            if(Button_push("オートセーブ")) return;
            break;
          default:
            if(Button_push("選択音")) return;
            break;
        }
        switch(a){
          case "改造":
            if(Scene_kazu==3){
              game.popScene();
              Scene_kazu--;
              console.log("Scene数",Scene_kazu);
              game.replaceScene(TransformScene(Number,Ig,Type,Do));
            }
            else{
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              game.pushScene(TransformScene(Number,Ig,Type,Do));
            }
            break;
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
              Button[this.ナンバー+1]._element.value = "セーブする";
              Setting_Flag[8] = false;
              scene.addChild(Button[this.ナンバー+1]);
              scene.removeChild(Button[this.ナンバー+2]);
            }
            else{
              Setting_Flag[8] = true;
              scene.addChild(Button[this.ナンバー+2]);
              scene.removeChild(Button[this.ナンバー+1]);
            }
            saves("設定");
            break;
          case "現在は演出をスキップします。":
          case "現在は演出をスキップしません。":
            if(Setting_Flag[18]){
              Setting_Flag[18] = false;
              this._element.value = "現在は演出をスキップしません。";
            }
            else{
              Setting_Flag[18] = true;
              this._element.value = "現在は演出をスキップします。";
            }
            saves("設定");
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
    if(Manager){
      Numbers -= (width/20)+(width/25)+(width/25);
      Submit("改造");
    }
    Submit("プレイヤー設定");
    Submit("サウンド設定");
    Submit("タイトルに戻る");
    Submit("セーブデータ読み込み");
    Submit("セーブ方法の切り替え");
    Submit("セーブする");
    Numbers -= (width/20)+(width/25)+(width/25);
    Submit("現在はオートセーブです。");
    if(Setting_Flag[8]) scene.removeChild(Button[submits-2]);
    else scene.removeChild(Button[submits-1]);
    if(Setting_Flag[18]) Submit("現在は演出をスキップします。");
    else Submit("現在は演出をスキップしません。");

    return scene;
  };
  var PlayerSettingScene = function(){
    var scene = new Scene();                                // 新しいシーンを作る

    var Background = new Entity();
    Background._element = document.createElement("img");
    Background._element.src = "../画像/メニュー背景.png";
    Background.width = width;
    Background.height = height;
    scene.addChild(Background);

    var Numbers = width/2;

    var Gender = new Entity();
    Gender.moveTo(width/4+width/20+width/10,Numbers);
    Gender.width = width/2;
    Gender.height = width/10;
    Gender._element = document.createElement("select");
    console.log(Gender);
    Numbers += width/20+width/25+width/25;

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
    S_Input1.moveTo(width/4+width/20+width/10,Numbers);
    S_Input1.width = width/2;
    S_Input1.height = width/10;
    S_Input1._element = document.createElement('input');
    S_Input1._element.value = Setting_Flag[1];
    S_Input1._element.placeholder = "苗字を入力";
    Numbers += width/20+width/25+width/25;
    scene.addChild(S_Input1);

    var S_Input2 = new Entity();
    S_Input2.moveTo(width/4+width/20+width/10,Numbers);
    S_Input2.width = width/2;
    S_Input2.height = width/10;
    S_Input2._element = document.createElement('input');
    S_Input2._element.value = Setting_Flag[0];
    S_Input2._element.placeholder = "名前を入力";
    Numbers += width/20+width/25+width/25;
    scene.addChild(S_Input2);

    var S_Input3 = new Entity();
    S_Input3.moveTo(width/4+width/20+width/10,Numbers);
    S_Input3.width = width/2;
    S_Input3.height = width/10;
    S_Input3._element = document.createElement('input');
    S_Input3._element.value = Setting_Flag[16];
    S_Input3._element.placeholder = "一人称を入力";
    Numbers += width/20+width/25+width/25;
    scene.addChild(S_Input3);

    var S_Input4 = new Entity();
    S_Input4.moveTo(width/4+width/20+width/10,Numbers);
    S_Input4.width = width/2;
    S_Input4.height = width/10;
    S_Input4._element = document.createElement('input');
    S_Input4._element.value = Setting_Flag[17];
    S_Input4._element.placeholder = "二人称を入力";
    Numbers += width/20+width/25+width/25;
    scene.addChild(S_Input4);

    var S_Input5 = new Entity();
    S_Input5.moveTo(width/4+width/20+width/10,Numbers);
    S_Input5.width = width/2;
    S_Input5.height = width/10;
    S_Input5._element = document.createElement('input');
    S_Input5._element.value = Setting_Flag[19];
    S_Input5._element.placeholder = "自由を入力";
    Numbers += width/20+width/25+width/25;
    scene.addChild(S_Input5);

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
        if(S_Input1._element.value.replace(/[^,]/g,"")!=""||S_Input2._element.value.replace(/[^,]/g,"")!=""||S_Input3._element.value.replace(/[^,]/g,"")!=""||S_Input4._element.value.replace(/[^,]/g,"")!=""||S_Input5._element.value.replace(/[^,]/g,"")!=""){
          scene.addChild(Text[6]);
        }
        else{
          Setting_Flag[1] = S_Input1._element.value;
          Setting_Flag[0] = S_Input2._element.value;
          Setting_Flag[16] = S_Input3._element.value;
          Setting_Flag[17] = S_Input4._element.value;
          Setting_Flag[19] = S_Input5._element.value;
          if(Gender._element.value=="男"){
            Setting_Flag[2] = "男";
            if(S_Input1._element.value=="") Setting_Flag[1] = "若辻";
            if(S_Input2._element.value=="") Setting_Flag[0] = "俛人";
            if(S_Input3._element.value=="") Setting_Flag[16] = "俺";
            if(S_Input4._element.value=="") Setting_Flag[17] = "きみ";
          }
          else if(Gender._element.value=="女"){
            Setting_Flag[2] = "女";
            if(S_Input1._element.value=="") Setting_Flag[1] = "防人";
            if(S_Input2._element.value=="") Setting_Flag[0] = "玲奈";
            if(S_Input3._element.value=="") Setting_Flag[16] = "私";
            if(S_Input4._element.value=="") Setting_Flag[17] = "あなた";
          }
          else{
            Setting_Flag[2] = "未設定";
            if(S_Input1._element.value=="") Setting_Flag[1] = "未設定";
            if(S_Input2._element.value=="") Setting_Flag[0] = "未設定";
            if(S_Input3._element.value=="") Setting_Flag[16] = "未設定";
            if(S_Input4._element.value=="") Setting_Flag[17] = "未設定";
            if(S_Input5._element.value=="") Setting_Flag[19] = "未設定→未設定";
          }
          if(S_Input5._element.value=="") Setting_Flag[19] = "自由1→自由2";
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
        saves("設定");
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
    Texts("一人称",S_Input3.y);
    Texts("二人称",S_Input4.y);
    Texts("自由",S_Input5.y);
    Texts(",(カンマ)は使用できません。",width/3,width/20);

    return scene;
  };
  var SceneSettingScene = function(Number){
    var scene = new Scene();                                // 新しいシーンを作る

    var Numbers = width/10+width/30;

    var S_Input = new Entity();
    S_Input.moveTo(width/4,Numbers);
    S_Input.width = width/2;
    S_Input.height = width/10;
    S_Input._element = document.createElement("select");

    var Option = [];
    var Form = [
      "メイン",
      "選択",
      "調べる",
      "入手",
      "尋問"
    ];

    for (var i = 0; i < Form.length; i++){
      Option[i] = document.createElement("option");
      Option[i].text = Form[i];
      Option[i].value = Form[i];
      S_Input._element.appendChild(Option[i]);
    }
    scene.addChild(S_Input);

    Numbers += width/5;

    var Button = new Entity();
    Button.moveTo(width/4,Numbers);
    Button.width = width/2;
    Button.height = width/10;
    Button._element = document.createElement('input');
    Button._element.type = "submit";
    Button._element.value = "新しいシーンの作成";
    scene.addChild(Button);
    Button.addEventListener('touchstart',function(e){
      if(Button_push("セーブ")) return;
      switch (S_Input._element.value) {
        case "メイン":
          var i = Main_DATAS.length;
          Main_DATAS[i] = document.createElement("void");
          Main_DATAS[i].タイプ = "メイン";
          Main_DATAS[i].入手 = "";
          Main_DATAS[i].BGM = Setting_Datas[0];
          Main_DATAS[i].表示名 = Setting_Datas[1];
          Main_DATAS[i].シーン名 = Number;
          Main_DATAS[i].背景 = Setting_Datas[2];
          Main_DATAS[i].左側の人物 = Setting_Datas[3];
          Main_DATAS[i].左倍率 = Setting_Datas[4];
          Main_DATAS[i].真ん中の人物 = Setting_Datas[5];
          Main_DATAS[i].中倍率 = Setting_Datas[6];
          Main_DATAS[i].右側の人物 = Setting_Datas[7];
          Main_DATAS[i].右倍率 = Setting_Datas[8];
          Main_DATAS[i].人物名 = Setting_Datas[9];
          Main_DATAS[i].文章音 = Setting_Datas[10];
          Main_DATAS[i].速度 = 10;
          Main_DATAS[i].文章男 = "「現在主人公の設定は男です。」";
          Main_DATAS[i].文章女 = "「現在主人公の設定は女です。」";
          Main_DATAS[i].文章未設定 = "「現在主人公の性別は未設定です」";
          Main_DATAS[i].前前 = Number.replace(/\d/g,"")+1;
          Main_DATAS[i].前 = Number.replace(/\d/g,"")+(Number.replace(/[^\d]/g,"")*1-1);
          Main_DATAS[i].セーブ = Number;
          Main_DATAS[i].次 = Number.replace(/\d/g,"")+(Number.replace(/[^\d]/g,"")*1+1);
          Main_DATAS[i].次次 = Number.replace(/\d/g,"")+"終了";
          Main_DATAS[i].表示アイテムx座標 = Setting_Datas[11];
          Main_DATAS[i].表示アイテムy座標 = Setting_Datas[12];
          Main_DATAS[i].表示アイテムフェード = 0;
          Main_DATAS[i].表示アイテム画像 = Setting_Datas[13];
          Main_DATAS[i].トロフィー = "";
          break;
        case "選択":
          var i = Choice_DATAS.length;
          Choice_DATAS[i] = document.createElement("void");
          Choice_DATAS[i].タイプ = "選択";
          Choice_DATAS[i].入手 = "";
          Choice_DATAS[i].BGM = Setting_Datas[0];
          Choice_DATAS[i].表示名 = Setting_Datas[1];
          Choice_DATAS[i].シーン名 = Number;
          Choice_DATAS[i].背景 = Setting_Datas[2];
          Choice_DATAS[i].左側の人物 = Setting_Datas[3];
          Choice_DATAS[i].左倍率 = Setting_Datas[4];
          Choice_DATAS[i].真ん中の人物 = Setting_Datas[5];
          Choice_DATAS[i].中倍率 = Setting_Datas[6];
          Choice_DATAS[i].右側の人物 = Setting_Datas[7];
          Choice_DATAS[i].右倍率 = Setting_Datas[8];
          Choice_DATAS[i].前前 = Number.replace(/\d/g,"")+1;
          Choice_DATAS[i].前 = Number.replace(/\d/g,"")+(Number.replace(/[^\d]/g,"")*1-1);
          Choice_DATAS[i].セーブ = Number;
          Choice_DATAS[i].選択肢1 = "";
          Choice_DATAS[i].選択肢1移動先 = "";
          Choice_DATAS[i].選択肢2 = "";
          Choice_DATAS[i].選択肢2移動先 = "";
          Choice_DATAS[i].選択肢3 = "";
          Choice_DATAS[i].選択肢3移動先 = "";
          Choice_DATAS[i].選択肢4 = "";
          Choice_DATAS[i].選択肢4移動先 = "";
          Choice_DATAS[i].選択肢5 = "";
          Choice_DATAS[i].選択肢5移動先 = "";
          Choice_DATAS[i].選択肢6 = "";
          Choice_DATAS[i].選択肢6移動先 = "";
          break;
        case "入手":
          var i = Item_get_DATAS.length;
          Item_get_DATAS[i] = document.createElement("void");
          Item_get_DATAS[i].タイプ = "入手";
          Item_get_DATAS[i].入手 = "";
          Item_get_DATAS[i].シーン名 = Number;
          Item_get_DATAS[i].画像 = "";
          Item_get_DATAS[i].文章 = "を手に入れた。";
          Item_get_DATAS[i].次のシーン = "";
          break;
        case "調べる":
          var i = Inspect_DATAS.length;
          Inspect_DATAS[i] = document.createElement("void");
          Inspect_DATAS[i].タイプ = "調べる";
          Inspect_DATAS[i].シーン名 = Number;
          Inspect_DATAS[i].背景 = Setting_Datas[2];
          Inspect_DATAS[i].可視化 = true;
          Inspect_DATAS[i].前のシーン = "";
          Inspect_DATAS[i].x座標1 = "";
          Inspect_DATAS[i].y座標1 = "";
          Inspect_DATAS[i].幅1 = "";
          Inspect_DATAS[i].高さ1 = "";
          Inspect_DATAS[i].移動先1 = "";
          Inspect_DATAS[i].x座標2 = "";
          Inspect_DATAS[i].y座標2 = "";
          Inspect_DATAS[i].幅2 = "";
          Inspect_DATAS[i].高さ2 = "";
          Inspect_DATAS[i].移動先2 = "";
          Inspect_DATAS[i].x座標3 = "";
          Inspect_DATAS[i].y座標3 = "";
          Inspect_DATAS[i].幅3 = "";
          Inspect_DATAS[i].高さ3 = "";
          Inspect_DATAS[i].移動先3 = "";
          Inspect_DATAS[i].x座標4 = "";
          Inspect_DATAS[i].y座標4 = "";
          Inspect_DATAS[i].幅4 = "";
          Inspect_DATAS[i].高さ4 = "";
          Inspect_DATAS[i].移動先4 = "";
          Inspect_DATAS[i].x座標5 = "";
          Inspect_DATAS[i].y座標5 = "";
          Inspect_DATAS[i].幅5 = "";
          Inspect_DATAS[i].高さ5 = "";
          Inspect_DATAS[i].移動先5 = "";
          break;
        case "尋問":
          var i = Interrogation_DATAS.length;
          Interrogation_DATAS[i] = document.createElement("void");
          Interrogation_DATAS[i].タイプ = "尋問";
          Interrogation_DATAS[i].BGM = "";
          Interrogation_DATAS[i].シーン名 = Number;
          Interrogation_DATAS[i].人物 = "";
          Interrogation_DATAS[i].人物名 = "証人";
          Interrogation_DATAS[i].倍率 = "1";
          Interrogation_DATAS[i].証言 = "";
          Interrogation_DATAS[i].待った移動場所 = "";
          Interrogation_DATAS[i].前 = Number.replace(/\d/g,"")+(Number.replace(/[^\d]/g,"")*1-1);
          Interrogation_DATAS[i].セーブ = Number;
          Interrogation_DATAS[i].次 = Number.replace(/\d/g,"")+(Number.replace(/[^\d]/g,"")*1+1);
          Interrogation_DATAS[i].正解移動場所 = "";
          Interrogation_DATAS[i].正解アイテム = "無し";
          break;
      }
      Scene_loads(Number,false,false);
    });

    return scene;
  };
  var SoundSettingScene = function(){
    var scene = new Scene();                                // 新しいシーンを作る

    var Background = new Entity();
    Background._element = document.createElement("img");
    Background._element.src = "../画像/メニュー背景.png";
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
        saves("設定");
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
  var InspectScene = function(Inspect,Return,can){
    var scene = new Scene();                                // 新しいシーンを作る

    var Background = new Sprite();
    Background._element = document.createElement("img");
    Background._element.src = conversion_url(Inspect[0],"画像");
    Background.width = width;
    Background.height = width/16*9;
    scene.addChild(Background);
    Background.addEventListener('touchstart',function(e){
      if(can){
        Sound_ON("選択音");
        Scene_loads("調べる何もない",false,false);
      }
      return;
    });

    if(Background._element.naturalWidth) var NaturalWidth = Background._element.naturalWidth;
    else var NaturalWidth = conversion_url(Inspect[0],"比率").split("×")[0];
    if(Background._element.naturalHeight) var NaturalHeight = Background._element.naturalHeight;
    else var NaturalHeight = conversion_url(Inspect[0],"比率").split("×")[1];

    function Touchs(x,y,width_t,height_t,Number){
      Touch[k] = new Sprite();
      Touch[k]._element = document.createElement("img");
      if(can) Touch[k]._element.src = "../画像/半透明(赤).png";
      else Touch[k]._element.src = "../画像/透明.png";
      Touch[k].シーン = Number;
      Touch[k].x = x*width/NaturalWidth;
      Touch[k].y = y*width/16*9/NaturalHeight;
      Touch[k].width = width_t*width/NaturalWidth;
      Touch[k].height = height_t*width/16*9/NaturalHeight;
      console.log(Touch[k].x,Touch[k].y,Touch[k].width,Touch[k].height,Number);
      scene.addChild(Touch[k]);
      Touch[k].addEventListener('touchstart',function(e){
        if(can){
          Sound_ON("選択音");
          Scene_loads(this.シーン,false,false);
        }
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

    if(can==false){
      var Touch_Pointer = new Sprite();
      Touch_Pointer._element = document.createElement("img");
      Touch_Pointer._element.src = "../画像/ポイント.gif";
      Touch_Pointer.width = width/36;
      Touch_Pointer.height = width/36;
      Touch_Pointer.x = width/2-width/36/2;
      Touch_Pointer.y = width/16*9/2-width/36/2;
      scene.addChild(Touch_Pointer);
      scene.addEventListener('touchstart',function(e){
        if(e.x<width&&e.y<width/16*9){
          Sound_ON("選択音");
          Touch_Pointer.x = e.x-width/36/2;
          Touch_Pointer.y = e.y-width/36/2;
        }
        return;
      });
      var Kettei = new Entity();
      Kettei.moveTo(width/4,width/16*9+(width/30)+width/5);
      Kettei.width = width/2;
      Kettei.height = (width/10);
      Kettei._element = document.createElement('input');
      Kettei._element.type = "submit";
      Kettei._element.value = "決定";
      scene.addChild(Kettei);
      Kettei.addEventListener('touchstart',function(e){
        for (var i = Touch.length-1; i >= 0; i--) {
          Sound_ON("選択音");
          if(Touch[i].intersect(Touch_Pointer)){
            Scene_loads(Touch[i].シーン,false,false);
            return;
          }
        }
        Scene_loads("調べる何もない",false,false);
        return;
      });
    }

    if(Return){
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
        Scene_loads(Return,true,false);
      });
    }
    if(make) makes(M_M,scene);
    return scene;
  };
  var ItemgetScene = function(a,b,c){
    var scene = new Scene();                                // 新しいシーンを作る

    var White_Background = new Sprite();
    White_Background._element = document.createElement("img");
    White_Background._element.src = W_S();
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
    b = free(b);

    for (var i = 0; i < 6; i++) {
      Texts();
    }

    var Time = 0;
    var k = 0;
    var Text_defined = true;

    function T_D(){
      Time ++;
      if(b.substring(Time-1,Time)=="\n"){
        k++;
      }
      else if(b.substring(Time-1,Time)!=""){
        Text[k]._element.textContent = Text[k]._element.textContent+b.substring(Time-1,Time);
      }
      else if(b.substring(Time-1,Time)==""){
        Text_defined = false;
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
    Buttons._element.value = "次";
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
        if(make==false){
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
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
        if(make==false){
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
        Scene_loads(c,false,false);
      }
    });//進む
    if(make) makes(M_M,scene);
    return scene;
  };
  var ItemScene = function(Number,Ig,Type,Do){
    var scene = new Scene();                                // 新しいシーンを作る

    function free(Data){
      for (var i = 0; i < Setting_Flag[19].split("→").length; i++) {
        var frees = "(自由"+(i+1)+")";
        Data = Data.replace(frees,Setting_Flag[19].split("→")[i]);
      }
      Data = Data.replace(/\(主人公苗字\)/g,Setting_Flag[1]);
      Data = Data.replace(/\(主人公名前\)/g,Setting_Flag[0]);
      Data = Data.replace(/\(一人称\)/g,Setting_Flag[16]);
      Data = Data.replace(/\(二人称\)/g,Setting_Flag[17]);
      Data = Data.replace(/\(カンマ\)/g,",");
      Data = Data.replace(/↓/g,"\n");
      for (var i = 0; i < Favorability_Flag.length; i++){
        var Favorability = "("+Favorability_Flag[i][0]+"好感度)";
        Data = Data.replace(Favorability,Favorability_Flag[i][1]);
      }
      return(Data);
    }

    switch (Type) {
      case "アイテム":
        var Pages = 5;
        var Choice_Flag = Item_Flag;
        var Type2 = "人物";
        break;
      case "人物":
        var Pages = 6;
        var Choice_Flag = Character_Flag;
        if(Ig) var Type2 = "アイテム";
        else var Type2 = "トロフィー";
        break;
      case "トロフィー":
        var Pages = 7;
        var Choice_Flag = Trophy_Flag;
        var Type2 = "アイテム";
        break;
    }

    var Background = new Entity();
    Background._element = document.createElement("img");
    Background._element.src = "../画像/メニュー背景.png";
    Background.width = width;
    Background.height = height;
    scene.addChild(Background);

    var Item_image = new Sprite();
    Item_image._element = document.createElement("img");
    Item_image._element.src = W_S();
    /*
    Item_image.width = width/4;
    Item_image.height = width/4;
    Item_image.x = width/1.6;
    Item_image.y = width/4+width/20+width/25;
    */
    Item_image.x = width/2+width/20;
    Item_image.y = width/4;
    Item_image.width = width/2.5+width/12-width/8;
    Item_image.height = Item_image.width;

    var Button = [];
    var submits = 0;
    function Submit(a,b,c,d,e,f){
      Button[submits] = new Entity();
      Button[submits].moveTo(b,c);
      Button[submits].width = d;
      Button[submits].height = e;
      Button[submits]._element = document.createElement('input');
      Button[submits]._element.type = "submit";
      Button[submits].backgroundColor = "buttonface";
      a = free(a);
      Button[submits]._element.value = a;
      if(a){
        if((a=="設定を開く"&&Ig)==false&&a!="詳細") scene.addChild(Button[submits]);
      }
      Button[submits].addEventListener('touchstart',function(e){
        switch (a) {
          case "戻る":
            var ooo = "戻る";
            break;
          case "次":
          case "前":
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
          game.replaceScene(ItemScene(Number,Ig,Type,Do));
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
              game.replaceScene(TransformScene(Number,Ig,Type,Do));
              console.log("Scene数",Scene_kazu);
              break;
            default:
              if(Button[3].詳細.substring(0,2)=="移動"){
                Button[3].詳細 = Button[3].詳細.substring(2);
                game.popScene();
                Scene_kazu--;
                console.log("Scene数",Scene_kazu);
                Scene_loads(Number+"\n"+Button[3].詳細,false,Choice_Item,false,false,Button[3]._element.value);
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
            case "前":
              if(Setting_Flag[Pages]==0){
                Setting_Flag[Pages] = Choice_Flag.length-Choice_Flag.length%5;
                if(Choice_Flag.length%5==0) Setting_Flag[Pages]-=5;
              }
              else Setting_Flag[Pages]-=5;
              game.replaceScene(ItemScene(Number,Ig,Type,Do));
              break;
            case "次":
              if(Setting_Flag[Pages] == Choice_Flag.length-Choice_Flag.length%5) Setting_Flag[Pages] = 0;
              else{
                Setting_Flag[Pages]+=5;
                if(Setting_Flag[Pages]==Choice_Flag.length) Setting_Flag[Pages] = 0;
              }
              game.replaceScene(ItemScene(Number,Ig,Type,Do));
              break;
            case "戻る":
              game.fps = Setting_Flag[3];
              game.popScene();
              Scene_kazu--;
              console.log("Scene数",Scene_kazu);
              break;
            case "設定を開く":
              game.pushScene(SettingScene(Number,Ig,Type,Do));
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              break;
            case Type2:
              game.replaceScene(ItemScene(Number,Ig,Type2,Do));
              break;
            case Do:
              game.popScene();
              Scene_kazu--;
              console.log("Scene数",Scene_kazu);
              Ig = free(Ig);
              for (var i = 0; i < Ig.split("\n").length; i++) {
                if(Ig.split("\n")[i]==Choice_Item){
                  Choice_Item = "正解アイテム";
                  break;
                }
              }
              if(Choice_Item=="正解アイテム"){
                game.pushScene(PopScene(Number,"異議あり！","主人公異議あり！"));
                Scene_kazu++;
                console.log("Scene数",Scene_kazu);
              }
              else if(Ig=="日常") Scene_loads(Number,false,Choice_Item,Type,Choice_Item_Image,Do);
              else{
                game.pushScene(PopScene("つきつけ失敗","異議あり！","主人公異議あり！"));
                Scene_kazu++;
                console.log("Scene数",Scene_kazu);
              }
              break;
            default:
              var I_text = free(f[1]);
              for (var i = 0; i < 5; i++) {
                Text[i]._element.textContent = I_text.split("\n")[i];
                if(Text[i]._element.textContent==undefined) Text[i]._element.textContent = "";
              }
              for (var i = 0; i < submits; i++) {
                Button[i].backgroundColor = "buttonface";
              }
              Choice_Item = f[5];
              Choice_Item_Image = f[2];
              if(conversion_url(f[2],"画像")=="../画像/画像無し.gif") Item_image_url = Choice_Item_Image;
              else var Item_image_url = conversion_url(f[2],"画像");
              Item_image._element.src = Item_image_url;
              if(Item_image._element.naturalWidth!=Item_image._element.naturalHeight){
                Item_image.height = Item_image.width/16*9;
                Item_image.y = width/4+Item_image.height/2;
              }
              else{
                Item_image.y = width/4;
                Item_image.height = Item_image.width;
              }
              Item_image.y = width/4;
              Item_image.height = Item_image.width;
              scene.addChild(Item_image);
              this.backgroundColor = "red";
              if(f[3]){
                Button[3]._element.value = f[3];
                Button[3].詳細 = f[4];
                scene.addChild(Button[3]);
              }
              else scene.removeChild(Button[3]);
              if(Ig){
                Button[4]._element.value = Do;
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
      Text[i].width = width-width/8-width/20;
      Text[i].x = width/8;
      Text[i].y = (width/4) + ((width/20)+(width/25)*(18+i*2)) - (width/25);
      scene.addChild(Text[i]);
    }

    for (var i = 0; i < 5; i++) {
      Description_text();
    }

    if(Choice_Flag.length>5){
      Submit("前",width/8,(width/4)+((width/20)+(width/25)*14),W_X_H,W_X_H);
      Submit("次",width/2.5,(width/4)+((width/20)+(width/25)*14),W_X_H,W_X_H);
    }
    else Setting_Flag[Pages] = 0;


    var Item = [];
    var Image = [];
    var Item_Number = 0;
    var Numbers = (width/4);
    var Choice_Item = "未設定";
    var Choice_Item_Image = "未設定";

    for (var i = 0; i < 5; i++) {
      if(Choice_Flag[i+Setting_Flag[Pages]]){
        Submit(Choice_Flag[i+Setting_Flag[Pages]][0],width/8,Numbers,width/2.5+W_X_H-width/8,W_X_H,Choice_Flag[i+Setting_Flag[Pages]]);
        Numbers += (width/20)+(width/25)+(width/50);
      };
    }

    return scene;
  };
  var DetailsScene = function(Syousai,Pages,Big){
    var scene = new Scene();                                // 新しいシーンを作る

    var Background = new Entity();
    Background._element = document.createElement("img");
    Background._element.src = "../画像/メニュー背景.png";
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
      Text[i].width = width - width/6;
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

    var S_Text = free(Syousai).split("\n");
    for (var i = 0; i < S_Text.length; i++) {
      Texts(S_Text[Pages+i]);
      if(Text[i]._element.textContent.substring(0,2)=="画像"){
        var Photo_url = Text[i]._element.textContent.substring(2);
        Text[i]._element.textContent = "";
        var Photo = new Sprite();
        Photo._element = document.createElement("img");
        if(conversion_url(Photo_url,"比率")=="正方形"||conversion_url(Photo_url,"比率").split("×")[0]==conversion_url(Photo_url,"比率").split("×")[1]){
          var Seihoukei = true;
        }
        if(conversion_url(Photo_url,"画像")!="../画像/画像無し.gif") var Photo_url = conversion_url(Photo_url,"画像");
        Photo._element.src = Photo_url;
        if(Seihoukei||(Photo._element.naturalWidth==Photo._element.naturalHeight&&Photo._element.naturalWidth!=0)){
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
        if(conversion_url(Photo_url,"画像")!="../画像/画像無し.gif") var Photo_url = conversion_url(Photo_url,"画像");
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
  var TransformScene = function(Number,Ig,Type2,Do){
    var scene = new Scene();                                // 新しいシーンを作る

    var Background = new Entity();
    Background._element = document.createElement("img");
    Background._element.src = "../画像/メニュー背景.png";
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
          if(Scene_kazu==2) game.replaceScene(ItemScene(Number,Ig,Type2,Do));
          else{
            game.popScene();
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
          }
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
                Button[3]._element.value//コード
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
                I_C_F_T_DATAS[i].フラグ類名,
                  I_C_F_T_DATAS[i].説明文,
                    I_C_F_T_DATAS[i].画像,
                      I_C_F_T_DATAS[i].詳細文,
                        I_C_F_T_DATAS[i].詳細内容,
                          I_C_F_T_DATAS[i].コード
                          ];
              Get_ICFT(DATAS);
              this._element.value = Button[2]._element.value+" 入手。";
              Sound_ON("セーブ");
              switch (I_C_F_T_DATAS[i].タイプ) {
                case "フラグ":
                  console.log(Flag);
                  break;
                case "好感度":
                  console.log(Favorability_Flag);
                  break;
                case "記録":
                  console.log(Log_Flag);
                  break;
              }
              break;
            case "記録追加 or 消去":
              for (var i = 0; i < Log_Flag.length; i++){
                if(Log_Flag[i]==Button[3]._element.value){
                  Log_Flag.splice(i,1);
                  this._element.value = Button[3]._element.value+" オフ。";
                  Sound_ON("セーブ");
                  console.log(Log_Flag);
                  return;
                }
              }
              Log_Flag[Log_Flag.length] = Button[3]._element.value;
              this._element.value = Button[3]._element.value+" オン。";
              Sound_ON("セーブ");
              console.log(Log_Flag);
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
              Item_Flag = [];
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
            case "記録リセット":
              Log_Flag = [];
              this._element.value = Button[1]._element.value;
              Sound_ON("セーブ");
              break;
            case "好感度消去":
              Favorability_Flag = [];
              this._element.value = Button[1]._element.value;
              Sound_ON("セーブ");
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
    Submit("チーター(強)に勝って貰った賞品。\n尋問時につきつけると先へ進める。\nその後強欲な壺が一つ無くなり\n強欲なカケラを入手する。");
    Submit("画像強欲な壺");
    Submit("実行する");

    var Option = [];
    var Choice_Transform = [
      "フラグ類入手",
      "アイテム作成",
      "記録追加 or 消去",
      "フラグ追加 or 消去",
      "人物リセット",
      "記録リセット",
      "フラグリセット",
      "アイテムリセット",
      "トロフィーリセット",
      "好感度消去"
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
      Option[i].text = I_C_F_T_DATAS[i].フラグ類名;
      Option[i].value = I_C_F_T_DATAS[i].入手;
      Button[2]._element.appendChild(Option[i]);
    }

    return scene;
  };
  game.replaceScene(PublicScene(private));
}
game.start();
}
