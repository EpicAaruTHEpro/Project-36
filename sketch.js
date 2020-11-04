//Create variables here

var dog, dogImg, happyDog, database, foodS, foodStock;
var feedButton, addButton, fedTime, lastFed, foodObj, foodImage, milk, currentTime;
var readState, gameState, bedroomImg, gardenImg, washroomImg, deadDog;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  deadDog = loadImage("images/deadDog.png");
  foodImage = loadImage("images/Milk.png");
  bedroomImg = loadImage("images/BedRoom.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/WashRoom.png");
}

function setup() {
  database = firebase.database();
  createCanvas(600, 500);
  dog = createSprite(520,200,50,50);
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
  //read game state from database
  readState = database.ref('gameState');
  readState.on("value", (data)=> {
    gameState=data.val();
  });
}


function draw() {  
  background(46,139,87);
  currentTime=hour();
  if (currentTime===(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }

  else if (currentTime===(lastFed+2)) {
    update("Sleeping");
    foodObj.bedroom();
  }

  else if (currentTime>(lastFed+2) && currentTime<=(lastFed=2)) {
    update("Bathing");
    foodObj.washroom();
  }

  else {
    update("Hungry");
    foodObj.display();
  }
  foodObj.display();
  fedTime=database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed=data.val();
  })

  if (gameState !== "Hungry") {
    feedButton.hide();
    addButton.hide();
    dog.remove();
  }

  else {
    if (lastFed!==currentTime) {
      feedButton.show();
      addButton.show();
      dog.addImage(deadDog);
    }
  }
  drawSprites();
  //add styles here
  fill(0);
  textSize(20);
  //text("Food Remaining: " + foodS,200,100);
  var time=0;
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

function update(state){
  database.ref('/').update({
    gameState: state
  });
}