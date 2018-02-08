/**
 * scripts.js
 *
 * Computer Science 50
 * Final project
 *
 * Global JavaScript.
 */

// Google Map
var map;

// markers for map
var markers = [];
var marker_array = [];
var infowindow;
var markersallowed = 0;

// array for KML layers
var layers = [];

// array for crash_data and toggle
var crash_data = [];
var heat_layers = [];

// info window
var info = new google.maps.InfoWindow();

// execute when the DOM is fully loaded
$(function() {

    // styles for map
    // https://developers.google.com/maps/documentation/javascript/styling
    var styles = [

        // hide Google's labels
        {
            featureType: "all",
            elementType: "labels",
            stylers: [
                {visibility: "on"} // "off"
            ]
        },

        // don't hide roads
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {visibility: "on"} // "off"
            ]
        }

    ];

    // options for map
    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var options = {
        center: {lat: -41.4387, lng: 147.1369}, // Launceston, Tasmania
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        minZoom: 12,
        panControl: true,
        styles: styles,
        zoom: 13,
        zoomControl: true
    };

    // get DOM node in which map will be instantiated
    var canvas = $("#map-canvas").get(0);

    // instantiate map
    map = new google.maps.Map(canvas, options);
    
    // configure UI once Google Map is idle (i.e., loaded)
    google.maps.event.addListenerOnce(map, "idle", configure);
    
    // SET BOUNDS FOR MAP
    // bounds of the desired area
    var allowedBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(-41.529198, 147.026721), 
     new google.maps.LatLng(-41.345170, 147.233744)
    );
    var lastValidCenter = map.getCenter();

    google.maps.event.addListener(map, 'center_changed', function() {
    if (allowedBounds.contains(map.getCenter())) {
        // still within valid bounds, so save the last valid position
        lastValidCenter = map.getCenter();
        return; 
    }

    // not valid anymore => return to last valid position
    map.panTo(lastValidCenter);
    });
    
    // add KML layers
    // add council KML layer // test
    layers[0] = new google.maps.KmlLayer({
    url: 'https://sites.google.com/site/launcestoniankmlfiles/kml/clip_councils_labelled.kmz'
    });
    layers[0].set('preserveViewport', true);
    
    // add school districts KML layer // test
    layers[1] = new google.maps.KmlLayer({
    url: 'https://sites.google.com/site/launcestoniankmlfiles/kml/edited_schools.kml'
    });
    layers[1].set('preserveViewport', true);
    
    // add localities KML layer // test
    layers[2] = new google.maps.KmlLayer({
    url: 'https://sites.google.com/site/launcestoniankmlfiles/kml/launceston_localities.kmz'
    });
    layers[2].set('preserveViewport', true);
    
    // add parks KML layer // test
    layers[3] = new google.maps.KmlLayer({
    url: 'https://sites.google.com/site/launcestoniankmlfiles/kml/Parks.kml'
    });
    layers[3].set('preserveViewport', true);
    
    // add layers to map
    for (var i = 0; i < layers.length; i++) 
    {
        layers[i].setMap(null); // off to start with
    }
    
});

/**
 * Turns KML layers on/off
 */
 
// function to toggle KML layers on/off
function toggleLayer(i) 
{
    if(layers[i].getMap() == null) 
    {
        layers[i].setMap(map);
    }
    else 
    {
        layers[i].setMap(null);
    }
}

// function to toggle markers on/off
function toggleMarkers() 
{
    if(markersallowed == 0) 
    {
        markersallowed = 1;
        update();
    }
    else 
    {
        markersallowed = 0;
        removeMarkers();
    }
}

/**
 * Creates data heatmap layer


    $.getJSON("heatmap.php")
        .done(function(data, textStatus, jqXHR) 
        {
        
        if (data.length > 0) 
        {
            $.each(data, function(index, value) {
            crash_data.push({
                            location: new google.maps.LatLng(value.LATITUDE, value.LONGITUDE),
                            weight: value.SEVERITY_RANK/10
                            });
            });
        }
            
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // log error to browser's console
            console.log(errorThrown.toString());
        });

var heat_layer = new google.maps.visualization.HeatmapLayer
({
    data: crash_data
});

heat_layers.push(heat_layer);

heat_layer.setMap(map); // testing

// add layer(s) to map
//for (var j = 0; j < layers.length; i++) 
//{
//    heat_layers[j].setMap(map); // off to start with
//}


// Turns heatmap on/off


// function to toggle heat layers on/off
function toggleHeat(j) 
{
    if(heat_layers[j].getMap() == null) 
    {
        heat_layers[j].setMap(map);
    }
    else 
    {
        heat_layers[j].setMap(null);
    }
}
*/

/**
 * Adds marker for place to map.
 */
 
