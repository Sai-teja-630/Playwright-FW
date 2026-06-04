const fs = require('fs');
const path = require('path');
const urlData = require('./testData/url.json');

async function globalSetup() {
    const env = process.env.ENV || 'test';
    const baseUrl = urlData[env]?.URL;
    const allureResultsDir = path.join(__dirname, 'allure-results');

    console.log('==========================================================================');
    console.log('  PLAYWRIGHT TEST FRAMEWORK - GLOBAL SETUP');
    console.log(`  Environment : ${env.toUpperCase()}`);
    console.log(`  Base URL    : ${baseUrl || 'NOT SET'}`);
    console.log(`  Timestamp   : ${new Date().toISOString()}`);
    console.log('==========================================================================');

    if (!baseUrl) {
        console.warn(`⚠️  URL for environment "${env}" is not configured in testData/url.json`);
    }

    if (fs.existsSync(allureResultsDir)) {
        fs.rmSync(allureResultsDir, { recursive: true, force: true });
        console.log('  Cleaned allure-results directory for fresh run.');
    }

    console.log('  Global Setup completed successfully.');
    console.log('==========================================================================\n');
}

module.exports = globalSetup;
