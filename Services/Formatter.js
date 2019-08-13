var moment = require('moment');
var config = require("../config");
var winston = require('./winston');

'use strict';
module.exports = class Formatter {
    constructor() {
        this.options = config.options;
    }

    // log(text) {
    //     console.log(moment(new Date()).format(this.options.application.timestampFormat) + ": " + text);
    // }

    log(text) {
        console.log(moment(new Date()).format(this.options.application.timestampFormat) + ": " + text);
    }

    logInfo(text) {
        winston.info(moment(new Date()).format(this.options.application.timestampFormat) + ": " + text);
    }

    logWarning(text) {
        winston.warn(moment(new Date()).format(this.options.application.timestampFormat) + ": " + text);

    }
}