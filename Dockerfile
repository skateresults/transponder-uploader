# Node 22 is the newest release line with official linux/arm/v7 images.
FROM node:22.23.2-bullseye-slim

RUN npm install -g pnpm@10.33.4

COPY package.json ./
RUN pnpm install --prod

COPY build .

ENV NODE_ENV production

CMD ["node", "."]
