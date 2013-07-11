/*
 * grunt-yslow-test
 * 
 *
 * Copyright (c) 2013 Steve Workman
 * Licensed under the none license.
 */

'use strict';

module.exports = function(grunt) {

  var yslow = require('./lib/grunt-yslow').init(grunt).yslow;

  grunt.registerMultiTask('yslow_test', 'Run YSlow tests', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async(),
        pages = [],
        options = this.options();

    // Create URL/Report pairs
    for (var i=0; i<options.urls.length; i++) {
      var report;
      if (options.reports.length >= i) {
        report = options.reports[i];
      }
      pages.push({url: options.urls[i], report: report});
    }

    // Go through each page and make the request
    grunt.util.async.forEachSeries(pages, 
      function(page, callback) {
        yslow(page.url, page.report, options, function (err) {
          if (err) {
            grunt.warn(err);
          }
          callback();
        });
      }, done);

  });

};
