FROM node:24.19.0-bullseye-slim

RUN npm install -g pnpm@10.33.4

COPY package.json ./
RUN pnpm install --prod

COPY build .

ENV NODE_ENV production

CMD ["node", "."]
