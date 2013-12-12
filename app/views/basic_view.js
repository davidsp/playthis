
var BasicView = Backbone.View.extend({

	el: 'body',
	template: require('views/templates/basic_view'),
	
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template({
		}));
		return this;		
	}

});

module.exports = BasicView;