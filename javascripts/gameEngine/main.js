// -----------------------------------------------------
// main game loop
// -----------------------------------------------------
var GAME_STAGES = {
  INIT      : 0, 
  SPLASH    : 1, 
  COUNTDOWN : 2, 
  RACE      : 3, 
  FINISH    : 4
};
var GAME_SPEED = 40; // milliseconds, 50ms=20fps, 40ms=25fps

var gameStage=GAME_STAGES.INIT;
var raceName = "";
var game = setInterval(function() {
    if (document.readyState === "complete") {
        gameMainStep();
    }
}, GAME_SPEED); 

function gameMainStep(){
    clearInterval(game);
    var start = new Date().getTime();
    switch (gameStage){
        case GAME_STAGES.INIT:
            doInitStep();
        break;
        case GAME_STAGES.SPLASH:
            doSplashStep();
        break;
        case GAME_STAGES.COUNTDOWN:
            doCountDownStep();
        break;
        case GAME_STAGES.RACE:
            doRaceStep();
        break;
        case GAME_STAGES.FINISH:
            doFinishStep();
        break;
        default:
            doErrorStep();
        break;
    }
    var elapsed = new Date().getTime() - start;
    var nextInterval = GAME_SPEED - elapsed;
    if (nextInterval < 0) {nextInterval = 0; }
    game = setInterval(function() {gameMainStep();}, nextInterval);

}

function doErrorStep(){
    alert("an error occurred");
}


