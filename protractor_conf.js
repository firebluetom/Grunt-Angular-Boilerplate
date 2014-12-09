var HtmlReporter = require('protractor-html-screenshot-reporter');

// An example configuration file.
exports.config = {
  // Do not start a Selenium Standalone sever - only run this using chrome.
  // chromeOnly: true,
  // chromeDriver: './node_modules/protractor/selenium/chromedriver',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:3000',
  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['src/test/e2e/pdp/pricingInPDP.spec.js'],

  onPrepare: function() {
      // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
      jasmine.getEnv().addReporter(new HtmlReporter({
         baseDirectory: 'screenshots'
      }));
  },



  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
    includeStackTrace: false
  }
};
