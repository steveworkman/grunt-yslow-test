# grunt-yslow-test

> Runs the yslow phantom script from a grunt task

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-yslow-test --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-yslow-test');
```

## The "yslow_test" task

### Overview
In your project's Gruntfile, add a section named `yslow_test` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  yslow_test: {
    options: {
      info: "grade",
      format: "junit",
      urls: ['http://google.com'],
      reports: ['test/reports/yslow.xml']
    },
    your_target: {
      files: []
    }
  }
})
```

### Options

#### options.urls
An array of URLs to visit

#### options.reports
An array of files to write output reports into. These match the URLs on array index. If no reports are found, a file will not be written

The options mirror those available in the yslow.js plugin. Please see http://yslow.org/phantomjs/ for parameters.

*Please note, as this script uses URLs and not local files, consider using a static grunt server [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)*

### Usage Examples

#### Default Options
```js
grunt.initConfig({
  yslow_test: {
    my_site: {
      options: {
        info: "grade",
        format: "junit",
        urls: ['http://google.com'],
        reports: ['test/reports/yslow.xml']
      }
    }
  }
})
```

## Release History
0.1.0: First release