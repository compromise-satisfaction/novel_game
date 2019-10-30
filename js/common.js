//enchantjsの画面サイズの設定

function resetScreen(gameWidth,gameHeight){

  //ベースの幅を画面いっぱいに広げる
  $("#base").width(window.innerWidth).height(window.innerHeight);
  //幅、高さのスケールを計算
  var scaleWidth  = window.innerWidth  / gameWidth;
  var scaleHeight = window.innerHeight / gameHeight;
  //スケールが小さい値を全体のスケールに設定
  var orientation = "";
  if(scaleWidth < scaleHeight){
    orientation = "portrait";
    scale = scaleWidth;
  }
  else{
    orientation = "landscape";
    scale = scaleHeight;
  }
  //enchantjs-stageの画面サイズを計算
  var width = gameWidth * scale;
  var height = gameHeight * scale;
  console.log(height);

/*
  //enchantjs-stageの画面サイズを計算
  var width = window.innerWidth;
  var height = window.innerHeight;
  //回転方向を幅と高さを比較して確認
  var orientation = "";
  if(width < height){
    //縦
    orientation = "portrait";
    height = width;
  }
  else{
    //横
    orientation = "landscape";
    width = height;
  }
*/
  //div enchant-stageを取得
  var stage = $("#enchant-stage");
/*
  //スケールを計算
  var scale = height / 320.0;
*/
  //div enchant-stage配下のdiv（その配下にcanvasが格納されている）に
  //スケールを設定
  var transformKey = "-" + enchant.ENV.VENDOR_PREFIX + "-transform";
  stage.children("div").css(transformKey,"scale(" + scale + ")");
  //enchantjsの画面を中央に寄せる
  var left,top;
  if(orientation == "portrait"){
    top = (window.innerHeight-height)*0.5;
    left = 0;
  }
  else{
    top = 0;
    left = (window.innerWidth-width)*0.5;
  }
  stage.height(height).width(width);
  stage.css({"position":"absolute","left":left+"px","top":top+"px"});
  //スクロール位置を0,0に設定
  $(window).scrollLeft(0).scrollTop(0);
  //enchant.Coreへの反映情報として連想配列を返す
  return {"scale":scale,"left":left,"top":top};
}
//初期設定

$(function(){

  new Vue({
    el: '#app',
    mounted () {
      fetch(
        'https://script.google.com/macros/s/AKfycbwpMKf5237VlebQuUNjHKYGvLrOi3bdGV1Oa2CKsKAMmv_-mpM/exec',
      )
        .then(res => res.json())
        .then(result => {
          var game = enchant.Core.instance;
          game.Mainscene_datas = result;
          console.log("メインシーン読み込み");
        },);
    }
  })

  new Vue({
    el: '#app',
    mounted () {
      fetch(
        'https://script.google.com/macros/s/AKfycbz5xZcLyjNApHZ-vi1ItPDjD7r54rCjpqpVzCuAIZsGOvxaVE4/exec',
      )
        .then(res => res.json())
        .then(result2 => {
          var game = enchant.Core.instance;
          game.Choicescene_datas = result2;
          console.log("選択肢シーン読み込み");
        },);
    }
  })

  new Vue({
    el: '#app',
    mounted () {
      fetch(
        'https://script.google.com/macros/s/AKfycbwjsrYuGix6buuM-Hg0_LROiVGXn-4SJAYFiWXSWE6eeCZJHi8/exec',
      )
        .then(res => res.json())
        .then(result3 => {
          var game = enchant.Core.instance;
          game.Inspectscene_datas = result3;
          console.log("調べるシーン読み込み");
        },);
    }
  })
/*
  new Vue({
    el: '#app',
    mounted () {
      fetch(
        'https://script.google.com/macros/s/AKfycbwjsrYuGix6buuM-Hg0_LROiVGXn-4SJAYFiWXSWE6eeCZJHi8/exec',
      )
        .then(res => res.json())
        .then(result4 => {
          var game = enchant.Core.instance;
          game.image_datas = result4;
          console.log("画像url読み込み");
        },);
    }
  })*/

  //ゲーム内の画面サイズ
  var gameWidth = 1600;
  var gameHeight = 1600;
  //回転時の処理
  var orientationChange = function(){
    //画面サイズ設定
    var result = resetScreen(gameWidth,gameHeight);
    //enchant.Coreへの変更情報を反映
    var game = enchant.Core.instance;
    if(game !== null){
      game.scale = result["scale"];
      game._pageX = result["left"];
      game._pageY = result["top"];
    }
  };
  //回転イベント
  $(window).on("resize",function(event){
    orientationChange();
  });
  $(window).on("orientationchange",function(event){
    orientationChange();
  });
  //余白部分をドラッグすることによるスクロールを無効にする
  //$("#base").on("touchstart",function(event){event.preventDefault();});
  //ゲームを実行する
  Load(gameWidth,gameHeight);
  //初回時のスクリーン設定
  orientationChange();
});
