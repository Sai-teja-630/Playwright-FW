const { step, attachment } = require("allure-js-commons");
const { expect } = require('@playwright/test');
const { TIMEOUTS, WAIT_STRATEGY } = require("../playwright.config");

/**
 * WebActions - Traditional Driver Model
 * Every interaction is a clean one-liner using the 'act' engine.
 */
class WebActions {

    constructor(page) {
        this.page = page;
    }

    /**
     * Finds the key name of a locator from the selectors file
     */
    findLocatorName(locatorValue) {
        try {
            const { locators } = require("../Selectors/selectors");
            // Recursive search for the key that matches the value
            const findKey = (obj, value) => {
                for (const key in obj) {
                    if (obj[key] === value) return key;
                    if (typeof obj[key] === 'object') {
                        const found = findKey(obj[key], value);
                        if (found) return found;
                    }
                }
                return null;
            };
            return findKey(locators, locatorValue) || "Unknown Element";
        } catch (e) {
            return "Element";
        }
    }

    /**
     * The Engine: Handles high-level reporting and execution.
     */
    async act(description, locator, action, ...args) {
        const self = this;
        const locatorName = locator ? self.findLocatorName(locator) : null;
        const stepName = locatorName ? `${description} [${locatorName}]` : description;

        return await step(stepName, async function () {
            try {
                if (locator) {
                    const element = self.page.locator(locator);
                    await element.waitFor({ state: 'attached', timeout: TIMEOUTS.ELEMENT_WAIT });
                    
                    // Highlight BEFORE the screenshot
                    await self.highlightElement(locator);
                    const sc = await self.page.screenshot();
                    await attachment("Step Screenshot", sc, "image/png");

                    const result = await element[action](...args);
                    return result;
                } else {
                    const result = await self.page[action](...args);
                    const sc = await self.page.screenshot();
                    await attachment("Step Screenshot", sc, "image/png");
                    return result;
                }
            } catch (error) {
                await self.handleFailure(stepName, locator, error);
            }
        });
    }

    async highlightElement(locator) {
        try {
            await this.page.locator(locator).evaluate((node) => {
                node.style.outline = '5px solid red';
                node.style.outlineOffset = '-5px';
            });
            await this.page.waitForTimeout(100); // Small buffer for visual sync
        } catch (e) { }
    }


    async highlightElement(locator) {
        const self = this;
        try {
            const element = self.page.locator(locator);
            await element.evaluate(function (node) {
                node.style.border = '3px solid red';
                node.style.backgroundColor = 'yellow';
            });
            await self.page.waitForTimeout(200);
            setTimeout(function () {
                element.evaluate(function (node) {
                    node.style.border = '';
                    node.style.backgroundColor = '';
                }).catch(function () { });
            }, 1000);
        } catch (e) { }
    }

    // ========================
    // Navigation
    // ========================

    async navigateToURL(url, description = "Navigate to URL") {
        await this.act(description, null, 'goto', url, { waitUntil: WAIT_STRATEGY.DEFAULT });
    }

    async switchToNewTabAndDo(locatorToClick, description = "Click and switch to new tab") {
        const self = this;
        let newPage;
        await step(description, async () => {
            const [page] = await Promise.all([
                self.page.context().waitForEvent('page'),
                self.clickElement(locatorToClick, "Click to open new tab")
            ]);
            await page.waitForLoadState(WAIT_STRATEGY.DEFAULT);
            newPage = page;
        });
        return new WebActions(newPage); // Returns a new WebActions object bound to the new tab!
    }

    // ========================
    // Clicks
    // ========================

    async clickElement(locator, description = "Clicking") {
        await this.act(description, locator, 'click', { timeout: TIMEOUTS.ACTION });
    }

    async dblClickElement(locator, description = "Double clicking") {
        await this.act(description, locator, 'dblclick');
    }

    async rightClickElement(locator, description = "Right clicking") {
        await this.act(description, locator, 'click', { button: 'right' });
    }

    async forceClickElement(locator, description = "Force clicking") {
        await this.act(description, locator, 'click', { force: true });
    }

    // ========================
    // Input
    // ========================

    async typeText(locator, text, description = "Typing into") {
        await this.act(description, locator, 'fill', text);
    }

