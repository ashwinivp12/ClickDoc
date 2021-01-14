let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
exports.config = {
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['show-fps-counter=true'],
            'args': ['disable-infobars'],
            'excludeSwitches': ['enable-automation'],
            'prefs': {
                'profile.default_content_setting_values.geolocation': 2,
                'credentials_enable_service': false,
                'profile': {
                    'password_manager_enabled': false
                }
            },
        },
    },
    framework: 'jasmine', //Type of Framework used 
    directConnect: true,
    specs: ['Test/signin.spec.ts','Test/physiciansearch.spec.ts'],
    SELENIUM_PROMISE_MANAGER: true,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000
    },

    onPrepare() {
        require("ts-node").register({
            project: require('path').join(__dirname, './tsconfig.json') // Relative path of tsconfig.json file 

        });

        jasmine.getEnv().addReporter(
            new SpecReporter({
                suite: {
                    displayNumber: true // display each suite number (hierarchical)
                },
                spec: {
                    displayPending: false, // display each pending spec
                    displayDuration: true // display each spec duration
                },
                summary: {
                    displaySuccesses: true, // display summary of all successes after execution
                    displayFailed: true, // display summary of all failures after execution
                    displayPending: true // display summary of all pending specs after execution
                }
            })
        );
        var AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter());
    }
}