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
            url: 'https://www.googleapis.com/youtube/v3/search?q=' + term + '&key=AIzaSyC532b2yg91QfoCd2LFibEQj6_5nnBsqjA&maxResults=36&order=relevance&part=snippet',
            type: 'POST',
            dataType: 'jsonp',
            complete: function(xhr, textStatus) {
            },
            success: function(data, textStatus, xhr) {
                createView(data,view,term);
            },
            error: function(xhr, textStatus, errorThrown) {
                return false;
            }
        });
    }
	function loadVideo(term, view){
		$.ajax({
			url: 'https://www.googleapis.com/youtube/v3/video?q=' + term + '&key=AIzaSyC532b2yg91QfoCd2LFibEQj6_5nnBsqjA&maxResults=36&order=relevance&part=snippet',
			type: 'POST',
			dataType: 'jsonp',
			complete: function(xhr, textStatus) {
			},
			success: function(data, textStatus, xhr) {
				createView(data,view,term);
			},
			error: function(xhr, textStatus, errorThrown) {
				return false;
			}
		});
	}
    return {
        loadJson: loadJson,
        loadVideo: loadVideo
    };
})();

module.exports = utils;

