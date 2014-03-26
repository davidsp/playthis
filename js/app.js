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
require.register("lib/conf", function(exports, require, module) {
var conf = {
    'urls' :{
        searchUrl: 'https://www.googleapis.com/youtube/v3/search?q={searchTerm}&type=video&key={userId}&maxResults={resultsPerPage}&order=relevance&part=snippet',
        videoUrl: 'https://www.googleapis.com/youtube/v3/videos?id={videoId}&key={userId}&maxResults=1&order=relevance&part=snippet',
    },
    values :{
        userId: 'AIzaSyC532b2yg91QfoCd2LFibEQj6_5nnBsqjA',
        itemsPerPage: 36
    },
    labels :{

    }
}
module.exports = conf;

});

;require.register("main", function(exports, require, module) {

var mainRouter = require('routers/main-router');

module.exports = $(function() {
    app = new mainRouter();
    Backbone.history.start({pushState: false});
});
});

;require.register("modules/remoteUtils", function(exports, require, module) {
var remoteUtils = {
    getDataJson : function(url,success){
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            success: function(data, textStatus, xhr) {
                success(data);                
            }
        });
    }
}
module.exports = remoteUtils;
});

;require.register("routers/main-router", function(exports, require, module) {
var List = require('views/playlist-view');
var Video = require('views/video-view');
var BasicView = require('views/basic-view');



var PlayListRouter = Backbone.Router.extend({

    routes: {
        //takes the query and does a youtube search
        "list/:query": "loadList",
        "list/:query/:token": "loadPaged",

        //takes the id of the video and returns the json data of the video itself
        "video/:id": "loadVideo",
    },

    initialize: function () {
        this.getBasicView();
    },

    getBasicView: function () {
        if (!this.basicView) {
            this.basicView = new BasicView({});
        }
        return this.basicView;
    },
    
    getListView: function () {
        if (!this.listView) {
            this.listView = new List({});
        }
        return this.listView;
    },
    getVideoView: function () {
        if (!this.videoView) {
            this.videoView = new Video({});
        }
        return this.videoView;
    },
    
    loadList: function(query){
        this.getListView().show(query);
    },
    loadPaged: function(query, page){
        this.getListView().show(query,page);
    },
    loadVideo: function(id) {
        this.getVideoView().show(id);
    }
});

module.exports = PlayListRouter;
});

;require.register("views/basic-view", function(exports, require, module) {

var BasicView = Backbone.View.extend({
    el: '#search-form',
    template: require('views/templates/basic-search'),
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

var Utils = require('modules/remoteUtils');
var conf = require('lib/conf');

Backbone.View.prototype.close = function () {
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};
var PlayListView = Backbone.View.extend({
    el: '#info',
    template: require('views/templates/videos-list'),
    events: {
        'click .video-link' : 'loadVideo',
        'click .search-btn' : 'goToPaginated'
    },
    initialize: function(opts) {
        //call functions here to prepare the interface
    },
    show:function(query,page) {
        this.term = query;
        var url = conf.urls.searchUrl;
        url = url.replace('{searchTerm}', query);
        url = url.replace('{userId}', conf.values.userId);
        url = url.replace('{resultsPerPage}', conf.values.itemsPerPage);
        if(page) url += '&pageToken=' + page;        
        Utils.getDataJson(url,_.bind(this.postJson, this));
    },
    postJson: function(data){
        this.model = data;
        this.results = this.model.items;
        this.pPageToken = this.model.prevPageToken;
        this.nPageToken = this.model.nextPageToken;
        this.renderData();
        if(this.pPageToken || this.nPageToken) this.addPagination();
    },    
    renderData: function() {
        $('#info').html(this.template({
            items: this.results,    
            totalItems: null,
            url: this.term
        }));
        return this;        
    },
    addPagination: function(){
        var tpl = require('views/templates/pagination');
        $('#info').find('.pagination-wrap').html(tpl({
            prevToken: this.pPageToken,
            nextToken: this.nPageToken
        }));
    },
    goToPaginated: function(e){
        var token = $(e.currentTarget).attr('data-token');
        app.navigate("list/" + this.term + '/' + token, {trigger: true});
        e.stopImmediatePropagation();
    }
});

module.exports = PlayListView;
});

;require.register("views/templates/basic-search", function(exports, require, module) {
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<form id="search-form" class="row form-inline">\r\n    <div class="form-group col-md-8 col-xs-12 col-md-offset-2 input-group">\r\n        <input type="text" id="input-search" class="form-control" placeholder="Search for something">\r\n        <button class="btn btn-primary btn-small span12">GO</button>\r\n    </div>        \r\n</form>\r\n';
}
return __p;
};
});

