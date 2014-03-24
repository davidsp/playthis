(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("main", function(exports, require, module) {
var	mainRouter = require('routers/mainRouter');

module.exports = $(function() {
	var router = new mainRouter();
	Backbone.history.start({pushState: false});
});
});

;require.register("modules/utils", function(exports, require, module) {
var list = require('views/playlist-view');
var video = require('views/video-view');

var utils = (function() {
    function createView(data,view,term) {
    	if(view === 'video'){
			new video({
				model: data,
				term: term
			});
		}
    	if(view === 'list'){
			new list({
				model: data,
				term: term
			});
		}
    }   
    function loadJson(term, view, paged){
        var url = 'https://www.googleapis.com/youtube/v3/search?q=' + term + '&type=video&key=AIzaSyC532b2yg91QfoCd2LFibEQj6_5nnBsqjA&maxResults=36&order=relevance&part=snippet';
        if(paged) url += '&pageToken=' + paged;
        $.ajax({
            url: url ,
            type: 'POST',
            dataType: 'jsonp',
            complete: function(xhr, textStatus) {
            },
            success: function(data, textStatus, xhr) {
                createView(data,view,term);
            },
            error: function(xhr, textStatus, errorThrown) {
                return false;
            }
        });
    }
	function loadVideo(term, view){
		$.ajax({
			url: 'https://www.googleapis.com/youtube/v3/videos?id=' + term + '&key=AIzaSyC532b2yg91QfoCd2LFibEQj6_5nnBsqjA&maxResults=36&order=relevance&part=snippet',
			type: 'POST',
			dataType: 'jsonp',
			complete: function(xhr, textStatus) {
			},
			success: function(data, textStatus, xhr) {
				createView(data,view,term);
			},
			error: function(xhr, textStatus, errorThrown) {
				return false;
			}
		});
	}
    return {
        loadJson: loadJson,
        loadVideo: loadVideo
    };
})();

module.exports = utils;


});

;require.register("routers/mainRouter", function(exports, require, module) {
var Utils = require('modules/utils');
var BasicView = require('views/basic-view');

var playListRouter = Backbone.Router.extend({

	routes: {
	    "": "basicInit",
		//takes the query and does a youtube search
		"list/:query": "loadList",
		"list/:query/:token": "loadPaged",
		//takes the id of the video and returns the json data of the video itself
		"video/:id": "showVideo",
		
		//display info about the app
		"about": "showAbout"
	},
	
	basicInit: function() {
		new BasicView({});
	},
	loadList: function(query){
		new BasicView({});
		Utils.loadJson(query,'list');		
	},
	loadPaged: function(query, page){
		new BasicView({});
		Utils.loadJson(query,'list',page);		
	},
	showVideo: function(id) {
		new BasicView({});
		Utils.loadVideo(id,'video');
	}
});

app = new playListRouter();
module.exports = playListRouter;
});

;require.register("views/basic-view", function(exports, require, module) {

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
		this.$el.html(this.template({}));
		return this;		
	},
	searchVideos: function(e) {
		var value = $(e.target).find('input').val();
        app.navigate("list/" + value, true);
		e.preventDefault();
	}
});

module.exports = BasicView;
});

;require.register("views/playlist-view", function(exports, require, module) {

var PlayListView = Backbone.View.extend({
	el: '#info',
	template: require('views/templates/playlist'),
	events: {
		'click .video-link' : 'loadVideo',
		'click .search-btn' : 'goToPaginated'
	},
	initialize: function(opts) {
		this.term = this.options.term;
		this.results = this.model.items;
		this.pPageToken = this.model.prevPageToken;
		this.nPageToken = this.model.nextPageToken;
		this.render();
		if(this.pPageToken || this.nPageToken) this.addPagination();

	},
	render: function() {
		this.$el.html(this.template({
			items: this.results,	
			totalItems: null,
			url: this.term
		}));
		return this;		
	},
	addPagination: function(){
		var tpl = require('views/templates/pagination');
		this.$el.find('.pagination-wrap').html(tpl({
			prevToken: this.pPageToken,
			nextToken: this.nPageToken
		}));
	},
	goToPaginated: function(e){
		var token = $(e.currentTarget).attr('data-token');
        app.navigate("list/" + this.term + '/' + token, true);
	}

});

module.exports = PlayListView;
});

