var mainRouter = require('routers/main-router');

module.exports = $(function() {
    app = new mainRouter();
    Backbone.history.start({pushState: false});
});