FROM node

WORKDIR /app/server

COPY package*.json ./
COPY prisma ./prisma/

RUN npm cache clean --force
RUN npm install -g dotenv-cli
RUN npm install -g prisma
RUN npm install npm@latest -g --verbose

COPY ./ ./

ENV DATABASE_URL=postgresql://postgres:123456@43.201.95.160:5432/postgres
ENV PORT=9898
ENV HOST=43.201.95.160

RUN rm -rf ./dist || true
RUN #npm install npm@latest -g @prisma/client
RUN #prisma generate
RUN npm run build

CMD ["npm", "run", "start:prod"]