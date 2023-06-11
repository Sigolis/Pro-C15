var PLAY = 1;
var END = 0;

var gameState = PLAY;
var blueBalloon, redBalloon, greenBalloon, pinkBalloon;
var bow, arrow, backgroundImg, redB, pinkB, greenB, blueB, arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage, blue_balloonImage, backgroundImage;
var arrowGroup, redBalloonGroup, blueBalloonGroup, greenBalloonGroup, pinkBalloonGroup;
var score = 0;
var bow, arrow, scene;

function preload() {
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
}

function setup() {
  createCanvas(400, 400);

  scene = createSprite(0, 0, 400, 400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5;

  bow = createSprite(380, 220, 20, 50);
  bow.addImage(bowImage);
  bow.scale = 1;

  score = 0;
  redB = new Group();
  arrowGroup = new Group();
  redBalloonGroup = new Group(); // Adicionado
  blueBalloonGroup = new Group(); // Adicionado
  greenBalloonGroup = new Group(); // Adicionado
  pinkBalloonGroup = new Group(); // Adicionado
}

function draw() {
  background(0);

  if (gameState === PLAY) {
    scene.velocityX = -3;

    if (scene.x < 0) {
      scene.x = scene.width / 2;
    }

    bow.y = World.mouseY;

    if (keyDown("space")) {
      createArrow();
    }

    var select_balloon = Math.round(random(1, 4));

    if (World.frameCount % 100 == 0) {
      switch (select_balloon) {
        case 1:
          redBalloon();
          break;
        case 2:
          blueBalloon();
          break;
        case 3:
          pinkBalloon();
          break;
        case 4:
          greenBalloon();
          break;
        default:
          break;
      }
    }

    if (arrowGroup.isTouching(redBalloonGroup)) {
      redBalloonGroup.destroyEach();
      arrowGroup.destroyEach();
      score = score + 1;
    }

    if (arrowGroup.isTouching(blueBalloonGroup)) {
      blueBalloonGroup.destroyEach();
      arrowGroup.destroyEach();
      score = score + 2;
    }

    if (arrowGroup.isTouching(greenBalloonGroup)) {
      greenBalloonGroup.destroyEach();
      arrowGroup.destroyEach();
      score = score + 3;
    }

    if (arrowGroup.isTouching(pinkBalloonGroup)) {
      pinkBalloonGroup.destroyEach();
      arrowGroup.destroyEach();
      score = score + 4;
    }

    if (score >= 10) {
      gameState = END;
    }
  } else if (gameState === END) {
    bow.destroy();
    scene.velocityX = 0;

    textSize(30);
    fill("white");
    text("Pontuação: " + score, 120, 200);
  }

  drawSprites();

  textSize(20);
  fill("white");
  text("Pontuação: " + score, 250, 50);
}

function redBalloon() {
  var red = createSprite(0, Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redBalloonGroup.add(red);
}

function blueBalloon() {
  var blue = createSprite(0, Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueBalloonGroup.add(blue);
}

function greenBalloon() {
  var green = createSprite(0, Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  greenBalloonGroup.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0, Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1;
  pinkBalloonGroup.add(pink);
}

function createArrow() {
  var arrow = createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y = bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
}
