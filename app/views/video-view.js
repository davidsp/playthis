
var PlayListView = Backbone.View.extend({
	el: '#info',
	template: require('views/templates/videoItem'),
	initialize: function(opts) {
		this.term = this.options.term;
		this.model = this.options.model;
		console.log(this.model);
		this.render();
	},
	render: function() {
		this.$el.html(this.template({
			id:  this.model.items[0].id,
			title:  this.model.items[0].snippet.title
		}));
		return this;		
	},
});

module.exports = PlayListView;