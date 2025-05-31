FROM node:20-slim

WORKDIR /app

COPY package.json yarn.lock ./

# Активируем Corepack и нужную версию Yarn
RUN corepack enable && corepack prepare yarn@4.8.1 --activate

# Устанавливаем зависимости
RUN yarn install

COPY . .

EXPOSE 5173

CMD ["yarn", "dev", "--host"]
