/**
 * Centralized Selectors Repository
 * All locators for the application are maintained in this single file.
 * Organized by page/feature area for easy maintenance.
 * 
 * For large projects, consider splitting into per-page selector files
 * (e.g., loginSelectors.js, dashboardSelectors.js) and importing them here.
 */

const locators = {

    // ========================
    // Home Page Selectors
    // ========================
    acceptCookieBtn: "//button[@id='onetrust-accept-btn-handler']",
    financialProfessionalRole: "//a//h3[contains(text(),'Financial Professional')]",
    institutionalInvestorRole: "//a//h3[contains(text(),'Institutional Investor')]",
    individualInvestorRole: "//a//h3[contains(text(),'Individual Investor')]",

    homePageImage: "(//frk-banner-homepage//div)[5]",
    investorMenu: "//app-megamenu//ul/li/button[text()=' Investments ']",
    feedBackButton: "//button//div[contains(text(),'Feedback')]",


    // ========================
    // Secure Area (Post-Login)
    // ========================
    objSecureAreaHeading: "//h2",
    objLogoutButton: "//a[@href='/logout']",
    objSecureAreaMessage: "#flash",

    // ========================
    // Navigation Selectors
    // ========================
    objNavLinks: "//ul/li/a",

    // ========================
    // Common Selectors
    // ========================
    objPageTitle: "//h1",
    objFooter: "//div[@id='page-footer']",

    // ========================
    // Dropdown Page Selectors
    // ========================
    objDropdown: "#dropdown",
    objDropdownOption1: "//option[@value='1']",
    objDropdownOption2: "//option[@value='2']",

    // ========================
    // Checkbox Page Selectors
    // ========================
    objCheckbox1: "//form[@id='checkboxes']/input[1]",
    objCheckbox2: "//form[@id='checkboxes']/input[2]",

    // ========================
    // File Upload Selectors
    // ========================
    objFileUploadInput: "#file-upload",
    objFileUploadSubmit: "#file-submit",
    objUploadedFileName: "#uploaded-files",

    // ========================
    // Hover Page Selectors
    // ========================
    objHoverFigure: ".figure",
    objHoverCaption: ".figcaption",

    // ========================
    // Drag and Drop Selectors
    // ========================
    objDragSource: "#column-a",
    objDropTarget: "#column-b",

    // ========================
    // Frames / iFrame Selectors
    // ========================
    objIframe: "#mce_0_ifr",
    objIframeBody: "#tinymce",

    // ========================
    // Alert / JS Prompts Selectors
    // ========================
    objJSAlertButton: "//button[text()='Click for JS Alert']",
    objJSConfirmButton: "//button[text()='Click for JS Confirm']",
    objJSPromptButton: "//button[text()='Click for JS Prompt']",
    objAlertResult: "#result",

    // ========================
    // Dynamic Content Selectors
    // ========================
    objDynamicContent: ".large-10",

    // ========================
    // Key Presses Selectors
    // ========================
    objKeyPressInput: "#target",
    objKeyPressResult: "#result",
};

module.exports = { locators };
