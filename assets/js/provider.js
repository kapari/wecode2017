/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	console.log("this provider is running");
	$('#savePlace').on('click', function(event) {
		//event.preventDefault()
		console.log('i got a click')
		var checkedVals = $(':checkbox:checked').map(function() {
			return this.id;
		}).get();
		console.log(checkedVals);
		var pushObject = {
			name: "new location",
			id: locationStore.length + 1,
			services: checkedVals,
			position: {
				lat: 45.5,
				lng: -122.7
			},
			info: ""
		}
		locationStore.push(pushObject);
		showMarkers(locationStore);

	})

})(jQuery);
