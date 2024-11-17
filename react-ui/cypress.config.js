const { defineConfig } = require('cypress');
const { configureVisualRegression } = require('cypress-visual-regression');
const { installPlugin } = require('@chromatic-com/cypress');

module.exports = defineConfig({
    projectId: "kkfn1n",
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite'
        },
        env: {
            visualRegressionType: 'regression' // pass 'base' when generating snapshots for the first time
        },
        screenshotsFolder: './cypress/snapshots/actual',
        setupNodeEvents(on) {
            configureVisualRegression(on);
        },
        supportFile: false
    },
    e2e: {
        baseUrl: 'https://survesy-sandbox-604-preview-145578957084.us-central1.run.app',
        setupNodeEvents(on, config) {
            installPlugin(on, config);
        },
        experimentalStudio: true,
        env: {
            testAccountUsername: "automate_test_user@survesy.com",
            testAccountPassword: `>.WX"rYCmy2KC#sR=zj#SrtETr}wZ5'DB?X+`
        }
    }
});
