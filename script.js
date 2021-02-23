// DOM
var startBtn = document.getElementById("start-button");
var containerEl = document.getElementById("container");
var questionEl = document.getElementById("questions");
var answerEl = document.getElementById("buttons");
var timeEl = document.getElementById("time-display");
var hiddenTimerEl = document.getElementById("timer");
var inputEl = document.getElementById("high-score-input");
var nameEl = document.getElementById("high-score");
var submitBtn = document.getElementById("submit-high-score");
var restartBtn = document.getElementById("restart-button");
var clearBtn = document.getElementById("clear-score");
var scoreList = document.getElementById("score-list");
var highScoreBtn = document.getElementById("scores-button")


if (highScoreBtn){
  highScoreBtn.addEventListener('click', function() {
    window.location.assign("highscores.html")
  });
}
if(submitBtn) {
  submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    score();
    renderScore();
    window.location.assign('highscores.html');
  });
}
// i dont know why the restartbtn doesnt work
if (restartBtn) {
  restartBtn.addEventListener('click', funtion(){
    window.location.assign('index.html');
  
  });
};

if (clearBtn) {
  clearBtn.addEventListener('click',function(){
    localStorage.clear();
    scoreList.innerHTML='';
    
  
  });
};

if (startBtn) {
  startBtn.addEventListener('click', function(){
     startGame();
     timer();

  });
}


// question array
var questions = [
  {
    question: "Where is the correct place to insert JavaScript?",
    answers: ["The <body> section","The <head> section", "Both the <head> and <body> section"],
    correct:"The <body> section"
  },

  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: ['alertbox("Hello World")',"msg(Hello World)","msgbox(Hello World)",'alert("Hello World")'],
    correct:'alert("Hello World")'
  },

  {
    question:"Which of the following type of variable is visible only within a function where it is defined?",
    answer: ["Global Variable","Local Variable","Both of the above","None of the above"],
    correct:"Local Variable"
  },

  {
    question:"Variable in JavaScript declared with which of the following keyword?",
    answer: ["New","Int","String","Var"],
    correct:"Var"
  },
  {
    question: "What is null in JavaScript?",
    answer: ["Null means empty string value","Null means absence of a value","Null means unknown value","Null means zero value",],
    correct:"Null means absence of a value"
  },
];

var answers =questions.answers;
var questionIndex = 0;
var timeLeft= 100;
var timeCount;
// render the score
function renderScore() {
  if(scoreList) {
    var listScores = [];

    if (localStorage.getItem('highScore')) {
      listScores=JSON.parse(localStorage.getItem('highScores'));
    }
    scoreList.innerHTML= '';

    listScores.forEach(function(score){
      var listItemEl =document.createElement('i');
      listItemEl.textContent=JSON.stringify(score);
      scoreList.appendChild(listItemEl);
    });
  }
}
// score to loca storage
function score() {
  var scores = [];

  if (localStorage.getItem('highScore')){
    scores=JSON.parse(localStorage.getItem('highScore'));
  }
  var initial =nameEl.value;
  var remainingTime = JSON.stringify(timeLeft);
  var highScore ={
    name: initial,
    score:remainingTime,
  };
  score.push(highScore);
  var stringOfScores=JSON.stringify(score);
  localStorage.setItem('highScore',stringOfScores);
  renderScore();
}
function timer(){
  timeCount=setInterval(function(){
    timeLeft--;
    timeEl.textContent=timeLeft;

    if (timeLeft <= 0){
      if (timeLeft<=0){
        timeLeft=0
      }
      alert('Time is Up, Your score is : ' +timeLeft);
      containerEl.classList.add('hide');
      clearInterval(timeLeft);
      endGame();
    }
  }, 1000);
};

  // answers are true or false
  function selectedAnswer(event){
    if (event.target.textContent!== questions[questionIndex].correct){
      timeLeft -= 10;
    }

   
  
 questionIndex++;

  if (questionIndex!== questions.length){
   startGame();
  } else {
   alert('Game Over!, Your Score is : '+ timeLeft);
   clearInterval(timeLeft);
   endGame();
 }
}

// starting game
function startGame(){
  startBtn.classList.add ('hide');
  highScoreBtn.classList.add('hide');
  hiddenTimerEl.classList.remove('hide');
  containerEl.classList.remove('hide');
  questionEl.textContent = questions[questionIndex].question;
  answersEl.innerHTML = "";
  for (var i = 0; i < questions[questionIndex].answers.length;i++){
    var newAnswer = questions[questionIndex].answers[i];
    var answerButton =document.createElement('button');
    answerButton.classList.add('button');
    answerButton.textContent=newAnswer;
    answerButton.addEventListener('click', selectedAnswer);
    answerEl.appendChild(answerButton);
  }
}
function init(){
  renderScore();
}
init();