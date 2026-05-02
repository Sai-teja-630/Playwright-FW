const base = require('@playwright/test');
const { WebActions } = require('./WebActions');
const { ReportCheckPoint } = require('./ReportCheckPoint');
const { DataManager } = require('./DataManager');
const { AppInHomePage } = require('../page/AppInHomePage');

/**
 * Custom Playwright Test Fixtures
 * Auto-provides utility objects to every test — no manual instantiation needed.
 * 
 * Usage in test files:
 *   const { test, expect } = require('../utils/fixtures');
 *   
 *   test('my test', async ({ webActions, homePage, dataManager }) => {
 *       await homePage.LaunchApplication();
 *       const data = dataManager.getTestData('TC_001');
 *       // ...
 *   });
 * 
 * To add more page objects, extend the fixtures below.
 */
const test = base.test.extend({

    /** WebActions instance — auto-created per test */
    webActions: async ({ page }, use) => {
        const wa = new WebActions(page);
        await use(wa);
    },

    /** ReportCheckPoint instance — auto-created per test */
    reportCheckpoint: async ({ page }, use) => {
        const rc = new ReportCheckPoint(page);
        await use(rc);
    },

    /** DataManager instance — auto-created per test */
    dataManager: async ({}, use) => {
        const dm = new DataManager();
        await use(dm);
    },

    /** AppInHomePage — auto-created per test */
    homePage: async ({ page }, use) => {
        const hp = new AppInHomePage(page);
        await use(hp);
    },

    // =========================================================
    // Add more page object fixtures below as your framework grows:
    // =========================================================
    // loginPage: async ({ page }, use) => {
    //     const lp = new LoginPage(page);
    //     await use(lp);
    // },
    // dashboardPage: async ({ page }, use) => {
    //     const dp = new DashboardPage(page);
    //     await use(dp);
    // },
});

const expect = base.expect;

module.exports = { test, expect };
