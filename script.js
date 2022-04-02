//declaring variables for colors
const green = document.querySelector("#green");
const blue = document.querySelector("#blue");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");


//Correct Panels
const panels = [green,blue,red,yellow];

//Random Panels
const getRandomPanel = () => {
  return panels[parseInt(Math.random()*panels.length)];
}

//Plays Audio from boxes
const playAudio = (panels) => {
  let aGreen = new Audio('https://cdn.glitch.global/cf4834c4-32a0-400f-9c7b-a4f53d62bb44/green.mp3?v=1648759626463');
  let aBlue = new Audio('https://cdn.glitch.global/cf4834c4-32a0-400f-9c7b-a4f53d62bb44/blue.mp3?v=1648759626014');
  let aRed = new Audio('https://cdn.glitch.global/cf4834c4-32a0-400f-9c7b-a4f53d62bb44/red.mp3?v=1648759626531');
  let aYellow = new Audio('https://cdn.glitch.global/cf4834c4-32a0-400f-9c7b-a4f53d62bb44/yellow.mp3?v=1648759626251');
  switch(panels){
    case green:
      aGreen.play();
      break;
    case blue:
      aBlue.play();
      break;
    case red:
      aRed.play();
      break;
    case yellow:
      aYellow.play();
      break;
  }
  
};
//Start off a sequence with an inital random panel
const sequence = [getRandomPanel()];

//Another array to what we actually need to guess
let sequenceToGuess = [...sequence];

//Flashes at boxes
const flash = panel =>
{
  playAudio(panel);
  return new Promise((resolve) =>{
    panel.className += ' active';
    setTimeout(() => {
      panel.className = panel.className.replace(
        ' active',
        ''
      );
      setTimeout(() =>{
        resolve();  
      },500)
    }, 1000);
  });
};

let canClick = false;   //set boxes to false when boxes flash

//Function to click on the divs
const panelClicked = panelClicked => {
  
  playAudio(panelClicked);
  
  if(!canClick) return;
  
  const findBox = sequenceToGuess.shift();
  
  if(findBox === panelClicked)
  {
    if(sequenceToGuess.length === 0)
    {
      setTimeout(() => {
        //start new round
      sequence.push(getRandomPanel());
      sequenceToGuess = [...sequence];
      startFlashing();
      }, 1500);
      
    }
  }
  else
  {
      alert('Game Over. You lost!');
  }
};

  const startFlashing = async () => {
  canClick = false;
  for(const box of sequence)
    {
      await flash(box);
    }
  canClick = true;
   //Make the ability to click the boxes true.
}


const btn = document.getElementById("button");

btn.addEventListener("click", ()=>{

    if(btn.value === "Start"){
      startFlashing();
      panelClicked();
        btn.value = "Stop";
    }else{
      btn.value= "Start";
      return;
    }
})
  
  
  
  

