
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine,world;
var canvas;
var slingshot,stone;
var stones = [];
var score = 0;
var numberofstones = 3;
var mango1,mango2; 
var tree;

function preload(){
  backgroundImg = loadImage("background.jpg");
}

function setup() {
  createCanvas(800,600);

  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);

  mango1 = new Mango(150,150,50,50);
  mango2 = new Mango(250,250,50,50);

  slingshot = new Slingshot(700,500,50,50);
 
}


function draw() 
{
  background(51);
  image(backgroundImg,0,0,width,height); 
  Engine.update(engine);

  mango2.display();
  mango1.display();
  slingshot.display();
 
  for (var i = 0; i < stones.length; i++) {
    if (stones[i] !== undefined) {
      stones[i].display();

      //with distance formula
      d1 = dist(stones[i].body.position.x,stones[i].body.position.y, mango1.body.position.x,mango1.body.position.y)
      if(d1<=1)
      {
        console.log("collision");
      }

      var mango1Collision = Matter.SAT.collides(mango1.body,stones[i].body);

      var mango2Collision = Matter.SAT.collides(mango2.body,stones[i].body);

      if (mango1Collision.collided ) {
        score += 1;
         console.log("yes");
         mango1.visible = false;

      }
    }
  }

  if (numberofstones == 0) {
    gameOver();
  }

  // Score
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Score " + score, width - 200, 100);

  // Arrow Count
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Remaining Stones : " + numberofstones, 200, 100);
}

function keyPressed() {
  if (keyCode === 32) {
    if (numberofstones > 0) {
      var posX = slingshot.body.position.x;
      var posY = slingshot.body.position.y;
      var angle = slingshot.body.angle;

      var stone = new Stone(posX, posY, 20, 20, angle+135);

      stone.trajectory = [];
      Matter.Body.setAngle(stone.body, angle);
      stones.push(stone);
      numberofstones -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (stones.length) {
      var angle = slingshot.body.angle;
      stones[stones.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  fill("#FFFF");
  textAlign("center");
  textSize(50);
  text("THANKS FOR PLAYING",400,200)
  text("GAME OVER " , 400, 300);
}