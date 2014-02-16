exports.init = function(grunt) {
  var exports = {},
      path = require('path');
  exports.yslow = function(url, report, options, callback) {

    // options.yslow_src only expected to be used for testing only

    var pathToYSlow = path.resolve(options.yslow_src || './node_modules/grunt-yslow-test/tasks/lib/yslow.js'),
        command = 'phantomjs '+ pathToYSlow,
        exec = require('child_process').exec;

    // Add options documented in the following web site:
    //   http://yslow.org/phantomjs/
    if (options.info) {
      command += ' -i ' + options.info;
    }

    if (options.format) {
      command += ' -f ' + options.format;
    }

    if (options.ruleset) {
      command += ' -r ' + options.ruleset;
    }

    if (options.threshold) {
      command += ' -t ' + options.threshold;
    }

    if (options.ua) {
      command += ' -u ' + options.ua;
    }

    if (options.viewport) {
      command += ' -vp ' + options.viewport;
    }

    if (options.headers) {
      command += ' -ch ' + options.headers;
    }

    if(options.cnds) {
      command += ' --cdns "' + options.cdns.join(',') + '"';
    }

    command += " " + url;
    grunt.log.writeln("Command: " + command);

    function puts(error, stdout, stderr) {
      if(stdout.match(/^FAIL/)) {
        callback('Something went wrong, the report cannot be parsed.');
      }

      grunt.log.write('\nRunning YSlow on "' + url + '":\n');

      if (report) {
        grunt.log.write("Saving report to "+report);
        grunt.file.write(report, stdout);
      } else {
        grunt.log.write(stdout);
      }

      switch(options.format)
      {
        case 'junit':
          var parser = require('./report_parsers/junit_report_parser').init(grunt);
          error = parser.parse(stdout);
          break;
      }

      callback(error);
    }

    exec(command, puts);

  };

  return exports;
};