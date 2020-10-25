class Food{

    constructor(){
        var foodStock;
        var lastFed;
    }

    updateFoodStock() {
        foodS++;
        database.ref('/').update({
          Food: foodS
        })
    }

    deductFood() {
        if (foodS<=0) {
            foodS=0;
          }
      
          else {
            foodS-=1;
            dog.addImage(happyDog);
          }
          database.ref('/').update({
            Food: foodS,
            FeedTime: hour()
          })
    }

    display() {
        var x=80,y=100;

        imageMode(CENTER);
        
        if (foodS!==0){
            image(foodImage, 420, 220, 70, 70);
            for (var i =0; i<foodS-1; i++) {
                if (i%10==0) {
                    x=80;
                    y+=50;
                }

                image(foodImage, x, y, 50, 50);
                x+=30;
            }
        }
    }
}