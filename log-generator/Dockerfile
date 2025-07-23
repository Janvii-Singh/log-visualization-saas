FROM node:18

WORKDIR /app
COPY app.js .

RUN npm init -y
RUN npm install express

CMD ["node", "app.js"]