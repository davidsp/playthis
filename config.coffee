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
          'vendor/javascripts/jquery.js', 
          'vendor/javascripts/underscore.js'
          'vendor/javascripts/backbone.js'
        ]

    stylesheets:
      defaultExtension: 'less',
      joinTo:
        'css/main.css': /^(app|vendor)/
      order: {
        before: ['vendor/styles/bootstrap/bootstrap.less'],
        after: ['vendor/styles/helpers.css']
      }
    templates:
      defaultExtension: 'jst'
      joinTo: 'js/app.js'