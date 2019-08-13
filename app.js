const config = require("./config.js");
var NeoLoadWebService = require("./Services/NeoLoadWebService");
var NeoLoadService = require("./Services/NeoLoadService");
var Formatter = require("./Services/Formatter");
const options = config.options;
let neoloadWebService = new NeoLoadWebService();
let neoloadService = new NeoLoadService();
let logger = new Formatter();

function checkTestStatus() {
    if (neoloadWebService.checkRequirements()) {
        neoloadWebService.getRunningTests()
            .then(function (runningTests) {
                neoloadWebService.getStats(runningTests)
                    .then(function (testStats) {
                        neoloadService.checkThreshold(testStats)
                            .then(function () {
                                neoloadService.stopLocalTest()
                                    .then(function (result) {
                                        logger.logInfo(result);
                                    })
                                    .catch(function (error) {
                                        logger.logWarning(error);
                                    });
                            })
                            .catch(function (error) {
                                logger.logWarning(error);
                            })
                    })
                    .catch(function (error) {
                        logger.log(error);
                    });
            })
            .catch(function (error) {
                logger.log(error);
            });
    }
}

// Check status at refresh interval
setInterval(function () { checkTestStatus() },
    options.application.refreshInterval);