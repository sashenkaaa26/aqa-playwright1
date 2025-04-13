module.exports = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000, // таймаут для ожидания
  },
  use: {
    headless: false,
    browserName: 'chromium',  // Указываем браузер
    baseURL: 'https://qauto.forstudy.space',  // Основной URL для тестов
    video: 'on-first-retry',  // Записывать видео только при первом провале
    screenshot: 'on-failure',  // Делаем скриншоты при провале теста
  },
  projects: [
    {
      name: 'chromium',  // Проект для выполнения тестов в браузере Chromium
      use: { browserName: 'chromium' },
    },
  ],
  reporter: [
    ['html', { outputFolder: 'test-results', open: 'never' }],  // HTML отчет
    ['json', { outputFile: 'test-results/results.json' }],  // JSON отчет
  ],
  retries: 2,  // Количество повторных попыток тестов
};


