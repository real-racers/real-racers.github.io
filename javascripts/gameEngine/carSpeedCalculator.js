// ----------------------------------------------------------------------------
// car status
// ----------------------------------------------------------------------------
var carCurrentSpeed = 0;
var carCurrentGear = 0 ;
var carCurrentRpm = 0;
var carAccelleration = 10.0;         // to set elsewhere, depending on car model

// ----------------------------------------------------------------------------
// calculate car speed
// ----------------------------------------------------------------------------
var carStandardSpeeds = new Array(  
new Array(     0.0, 1000 , 0),
new Array(     8.0, 2000 , 1),
new Array(    15.0, 3000 , 1),
new Array(    21.0, 4000 , 1),
new Array(    26.5, 5000 , 1),
new Array(    31.5, 2000 , 2),
new Array(    36.5, 1000 , 2),
new Array(    41.0, 1000 , 2),
new Array(    45.5, 1000 , 2),
new Array(    50.0, 1000 , 2),
new Array(    54.0, 1000 , 2),
new Array(    58.0, 5000 , 2),
new Array(    62.0, 2000 , 3),
new Array(    65.5, 6500 , 3),
new Array(    69.0, 7000 , 3),
new Array(    72.5, 3500 , 3),
new Array(    76.0, 1000 , 3),
new Array(    79.0, 1000 , 3),
new Array(    82.0, 1000 , 4),
new Array(    85.0, 1000 , 4),
new Array(    88.0, 1000 , 4),
new Array(    90.5, 1000 , 4),
new Array(    93.0, 1000 , 4),
new Array(    95.5, 1000 , 4),
new Array(    98.0, 1000 , 4),
new Array(   100.5, 1000 , 5),
new Array(   102.5, 1000 , 5),
new Array(   104.5, 1000 , 5),
new Array(   106.5, 1000 , 5),
new Array(   108.5, 1000 , 5),
new Array(   110.5, 1000 , 5),
new Array(   112.5, 1000 , 5),
new Array(   114.0, 1000 , 5),
new Array(   115.5, 1000 , 5),
new Array(   117.0, 1000 , 5),
new Array(   118.5, 1000 , 5),
new Array(   120.0, 1000 , 5),
new Array(   121.5, 1000 , 6),
new Array(   123.0, 1000 , 6),
new Array(   124.0, 1000 , 6),
new Array(   125.0, 1000 , 6),
new Array(   126.0, 1000 , 6),
new Array(   127.0, 1000 , 6),
new Array(   128.0, 1000 , 6),
new Array(   129.0, 1000 , 6),
new Array(   130.0, 1000 , 6),
new Array(   131.0, 1000 , 6),
new Array(   131.5, 1000 , 6),
new Array(   132.0, 1000 , 6),
new Array(   132.5, 1000 , 6),
new Array(   133.0, 1000 , 6),
new Array(   133.5, 1000 , 6),
new Array(   134.0, 1000 , 6),
new Array(   134.5, 1000 , 6),
new Array(   135.0, 1000 , 6),
new Array(   135.5, 1000 , 6)
);

var carAccellerationTime = 0;
var carStandardAccelleration = 9.0; // sec to reach 100 Km/h
var lastTicTime = 0;
var lastTimeDelta = 0;

var SPEED_EVENTS = {
    INIT    : 0,
    CRASH   : 1,
    NORMAL  : 2,
    BRAKE   : 3
};

function getCarCurrentSpeed(speedEvent){
    var currentTime = new Date().getTime();
    var retval = 0.0;
    switch(speedEvent){
        case SPEED_EVENTS.INIT:
            carAccellerationTime = new Date().getTime();
            retval = 1.0;
        break;
        case SPEED_EVENTS.CRASH:
            carAccellerationTime = new Date().getTime();
            retval = 1.0;
        break;
        case SPEED_EVENTS.BRAKE:
            carAccellerationTime = carAccellerationTime + (currentTime - lastTicTime) * 4;
            if (carAccellerationTime > currentTime){
                carAccellerationTime = currentTime;
            }
            retval = internalCalculateSpeed();
        break;
        case SPEED_EVENTS.NORMAL:
            retval = internalCalculateSpeed();
        break;
        default:
            doErrorStep();
        break;
    }
    lastTimeDelta = currentTime - lastTicTime;
    //try{
    //    document.getElementById("debugWindow").innerHTML = "fps: " + Math.floor(1000/lastTimeDelta);
    //} catch (err) {
    //    document.getElementById("debugWindow").innerHTML = "fps: " + 0;
    //}
    lastTicTime = new Date().getTime();
    return retval;
}


function internalCalculateSpeed(){
    var currentTime = new Date().getTime();
    var deltaTime = currentTime - carAccellerationTime;
    var maxDeltaTime = (carStandardSpeeds.length - 2) * 1000 * carAccelleration / carStandardAccelleration;
    if (deltaTime > maxDeltaTime){
            carAccellerationTime = currentTime - maxDeltaTime;
            deltaTime = maxDeltaTime;
    }
    var accellerationTime = deltaTime * carStandardAccelleration / carAccelleration;
    var positionInStandardizedSpeeds = Math.floor(accellerationTime / 1000);
    var minValue = carStandardSpeeds[positionInStandardizedSpeeds][0];
    var maxValue = carStandardSpeeds[positionInStandardizedSpeeds + 1][0];
    var subPositionInStandardizedSpeeds = Math.floor(accellerationTime) % 1000;
    var internalDelta = ((maxValue-minValue)/1000) * subPositionInStandardizedSpeeds;
    //console.log("min: "+ minValue + " max: " + maxValue);
    carCurrentSpeed = minValue + internalDelta;
    carCurrentRpm = carStandardSpeeds[positionInStandardizedSpeeds][1] ;
    carCurrentGear = carStandardSpeeds[positionInStandardizedSpeeds][2] ;
}
 
