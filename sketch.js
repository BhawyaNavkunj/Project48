var player, score, playerImg, playerI,invisibleGround;
var obstacle, obstaclesGroup;
var bg1, bg2, bg3;
var ground1, ground2, ground3;
var ninjaImg, soldierImg, bombImg;
var weapon1, weapon2, weapon3, weapon4, weapon5;
var gameState = 2;
var gameOver, restart, gameOverImg, restartImg;
var gun1, gun2, gun3, gun4, gun5;
var bulletImg, bulletsGroup, ammoImg, ammoGroup;
var i, k=100;
var badge1I, badge2I, badge3I, badge1, badge2, badge3;
var start, startI, end, endI;
var tap2, tap2I;
var lost, win;

function preload(){
  playerImg = loadAnimation("Assets/Player/man1.png","Assets/Player/man2.png","Assets/Player/man3.png","Assets/Player/man4.png","Assets/Player/man5.png","Assets/Player/man6.png","Assets/Player/man7.png","Assets/Player/man8.png");
  bg1 = loadImage("Assets/Backgrounds/forest.png");
  bg2 = loadImage("Assets/Backgrounds/snow1.jpg");
  bg3 = loadImage("Assets/Backgrounds/desert.png");
  bulletImg = loadImage("Assets/Obstacles/bullet.png");
  gameOverImg = loadImage("Assets/gameOver.png");
  restartImg = loadImage("Assets/restart.png");
 // playerI = loadAnimation("Assets/Player/man1.png");
  ninjaImg = loadAnimation("Assets/Obstacles/ninja1.png","Assets/Obstacles/ninja2.png","Assets/Obstacles/ninja3.png","Assets/Obstacles/ninja4.png","Assets/Obstacles/ninja5.png","Assets/Obstacles/ninja6.png");
  soldierImg = loadAnimation("Assets/Obstacles/soldier1.png","Assets/Obstacles/soldier2.png","Assets/Obstacles/soldier3.png","Assets/Obstacles/soldier4.png","Assets/Obstacles/soldier5.png",)
  bombImg = loadImage("Assets/Obstacles/Bomb.png");
  gun1 = loadImage("Assets/Weapons/gun1.png");
  gun2 = loadImage("Assets/Weapons/gun2.png");
  gun3 = loadImage("Assets/Weapons/gun3.png");
  gun4 = loadImage("Assets/Weapons/gun4.png");
  gun5 = loadImage("Assets/Weapons/gun5.png");
  ammoImg = loadImage("Assets/Weapons/ammunition.png");
  badge1I = loadImage("Assets/Badges/badge1.png");
  badge2I = loadImage("Assets/Badges/badge2.png");
  badge3I = loadImage("Assets/Badges/badge3.png");
  startI = loadImage("Assets/start.jpg");
  endI = loadImage("Assets/end.jpg");
  tap2I = loadImage("Assets/2.jpg");
  lost = loadSound("Assets/Sounds/Lost.mp3");
  win = loadSound("Assets/Sounds/Win.mp3"); 
}

