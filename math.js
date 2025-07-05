let divElement = document.createElement("div");
divElement.classList.add("bg-container");
document.body.appendChild(divElement);


let imgDiv = document.createElement("div");
imgDiv.classList.add("imageBodyContainer");
let imageEl = document.createElement("img");
imageEl.src = "https://media.aidaform.com/us-east-1%3Aee61cb49-5d3e-4852-b28f-45fb4a6f75ac/e0l01wpv98.png";
imageEl.classList.add("imageElement");
divElement.appendChild(imgDiv);
imgDiv.appendChild(imageEl);


let rowDiv = document.createElement("div");
let questionNumber = document.createElement("h3");
questionNumber.textContent = "Question : 0 / 20";
questionNumber.id = "questionId";
questionNumber.classList.add("questionClass", "d-column");
imgDiv.appendChild(rowDiv);
rowDiv.appendChild(questionNumber);

let correctAnswerHeading = document.createElement("h3");
correctAnswerHeading.textContent = "Correct : 0 / 20";
correctAnswerHeading.classList.add("questionClass", "d-column");
rowDiv.appendChild(correctAnswerHeading);

let timerElement = document.createElement("h2");
timerElement.style.marginTop = "1rem";
timerElement.style.color = "blue";
timerElement.classList.add("questionClass","d-column");
rowDiv.appendChild(timerElement);


let divElement2 = document.createElement("div");
divElement2.classList.add("inputContainer");

let inputElement1 = document.createElement("input");
inputElement1.classList.add("input1");

let addition = document.createElement("h1");

let inputElement2 = document.createElement("input");
inputElement2.classList.add("input2");

let isEqualTo = document.createElement("h1");
isEqualTo.textContent = "=";

let inputElement3 = document.createElement("input");
inputElement3.classList.add("input3");

divElement2.appendChild(inputElement1);
divElement2.appendChild(addition);
divElement2.appendChild(inputElement2);
divElement2.appendChild(isEqualTo);
divElement2.appendChild(inputElement3);
divElement.appendChild(divElement2);


let divElement3 = document.createElement("div");
divElement3.classList.add("div3");

let restartButton = document.createElement("button");
restartButton.textContent = "Restart";
restartButton.classList.add("btn", "btn-primary");

let checkButton = document.createElement("button");
checkButton.textContent = "Check";
checkButton.classList.add("button", "btn", "btn-danger");

divElement3.appendChild(restartButton);
divElement3.appendChild(checkButton);
divElement.appendChild(divElement3);


let divElement4 = document.createElement("div");
divElement4.classList.add("div4");
let result = document.createElement("p");
divElement4.appendChild(result);
divElement.appendChild(divElement4);

const operators = ["+", "-", "*", "/"];
let randomOperator = "+";

let noOfQuestions = 0;
let noOfCorrectQuestions = 0;
let answered = false;


checkButton.onclick = function () {
  if (answered) return;
  answered = true;
  
  const num1 = parseInt(inputElement1.value);
  const num2 = parseInt(inputElement2.value);
  const guessedNumber = parseFloat(inputElement3.value);
  
  let correctAnswer;
  switch (randomOperator) {
    case "+": correctAnswer = num1 + num2; break;
    case "-": correctAnswer = num1 - num2; break;
    case "*": correctAnswer = num1 * num2; break;
    case "/": correctAnswer = parseFloat((num1 / num2).toFixed(2)); break;
  }
  
  if (randomOperator === "/" && Math.abs(correctAnswer - guessedNumber) <= 0.01) {
    result.textContent = "You are right!";
    result.style.backgroundColor = "green";
    result.style.color = "white";
    noOfCorrectQuestions++;
    correctAnswerHeading.textContent = `Correct : ${noOfCorrectQuestions} / 20`;
  } else if (correctAnswer === guessedNumber) {
    result.textContent = "You are right!";
    result.style.backgroundColor = "green";
    result.style.color = "white";
    noOfCorrectQuestions++;
    correctAnswerHeading.textContent = `Correct : ${noOfCorrectQuestions} / 20`;
  } else {
    result.textContent = `You are wrong! Correct answer is: ${correctAnswer}`;
    result.style.backgroundColor = "red";
    result.style.color = "white";
  }
};

let timeLeft = 10; 
let timerId = setInterval(updateTimer, 1000);

function updateTimer() {
  timerElement.textContent = formatTime(timeLeft);
  timeLeft--;
  
  if (timeLeft < 0) {
    clearInterval(timerId);
    timerElement.textContent = "";
    result.textContent = "Time's up!";
    result.style.backgroundColor = "orange";
    result.style.color = "white";
    inputElement1.disabled = true;
    inputElement2.disabled = true;
    inputElement3.disabled = true;
    checkButton.disabled = true;
    restartButton.disabled = true;
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

restartButton.onclick=function(){
  const num1 = Math.ceil(Math.random() * 10);
  const num2 = Math.ceil(Math.random() * 10);
  inputElement1.value = num1;
  inputElement2.value = num2;
  randomOperator = operators[Math.floor(Math.random() * operators.length)];
  addition.textContent = randomOperator;
  result.textContent = "";
  result.style.backgroundColor = "";
  result.style.color = "";
  inputElement3.value = "";
  answered = false; 
  noOfQuestions++;
  questionNumber.textContent = `Question : ${noOfQuestions} / 20`;
  if(noOfQuestions===20){
    clearInterval(timerId);
    timerElement.textContent="";
    result.textContent="Quiz is over";
    result.style.backgroundColor="orange";
    result.style.color="white";
    inputElement1.disabled = true;
    inputElement2.disabled = true;
    inputElement3.disabled = true;
    checkButton.disabled = true;
    restartButton.disabled = true;
  }
}
restartButton.click();