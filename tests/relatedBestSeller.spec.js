const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');
const testData = require('../utils/testData');
const { waitForPageLoad } = require('../utils/helpers');

test.describe('Related Best Seller Section - Real eBay', () => {

 test.beforeEach(async ({ page }) => {
  await page.goto(
    'https://www.ebay.com/',
    { waitUntil: 'domcontentloaded' }
  );
});


  // TC001
  test('Verify related section is visible', async ({ page }) => {
    const product = new ProductPage(page);
    await product.openFirstProduct();
    await product.verifyRelatedSectionVisible();
  });

  // TC005
  test('Verify maximum six related products displayed', async ({ page }) => {
    const product = new ProductPage(page);
    await product.openFirstProduct();

    const count = await product.getRelatedItemCount();
    expect(count).toBeLessThanOrEqual(testData.maxRelatedItems);
  });

  // TC009
  test('Verify related products have images', async ({ page }) => {
    const product = new ProductPage(page);
    await product.openFirstProduct();
    await product.verifyImagesVisible();
  });

  // TC010
  test('Verify navigation when clicking related product', async ({ page }) => {
    const product = new ProductPage(page);
    await product.openFirstProduct();

    await product.clickFirstRelatedItem();
    await waitForPageLoad(page);

    await expect(page).toHaveURL(/itm/);
  });

  // TC017
  test('Verify related section reloads after refresh', async ({ page }) => {
    const product = new ProductPage(page);
    await product.openFirstProduct();

    await page.reload();
    await expect(page.locator('text=Related')).toBeVisible();
  });

});