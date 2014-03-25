var mainRouter = require('routers/main-router');

module.exports = $(function() {
    var router = new mainRouter();
    Backbone.history.start({pushState: false});
});