    async clearAndType(locator, text, description = "Clearing and typing into") {
        const self = this;
        await step(description, async function () {
            await self.act("Clear", locator, 'fill', '');
            await self.act("Type", locator, 'fill', text);
        });
    }

    async pressKey(locator, key, description = "Pressing Key") {
        await this.act(`${description} [${key}]`, locator, 'press', key);
    }

    async uploadFile(locator, filePath, description = "Uploading File") {
        await this.act(description, locator, 'setInputFiles', filePath);
    }

    // ========================
    // Selects
    // ========================

    async selectOptionByText(locator, text, description = "Selecting from") {
        await this.act(description, locator, 'selectOption', { label: text });
    }

    async selectOptionByValue(locator, value, description = "Selecting value from") {
        await this.act(description, locator, 'selectOption', { value: value });
    }

    // ========================
    // State & Interaction
    // ========================

    async handleNextAlert(action = 'accept', promptText = null, description = "Handle Native Alert") {
        await step(`✅ ${description}: ${action}`, async () => {
            this.page.once('dialog', async dialog => {
                if (action === 'accept') {
                    if (promptText) {
                        await dialog.accept(promptText);
                    } else {
                        await dialog.accept();
                    }
                } else {
                    await dialog.dismiss();
                }
            });
        });
    }

    async dragAndDrop(sourceLocator, targetLocator, description = "Drag and drop") {
        await this.act(description, sourceLocator, 'dragTo', this.page.locator(targetLocator));
    }

    async clickInIframe(iframeLocator, elementLocator, description = "Click element in iframe") {
        const self = this;
        await step(`✅ ${description}`, async () => {
            try {
                const frame = self.page.frameLocator(iframeLocator);
                const element = frame.locator(elementLocator);
                await element.waitFor({ state: 'attached', timeout: TIMEOUTS.ELEMENT_WAIT });
                await element.click();
                const sc = await self.page.screenshot();
                await attachment("Step Screenshot", sc, "image/png");
            } catch (error) {
                await self.handleFailure(description, elementLocator, error);
            }
        });
    }

    async typeInIframe(iframeLocator, elementLocator, text, description = "Type in iframe") {
        const self = this;
        await step(`✅ ${description}`, async () => {
            try {
                const frame = self.page.frameLocator(iframeLocator);
                const element = frame.locator(elementLocator);
                await element.waitFor({ state: 'attached', timeout: TIMEOUTS.ELEMENT_WAIT });
                await element.fill(text);
                const sc = await self.page.screenshot();
                await attachment("Step Screenshot", sc, "image/png");
            } catch (error) {
                await self.handleFailure(description, elementLocator, error);
            }
        });
    }

    async checkCheckbox(locator, description = "Checking") {
        await this.act(description, locator, 'check');
    }

    async uncheckCheckbox(locator, description = "Unchecking") {
        await this.act(description, locator, 'uncheck');
    }

    async hoverOnElement(locator, description = "Hovering on") {
        await this.act(description, locator, 'hover');
    }

    async scrollToElement(locator, description = "Scrolling to") {
        await this.act(description, locator, 'scrollIntoViewIfNeeded');
    }



    // ========================
    // Getters
    // ========================

    async getElementText(locator, description = "Get text") {
        return await this.act(description, locator, 'textContent');
    }

    async getElementValue(locator, description = "Get value") {
        return await this.act(description, locator, 'inputValue');
    }

    async isElementVisible(locator, description = "Check visibility") {
        return await this.act(description, locator, 'isVisible');
    }

    async getElementAttribute(locator, attributeName, description = "Get attribute") {
        return await this.act(description, locator, 'getAttribute', attributeName);
    }

    async getElementsCount(locator, description = "Get elements count") {
        return await this.act(description, locator, 'count');
    }

    // ========================
    // Validations
    // ========================

