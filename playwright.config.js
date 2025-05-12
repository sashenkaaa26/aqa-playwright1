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
// import dotenv from 'dotenv';  // Импортируем dotenv
// import { defineConfig } from '@playwright/test';  // Для использования с ES6 модулями

// dotenv.config();  // Загружаем переменные окружения

// export default defineConfig({
//   testDir: './tests',  // Указываем директорию с тестами
//   timeout: 30000,  // Таймаут для тестов

//   use: {
//     headless: false,  // Отключаем headless-режим (если нужно, можно включить)
//     browserName: 'chromium',  // Используем Chromium для тестов
//     baseURL: process.env.BASE_URL,  // Динамический baseURL из переменных окружения
//     video: 'on-first-retry',  // Записываем видео только при первом неудачном тесте
//     screenshot: 'on-failure',  // Делаем скриншот только при сбое
//     storageState: 'state.json',  // Указываем путь к сохраненному состоянию
//     httpCredentials: {
//       username: 'guest',  // HTTP Basic Auth - имя пользователя
//       password: 'welcome2qauto',  // HTTP Basic Auth - пароль
//     },
//   },

//   globalSetup: './global-setup.js',  // Указываем путь к файлу глобальной настройки
// });
// playwright.config.js
export default {
  use: {
    baseURL: 'https://qauto.forstudy.space',
    headless: false,
  },
  globalSetup: './setup.js', // ← строка с путем к файлу
};
