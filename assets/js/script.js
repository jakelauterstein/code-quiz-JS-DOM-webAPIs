let quizContainer = document.querySelector('.quiz-container');
let startBtnEl = document.createElement('button');
startBtnEl.textContent = 'Start Quiz';
startBtnEl.className = 'start-btn';
let mainTitleEl = document.querySelector('.main-title');
let currentQuestion = 0;

quizContainer.appendChild(startBtnEl);
let countdown = 9;

const questions = [
  "Commonly used data types do NOT include:",

  "The condition in an if/else statement is enclosed with:",

  "Arrays in Javascript can be used to store:",

  "Select the best option from the choices below to complete this sentence: A string must be enclosed within ________ when being assigned to a variable",

  "A useful tool for printing content to the browser's console for debugging purposes is:"
]


const quizAnswersObj = [
  {
  a: "Strings",
  b: "Numbers",
  c: "Boolean",
  d: "Images",
  },
  {
    a: "Brackets",
    b: "Curly Brackets",
    c: "Quotation Mark",
    d: "Parentheses",
  },
  {
    a: "Strings",
    b: "Numbers",
    c: "Booleans",
    d: "All of the above",
  },
  {
  a: "Quotation Marks",
  b: "Parentheses",
  c: "Semicolons",
  d: "None of the above",
  },
  {
    a: "Alerts",
    b: "Prompts",
    c: "console.log",
    d: "debugger",
  }
]

const quizQuestionsObj = [
  {
    question: "Commonly used data types do NOT include:"
  },
  {
    question: "The condition in an if/else statement is enclosed with:"
  },
  {
    question: "Arrays in Javascript can be used to store:",
  },
  {
    question: "Select the best option from the choices below to complete this sentence: A string must be enclosed within ________ when being assigned to a variable"
  },
  {
    question: "A useful tool for printing content to the browser's console for debugging purposes is:"
  },
 
]

const startQuiz = function() {
 

  startBtnEl.remove();
  mainTitleEl.remove();


  let timerContainer = document.createElement('div');
    timerContainer.className = 'timer-container';
    let timer = document.createElement('p');
    timer.textContent = 'Time Remaining:'
    timer.className = "timer";
    let timeRemaining = document.createElement('span');
    timeRemaining.className = 'time-display';
    timeRemaining.textContent = ' ' + countdown + ' seconds';

  const timerFunction = setInterval(function() {

    if(countdown >= 2) {
      timeRemaining.textContent = ' ' + countdown + ' seconds';
      countdown--;
    } else if (countdown === 1) {
      timeRemaining.textContent = ' ' + countdown + ' second';
      countdown--;
    } else if (countdown < 1) {
      timeRemaining.remove();
      timeRemaining.textContent = 'Time up!';
      timer.textContent = 'Time up!';
      // displayScore();
      clearInterval(timerFunction);
    }

  }, 1000)


  timerContainer.appendChild(timer);
  timerContainer.appendChild(timeRemaining);
  quizContainer.appendChild(timerContainer);

  
}

const displayQuiz = function () {
  
  const question1 = quizQuestionsObj[0].question;
  let quizQuestion = document.createElement('p');
  quizQuestion.textContent = question1;
  quizQuestion.className = "quiz-question";
  quizContainer.appendChild(quizQuestion);

  
  for (i = 0; i < 4; i++) {
    let choiceContainer = document.createElement('div');
    choiceContainer.setAttribute('id', i);

    let answerBtn = document.createElement('input');
    answerBtn.setAttribute("type", "radio");
    answerBtn.setAttribute("name", "answer");
    answerBtn.setAttribute('id', i);
    answerBtn.className = "radio-btn"

    let forAnswer = document.createElement('label');
    forAnswer.setAttribute("for", i);
    if (currentQuestion === 0 && i === 0) {
      forAnswer.textContent = (quizAnswersObj[currentQuestion].a);
    }
    if (currentQuestion === 0 && i === 1) {
      forAnswer.textContent = (quizAnswersObj[currentQuestion].b);
    }
    if (currentQuestion === 0 && i === 2) {
      forAnswer.textContent = (quizAnswersObj[currentQuestion].c);
    }
    if (currentQuestion === 0 && i === 3) {
      forAnswer.textContent = (quizAnswersObj[currentQuestion].d);
    }
    
    
    choiceContainer.appendChild(answerBtn);
    choiceContainer.appendChild(forAnswer);
    quizContainer.appendChild(choiceContainer);
  }

  
 

}


startBtnEl.addEventListener('click', startQuiz)
startBtnEl.addEventListener('click', displayQuiz)







 // let quizQuestion = document.createElement('p');
  // const myQuizQuestions = questions[0];
  // quizQuestion.textContent = myQuizQuestions
  // quizQuestion.className = 'quiz-question'
  // quizContainer.appendChild(quizQuestion);