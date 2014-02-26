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
		this.data = this.model.data;
		this.render();
	},
	render: function() {
		this.$el.html(this.template({
			data: this.data,
			url: this.term
		}));
		return this;		
	},
	loadVideo: function(e){

        // e.preventDefault();

	}
});

module.exports = PlayListView;