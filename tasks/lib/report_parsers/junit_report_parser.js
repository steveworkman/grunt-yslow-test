exports.init = function(grunt) {
  var exports = {}
  exports.parse = function(report) {
    var libxmljs = require("libxmljs");
    var xmlDoc = libxmljs.parseXml(report);

    var failures_by_name = xmlDoc.find('//testcase[failure]');

    grunt.log.writeln();
    for(var i=0; i<failures_by_name.length; i++) {
      var failure = failures_by_name[i];
      grunt.log.writeln(failure.attr('name').value().red);

      var messages = failure.find('failure/@message');
      for(var t=0; t<messages.length; t++) {
        var message = messages[t].value();
        grunt.log.writeln('  ' + message);
      }
    }

    var n_tests, n_failures, n_skipped = 0;

    if(xmlDoc.find('//testsuite')[0]) {
      var suite = xmlDoc.find('//testsuite')[0];
      if(suite.attr('tests')) {
        n_tests = suite.attr('tests').value();
      }

      if(suite.attr('failures')) {
        n_failures = suite.attr('failures').value();
      }

      if(suite.attr('skipped')) {
        n_skipped = suite.attr('skipped').value();
      }
    }

    var summary = ('Executed ' + (n_tests - n_skipped) + ' of ' + n_tests);
    grunt.log.write(summary);

    if(n_failures > 0) {
      var error_message = ' (' + n_failures + ' FAILED)';
      grunt.log.writeln(error_message.red);
      return summary + error_message;
    }

    grunt.log.writeln(' SUCCESS'.green);
    return null;
  }

  return exports;
};