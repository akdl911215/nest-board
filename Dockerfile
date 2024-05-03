FROM node:16.15.1

WORKDIR /app/server

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install -g dotenv-cli
RUN npm i -g prisma
RUN npm ci

COPY ./ ./

ENV DATABASE_URL=postgresql://postgres:123456@54.180.112.22:5432/postgres
ENV PORT=9898
ENV HOST=54.180.112.22

RUN rm -rf ./dist || true
RUN prisma generate
RUN npm run build

CMD ["npm", "run", "start:prod"]