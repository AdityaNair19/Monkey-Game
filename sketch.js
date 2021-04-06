var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0,
  score;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);

  score = 0;

  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(255);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (keyDown("Space") && monkey.y >= 100) {
    monkey.velocityY = -10;
  }

  monkey.velocityY = monkey.velocityY + 8;
  monkey.collide(ground);

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("survivalTime: " + survivalTime, 100, 50);

  if (gameState === PLAY) {
    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      score = score + 1;

      if (obstaclesGroup.isTouching(monkey)) {
        gameState = END;
      }

    }
  } else if (gameState === END) {
    monkey.velocityX = 0;
  }



  drawSprites();
}

function Banana() {
  var Banana = createSprite(0, Math.round(random(20, 370)), 10, 10);
  banana.addImage(bananaImage);
  banana.velocityX = 3;
  banana.lifetime = 150;
  banana.scale = 0.1;
  FoodGroup.add(banana);
}

function obstacle() {
  var obstacle = createSprite(0, Math.round(random(20, 370)), 10, 10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = 3;
  obstacle.lifetime = 150;
  obstacle.scale = 1;
  obstacleGroup.add(obstacle);
}