Playthis
========

## About Playthis

Playthis is a dead simple backbone application, it searches and plays videos from youtube. To  do so, it consumes data from the YouTube app (v3).

## See it working

A deployed app can be viewed here: http://davidsp.github.io/playthis

## Fork and extend it.

This is an HTML5 application built with Brunch. It is meant to work as an starting point to grok routers, views and templates.

- Register your app with google so you can consume its API services:
https://developers.google.com/youtube/registering_an_application

- Once you have a key for the app, you can specify yours in 'lib/conf'.


## Getting started with brunch
* Install (if you don't have them):
    * [Node.js](http://nodejs.org/): `brew install node` on OS X 
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * [Bower](http://bower.io): `npm install -g bower`
    * Brunch plugins and Bower dependencies: `npm install & bower install`.
* Run:
    * `brunch watch --server` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `brunch build --production` — builds minified project for production
* Learn:
    * `build/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
    * Place static files you want to be copied from `app/assets/` to `site/`.
    * [Brunch site](http://brunch.io)

* Support and installed dependencies.
    * Less.css
        * Twitter bootstrap (http://getbootstrap.com/)
    * JS
        * Vanilla JS.
        * jQuery.
        * Underscore.
        * Backbone.



