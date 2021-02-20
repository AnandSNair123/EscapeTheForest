var player, playerStanding, playerAnimation, playerRunningAnimation;
var gameBackground, gameBackgroundAnimation, secondgameBackgroundAnimation, loading;
var invisibleground, jump, jump2, jump3, jump4, jump5, jump6, jump7;
var obstacles, obstacles2, obstacles3, obstacles4, obstacles5, obstacles6, obstacles7, obstacles8, obstacles9, obstacleAnimation;
var portal, portalAnimation;
var gamestate, play = 0,
  firstlevel = 1,
  secondlevel = 2,
  gameover = 3,
  win = 4,gameinst = 5;
var playAnimation, playing;
var logo, logoAnimation;
var lava, lavaAnimation;
var teleporter, teleport, orangee, redd;
var levels, level1, level2;
var disappear;
var visiblility, shown = 1,
  notshown = 2;
var youwin, youlose;
var yay1, yay2;
var restart, restartAnimation;
var lavastate, lavalake = 0,
  lavanolake = 1;
var lava1;
var test;
var instructions,instructionsAnimation,instructionswrittenAnimation;
var back,backAnimation;

function preload() {
  playerStanding = loadAnimation("player5.png");
  playerAnimation = loadAnimation("player1.png", "player2.png", "player3.png", "player4.png", "player5.png", "player6.png", "player7.png", "player8.png");
  playerRunningAnimation = loadAnimation("player9.png", "player10.png", "player11.png", "player12.png", "player13.png", "player14.png", "player15.png", "player16.png")
  gameBackgroundAnimation = loadAnimation("background.jpg");
  obstacleAnimation = loadAnimation("tree.png");
  portalAnimation = loadAnimation("portal.png");
  secondgameBackgroundAnimation = loadAnimation("background2.jpg");
  loading = loadAnimation("image.jpg");
  playAnimation = loadAnimation("play.png");
  logoAnimation = loadAnimation("logo.gif");
  lavaAnimation = loadAnimation("lava.PNG");
  orangee = loadAnimation("orange.PNG");
  redd = loadAnimation("red.PNG");
  level1 = loadAnimation("level1.gif");
  level2 = loadAnimation("level2.gif");
  youwin = loadAnimation("win.jpg");
  youlose = loadAnimation("gameover.png");
  yay1 = loadAnimation("yay1.png");
  yay2 = loadAnimation("yay2.png");
  restartAnimation = loadAnimation("restart.png");
  instructionsAnimation = loadAnimation("instructionsbutton.png");
  instructionswrittenAnimation = loadAnimation("instruction.PNG");
  backAnimation = loadAnimation("back.png");
  
}

