var List = require('views/playlist-view');
var Video = require('views/video-view');
var BasicView = require('views/basic-view');



var PlayListRouter = Backbone.Router.extend({

    routes: {
        //takes the query and does a youtube search
        "list/:query": "loadList",
        "list/:query/:token": "loadPaged",

        //takes the id of the video and returns the json data of the video itself
        "video/:id": "loadVideo",
    },

    initialize: function () {
        this.getBasicView();
    },

    getBasicView: function () {
        if (!this.basicView) {
            this.basicView = new BasicView({});
        }
        return this.basicView;
    },
    
    getListView: function () {
        if (!this.listView) {
            this.listView = new List({});
        }
        return this.listView;
    },
    getVideoView: function () {
        if (!this.videoView) {
            this.videoView = new Video({});
        }
        return this.videoView;
    },
    
    loadList: function(query){
        this.getListView().show(query);
    },
    loadPaged: function(query, page){
        this.getListView().show(query,page);
    },
    loadVideo: function(id) {
        this.getVideoView().show(id);
    }
});

module.exports = PlayListRouter;