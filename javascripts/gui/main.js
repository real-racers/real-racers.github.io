// -----------------------------------------------------
// global constants
// -----------------------------------------------------
var DIV_SPEED_HEIGHT = 50;
var DIV_SPEED_WIDTH = 100;
var DIV_SPEEDUP_HEIGHT = 70;
var DIV_SPEEDUP_WIDTH = 70;
var DIV_RPM_HEIGHT = 50;
var DIV_RPM_WIDTH = 100;
var DIV_CAR_HEIGHT = 50;
var DIV_CAR_WIDTH = 50;
var DIV_COUNTDOWN_HEIGHT = 200;
var DIV_COUNTDOWN_WIDTH = 200;
var DIV_SPLASH_BUTTONS_HEIGHT = 100;
var DIV_SPLASH_BUTTONS_WIDTH = 200;
var DIV_BRAKE_BUTTONS_HEIGHT = 100;
var DIV_BRAKE_BUTTONS_WIDTH = 100;

// -----------------------------------------------------
// global variables
// -----------------------------------------------------
var map;
var circuits;
var elements;
var availableHeight;
var availableWidth;
var guiInitialized = false;
var brakePressed = false;

// -----------------------------------------------------
// Handle brake events
// -----------------------------------------------------
function pressBrake(event){
    //event.preventDefault();
    brakePressed = true;
    document.getElementById("brake").style.backgroundImage = "url('./images/brake.png')";
    try{
        event.preventDefault();
        event.stopPropagation();
    }catch(err){
        // nothing to do
    }
    return;
}

function releaseBrake(event){
    //event.preventDefault();
    brakePressed = false;
    document.getElementById("brake").style.backgroundImage = "url('./images/noBrake.png')";
    try{
        event.preventDefault();
        event.stopPropagation();
    }catch(err){
        // nothing to do
    }
    return;
}

// -----------------------------------------------------
// Handle carMovement
// -----------------------------------------------------
function moveCar(currentX,currentY) {
    // calculate center of the screen in pixel
    var centerX = availableWidth/2;
    var centerY = availableHeight/2;
    //var currentX = event.xy.x;
    //var currentY = event.xy.y;

    try{
        var tempCarCurrentAngle = Math.atan ((currentX-centerX)/(centerY-currentY)) * (180 / Math.PI);
        if ((currentX > centerX) && (currentY > centerY)){
            tempCarCurrentAngle = (90 + tempCarCurrentAngle) + 90 ;
        }else if ((currentX <= centerX) && (currentY > centerY)){
            tempCarCurrentAngle = tempCarCurrentAngle + 180;
        }else if ((currentX <= centerX) && (currentY <= centerY)){
            tempCarCurrentAngle = (90 + tempCarCurrentAngle) + 270 ;
        }else{

        }
        carCurrentAngle = tempCarCurrentAngle;
        turnCarImage();

    }catch(err){
        // nothing to do
    }
}

function turnCarImage(){
    // find best car image to draw
    var carImageNumber = Math.round (carCurrentAngle / 10)
    if ((carImageNumber <= 0) || (carImageNumber >= 36)){
        carImageNumber = 0;
    }else{
        carImageNumber *= 10;
    }
    document.getElementById("car").style.backgroundImage = "url('./images/cars/default/"+ carImageNumber +"_deg.png')"; 
    //document.getElementById("debugWindow").innerHTML = "carCurrentAngle "+carCurrentAngle;
}
 

// -----------------------------------------------------
// Init map and calculate available space for controls
// -----------------------------------------------------
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        init();
        clearInterval(readyStateCheckInterval);
    }
}, 10);

function init() {
    initMap();
    onBodyResize();
}

// -----------------------------------------------------
// Handle page resize
// -----------------------------------------------------
var resizeTimeOut;
function onBodyResize(){
    guiInitialized = false;
    clearTimeout(resizeTimeOut);
    resizeTimeOut = setTimeout(doneBodyResizing, 500);
}
function doneBodyResizing(){
    availableHeight = map.getSize().h;
    availableWidth = map.getSize().w;
    map.updateSize();
    document.getElementById("speed").style.top = "0" + "px";
    document.getElementById("speed").style.left = (availableWidth-DIV_SPEED_WIDTH) + "px";
    document.getElementById("rpm").style.top = DIV_SPEED_HEIGHT + "px";
    document.getElementById("rpm").style.left = (availableWidth-DIV_RPM_WIDTH) + "px";
    document.getElementById("speedUp").style.top = (availableHeight-DIV_SPEED_HEIGHT-DIV_SPEEDUP_HEIGHT) + "px";
    document.getElementById("car").style.top = ((availableHeight/2)-(DIV_CAR_HEIGHT/2)) + "px";
    document.getElementById("car").style.left = ((availableWidth/2)-(DIV_CAR_WIDTH/2)) + "px";
    document.getElementById("main").style.maxWidth = availableWidth + "px";
    document.getElementById("main").style.maxHeight = availableHeight + "px";
    document.getElementById("raceSummary").style.width = availableWidth + "px";
    document.getElementById("raceSummary").style.height = availableHeight + "px";
    document.getElementById("raceSummaryContent").style.width = availableWidth + "px";
    document.getElementById("raceSummaryContent").style.height = (availableHeight - DIV_SPLASH_BUTTONS_HEIGHT) + "px";
    document.getElementById("countDown").style.top = ((availableHeight/2)-(DIV_COUNTDOWN_HEIGHT/2)) + "px";
    document.getElementById("countDown").style.left = ((availableWidth/2)-(DIV_COUNTDOWN_WIDTH/2)) + "px";
    document.getElementById("brake").style.top = (availableHeight-DIV_BRAKE_BUTTONS_HEIGHT) + "px";
    document.getElementById("brake").onmousedown = pressBrake;
    document.getElementById("brake").onmouseup = releaseBrake;
    document.getElementById("brake").onmouseout = releaseBrake;
    document.getElementById("brake").ontouchstart = pressBrake;
    document.getElementById("brake").ontouchend = releaseBrake;
    turnCarImage();
    releaseBrake();

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;

    guiInitialized = true;
}

function handleKeyDown(event){
    if (event.keyCode == 32){
        pressBrake(event);
    }
}

function handleKeyUp(event){
    if (event.keyCode == 32){
        releaseBrake(event);
    }
}



function updateCarStatus(speed,gear,rpm,position,fullRedraw){
    document.getElementById("speed").innerHTML = "" + Math.floor(speed) + " Km/h"+ "<br>" + "Gear: " + gear + "<br>" ;
    document.getElementById("rpm").innerHTML = "" + rpm ;
    map.setCenter( position, 20, true );

    try{
        var centerX = availableWidth/2;
        var centerY = availableHeight/2;
        var data = context.getImageData(centerX, centerY, 1, 1).data;
        //document.getElementById("debugWindow").innerHTML = "context data " + data;
        var red = data[0];
        var green = data[1];
        var blue = data[2];
        var alpha = data[3];
        document.getElementById("debugWindow").innerHTML = "context (" + red + ","+ green + ","+ blue + ","+ alpha + ")";
    } catch (err){
        document.getElementById("debugWindow").innerHTML = "context error" ;
    }



    //if (fullRedraw){
        elements.redraw();
        elements.refresh();
    //}


}

