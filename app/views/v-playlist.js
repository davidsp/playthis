
var playListView = Backbone.View.extend({
	el: 'body',
	template: require('views/templates/playlist'),
	events: {},
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template({
			url: this.term
		}));
		return this;		
	}

});

module.exports = playListView;