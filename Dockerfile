FROM node:alpine

RUN apk add nano

# pula a instalação do chrome pelo puppeter e direciona o caminho correto do chrome instalado
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV CHROME_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser


# instalar manualmente o chrome
RUN apk add chromium

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5005

CMD npm run start