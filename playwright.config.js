// playwright.config.js
module.exports = {
  testDir: './tests',
  timeout: 30000, // глобальный таймаут
  expect: {
    timeout: 5000, // таймаут для ожидания
  },
  use: {
    headless: true,
    browserName: 'chromium',
    baseURL: 'https://example.com',
    video: 'on-first-retry', // записывать видео только при первом провале
    screenshot: 'on-failure', // делать скриншоты при провале теста
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
  reporter: [
    ['html', { outputFolder: 'test-results', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  workers: process.env.CI ? 4 : 1,
  retries: 2,
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
};


