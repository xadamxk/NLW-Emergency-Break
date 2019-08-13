const enums = require("./enums");
const Threshold = enums.threshold;

module.exports = {
    options: {
        agent: {
            address: "http://localhost:7400",
        },
        application: {
            refreshInterval: 15000, // Rate to check running test stats in milliseconds (Default: 15000 - 15 seconds)
            timestampFormat: "MM/DD/YYYY HH:mm:ss" // Moment.js format (Default: MM/DD/YYYY HH:mm:ss)
        },
        nlw: {
            address: "", // http://{nlw-address}:{port} ex http://10.10.100.100:8080
            apikey: "", // NLW API Key
        },
        threshold: {
            type: Threshold.TotalIterationCountFailure, // Which statistic to use as threshold (Default: TotalIterationCountFailure)
            threshold: 50, // Numeric value for threshold type - INTEGER ONLY (Default: 50)
        }
    }
};