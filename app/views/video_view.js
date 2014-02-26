var	VideoItem = require('models/m-video');



var PlayListView = Backbone.View.extend({
	el: '#info',
	template: require('views/templates/videoItem'),
	events: {
	},
	initialize: function(opts) {
		this.term = this.options.term;
		this.model = this.options.model;
		this.result = this.model.data.items[0];
		this.render();
	},
	render: function() {
		this.$el.html(this.template({
			info:  this.result
		}));
		return this;		
	},
});

module.exports = PlayListView;