// Playwright Configuration
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');
require('dotenv').config();

// ============================================================
// Framework Constants (Source of Truth)
// ============================================================
const TIMEOUTS = {
    NAVIGATION: 90000,
    ACTION: 30000,
    ELEMENT_WAIT: 15000,
    ASSERTION: 10000,
};


const RETRIES = {
    ACTION_MAX: 3,
    ACTION_DELAY: 1000,
};

const WAIT_STRATEGY = {
    DEFAULT: 'domcontentloaded',
};

/**
 * Playwright Configuration
 */
const config = defineConfig({
    testDir: './tests',

    // Use centralized constants
    timeout: TIMEOUTS.NAVIGATION,
    expect: {
        timeout: TIMEOUTS.ASSERTION,
    },

    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : (process.env.RETRIES ? parseInt(process.env.RETRIES) : 0),
    workers: process.env.CI ? 4 : (process.env.WORKERS ? (process.env.WORKERS.includes('%') ? process.env.WORKERS : parseInt(process.env.WORKERS)) : '50%'),

    reporter: [
        ['line'],
        ['allure-playwright', {
            detail: false, // This removes the internal technical sub-steps
            outputFolder: 'allure-results',
            suiteTitle: true,
        }],

    ],

    globalSetup: require.resolve('./global-setup.js'),
    globalTeardown: require.resolve('./global-teardown.js'),

    use: {
        baseURL: (require('./testData/url.json')[process.env.ENV || 'test'])?.URL,
        headless: process.env.HEADED === 'false' || !process.env.HEADED,
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },

    grep: process.env.GREP ? new RegExp(process.env.GREP) : undefined,

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome', // Use your system's official Chrome
            },
        },





        // {
        //     name: 'firefox',
        //     use: {
        //         ...devices['Desktop Firefox'],
        //         viewport: { width: 1920, height: 1080 },
        //     },
        // },
        // {
        //     name: 'webkit',
        //     use: {
        //         ...devices['Desktop Safari'],
        //         viewport: { width: 1920, height: 1080 },
        //     },
        // },
    ],
});

// Export both the config and the constants
module.exports = config;
module.exports.TIMEOUTS = TIMEOUTS;
module.exports.RETRIES = RETRIES;
module.exports.WAIT_STRATEGY = WAIT_STRATEGY;




