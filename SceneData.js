titlescene = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetBackGroundImage':"title.png",
  'SetChoiceScene': [" ▶︎ 始める","scene1"," ▶︎ 説明","aboutscene"],
}

titlescene_back = {
  'DeleteCharactor':"",
  'SetChoiceScene': [" ▶︎ タイトルに戻る","titlescene"],
}

aboutscene =
{
'DeleteCharactor':"",
'SetText': ['', 'とりあえずは登場人物の紹介をしましょう。'],
'SetNextSceneName':'aboutscene1'
}

aboutscene1 =
{
'DeleteCharactor':"",
'SetCharactorRight': 'mio1.png',
'SetText': ['', 'この娘は湊みお。ピュアパレットのピュアじゃない方です。'],
'SetNextSceneName':'aboutscene2'
}

aboutscene2 =
{
'DeleteCharactor':"",
'SetCharactorLeft': 'aine1.png',
'SetText': ['', 'この娘が友希あいねちゃん。ピュアパレットのピュアな方です。',
                'かわいいですね。(かわいいです)',
                'ちなみにこの写真は二人がフレンズを組んで 一度解散し、再結成した後のみおちゃんの電話の呼び出し画面の画像です。',
                'どう見ても盗撮しようとして気づかれたみたいな構図の写真だけども、みおちゃんが写真を撮らせてもらえないのか、',
                'それとも恥ずかしくて撮らせてと言えないのかはたまた盗撮行為が好きなのか。多分後者だろうね。'
              ],
'SetNextSceneName':'aboutscene3'
}

aboutscene3 =
{
'DeleteCharactor':"",
'SetCharactorLeft': 'koko0.png',
'SetText': ['', 'ついでに、アイカツ！ナビのココちゃん。　アイカツ！モバイルに「ハロー、ココちゃん！」　と呼びかけると出てきてくれるAIです。',
                '要はアイカツフレンズ!世界のSiriといったところでしょうか。',
                'AIのくせに一人しかいないらしく、忙しい時は呼んでも出でこなかったり、舌を噛んだり、自分にわからないことは人任せにして電話を勝手にかけるくらいの高性能AIです。',
                'ホントに一人しかいないのか…？'
              ],
'SetNextSceneName':'aboutscene3_2'
}

aboutscene3_2 =
{
'DeleteBG':"",
'DeleteCharactor':"",
'SetBackGroundImage':"51.png",
'SetText': ['', 'ヒェッ…',
                'ちなみにこの回でかなりのポンコツだった事が露呈した。'
              ],
'SetNextSceneName':'aboutscene4'
}

aboutscene4 = {
  'DeleteBG':"",
  'SetBackGroundImage':"title.png",
  'DeleteCharactor':"",
  'SetCharactorRight': 'nako.png',
  'SetText': ['', 'あと、海老原なこちゃん。「名」古屋でアイカツしている女の「子」です。',
                  '名古屋らしくエビフライが好物で、頭と苗字にも海老が付いています。　わかりやすいですね。(なんかそういうデュエリストいたような…)'
                ],
  'SetNextSceneName':'aboutscene5'
}

aboutscene5 = {
  'DeleteCharactor':"",
  'SetCharactorLeft': 'aine1.png',
  'SetCharactorRight': 'mio1.png',
  'SetText': ['', 'このゲームはあいねちゃんとみおちゃんがフレンズ(要はユニット)を組むまでのお話です。',
                  'みおちゃんとなって選択肢を選んでいき、あいねちゃんとフレンズを組みましょう。',
                  'アニメ本編が正解ルートなので間違ったりするとすぐ終わっちゃったりします。',
                  '終わらない場合もありますが、どれぐらい正しかったか%表示します。頑張って100%クリアを目指しましょう。第11話「告白はドラマチック！」本編通り進めばOKです。',
                  'パーセント表示はあくまで予定です。なくなる恐れがあります。',
                  '本編中にも解説入れますか？'
                ],
  'SetNextSceneName':'aboutscene6'
}

aboutscene6 = {
    'SetChoiceScene': [" ▶︎ はい","aboutscene7"," ▶︎ いいえ","aboutscene8"],
}

aboutscene7 ={
  AddPlayerStatusFlag:["解説を希望",!0],
  'SetText': ['',
              '本編中にも解説が入ります。'
              ],
  'SetNextSceneName':'titlescene_back'
}

aboutscene8 ={
  AddPlayerStatusFlag:["解説を拒否",0],
  'SetText': ['',
              '本編中には解説が入りません。'
              ],
  'SetNextSceneName':'titlescene_back'
}

scene1 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '1.png',
  'SetText': ['友希あいね',
                  'これまでの『アイカツフレンズ！』。',
                  '私　友希あいね。',
                  'スターハーモニー学園に通う中学２年生。',
                  '学園のトップアイドル　湊みおちゃんと出会ってアイドル科に転入したんだ。'
              ],
  'SetNextSceneName':'scene2'
}

scene2 = {
  'SetCharactorRight': 'ema.png',
  'SetCharactorLeft': 'maika.png',
  'SetText': ['あいね',
              'ダンスとお祭りが大好きな舞花ちゃんと一つ上の先輩で　私たちを元気に引っ張ってくれるエマちゃん。',
              '凸凹だけどすっごく仲よしな２人はついにフレンズになった。',
              ],
  'SetNextSceneName':'scene3'
}

scene3 = {
  'DeleteCharactor':"",
  'SetText': ['あいね',
              'アイドルは　カードも友達　ファンも友達。',
              '目指せ　友達100万人！'
              ],
  'SetNextSceneName':'scene4'
}

scene4 = {
  'SetCharactorRight': 'ema.png',
  'DeleteBG':"",
  'SetBackGroundImage': 'school_room.png',
  'SetText': ['日向エマ',
              'プリティー！'
              ],
  'SetNextSceneName':'scene5'
}

scene5 = {
  'SetCharactorLeft': 'maika.png',
  'SetText': ['蝶乃舞花',
              'セクシー！'
              ],
  'SetNextSceneName':'scene6'
}

scene6 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '2.png',
  'SetText': ['二人',
              'ハニーキャット！'
              ],
  'SetNextSceneName':'scene7'
}

scene7 = {
  'DeleteBG':"",
  'SetCharactorLeft': 'aine2.png',
  'SetCharactorRight': 'ema.png',
  'SetBackGroundImage': 'school_room.png',
  'SetText': ['あいね',
              'うわ～！かっこいい！！'
              ],
  'SetNextSceneName':'scene8'
}

scene8 = {
  'DeleteCharactorl':"",
  'SetCharactorRight': 'mio2.png',
  'SetText': ['湊みお',
              'ハニーキャット…２人にぴったりなフレンズ名ね。'
              ],
  'SetNextSceneName':'scene9'
}

scene9 = {
  'SetText': ['あいね',
              'たしかに。舞花ちゃんもエマちゃんも猫っぽいイメージあるし。'
              ],
  'SetNextSceneName':'scene10'
}

