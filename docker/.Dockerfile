# Stage 1: Build the application
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

ENV APP_NAME="host"

# Копируем только необходимые файлы для сборки
COPY package.json package-lock.json ./
COPY ./nx.json ./nx.json
COPY ./jest.preset.js ./jest.preset.js
COPY ./apps/host ./apps/host
# COPY ./libs ./libs
COPY ./tsconfig.base.json ./

# Устанавливаем зависимости
RUN npm install --verbose 
RUN npx nx build host --verbose 

# RUN npm install

# Указываем порт, который будет использован
EXPOSE 3000

# Запуск Next.js приложения
CMD ["npx", "nx", "start", "host"]
# CMD ["npm", "start"]
