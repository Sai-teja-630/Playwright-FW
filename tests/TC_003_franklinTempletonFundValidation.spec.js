const { test } = require('../utils/fixtures');
const { AllureHelper } = require('../utils/AllureHelper');

const testCaseID = "TC_003";
const testCaseDesc = "Franklin Templeton - Mutual Fund Details Validation";

test.describe('Franklin Templeton Mutual Funds', () => {

    test.beforeAll(async () => {
        console.log(`\n=================================================`);
        console.log(`Test Suite: Franklin Templeton Mutual Funds`);
        console.log(`=================================================\n`);
    });

    test.afterAll(async () => {
        console.log(`\n=================================================`);
        console.log(`Test Suite Completed: Franklin Templeton Mutual Funds`);
        console.log(`=================================================\n`);
    });

    test(`${testCaseID} - ${testCaseDesc}`, async ({ homePage }) => {
        
        await homePage.LaunchApplication();

        await homePage.acceptCookie();
        await homePage.selectRole("Individual Investor");
        await homePage.verificationOfProductMF();
    });

});
