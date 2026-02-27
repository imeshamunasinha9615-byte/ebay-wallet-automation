async function waitForPageLoad(page) {
  await page.waitForLoadState('domcontentloaded');
}

module.exports = { waitForPageLoad };