    /**
     * The Assertion Engine: Traditional wrapper for validation and reporting
     */
    async assert(actual, expected, description, type = "equals") {
        // This formats the Allure step to read exactly like a readable sentence!
        const stepName = `✅ ${description} - actual is "${actual}" and expected is "${expected}"`;
        
        await step(stepName, async () => {
            try {
                if (type === "equals") {
                    expect(String(actual).trim()).toEqual(String(expected).trim());
                } else if (type === "contains") {
                    expect(String(actual)).toContain(String(expected));
                } else if (type === "truthy") {
                    expect(actual).toBeTruthy();
                }

                const screenshot = await this.page.screenshot().catch(() => null);
                if (screenshot) {
                    await attachment("Validation Screenshot", screenshot, "image/png");
                }

            } catch (error) {
                await attachment("Error Details", error.message, "text/plain");
                await this.handleFailure(`Validation Failed: ${description}`, null, error);
            }
        });
    }

    async verifyElementText(locator, expectedText, description = "Verify element text") {
        const actualText = await this.getElementText(locator, description);
        await this.assert(actualText, expectedText, description, "equals");
    }

    async verifyElementContainsText(locator, expectedText, description = "Verify element contains text") {
        const actualText = await this.getElementText(locator, description);
        await this.assert(actualText, expectedText, description, "contains");
    }

    async verifyElementVisible(locator, description = "Verify element is visible") {
        const isVisible = await this.isElementVisible(locator, description);
        await this.assert(isVisible, true, description, "truthy");
    }

    async verifyElementValue(locator, expectedValue, description = "Verify element value") {
        const actualValue = await this.getElementValue(locator, description);
        await this.assert(actualValue, expectedValue, description, "equals");
    }

    async verifyElementAttribute(locator, attributeName, expectedValue, description = "Verify attribute") {
        const actualValue = await this.getElementAttribute(locator, attributeName, description);
        await this.assert(actualValue, expectedValue, description, "equals");
    }

    async softAssert(actual, expected, description, type = "equals") {
        const stepName = `✅ Soft Validate: ${description} - actual is "${actual}" and expected is "${expected}"`;
        await step(stepName, async () => {
            try {
                if (type === "equals") {
                    expect.soft(String(actual).trim()).toEqual(String(expected).trim());
                } else if (type === "contains") {
                    expect.soft(String(actual)).toContain(String(expected));
                } else if (type === "truthy") {
                    expect.soft(actual).toBeTruthy();
                }
                
                const screenshot = await this.page.screenshot().catch(() => null);
                if (screenshot) {
                    await attachment("Validation Screenshot", screenshot, "image/png");
                }
            } catch (error) {
                await attachment("Error Details", error.message, "text/plain");
                
                const screenshot = await this.page.screenshot().catch(() => null);
                if (screenshot) {
                    await attachment("FAILURE SCREENSHOT", screenshot, "image/png");
                }
                // Do NOT call handleFailure because this is a soft assert; the test should continue!
            }
        });
    }

    async takeScreenshot(name = "screenshot") {
        const screenshot = await this.page.screenshot();
        await attachment(name, screenshot, "image/png");
    }
    async handleFailure(description, locator, error) {
        const screenshot = await this.page.screenshot().catch(function () { return null; });
        if (screenshot) {
            await attachment("FAILURE SCREENSHOT", screenshot, "image/png");
        }
        throw new Error(`[FAILED] ${description}. Error: ${error.message}`);
    }

    async waitForElementVisible(locator, description = "Waiting for") {
        const self = this;
        const locatorName = self.findLocatorName(locator);
        const stepName = `${description} [${locatorName}]`;

        await step(stepName, async function () {
            try {
                const element = self.page.locator(locator);
                await element.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
                
                // Highlight for visual confirmation in screenshot
                await self.highlightElement(locator);
                const sc = await self.page.screenshot();
                await attachment("Step Screenshot", sc, "image/png");
            } catch (error) {
                await self.handleFailure(stepName, locator, error);
            }
        });
    }

    async waitForElementHidden(locator, description = "Waiting for element to hide") {
        const self = this;
        const locatorName = self.findLocatorName(locator);
        const stepName = `${description} [${locatorName}]`;

        await step(stepName, async function () {
            try {
                const element = self.page.locator(locator);
                await element.waitFor({ state: 'hidden', timeout: TIMEOUTS.ELEMENT_WAIT });
            } catch (error) {
                await self.handleFailure(stepName, locator, error);
            }
        });
    }

}

module.exports = { WebActions };