scene10 = {
  'DeleteCharactorl':"",
  'SetCharactorRight': 'ema.png',
  'SetText': ['エマ',
              'でしょでしょ。フレンズ組もうってなったら２人で盛り上がっちゃって。コンセプトとか一から作り上げてくのってワクワクするよね。'
              ],
  'SetNextSceneName':'scene11'
}

scene11 = {
  'DeleteCharactorf':"",
  'SetCharactorLeft': 'maika.png',
  'SetText': ['舞花',
              'あのキメポーズはちょっと恥ずいんですけど…'
              ],
  'SetNextSceneName':'scene12'
}

scene12 = {
  'SetText': ['エマ',
              'え～っ！？舞花だってノリノリで考えてたじゃん！'
              ],
  'SetNextSceneName':'scene13'
}

scene13 = {
  'SetText': ['舞花',
              'あのときは…。エマとフレンズを組めたからテンション上がっちゃって…。'
              ],
  'SetNextSceneName':'scene14'
}

scene14 = {
  'SetText': ['エマ',
              'うんうん。かわいいやつめ！'
              ],
  'SetNextSceneName':'scene15'
}

scene15 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'aine2.png',
  'SetText': ['あいね',
              '二人ともすっごく楽しそう。フレンズっていいな〜。'
              ],
  'SetNextSceneName':'scene16'
}

scene16 = {
  'DeleteCharactorf':"",
  'SetCharactorRight': 'mio2.png',
  'SetText': ['みお',
              '……………'
              ],
  'SetNextSceneName':'scene17'
}

scene17 = {
  'SetChoiceScene': [" ▶︎ ……………","scene18"," ▶︎ あいね！私達もフレンズを組みましょう！","scene18_b"],
}

scene18_b = {
  AddPlayerStatusFlag:["即決",!0],
  'SetText': ['みお',
              'あいね！私達もフレンズを組みましょう！'
              ],
  'SetNextSceneName':'scene154'
}

scene18 = {
  'DeleteCharactor':"",
  'SetCharactorRight': 'mio3.png',
  'SetText': ['みお',
              '……………'
              ],
  'SetNextSceneName':'scene19'
}

scene19 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '3.png',
  'SetText': ['',
              'その晩　みおの自室'
              ],
  'SetNextSceneName':'scene20'
}

scene20 = {
  'SetCharactorRight': 'mio2.png',
  'SetText': ['みお',
              'フレンズを組むのは、やっぱりあいねしかいない。まずは…'
              ],
  'SetNextSceneName':'scene21'
}

scene21 = {
  'SetChoiceScene': [" ▶︎ 告白の練習","scene0"," ▶︎ 相性を占いで確かめる","scene0"," ▶︎ 両方","scene22"],
}

scene22 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '4.png',
  'SetText': ['みお',
              'あいね、私とフレンズになりましょう。'
              ],
  'SetNextSceneName':'scene23'
}

scene23 = {
  'DeleteBG':"",
  'SetBackGroundImage': '5.png',
  'SetCharactorRight': 'mio2.png',
  'SetText': ['みお',
              'フゥ…。',
              '古今東西あらゆる占いで私とあいねの相性はバッチリだってわかったし…。',
              'それに何より私の直感があいねとフレンズを組めばすごいことが起きるってビビっと訴えかけてる。',
              'あとは…'
              ],
  'SetNextSceneName':'scene24'
}

scene24 = {
  'SetChoiceScene': [" ▶︎ ドラマチックな展開のフレンズ結成ね。","scene25"," ▶︎ 今すぐあいねに電話をかけましょう。","scene25_1"],
}

scene25_1 = {
  'SetText': ['あいね',
              'もしもし。みおちゃん？'
              ],
  'SetNextSceneName':'scene25_2'
}

scene25_2 = {
  AddPlayerStatusFlag:["即決",!0],
  'SetText': ['みお',
              'あいね。私とフレンズになって。'
              ],
  'SetNextSceneName':'scene154'
}

scene25 = {
  'SetText': ['みお',
              'あとはドラマチックな展開あってのフレンズ結成ね。',
              'そう…ラブミーティアの二人みたいに。'
              ],
  'SetNextSceneName':'scene26'
}

scene26 = {
  'SetText': ['',
              'ラブミーティアの結成について復習しておく？'
              ],
  'SetNextSceneName':'scene27'
}

scene27 = {
  'SetChoiceScene': [" ▶︎ はい","scene28"," ▶︎ いいえ","scene38"],
}

scene28 = {
  AddPlayerStatusFlag:["ラブミーティア結成を復習",!0],
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '6.png',
  'SetText': ['みお',
              'ラブミーティアのドラマチック極まりない結成エピソードは　もはや伝説。',
              'いえ、アイカツ界における神話とすらなっている。'
              ],
  'SetNextSceneName':'scene29'
}

scene29 = {
  'SetCharactorRight': 'mirai.png',
  'SetCharactorLeft': 'karen.png',
  'DeleteBG':"",
  'SetBackGroundImage': '27.png',
  'SetText': ['みお',
              'スターハーモニー学園に入ってトップアイドルに駆け上がったカレンさんとミライさん。',
              '二人は出会ってすぐに意気投合したのだけど　フレンズ結成にはあと一歩踏み込めないでいた。'
              ],
  'SetNextSceneName':'scene30'
}

scene30 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '7.png',
  'SetText': ['みお',
              'そんなとき　二人を揺るがす大事件が！'
              ],
  'SetNextSceneName':'scene31'
}

scene31 = {
  'SetCharactorRight': 'karen.png',
  'DeleteBG':"",
  'SetBackGroundImage': 'airport.png',
  'SetText': ['みお',
              'カレンさんは世界的プロデューサーからアイドルとしてプロデュースしたいというオファーを受けてアメリカに旅立つことになったのだ。'
              ],
  'SetNextSceneName':'scene32'
}

scene32 = {
  'SetCharactorLeft': 'mirai.png',
  'SetText': ['ミライ',
              'カレン！',
              'ハァ…ハァ…ハァ…。'
              ],
  'SetNextSceneName':'scene33'
}

scene33 = {
  'SetText': ['カレン',
              'ミライさん…。'
              ],
  'SetNextSceneName':'scene34'
}

scene34 = {
  'SetText': ['ミライ',
              'アメリカになんて行かせない。カレンをいちばん輝かせることができるのは…。',
              '私なんだから！'
              ],
  'SetNextSceneName':'scene35'
}

scene35 = {
  'SetText': ['カレン',
              '…！',
              'はい 知ってました。'
              ],
  'SetNextSceneName':'scene36'
}

scene36 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '8.png',
  'SetText': ['みお',
              'こうして二人はラブミーティアを結成したのであった…。'
              ],
  'SetNextSceneName':'scene37'
}

scene37 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '9.png',
  'SetText': ['みお',
              'う～っ…ハァ！何度読んでもやっぱりいい！！ずっと憧れていた…。私もフレンズを組むならこんなふうにドラマチックにって。'
              ],
  'SetNextSceneName':'scene38'
}

