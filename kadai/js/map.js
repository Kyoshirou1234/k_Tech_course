//canvasの設定（せってい）
var canvas = document.getElementById( 'canvas' );
canvas.width = 830;		//canvasの横幅（よこはば）
canvas.height = 1000;	//canvasの縦幅（たてはば）

//コンテキストを取得（しゅとく）
var ctx = canvas.getContext( '2d' );

//マップチップのImageオブジェクトを作る
var mapchip = new Image();
mapchip.src = 'img/rich/pipo-map001.png';

var itemImage = new Image();
itemImage.src = 'img/rich/pipo-hikarimono007.png';

var warpImage = new Image();
warpImage.src = 'img/rich/pipo-hikarimono005.png';

var charImage = new Image();
charImage.src = "img/rich/pipo-halloweenchara2016_25.png";

var chara = new Object();
chara.x = 32;
chara.y = 32;
chara.move = 0;
chara.Width = 32; // キャラクターの幅
chara.Height = 32; // キャラクターの高さ
chara.speed = 4;
chara.life = 3;

//初期値ずれ
const ini_x = 30;
const ini_y = 30;

const item = 30;
var item_complete = false;
var item_get = 0;

const enemyNum = 3;
var x, y;
//enemy配列[Image,x,y,move,speed,pattern]
var enemy = new Array(enemyNum);
for(y = 0; y < enemyNum; y++) {
	enemy[y] = new Array(6);
  for(x = 0; x < 6; x++) {
    enemy[y][x] = 0;
  }
}

for(var e = 0; e < enemyNum; e++){
	enemy[e][0] = new Image();
	enemy[e][0].src = "img/rich/pipo-halloweenchara2016_21.png";
}

for(var e = 0; e < enemyNum; e++){
	enemy[e][4] = 4;
}

