var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var ground;
var bananas, banana, bananaI
var obstaclesGroup, obstacleI;
var obstacles, obstacle
var score = 0

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  bananaI = loadImage("banana.png");
  obstacleI = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400);

  monkey = createSprite(50, 160, 20, 50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200, 400, 400, 20);
  ground.velocityX = -4

  obstaclesGroup = createGroup();
  bananasGroup = createGroup();


  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  monkey.debug = false;


}

function draw() {


  background("white");

  text("survival: " + score, 500, 50);


  if (gameState === PLAY) {

    ground.velocityX = -(6000 + 3000 * score / 6000)

    score = score + Math.round(getFrameRate() / 60);
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 290) {
      monkey.velocityY = -20;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    spawnbananas();


    spawnObstacles()
    obstaclesGroup = new Group()
    bananasGroup = new Group()



  } else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0


    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);

  }


  monkey.collide(ground);


  drawSprites();
  
      if(monkey.isTouching(obstaclesGroup)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        bananasGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        bananasGroup.setLifetimeEach(-1);
    
 if(   monkey.collide(obstaclesGroup)){
 gameState = END
    }
        
    }
}

function reset() {
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  bananasGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {

  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 370, 10, 40);
    obstacle.velocityX = -(6 + score / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 1))
    obstacle.addImage(obstacleI);


    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;


    obstaclesGroup.add(obstacle);

    obstacle.height = monkey.height + 1

    if (obstaclesGroup.collide(monkey)) {
      gameState = END
    }

  }
}


function spawnbananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(80, 120));
    banana.addImage(bananaI);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    bananasGroup.add(banana)

   
   

    banana.depth = monkey.depth;

  }
}