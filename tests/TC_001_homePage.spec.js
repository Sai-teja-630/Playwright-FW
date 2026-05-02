const { test } = require('../utils/fixtures');
const { AllureHelper } = require('../utils/AllureHelper');

const testCaseID = "TC_001";
const testCaseDesc = "Homepage validation";

test.describe('Homepage validation', () => {

    test.beforeAll(async () => {
        console.log(`\n=================================================`);
        console.log(`TEST CASE STARTED: ${testCaseID}`);
        console.log(`=================================================\n`);
    });

    test.afterAll(async () => {
        console.log(`\n=================================================`);
        console.log(`TEST CASE FINISHED: ${testCaseID}`);
        console.log(`=================================================\n`);
    });



    test(`${testCaseID} - ${testCaseDesc}`, async ({ homePage }) => {
        // Step 1: Launch Application
        await homePage.LaunchApplication();

        await homePage.acceptCookie();
        await homePage.selectRole("Individual Investor");
        await homePage.homePageInvestmentMenu();

        // Call the new Validation Engine to see it in the report!
        const { locators } = require('../Selectors/selectors');
        await homePage.webActions.verifyElementText(
            locators.feedBackButton, 
            "Feedback", 
            "Verify Feedback Button Text"
        );
        await homePage.webActions.verifyElementVisible(
            locators.investorMenu,
            "Verify Investor Menu is Visible"
        );

        // Final Full Page Screenshot
        const finalSc = await homePage.webActions.page.screenshot({ fullPage: true });
        const { attachment } = require("allure-js-commons");
        await attachment("Final Full Page Completion", finalSc, "image/png");

    });


});

