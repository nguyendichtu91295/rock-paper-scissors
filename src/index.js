var screenStack = [], 
screenLoadingElement,
screenStartElement,
screenPvCElement,
screenCvCElement,
screenResultElement,
buttonCvCElement,
buttonPvCElement,
rockElement, // CLEAR - style display block
paperElement, // CLEAR - style display block
scissorElement, // CLEAR - style display block
countDownTime = 5,
timerElement, // CLEAR - innerHTML = template timer
timerElementCVC, // CLEAR - innerHTML = template timer
timerTemplate,
timeLeft, // CLEAR - undefined
playType,
intervalIntance, // CLEAR - undefined
player1ChoiceId, // CLEAR - undefined
player2ChoiceId, // CLEAR - undefined
p1Result, // CLEAR - undefined
player1ResultElement, // CLEAR - src = null
player2ResultElement, // CLEAR - src = null
player1ResultTextElement, // CLEAR - null
buttonPlayAgainElement, 
buttonChangeModeElement;


function renderScreen() {
    clearScreen();

    switch (screenStack[screenStack.length - 1]) {
        case SCREEN.LOADING:
            screenLoadingElement.style.display = 'block';
            break;
        case SCREEN.START:
            screenStartElement.style.display = 'block';
            break;
        case SCREEN.PVC:
            playType = OTHER_ID.TIMER_CONTAINER_PVC
            renderTimer();
            startCountDown();
            screenPvCElement.style.display = 'block';
            break;
        case SCREEN.CVC:
            playType = OTHER_ID.TIMER_CONTAINER_CVC
            renderTimer();
            startCountDown();

            screenCvCElement.style.display = 'block';
            break;
        case SCREEN.RESULT:

            if (player2ChoiceId !== undefined && player1ChoiceId !== undefined) {
                player2ResultElement.src = OPTION_BUTTON_IMAGE[player2ChoiceId]
                player1ResultElement.src = OPTION_BUTTON_IMAGE[player1ChoiceId]

                switch (playType) {
                    case OTHER_ID.TIMER_CONTAINER_CVC:
                        player1ResultTextElement.innerHTML = RESULT_TEXT_CVC[p1Result]
                        break;
                    default:
                        player1ResultTextElement.innerHTML = RESULT_TEXT[p1Result]
                        break;
                }
            }

            screenResultElement.style.display = 'block';
            break;
        default:
            break;
    }
}

function clearScreen () {
    screenStartElement.style.display = 'none';
    screenPvCElement.style.display = 'none';
    screenCvCElement.style.display = 'none';
    screenResultElement.style.display = 'none';
    screenLoadingElement.style.display = 'none';
}

function closeLoading () {
    screenLoadingElement.style.display = 'none';
}

function cvcHanlder() {
    pushScreen(SCREEN.CVC);
}

function pvcHanlder() {
    pushScreen(SCREEN.PVC);
}

function init () {
    screenLoadingElement = document.getElementById(SCREEN_ID[SCREEN.LOADING]);
    screenStartElement = document.getElementById(SCREEN_ID[SCREEN.START]);
    screenPvCElement = document.getElementById(SCREEN_ID[SCREEN.PVC]);
    screenCvCElement = document.getElementById(SCREEN_ID[SCREEN.CVC]);
    screenResultElement = document.getElementById(SCREEN_ID[SCREEN.RESULT]);
    buttonCvCElement = document.getElementById(BUTTON_ID.CVC);
    buttonPvCElement = document.getElementById(BUTTON_ID.PVC);
    rockElement = document.getElementById(OPTION_BUTTON_ID[OPTION_ID.ROCK]);
    paperElement = document.getElementById(OPTION_BUTTON_ID[OPTION_ID.PAPER]);
    scissorElement = document.getElementById(OPTION_BUTTON_ID[OPTION_ID.SCISSOR]);
    timerElement = document.getElementById(OTHER_ID.TIMER_CONTAINER_PVC);
    timerElementCVC = document.getElementById(OTHER_ID.TIMER_CONTAINER_CVC);
    timerTemplate = document.getElementById(OTHER_ID.TIMER_TEMPLATE);
    player1ResultElement = document.getElementById(OTHER_ID.PLAYER1_RESULT);
    player2ResultElement = document.getElementById(OTHER_ID.PLAYER2_RESULT);
    player1ResultTextElement = document.getElementById(OTHER_ID.PLAYER1_RESULT_TEXT);
    buttonPlayAgainElement = document.getElementById(BUTTON_ID.PLAY_AGAIN);
    buttonChangeModeElement = document.getElementById(BUTTON_ID.CHANGE_MODE);

    //Add click listener
    buttonCvCElement.addEventListener('click', cvcHanlder);
    buttonPvCElement.addEventListener(`click`, pvcHanlder);
    rockElement.addEventListener(`click`, optionsHandler(OPTION_ID.ROCK));
    paperElement.addEventListener(`click`, optionsHandler(OPTION_ID.PAPER));
    scissorElement.addEventListener(`click`, optionsHandler(OPTION_ID.SCISSOR));
    buttonPlayAgainElement.addEventListener(`click`, playAgain);
    buttonChangeModeElement.addEventListener(`click`, changeMode);
}

