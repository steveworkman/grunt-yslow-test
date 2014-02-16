/*
 * grunt-yslow-test
 *
 *
 * Copyright (c) 2013 Steve Workman
 * Licensed under the none license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/reports'],
    },

    // Configuration to be run (and then tested).
    yslow_test: {
      default_options: {
        options: {
          info: "grade",
          format: "junit",
          urls: ['http://localhost:8000'],
          reports: ['test/reports/yslow.xml'],
          yslow_src: './tasks/lib/yslow.js',
          threshold: '\'{"yfavicon": 1, "yexternal": -1}\''
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    connect: {
      uses_defaults: {}
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'connect', 'yslow_test', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
