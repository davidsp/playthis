var	VideoItem = require('models/m-video');



var PlayListView = Backbone.View.extend({
	el: '#info',
	template: require('views/templates/playlist'),
	events: {
		'click .video-link' : 'loadVideo'
	},
	initialize: function(opts) {
		this.term = this.options.term;
		this.model = this.options.model;
		this.results = this.model.data.items;
		this.render();
	},
	render: function() {
		this.$el.html(this.template({
			searchResults: this.results,
			url: this.term
		}));
		return this;		
	},
	loadVideo: function(e){

        // e.preventDefault();

	}
});

module.exports = PlayListView;