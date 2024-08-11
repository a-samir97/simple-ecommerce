FROM node:16-alpine

WORKDIR /app

COPY package*.json /app/
COPY public/ /app/public
COPY src /app/src

RUN npm install

COPY . /app

CMD ["npm", "start"]
#COPY ./entrypoint.sh /entrypoint.sh
#
#RUN chmod +x /entrypoint.sh
#
#ENTRYPOINT ["/entrypoint.sh"]
