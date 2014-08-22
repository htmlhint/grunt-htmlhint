/*
 * grunt-htmlhint
 * https://github.com/yaniswang/grunt-htmlhint
 *
 * Copyright (c) 2013 Yanis Wang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('htmlhint', 'Validate html files with htmlhint.', function() {

    var HTMLHint  = require("htmlhint").HTMLHint;
    var options = this.options({
        force: false,
        reporter: 'reporters/console.js'
      }),
      arrFilesSrc = this.filesSrc,
      verbose = grunt.verbose;

    if (options.htmlhintrc) {
      var rc = grunt.file.readJSON(options.htmlhintrc);
      grunt.util._.defaults(options, rc);
      delete options.htmlhintrc;
    }

    var force = options.force;
    delete options.force;

    var hintCount = 0;
    arrFilesSrc.forEach(function( filepath ) {
      var file = grunt.file.read( filepath ),
        msg = "Linting " + filepath + "...",
        messages;
      if (file.length) {
        messages = HTMLHint.verify(file, options);
        verbose.write( msg );
        if (messages.length > 0) {
          verbose.or.write( msg );
          grunt.log.error();
          if (options.reporterOutput) {
            var appendFileSync = require('fs').appendFileSync;
            appendFileSync(options.reporterOutput, '[file] ' + filepath + '\n');
          }
        } else {
          verbose.ok();
        }
        messages.forEach(function( message ) {
          var output = require(options.reporter);
          output.reporter(message, options.reporterOutput);
          hintCount++;
        });
      }
      else{
        grunt.log.writeln( "Skipping empty file " + filepath);
      }
    });

    if ( hintCount > 0 ) {
      return force;
    }

    grunt.log.ok(arrFilesSrc.length + ' file' + (arrFilesSrc.length === 1 ? '' : 's') + ' lint free.');

  });

};
