let quizContainer = document.querySelector('.quiz-container');

let startBtnEl = document.createElement('button');
startBtnEl.textContent = 'Start Quiz';
startBtnEl.className = 'start-btn';

quizContainer.appendChild(startBtnEl);


const quizQuestions = [
  {
    question: "Commonly used data types do NOT include:",
    a: "Strings",
    b: "Numbers",
    c: "Boolean",
    d: "Images",
    correctAnswer: 'd'
  },
  {
    question: "The condition in an if/else statement is enclosed with:",
    a: "Brackets",
    b: "Curly Brackets",
    c: "Quotation Mark",
    d: "Parentheses",
    correctAnswer: 'd'
  },
  {
    question: "Arrays in Javascript can be used to store:",
    a: "Strings",
    b: "Numbers",
    c: "Booleans",
    d: "All of the above",
    correctAnswer: 'd'
  },
  {
    question: "Select the best option from the choices below to complete this sentence: A string must be enclosed within ________ when being assigned to a variable",
    a: "Quotation Marks",
    b: "Parentheses",
    c: "Semicolons",
    d: "None of the above",
    correctAnswer: 'a'
  },
  {
    question: "A useful tool for printing content to the browser's console for debugging purposes is:",
    a: "Alerts",
    b: "Prompts",
    c: "console.log",
    d: "debugger",
    correctAnswer: 'c'
  },


  
]