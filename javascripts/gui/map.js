var context;

function initMap(){
    map = new OpenLayers.Map('map', {controls:[]});
    circuits = new OpenLayers.Layer.OSM("circuits","./test-circuit/${z}/${x}/${y}.png",{
        isBaseLayer: true,
        numZoomLevels: 21,
    });


    // allow testing of specific renderers via "?renderer=Canvas", etc
    //var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    //renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

    var styleMap = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults({
            fillColor: "white", 
            fillOpacity: 1/255, 
            strokeColor: "black",
        },OpenLayers.Feature.Vector.style["default"])
    );

    elements = new OpenLayers.Layer.Vector("Simple Geometry", {
        //isBaseLayer: true,
        renderers: ["Canvas"],
        rendererOptions: {hitDetection: true},
        styleMap: styleMap
    });

    context = elements.renderer.canvas; //layer.renderer.hitContext;

    //var template = new jugl.Template("template");
    //template.process({
    //    clone: true,
    //    parent: "inspector",
    //    context: {
    //        rows: rows,
    //        cols: cols
    //    }
    //});


    var myCircuit = {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates":[[[1239312.0878902207, 5794605.1602390564], 
                            [1239342.931640625, 5794605.9228515625], 
                            [1239342.8251953125, 5794715.0986328125], 
                            [1239312.63671875, 5794715.96484375], 
                            [1239312.0878902207, 5794605.1602390564]]]
        }
    };

    var geojson_format = new OpenLayers.Format.GeoJSON();
    var features = geojson_format.read(myCircuit);

    elements.addFeatures(features);

    map.events.register('mousedown', map, handleMouseClickOnMap);
    map.events.register('mouseover', map, handleMouseClickOnMap);
    map.events.register('mousemove', map, handleMouseClickOnMap);
    map.events.register('touchstart', map, handleTouchEventsOnMap);
    map.events.register('touchmove', map, handleTouchEventsOnMap);
    map.addLayer(circuits);
    map.addLayer(elements);
    alert ("ok");
    if(!map.getCenter()){
        map.zoomToMaxExtent();
    }
}


function handleTouchEventsOnMap(event){
    try{
        event.preventDefault();
        event.stopPropagation();
    }catch(err){
        // nothing to do
    }
    //document.getElementById("debugWindow").innerHTML = "touchevent"+event.changedTouches.length;
    for (var i = 0; i < event.changedTouches.length; ++i){
        var touchPoint = event.changedTouches[i];
        var currentX = touchPoint.pageX;
        var currentY = touchPoint.pageY;
        //document.getElementById("debugWindow").innerHTML = "touchevent"+ currentX + " "+ currentY;

        var brake = document.getElementById('brake');
        var brakeButtonXmin = parseInt(brake.offsetLeft);
        var brakeButtonYmin = parseInt(brake.offsetTop);
        var brakeButtonXmax = brakeButtonXmin + parseInt(brake.style.width);
        var brakeButtonYmax = brakeButtonYmin + parseInt(brake.style.height);
//        if ((currentY <= DIV_BRAKE_BUTTONS_HEIGHT) && (currentX <= DIV_BRAKE_BUTTONS_WIDTH)){
        if ((currentX >= brakeButtonXmin) && (currentX <= brakeButtonXmax) && (currentY >= brakeButtonYmin) && (currentY <= brakeButtonYmax)){
            // nothing to do i am touching brake        
        }else{
            moveCar(currentX,currentY);
        }
    }
}


function handleMouseClickOnMap(event){
    moveCar(event.xy.x,event.xy.y);
    try{
        event.preventDefault();
        event.stopPropagation();
    }catch(err){
        // nothing to do
    }

}


