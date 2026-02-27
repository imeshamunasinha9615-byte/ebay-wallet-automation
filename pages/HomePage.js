class HomePage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator('#gh-ac');
    this.searchButton = page.locator('#gh-btn');
  }

  async navigate() {
    await this.page.goto('https://www.ebay.com/', {
  waitUntil: 'domcontentloaded'
});
  }

 async searchProduct(product) {
  await this.searchBox.waitFor({ state: 'visible' });
  await this.searchBox.fill(product);
  await this.searchButton.click();
}
  }


module.exports = HomePage;