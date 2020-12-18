//vars for actual game
var button1, button2, button3, button4, levels, edges, score, which;
var hero1, hero2, villian, boy1, girl1, boy2, girl2, background1, background2, background3;
var time, t;

//vars for actual game images
var button1_img, button2_img, boy1Img, boy2Img, girl1Img, girl2Img, heroImg1, heroImg2, villianImg1;

//vars for pong game
var ball, player, computer, gameState, compScore, playerScore;


function preload() {

  //level1
  button1_img = loadImage("play.png");
  button2_img = loadImage("next.png");


  //level2
  boy1Img = loadAnimation("boy1.png", "boy2.png")
  boy2Img = loadAnimation("boyhap1.png", "boyhap2.png")

  girl1Img = loadAnimation("girl1.png", "girl2.png");
  girl2Img = loadAnimation("girlhap1.png", "girlhap2.png");

  heroImg1 = loadAnimation("ninja1.png", "ninja2.png", "ninja3.png")
  heroImg2 = loadAnimation("ninjahap1.png", "ninjahap2.png", "ninjahap3.png")

  villianImg1 = loadAnimation("skull1.png", "skull2.png", "skull3.png", "skull4.png")
}






function setup() {

  createCanvas(600, 600)
  frameRate = 0.001
  edges = createEdgeSprites();
  //setting the variables for entire game

  levels = "level1";

  time = 10;
  //1st window

  //scene1



  button1 = createSprite(300, 550, 20, 20)
  button1.addImage(button1_img);
  button1.scale = 0.5;

  button2 = createSprite(270, 290, 20, 20)
  button2.addImage(button2_img)
  button2.scale = 0.5;
  button2.visible = false;


  button3 = createSprite(520, 290, 20, 50)
  button3.visible = false;

  //2nd window

  //scene2



  boy1 = createSprite(400, 450);

  boy1.addAnimation("crying", boy1Img);
  boy1.visible = false;

  boy2 = createSprite(400, 450);
  boy2.addAnimation("happy", boy2Img);
  boy2.visible = false;

  girl1 = createSprite(200, 450);
  girl1.addAnimation("crying", girl1Img);
  girl1.visible = false;

  girl2 = createSprite(200, 450);
  girl2.addAnimation("happy", girl2Img);
  girl2.visible = false;

  hero1 = createSprite(70, 70);
  hero1.addAnimation("fighting", heroImg1);
  hero1.scale = 1.2;
  hero1.visible = false;

  hero2 = createSprite(250, 70);
  hero2.addAnimation("happy", heroImg2);
  hero2.scale = 2;
  hero2.visible = false;

  //scores
  score = 0;
  //groups
  villianGroup = new Group();


  //****************** */
  //pong game
  ball = createSprite(200, 200, 10, 10);
  ball.visible = false
  playerPaddle = createSprite(380, 200, 10, 70);
  playerPaddle.visible = false
  computerPaddle = createSprite(10, 200, 10, 70);
  computerPaddle.visible = false
  gameState = "serve";
  compScore = 0;
  playerScore = 0;
  edges = createEdgeSprites();

}

function draw() {

  background("white")

  //to go to the next window
  if (mousePressedOver(button1)) {
    levels = "level2";
  }

  //************************************************************************************************** 
  //next level: hero game

  if (levels === "level2") {
    button1.visible = false;
    hero1.visible = true;
    boy1.visible = true;


    girl1.visible = true
    hero1.debug = true

    //hero movement

    if (keyDown("up")) {
      hero1.y += -4;
    }
    if (keyDown("down")) {
      hero1.y += 4;
    }
    if (keyDown("left")) {
      hero1.x += -4;
    }
    if (keyDown("right")) {
      hero1.x += 4;
    }
    hero1.collide(edges)
    villians();

    if (villianGroup.isTouching(hero1)) {
      villianGroup.destroyEach();
      villianGroup.setVelocityXEach(-1)
      score += 1;

      if (score === 1) {

        levels = "level3"
      }
    }
  }

  if (levels === "level3") {

    boy2.visible = true
    girl2.visible = true
    hero1.visible = false
    hero2.visible = true
    button2.visible = true
    button2.debug = true

    if (mousePressedOver(button2)) {
      //console.log("hi")
      levels = "level4";
    }

  }

  //******************************************************************************************** */
  if (levels === "level4") {
    boy2.visible = false
    girl2.visible = false
    boy1.visible = false
    girl1.visible = false
    hero1.visible = false
    hero2.visible = false
    button2.visible = false
    button3.visible = true;
    ball.visible = true
    playerPaddle.visible = true
    computerPaddle.visible = true




    //pong game********************************************************************************************

    // createCanvas(400, 400)
    background("white")


    //place info text in the center
    if (gameState === "serve") {
      text("Press Space to Serve", 150, 180);
    }


    //display scores
    text(compScore, 170, 20);
    text(playerScore, 230, 20);

    //make the player paddle move with the mouse's y position
    playerPaddle.y = World.mouseY;

    //AI for the computer paddle
    //make it move with the ball's y position
    computerPaddle.y = ball.y;

    //draw line at the centre
    for (var i = 0; i < 600; i = i + 20) {
      line(300, i, 300, i + 10);
    }

    edges = createEdgeSprites();
    ball.bounceOff(edges[0]);
    ball.bounceOff(edges[1]);
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
    ball.bounceOff(playerPaddle);
    ball.bounceOff(computerPaddle);

    //serve the ball when space is pressed
    if (keyDown("space") && gameState === "serve") {
      serve();
      gameState = "play";
    }


    //reset the ball to the centre if it crosses the screen
    if (ball.x > 400 || ball.x < 0) {

      if (ball.x > 400) {
        compScore = compScore + 1;
      }

      if (ball.x < 0) {
        playerScore = playerScore + 1;
      }

      reset();
      gameState = "serve";
    }



    if (playerScore === 5 || compScore === 5) {
      gameState = "over";
      text("Game Over!", 170, 160);
      text("Press 'R' to Restart", 150, 180);
    }

    if (keyDown("r") && gameState === "over") {
      gameState = "serve";
      compScore = 0;
      playerScore = 0;
    }

    if (mousePressedOver(button3)) {
      levels = "level2"
      score = 0
      ball.visible = false
      playerPaddle.visible = false
      computerPaddle.visible = false
      button3.visible = false
    }
  }


  drawSprites();
  text(mouseX + "," + mouseY, mouseX, mouseY)

  if (levels === "level2") {
    text("Kill atleast 10 villian to save the children and go to the next level: " + score, 130, 35)
  }

}

function villians() {
  if (frameCount % 60 === 0) {
    villian = createSprite(random(100, 500), random(0, 500))
    villian.addAnimation("bad", villianImg1)
    villian.scale = 0.8;
    villian.velocityX = -4;
    villian.lifetime = 150;
    villian.debug = true;
    villianGroup.add(villian);
  }
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}