// ============================================================================
// = Race:                                                                    =
// = - move the car around the world                                          =
// ============================================================================

var RACE_SUB_STAGES = {
  INIT    : 0,
  MOVE    : 1, 
  FINISH  : 2
};
var raceSubStage = RACE_SUB_STAGES.INIT;
var carCurrentAngle = 0.0; //TODO: set this as parameter
var carCurrentPosition = new OpenLayers.LonLat(1239332, 5794705);
var raceStartTime = 0;

function doRaceStep(){
    switch(raceSubStage){
        case RACE_SUB_STAGES.INIT:
            raceStartTime = new Date().getTime();
            getCarCurrentSpeed(SPEED_EVENTS.INIT);     
            carCurrentPosition = new OpenLayers.LonLat(1239332, 5794705);
            updateCarStatus(carCurrentSpeed,carCurrentGear,carCurrentRpm,carCurrentPosition,true);
            raceSubStage++;
        break;
        case RACE_SUB_STAGES.MOVE:
            if (brakePressed) {
                getCarCurrentSpeed(SPEED_EVENTS.BRAKE);
            }else{
                getCarCurrentSpeed(SPEED_EVENTS.NORMAL);
            }

            var carCurrentRadiants = carCurrentAngle / 180 * Math.PI;
            // TODO: controllare
            var msSpeed = carCurrentSpeed * lastTimeDelta / 3600; // spped in m/s: map units
            var deltaLon = msSpeed * Math.cos(carCurrentRadiants);
            var deltaLat = msSpeed * Math.sin(carCurrentRadiants);
            carCurrentPosition = carCurrentPosition.add(deltaLat, deltaLon);
            //document.getElementById("debugWindow").innerHTML = "msSpeed "+msSpeed + " lastTimeDelta " + lastTimeDelta;
            //document.getElementById("debugWindow").innerHTML = "carCurrentPosition "+carCurrentPosition;
            updateCarStatus(carCurrentSpeed,carCurrentGear,carCurrentRpm,carCurrentPosition,false);
        break;
        case RACE_SUB_STAGES.FINISH:
            gameStage++;
        break;
        default:
            doErrorStep();
        break;
   }
}

