var utils = (function() {

	function loadJson(){
		$.ajax({
			url: '/playdata/playlist.json',
			type: 'POST',
			dataType: 'json',
			// data: {param1: 'value1'},
			complete: function(xhr, textStatus) {

			},
			success: function(data, textStatus, xhr) {
				return data.toJSON;
			},
			error: function(xhr, textStatus, errorThrown) {
				return false;
			}
		});
	}

    return {
        loadJson: loadJson
    };

})();

module.exports = utils;

