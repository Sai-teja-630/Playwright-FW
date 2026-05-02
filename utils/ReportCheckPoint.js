const { expect } = require("@playwright/test");
const { step, attachment } = require("allure-js-commons");

/**
 * ReportCheckPoint - Assertion wrapper with Allure reporting
 * Every assertion logs pass/fail as Allure steps with descriptions.
 */
class ReportCheckPoint {

    constructor(page) {
        this.page = page;
    }

    async expectWithReportingToEqual(stepName, actual, expected, passMsg, failMsg) {
        await step(stepName, async () => {
            try {
                expect(actual).toEqual(expected);
                await step(`✅ PASS: ${passMsg}`, async () => {
                    await attachment("Actual", String(actual), "text/plain");
                    await attachment("Expected", String(expected), "text/plain");
                });
            } catch (error) {
                await step(`❌ FAIL: ${failMsg}`, async () => {
                    await attachment("Actual", String(actual), "text/plain");
                    await attachment("Expected", String(expected), "text/plain");
                    await attachment("Error", error.message, "text/plain");
                });
                const screenshot = await this.page.screenshot();
                await attachment("Failure Screenshot", screenshot, "image/png");
                throw error;
            }
        });
    }

    async expectWithReportingToContain(stepName, actual, expected, passMsg, failMsg) {
        await step(stepName, async () => {
            try {
                expect(actual).toContain(expected);
                await step(`✅ PASS: ${passMsg}`, async () => {
                    await attachment("Actual", String(actual), "text/plain");
                    await attachment("Expected to contain", String(expected), "text/plain");
                });
            } catch (error) {
                await step(`❌ FAIL: ${failMsg}`, async () => {
                    await attachment("Actual", String(actual), "text/plain");
                    await attachment("Expected to contain", String(expected), "text/plain");
                    await attachment("Error", error.message, "text/plain");
                });
                const screenshot = await this.page.screenshot();
                await attachment("Failure Screenshot", screenshot, "image/png");
                throw error;
            }
        });
    }

    async expectWithReportingToBeTruthy(stepName, actual, passMsg, failMsg) {
        await step(stepName, async () => {
            try {
                expect(actual).toBeTruthy();
                await step(`✅ PASS: ${passMsg}`, async () => {
                    await attachment("Actual", String(actual), "text/plain");
                });
            } catch (error) {
                await step(`❌ FAIL: ${failMsg}`, async () => {
                    await attachment("Actual", String(actual), "text/plain");
                    await attachment("Error", error.message, "text/plain");
                });
                const screenshot = await this.page.screenshot();
                await attachment("Failure Screenshot", screenshot, "image/png");
                throw error;
            }
        });
    }

    async expectWithReportingToBeFalsy(stepName, actual, passMsg, failMsg) {
        await step(stepName, async () => {
            try {
                expect(actual).toBeFalsy();
                await step(`✅ PASS: ${passMsg}`, async () => {
                    await attachment("Actual", String(actual), "text/plain");
                });
            } catch (error) {
                await step(`❌ FAIL: ${failMsg}`, async () => {
                    await attachment("Actual", String(actual), "text/plain");
                    await attachment("Error", error.message, "text/plain");
                });
                const screenshot = await this.page.screenshot();
                await attachment("Failure Screenshot", screenshot, "image/png");
                throw error;
            }
        });
    }

    async expectWithReportingToBeGreaterThan(stepName, actual, expected, passMsg, failMsg) {
        await step(stepName, async () => {
            try {
                expect(actual).toBeGreaterThan(expected);
                await step(`✅ PASS: ${passMsg}`, async () => {
                    await attachment("Actual", String(actual), "text/plain");
                    await attachment("Expected >", String(expected), "text/plain");
                });
            } catch (error) {
                await step(`❌ FAIL: ${failMsg}`, async () => {
                    await attachment("Actual", String(actual), "text/plain");
                    await attachment("Expected >", String(expected), "text/plain");
                    await attachment("Error", error.message, "text/plain");
                });
                const screenshot = await this.page.screenshot();
                await attachment("Failure Screenshot", screenshot, "image/png");
                throw error;
            }
        });
    }

    async expectWithReportingURLToContain(stepName, expected, passMsg, failMsg) {
        await step(stepName, async () => {
            try {
                const currentURL = this.page.url();
                expect(currentURL).toContain(expected);
                await step(`✅ PASS: ${passMsg}`, async () => {
                    await attachment("Current URL", currentURL, "text/plain");
                    await attachment("Expected URL to contain", expected, "text/plain");
                });
            } catch (error) {
                await step(`❌ FAIL: ${failMsg}`, async () => {
                    await attachment("Current URL", this.page.url(), "text/plain");
                    await attachment("Expected URL to contain", expected, "text/plain");
                    await attachment("Error", error.message, "text/plain");
                });
                const screenshot = await this.page.screenshot();
                await attachment("Failure Screenshot", screenshot, "image/png");
                throw error;
            }
        });
    }

    async expectWithReportingTitleToEqual(stepName, expected, passMsg, failMsg) {
        await step(stepName, async () => {
            try {
                const title = await this.page.title();
                expect(title).toEqual(expected);
                await step(`✅ PASS: ${passMsg}`, async () => {
                    await attachment("Actual Title", title, "text/plain");
                    await attachment("Expected Title", expected, "text/plain");
                });
            } catch (error) {
                await step(`❌ FAIL: ${failMsg}`, async () => {
                    await attachment("Actual Title", await this.page.title(), "text/plain");
                    await attachment("Expected Title", expected, "text/plain");
                    await attachment("Error", error.message, "text/plain");
                });
                const screenshot = await this.page.screenshot();
                await attachment("Failure Screenshot", screenshot, "image/png");
                throw error;
            }
        });
    }

    async expectElementToBeVisible(stepName, locator, passMsg, failMsg) {
        await step(stepName, async () => {
            try {
                await expect(this.page.locator(locator)).toBeVisible({ timeout: 30000 });
                await step(`✅ PASS: ${passMsg}`, async () => {
                    await attachment("Locator", locator, "text/plain");
                });
            } catch (error) {
                await step(`❌ FAIL: ${failMsg}`, async () => {
                    await attachment("Locator", locator, "text/plain");
                    await attachment("Error", error.message, "text/plain");
                });
                const screenshot = await this.page.screenshot();
                await attachment("Failure Screenshot", screenshot, "image/png");
                throw error;
            }
        });
    }

    async expectElementToHaveText(stepName, locator, expected, passMsg, failMsg) {
        await step(stepName, async () => {
            try {
                await expect(this.page.locator(locator)).toHaveText(expected, { timeout: 30000 });
                await step(`✅ PASS: ${passMsg}`, async () => {
                    await attachment("Locator", locator, "text/plain");
                    await attachment("Expected Text", expected, "text/plain");
                });
            } catch (error) {
                await step(`❌ FAIL: ${failMsg}`, async () => {
                    await attachment("Locator", locator, "text/plain");
                    await attachment("Expected Text", expected, "text/plain");
                    await attachment("Error", error.message, "text/plain");
                });
                const screenshot = await this.page.screenshot();
                await attachment("Failure Screenshot", screenshot, "image/png");
                throw error;
            }
        });
    }
}

module.exports = { ReportCheckPoint };
