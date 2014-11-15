// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-10-07 using
// generator-karma 0.8.3

module.exports = function (config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower
      'www/lib/ionic/js/ionic.bundle.js',
      'www/lib/flat-ui/dist/js/vendor/jquery.min.js',
      'www/lib/flat-ui/dist/js/flat-ui.js',
      'www/lib/validatejs/validate.js',

      // Mock test lib
      'test/cordova.mock.js',
      'www/lib/angular-mocks/angular-mocks.js',

      // Source code
      'www/js/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9002,

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-jasmine'
    ],

    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    reporters: ['progress', 'coverage'],
    preprocessors: {
      'www/js/*.js': ['coverage']
    },
    coverageReporter: {
      type: 'html',
      dir: '.tmp/coverage/'
    }
  });
};