function addMarker(place)
{

    if (markersallowed != 0)
    {

    markers = place; 

    // get latitude and longitude (for marker)        
    var myLatlng = new google.maps.LatLng(parseFloat(markers.latitude), 
                   parseFloat(markers.longitude));
    
    var image = 'img/historicalquarter.png'; // an image for the markers
    
    var marker = new google.maps.Marker({
        position: myLatlng,
        icon: image,
        place_name: markers.place_name,
        address: markers.address,
        place_id: markers.place_id
    });

    marker.setMap(map);
    
    // store the marker in the array (for removeMarkers function)
    marker_array.push(marker);
    
    google.maps.event.addListener(marker, 'click', function() {
        if (infowindow) {
            infowindow.close();
        }
        infowindow = new google.maps.InfoWindow({
        content: " ",
        maxWidth: 500
        });
        infowindow.setContent('<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h5 id="firstHeading" class="firstHeading">'+this.place_name+'</h5>'+
      '<div id="bodyContent">'+
      '<p>'+this.address+'</p>'+
      '<p>Heritage Register ID: '+this.place_id+'</p>'+
      '<p>Source: <a href="http://www.heritage.tas.gov.au/thr.html">'+
      'Tasmanian Heritage Register</a></p> '+
      '<p>(last visited 16 July 2015).</p>'+
      '</div>'+
      '</div>');
        infowindow.open(map, this);
    });
    }

}

/**
 * Configures application.
 */
function configure()
{
    // update UI after map has been dragged
    google.maps.event.addListener(map, "dragend", function() {
        update();
    });

    // update UI after zoom level changes
    google.maps.event.addListener(map, "zoom_changed", function() {
        update();
    });

    // remove markers whilst dragging
    google.maps.event.addListener(map, "dragstart", function() {
        removeMarkers();
    });

    // configure typeahead
    // https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md
    $("#q").typeahead({
        autoselect: true,
        highlight: true,
        minLength: 1
    },
    {
        source: search,
        templates: {
            empty: "no places found yet",
            suggestion: _.template("<p><%- place_name %>, <%- admin_name1 %></p>")
        }
    });

    // re-center map after place is selected from drop-down
    $("#q").on("typeahead:selected", function(eventObject, suggestion, name) {

        // ensure coordinates are numbers
        var latitude = (_.isNumber(suggestion.latitude)) ? suggestion.latitude : parseFloat(suggestion.latitude);
        var longitude = (_.isNumber(suggestion.longitude)) ? suggestion.longitude : parseFloat(suggestion.longitude);

        // set map's center
        map.setCenter({lat: latitude, lng: longitude});

        // update UI
        update();
    });

    // hide info window when text box has focus
    $("#q").focus(function(eventData) {
        hideInfo();
    });

    // re-enable ctrl- and right-clicking (and thus Inspect Element) on Google Map
    // https://chrome.google.com/webstore/detail/allow-right-click/hompjdfbfmmmgflfjdlnkohcplmboaeo?hl=en
    document.addEventListener("contextmenu", function(event) {
        event.returnValue = true; 
        event.stopPropagation && event.stopPropagation(); 
        event.cancelBubble && event.cancelBubble();
    }, true);

    // update UI
    update();

    // give focus to text box
    $("#q").focus();
}


/**
 * Removes markers from map.
 */
function removeMarkers()
{
   // Sets the map on all markers in the array.
    function setAllMap(map) 
    {
        for (var i = 0; i < marker_array.length; i++) 
        {
            marker_array[i].setMap(null);
        }
    }    
   // https://developers.google.com/maps/documentation/javascript/examples/marker-remove     
    setAllMap(null);
    marker_array = [];
    
}

/**
 * Searches database for typeahead's suggestions.
 */
function search(query, cb)
{
    // get places matching query (asynchronously)
    var parameters = {
        geo: query
    };
    $.getJSON("search.php", parameters)
    .done(function(data, textStatus, jqXHR) {

        // call typeahead's callback with search results (i.e., places)
        cb(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {

        // log error to browser's console
        console.log(errorThrown.toString());
    });
}

/**
 * Shows info window at marker with content.
 */
function showInfo(marker, content)
{
    // start div
    var div = "<div id='info'>";
    if (typeof(content) === "undefined")
    {
        // http://www.ajaxload.info/
        div += "<img alt='loading' src='img/ajax-loader.gif'/>";
    }
    else
    {
        div += content;
    }

    // end div
    div += "</div>";

    // set info window's content
    info.setContent(div);

    // open info window (if not already open)
    info.open(map, marker);
}

/**
 * Updates UI's markers.
 */
function update() 
{
    // get map's bounds
    var bounds = map.getBounds();
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();

    // get places within bounds (asynchronously)
    var parameters = {
        ne: ne.lat() + "," + ne.lng(),
        q: $("#q").val(),
        sw: sw.lat() + "," + sw.lng()
    };
    $.getJSON("update.php", parameters)
    .done(function(data, textStatus, jqXHR) {

        // remove old markers from map
        removeMarkers();

        // add new markers to map
        for (var i = 0; i < data.length; i++)
        {
            addMarker(data[i]);
        }
     })
     .fail(function(jqXHR, textStatus, errorThrown) {

         // log error to browser's console
         console.log(errorThrown.toString());
     });
};
