
var VideoItem = Backbone.Model.extend({

	defaults: {
		title: '',
		url: '',
		description:'',
		thumbnail:''
	},

	initialize: function() {
		
	}

});

module.exports = VideoItem;