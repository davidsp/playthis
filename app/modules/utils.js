var list = require('views/v-playlist');

var utils = (function() {
	//add the destruction of the previous view

    function createView(data,view) {
    	if(view === 'list'){
			new list({
				model: data
			});
		}
    	if(view === 'list'){
			new video({
				model: data
			});
		}
    }

	function loadJson(term){
		$.ajax({
			url: 'https://gdata.youtube.com/feeds/api/videos?q=' + term + '&v=2&alt=jsonc',
			type: 'POST',
			dataType: 'jsonp',
			complete: function(xhr, textStatus) {

			},
			success: function(data, textStatus, xhr) {
				createView(data);
			},
			error: function(xhr, textStatus, errorThrown) {
				return false;
			}
		});
	}
    return {
        loadJson: loadJson
    };
})();

module.exports = utils;

