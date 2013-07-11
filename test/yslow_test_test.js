'use strict';

var grunt = require('grunt');

exports.yslow_test = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.exists('test/reports/yslow.xml');
    test.equal(actual, true, 'Report has been output');

    test.done();
  }
};
