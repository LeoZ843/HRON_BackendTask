# Stage 1: build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY tsconfig.json ./

RUN npm ci

RUN npx prisma generate

COPY src ./src

RUN npm run build


# Stage 2: production
FROM node:22-alpine AS production

LABEL name="hron-backend"
LABEL version="1.0.0"

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated

COPY prisma ./prisma
COPY prisma.config.production.js ./prisma.config.production.js
COPY entrypoint.sh ./entrypoint.sh

RUN chmod +x entrypoint.sh

EXPOSE 3000

CMD ["sh", "entrypoint.sh"]