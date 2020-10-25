//Create variables here

var dog, dogImg, happyDog, database, foodS, foodStock;
var feedButton, addButton, fedTime, lastFed, foodObj, foodImage, milk;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  foodImage = loadImage("images/Milk.png");
}

function setup() {
  database = firebase.database();
  createCanvas(600, 500);
  dog = createSprite(500,200,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  foodS = 0;
  foodObj = new Food();
  feedButton=createButton("feed the dog");
  feedButton.position(700,95);
  feedButton.mousePressed(foodObj.deductFood);

  addButton=createButton("add food");
  addButton.position(800,95);
  addButton.mousePressed(foodObj.updateFoodStock);
}


function draw() {  
  background(46,139,87);

  foodObj.display();
  fedTime=database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed=data.val();
  })
  drawSprites();
  //add styles here
  fill(0);
  textSize(20);
  //text("Food Remaining: " + foodS,200,100);
  var time=0;
  //time =lastFed;
  if (lastFed>12 && lastFed<24) {
    time = lastFed - 12;
    text("Last Fed: " + time + "PM", 200, 50);
  }

  else if (lastFed==12) {
    time = lastFed;
    text("Last Fed: " + time + "PM", 200, 50);
  }

  else if (lastFed==0) {
    time = lastFed+12;
    text("Last Fed: " + time + "AM", 200, 50);
  }

  else {
    time = lastFed;
    text("Last Fed: " + time + "AM", 200, 50);
  }
  
}