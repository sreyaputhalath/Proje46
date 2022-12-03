function preload(){
RunImg = loadImage("./assets/girlRun.png");
bookImg = loadImage("./assets/book1.png");
securityImg = loadImage("./assets/security.png");
background2 =loadImage("./assets/bg2.jpg");
background1=loadImage("./assets/bg1.png");
background3=loadImage("./assets/bg3.png");
background4=loadImage("./assets/bg4.png");
girl = loadImage("./assets/girl.png");
}




var molly, gaurd,ground,bg,gamestate="intro";
var puzzle, submitbtn;
var check=1;


function setup(){
createCanvas(windowWidth,windowHeight);

fill("white");

text("Hello molly you are trapped in a castle ,to escape from the castle you have solve puzzles and  you must hurry before the ghost catches you",width/2-200,height/2-300)


//creating the PC  and NPC characters//
bg= createSprite(width/2,height/2,width,height);
bg.addImage(background1);
bg.scale=2.5;

ground = createSprite(width/2,height-40,width,60);
molly = createSprite(width/2+200,height-160,20,90);
molly.addImage(RunImg);
molly.scale = 0.5;
molly.setCollider("rectangle",0,0,150,400);

gaurd = createSprite(width/2-100,height-170,20,100);
gaurd.addImage(securityImg)
gaurd.scale=0.5;

ghost = createSprite(width/2-150,height-100,20,100);
ghost.visible = false;
puzzleG=new Group();

//These are for puzzle !//
    input1 = createInput("");
    input1.position(width/2-50,height/8+150)
    input1.hide();

    input2 = createInput("");
    input2.position(width/2-100,height/8+150)
    input2.hide();
//These are for puzzle 2//
   
    
    submitbtn= createButton("Submit");
    submitbtn.position(width/2+130,height/8+150);
    submitbtn.hide();

   



}

function draw(){
  background("white");
  drawSprites();

 //The instructions that will be displayed for the game// 


if(gamestate=="intro"){

  textSize(18); 
  fill("black");
  stroke("black")
 text("Gaurd: Hello molly you are trapped in a mall and the only way to escape from the mall you have to solve puzzles",width/2-540,height/2-150 )
 text("Please Press Enter to proceed",width/2-100,height/2-100);
 if(keyDown(ENTER)){
 gamestate = "start"
 }
}

 
// code for when the gamestate is start//
else if(gamestate=="start"){
  molly.visible =true;
    if(bg.x<width/3){
      bg.x=width/2;
    }
    portal();
    enableStart();
    console.log(check);
    bg.addImage(background1);
    
    //code for when the gamestate is puzzle1//
    if(molly.isTouching(puzzleG) && check===1){
     gamestate="puzzle1";
    }
    if(molly.isTouching(puzzleG) && check===2){
      gamestate="puzzle2";
    }
 }
 
 
//disable the puzzle group//
  if(gamestate==="puzzle1"){
    disableStart();
    bg.addImage(background2);
    bg.scale =2;
    
    input1.show();
    submitbtn.show();

    
    fill("white");
    textSize(24);
    text("Unscramble the given words below",width/2-180,height/8+50);
    
    fill("white");
    textSize(22); stroke("black")
     text("RDOIASUANS",width/2-200,height/8+170);
    
  
    var ans= "DINOSAURS";
    submitbtn.mousePressed(()=>{
     var Userans=input1.value();
     Userans=Userans.toUpperCase();
     if(ans==Userans){
      gamestate="start";
      check=2;
      
    }
     else { alert("The answer is incorrect") }
   });

   
   
  }

 


  


  if(gamestate=="puzzle2"){
    disableStart();
    bg.shapeColor="magenta";
    bg.addImage(background2);
    bg.scale =2;
    input2.show();
    submitbtn.show();
    fill("white")
    textSize(24);
    text("Solve the riddles given below",width/2-150,height/8);

     text("The more there is the less you see.What is it?",width/2-260,height/8+100);
    
    var ans= "DARKNESS";
    submitbtn.mousePressed(()=>{
     var Userans=input2.value();
     Userans=Userans.toUpperCase();
     if(ans===Userans){
       gamestate="end";
       check=3;
     }
     else { alert("The answer is incorrect") }
   });

    
     


  }
if(gamestate=="end"){
bg.addImage(background3);
bg.scale=1
disableStart();
input1.hide();
submitbtn.hide();
fill("black")
textSize(20);
text("Molly: Huh!Where am I?  Oh good! it was just a dream! ",width/3,height/2);
text("Please Press Enter to Proceed ",width/3,height/2+50);
input2.hide();

if(keyDown(ENTER)){
  gamestate = "later"
  }

}

if(gamestate=="later"){
  bg.addImage(background4);
    bg.scale=1;
    fill("black");
    textSize(20)
    text("This game was inspired by a dream I had",width/3,height/2-150);
    text("Then I found something interesting. I found something called a dream dictionary",width/3-90,height/2-120);
    text("So next time you have a dream ,search it up in the dream dictionary...It may have ",width/3-90,height/2-90);
    text("a deeper meaning than you think ",width/3+40,height/2-60);


}



}
// code for spawning puzzles//
function portal(){
  if(frameCount%80===0){
     puzzle = createSprite(width+100,height-100,10,10);
    puzzle.velocityX=-3;
    puzzle.addImage(bookImg);
    puzzle.scale=0.02;
    puzzleG.add(puzzle);
  }
}
function enableStart(){
  input1.hide();
  bg.velocityX=-2;
 submitbtn.hide();
}
function disableStart(){
  bg.velocityX=0;
  gaurd.visible=false;
  puzzleG.destroyEach();
  ground.visible=false;
  molly.visible=false;
  
}