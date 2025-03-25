# Используем Node.js
FROM node:18
WORKDIR /app

# Копируем файлы проекта
COPY package.json package-lock.json ./
RUN npm install

# Копируем весь код проекта
COPY . .

# Запускаем Vite в режиме разработки
CMD ["npm", "run", "dev"]
