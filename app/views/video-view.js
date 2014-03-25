
var PlayListView = Backbone.View.extend({
    el: '#info',
    template: require('views/templates/video-item'),
    events: {
        'click .btn-back-to-results' : 'goToResults'
    },
    initialize: function(opts) {
        console.log(this.model);
        this.render();
        $('a.video-link').ytchromeless();
        
    },
    render: function() {
        this.$el.html(this.template({
            id: this.model.items[0].id,
            title: this.model.items[0].snippet.title
        }));
        return this;        
    },
    goToResults: function(e) {
        Backbone.history.history.back();
    }
});

module.exports = PlayListView;