scene38 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '5.png',
  'SetCharactorRight': 'mio2.png',
  'SetText': ['みお',
              'ドラマチックな告白か…。',
              'う〜ん…　考えてみると難しい。',
              '自分がやるとなると想像がつかないというか。'
              ],
  'SetNextSceneName':'scene39'
}

scene39 = {
  'SetChoiceScene': [" ▶︎ ココちゃんに相談してみましょう。","scene40"," ▶︎ 諦める","scene0"],
}


scene40 = {
  'SetText': ['みお',
              'ハロー　ココちゃん。'
              ],
  'SetNextSceneName':'scene41'
}

scene41 = {
  'SetCharactorLeft': 'koko1.png',
  'SetText': ['ココ',
              'ココだよ。'
              ],
  'SetNextSceneName':'scene42'
}

scene42 = {
  'SetChoiceScene': [" ▶︎ フレンズの誘い方を教えて。","scene0"," ▶︎ ドラマチックな告白について教えて。","scene43"," ▶︎ あいねのアイカツモバイルを盗聴して。","scene42_1"],
}

scene42_1 = {
  AddPlayerStatusFlag:["盗聴を決意",!0],
  'SetText': ['みお',
              'あいねのアイカツモバイルを盗聴して。'
              ],
  'SetNextSceneName':'scene44'
}

scene42_2 = {
  SelectMethodHasTrue:["盗聴を決意 ==true","scene42_3","scene45"]
},

scene42_3 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko17.png',
  'SetText': ['ココ',
              'え～っ！？アイカツモバイルを盗聴！？あいねちゃんの！？どうして！？'
              ],
  'SetNextSceneName':'scene42_4'
}

scene42_4 = {
  'SetText': ['みお',
              'あいねとフレンズになるためのドラマチックな告白を成功させるのに必要なの。'
              ],
  'SetNextSceneName':'scene42_5'
}

scene42_5 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko18.png',
  'SetText': ['ココ',
              'う〜ん、それでどうして盗聴が必要になるのかなぁ？'
              ],
  'SetNextSceneName':'scene42_6'
}

scene42_6 = {
  'SetText': ['みお',
              'あいねの趣味、生活を完璧に理解してあいねが喜ぶ完璧なエスコートをするためよ。'
              ],
  'SetNextSceneName':'scene42_7'
}

scene42_7 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko19.png',
  'SetText': ['ココ',
              'えぇ…',
              '悪いけど、それはココが協力できることじゃないよ。'
              ],
  'SetNextSceneName':'scene42_7_2'
}

scene42_7_2 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko20.png',
  'SetText': ['ココ',
              'ごめんなさい！'
              ],
  'SetNextSceneName':'scene42_8'
}

scene42_8 = {
  'SetText': ['みお',
              'う〜ん、それじゃあ、盗聴機を仕込むしかないわね…何かいい方法は…'
              ],
  'SetNextSceneName':'scene42_9'
}

scene42_9 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko1.png',
  'SetText': ['ココ',
              '…お友達どうしでアクセサリーを持つのが流行ってるみたいだよ。',
              '２つがそろうと１つになるデザインが人気みたいだね。'
              ],
  'SetNextSceneName':'scene42_10'
}

scene42_10 = {
  'SetText': ['みお',
              'なるほど、それに仕込めば…',
              '早速製作に取り掛かりましょう。'
              ],
  'SetNextSceneName':'scene42_11'
}

scene42_11 = {
  'SetText': ['ココ',
              '…関係ないけど、ペットが迷子になった時のための首輪につけられる小さなGPS発信機っていうのもあるみたいだね。',
              'それがあれば、ココにも場所が表示できるよ。'
              ],
  'SetNextSceneName':'scene42_12'
}

scene42_12 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetBackGroundImage': '44.png',
  'SetText': ['ココ',
              'こんな風に。'
              ],
  'SetNextSceneName':'scene87'
}

scene42_13 = {
    SelectMethodHasTrue:["盗聴を決意 ==true","scene42_14","scene88"]
  },

scene42_14 = {
  'DeleteBG':"",
  'SetBackGroundImage': '45.png',
  'SetText': ['',
              '後日、アクセサリーを渡すことに成功したみおちゃんは、それからしばらくして幸せなフレンズ生活をおくったのであった…。'
              ],
  'SetNextSceneName':'titlescene_back'
}

scene43 = {
  'SetText': ['みお',
              'ドラマチックな告白について教えて。'
              ],
  'SetNextSceneName':'scene44'
}

scene44 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko2.png',
  'SetText': ['ココ',
              'ココろえ…'
              ],
  'SetNextSceneName':'scene42_2'
}

scene45 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko3.png',
  'SetText': ['ココ',
              'え～っ！？ドラマチックな告白？'
              ],
  'SetNextSceneName':'scene46'
}

scene46 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko4.png',
  'SetText': ['ココ',
              'そ…それって恋愛について知りたいってことだよね？'
              ],
  'SetNextSceneName':'scene47'
}

scene47 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko5.png',
  'SetText': ['ココ',
              'さすがみおちゃん大人だ！'
              ],
  'SetNextSceneName':'scene48'
}

scene48 = {
  'SetChoiceScene': [" ▶︎ はい","scene0"," ▶︎ いいえ","scene49"],
}

scene49 = {
  'SetText': ['みお',
              '違う違う。フレンズになってくださいってドラマチックに告白するにはってこと。'
              ],
  'SetNextSceneName':'scene50'
}

scene50 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko6.png',
  'SetText': ['ココ',
              'あっ…'
              ],
  'SetNextSceneName':'scene51'
}

scene51 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko7.png',
  'SetText': ['ココ',
              'そういうことか。'
              ],
  'SetNextSceneName':'scene52'
}

scene52 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko1.png',
  'SetText': ['ココ',
              'ドラマチックな告白で検索。'
              ],
  'SetNextSceneName':'scene53'
}

scene53 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko8.png',
  'SetText': ['ココ',
              'あっ。'
              ],
  'SetNextSceneName':'scene54'
}

scene54 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko1.png',
  'SetText': ['ココ',
              'こんな結果が出たよ。'
              ],
  'SetNextSceneName':'scene55'
}

scene55 = {
  'SetText': ['みお',
              '映画館で　ドラマチックに…。'
              ],
  'SetNextSceneName':'scene56'
}

scene56 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '10.png',
  'SetText': ['イメージ',
              '(なぜか他に客がいない映画館)'
              ],
  'SetNextSceneName':'scene57'
}

scene57 = {
  'DeleteBG':"",
  'SetBackGroundImage': '11.png',
  'SetText': ['イメージ',
              '(おそらくペンギンが二時間ほどかっこつけるだけの映画)'
              ],
  'SetNextSceneName':'scene58'
}

scene58 = {
  'DeleteBG':"",
  'SetBackGroundImage': '12.png',
  'SetText': ['イメージ',
              '(突然途切れる映像)'
              ],
  'SetNextSceneName':'scene59'
}

