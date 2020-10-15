//Create variables here

var dog, dogImg, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  ballPosRef = database.ref("Food");
  ballPosRef.on("value", readStock);
}


function draw() {  
  background(46,139,87);

  if (foodS !== undefined) {
    if (keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDog);
    }
  }
  drawSprites();
  //add styles here
  fill(0);
  textSize(20);
  text("Food Remaining: " + foodS,200,100);
  text("Press Up arrow to feed dog", 200, 50);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x<=0) {
    x=0;
  }

  else {
    x-=1;
  }
  database.ref('/').update({
    Food: x
  })
}