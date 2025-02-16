var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  //Uncomment the correct code to create 
  feed=createButton("Feed the dog");
  feed.position(700,95);
  
  feed=createbutton("Feed the dog");
  feed.position(700,95);
  
  feed=createButton("Feed the dog");
  feed.position(70,950);
  
  feed=createButton("Feed the dog");
  feed.Position(700,95);
  
  //Uncomment the correct code to call FeedDog() using mousePressed
  feed.Pressed(feedDog);
  feed.mousePress(feedDog);
  feed.mousePressed(feedDog);
  feed.mousePressed(addfoods);
 
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val *0);
  }
  else{
      foodObj.updateFoodStock(food_stock_val -1);
  }
  
  //Uncomment correct code block to update food quantity and fed timing
  database.ref('/').OnUpdate({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  
  database.ref('/').Update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
    
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
   
  database.ref('/').update({
    Food:foodObj.getFoodStock,
    FeedTime:hour()
  })
  
}

//function to add food stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}