scene59 = {
  'DeleteBG':"",
  'SetBackGroundImage': '13.png',
  'SetText': ['映像　みお',
              'あいね　私とフレンズになりましょう。'
              ],
  'SetNextSceneName':'scene60'
}

scene60 = {
  'DeleteBG':"",
  'SetBackGroundImage': '14.png',
  'SetText': ['あいね',
              'わぁ…'
              ],
  'SetNextSceneName':'scene61'
}

scene61 = {
  'DeleteBG':"",
  'SetBackGroundImage': '15.png',
  'SetText': ['あいね',
              'うん！！'
              ],
  'SetNextSceneName':'scene62'
}

scene62 = {
  'SetChoiceScene': [" ▶︎ うん！　これよ！！","scene0"," ▶︎ いや…　ないわね。","scene63"],
}

scene63 = {
  'DeleteBG':"",
  'SetBackGroundImage': '5.png',
  'SetCharactorRight': 'mio2.png',
  'SetCharactorLeft': 'koko1.png',
  'SetText': ['みお',
              'いや…　ないわね。'
              ],
  'SetNextSceneName':'scene64'
}

scene64 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko9.png',
  'SetText': ['ココ',
              'そっか。'
              ],
  'SetNextSceneName':'scene65'
}

scene65 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko10.png',
  'SetText': ['ココ',
              'だったら…。'
              ],
  'SetNextSceneName':'scene66'
}

scene66 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko11.png',
  'SetText': ['ココ',
              'う〜ん…。'
              ],
  'SetNextSceneName':'scene67'
}

scene67 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko8.png',
  'SetText': ['ココ',
              '(ピコン)'
              ],
  'SetNextSceneName':'scene68'
}

scene68 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko1.png',
  'SetText': ['みお',
              'ゲーム感覚でドラマチックに…。'
              ],
  'SetNextSceneName':'scene69'
}

scene69 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '16.png',
  'SetText': ['イメージ　あいね',
              '失礼しま〜す。'
              ],
  'SetNextSceneName':'scene70'
}

scene70 = {
  'DeleteBG':"",
  'SetBackGroundImage': '17.png',
  'SetText': ['あいね',
              'あっ…。'
              ],
  'SetNextSceneName':'scene71'
}

scene71 = {
  'DeleteBG':"",
  'SetBackGroundImage': '18.png',
  'SetText': ['',
              '(中庭)'
              ],
  'SetNextSceneName':'scene72'
}

scene72 = {
  'DeleteBG':"",
  'SetBackGroundImage': '19.png',
  'SetText': ['',
              '(レッスンルーム)'
              ],
  'SetNextSceneName':'scene73'
}

scene73 = {
  'DeleteBG':"",
  'SetBackGroundImage': '20.png',
  'SetText': ['あいね',
              'あっ…。'
              ],
  'SetNextSceneName':'scene74'
}

scene74 = {
  'DeleteBG':"",
  'SetBackGroundImage': '21.png',
  'SetText': ['あいね',
              'ん…。'
              ],
  'SetNextSceneName':'scene75'
}

scene75 = {
  'DeleteBG':"",
  'SetBackGroundImage': '22.png',
  'SetText': ['みお',
              'あいね　私と　フレンズになりましょう。'
              ],
  'SetNextSceneName':'scene76_1'
}

scene76 = {
  'DeleteBG':"",
  'SetBackGroundImage': '23.png',
  'SetText': ['あいね',
              'わ〜っ…　うん！！'
              ],
  'SetNextSceneName':'scene77'
}

scene76_1 = {
    SelectMethodHasTrue:["解説を希望 ==true","scene76_2","scene76"]
}

scene76_2 = {
  'SetText': ['',
              '(ちなみに、薔薇の花言葉はその本数によって異なり、12本は「私と付き合ってください」である)'
              ],
  'SetNextSceneName':'scene76'
}

scene77 = {
  'SetChoiceScene': [" ▶︎ うん！　これよ！！","scene0"," ▶︎ 意味をはき違えているような…","scene78"],
}

scene78 = {
  'DeleteBG':"",
  'SetBackGroundImage': '5.png',
  'SetCharactorRight': 'mio2.png',
  'SetText': ['みお',
              'いや…　これって　ドラマチックの意味をはき違えているような…'
              ],
  'SetNextSceneName':'scene79'
}

scene79 = {
  'SetCharactorLeft': 'koko12.png',
  'SetText': ['ココ',
              'う〜っ…　ココにも意地があるもん。',
              'みおちゃんが満足する答えを　必ず見つけてみせるんだから！'
              ],
  'SetNextSceneName':'scene80'
}

scene80 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko13.png',
  'SetText': ['ココ',
              'う〜ん…。'
              ],
  'SetNextSceneName':'scene81'
}

scene81 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko14.png',
  'SetText': ['ココ',
              '°△°'
              ],
  'SetNextSceneName':'scene82'
}

scene82 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko15.png',
  'SetText': ['ココ',
              '出た出た　出ました〜！'
              ],
  'SetNextSceneName':'scene83'
}

scene83 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft': 'koko16.png',
  'SetText': ['ココ',
              '最高にドラマチックな告白ができるスポットを見つけたよ！'
              ],
  'SetNextSceneName':'scene84'
}

scene84 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '24.png',
  'SetText': ['ココ',
              'この観覧車でゴンドラが一番高くなったところで告白すると'
              ],
  'SetNextSceneName':'scene85'
}

scene85 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '25.png',
  'SetText': ['ココ',
              '二人はず〜っと　幸せになれるんだって。'
              ],
  'SetNextSceneName':'scene86'
}

scene86 = {
  'SetChoiceScene': [" ▶︎ うん！　これよ！！","scene87"," ▶︎ いや…　これって男女の恋愛じゃ…","scene0"],
}

scene87 = {
  'DeleteBG':"",
  'SetBackGroundImage': '26.png',
  'SetText': ['みお',
              'うん！　これよ！！'
              ],
  'SetNextSceneName':'scene42_13'
}

scene88 = {
  'DeleteBG':"",
  'SetBackGroundImage': '27.png',
  'SetText': ['',
              '後日'
              ],
  'SetNextSceneName':'scene89'
}

scene89 = {
'SetCharactorLeft': 'aine2.png',
'SetCharactorRight': 'mio2.png',
  'SetText': ['あいね',
              'うわ〜っ　うれしい！',
              'みおちゃんと　遊びにいけるなんて楽しみだな。'
              ],
  'SetNextSceneName':'scene90'
}

scene90 = {
  'SetText': ['みお',
              '今度の土曜　休みが取れたから　久しぶりに　あいねと…。'
              ],
  'SetNextSceneName':'scene91'
}

scene91 = {
  'SetText': ['あいね',
              '今度の土曜…。'
              ],
  'SetNextSceneName':'scene92'
}

scene92 = {
  'SetText': ['みお',
              'もしかして　何か用事があった？'
              ],
  'SetNextSceneName':'scene93'
}

scene93 = {
  'SetText': ['あいね',
              'うん…　ブランド選びのときに　友達になった　なこちゃんがこっちに来るから　会おうって約束したの。'
              ],
  'SetNextSceneName':'scene94'
}

