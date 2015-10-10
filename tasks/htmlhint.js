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

        var HTMLHint = require("htmlhint").HTMLHint;
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
        var fileCount = 0;
        arrFilesSrc.forEach(function(filepath) {
            var file = grunt.file.read(filepath),
                msg = "   " + filepath,
                messages;
            if (file.length) {
                messages = HTMLHint.verify(file, options);
                if (messages.length > 0) {
                    grunt.log.writeln(msg);
                    messages.forEach(function(hint) {
                        var leftWindow = 40;
                        var rightWindow = leftWindow + 20;
                        var evidence = hint.evidence;
                        var line = hint.line;
                        var col = hint.col;
                        var evidenceCount = evidence.length;
                        var leftCol = col > leftWindow + 1 ? col - leftWindow : 1;
                        var rightCol = evidence.length > col + rightWindow ? col + rightWindow : evidenceCount;
                        if(col < leftWindow + 1){
                            rightCol += leftWindow - col + 1;
                        }
                        evidence = evidence.replace(/\t/g, ' ').substring(leftCol - 1, rightCol);
                        // add ...
                        if(leftCol > 1){
                            evidence = '...' + evidence;
                            leftCol -= 3;
                        }
                        if(rightCol < evidenceCount){
                            evidence += '...';
                        }
                        // show evidence
                        grunt.log.writeln('      L%d |%s'.white, line, evidence.grey);
                        // show pointer & message
                        var pointCol = col - leftCol;
                        // add double byte character
                        var match = evidence.substring(0, pointCol).match(/[^\u0000-\u00ff]/g);
                        if(match !== null){
                            pointCol += match.length;
                        }
                        grunt.log.writeln('      %s^ %s'.white, repeatStr(String(line).length + 3 + pointCol), (hint.message + ' (' + hint.rule.id+')')[hint.type === 'error'?'red':'yellow']);
                        hintCount++;
                    });
                    grunt.log.writeln('');
                    fileCount ++;
                }
            }
        });

        if (hintCount > 0) {
            grunt.log.error('%d errors in %d files'.red, hintCount, fileCount);
            return force;
        }
        else{
            verbose.ok();
        }

        grunt.log.ok(arrFilesSrc.length + ' file' + (arrFilesSrc.length === 1 ? '' : 's') + ' lint free.');

    });


    function repeatStr(n, str){
        return new Array(n + 1).join(str || ' ');
    }
};
