FROM node:20

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate

RUN npm run build

RUN npm run prisma:migrate

EXPOSE 3000

CMD ["node", "dist/src/server.js"]

# WARNING: Prisma isn't playing nicely with the tsc build `./dist` dir. I've been looking into it for a little while, but I want to keep it moving (only 4 hours). I'll figure it out another time.