function setup() {
  createCanvas(1200, 600);
  gameBackground = createSprite(600, 300);
  gameBackground.addAnimation("gameBackgroundAnimation", gameBackgroundAnimation);
  gameBackground.addAnimation("secondgameBackgroundAnimation", secondgameBackgroundAnimation);
  gameBackground.addAnimation("loadingscreen", loading);
  gameBackground.addAnimation("winning", youwin);
  gameBackground.addAnimation("over", youlose);
  gameBackground.addAnimation("inst",instructionswrittenAnimation);
  gameBackground.scale = 2;

  player = createSprite(100, 490);
  player.addAnimation("playerAnimationStanding", playerStanding);
  player.addAnimation("playerRunning", playerAnimation);
  player.addAnimation("playerRuns", playerRunningAnimation);
  player.addAnimation("letsplay", yay1);
  player.addAnimation("letsgetover", yay2);

  jump = createSprite(100, 500, 10, 10);
  jump2 = createSprite(1100, 366, 100, 10);
  jump3 = createSprite(825, 370, 100, 10);
  jump4 = createSprite(570, 350, 100, 10);
  jump5 = createSprite(300, 280, 100, 10);
  jump6 = createSprite(100, 160, 100, 10);

  obstacles = createSprite(1100, 480);
  obstacles.addAnimation("obstaclesAnimation", obstacleAnimation);
  obstacles.scale = 0.35;

  obstacles2 = createSprite(825, 420);
  obstacles2.addAnimation("obstaclesAnimation", obstacleAnimation);
  obstacles2.scale = 0.35;

  obstacles3 = createSprite(570, 420);
  obstacles3.addAnimation("obstaclesAnimation", obstacleAnimation);
  obstacles3.scale = 0.35;


  obstacles4 = createSprite(300, 350);
  obstacles4.addAnimation("obstaclesAnimation", obstacleAnimation);
  obstacles4.scale = 0.35;


  obstacles5 = createSprite(85, 260);
  obstacles5.addAnimation("obstaclesAnimation", obstacleAnimation);
  obstacles5.scale = 0.35;

  obstacles6 = createSprite(310, 150);
  obstacles6.addAnimation("obstaclesAnimation", obstacleAnimation);
  obstacles6.scale = 0.35;

  obstacles7 = createSprite(455, 150);
  obstacles7.addAnimation("obstaclesAnimation", obstacleAnimation);
  obstacles7.scale = 0.35;

  portal = createSprite(455, 60);
  portal.addAnimation("portalAnimation", portalAnimation);
  portal.scale = 0.3;

  playing = createSprite(400, 400);
  playing.addAnimation("playing", playAnimation);

  logo = createSprite(600, 150);
  logo.addAnimation("logoanimation", logoAnimation);
  logo.scale = 1.5;

  lava = createSprite(60000, 670);
  lava.addAnimation("lavaAnimation", lavaAnimation);
  lava.scale = 1.2;

  teleporter = createSprite(1150, 275);
  teleporter.addAnimation("teleport", orangee);
  teleporter.scale = 0.8;

  teleport = createSprite(100, 225);
  teleport.addAnimation("teleport", redd);
  teleport.scale = 0.8;

  levels = createSprite(600, 50);
  levels.addAnimation("level1", level1);
  levels.addAnimation("level2", level2);
  levels.scale = 1.3;

  restart = createSprite(50, 50);
  restart.addAnimation("restart", restartAnimation);

  instructions = createSprite(700,400);
  instructions.addAnimation("instructions",instructionsAnimation);

  back = createSprite(100,50);
  back.addAnimation("back",backAnimation);
  back.visible = false;
  back.scale = 0.3;

  invisibleground = createSprite(player.x, player.y + 65, 10, 5);
  player.collide(invisibleground);

  gamestate = play;
  lavastate = lavanolake;
}

