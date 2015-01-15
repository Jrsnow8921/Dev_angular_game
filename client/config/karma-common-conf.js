module.exports = {
  browsers: ['PhantomJS'],
  frameworks: ['jasmine', 'closure'],
  files: [
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-touch/angular-touch.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/closure-library/closure/goog/base.js',
    'client/config/phantomjs-prototype.bind-shim.js',
    'client/app/**/*_test.js',
    'client/app/**/*.html',

    {
      pattern: 'client/app/**/!(*_test).js',
      included: false
    },

    {
      pattern: 'bower_components/closure-library/closure/goog/**/*.js',
      included: false
    }
  ],
  preprocessors: {
    'client/app/**/*_test.js': ['closure'],
    'client/app/**/!(*_test).js': ['closure', 'coverage'],
    'bower_components/closure-library/closure/goog/deps.js': ['closure-deps'],
    'client/app/**/*.html': ['ng-html2js']
  },
  reporters: ['progress', 'coverage', 'junit'],
  coverageReporter: {
    reporters: [
      {
        type: 'cobertura',
        dir: './client/coverage/',
        subdir: '.'
      },
      {
        type: 'html',
        dir: './client/coverage/'
      }
    ]
  },
  junitReporter: {
    outputFile: 'test-results.xml'
  },
  ngHtml2JsPreprocessor: {
    stripPrefix: 'app/',
    prependPrefix: 'views/'
  }
};
