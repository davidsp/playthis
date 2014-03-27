
var Utils = require('modules/remoteUtils');
var conf = require('lib/conf');


var PlayListView = Backbone.View.extend({
    el: '#info',
    template: require('views/templates/videos-list'),
    events: {
        'click .video-link' : 'loadVideo',
        'click .search-btn' : 'goToPaginated'
    },
    initialize: function(opts) {
        //call functions here to prepare the interface
    },
    show:function(query,page) {
        this.term = query;
        var url = conf.urls.searchUrl;
        url = url.replace('{searchTerm}', query);
        url = url.replace('{userId}', conf.values.userId);
        url = url.replace('{resultsPerPage}', conf.values.itemsPerPage);
        if(page) url += '&pageToken=' + page;        
        Utils.getDataJson(url,_.bind(this.postJson, this));
    },
    postJson: function(data){
        this.model = data;
        this.results = this.model.items;
        this.pPageToken = this.model.prevPageToken;
        this.nPageToken = this.model.nextPageToken;
        this.renderData();
        if(this.pPageToken || this.nPageToken) this.addPagination();
    },    
    renderData: function() {
        $('#info').html(this.template({
            items: this.results,    
            totalItems: null,
            url: this.term
        }));
        return this;        
    },
    addPagination: function(){
        var tpl = require('views/templates/pagination');
        $('#info').find('.pagination-wrap').html(tpl({
            prevToken: this.pPageToken,
            nextToken: this.nPageToken
        }));
    },
    goToPaginated: function(e){
        var token = $(e.currentTarget).attr('data-token');
        app.navigate("list/" + this.term + '/' + token, {trigger: true});
        e.stopImmediatePropagation();
    }
});

module.exports = PlayListView;