const axios = require('axios')
var config = require("../config")

'use strict';
module.exports = class NeoLoadService {
    constructor() {
        this.options = config.options;
    }

    checkThreshold(testStats) {
        let optionsThreshold = this.options.threshold;
        return new Promise((resolve, reject) => {
            if (testStats[optionsThreshold.type] >=
                optionsThreshold.threshold) {
                resolve("Test successfully stopped.");
            } else {
                reject("Threshold has not been met (" +
                    testStats[optionsThreshold.type] + "/" +
                    optionsThreshold.threshold + ").");
            }
        });
    }

    stopLocalTest() {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    this.options.agent.address + '/Runtime/v1/Service.svc/StopTest',
                    { "d": {} },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    })
                .then(response => {
                    if (response.status == 200) {
                        resolve("Test successfully stopped.");
                    } else {
                        reject("Failed to stop test w/ response code: " + response.status)
                    }
                })
                .catch(error => {
                    reject("Failed to stop test.");
                });
        });
    }
}