scene94 = {
  'SetText': ['みお',
              'なこちゃんって　名古屋で　アイカツしてる子ね？'
              ],
  'SetNextSceneName':'scene95'
}

scene95 = {
  'DeleteCharactor':"",
  'DeleteBG':"",
  'SetBackGroundImage': '28.png',
  'SetText': ['あいね',
              'うん！　友達になってから　ずっと　やり取りしてたんだ。'
              ],
  'SetNextSceneName':'scene96'
}

scene96 = {
  'SetText': ['みお',
              'あいねと会って相談がしたい…。'
              ],
  'SetNextSceneName':'scene97'
}

scene97 = {
  'SetText': ['あいね',
              'うん　何だろうね？'
              ],
  'SetNextSceneName':'scene98'
}

scene98 = {
'DeleteBG':"",
'SetBackGroundImage': '27.png',
'SetCharactorLeft': 'aine2.png',
'SetCharactorRight': 'mio2.png',
  'SetText': ['みお',
              'あっ…。'
              ],
  'SetNextSceneName':'scene99'
}

scene99 = {
'DeleteBG':"",
'SetBackGroundImage': '29.png',
'SetCharactorLeft': 'aine3.png',
  'SetText': ['みお',
              '(相談って　まさか…)'
              ],
  'SetNextSceneName':'scene100'
}

scene100 = {
  'DeleteCharactorl':"",
  'DeleteBG':"",
  'SetBackGroundImage': '27.png',
  'SetText': ['あいね',
              'そうだ。　なこちゃんと私たち三人で遊びにいこうよ。'
              ],
  'SetNextSceneName':'scene101'
}

scene101 = {
  'SetChoiceScene': [" ▶︎ そうね。","scene87"," ▶︎ あいねを誑かすなんて許せない","scene0"," ▶︎ 相談があるなら二人の方がいいでしょう","scene102"],
}

scene102 = {
  'SetText': ['みお',
              'ううん。',
              '相談があるなら　二人の方がいいでしょう？'
              ],
  'SetNextSceneName':'scene103'
}

scene103 = {
  'DeleteBG':"",
  'DeleteCharactorf':"",
  'SetBackGroundImage': '3.png',
  'SetText': ['',
              '土曜日'
              ],
  'SetNextSceneName':'scene104'
}

scene104 = {
  'SetChoiceScene': [" ▶︎ (今日は計画を練りましょう)","scene0"," ▶︎ (今日は二人をストーキングね)","scene105"],
}

scene105 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetBackGroundImage': '30.png',
  'SetText': ['',
              '駅前'
              ],
  'SetNextSceneName':'scene106'
}

scene106 = {
  'SetCharactorRight': 'nako.png',
  'SetText': ['海老原なこ',
              'わぁ。'
              ],
  'SetNextSceneName':'scene107'
}

scene107 = {
  'SetCharactorLeft': 'aine2.png',
  'SetText': ['あいね',
              'お〜い！なこちゃん！'
              ],
  'SetNextSceneName':'scene108'
}

scene108 = {
  'SetText': ['なこ',
              'あいねちゃん！',
              '久しぶり！ウフフ。'
              ],
  'SetNextSceneName':'scene109'
}

scene109 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetBackGroundImage': '31.png',
  'SetText': ['みお',
              '(わざわざ　こっちに来てまで　相談したい事ってあいねとフレンズを組みたいって事なんじゃ…)',
              'あいね…。'
              ],
  'SetNextSceneName':'scene110'
}

scene110 = {
  'DeleteBG':"",
  'SetBackGroundImage': '32.png',
  'SetText': ['なこ',
              'あいねちゃんちのカフェか。',
              '一度　来てみたかったんだよね。'
              ],
  'SetNextSceneName':'scene111'
}

scene111 = {
  'DeleteBG':"",
  'SetBackGroundImage': '33.png',
  'SetText': ['山下公園',
              'その後も街を巡る二人。'
              ],
  'SetNextSceneName':'scene112'
}

scene112 = {
  'SetText': ['みお',
              '(ちょっと距離が出来てきたわね…)'
              ],
  'SetNextSceneName':'scene113'
}

scene113 = {
  'SetChoiceScene': [" ▶︎ もっと詰め寄りましょう","scene0"," ▶︎ 持ってきた望遠鏡を使いましょう","scene114"],
}

scene114 = {
  'DeleteBG':"",
  'SetBackGroundImage': '34.png',
  'SetText': ['みお',
              'これって…。'
              ],
  'SetNextSceneName':'scene115'
}

scene115 = {
  'DeleteBG':"",
  'SetBackGroundImage': '35.png',
  'SetText': ['みお',
              'フレンズ結成の流れにしか見えないんだけど。'
              ],
  'SetNextSceneName':'scene116'
}

scene116 = {
  SelectMethodHasTrue:["解説を希望 ==true","scene116_1","scene116_2"]
},

scene116_1 = {
  'DeleteBG':"",
  'SetBackGroundImage': '36.png',
  'SetText': ['赤レンガ倉庫',
              '(それっぽく加工していますが、実際の赤レンガ倉庫からは観覧車は見えません。)'
              ],
  'SetNextSceneName':'scene117'
}

scene116_2 = {
  'DeleteBG':"",
  'SetBackGroundImage': '36.png',
  'SetText': ['',
              '赤レンガ倉庫'
              ],
  'SetNextSceneName':'scene117'
}

scene117 = {
  'SetCharactorLeft': 'aine2.png',
  'SetCharactorRight': 'nako.png',
  'SetText': ['なこ',
              'うわ〜っ…。',
              '綺麗…。'
              ],
  'SetNextSceneName':'scene118'
}

scene118 = {
  'SetText': ['あいね',
              'でしょう？',
              'なこちゃんにもこの景色を見せたかったんだ。'
              ],
  'SetNextSceneName':'scene119'
}

scene119 = {
  'DeleteCharactor':"",
  'SetCharactorLeft':'mio2.png',
  'SetText': ['みお',
              'ここって…。',
              '(ココちゃんが言ってた観覧車…)',
              '(あいねとなこちゃんもそれを知ってて…)'
              ],
  'SetNextSceneName':'scene120'
}

scene120 = {
  'DeleteCharactor':"",
  'SetCharactorLeft': 'aine2.png',
  'SetCharactorRight': 'nako.png',
  'SetText': ['なこ',
              'それでね、あいねちゃんに相談なんだけど。'
              ],
  'SetNextSceneName':'scene121'
}

scene121 = {
  'SetText': ['あいね',
              'うん。'
              ],
  'SetNextSceneName':'scene122'
}

scene122 = {
  'SetText': ['なこ',
              '名古屋と東京で離れていてもフレンズになれるかな？'
              ],
  'SetNextSceneName':'scene123'
}

scene123 = {
  'DeleteCharactor':"",
  'SetCharactorLeft':'mio2.png',
  'SetText': ['みお',
              'あっ…。'
              ],
  'SetNextSceneName':'scene124'
}

