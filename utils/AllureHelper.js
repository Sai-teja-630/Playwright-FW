const { 
    epic, feature, story, severity, tag, owner, 
    description, link, issue, tms, parameter,
    Severity 
} = require("allure-js-commons");

/**
 * AllureHelper - Centralized Allure annotation utility
 * Provides easy wrappers for test categorization and reporting metadata.
 * 
 * Usage in test files:
 *   const { AllureHelper } = require('../utils/AllureHelper');
 *   
 *   test('my test', async ({ page }) => {
 *       await AllureHelper.setTestMeta({
 *           epicName: 'Authentication',
 *           featureName: 'Login',
 *           storyName: 'Valid Login',
 *           severityLevel: 'critical',
 *           tags: ['smoke', 'login'],
 *           ownerName: 'QA Team',
 *           desc: 'Verify user can login with valid credentials'
 *       });
 *       // ... test steps
 *   });
 */
class AllureHelper {

    /**
     * Set all test metadata in one call
     * @param {Object} meta - metadata object
     * @param {string} [meta.epicName] - Epic name (e.g., 'Authentication', 'Dashboard')
     * @param {string} [meta.featureName] - Feature name (e.g., 'Login', 'Registration')
     * @param {string} [meta.storyName] - User story (e.g., 'Valid Login', 'Invalid Password')
     * @param {string} [meta.severityLevel] - Severity: 'blocker', 'critical', 'normal', 'minor', 'trivial'
     * @param {string[]} [meta.tags] - Tags for filtering (e.g., ['smoke', 'regression'])
     * @param {string} [meta.ownerName] - Test owner
     * @param {string} [meta.desc] - Test description
     * @param {string} [meta.issueId] - Issue tracker ID (e.g., 'JIRA-123')
     * @param {string} [meta.tmsId] - Test management system ID
     */
    static async setTestMeta(meta = {}) {
        if (meta.epicName) await epic(meta.epicName);
        if (meta.featureName) await feature(meta.featureName);
        if (meta.storyName) await story(meta.storyName);
        if (meta.ownerName) await owner(meta.ownerName);
        if (meta.desc) await description(meta.desc);
        if (meta.issueId) await issue(meta.issueId);
        if (meta.tmsId) await tms(meta.tmsId);

        if (meta.severityLevel) {
            const severityMap = {
                'blocker': Severity.BLOCKER,
                'critical': Severity.CRITICAL,
                'normal': Severity.NORMAL,
                'minor': Severity.MINOR,
                'trivial': Severity.TRIVIAL,
            };
            await severity(severityMap[meta.severityLevel] || Severity.NORMAL);
        }

        if (meta.tags && Array.isArray(meta.tags)) {
            for (const t of meta.tags) {
                await tag(t);
            }
        }
    }

    /**
     * Add a parameter to the test report
     * @param {string} name - Parameter name
     * @param {string} value - Parameter value
     */
    static async addParameter(name, value) {
        await parameter(name, value);
    }

    /**
     * Add a link to the test report
     * @param {string} url - Link URL
     * @param {string} name - Link display name
     * @param {string} [type] - Link type ('issue', 'tms', or custom)
     */
    static async addLink(url, name, type = '') {
        await link(url, name, type);
    }
}

module.exports = { AllureHelper };
