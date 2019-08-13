const axios = require('axios')
var config = require("../config")

'use strict';
module.exports = class NeoLoadWebService {
  constructor() {
    this.options = config.options;
  }

  checkRequirements() {
    return new Promise((resolve, reject) => {
      try {
        if (!this.options.nlw.address) {
          throw new Error("Please provide a NLW address in the config.js file.");
        }
        if (!this.options.nlw.apikey) {
          throw new Error("Please provide a NLW api key in the config.js file.");
        }
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  getRunningTests() {
    // https://www.neotys.com/documents/doc/neoload/latest/#31325.htm

    return new Promise((resolve, reject) => {
      axios
        .get(
          this.options.nlw.address + '/v1/tests?status=RUNNING&limit=50&offset=0',
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'accountToken': this.options.nlw.apikey
            }
          })
        .then(response => {
          if (response.status == 200) {
            // getStats(response.data);
            return resolve(response.data);
          }
        })
        .catch(error => {
          return reject("Failed to fetch running tests.");
        });
    });
  }

  getStats(runningTests) {
    return new Promise((resolve, reject) => {
      // Check if there are running tests
      if (runningTests.length < 1) {
        return reject('No running tests found.');
      }
      else {
        // Loop through running tests to get statistics
        for (var test in runningTests) {
          let currentTest = runningTests[test];
          axios
            .get(
              this.options.nlw.address + '/v1/tests/' + currentTest.id + '/statistics',
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'accountToken': this.options.nlw.apikey
                }
              })
            .then(response => {
              if (response.status == 200) {
                resolve(response.data);
              }
            })
            .catch(error => {
              reject("Failed to fetch stats for running test (" + currentTest.id + ").");
            });
        }
      }
    })
  }
}