scene124 = {
  'DeleteCharactor':"",
  'SetCharactorLeft': 'aine2.png',
  'SetCharactorRight': 'nako.png',
  'SetText': ['あいね',
              'うん！　気持ちがつながっていればきっとなれるよ。'
              ],
  'SetNextSceneName':'scene125'
}

scene125 = {
  'DeleteCharactor':"",
  'SetCharactorLeft':'mio2.png',
  'SetText': ['みお',
              '…。',
              '(本当に…それでいいの？)',
              ],
  'SetNextSceneName':'scene126'
}

scene126 = {
  'SetChoiceScene': [" ▶︎ それでいい","scene0"," ▶︎ 殺してでも　うばいとる","scene126_1"," ▶︎ 普通に奪い取る","scene127"],
}

scene126_1 = {
  AddPlayerStatusFlag:["包丁を装備",!0],
  'DeleteCharactor':"",
  'SetCharactorLeft':'mio4.png',
  'SetCharactorRight':'nako.png',
  'SetText': ['みお',
              'あいねは渡さない！',
              ],
  'SetNextSceneName':'scene126_2'
}

scene126_2 = {
  'SetText': ['なこ',
              'えっ？',
              ],
  'SetNextSceneName':'scene126_3'
}

scene126_3 = {
  'DeleteCharactorl':"",
  'SetCharactorRight':'aine2.png',
  'SetText': ['あいね',
              'みおちゃん？どうしてここに？',
              ],
  'SetNextSceneName':'scene126_4'
}

scene126_4 = {
  'SetText': ['みお',
              'どいてあいねそいつ殺せない',
              'あいねとフレンズになるのは私…！',
              'そのためには邪魔なその女を殺すしかないのよ！'
              ],
  'SetNextSceneName':'scene126_5'
}

scene126_5 = {
  'DeleteCharactor':"",
  'SetCharactorLeft':'The Wandering Doomed.png',
  'SetCharactorRight':'mio4.png',
  'SetText': ['さまよえる亡者',
              '亡者はそうは思いません。'
              ],
  'SetNextSceneName':'scene126_6'
}

scene126_6 = {
  'DeleteCharactor':"",
  'SetCharactorRight':'The Wandering Doomed.png',
  'SetCharactorLeft':'power.png',
  'SetText': ['かばん',
              'そうですよ。力だけでは何も解決しないです。'
              ],
  'SetNextSceneName':'scene126_7'
}

scene126_7 = {
  'DeleteCharactorf':"",
    'SetCharactorRight':'aine2.png',
  'SetText': ['あいね',
              'かばんちゃん！亡者さんも！',
              'あれ。今日はサーバルちゃんは一緒じゃないの？'
              ],
  'SetNextSceneName':'scene126_7_2'
}

scene126_7_2 = {
  'SetText': ['かばん',
              'サーバルちゃんには今野菜を切ってもらってます。',
              'それよりも。'
              ],
  'SetNextSceneName':'scene126_8'
}

scene126_8 = {
  'DeleteCharactor':"",
  'SetCharactorLeft':'The Wandering Doomed.png',
  'SetCharactorRight':'mio4.png',
  'SetText': ['みお',
              'さああいね！'
              ],
  'SetNextSceneName':'scene126_8_2'
}

scene126_8_2 = {
  'DeleteCharactor':"",
  'SetCharactorRight':'The Wandering Doomed.png',
  'SetCharactorLeft':'power.png',
  'SetText': ['かばん',
              '聞こえてないみたいですね…。',
              ],
  'SetNextSceneName':'scene126_9'
}

scene126_9 = {
  'SetText': ['亡者',
              '…。',
              ],
  'SetNextSceneName':'scene126_10'
}

scene126_10 = {
  'SetText': ['かばん',
              '…。ここはあいねさんに説得してもらうしかないですね。',
              'ただ、あのままでは危険なので、僕がなんとかしておきますね。'
              ],
  'SetNextSceneName':'scene126_11'
}

scene126_11 = {
  'DeleteCharactor':"",
  'SetCharactorRight':'mio4.png',
  'SetCharactorLeft':'power2.png',
  'SetText': ['かばん',
              '(ｸﾝｯ)'
              ],
  'SetNextSceneName':'scene126_12'
}

scene126_12 = {
  'DeleteCharactorf':"",
  'SetCharactorRight':'mio6.png',
  'SetText': ['包丁',
              '(ﾒｷｮ)'
              ],
  'SetNextSceneName':'scene126_13'
}

scene126_13 = {
  'DeleteCharactor':"",
  'SetCharactorLeft':'power.png',
  'SetCharactorRight':'mio2.png',
  'SetText': ['みお',
              'あっ…包丁が…。'
              ],
  'SetNextSceneName':'scene126_14'
}

scene126_14 = {
  'DeleteCharactor':"",
  'SetCharactorLeft':'mio2.png',
  'SetCharactorRight':'aine2.png',
  'SetText': ['あいね',
              'みおちゃん。'
              ],
  'SetNextSceneName':'scene126_15'
}

scene126_15 = {
  'SetText': ['みお',
              'あいね…。'
              ],
  'SetNextSceneName':'scene126_16'
}

scene126_16 = {
  'SetText': ['あいね',
              'さっきの話　本当？'
              ],
  'SetNextSceneName':'scene126_17'
}

scene126_17 = {
  'SetText': ['みお',
              'えっ？'
              ],
  'SetNextSceneName':'scene126_18'
}

scene126_18 = {
  'SetText': ['あいね',
              '私とみおちゃんがフレンズになるって言ってた。'
              ],
  'SetNextSceneName':'scene126_19'
}

scene126_19 = {
  'SetText': ['みお',
              '…。',
              '…うん。',
              '私、あいねとフレンズになりたい。',
              'フレンズ組むのは、あいねしかいないの…。'
              ],
  'SetNextSceneName':'scene126_20'
}

scene126_20 = {
  'SetText': ['あいね',
              '嬉しい…。',
              '私も、みおちゃんとフレンズを組みたいってすっごくすっごく思ってた。'
              ],
  'SetNextSceneName':'scene126_21'
}

scene126_21 = {
  'SetText': ['みお',
              'あいね…。'
              ],
  'SetNextSceneName':'scene157'
}

scene127 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetBackGroundImage': '37.png',
  'SetText': ['みお',
              '(私のフレンズはあいねしかいない。)',
              '(この気持ちに嘘はつけない！)'
              ],
  'SetNextSceneName':'scene128'
}

scene128 = {
  'SetText': ['あいね',
              'えっ？　み…みおちゃん？'
              ],
  'SetNextSceneName':'scene129'
}

scene129 = {
  'SetText': ['なこ',
              'えっ？'
              ],
  'SetNextSceneName':'scene130'
}

scene130 = {
  'DeleteBG':"",
  'SetBackGroundImage': '38.png',
  'SetText': ['みお',
              '来て…　あいね！'
              ],
  'SetNextSceneName':'scene131'
}

