/**
 * Global Teardown - Runs once after all tests
 * Used for cleanup and post-test operations.
 */

async function globalTeardown() {
    console.log("\n==========================================================================");
    console.log("  PLAYWRIGHT TEST FRAMEWORK - GLOBAL TEARDOWN");
    console.log(`  Timestamp   : ${new Date().toISOString()}`);
    console.log("  All tests completed.");
    console.log("  Run 'npm run allure:report' to generate and view Allure report.");
    console.log("==========================================================================\n");
}

module.exports = globalTeardown;
