var	VideoItem = require('models/m-video');


var playListView = Backbone.View.extend({

	el: 'body',
	template: require('views/templates/playlist'),
	events: {
		'click': function() {
			alert('Sample Evento');
		}
	},
	initialize: function() {
		console.log(this.model);
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