class ProductPage {
  constructor(page) {
    this.page = page;

    // Target "People also viewed" section container
    this.relatedSection = page.locator(
      'section:has(h2:has-text("People"))'
    );

    // Items ONLY inside that section
    this.relatedItems = this.relatedSection.locator(
      'li'
    );
  }

  async openFirstProduct() {
    await this.page.goto(
      'https://www.ebay.com/itm/266393299912',
      { waitUntil: 'domcontentloaded' }
    );
  }

  async scrollToRelatedSection() {
    await this.relatedSection.scrollIntoViewIfNeeded();
  }

  async verifyRelatedSectionVisible() {
    await this.scrollToRelatedSection();

    await this.relatedSection.waitFor({
      state: 'visible',
      timeout: 30000
    });
  }

  async getRelatedItemCount() {
    await this.scrollToRelatedSection();
    return await this.relatedItems.count();
  }

  async verifyImagesVisible() {
    const count = await this.relatedItems.count();

    for (let i = 0; i < count; i++) {
      await this.relatedItems
        .nth(i)
        .locator('img')
        .first()
        .waitFor({ state: 'visible' });
    }
  }

  async clickFirstRelatedItem() {
    await this.scrollToRelatedSection();

    const firstItem = this.relatedItems.first();
    await firstItem.click();

    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = ProductPage;