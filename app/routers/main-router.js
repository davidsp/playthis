var Utils = require('modules/utils');
var BasicView = require('views/basic-view');

var PlayListRouter = Backbone.Router.extend({
    routes: {
        "": "basicInit",
        //takes the query and does a youtube search
        "list/:query": "loadList",
        "list/:query/:token": "loadPaged",
        //takes the id of the video and returns the json data of the video itself
        "video/:id": "showVideo",
        
        //display info about the app
        "about": "showAbout"
    },
    
    basicInit: function() {
        new BasicView({});
    },
    loadList: function(query){
        new BasicView({});
        Utils.loadJson(query,'list');       
    },
    loadPaged: function(query, page){
        new BasicView({});
        Utils.loadJson(query,'list',page);      
    },
    showVideo: function(id) {
        new BasicView({});
        Utils.loadVideo(id,'video');
    }
});

module.exports = PlayListRouter;