scene131 = {
  'DeleteBG':"",
  'SetBackGroundImage': '39.png',
  'SetText': ['あいね',
              'えっ？え〜！？'
              ],
  'SetNextSceneName':'scene132'
}

scene132 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetCharactorLeft': 'nako.png',
  'SetBackGroundImage': '36.png',
  'SetText': ['なこ',
              '…？'
              ],
  'SetNextSceneName':'scene133'
}

scene133 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetCharactorLeft': 'aine2.png',
  'SetCharactorRight': 'mio2.png',
  'SetBackGroundImage': '40.png',
  'SetText': ['あいね',
              'みおちゃんどうしてここに？'
              ],
  'SetNextSceneName':'scene134'
}

scene134 = {
  'SetText': ['みお',
              'あいねにどうしても伝えたいことがあるの。'
              ],
  'SetNextSceneName':'scene135_a'
}

scene135_a = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetBackGroundImage': '43.png',
  'SetText': ['観覧車',
              ''
              ],
  'SetNextSceneName':'scene135'
}

scene135 = {
  'DeleteBG':"",
  'SetCharactorLeft': 'aine2.png',
  'SetCharactorRight': 'mio2.png',
  'SetBackGroundImage': '41.png',
  'SetText': ['あいね',
              'ねぇねぇ　伝えたいことって何？何？何？'
              ],
  'SetNextSceneName':'scene136'
}

scene136 = {
  'SetText': ['みお',
              '…！',
              '(勢いで連れて来ちゃったけど、観覧車ってこんなに遅いの？)',
              '(一番上までどれくらいかかるのよ…)'
              ],
  'SetNextSceneName':'scene137'
}

scene137 = {
  'SetText': ['あいね',
              '早く聞かせてよ〜！みおちゃん！'
              ],
  'SetNextSceneName':'scene138'
}

scene138 = {
  'SetChoiceScene': [" ▶︎ もうちょっと待って","scene139"," ▶︎ ドラマチックとかどうでもいい！","scene0"],
}

scene139 = {
  'SetText': ['みお',
              'も…もうちょっと待って。'
              ],
  'SetNextSceneName':'scene140'
}

scene140 = {
  'SetText': ['あいね',
              'え〜！もったいつけられると余計気になるよ〜！',
              '教えて教えてー！'
              ],
  'SetNextSceneName':'scene141'
}

scene141 = {
  'SetText': ['みお',
              'ちょっ…　あっ！'
              ],
  'SetNextSceneName':'scene142'
}

scene142 = {
  'SetText': ['あいね',
              'アイカツカード…？',
              'これってみおちゃんがデザインしたドレスだよね？'
              ],
  'SetNextSceneName':'scene143'
}

scene143 = {
  'SetChoiceScene': [" ▶︎ …","scene0"," ▶︎ そうよ…","scene144"],
}

scene144 = {
  'SetText': ['みお',
              'そうよ…',
              'あいねのためにデザインしたの。'
              ],
  'SetNextSceneName':'scene145'
}

scene145 = {
  'SetText': ['あいね',
              '私のため？'
              ],
  'SetNextSceneName':'scene146'
}

scene146 = {
  'SetChoiceScene': [" ▶︎ …","scene0"," ▶︎ ドラマチックとかどうでもいい！","scene147"],
}

scene147 = {
  'SetText': ['みお',
              'あ〜！もう！　こうなったらドラマチックとかどうでもいい！'
              ],
  'SetNextSceneName':'scene148'
}

scene148 = {
  'SetText': ['あいね',
              'みおちゃん　立つと危ないよ！'
              ],
  'SetNextSceneName':'scene149'
}

scene149 = {
  'SetText': ['みお',
              'あいね…。',
              '私とフレンズになって。'
              ],
  'SetNextSceneName':'scene150'
}

scene150 = {
  'SetText': ['あいね',
              'え…'
              ],
  'SetNextSceneName':'scene150_2'
}

scene150_2 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  SelectMethodHasTrue:["ラブミーティア結成を復習 ==true","scene151","scene152"]
},

scene151 = {
  'SetBackGroundImage': '42.png',
  'SetText': ['汽笛',
              'ボー'
              ],
  'SetNextSceneName':'scene152'
}

scene152 = {
  'DeleteBG':"",
  'SetCharactorLeft': 'aine2.png',
  'SetCharactorRight': 'mio2.png',
  'SetBackGroundImage': '41.png',
  'SetText': ['あいね',
              '…'
              ],
  'SetNextSceneName':'scene153'
}

scene153 = {
  'SetText': ['みお',
              '(そっか…)',
              '(そうよね。あいねはなこちゃんと…)'
              ],
  'SetNextSceneName':'scene154'
}

scene154 = {
  'SetText': ['あいね',
              'うわ〜っ！嬉しい！',
              'ありがとう！みおちゃん！',
              '私もみおちゃんとフレンズになりたいってすっごくすっごく思ってた！'
              ],
  'SetNextSceneName':'scene155_0'
}

scene155_0 = {
  SelectMethodHasTrue:["包丁を装備 ==true","scene157","scene155_1"]
},

scene155_1 = {
  SelectMethodHasTrue:["即決 ==true","scene173","scene155"]
},

scene155 = {
  'SetText': ['みお',
              'あいね…'
              ],
  'SetNextSceneName':'scene156'
}

scene156 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetBackGroundImage': '46.png',
  'SetText': ['(ココ)',
              '(この観覧車でゴンドラが一番高くなったところで告白すると二人はず〜っと　幸せになれるんだって。)'
              ],
  'SetNextSceneName':'scene157'
}

scene157 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetCharactorRight': 'nako.png',
  'SetCharactorLeft':'aine2.png',
  'SetBackGroundImage': '36.png',
  'SetText': ['なこ',
              'フレンズ結成おめでとう！あいねちゃん。'
              ],
  'SetNextSceneName':'scene158'
}

scene158 = {
  'SetText': ['あいね',
              'うん！ありがとう。'
              ],
  'SetNextSceneName':'scene159'
}

scene159 = {
  'SetText': ['なこ',
              'ほんとよかったね、あいねちゃんみおちゃんとフレンズになる為にすごく頑張ってたもんね。'
              ],
  'SetNextSceneName':'scene160'
}

scene160 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft':'mio2.png',
  'SetText': ['みお',
              'え。'
              ],
  'SetNextSceneName':'scene161'
}

scene161 = {
  'SetText': ['なこ',
              '目指せ　ランニング100万キロ！とか。'
              ],
  'SetNextSceneName':'scene162'
}

scene162 = {
  'DeleteCharactorl':"",
  'SetCharactorLeft':'aine2.png',
  'SetText': ['あいね',
              'わ〜っ　わ〜っ　わ〜っ！',
              'それ　みおちゃんに言っちゃだめ！'
              ],
  'SetNextSceneName':'scene163'
}

scene163 = {
  'DeleteCharactorf':"",
  'SetCharactorRight':'mio2.png',
  'SetText': ['みお',
              '100万キロって地球何十周分よ？'
              ],
  'SetNextSceneName':'scene164'
}

