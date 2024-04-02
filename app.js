let startBtn = document.querySelector('.start-btn');
let popupInfo = document.querySelector('.popup-info');
let exitBtn = document.querySelector('.exit-btn');
let main = document.querySelector('.main');
let continueBtn = document.querySelector('.continue-btn');
let quizSection = document.querySelector('.quiz-section');
let quizBox = document.querySelector('.quiz-box');
let resultBox = document.querySelector('.result-box');
let tryAgainBtn = document.querySelector('.tryagain-btn');
let goHomeBtn = document.querySelector('.gohome-btn');

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

tryAgainBtn.onclick = function () {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showquestions(questionCount);
    questioncounter(questionNumb);
    headerscore();
};
goHomeBtn.onclick = function () {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showquestions(questionCount);
    questioncounter(questionNumb);
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
        // console.log('Question Completed');
        showresultbox();
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

function showresultbox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    let scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} Out Of ${questions.length}`;


    let circularProgress = document.querySelector('.circular-progress');
    let progressValue = document.querySelector('.progress-value');

    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(function () {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#edc00c ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)
`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);

}