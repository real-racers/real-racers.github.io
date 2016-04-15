
var COUNTDOWN_SUB_STAGES = {
    INIT:   0, 
    THREE:  1, 
    TWO:    2, 
    ONE:    3,
    GO:     4,
    FINISH: 5
};

var countdownSubStage = COUNTDOWN_SUB_STAGES.INIT;
var countDownStartTime = 0;
function doCountDownStep(){
    switch(countdownSubStage){
        case COUNTDOWN_SUB_STAGES.INIT:
            // TODO: push this functionality in gui
            document.getElementById("countDown").style.visibility='visible';
            countDownStartTime = new Date().getTime();
            countdownSubStage++;
        break;
        case COUNTDOWN_SUB_STAGES.THREE:
            // TODO: push this functionality in gui
            document.getElementById("countDown").style.backgroundImage = "url('./images/countDown_3.png')";
            var currentTime = new Date().getTime();
            if ((currentTime - countDownStartTime) >= 1000){
                // a second passed, go next
                countdownSubStage++;
                // show rpm and speed meter
                // TODO: push this functionality in gui
                document.getElementById("rpm").style.visibility='visible';
                // TODO: push this functionality in gui
                document.getElementById("speed").style.visibility='visible';
            }
        break;
        case COUNTDOWN_SUB_STAGES.TWO:
            // TODO: push this functionality in gui
            document.getElementById("countDown").style.backgroundImage = "url('./images/countDown_2.png')";
            var currentTime = new Date().getTime();
            if ((currentTime - countDownStartTime) >= 2000){
                // a second passed, go next
                countdownSubStage++;
                // show brake button
                // TODO: push this functionality in gui
                document.getElementById("brake").style.visibility='visible';
            }
        break;
        case COUNTDOWN_SUB_STAGES.ONE:
            // TODO: push this functionality in gui
            document.getElementById("countDown").style.backgroundImage = "url('./images/countDown_1.png')";
            var currentTime = new Date().getTime();
            if ((currentTime - countDownStartTime) >= 3000){
                // a second passed, go next
                countdownSubStage++;
                // show car
                // TODO: push this functionality in gui
                document.getElementById("car").style.visibility='visible';
            }
        break;
        case COUNTDOWN_SUB_STAGES.GO:
            // TODO: push this functionality in gui
            document.getElementById("countDown").style.backgroundImage = "url('./images/countDown_0.png')";
            var currentTime = new Date().getTime();
            if ((currentTime - countDownStartTime) >= 3100){
                // a 1/10 second passed, go next
                countdownSubStage++;
            }
        break;
        case COUNTDOWN_SUB_STAGES.FINISH:
            // TODO: push this functionality in gui
            document.getElementById("countDown").style.visibility='hidden';
            gameStage++;
        break;
        default:
            doErrorStep();
        break;
    }
}

