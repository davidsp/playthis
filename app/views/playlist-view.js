
var PlayListView = Backbone.View.extend({
	el: '#info',
	template: require('views/templates/playlist'),
	events: {
		'click .video-link' : 'loadVideo',
		'click .search-btn' : 'goToPaginated'
	},
	initialize: function(opts) {
		this.term = this.options.term;
		this.results = this.model.items;
		this.pPageToken = this.model.prevPageToken;
		this.nPageToken = this.model.nextPageToken;
		if(this.pPageToken || this.nPageToken) this.addPagination();
		this.render();

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
		this.$el.find('.pagination-wrap').prepend(tpl({
			prevToken: this.pPageToken,
			nextToken: this.nPageToken
		}));
	},
	goToPaginated: function(e){
		var page = $(e.currentTarget).attr('data-page');
        app.navigate("list/" + this.term + '/' + page, true);
	}

});

module.exports = PlayListView;