scene164 = {
  SelectMethodHasTrue:["解説を希望 ==true","scene165","scene166"]
},

scene165 = {
  'SetText': ['',
              '(25周分です。多分。)'
              ],
  'SetNextSceneName':'scene166'
}

scene166 = {
  'DeleteCharactor':"",
  'SetCharactorLeft':'mio2.png',
  'SetCharactorRight':'nako.png',
  'SetText': ['みお',
              'ごめんね。なこちちゃんもあいねとフレンズを…。'
              ],
  'SetNextSceneName':'scene167'
}

scene167 = {
  'SetText': ['着信音',
              '(ピロリ)'
              ],
  'SetNextSceneName':'scene167_2'
}

scene167_2 = {
  'SetText': ['なこ',
              'あっ仕事終わったからこれから会おう。',
              'よ〜し！　あいねちゃんのおかげで勇気出たし、私もフレンズ組もうって申し込んでみるよ。',
              'また遊ぼうね、あいねちゃん！'
              ],
  'SetNextSceneName':'scene168'
}

scene168 = {
  SelectMethodHasTrue:["解説を希望 ==true","scene169","scene170"]
}

scene169 = {
  'SetText': ['',
              '(個人的にここであいねちゃんにしか話しかけてないのがツボ。)',
              '(というか、フレンズを組んで活動するようになっても、ファンからあいねちゃんの名前が呼ばれることはあってもみおちゃんが呼ばれることはほぼない…)',
              '(学園のトップアイドルなのに、それでいいのか…でもそんなみおちゃんが好き。)'
              ],
  'SetNextSceneName':'scene170'
}

scene170 = {
  'DeleteCharactor':"",
  'SetCharactorLeft':'mio2.png',
  'SetCharactorRight':'aine2.png',
  'SetText': ['みお',
              'えっと…　どういうこと？'
              ],
  'SetNextSceneName':'scene171'
}

scene171 = {
  'SetText': ['あいね',
              'なこちゃん　この間イベントで知り合った子とすっごく仲良くなって　そのことフレンズを組みたいって思ってたんだけど',
              'なこちゃんは中学を卒業するまで名古屋にいるつもりだから　遠距離フレンズがうまくいくか不安だった見たい。'
              ],
  'SetNextSceneName':'scene172'
}

scene172 = {
  'SetText': ['みお',
              '…',
              'そういうことか。'
              ],
  'SetNextSceneName':'scene173'
}

scene173 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetBackGroundImage': '47.png',
  'SetText': ['パシフィコ横浜',
              '(フレンズ結成お披露目ライブ)'
              ],
  'SetNextSceneName':'scene174'
}

scene174 = {
  'DeleteBG':"",
  'SetCharactorRight':'mio2.png',
  'SetCharactorLeft':'aine2.png',
  'SetBackGroundImage': '48.png',
  'SetText': ['みお',
              'ここからだよ。'
              ],
  'SetNextSceneName':'scene175'
}

scene175 = {
  'SetText': ['あいね',
              'うん。'
              ],
  'SetNextSceneName':'scene176'
}

scene176 = {
  'SetText': ['みお',
              'ここから、私たちのアイカツの、新しい一歩がスタートする。'
              ],
  'SetNextSceneName':'scene177'
}

scene177 = {
  'SetText': ['あいね',
              'なんか緊張する…。でも…',
              'みおちゃんとフレンズを組めばきっとすごいことが起きるってすっごくドキドキしてるんだ。'
              ],
  'SetNextSceneName':'scene178'
}

scene178 = {
  SelectMethodHasTrue:["ラブミーティア結成を復習 ==true","scene179","scene180"]
},

scene179 = {
  'SetChoiceScene': [" ▶︎ ええ。","scene182"," ▶︎ 私もそう思う。","scene183"," ▶︎ うん　知ってた。","scene181"],
}

scene180 = {
  'SetChoiceScene': [" ▶︎ ええ。","scene182"," ▶︎ 私もそう思う。","scene183"," ▶︎ ワイトもそう思います。","scene184"],
}

scene181 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetBackGroundImage': '50.png',
  'SetText': ['みお',
              'うん　知ってた。'
              ],
  'SetNextSceneName':'scene185'
}

scene182 = {
  'SetText': ['みお',
              'ええ。'
              ],
  'SetNextSceneName':'scene185'
}

scene183 = {
  'SetText': ['みお',
              '私もそう思う。'
              ],
  'SetNextSceneName':'scene185'
}

scene184 = {
  'DeleteCharactor':"",
  'SetCharactorRight':'Skull Servant.png',
  'SetText': ['ワイト',
              'ワイトもそう思います。'
              ],
  'SetNextSceneName':'scene185'
}

scene185 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetBackGroundImage': '49.png',
  'SetText': ['二人',
              '私たち　ピュアパレットです！'
              ],
  'SetNextSceneName':'scene186_0'
}

scene186_0 = {
  SelectMethodHasTrue:["包丁を装備 ==true","scene187","scene186"]
},

scene186 = {
  'DeleteCharactor':"",
  'SetText': ['',
              'クリア'
              ],
  'SetNextSceneName':'titlescene_back'
}

scene187 = {
  'SetCharactorLeft': 'power.png',
  'SetText': ['かばん',
              '素敵なライブだったね。'
              ],
  'SetNextSceneName':'scene188'
}

scene188 = {
  'SetCharactorRight':'Skull Servant.png',
  'SetText': ['ワイト',
              'ワイトもそう思います。'
              ],
  'SetNextSceneName':'scene189'
}

scene189 = {
  'DeleteCharactorl':"",
  'SetText': ['かばん',
              'もう大丈夫かな。'
              ],
  'SetNextSceneName':'scene190'
}

scene190 = {
  'DeleteCharactorf':"",
  'SetCharactorLeft':'power2.png',
  'SetText': ['かばん',
              '(ｸﾝｯ)'
              ],
  'SetNextSceneName':'scene191'
}

scene191 = {
  'DeleteCharactor':"",
  'SetCharactorLeft':'power.png',
  'SetCharactorRight':'serval.png',
  'SetText': ['サーバルキャット',
              'うみゃ？　かばんちゃん、今何したの？'
              ],
  'SetNextSceneName':'scene193'
}

scene193 = {
  'SetText': ['かばん',
              '包丁を元に戻したんだよ。',
              '道具は正しく使ってこそだからね。'
              ],
  'SetNextSceneName':'scene194'
}

scene194 = {
  'SetText': ['サーバル',
              'うみゃ〜…よくわかんないけど、かばんちゃん、やっぱりすごいね！'
              ],
  'SetNextSceneName':'scene195'
}

scene195 = {
  'SetText': ['かばん',
              'えへへ…。'
              ],
  'SetNextSceneName':'scene186'
}

dbscene = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetText': ['',
              'それなりに飛びます。'
              ],
  'SetNextSceneName':'scene110'
}

scene0 = {
  'DeleteBG':"",
  'DeleteCharactor':"",
  'SetText': ['',
              'ここから先は出来てません。'
              ],
  'SetNextSceneName':'titlescene_back'
}
