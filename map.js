var $ = window.jQuery;

var map;
var markersArray = [];
var locationStore = [
	{name:'starbucks', id:1, services:['wifi','restrooms','clean stops','chargers','safe camps'], position: {lat:45.521192, lng: -122.675109}, info:`<div><h1>starbucks</h1>open 9-5 and on Tuesdays</div>`},
	{name:'safeway', id:2, services:['wifi'], position:{lat:45.52000, lng: -122.670}, info:`<div><h1>safeway</h1>open 9-5 and on Tuesdays</div>`}
]

var amenitiesStore = ['wifi','restrooms','clean-stops','chargers','safe-camps']

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 45.520095, lng: -122.672716},
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
 function filterMarkers(amenitiesArray){
	 var filteredMarkerArray = locationStore.filter(marker =>{
		 var returnBool = false //is this a passing item?
		 amenitiesArray.forEach(amenity => {
			 if (marker.services.indexOf(amenity) !== -1){
				 returnBool = true
			 }
		 })
		 return returnBool
	 })
	 showMarkers(filteredMarkerArray)
 }

 function showMarkers(myMarkerArray){
	 deleteMarkers();
	 myMarkerArray.forEach(function(location,index){
		 var infowindow = new google.maps.InfoWindow({
				content: location.info
			});
		 var marker = new google.maps.Marker({
			 position:location.position,
			 map: map,
			 label: index.toString()
		 });
		 marker.addListener('click', function() {
			 infowindow.open(map, marker);
		 });
		 markersArray.push(marker);
	 })
 }
