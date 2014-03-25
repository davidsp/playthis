var List = require('views/playlist-view');
var Video = require('views/video-view');
var ErrorTemplate = require('views/templates/error-message');
var conf = require('lib/conf');

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

        var url = conf.urls.searchUrl;
        url = url.replace('{searchTerm}', term);
        url = url.replace('{userId}', conf.values.userId);
        url = url.replace('{resultsPerPage}', conf.values.itemsPerPage);

        if(paged) url += '&pageToken=' + paged;

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            complete: function(xhr, textStatus) {
            },
            success: function(data, textStatus, xhr) {
                createView(data,view,term);
            },
            error: function(xhr, textStatus, errorThrown) {
                newError
            }
        });
    }
    function loadVideo(term, view){
        var url = conf.urls.searchUrl;
        url = url.replace('{searchTerm}', term);
        url = url.replace('{userId}', conf.values.userId);
        url = url.replace('{resultsPerPage}', conf.values.itemsPerPage);
        
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

