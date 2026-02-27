const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,

  use: {
  headless: false,
  viewport: { width: 1280, height: 720 },
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
},

  reporter: [['html']],

  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } }
  ],
});