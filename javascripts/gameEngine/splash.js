// -----------------------------------------------------
// Splash:
// - visualize a screen sumarizing track data
// - two buttons: race and go back
// - the screen have to came from the left,
// - the screen have to go away from right 
// -----------------------------------------------------
var SPLASH_SUB_STAGES = {
    INIT         : 0, 
    LEFT2CENTER  : 1, 
    WAIT         : 2, 
    CENTER2RIGHT : 3,
    FINISH       : 4,
    GOBACK       : 99
};


function populateRaceDetails(){
    // TODO: here call android to get race details
    var retval= raceName + " = populateRaceDetails ciao ciao ciao ciao ciao";
    document.getElementById("raceSummaryContent").innerHTML = retval;
    return;
}

function populateMoreDetails(){
    // TODO: here call android to get race details
    var retval= raceName + " = populateMoreDetails ciao ciao ciao ciao ciao";
    document.getElementById("raceSummaryContent").innerHTML = retval;
    return;
}

function populateOnlineStats(){
    // TODO: here call android who calls internet to get race details
    var retval= raceName + " = populateOnlineStats ciao ciao ciao ciao ciao";
    document.getElementById("raceSummaryContent").innerHTML = retval;
    return;
}


var splashSubStage = SPLASH_SUB_STAGES.INIT;
//var splashSubStage = SPLASH_SUB_STAGES.FINISH;
var splashUserClickRace = false;
var splashUserClickBack = false;
var splashUserClickMore = false;
var splashUserClickOnline = false;
function doSplashStep(){
    switch(splashSubStage){
        case SPLASH_SUB_STAGES.INIT:
            // position the splash screen left
            document.getElementById("raceSummary").style.visibility="visible";
            document.getElementById("raceSummary").style.top = 0 + "px";
            document.getElementById("raceSummary").style.left = availableWidth + "px";
            populateRaceDetails();
            splashSubStage++;
        break;
        case SPLASH_SUB_STAGES.LEFT2CENTER:
            // move splash screen from left to center
            var raceSummaryLeft = document.getElementById("raceSummary").offsetLeft;
            document.getElementById("raceSummary").style.left = (raceSummaryLeft - 5) + "px";
            if (raceSummaryLeft <= 5 ){
                document.getElementById("raceSummary").style.left = 0 + "px";
                splashSubStage++;
            }
        break;
        case SPLASH_SUB_STAGES.WAIT:
                if (splashUserClickRace){
                    splashSubStage++;
                }else if (splashUserClickBack){
                    gameStage=GAME_STAGES.FINISH;
                }else if (splashUserClickMore){
                    populateMoreDetails();
                }else if (splashUserClickOnline){
                    populateOnlineStats();
                }else {
                    // no button pressed... simply wait and do nothing
                }
                splashUserClickRace = false;
                splashUserClickBack = false;
                splashUserClickMore = false;
                splashUserClickOnline = false;
        break;
        case SPLASH_SUB_STAGES.CENTER2RIGHT:
            // move splash screen from center to right
            var raceSummaryLeft = document.getElementById("raceSummary").offsetLeft;
            document.getElementById("raceSummary").style.left = (raceSummaryLeft - 5) + "px";
            if (raceSummaryLeft+availableWidth <= 5 ){
                splashSubStage++;
            }
        break;
        case SPLASH_SUB_STAGES.FINISH:
            // go to next step in game
            document.getElementById("raceSummary").style.visibility="hidden";
            gameStage++;
        break;
        default:
            doErrorStep();
        break;
    }
}

