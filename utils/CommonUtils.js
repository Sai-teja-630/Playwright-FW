const fs = require('fs');
const path = require('path');

/**
 * CommonUtils - Shared helper/utility functions
 */
class CommonUtils {

    /**
     * Generate a random string of given length
     */
    static generateRandomString(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Generate a random number between min and max
     */
    static generateRandomNumber(min = 1, max = 1000) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Get current date in specified format
     */
    static getCurrentDate(format = 'YYYY-MM-DD') {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }

    /**
     * Get future date by adding days
     */
    static getFutureDate(daysToAdd, format = 'YYYY-MM-DD') {
        const now = new Date();
        now.setDate(now.getDate() + daysToAdd);
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return format.replace('YYYY', year).replace('MM', month).replace('DD', day);
    }

    /**
     * Read JSON file and return parsed object
     */
    static readJSONFile(filePath) {
        const absolutePath = path.resolve(filePath);
        const data = fs.readFileSync(absolutePath, 'utf-8');
        return JSON.parse(data);
    }

    /**
     * Write data to a JSON file
     */
    static writeJSONFile(filePath, data) {
        const absolutePath = path.resolve(filePath);
        fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
    }

    /**
     * Check if a file exists
     */
    static fileExists(filePath) {
        return fs.existsSync(path.resolve(filePath));
    }

    /**
     * Create directory if it does not exist
     */
    static createDirectory(dirPath) {
        const absolutePath = path.resolve(dirPath);
        if (!fs.existsSync(absolutePath)) {
            fs.mkdirSync(absolutePath, { recursive: true });
        }
    }

    /**
     * Get environment URL from url.json based on ENV variable
     */
    static getEnvironmentURL() {
        const env = process.env.ENV || 'test';
        const urlData = CommonUtils.readJSONFile(path.join(__dirname, '..', 'testData', 'url.json'));
        if (urlData[env] && urlData[env].URL) {
            return urlData[env].URL;
        }
        throw new Error(`Environment "${env}" not found or URL is empty in url.json`);
    }

    /**
     * Sleep for specified milliseconds
     */
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Generate a unique timestamp-based ID
     */
    static generateUniqueId() {
        return `${Date.now()}_${CommonUtils.generateRandomNumber(1000, 9999)}`;
    }
}

module.exports = { CommonUtils };
