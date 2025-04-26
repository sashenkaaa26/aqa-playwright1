module.exports = {
  testDir: './tests',
  timeout: 30000, // глобальный таймаут для каждого теста
  expect: {
    timeout: 5000, // таймаут для ожидания элементов
  },
  use: {
    headless: true, // запускать в headless-режиме
    browserName: 'chromium', // запускать только Chromium
    baseURL: 'https://example.com', // основной URL для тестов
    video: 'on-first-retry', // записывать видео только при первом провале
    screenshot: 'on-failure', // делать скриншоты при провале теста
  },
  projects: [
    {
      name: 'chromium', // используем только Chromium
      use: { browserName: 'chromium' },
    }
  ],
  reporter: [
    ['html', { outputFolder: 'test-results', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  workers: 1, // запускать тесты по одному, без параллелизма
  retries: 0, // не повторять тесты при их неудаче
};



