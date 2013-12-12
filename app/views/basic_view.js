
var BasicView = Backbone.View.extend({
	el: '#search-form',
	template: require('views/templates/basic_view'),
	events : {
		'submit #search-form' : 'searchVideos'
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template({
		}));
		return this;		
	},
	searchVideos: function(e) {
		var value = $(e.target).find('input').val();
        app.navigate("list/" + value, true);
		e.preventDefault();
	}
});

module.exports = BasicView;