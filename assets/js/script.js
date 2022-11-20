// HTML-DOM ELEMENTS
const startBtnEl = document.getElementById('start-btn');
const restartBtnEl = document.getElementById('restart-btn');
const restartBtnEl2 = document.getElementById('restart-btn2');
const nextBtnEl = document.getElementById('next-btn');
const submitBtnEl = document.getElementById('submit-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEL = document.getElementById('question');
const answerBtnsEl = document.getElementById('answer-buttons');
const controlsEl = document.querySelector('.controls');
const correctTextConfirm = document.getElementById('correct')
const incorrectTextConfirm = document.getElementById('incorrect');
const timerContainer = document.getElementById('timer-container')
const submitFormEl = document.getElementById('submit-form')
const usernameSubmitBtnEl = document.getElementById('username-submit')
const usernameInput = document.getElementById('username');
const showHighscoresBtn = document.getElementById('show-highscores-btn')
const scoreContainer = document.getElementById('highscore-container')
const highscoreDiv = document.querySelector('.highscore');
let timer = document.querySelector('.timer')
let score =  0;
let countdown;
let usernameSubmittal = usernameInput.value; 

//high score global variables
const NO_OF_HIGH_SCORES = 10;
const HIGH_SCORES = 'highScores';



const questions = [
  {
    question: 'Commonly used data types do NOT include:',
    answers: [
      { text: 'Strings', correct: false},
      { text: 'Boolean', correct: false},
      { text: 'Numbers', correct: false},
      { text: 'Images', correct: true}
    ]
  },
  {
    question: 'The condition in an if/else statement is enclosed with:',
    answers: [
      { text: 'Brackets', correct: false},
      { text: 'Curly Brackets', correct: false},
      { text: 'Quotations Marks', correct: false},
      { text: 'Parentheses', correct: true}
    ]
  },
  {
    question: 'Arrays in Javascript can be used to store:',
    answers: [
      { text: 'Strings', correct: false},
      { text: 'Boolean', correct: false},
      { text: 'Numbers', correct: false},
      { text: 'All of the above', correct: true}
    ]
  },
  {
    question: 'Select the best option from the choices below to complete this sentence: A string must be enclosed within ________ when being assigned to a variable',
    answers: [
      { text: 'Quotation Marks', correct: true},
      { text: 'Parentheses', correct: false},
      { text: 'Semicolons', correct: false},
      { text: 'None of the above', correct: false}
    ]
  },
  {
    question: "A useful tool for printing content to the browser's console for debugging purposes is:",
    answers: [
      { text: 'Alerts', correct: false},
      { text: 'Prompts', correct: false},
      { text: 'console.log', correct: true},
      { text: 'debugger', correct: false}
    ]
  }
]

///////////////////////////////////////////////////////////////////////////////////////

// INIT QUESTION VARIABLES
let shuffledQuestions, currentQuestionIndex;

// FUNCTION STARTQUIZ (shuffles questions/sets question index, adds/removes hidden class, calls setNextQuestion and the timerFxn)
function startQuiz() {
  countdown = 40;
  startBtnEl.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove('hide');
  setNextQuestion() 
  startTime()
}

// FUNCTION SETNEXTQUESTION calls resetState() and showQuestion with arg shuffledQuestions[currentQuestionIndex]
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex])
}


// FUNCTION RESET STATE calls clearStatusClass
function resetState(){ 
  nextBtnEl.classList.add('hide');
  submitBtnEl.classList.add('hide');
  clearStatusClass(document.body);
  while (answerBtnsEl.firstChild) {
    answerBtnsEl.removeChild(answerBtnsEl.firstChild);
  }
}

//FUNCTION CLEARSTATUSCLASS - adds and removes classes for correct and wrong
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
  correctTextConfirm.classList.add('hide');
  incorrectTextConfirm.classList.add('hide');
};  

function showQuestion(question) {
  questionEL.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer);
      answerBtnsEl.appendChild(button);
  })
}

   function startTime() {
    
    let timerFxn = setInterval(quizTimer, 1000)
    
      function quizTimer() {
        if(countdown >= 2) {
          timer.textContent = 'Time Remaining: ' + countdown + ' seconds';
          countdown--;
        } else if (countdown === 1) {
          timer.textContent = 'Time Remaining: ' + countdown + ' second';      
          countdown--;
        } else if (countdown < 1) {
          // timer.textContent = 'Time up!';
          timer.textContent = 'Quiz has ended!';
          // displayScore();
          clearInterval(timerFxn);
          // endQuiz();
        } 
      }
    }



// FUNCTION SELECTANSWER(e) calls setStatusClass
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++
  } else {
    countdown = countdown - 4;
  }
  setStatusClass(document.body, correct)
  Array.from(answerBtnsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextBtnEl.classList.remove('hide');
  } else {
    endQuiz();
  }
  if (correct) {
    correctTextConfirm.classList.remove('hide');
  } else {
    incorrectTextConfirm.classList.remove('hide');
  }
}

//FUNCTION SETSTATUSCLASS calls clearStatusClass(element)
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
};

const endQuiz = function() {
    restartBtnEl.classList.remove('hide');
    score = score + countdown + 60;
    // submitBtnEl.classList.remove('hide');
    countdown = 0;

    checkHighScore(score);
    // submitBtnEl.addEventListener('click', submitScore)
    restartBtnEl.addEventListener('click', startQuiz)
}

function checkHighScore(score) {
  const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
  const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.SCORE ?? 0;
  
  if (score > lowestScore) {
    saveHighScore(score, highScores); 
    showHighScores(); // to do
  }
}

function saveHighScore(score, highScores) {
  const name = prompt('You got a highscore! enter name:');
  const newScore = { score, name };

  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(NO_OF_HIGH_SCORES);
  localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
}

function showHighScores() {
  const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
  const highScoreList = document.getElementById(HIGH_SCORES);

  highScoreList.innerHTML = highScores  
      .map((score) => `<li>${score.score} - ${score.name}`)
      .join('');

      scoreContainer.classList.remove('hide');
}



//+++++++++++ EVENT LISTENERS for start button and next button ++++++++++++
startBtnEl.addEventListener('click', startQuiz);
nextBtnEl.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});
// usernameSubmitBtnEl.addEventListener('click', saveScore);
// showHighscoresBtn.addEventListener('click', showHighScoreDisplay)
 



// const submitScore = function() {
//   submitFormEl.classList.remove('hide');
//   let usernameSubmittal = usernameInput.value; 
//   console.log(usernameSubmittal);
// }

// const saveScore = function() {
//   let usernameSubmittal = usernameInput.value; 
//   console.log(usernameSubmittal);
//   console.log(score);
//   localStorage.setItem(usernameSubmittal, score);
//   showHighscoresBtn.classList.remove('hide');
// }

// const showHighScoreDisplay = function() {
//   questionContainerEl.classList.add('hide')
//   controlsEl.classList.add('hide');
//   restartBtnEl2.classList.remove('hide');
//   highscoresContainer.classList.remove('hide')
// }



