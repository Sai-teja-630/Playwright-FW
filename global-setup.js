/**
 * Global Setup - Runs once before all tests
 * Used for environment validation and pre-test configuration.
 */

const fs = require('fs');
const path = require('path');

async function globalSetup() {
    const env = process.env.ENV || 'test';
    const urlData = require('./testData/url.json');

    console.log("==========================================================================");
    console.log(`  PLAYWRIGHT TEST FRAMEWORK - GLOBAL SETUP`);
    console.log(`  Environment : ${env.toUpperCase()}`);
    console.log(`  Base URL    : ${urlData[env]?.URL || 'NOT SET'}`);
    console.log(`  Timestamp   : ${new Date().toISOString()}`);
    console.log("==========================================================================");

    // Validate that the environment URL exists
    if (!urlData[env] || !urlData[env].URL) {
        console.warn(`⚠️  WARNING: URL for environment "${env}" is empty or not configured in url.json`);
    }

    // Clean allure-results directory for fresh run
    const allureResultsDir = path.join(__dirname, 'allure-results');
    if (fs.existsSync(allureResultsDir)) {
        fs.rmSync(allureResultsDir, { recursive: true, force: true });
        console.log("  Cleaned allure-results directory for fresh run.");
    }

    console.log("  Global Setup completed successfully.");
    console.log("==========================================================================\n");
}

module.exports = globalSetup;
