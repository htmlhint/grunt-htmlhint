/*
 * grunt-htmlhint
 * https://github.com/yaniswang/grunt-htmlhint
 *
 * Copyright (c) 2013 Yanis Wang
 * Licensed under the MIT license.
 */

'use strict';

// replace left/right quotation marks with normal quotation marks
function normalizeQuotationMarks(str) {
  if (str) {
    str = str.replace(/[\u201c\u201d]/g, '"');
  }
  return str;
}

module.exports = function(grunt) {

  grunt.registerMultiTask('htmlhint', 'Validate html files with htmlhint.', function() {

    var HTMLHint  = require("htmlhint").HTMLHint;
    var options = this.options({
          force: false
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

        if (options.ignore) {
          var ignore = options.ignore instanceof Array ? options.ignore : [options.ignore];
          messages = messages.filter(function(message) {
            // iterate over the ignore rules and test the message agains each rule.
            // A match should return false, which causes every() to return false and the message to be filtered out.
            return ignore.every(function (currentValue) {
              if (currentValue instanceof RegExp) {
                return !currentValue.test(message.message);
              }
              return normalizeQuotationMarks(currentValue) !== normalizeQuotationMarks(message.message);
            });
          });
        }

        if (messages.length > 0) {
          verbose.or.write( msg );
          grunt.log.error();
        } else {
          verbose.ok();
        }

        messages.forEach(function( message ) {
          grunt.log.writeln( "[".red + ( "L" + message.line ).yellow + ":".red + ( "C" + message.col ).yellow + "]".red + ' ' + message.message.yellow );
          var evidence = message.evidence,
              col = message.col;
          if (col === 0) {
            evidence = '?'.inverse.red + evidence;
          } else if (col > evidence.length) {
            evidence = evidence + ' '.inverse.red;
          } else {
            evidence = evidence.slice(0, col - 1) + evidence[col - 1].inverse.red + evidence.slice(col);
          }
          grunt.log.writeln(evidence);
          hintCount ++;
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
