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
        baseUrl: 'http://localhost:3000/organizations',
        setupNodeEvents(on, config) {
            installPlugin(on, config);
        },
        experimentalStudio: true
    }
});
