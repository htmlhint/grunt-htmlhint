/*
 * grunt-htmlhint
 * https://github.com/yaniswang/grunt-htmlhint
 *
 * Copyright (c) 2013 Yanis Wang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Configuration to be run (and then tested).
        htmlhint: {
            all: {
                options: {
                    'tag-pair': true,
                    'htmlhintrc': 'test/.htmlhintrc'
                },
                src: 'test/fixtures/*.html'
            }
        },

        shell: {
            htmlhint: {
                command: 'grunt htmlhint',
                options: {
                    callback: function (_, stdout, stderr, cb) {
                        if (/invalid\.html/.test(stdout)) {
                            if (/\(doctype-first\)/.test(stdout) && /\(tag-pair\)/.test(stdout)) {
                                cb();
                            } else {
                                cb(false);
                            }
                        } else {
                            cb(false);
                        }
                    }
                }
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-shell');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'shell:htmlhint']);

};
