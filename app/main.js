module.exports = $(function() {

	var SampleModel = require('models/SampleModel');
	var SampleView = require('views/SampleView');

	var sminstance = new SampleModel();
	var svinstance = new SampleView({
		model: sminstance
	});

	// Write App core here

});