;require.register("views/templates/error-message", function(exports, require, module) {
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<p>error message</p>';
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
__p+='\r\n    <li class="pull-left">\r\n        <ul class="pagination">\r\n            <li class="first-page" data-page="1">\r\n                <a class="search-btn" data-token="'+
((__t=(prevToken))==null?'':__t)+
'"><i class="glyphicon glyphicon-chevron-left"></i></a>\r\n            </li>\r\n        </ul>\r\n    </li>\r\n    ';
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

;require.register("views/templates/video-item", function(exports, require, module) {
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row">\r\n    <div id="video-player" class="col-sm-offset-1 col-md-offset-2 col-xs-12 col-sm-10 col-md-8">\r\n        <p id="back-to-results">\r\n            <a class="btn-back-to-results btn btn-success btn-xs"><i class="glyphicon glyphicon-chevron-left with-icon"></i>Back to the search results</a>\r\n        </p>\r\n        <h3>'+
((__t=(title))==null?'':__t)+
'</h3>\r\n        <iframe src="//www.youtube.com/embed/'+
((__t=(id))==null?'':__t)+
'" frameborder="0" allowfullscreen></iframe>\r\n    </div>\r\n</div>';
}
return __p;
};
});

;require.register("views/templates/videos-list", function(exports, require, module) {
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="list-videos">\r\n<h3><strong>'+
((__t=(totalItems ))==null?'':__t)+
'</strong> results after searching for <strong>'+
((__t=(url))==null?'':__t)+
'</strong></h3>\r\n<nav class="pagination-wrap"></nav>\r\n<section class="row list-items">\r\n';
 
var results = items;
for( var i in results) { 
__p+='\r\n    <div class="col-xs-12 col-sm-6 col-md-3">\r\n        <p><a href="#video/'+
((__t=(results[i].id.videoId))==null?'':__t)+
'" class="video-link"><img src="'+
((__t=( results[i].snippet.thumbnails.high.url ))==null?'':__t)+
'"></a></p>\r\n        <p><a href="#video/'+
((__t=(results[i].id.videoId))==null?'':__t)+
'" class="video-link">'+
((__t=( results[i].snippet.title ))==null?'':__t)+
'</a></p>\r\n    </div>\r\n';
 } 
__p+='\r\n</section>\r\n<nav class="pagination-wrap"></nav>    \r\n</div>';
}
return __p;
};
});

;require.register("views/video-view", function(exports, require, module) {

var Utils = require('modules/remoteUtils');
var conf = require('lib/conf');

var PlayListView = Backbone.View.extend({
    el: '#info',
    template: require('views/templates/video-item'),
    events: {
        'click .btn-back-to-results' : 'goToResults'
    },
    initialize: function(opts) {
    },
    show: function(id) {
        var url = conf.urls.videoUrl;
        url = url.replace('{videoId}', id);
        url = url.replace('{userId}', conf.values.userId);
        Utils.getDataJson(url,_.bind(this.postJson, this));        
    },
    postJson: function(data){
        this.model = data;        
        this.id = this.model.items[0].id;
        this.title = this.model.items[0].snippet.title;
        this.render();
    },
    render: function() {
        this.$el.html(this.template({
            id: this.id,
            title: this.title
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