;require.register("views/templates/basic_view", function(exports, require, module) {
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<form id="search-form" class="row form-inline">\r\n    <div class="form-group col-md-8 col-xs-12 col-md-offset-2 input-group">\r\n\t\t<input type="text" id="input-search" class="form-control" placeholder="Search for something">\r\n\t\t<button class="btn btn-primary btn-small span12">GO</button>\r\n    </div>        \r\n</form>\r\n';
}
return __p;
};
});

;require.register("views/templates/pagination", function(exports, require, module) {
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<ul class="list-unstyled">\r\n    ';
 if(prevToken) { 
__p+='\r\n    <li class="pull-left">\r\n        <ul class="pagination">\r\n                <li class="first-page" data-page="1">\r\n                    <a class="search-btn" data-token="'+
((__t=(prevToken))==null?'':__t)+
'"><i class="glyphicon glyphicon-chevron-left"></i></a>\r\n                </li>\r\n            \r\n        </ul>\r\n    </li>\r\n    ';
 } 
__p+='\r\n    ';
 if(nextToken) { 
__p+='\r\n    <li class="pull-right">\r\n        <ul  class="pagination">\r\n            <li class="next-page"><a class="search-btn" data-token="'+
((__t=(nextToken))==null?'':__t)+
'"><i class="glyphicon glyphicon-chevron-right"></i></a></li>\r\n        </ul>\r\n    </li>\r\n    ';
 } 
__p+='\r\n</ul>\r\n\r\n<p></p>';
}
return __p;
};
});

;require.register("views/templates/playlist", function(exports, require, module) {
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\t<h3><strong>'+
((__t=(totalItems ))==null?'':__t)+
'</strong> results after searching for <strong>'+
((__t=(url))==null?'':__t)+
'</strong></h3>\r\n    <nav class="pagination-wrap"></nav>\r\n    <section class="row list-items">\r\n    ';
 
    var results = items;
    for( var i in results) { 
__p+='\r\n\t    <div class="col-xs-12 col-sm-6 col-md-3">\r\n\t        <p><a href="#video/'+
((__t=(results[i].id.videoId))==null?'':__t)+
'" class="video-link" data-id="results[i].id.videoId"><img src="'+
((__t=( results[i].snippet.thumbnails.high.url ))==null?'':__t)+
'"></a></p>\r\n\t        <p><a href="#video/'+
((__t=(results[i].id.videoId))==null?'':__t)+
'" class="video-link" data-id="results[i].id.videoId">'+
((__t=( results[i].snippet.title ))==null?'':__t)+
'</a></p>\r\n\t    </div>\r\n    ';
 } 
__p+='\r\n    </section>\r\n    <nav class="pagination-wrap"></nav>    \r\n';
}
return __p;
};
});

;require.register("views/templates/videoItem", function(exports, require, module) {
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row">\r\n    <div id="video-player" class="col-sm-offset-1 col-md-offset-2 col-xs-12 col-sm-10 col-md-8">\r\n        <p id="back-to-results">\r\n            <a class="btn-back-to-results btn btn-success btn-xs"><i class="glyphicon glyphicon-chevron-left with-icon"></i>Back to the search results</a>\r\n        </p>\r\n        <h3>'+
((__t=(title))==null?'':__t)+
'</h3>\r\n         <a class="video-link" href="http://www.youtube.com/watch?v='+
((__t=(id))==null?'':__t)+
'">'+
((__t=(title))==null?'':__t)+
'</a>\r\n    </div>\r\n</div>';
}
return __p;
};
});

;require.register("views/v-playlist", function(exports, require, module) {

var playListView = Backbone.View.extend({
	el: 'body',
	template: require('views/templates/playlist'),
	events: {},
	initialize: function() {
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
});

;require.register("views/video-view", function(exports, require, module) {

var PlayListView = Backbone.View.extend({
	el: '#info',
	template: require('views/templates/videoItem'),
	events: {
		'click .btn-back-to-results' : 'goToResults'
	},
	initialize: function(opts) {
		this.render();
        $('a.video-link').ytchromeless();
		
	},
	render: function() {
		this.$el.html(this.template({
			id: this.options.model.items[0].id,
			title: this.options.model.items[0].snippet.title
		}));
		return this;		
	},
	goToResults: function(e) {
		Backbone.history.history.back();
	}
});

module.exports = PlayListView;
});

;
//# sourceMappingURL=app.js.map