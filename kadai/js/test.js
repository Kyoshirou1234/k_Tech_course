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

const enemyNum = 5;
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


const ini_x = 30;
const ini_y = 30;

const item = 30;
var item_complete = false;
var item_get = 0;



//マップの作成（さくせい）
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

	console.log(map.length)
	console.log(map[0].length)
//マップチップを表示（ひょうじ）する
addEventListener('load', function() {
PrintImage();
}, false);

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

var key = new Object();
key.up = false;
key.down = false;
key.left = false;
key.right = false;

function main() {

	for(var e = 0; e < enemyNum; e++){
		MoveEnemy(e, enemy);
	}

  requestAnimationFrame(main);
	
}
	
requestAnimationFrame(main);

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

	}

	function enemyImage(){
		for(var j = 0; j < enemyNum; j++){
			ctx.drawImage(enemy[j][0], 0, 0, 32, 32, enemy[j][1] + ini_x, enemy[j][2] + ini_y, 32, 32);
			}
	}


function MoveEnemy(n, enemy) {

	if(enemy[n][3] === 0){
	var enemy_juge_x = Math.floor(enemy[n][1] / 32);
	var enemy_juge_y = Math.floor(enemy[n][2] / 32);
    while(true){
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
	}
	}

	if(enemy[n][3] > 0){
		console.log(enemy[n][5]);
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
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		RePrintImage();
        enemyImage();
	}
		}