function pushScreen (screenId) {
    screenStack.push(screenId);

    renderScreen()
}

function startCountDown() {
    switch (playType) {
        case OTHER_ID.TIMER_CONTAINER_PVC:
            intervalIntance = setInterval(countDownHandler(countDownTime, OTHER_ID.TIMER_CONTAINER_PVC), 1000);
            break;
        case OTHER_ID.TIMER_CONTAINER_CVC:
            intervalIntance = setInterval(countDownHandler(countDownTime, OTHER_ID.TIMER_CONTAINER_CVC), 1000);
            player1ChoiceId = generateComputerOption();
            break;
        default:
            break;
    }

    player2ChoiceId = generateComputerOption();
}

function countDownHandler (second = 5, id) {
    return () => {
        if (timeLeft === undefined) {
            timeLeft = second;
        } 

        timeLeft -= 1;

        if (timeLeft < 1) {
            clearInterval(intervalIntance);
            p1Result = checkResultForP1()
            pushScreen(SCREEN.RESULT)
        } 

        renderTimer(timeLeft)
    }
}

function popScreen () {
    screenStack.pop();

    renderScreen()
}

function optionsHandler (type) {
    return (e) => {

        if (player1ChoiceId === undefined && timeLeft > 0) {
            player1ChoiceId = type;
            highlightChoice(type);
        }

        switch (type) {
            case OPTION_ID.ROCK:
                break;
            case OPTION_ID.PAPER:
                break; 
            case OPTION_ID.SCISSOR:
                break;
            default:
                break;
        }
    }
}

function highlightChoice(type) {
   rockElement.style.visibility = 'hidden';
   paperElement.style.visibility = 'hidden';
   scissorElement.style.visibility = 'hidden';

    document.getElementById(OPTION_BUTTON_ID[type]).style.visibility = 'visible'
}

function generateComputerOption () {
    return Math.floor(Math.random() * (OPTION_ID.SCISSOR - OPTION_ID.ROCK + 1) + OPTION_ID.ROCK)
}

function checkResultForP1 () {
    let result = RESULT.WIN;

    if (player1ChoiceId ===  OPTION_ID.ROCK) {
        if (player2ChoiceId === OPTION_ID.PAPER) {
            result = RESULT.LOST;
        } else if (player2ChoiceId === OPTION_ID.ROCK) {
            result = RESULT.DRAW;
        }
    }

    if (player1ChoiceId ===  OPTION_ID.PAPER) {
        if (player2ChoiceId === OPTION_ID.SCISSOR) {
            result = RESULT.LOST;
        } else if (player2ChoiceId === OPTION_ID.PAPER) {
            result = RESULT.DRAW;
        }
    }

    if (player1ChoiceId ===  OPTION_ID.SCISSOR) {
        if (player2ChoiceId === OPTION_ID.ROCK) {
            result = RESULT.LOST;
        } else if (player2ChoiceId === OPTION_ID.SCISSOR) {
            result = RESULT.DRAW;
        }
    }

    return result;
}

function playAgain () {
    rockElement.style.visibility = 'visible';
    paperElement.style.visibility = 'visible';
    scissorElement.style.visibility = 'visible';
    // timerElement.innerHTML = 5
    timeLeft = undefined;
    intervalIntance = undefined;
    player1ChoiceId = undefined;
    player2ChoiceId = undefined;
    p1Result = undefined;
    player1ResultElement.src = '';
    player2ResultElement.src = '';
    player1ResultTextElement.innerHTML = 'NO CHOICE!';

    switch (playType) {
        case OTHER_ID.TIMER_CONTAINER_PVC:
            pushScreen(SCREEN.PVC)
            break;
        case OTHER_ID.TIMER_CONTAINER_CVC:
            pushScreen(SCREEN.CVC)
            break;
        default:
            break;
    }

}

function renderTimer (time = countDownTime) {
    const instance = document.importNode(timerTemplate.content, true);

    instance.querySelector(`.${OTHER_ID.TIMER}`).innerHTML = time;

    switch (playType) {
        case OTHER_ID.TIMER_CONTAINER_CVC:
            timerElementCVC.innerHTML = null;
            timerElementCVC.appendChild(instance);
            break;
        case OTHER_ID.TIMER_CONTAINER_PVC:
            timerElement.innerHTML = null;
            timerElement.appendChild(instance);
            break;
    
        default:
            break;
    }

}

function changeMode () {
    window.location.reload();
}

function main() {
    //init buttons
    init();
    //init start screen
    pushScreen(SCREEN.START);
}


setTimeout(main, 1000);