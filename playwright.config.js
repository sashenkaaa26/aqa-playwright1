// module.exports = {
//   testDir: './tests',
//   timeout: 30000, // глобальный таймаут для каждого теста
//   expect: {
//     timeout: 5000, // таймаут для ожидания элементов
//   },
//   use: {
//     headless: true, // запускать в headless-режиме
//     browserName: 'chromium', // запускать только Chromium
//     baseURL: 'https://example.com', // основной URL для тестов
//     video: 'on-first-retry', // записывать видео только при первом провале
//     screenshot: 'on-failure', // делать скриншоты при провале теста
//   },
//   projects: [
//     {
//       name: 'chromium', // используем только Chromium
//       use: { browserName: 'chromium' },
//     }
//   ],
//   reporter: [
//     ['html', { outputFolder: 'test-results', open: 'never' }],
//     ['json', { outputFile: 'test-results/results.json' }],
//   ],
//   workers: 1, // запускать тесты по одному, без параллелизма
//   retries: 0, // не повторять тесты при их неудаче
// };


// require('dotenv').config();  

// console.log("Base URL: ", process.env.BASE_URL);
// console.log("Username: ", process.env.USERNAME);
// console.log("Password: ", process.env.PASSWORD);


// export const testDir = './tests';
// export const timeout = 30000;
// export const use = {
//   headless: false, 
//   browserName: 'chromium',
//   baseURL: process.env.BASE_URL, 
//   video: 'on-first-retry',
//   screenshot: 'on-failure',
//   httpCredentials: {
//     username: process.env.USERNAME, 
//     password: process.env.PASSWORD, 
//   }
// };

import { config } from 'dotenv';
config();  // Загружаем переменные окружения

export default {
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: false,
    browserName: 'chromium',
    baseURL: process.env.BASE_URL,
    video: 'on-first-retry',
    screenshot: 'on-failure',
    httpCredentials: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    }
  },
};