function draw() {
  if(mousePressedOver(back)){
    gamestate = play;
    back.visible = false;
    logo.visible = true;
    playing.visible = true;
    instructions.visible = true;
  }
  if(mousePressedOver(instructions)){
    gamestate = gameinst;
    instructions.visible = false;
    playing.visible = false;
    logo.visible = false;
    player.visible = false;
  }
  if(gamestate === gameinst){
    gameBackground.changeAnimation("inst",instructionswrittenAnimation);
    gameBackground.scale = 1.4;
    back.visible = true;
  }
  if (player.isTouching(lava)) {
    gamestate = gameover;
    lava.visible = false;
    levels.visible = false;
    portal.x = 10000;
    restart.visible = true;
  }
  if (player.isTouching(lava) && gamestate === gameover) {
    portal.visible = false;
  }
  if (lavastate === lavanolake) {
    lava.x = 100000;
  }
  if (lavastate === lavalake) {
    lava.x = 600;
    lava.y = 670;
  }
  restart.visible = false;
  jump2.y = obstacles.y - 70;
  jump3.y = obstacles2.y - 70;
  jump4.y = obstacles3.y - 70;
  jump5.y = obstacles4.y - 70;
  jump6.y = obstacles5.y - 70;
  background("black");
  if (gamestate === play) {
    instructions.visible = true;
    gameBackground.changeAnimation("loadingscreen", loading);
    player.x = 100;
    player.y = 490;
    player.visible = true;
    restart.visible = false;
    levels.visible = false;
    jump2.y = obstacles.y - 70;
    jump3.y = obstacles2.y - 70;
    jump4.y = obstacles3.y - 70;
    jump5.y = obstacles4.y - 70;
    jump6.y = obstacles5.y - 70;
    teleporter.visible = false;
    teleport.visible = false;
    gameBackground.changeAnimation("loadingscreen", loading);
    gameBackground.scale = 0.7;
    player.changeAnimation("letsplay", yay1);
    obstacles.visible = false;
    obstacles2.visible = false;
    obstacles3.visible = false;
    obstacles4.visible = false;
    obstacles5.visible = false;
    obstacles6.visible = false;
    obstacles7.visible = false;
    portal.visible = false;
    jump.visible = false;
    jump2.visible = false;
    jump3.visible = false;
    jump4.visible = false;
    jump5.visible = false;
    jump6.visible = false;
    lava.visible = false;
    if (mousePressedOver(playing)) {
      gamestate = firstlevel;

    }
  }
  if (gamestate === firstlevel) {
    instructions.visible = false;
    jump2.x = 1100;
    jump2.y = 410;
    jump3.x = 825;
    jump3.y = 350;
    jump4.x = 570;
    jump4.y = 350;
    jump5.x = 300;
    jump5.y = 280;
    jump6.x = 100;
    jump6.y = 190;
    obstacles.x = 1100;
    obstacles.y = 480;
    obstacles2.x = 825;
    obstacles2.y = 420;
    obstacles3.x = 570;
    obstacles3.y = 420;
    obstacles4.x = 300;
    obstacles4.y = 350;
    obstacles5.x = 85;
    obstacles5.y = 260;
    obstacles6.x = 310;
    obstacles6.y = 150;
    obstacles7.x = 455;
    obstacles7.y = 150;
    portal.x = 455;
    portal.y = 60;
    portal.visible = true;
    player.visible = true;
    restart.visible = false;
    levels.visible = true;
    levels.x = 700;
    if (player.isTouching(jump2)) {
      lava.x = 600;
    }
    teleport.visible = false;
    teleporter.visible = false;
    playing.visible = false;
    logo.visible = false;
    obstacles.visible = true;
    if (player.isTouching(portal)) {
      gamestate = secondlevel;
      lava.visible = false;
      lavastate = lavanolake;
      player.x = 100;
      player.y = 490;
      gameBackground.changeAnimation("secondgameBackgroundAnimation", secondgameBackgroundAnimation);
    }
    obstacles2.visible = true;
    obstacles3.visible = true;
    obstacles4.visible = true;
    obstacles5.visible = true;
    obstacles6.visible = true;
    obstacles7.visible = true;
    portal.visible = true;
    if (player.isTouching(jump2)) {
      lava.visible = true;
      lava.x = 600;
      lavastate = lavalake
    }
    gameBackground.changeAnimation("gameBackgroundAnimation", gameBackgroundAnimation);
    gameBackground.scale = 2;
    player.collide(obstacles);
    player.collide(obstacles2);
    player.collide(obstacles3);
    player.collide(obstacles4);
    player.collide(obstacles5);
    player.collide(obstacles6);
    player.collide(obstacles7);
    jump.visible = false;
    jump2.visible = false;
    jump3.visible = false;
    jump4.visible = false;
    jump5.visible = false;
    jump6.visible = false;
    player.changeAnimation("playerAnimationStanding", playerStanding);
    invisibleground.visible = false;
    invisibleground.x = player.x;
    player.velocityY = player.velocityY + 0.5;
    player.collide(invisibleground);
    edges = createEdgeSprites();
    player.bounceOff(edges);
    jump.x = player.x;
    if (keyDown("space") && player.isTouching(jump) || keyDown("space") && player.isTouching(jump2) || keyDown("space") && player.isTouching(jump3) || keyDown("space") && player.isTouching(jump4) || keyDown("space") && player.isTouching(jump5) || keyDown("space") && player.isTouching(jump6)) {
      player.velocityY = -7.5;
    }
    if (keyDown(RIGHT_ARROW)) {
      player.changeAnimation("playerRunning", playerAnimation);
      player.x = player.x + 5;

    }

    if (keyDown(LEFT_ARROW)) {
      player.changeAnimation("playerRuns", playerRunningAnimation);
      player.x = player.x - 5;

    }
  }
  if (gamestate === secondlevel) {
    lava.y = 10000;
    test = createSprite(760, 300, 1200, 600);
    test.visible = false;
    if (player.isTouching(test)) {
      lava.visible = true;
      lavastate = lavalake;
      lava.y = 670;
    }
    //if ( player.y<) {
    //lava.visible = true;
    //lavastate = lavalake;
    //}
    player.visible = true;
    restart.visible = false;
    levels.visible = true;
    levels.changeAnimation("level2", level2);
    if (player.isTouching(teleporter)) {
      player.x = teleport.x;
      player.y = teleport.y;
    }
    teleport.visible = true;
    teleporter.visible = true;
    playing.visible = false;
    logo.visible = false;
    player.visible = true;
    obstacles.visible = true;
    obstacles2.visible = true;
    obstacles3.visible = true;
    obstacles4.visible = true;
    obstacles5.visible = true;
    obstacles6.visible = true;
    obstacles7.visible = true;
    gameBackground.changeAnimation("secondgameBackgroundAnimation", secondgameBackgroundAnimation);
    gameBackground.scale = 1;
    jump2.x = obstacles.x;
    jump3.x = obstacles2.x;
    jump4.x = obstacles3.x;
    jump5.x = obstacles4.x;
    jump6.y = teleport.y;
    jump6.x = 100;
    portal.y = obstacles6.y - 90;
    portal.visible = true;
    if (player.isTouching(portal)) {
      gamestate = win;
    }
    if (gamestate === win) {
      restart.visible = false;
      player.changeAnimation("letsgetover", yay2);
      gameBackground.changeAnimation("winning", youwin);
      portal.visible = false;
      teleporter.visible = false;
      teleport.visible = false;
      lava.visible = false;
      levels.visible = false;
      obstacles.visible = false;
      obstacles2.visible = false;
      obstacles3.visible = false;
      obstacles4.visible = false;
      obstacles5.visible = false;
      obstacles6.visible = false;
      obstacles7.visible = false;
      player.visible = false;
    }

    obstacles.x = 150;
    obstacles2.x = 430;
    obstacles3.x = 680;
    obstacles3.y = 350;
    obstacles4.x = 950;
    obstacles4.y = 450;
    obstacles5.x = 1150;
    obstacles5.y = 350;
    obstacles6.x = 300;
    obstacles6.y = 205;
    obstacles7.x = 100;
    obstacles7.y = 300;
    portal.x = obstacles6.x;
    if (player.isTouching(jump2)) {
      lava.visible = true;
      lava.x = 600;
    }

    player.collide(obstacles);
    player.collide(obstacles2);
    player.collide(obstacles3);
    player.collide(obstacles4);
    player.collide(obstacles5);
    player.collide(obstacles6);
    player.collide(obstacles7);
    jump.visible = false;
    jump2.visible = false;
    jump3.visible = false;
    jump4.visible = false;
    jump5.visible = false;
    jump6.visible = false;
    jump2.y = obstacles.y - 70;
    jump3.y = obstacles2.y - 70;
    jump4.y = obstacles3.y - 70;
    jump5.y = obstacles4.y - 70;
    jump6.y = teleport.y;
    player.changeAnimation("playerAnimationStanding", playerStanding);
    invisibleground.visible = false;
    invisibleground.x = player.x;
    player.velocityY = player.velocityY + 0.5;
    player.collide(invisibleground);
    edges = createEdgeSprites();
    player.bounceOff(edges);
    jump.x = player.x;
    if (keyDown("space") && player.isTouching(jump) || keyDown("space") && player.isTouching(jump2) || keyDown("space") && player.isTouching(jump3) || keyDown("space") && player.isTouching(jump4) || keyDown("space") && player.isTouching(jump5) || keyDown("space") && player.isTouching(jump6)) {
      player.velocityY = -7;
    }
    if (keyDown(RIGHT_ARROW)) {
      player.changeAnimation("playerRunning", playerAnimation);
      player.x = player.x + 5;

    }

    if (keyDown(LEFT_ARROW)) {
      player.changeAnimation("playerRuns", playerRunningAnimation);
      player.x = player.x - 5;

    }

  }

  if (gamestate === gameover) {
    lavastate = lavanolake;
    if (mousePressedOver(restart)) {
      gamestate = firstlevel;
      logo.visible = true;
      player.visible = true;
      playing.visible = true;
      portal.x = 455;
      player.x = 100;
      player.y = 490;
      lava.x = 10000;
      levels.changeAnimation("level1", level1);
      player.collide(invisibleground);
      player.collide(obstacles);
      player.collide(obstacles2);
      player.collide(obstacles3);
      player.collide(obstacles4);
      player.collide(obstacles5);
      player.collide(obstacles6);
      player.collide(obstacles7);
    }
    player.visible = false;
    restart.visible = true;
    restart.scale = 0.4;
    levels.visible = false;
    obstacles.visible = false;
    obstacles2.visible = false;
    obstacles3.visible = false;
    obstacles4.visible = false;
    obstacles5.visible = false;
    obstacles6.visible = false;
    obstacles7.visible = false;
    teleporter.visible = false;
    teleport.visible = false;
    gameBackground.changeAnimation("over", youlose);
    gameBackground.scale = 0.9;


  }


  drawSprites();

}
