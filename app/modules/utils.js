var List = require('views/playlist-view');
var Video = require('views/video-view');

var utils = (function() {
    function createView(data,view,term) {
        if(view === 'video'){
            new Video({
                model: data,
                term: term
            });
        }
        if(view === 'list'){
            new List({
                model: data,
                term: term
            });
        }
    }   
    function loadJson(term, view, paged){
        var url = 'https://www.googleapis.com/youtube/v3/search?q=' + term + '&type=video&key=AIzaSyC532b2yg91QfoCd2LFibEQj6_5nnBsqjA&maxResults=36&order=relevance&part=snippet';
        if(paged) url += '&pageToken=' + paged;
        $.ajax({
            url: url ,
            type: 'POST',
            dataType: 'jsonp',
            complete: function(xhr, textStatus) {
            },
            success: function(data, textStatus, xhr) {
                createView(data,view,term);
            },
            error: function(xhr, textStatus, errorThrown) {
                ///TODO: HANDLE ERRORS
            }
        });
    }
    function loadVideo(term, view){
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/videos?id=' + term + '&key=AIzaSyC532b2yg91QfoCd2LFibEQj6_5nnBsqjA&maxResults=36&order=relevance&part=snippet',
            type: 'POST',
            dataType: 'jsonp',
            complete: function(xhr, textStatus) {
            },
            success: function(data, textStatus, xhr) {
                createView(data,view,term);
            },
            error: function(xhr, textStatus, errorThrown) {
                ///TODO: HANDLE ERRORS
            }
        });
    }
    return {
        loadJson: loadJson,
        loadVideo: loadVideo
    };
})();

module.exports = utils;

