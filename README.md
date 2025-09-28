Мессенджер - Учебный проект
<div align="center">
https://img.shields.io/badge/version-1.0.0-blue.svg
https://img.shields.io/badge/TypeScript-5.8.3-blue
https://api.netlify.com/api/v1/badges/67e70105-ba0b-46d3-b1af-2a83d1824ab0/deploy-status
https://img.shields.io/badge/node-%253E%253D12-green.svg

Современный мессенджер с интуитивным интерфейсом и полным набором функций для общения

Демо • Функциональность • Установка • Разработка

</div>
🚀 Демо
🎨 Figma макет - Дизайн и прототип

🌐 Netlify Deploy - Рабочее приложение

✨ Функциональность
🔐 Авторизация и безопасность
Регистрация и вход пользователей

Защищенные маршруты

Валидация данных

💬 Основные возможности
Отправка и получение сообщений в реальном времени

Создание и управление чатами
 

🎨 Пользовательский интерфейс
Адаптивный дизайн

Интуитивная навигация

🛠 Технологии
<div align="center">
Frontend	Build Tools	Quality
TypeScript 5.8	Vite 6.3	ESLint 9.29
Handlebars 4.7	PostCSS 8.5	Stylelint 16.21
Express 5.1	Autoprefixer	Jest 30.1
Husky 9.1	Prettier 3.5
</div>
📦 Установка
Предварительные требования
Node.js >= 12

npm 8+

Шаги установки
bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run start
🚀 Разработка
Доступные команды
Команда	Назначение
npm run dev	Запуск сервера разработки с hot-reload
npm run start	Сборка и запуск стабильной версии
npm run build	Сборка проекта для продакшена
npm run preview	Просмотр собранной версии
npm run prebuild	Проверка типов TypeScript
npm run eslint	Проверка кода ESLint
npm run lint:css	Проверка стилей Stylelint
npm run test	Запуск unit-тестов Jest
npm run test:watch	Запуск тестов в watch-режиме
npm run test:coverage	Запуск тестов с покрытием кода
Code Quality
Проект использует Husky для автоматизации проверок качества кода:

Pre-commit hooks - автоматический запуск линтеров перед коммитом

TypeScript проверка типов

ESLint для JavaScript/TypeScript

Stylelint для CSS/PostCSS

Jest для unit-тестирования

Сборка проекта
Проект использует современные инструменты сборки:

Vite - быстрый сборщик для разработки

TypeScript - статическая типизация

PostCSS с Autoprefixer - обработка стилей

Handlebars - шаблонизация