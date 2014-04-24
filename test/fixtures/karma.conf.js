module.exports = function(config){
    config.set({
    basePath : '../../',

    files : [
      'lib/**/jquery.min.js',
      'lib/**/angular.min.js',
      'lib/**/angular-route.min.js',
      'js/**/*.js',
      'test/unit/**/*.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
    ],

    exclude : [
    ],

    preprocessors: {
        '*.html': ['html2js']
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-jasmine',
      'jasmine-jquery',
      'karma-html2js-preprocessor',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
   ]
})}
