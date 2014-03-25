
var PlayListView = Backbone.View.extend({
    el: '#info',
    template: require('views/templates/videos-list'),
    events: {
        'click .video-link' : 'loadVideo',
        'click .search-btn' : 'goToPaginated'
    },
    initialize: function(opts) {
        this.term = opts.term;
        this.results = this.model.items;
        this.pPageToken = this.model.prevPageToken;
        this.nPageToken = this.model.nextPageToken;
        this.render();
        if(this.pPageToken || this.nPageToken) this.addPagination();

    },
    render: function() {
        this.$el.html(this.template({
            items: this.results,    
            totalItems: null,
            url: this.term
        }));
        return this;        
    },
    addPagination: function(){
        var tpl = require('views/templates/pagination');
        this.$el.find('.pagination-wrap').html(tpl({
            prevToken: this.pPageToken,
            nextToken: this.nPageToken
        }));
    },
    goToPaginated: function(e){
        var token = $(e.currentTarget).attr('data-token');
        app.navigate("list/" + this.term + '/' + token, true);
    }

});

module.exports = PlayListView;