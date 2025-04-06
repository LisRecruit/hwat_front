# Используем Node.js
FROM node:20-slim

# Указываем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости через yarn
RUN yarn install

# Копируем остальной код
COPY . .

# Открываем порт (если нужно для dev-сервера)
EXPOSE 5173

# Запускаем Vite в режиме разработки
CMD ["yarn", "dev", "--host"]
