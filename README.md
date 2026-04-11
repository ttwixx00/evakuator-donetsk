# Эвакуатор Донецк 24/7

Премиальный лендинг на Next.js для услуги эвакуатора в Донецке и ДНР.

## Локальный запуск

```powershell
npm.cmd install
npm.cmd run dev
```

Сайт откроется на `http://127.0.0.1:3000`.

## Публикация на GitHub Pages

Проект уже подготовлен к деплою через GitHub Actions.

1. Создайте репозиторий на GitHub.
2. Загрузите проект в ветку `main`.
3. В репозитории откройте `Settings -> Pages`.
4. В `Build and deployment` выберите `GitHub Actions`.
5. Откройте вкладку `Actions` и дождитесь успешного workflow `Deploy to GitHub Pages`.

После деплоя ссылка будет в формате:

```text
https://USERNAME.github.io/REPOSITORY_NAME/
```

Если репозиторий называется `USERNAME.github.io`, ссылка будет корневой:

```text
https://USERNAME.github.io/
```
