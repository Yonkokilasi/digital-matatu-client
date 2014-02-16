// makes a google map. takes a route object
// ===============================
/* route object looks like this:
{
	'descriptor': String,
	'name': String,
	'color': #ffffff,
	'waypoints': [
		{ 
			lat: -1.30344, 
			lon: 36.788989
		},
		{ 
			lat: -1.30344, 
			lon: 36.787879
		}
	],
	'start': null,
	'end': null
}
*/

function makeMap(route){
	// http://maps.googleapis.com/maps/api/directions/output?parameters
	// http://maps.googleapis.com/maps/api/directions/json?origin=40.64974840,-73.94998180&destination=40.65084299999999,-73.9495750&sensor=false
	// http://maps.googleapis.com/maps/api/directions/json?origin=Boston,MA&destination=Concord,MA&waypoints=Charlestown,MA|via:Lexington,MA&sensor=false
	
	var directionsService = new google.maps.DirectionsService();
	
	// create map canvas
	function initialize() {
		directionsDisplay = new google.maps.DirectionsRenderer();
		var nairobi = new google.maps.LatLng(-1.274995,36.819885);
		var mapOptions = {
			zoom: 6,
			center: nairobi
		};
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		directionsDisplay.setMap(map);
	}

	var request = {
		origin: start,
		destination: end,
		waypoints: waypts,
		optimizeWaypoints: true,
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
			var route = response.routes[0];
			// For each route, display summary information.
			for (var i = 0; i < route.legs.length; i++) {
				var routeSegment = i + 1;
				summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
				summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
				summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
				summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
			}
		}
	});

	google.maps.event.addDomListener(window, 'load', initialize);
	
	// make map request
	//~ $.ajax({
		//~ type: 'GET',
		//~ url:
		//~ data:
		//~ success:
	//~ });
}