# NLW Emergency Break

NLW Emergency Break is a NodeJS application that monitors running Neoload tests and terminates them as needed.

## Installation

Install [NodeJS](https://nodejs.org/en/download/) - Reboot afterwards

Pull the project to your local machine

Navigate to the project directory and run:
```bash
npm install
npm start
```
Refer to application console for current status and events.

## Configuration
All configuration is done in the config.js file.
```javascript
options: {
        agent: {
            address: "http://localhost:7400",
        },
        application: {
            refreshInterval: 30000, // Rate to check running test stats in milliseconds (Default: 30000)
            timestampFormat: "MM/DD/YYYY HH:mm:ss" // Moment.js format (Default: MM/DD/YYYY HH:mm:ss)
        },
        nlw: {
            address: "", // http://{nlw-address}:{port}
            apikey: "", // NLW API Key
        },
        threshold: {
            type: Threshold.TotalIterationCountFailure, // Which statistic to use as threshold (Default: TotalIterationCountFailure)
            threshold: 50, // Numeric value for threshold type - INTEGER ONLY (Default: 50)
        }
    }
```

## Limitations
Currently NLW Emergency Break requires that you run it on the same machine that the controller will be executing tests on, since there is currently no way to stop tests via NLW (07/10/2019).

Threshold types are limited to attributes returned by the NLW */statistic* endpoint:
- TotalRequestCountSuccess
- TotalRequestCountFailure
- TotalRequestDurationAverage
- TotalRequestCountPerSecond
- TotalTransactionCountSuccess
- TotalTransactionCountFailure
- TotalTransactionDurationAverage
- TotalTransactionCountPerSecond
- TotalIterationCountSuccess
- TotalIterationCountFailure
- TotalGlobalDownloadedBytes
- TotalGlobalDownloadedBytesPerSecond
- TotalGlobalCountFailure
- LastRequestCountPerSecond
- LastTransactionDurationAverage
- LastVirtualUserCount
- LastRequestDurationAverage
- LastErrorCount