function setup(){
  createCanvas(1000,400);

  i = 0;
  
  ground1 = createSprite(10,50,width,height);
  ground1.visible =true;
  ground1.addImage(bg1);
  ground1.scale = 2;
  ground1.x = ground1.width;

  ground2 = createSprite(10,200,width,height);
  ground2.visible = false;
  ground2.addImage(bg2);
  ground2.scale = 2;
  ground2.x = ground2.width;

  ground3 = createSprite(10,210,width,height);
  ground3.visible = false;
  ground3.addImage(bg3);
  //ground3.scale = 0.95;
  ground3.x = ground3.width;

  invisibleGround = createSprite(500,380,1000,10);
  invisibleGround.visible = false;

  gameOver = createSprite(500,170,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.05;
  gameOver.visible = false;

  restart = createSprite(500,220,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  restart.visible = false;

  player = createSprite(70,345,20,20);
  player.addAnimation("running",playerImg);
  player.scale = 0.5;
  player.setCollider("rectangle",0,0,player.width-130,player.height-20);

  weapon1 = createSprite(140,player.y,20,20);
  weapon1.addImage(gun1);
  weapon1.visible = false;
  weapon1.scale = 0.9;

  weapon2 = createSprite(140,player.y,20,20);
  weapon2.addImage(gun2);
  weapon2.visible = false;

  weapon3 = createSprite(140,player.y-90,20,20);
  weapon3.addImage(gun3);
  weapon3.scale = 0.2;
  weapon3.visible = false;

  weapon4 = createSprite(140,player.y-90,20,20);
  weapon4.addImage(gun4);
  weapon4.scale = 0.25;
  weapon4.visible = false;

  weapon5 = createSprite(140,player.y-90,20,20);
  weapon5.addImage(gun5);
  weapon5.visible = false;

  badge1 = createSprite(450,20,10,10);
  badge1.addImage(badge1I);
  badge1.scale = 0.1;
  badge1.visible = false;

  badge2 = createSprite(500,20,10,10);
  badge2.addImage(badge2I);
  badge2.scale = 0.1;
  badge2.visible = false;

  badge3 = createSprite(550,20,10,10);
  badge3.addImage(badge3I);
  badge3.scale = 0.1;
  badge3.visible = false;

  start = createSprite(500,200,10,10);
  start.visible = false;
  start.addImage(startI);

  end = createSprite(500,200,20,20);
  end.visible = false;
  end.addImage(endI);

  tap2 = createSprite(500,300,1,1);
  tap2.addImage(tap2I);
  tap2.visible = false;
  tap2.scale = 0.3;

  score = 0;
  obstaclesGroup = new Group();
  bulletsGroup = new Group();
  ammoGroup = new Group();
  //player.debug = true;

}

function draw(){

  background(220);
  weapon1.y = player.y;
  weapon2.y = player.y;
  weapon3.y = player.y;
  weapon4.y = player.y;
  weapon5.y = player.y;

  if(gameState === 2){
    start.visible = true;
    player.visible = false;
    if(keyDown("space")){
      gameState = 1;
    }
  }
  
  if(gameState===1){
    start.destroy();
    end.visible = false;
    tap2.visible = false;
    player.visible = true;
    spawnBullets();
    ground1.velocityX = -(5+score/100);
    ground2.velocityX = -(5+score/500);
    ground3.velocityX = -(5+score/1000);
    if(ground1.x<300){
      ground1.x = 500;
    }

    if(ground2.x<300){
      ground2.x = 500;
    }

    if(ground3.x<350){
      ground3.x = 600;
    }

    if(score<2000){
      ground1.visible = true;
    }
    else if(score>2000 && score<4000){
      ground2.visible = true;
      ground1.visible = false;
      badge1.visible = true;
      badge2.visible = true;
    }
    else if(score>4000){
      badge1.visible = true;
      badge2.visible = true;
      badge3.visible = true;
      ground3.visible = true;
      ground3.velocityX = -(5+score/200);
      ground1.visible = false;
      ground2.visible = false;
    }

    if(score>4200){
      gameState =3;
      win.play();
    }

    if(keyDown("space")&& player.y>200){
      player.velocityY = -20;
    }
    player.velocityY = player.velocityY + 0.8;
    
    score = score + Math.round(getFrameRate()/30);
    spawnObstacles();

    if(player.isTouching(obstaclesGroup) || player.isTouching(bulletsGroup)){
      i = i + 1;
      console.log(i);
      if(i>10){
        gameState = 0;
        lost.play();
      }
    }

    if(keyDown(UP_ARROW) && score>500 && k<=100){
      createBullets();
      k=k-1;
      console.log(k);
    }

    if(ammoGroup.isTouching(obstaclesGroup)){
      obstaclesGroup.destroyEach();
      ammoGroup.destroyEach();
    }

    if(score>500){
      weapon1.visible = true;
      badge1.visible = true;
    }

    if(score>1500){
      weapon1.visible = false;
      weapon2.visible = true;
    }

    if(score>2000){
      weapon1.visible = false;
      weapon2.visible = false;
      weapon3.visible = true;
    }

    if(score>3000){
      weapon1.visible = false;
      weapon2.visible = false;
      weapon3.visible = false;
      weapon4.visible = true;
    }

    if(score>4000){
      weapon1.visible = false;
      weapon2.visible = false;
      weapon3.visible = false;
      weapon4.visible = false;
      weapon5.visible = true;
    }

  }

  if(gameState === 3){
    end.visible = true;
    tap2.visible = true;
    weapon5.visible = false;
    ground1.velocityX = 0;
    ground2.velocityX = 0;
    ground3.visible = true;
    player.visible = false;
    ground3.velocityX = 1;
    obstaclesGroup.destroyEach();
    bulletsGroup.destroyEach();
    if(mousePressedOver(tap2)){
      gameState = 0;
    }
  }

  if(gameState===0){
    k=0;
    end.visible = false;
    tap2.visible= false;
    player.visible = false;
    obstaclesGroup.destroyEach();
    bulletsGroup.destroyEach();
    weapon1.visible = false;
    weapon2.visible = false;
    weapon3.visible = false;
    weapon4.visible = false;
    weapon5.visible = false;
    gameOver.visible = true;
    restart.visible = true;
    ground1.velocityX = 0;
    ground2.velocityX = 0;
    ground3.velocity = 0;
    ground1.visible = true;
    ground2.visible = false;
    ground3.visible = false;
    if(mousePressedOver(restart)){
      reset();
    }
  }

  player.collide(invisibleGround);
  obstaclesGroup.collide(invisibleGround);
  
  drawSprites();
  textSize(18);
  fill("white");
  text("Score:"+score,20,20);
  text("Bullets left:"+k,880,20);

}

function spawnObstacles(){
  if(frameCount%150===0){
    obstacle = createSprite(1000,310,10,10);
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: obstacle.addAnimation("ninja",ninjaImg);
      obstacle.scale = 0.9;
      break;
      case 2: obstacle.addAnimation("soldier",soldierImg);
      obstacle.scale = 0.28;
      break;
      case 3: obstacle.addImage(bombImg);
      obstacle.scale = 0.3;
      obstacle.y = 315;
      break;
      default: break;
    }
    obstacle.velocityX= -(6+score/400);
    obstacle.lifetime = 1200;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = 1 ;
  i = 0;
  player.visible = true;
  score = 0;
  gameOver.visible = false;
  restart.visible = false;
  ground1.visible = true;
  ground2.visible = false;
  ground3.visible = false;
  badge1.visible = false;
  badge2.visible = false;
  badge3.visible = false;
}

function spawnBullets(){
  if(score>500 && frameCount%120===0){
    var bullet = createSprite(1000,180,10,10);
    bullet.y =Math.round(random(100,180));
    bullet.addImage(bulletImg);
    bullet.scale = 0.1;
    bullet.lifetime = 400;
    bullet.velocityX = -6;
    bulletsGroup.add(bullet);
  }
}

function createBullets(){
  if(score>500){
    var ammo = createSprite(150,310,1,1);
    ammo.addImage(ammoImg);
    ammo.scale = 0.3;
    ammo.velocityX = 4;
    ammo.lifetime = 400;
    ammoGroup.add(ammo);
  }
}
  