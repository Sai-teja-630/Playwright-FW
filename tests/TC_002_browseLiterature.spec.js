const { test } = require('../utils/fixtures');
const { AllureHelper } = require('../utils/AllureHelper');

const testCaseID = "TC_002";
const testCaseDesc = "Browse Literature filter by document type";

test.describe('Franklin Templeton - Browse Literature', () => {

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
        
        // Launch the application
        await homePage.LaunchApplication();
        
        // Execute complete Browse Literature workflow
        // Navigate to Browse Literature page and filter by Annual Report and Attribution document types
        const documentTypesToFilter = ['Annual Report', 'Attribution'];
        await homePage.browseLiteratureFlow(documentTypesToFilter);

    });

});

