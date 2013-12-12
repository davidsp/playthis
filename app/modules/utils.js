var list = require('views/playlist_view');

var utils = (function() {
	//XXX?: destruct previous view

    function createView(data,view,term) {
    	if(view === 'video'){
			new video({
				model: data
			});
		}
    	if(view === 'list'){
			new list({
				model: data,
				term: term
			});
		}
    }

    function extendModel(obj){

    }

	function loadJson(term, view){
		$.ajax({
			url: 'https://gdata.youtube.com/feeds/api/videos?q=' + term + '&v=2&alt=jsonc',
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

