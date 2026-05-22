const { locators } = require("../Selectors/selectors");
const { BasePage } = require("./BasePage");
const { step } = require("allure-js-commons");
const { WAIT_STRATEGY } = require("../playwright.config");

const urlData = require("../testData/url.json");

/**
 * AppInHomePage - Page Object for the Application Home Page
 * Extends BasePage to inherit WebActions and ReportCheckPoint.
 */
class AppInHomePage extends BasePage {

    constructor(page) {
        super(page);
    }

    /**
     * Launch the application based on environment (from url.json)
     */
    async LaunchApplication() {
        const env = process.env.ENV || 'test';
        const url = urlData[env].URL;

        const self = this;
        await step(`Launching application in [${env.toUpperCase()}] environment`, async function () {
            await self.webActions.navigateToURL(url, `Navigating to URL: ${url}`);
        });
    }


    /**
     * Login to the application
     */
    async login(testData) {
        await step("Login to Application", async () => {
            const currentUrl = this.page.url();
            await this.webActions.navigateToURL(
                currentUrl.endsWith('/') ? currentUrl + 'login' : currentUrl + '/login',
                "Navigating to Login page"
            );
            await this.webActions.typeText(
                locators.objLIuserName,
                testData.loginCredentials.username,
                "Typing into"
            );
            await this.webActions.typeText(
                locators.objLIpassword,
                testData.loginCredentials.password,
                "Typing into"
            );
            await this.webActions.clickElement(
                locators.onJLISubmit,
                "Clicking"
            );
        });
    }



    /**
     * Validate successful login
     */
    async validateLoginSuccess() {
        const commonData = this.dataManager.getCommonData('validationMessages');
        await step("Validate Login Success", async () => {
            const flashMessage = await this.webActions.getElementText(
                locators.objFlashMessage,
                "Getting flash message after login"
            );
            await this.reportCheckpoint.expectWithReportingToContain(
                "Validating Login Success Message",
                flashMessage,
                commonData.loginSuccess,
                "Login success message is displayed correctly",
                "Login success message is NOT displayed correctly"
            );
        });
    }

    /**
     * Logout from the application
     */
    async logout() {
        const commonData = this.dataManager.getCommonData('validationMessages');
        await step("Logout from Application", async () => {
            await this.webActions.clickElement(
                locators.objLogoutButton,
                "Clicking Logout button"
            );
            const flashMessage = await this.webActions.getElementText(
                locators.objFlashMessage,
                "Getting flash message after logout"
            );
            await this.reportCheckpoint.expectWithReportingToContain(
                "Validating Logout Success Message",
                flashMessage,
                commonData.logoutSuccess,
                "Logout success message is displayed correctly",
                "Logout success message is NOT displayed correctly"
            );
        });
    }

    /**
     * Validate page title
     */
    async validatePageTitle(expectedTitle) {
        await this.reportCheckpoint.expectWithReportingTitleToEqual(
            "Validating Page Title",
            expectedTitle,
            `Page title matches: ${expectedTitle}`,
            `Page title does NOT match: ${expectedTitle}`
        );
    }

    async acceptCookie() {
        await this.webActions.clickElement(locators.acceptCookieBtn, "Clicking");
        // Wait for the overlay to disappear
        await this.page.locator(locators.acceptCookieBtn).waitFor({ state: 'hidden', timeout: 5000 }).catch(function () { });
    }

    async selectRole(role) {
        const roleLower = role.toLowerCase();

        if (roleLower.includes("individual")) {
            await this.webActions.clickElement(locators.individualInvestorRole, "Selecting");
        }
        else if (roleLower.includes("financial")) {
            await this.webActions.clickElement(locators.financialProfessionalRole, "Selecting");
        }
        else if (roleLower.includes("institutional")) {
            await this.webActions.clickElement(locators.institutionalInvestorRole, "Selecting");
        }
        else {
            throw new Error(`Invalid role provided: "${role}". Use 'Individual', 'Financial', or 'Institutional'.`);
        }
    }

    async homePageInvestmentMenu() {
        await this.webActions.waitForElementVisible(locators.homePageImage, "Waiting for");
        await this.webActions.waitForElementVisible(locators.investorMenu, "Waiting for");
        await this.webActions.waitForElementVisible(locators.feedBackButton, "Waiting for");
    }

    /**
     * Complete Browse Literature workflow
     * Navigates to Browse Literature page and filters by document types
     * @param {Array<string>} documentTypes - Array of document types to filter (e.g., ['Annual Report', 'Attribution'])
     */
    async browseLiteratureFlow(documentTypes = []) {
        // Step 1: Click on Financial Professional role
        await this.webActions.clickElement(
            locators.ftFinancialProfessionalBtn,
            "Clicking Financial Professional button"
        );

        // Step 2: Click on Tools & Resources menu
        await this.webActions.clickElement(
            locators.ftToolsResourcesMenu,
            "Clicking Tools & Resources menu button"
        );

        // Step 3: Click on Browse Literature link
        await this.webActions.clickElement(
            locators.ftBrowseLiteratureLink,
            "Clicking Browse Literature link"
        );

        // Step 4: Validate Browse Literature page heading
        await this.webActions.verifyElementVisible(
            locators.ftBrowseLiteratureHeading,
            "Verify Browse Literature heading is visible"
        );

        // Step 5: Click on Document Type dropdown (if document types are provided)
        if (documentTypes && documentTypes.length > 0) {
            await this.webActions.clickElement(
                locators.ftDocumentTypeDropdown,
                "Clicking Document Type dropdown button"
            );

            // Step 6: Select each document type from the filter
            for (let i = 0; i < documentTypes.length; i++) {
                const docType = documentTypes[i];
                let optionLocator;
                
                if (docType.toLowerCase().includes('annual')) {
                    optionLocator = locators.ftAnnualReportOption;
                } else if (docType.toLowerCase().includes('attribution')) {
                    optionLocator = locators.ftAttributionOption;
                } else {
                    throw new Error(`Unknown document type: ${docType}`);
                }
                
                await this.webActions.clickElement(
                    optionLocator,
                    `Selecting ${docType} from Document Type dropdown`
                );
            }
        }
    }




}

module.exports = { AppInHomePage };
