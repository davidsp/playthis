
var Utils = require('modules/remoteUtils');
var conf = require('lib/conf');

var PlayListView = Backbone.View.extend({
    el: '#info',
    template: require('views/templates/video-item'),
    events: {
        'click .btn-back-to-results' : 'goToResults'
    },
    initialize: function(opts) {
    },
    show: function(id) {
        var url = conf.urls.videoUrl;
        url = url.replace('{videoId}', id);
        url = url.replace('{userId}', conf.values.userId);
        Utils.getDataJson(url,_.bind(this.postJson, this));        
    },
    postJson: function(data){
        this.model = data;        
        this.id = this.model.items[0].id;
        this.title = this.model.items[0].snippet.title;
        this.render();
    },
    render: function() {
        this.$el.html(this.template({
            id: this.id,
            title: this.title
        }));
        return this;        
    },
    goToResults: function(e) {
        Backbone.history.history.back();
    }
});

module.exports = PlayListView;