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
		this.searchTerm = this.model.get('searchTerm');
		this.loadData();
	},
	loadData: function() {
		this.render();
	},
	render: function() {
		//create the video
		var vid = new VideoItem({
			title : 'titulo desde la vista' 
		});
		console.log(vid.get('title'));
		//var html = this.template();
		this.$el.html(this.template({
			url: this.searchTerm
		}));
		return this;		
	}

});

module.exports = playListView;