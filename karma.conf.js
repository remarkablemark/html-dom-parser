module.exports = config => {
  config.set({
    frameworks: ['mocha', 'chai', 'commonjs'],
    reporters: ['mocha'],
    mochaReporter: {
      showDiff: true
    },
    files: [
      'dist/htmlparser2.js',
      'lib/*.js',
      'test/cases/html.js',
      'test/client/*.js',
      'test/helpers/*.js'
    ],
    exclude: ['lib/html-to-dom-server.js'],
    browsers: ['PhantomJS', 'Chrome'],
    preprocessors: {
      'dist/**/*.js': ['commonjs'],
      'lib/**/*.js': ['commonjs'],
      'test/**/*.js': ['commonjs']
    }
  });
};
