(function() {
  var UnderscoreCompiler, _, sysPath;

  _ = require('underscore');

  module.exports = UnderscoreCompiler = (function() {

    UnderscoreCompiler.prototype.brunchPlugin = true;

    UnderscoreCompiler.prototype.type = 'template';

    UnderscoreCompiler.prototype.extension = 'tpl';

    UnderscoreCompiler.prototype.pattern = /\.(?:tpl|html)$/;

    function UnderscoreCompiler(config) {
      this.config = config;
      null;
    }

    UnderscoreCompiler.prototype.compile = function(data, path, callback) {
      var content, error, result;
      try {
        content = _.template(data).source;
        return result = "module.exports = " + content + ";";
      } catch (err) {
        return error = err;
      } finally {
        callback(error, result);
      }
    };

    return UnderscoreCompiler;

  })();

}).call(this);