//マップの作成
var map = [
	[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
	[2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
	[2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
	[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
	[2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2],
	[2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
	[2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2],
	[2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2],
	[2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2],
	[2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 2],
	[2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2],
	[2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
	[2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2],
	[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
	[2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2],
	[2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2],
	[2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2],
	[2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2],
	[2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2],
	[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
	[2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
	[2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2],
	[2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 2, 2, 2],
	[2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
	[2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
	[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
	[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
	];

//マップチップを表示する
addEventListener('load', function() {
PrintImage();
ctx.drawImage( charImage, 0, 0, 32, 32, chara.x + ini_x, chara.y + ini_y, 32, 32 );
}, false);

//マップ表示
function PrintImage(){
	//map表示
	for (var y=0; y<map.length; y++) {
		for (var x=0; x<map[y].length; x++) {
			ctx.drawImage( mapchip, 0, 0, 32, 32, 32*x + ini_x, 32*y + ini_y, 32, 32 );
			if ( map[y][x] === 2 ) ctx.drawImage( mapchip, 64, 32, 32, 32, 32*x + ini_x, 32*y + ini_y, 32, 32 );
		}
	}

	for(var i = 0; i < item; ){
		var item_x, item_y;
		do {
			item_x = (Math.floor(Math.random() * (map[0].length - 2)) + 1);
			item_y = (Math.floor(Math.random() * (map.length - 2)) + 1);
		}while (map[item_y][item_x] !== 1);
	

	ctx.drawImage( itemImage, 32, 32, 32, 32, 32*item_x + ini_x, 32*item_y + ini_y, 32, 32 );
	map[item_y][item_x] = 3;
	i++;	
	}

	for(var j = 0; j < enemyNum; ){
	var enemy_x, enemy_y;
do {
enemy_x = (Math.floor(Math.random() * (map[0].length - 2)) + 1);
	enemy_y = (Math.floor(Math.random() * (map.length - 2)) + 1);
	}while (map[enemy_y][enemy_x] !== 1);
	

	ctx.drawImage( enemy[j][0], 0, 0, 32, 32, 32 * enemy_x + ini_x, 32*enemy_y + ini_y, 32, 32 );
	 map[enemy_y][enemy_x] = 5;
	 enemy[j][1] = 32 * enemy_x;
	enemy[j][2] = 32 * enemy_y;
	j++;
		
	}
}

// キー入力
var key = new Object();
key.up = false;
key.down = false;
key.left = false;
key.right = false;

//繰り返し処理
var game = true;
function main() {
if(game === true){
//  キーボードが押された時、keydownfunc関数（かんすう）を呼び出す
addEventListener( "keydown", keydownfunc );
// キーボードがはなされた時、keyupfunc関数（かんすう）を呼び出す
addEventListener( "keyup", keyupfunc );
//キャラの動き
MoveCharactor();
//敵の動き
  for(var e = 0; e < enemyNum; e++){
  	MoveEnemy(e);
  }

 ctx.clearRect(0, 0, canvas.width, canvas.height);
 RePrintImage();

 CharaLife();

//ワープの表示
 if(item === item_get){
 	PrintWarp();
 }
  requestAnimationFrame(main);
}
}
	
requestAnimationFrame(main);


// キーボードが押されたときに呼び出される関数（かんすう）
function keydownfunc( event ) {
	var key_code = event.keyCode;
	if( key_code === 37 ) key.left = true;		 //「左ボタン」が押されたとき、key.leftをtrueにする
	if( key_code === 38 ) key.up = true;		 //「上ボタン」が押されたとき、key.upをtrueにする
	if( key_code === 39 ) key.right = true;		// 「右ボタン」が押されたとき、key.rightをtrueにする
	if( key_code === 40 ) key.down = true;		// 「下ボタン」が押されたとき、key.downをtrueにする
}
	
// キーボードがはなされたときに呼び出される関数
function keyupfunc( event ) {
	var key_code = event.keyCode;
	if( key_code === 37 ) key.left = false;		 //「左ボタン」がはなされたとき、key.leftをfalseにする
	if( key_code === 38 ) key.up = false;  		// 「上ボタン」がはなされたとき、key.upをfalseにする
	if( key_code === 39 ) key.right = false		// 「右ボタン」がはなされたとき、key.rightをfalseにする;
	if( key_code === 40 ) key.down = false;		// 「下ボタン」がはなされたとき、key.downをfalseにする
}

function RePrintImage(){
	//map表示
	for (var y=0; y<map.length; y++) {
		for (var x=0; x<map[y].length; x++) {
			ctx.drawImage( mapchip, 0, 0, 32, 32, 32*x + ini_x, 32*y + ini_y, 32, 32 );
			if ( map[y][x] === 2 ) ctx.drawImage( mapchip, 64, 32, 32, 32, 32*x + ini_x, 32*y + ini_y, 32, 32 );
			if ( map[y][x] === 3 ) ctx.drawImage( itemImage, 32, 32, 32, 32, 32*x + ini_x, 32*y + ini_y, 32, 32 );
			if ( map[y][x] === 4 ) ctx.drawImage( warpImage, 64, 0, 32, 32, 32*x + ini_x, 32*y + ini_y, 32, 32 );
		}
	}

	ctx.drawImage( charImage, 0, 0, 32, 32, chara.x + ini_x, chara.y + ini_y, 32, 32 );

	for(var j = 0; j < enemyNum; j++){
	ctx.drawImage(enemy[j][0], 0, 0, 32, 32, enemy[j][1] + ini_x, enemy[j][2] + ini_y, 32, 32);
	}

	}

function MoveCharactor(){
	if ( chara.move === 0 ) {
		var chara_juge_x = (chara.x)/32;
		var chara_juge_y = (chara.y)/32;
		if ( key.left === true) {
			chara_juge_x -= 1;
			if(map[chara_juge_y][chara_juge_x]  !== 2)
				chara.move = 32;
				pressed_key = 'left';
			if(map[chara_juge_y][chara_juge_x] === 3){ItemGet(chara_juge_y, chara_juge_x);}
			if(map[chara_juge_y][chara_juge_x] === 4){finish(chara_juge_y, chara_juge_x);}
		}
		if ( key.up == true ) {
			chara_juge_y -= 1;
			if(map[chara_juge_y][chara_juge_x]  !== 2)
			chara.move = 32;
				pressed_key = 'up';
			if(map[chara_juge_y][chara_juge_x] === 3){ItemGet(chara_juge_y, chara_juge_x)}
			if(map[chara_juge_y][chara_juge_x] === 4){finish(chara_juge_y, chara_juge_x);}
		}
		if ( key.right === true ) {
			chara_juge_x += 1;
			if(map[chara_juge_y][chara_juge_x]  !== 2)
				chara.move = 32;
				pressed_key = 'right';
				if(map[chara_juge_y][chara_juge_x] === 3){ItemGet(chara_juge_y, chara_juge_x)}
				if(map[chara_juge_y][chara_juge_x] === 4){finish(chara_juge_y, chara_juge_x);}
		}
		
		if ( key.down == true ) {
			chara_juge_y += 1;
			if(map[chara_juge_y][chara_juge_x]  !== 2)
				chara.move = 32;
				pressed_key = 'down';
				if(map[chara_juge_y][chara_juge_x] === 3){ItemGet(chara_juge_y, chara_juge_x)}
				if(map[chara_juge_y][chara_juge_x] === 4){finish(chara_juge_y, chara_juge_x);}
		}
	}
			
	if (chara.move > 0) {
		chara.move -= chara.speed;
		if ( pressed_key == 'left' ) chara.x -= chara.speed;
		if ( pressed_key == 'up' ) chara.y -= chara.speed;
		if ( pressed_key === 'right' ) chara.x += chara.speed;
		if ( pressed_key == 'down' ) chara.y += chara.speed;
	}
}

function ItemGet(y, x){
			map[y][x] = 1;
			RePrintImage();
			item_get += 1;
}

function PrintWarp(){

	var item_x, item_y;
	do {
		item_x = (Math.floor(Math.random() * (map[0].length - 2)) + 1);
		item_y = (Math.floor(Math.random() * (map.length - 2)) + 1);
	}while (map[item_y][item_x] !== 1);

map[item_y][item_x] = 4;
RePrintImage();

item_get += 1;
}

function finish(y, x){
	map[y][x] = 1;
	RePrintImage();
	window.setTimeout(function(){
		alert('クリアおめでとう！！！');
	}, 200);
	game = false;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function MoveEnemy(n) {

	if(enemy[n][3] === 0){
	var enemy_juge_x = (enemy[n][1]) / 32;
	var enemy_juge_y = (enemy[n][2]) / 32;
	var i = 0;
    while(i < 5){
		enemy[n][5] = Math.floor(Math.random() * 4);
		if (enemy[n][5] === 0 && enemy_juge_x > 1) enemy_juge_x -= 1; 
		if (enemy[n][5] === 1 && enemy_juge_x < map[0].length - 2) enemy_juge_x += 1;
		if (enemy[n][5] === 2 && enemy_juge_y > 1) enemy_juge_y -= 1;
		if (enemy[n][5] === 3 && enemy_juge_x < map.length - 2) enemy_juge_y += 1;

		if(map[enemy_juge_y][enemy_juge_x] === 2){
			enemy_juge_x = Math.floor(enemy[n][1] / 32);
			enemy_juge_y = Math.floor(enemy[n][2] / 32);
		}
        else{
		enemy[n][3] = 32;
		break;
	   }
	   i++;
	}
	}

	if(enemy[n][3] > 0){
		enemy[n][3] -= 4
		if(enemy[n][5] === 0){
		enemy[n][1] = enemy[n][1] - 4;
        enemy[n][2] = enemy[n][2];
		}
		if(enemy[n][5] === 1){
		enemy[n][1] = enemy[n][1] + 4;
		enemy[n][2] = enemy[n][2];
		}
		if(enemy[n][5] === 2){
		enemy[n][1] = enemy[n][1];
		enemy[n][2] = enemy[n][2] - 4;
		}
		if(enemy[n][5] === 3){
		enemy[n][1] = enemy[n][1];
		enemy[n][2] = enemy[n][2] + 4;
		}
	}
		}

	async function CharaLife(){
		for(var n = 0; n < enemyNum; n++){
		if(Math.abs(chara.x - enemy[n][1]) < 32){
			if(Math.abs(chara.y - enemy[n][2]) < 32){
				chara.life -= 1;
				console.log(chara.life);
				if(chara.life === 0){
					alert("ライフがなくなりました");
					game = false;
					ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	}
		
		}
	}

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	  };
	  
	  async function myFunction() {

		await sleep(3000);
		console.log('3秒間待機しました');
		// ここから後続の処理を実行する
	  };