// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'app should work': function (browser) {
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .waitForElementVisible('p.loading', 5000)
      .waitForElementNotPresent('p.loading', 5000)
      .waitForElementVisible('#app .search-input', 5000)
      .waitForElementVisible('#app .search-button', 5000)
      .waitForElementVisible('#app li', 5000)
      .waitForElementVisible('#app li img', 5000)
      .setValue('#app .search-input', 'Star Wars')
      .click('#app .search-button')
      .waitForElementVisible('p.loading', 5000)
      .waitForElementNotPresent('p.loading', 10000)
      .assert.containsText('#app', 'star')
      .end()
  }
}
