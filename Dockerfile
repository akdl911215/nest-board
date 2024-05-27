FROM node

WORKDIR /app/server

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install -g dotenv-cli
RUN npm install -g dotenv
RUN npm install -g cross-env

RUN npm i -g prisma
RUN npm install

COPY ./ ./

ENV DATABASE_URL=postgresql://postgres:123456@3.35.207.45:5432/postgres
ENV PORT=9898
ENV HOST=3.35.207.45
ENV JWT_SECRET=ljhcommunity
ENV JWT_ACCESS_SECRET=jwtAccessSecret
ENV JWT_ACCESS_EXPIRE_IN=1000s
ENV JWT_REFRESH_SECRET=jwtRefreshSecret
ENV JWT_REFRESH_EXPIRE_IN=10000s
ENV BCRYPT_SOLT_NUMBER=12345
ENV NODE_ENV=production

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG S3_BUCKET_NAME

RUN rm -rf ./dist || true
RUN prisma generate
RUN npm run build

CMD ["npm", "run", "start:prod"]