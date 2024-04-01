let startBtn = document.querySelector('.start-btn');
let popupInfo = document.querySelector('.popup-info');
let exitBtn = document.querySelector('.exit-btn');
let main = document.querySelector('.main');
let continueBtn = document.querySelector('.continue-btn');
let quizSection = document.querySelector('.quiz-section');
let quizBox = document.querySelector('.quiz-box');

startBtn.onclick = function () {
    popupInfo.classList.add('active');
    main.classList.add('active');
};
exitBtn.onclick = function () {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};
continueBtn.onclick = function () {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showquestions(0);
    questioncounter(1);
    headerscore();
};


let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

let nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = function () {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showquestions(questionCount);
        
        questionNumb++;
        questioncounter(questionNumb);
        nextBtn.classList.remove('active');
        // headerscore();


    } else {
        console.log('Question Completed');
    }
};

let optionList = document.querySelector('.option-list');


function showquestions(index) {
    let questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}.${questions[index].question}`;


    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    let option = document.querySelectorAll('.option');
    for (var i = 0; i < option.length; i++) {

        option[i].setAttribute('onclick', 'optionselected(this)');
    }
};
function optionselected(answer) {
    let userAnswer = answer.textContent;
    let correctAns = questions[questionCount].answer;
    let allOption = optionList.children.length;
    if (userAnswer == correctAns) {
        answer.classList.add('correct')
        userScore += 1;
        headerscore();

    } else {
        answer.classList.add('Incorrect')
        for (var i = 0; i < allOption; i++) {
            if (optionList.children[i].textContent == correctAns) {
                optionList.children[i].setAttribute('class', 'option correct');

            }
        }
    }
    for (var i = 0; i < allOption; i++) {
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}

function questioncounter(index) {
    let questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerscore() {
    let headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score : ${userScore} / ${questions.length}`;
}
