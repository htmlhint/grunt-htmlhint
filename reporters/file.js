'use strict';

var appendFileSync = require('fs').appendFileSync,
    grunt          = require('grunt');

module.exports = {
  reporter: function(message, reporterOutput) {

    var err = "[" + ( "L" + message.line ) + ":" + ( "C" + message.col ) + "]" + ' ' + message.message,
        evidence = message.evidence;

    appendFileSync(reporterOutput, '\n\t' + err + '\n\t' + evidence + '\n');

  }
};