window.addEventListener('load', function() {
	var editor;

	ContentTools.StylePalette.add([
    new ContentTools.Style('Author', 'author', ['p'])
	]);

	editor = ContentTools.EditorApp.get();
	editor.init('*[data-editable]', 'data-name');


	editor.addEventListener('saved', function (ev) {
	    var name, payload, regions, xhr;

	    // Check that something changed
	    regions = ev.detail().regions;
	    if (Object.keys(regions).length == 0) {
	        return;
	    }
		
	    // Set the editor as busy while we save our changes
	    this.busy(true);

	    // Collect the contents of each region into a FormData instance
	    payload = new FormData();
	    for (name in regions) {
	        if (regions.hasOwnProperty(name)) {
	            payload[name] = regions[name];
	        }
	    }
		console.log(payload);
	    // Send the update content to the server to be saved
	    function onStateChange(ev) {
	        // Check if the request is finished
	        if (ev.target.readyState == 4) {
	            editor.busy(false);
	            if (ev.target.status == '200') {
	                // Save was successful, notify the user with a flash
	                new ContentTools.FlashUI('ok');
	            } else {
	                // Save failed, notify the user with a flash
	                new ContentTools.FlashUI('no');
	            }
	        }
	    };

	function postAjax(url, data, success) {
		console.log(data);
		var params = typeof data == 'string' ? data : Object.keys(data).map(
				function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
			).join('&');

		var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		xhr.open('POST', url);
		xhr.onreadystatechange = function() {
			if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
		};
		xhr.addEventListener('readystatechange', onStateChange);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(params);
		return xhr;
	}

		postAjax('/profile/save-profile', payload, function (data) {
			console.log(data);
		});
	});





});