exports.config =
  # See http://brunch.readthedocs.org/en/latest/config.html for documentation.
  paths:
    public:
      'build'
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/libs.js': /^vendor/
      order:
        before: [
          'vendor/javascripts/jquery-1.9.1.js', 
          'vendor/javascripts/underscore-1.4.4.js'
        ]

    stylesheets:
      joinTo:
        'css/app.css': /^(app|vendor)/
      order:
        before: []
        after: []

    templates:
      joinTo: 'js/app.js'