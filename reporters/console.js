'use strict';

var grunt = require('grunt');

module.exports = {
  reporter: function(message) {
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
  }
};