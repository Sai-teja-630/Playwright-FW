const { WebActions } = require("../utils/WebActions");
const { ReportCheckPoint } = require("../utils/ReportCheckPoint");
const { DataManager } = require("../utils/DataManager");

/**
 * BasePage - Shared foundation for all Page Objects
 * Automatically instantiates common utilities like WebActions and Reporting.
 */
class BasePage {
    constructor(page) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.reportCheckpoint = new ReportCheckPoint(page);
        this.dataManager = new DataManager(page);
    }
}

module.exports = { BasePage };
