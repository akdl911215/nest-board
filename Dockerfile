FROM node

WORKDIR /app/server

COPY package*.json ./
COPY prisma ./prisma/

RUN npm cache clean --force
RUN npm install -g dotenv-cli
RUN npm install -g prisma
RUN npm ci --verbose

COPY ./ ./

ENV DATABASE_URL=postgresql://postgres:123456@3.35.207.45:5432/postgres
ENV PORT=9898
ENV HOST=3.35.207.45

RUN rm -rf ./dist || true
RUN prisma generate
RUN npm run build

CMD ["npm", "run", "startprod"]