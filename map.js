var $ = window.jQuery;

var map;
var markersArray = [];
var locationStore = [{
	name: 'starbucks',
	id: 1,
	services: ['wifi', 'restrooms', 'clean stops', 'chargers', 'safe camps'],
	position: {
		lat: 45.519081,
		lng: -122.679483
	},
	info: `Open 4:30am - 12:00pm M-F, 4:30am - 11:00pm Sat, 4:30am - 11:00pm Sun.`
}, {
	name: 'higgins',
	id: 2,
	services: ['wifi', 'restrooms', 'chargers'],
	position: {
		lat: 45.515572,
		lng: -122.682000
	},
	info: `Open 11:30am - 12:00am M-F, 4:00pm - 12:00am Sat, 4:00pm - 11:00pm Sun.`
}, {
	name: 'Picnic House',
	id: 3,
	services: ['wifi', 'restrooms', 'chargers', 'safe camps'],
	position: {
		lat: 45.517629,
		lng: -122.681263
	},
	info: `Open 9:00am - 5:00pm M-Sun.`
}, {
	name: 'Right 2 Dream Too',
	id: 4,
	services: ['safe camps'],
	position: {
		lat: 45.5221372,
		lng: -122.6864144
	},
	info: `All Hours`
}]

var amenitiesStore = ['wifi', 'restrooms', 'clean-stops', 'chargers',
	'safe-camps'
]

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 45.520095,
			lng: -122.672716
		},
		zoom: 13
	});
	showMarkers(locationStore);
	$('#CheckBoxList input[type=checkbox]').change(function() {
		var checkedVals = $(':checkbox:checked').map(function() {
			return this.value;
		}).get();
		filterMarkers(checkedVals);


	});
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
	for (var i = 0; i < markersArray.length; i++) {
		markersArray[i].setMap(map);
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
	setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	clearMarkers();
	markersArray = [];
}

//updates Markers based on a new set of amenities
function filterMarkers(amenitiesArray) {
	var filteredMarkerArray = locationStore.filter(marker => {
		var returnBool = false //is this a passing item?
		amenitiesArray.forEach(amenity => {
			if (marker.services.indexOf(amenity) !== -1) {
				returnBool = true
			}
		})
		return returnBool
	})
	showMarkers(filteredMarkerArray)
}

function showMarkers(myMarkerArray) {
	deleteMarkers();
	myMarkerArray.forEach(function(location, index) {
		var amenitiesList = ''
		var link =
			`https://www.google.com/maps/dir/?api=1&travelmode=walking&destination=${location.position.lat},${location.position.lng}`
		location.services.forEach(service => amenitiesList += `<li>${service}</li>`)
		var locationHTML =
			`<div><h1>${location.name}</h1>${location.info}<h2>Services</h2><ul>${amenitiesList}</ul><a href="${link}" target="new">Directions</a></div>`
		var infowindow = new google.maps.InfoWindow({
			content: locationHTML
		});
		var marker = new google.maps.Marker({
			position: location.position,
			map: map,
			label: index.toString()
		});
		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});
		markersArray.push(marker);
	})
}
