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

    // ========================
    // Franklin Templeton - Home Page Selectors
    // ========================
    ftFinancialProfessionalBtn: "//h3[contains(text(),'Financial Professional')]/../..",
    ftToolsResourcesMenu: "//button[contains(text(),'Tools & Resources')]",
    ftBrowseLiteratureLink: "//nav[@aria-label='Mega Menu']//a[contains(text(),'Browse Literature')]",

    // ========================
    // Franklin Templeton - Browse Literature Page Selectors
    // ========================
    ftBrowseLiteratureHeading: "//h1[contains(text(),'Browse Literature')]",
    ftDocumentTypeDropdown: "//*[contains(text(), 'Document Type')]/../..//button",
    ftAnnualReportOption: "//li[@role='option'][@data-item-value='Annual Report']",
    ftAttributionOption: "//li[@role='option'][@data-item-value='Attribution']",

       acceptAllButton: "button:has-text('Accept All')",
    individualInvestorOption: "link:has-text('Individual Investor')",
    
    // ========================
    // Main Navigation
    // ========================
    investmentsButton: "button:has-text('Investments')",
    managersButton: "button:has-text('Managers')",
    insightsButton: "button:has-text('Insights')",
    
    // ========================
    // Investments Menu
    // ========================
    mutualFundsLink: "a:has-text('Mutual Funds')",
    exchangeTradedFundsLink: "a:has-text('Exchange Traded Funds')",
    
    // ========================
    // Mutual Funds Page
    // ========================
    mutualFundsHeading: "h1:has-text('Mutual Funds')",
    fundsListContainer: "div[role='region']",
    firstFundCard: "article:first-child",
    
    // ========================
    // Fund Details Page - BCAAX
    // ========================
    fundTickerBCAA: "generic:has-text('BCAAX')",
    fundNameHeading: "h1:has-text('BCAAX')",
    
    // ========================
    // Fund Tabs
    // ========================
    overviewTab: "a:has-text('Overview')",
    performanceTab: "a:has-text('Performance')",
    portfolioTab: "a:has-text('Portfolio')",
    distributionsTab: "a:has-text('Distributions & Tax')",
    pricingTab: "a:has-text('Pricing')",
    documentsTab: "a:has-text('Documents')",
    
    // ========================
    // Overview Section Headings
    // ========================
    overviewHeading: "h2:has-text('Overview')",
    fundFactsHeading: "h3:has-text('Fund Facts')",
    benchmarkLabel: "generic:has-text('Benchmark')",
    additionalBenchmarkLabel: "generic:has-text('Additional Benchmark')",
    fundInceptionDateLabel: "generic:has-text('Fund Inception Date')",
    averageAnnualReturnsHeading: "h3:has-text('Average Annual Total Returns')",
    salesChargesHeading: "h3:has-text('Sales Charges, Expenses & Fees')",
    topSectorsHeading: "h2:has-text('Top Sectors')",
    
    // ========================
    // Performance Section
    // ========================
    performanceHeading: "h2:has-text('Performance')",
};

module.exports = { locators };
