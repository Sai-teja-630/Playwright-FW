const fs = require('fs');
const path = require('path');

/**
 * DataManager - Centralized test data management
 * Supports JSON file-based and Excel-based data-driven testing.
 * 
 * Usage:
 *   const { DataManager } = require('../utils/DataManager');
 *   const dm = new DataManager();
 * 
 *   // Load from main testData.json
 *   const loginData = dm.getTestData('TC_001');
 * 
 *   // Load from a feature-specific JSON
 *   const data = dm.loadJSON('login/loginData.json');
 * 
 *   // Load from Excel
 *   const rows = await dm.loadExcel('testData.xlsx', 'LoginTests');
 */
class DataManager {

    constructor() {
        this.testDataDir = path.join(__dirname, '..', 'testData');
        this._cache = new Map();
    }

    /**
     * Get test data for a specific test case from testData.json
     * @param {string} testCaseId - Test case ID (e.g., 'TC_001')
     * @returns {Object} Test data object for the given test case
     */
    getTestData(testCaseId) {
        const mainData = this._loadAndCache('testData.json');
        if (!mainData[testCaseId]) {
            throw new Error(`Test data not found for test case: "${testCaseId}" in testData.json`);
        }
        return mainData[testCaseId];
    }

    /**
     * Get common/shared test data (e.g., loginCredentials, validationMessages)
     * @param {string} key - Top-level key in testData.json
     * @returns {*} The value for the given key
     */
    getCommonData(key) {
        const mainData = this._loadAndCache('testData.json');
        if (!mainData[key]) {
            throw new Error(`Common data key not found: "${key}" in testData.json`);
        }
        return mainData[key];
    }

    /**
     * Load a JSON file relative to the testData directory
     * @param {string} relativePath - Path relative to testData/ (e.g., 'login/TC_001.json')
     * @returns {Object} Parsed JSON object
     */
    loadJSON(relativePath) {
        return this._loadAndCache(relativePath);
    }

    /**
     * Load data from an Excel file using exceljs
     * @param {string} fileName - Excel file name relative to testData/
     * @param {string} sheetName - Sheet name to read
     * @param {Object} [options] - Options
     * @param {boolean} [options.headerRow=true] - Whether first row contains headers
     * @returns {Promise<Object[]>} Array of row objects (keyed by header names)
     */
    async loadExcel(fileName, sheetName, options = { headerRow: true }) {
        try {
            const ExcelJS = require('exceljs');
            const workbook = new ExcelJS.Workbook();
            const filePath = path.join(this.testDataDir, fileName);

            if (!fs.existsSync(filePath)) {
                throw new Error(`Excel file not found: ${filePath}`);
            }

            await workbook.xlsx.readFile(filePath);
            const worksheet = workbook.getWorksheet(sheetName);

            if (!worksheet) {
                throw new Error(`Sheet "${sheetName}" not found in ${fileName}`);
            }

            const rows = [];
            let headers = [];

            worksheet.eachRow((row, rowNumber) => {
                if (options.headerRow && rowNumber === 1) {
                    headers = row.values.slice(1); // exceljs row.values is 1-indexed
                    return;
                }

                if (options.headerRow) {
                    const rowData = {};
                    row.values.slice(1).forEach((val, idx) => {
                        rowData[headers[idx]] = val;
                    });
                    rows.push(rowData);
                } else {
                    rows.push(row.values.slice(1));
                }
            });

            return rows;
        } catch (error) {
            if (error.code === 'MODULE_NOT_FOUND') {
                throw new Error('exceljs is required for Excel support. Run: npm install exceljs');
            }
            throw error;
        }
    }

    /**
     * Get environment-specific data
     * @param {string} [env] - Environment name (defaults to process.env.ENV or 'test')
     * @returns {Object} Environment configuration
     */
    getEnvironmentData(env) {
        const envName = env || process.env.ENV || 'test';
        const urlData = this._loadAndCache('url.json');
        if (!urlData[envName]) {
            throw new Error(`Environment "${envName}" not found in url.json`);
        }
        return urlData[envName];
    }

    /**
     * Internal: Load and cache a JSON file
     * @private
     */
    _loadAndCache(relativePath) {
        if (this._cache.has(relativePath)) {
            return this._cache.get(relativePath);
        }

        const fullPath = path.join(this.testDataDir, relativePath);
        if (!fs.existsSync(fullPath)) {
            throw new Error(`Test data file not found: ${fullPath}`);
        }

        const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        this._cache.set(relativePath, data);
        return data;
    }

    /**
     * Clear the cache (useful between test runs if data changes)
     */
    clearCache() {
        this._cache.clear();
    }
}

module.exports = { DataManager };
