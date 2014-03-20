var list = require('views/playlist-view');
var video = require('views/video-view');

var utils = (function() {
    function createView(data,view,term) {
    	if(view === 'video'){
			new video({
				model: data,
				term: term
			});
		}
    	if(view === 'list'){
			new list({
				model: data,
				term: term
			});
		}
    }

	function loadJson(term, view){
		$.ajax({
			url: 'https://gdata.youtube.com/feeds/api/videos?q=' + term + '&v=2&alt=jsonc&max-results=24',
			type: 'POST',
			dataType: 'jsonp',
			complete: function(xhr, textStatus) {
			},
			success: function(data, textStatus, xhr) {
				createView(data, view,term);
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

